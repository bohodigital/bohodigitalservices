"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type DefinitionPopoverContextValue = {
  activeId: string | null;
  activate: (id: string) => void;
  deactivate: (id: string) => void;
};

const DefinitionPopoverContext = createContext<DefinitionPopoverContextValue | null>(null);

export function DefinitionPopoverProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activate = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const deactivate = useCallback((id: string) => {
    setActiveId((current) => current === id ? null : current);
  }, []);

  const value = useMemo(
    () => ({ activeId, activate, deactivate }),
    [activeId, activate, deactivate],
  );

  return (
    <DefinitionPopoverContext.Provider value={value}>
      {children}
    </DefinitionPopoverContext.Provider>
  );
}

export function useDefinitionPopover() {
  const context = useContext(DefinitionPopoverContext);

  if (!context) {
    throw new Error("DefinitionTerm must be rendered inside DefinitionPopoverProvider.");
  }

  return context;
}
