import { useCallback, useEffect, useState } from "react";

const KEY = "ladylike-nails-saved-looks";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useSavedLooks() {
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSaved(read());
    setHydrated(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setSaved(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = (next: string[]) => {
    setSaved(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const toggle = useCallback(
    (id: string) => {
      const next = saved.includes(id) ? saved.filter((s) => s !== id) : [...saved, id];
      persist(next);
    },
    [saved],
  );

  const remove = useCallback((id: string) => persist(saved.filter((s) => s !== id)), [saved]);

  const clear = useCallback(() => persist([]), []);

  const has = useCallback((id: string) => saved.includes(id), [saved]);

  return { saved, hydrated, toggle, remove, clear, has };
}
