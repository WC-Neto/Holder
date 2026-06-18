import { initialMockUsers } from "../data/mockUsers";

const USERS_STORAGE_KEY = "holder_mock_users";
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

export function listMockUsers() {
  return [...initialMockUsers, ...getStoredMockUsers()];
}

export function createMockUser({ type, name, email, password }) {
  const normalizedEmail = normalizeEmail(email);

  if (!["idoso", "voluntario"].includes(type)) {
    throw new Error("Tipo de usuário inválido.");
  }

  if (!name?.trim()) {
    throw new Error("Informe o nome completo.");
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

  writeJsonStorage(USERS_STORAGE_KEY, [...getStoredMockUsers(), user]);
  return sanitizeUser(user);
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

export function clearCurrentMockUser() {
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
}
