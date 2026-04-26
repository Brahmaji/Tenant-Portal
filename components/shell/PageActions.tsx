"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Ctx = {
  node: ReactNode | null;
  setNode: (node: ReactNode | null) => void;
};

const PageActionsContext = createContext<Ctx | null>(null);

export function PageActionsProvider({ children }: { children: ReactNode }) {
  const [node, setNode] = useState<ReactNode | null>(null);
  const value = useMemo(() => ({ node, setNode }), [node]);
  return (
    <PageActionsContext.Provider value={value}>
      {children}
    </PageActionsContext.Provider>
  );
}

export function PageActionsSlot() {
  const ctx = useContext(PageActionsContext);
  if (!ctx?.node) return null;
  return (
    <div className="hidden items-center gap-2 md:flex">{ctx.node}</div>
  );
}

/**
 * Use inside a page (client component) to inject contextual action(s)
 * into the global header. Pass `null` (or unmount) to clear.
 */
export function usePageActions(node: ReactNode | null) {
  const ctx = useContext(PageActionsContext);
  useEffect(() => {
    if (!ctx) return;
    ctx.setNode(node);
    return () => ctx.setNode(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);
}
