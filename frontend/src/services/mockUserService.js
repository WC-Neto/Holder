import { initialMockUsers } from "../data/mockUsers";

const USERS_STORAGE_KEY = "holder_mock_users";
const DELETED_USERS_STORAGE_KEY = "holder_mock_deleted_user_ids";
const CURRENT_USER_STORAGE_KEY = "holder_mock_current_user";

function readJsonStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function generateUserId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `user-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

export function getStoredMockUsers() {
  return readJsonStorage(USERS_STORAGE_KEY, []);
}

export function getDeletedMockUserIds() {
  return readJsonStorage(DELETED_USERS_STORAGE_KEY, []);
}

export function saveStoredMockUsers(users) {
  writeJsonStorage(USERS_STORAGE_KEY, users);
}

export function listMockUsers() {
  const storedUsers = getStoredMockUsers();
  const deletedUserIds = getDeletedMockUserIds();
  const storedById = new Map(storedUsers.map((user) => [user.id, user]));

  const seededUsers = initialMockUsers
    .filter((user) => !deletedUserIds.includes(user.id))
    .map((user) => storedById.get(user.id) ?? user);

  const createdUsers = storedUsers.filter(
    (user) => !initialMockUsers.some((seedUser) => seedUser.id === user.id),
  );

  return [...seededUsers, ...createdUsers];
}

export function getMockUserById(userId) {
  return listMockUsers().find((user) => user.id === userId) ?? null;
}

export function createMockUser({ type, name, email, password }) {
  const normalizedEmail = normalizeEmail(email);

  if (!type || !["idoso", "voluntario"].includes(type)) {
    throw new Error("Tipo de usuário inválido.");
  }

  if (!name?.trim()) {
    throw new Error("Informe o nome do usuário.");
  }

  if (!normalizedEmail) {
    throw new Error("Informe um e-mail válido.");
  }

  if (!password) {
    throw new Error("Informe uma senha.");
  }

  const emailAlreadyExists = listMockUsers().some(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  );

  if (emailAlreadyExists) {
    throw new Error("Já existe um usuário com esse e-mail.");
  }

  const user = {
    id: generateUserId(),
    type,
    name: name.trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  };

  saveStoredMockUsers([...getStoredMockUsers(), user]);
  return user;
}

export function updateMockUser(userId, updates) {
  const existingUser = getMockUserById(userId);

  if (!existingUser) {
    throw new Error("Usuário não encontrado.");
  }

  const nextUser = {
    ...existingUser,
    ...updates,
    id: existingUser.id,
    email: updates.email ? normalizeEmail(updates.email) : existingUser.email,
    updatedAt: new Date().toISOString(),
  };

  const storedUsers = getStoredMockUsers();
  const storedUserIndex = storedUsers.findIndex((user) => user.id === userId);

  if (storedUserIndex >= 0) {
    storedUsers[storedUserIndex] = nextUser;
    saveStoredMockUsers(storedUsers);
  } else {
    saveStoredMockUsers([...storedUsers, nextUser]);
  }

  return nextUser;
}

export function deleteMockUser(userId) {
  const storedUsers = getStoredMockUsers().filter((user) => user.id !== userId);
  const isSeedUser = initialMockUsers.some((user) => user.id === userId);

  saveStoredMockUsers(storedUsers);

  if (isSeedUser) {
    const deletedUserIds = getDeletedMockUserIds();
    writeJsonStorage(DELETED_USERS_STORAGE_KEY, [
      ...new Set([...deletedUserIds, userId]),
    ]);
  }

  return true;
}

export function authenticateMockUser({ type, email, password }) {
  const normalizedEmail = normalizeEmail(email);

  const user = listMockUsers().find(
    (mockUser) =>
      mockUser.type === type &&
      normalizeEmail(mockUser.email) === normalizedEmail &&
      mockUser.password === password,
  );

  return user ? sanitizeUser(user) : null;
}

export function saveCurrentMockUser(user) {
  writeJsonStorage(CURRENT_USER_STORAGE_KEY, user);
}

export function getCurrentMockUser() {
  return readJsonStorage(CURRENT_USER_STORAGE_KEY, null);
}

export function clearCurrentMockUser() {
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
}
