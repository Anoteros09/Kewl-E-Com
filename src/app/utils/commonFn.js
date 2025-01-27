export function getCurrentURL() {
  return window.location.origin;
}

export const joinPaths = (...args) => args.join("/");
