"use client";

import { useSyncExternalStore } from "react";

type State = { image: string | null };
let state: State = { image: null };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const hoverStore = {
  set(image: string | null) {
    if (state.image === image) return;
    state = { image };
    emit();
  },
  get() {
    return state;
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useHoverImage() {
  return useSyncExternalStore(
    hoverStore.subscribe,
    () => hoverStore.get().image,
    () => null,
  );
}
