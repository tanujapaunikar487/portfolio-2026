export const ASSET_VERSION = "3";

export const v = (path: string) =>
  path.includes("?") ? path : `${path}?v=${ASSET_VERSION}`;
