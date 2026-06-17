export const sensitiveAuthStorageKeys = [
  "token",
  "idoso_id_manual",
  "user",
  "volunteer_user",
  "auth_user",
  "holder_mock_current_user",
];

export function clearSensitiveAuthData({
  localStorage: localStorageRef = globalThis.localStorage,
  sessionStorage: sessionStorageRef = globalThis.sessionStorage,
} = {}) {
  sensitiveAuthStorageKeys.forEach((key) => {
    localStorageRef?.removeItem?.(key);
    sessionStorageRef?.removeItem?.(key);
  });
}

export function redirectToLogin({
  windowRef = globalThis.window,
  redirectTo = "/login",
} = {}) {
  if (windowRef?.history?.replaceState) {
    windowRef.history.replaceState({ loggedOut: true }, "", redirectTo);
    return redirectTo;
  }

  if (windowRef?.location) {
    windowRef.location.href = redirectTo;
  }

  return redirectTo;
}

export function logout(options = {}) {
  const redirectTo = options.redirectTo ?? "/login";

  clearSensitiveAuthData(options);
  redirectToLogin({
    windowRef: options.windowRef,
    redirectTo,
  });

  return { redirectTo };
}
