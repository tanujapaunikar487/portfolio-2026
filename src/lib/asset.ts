export const ASSET_VERSION = "2";

export const v = (path: string) =>
  path.includes("?") ? path : `${path}?v=${ASSET_VERSION}`;
