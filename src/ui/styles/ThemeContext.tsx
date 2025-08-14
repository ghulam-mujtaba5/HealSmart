import React from 'react';

export type ThemeOverride = 'light' | 'dark' | null;

export type ThemeContextType = {
  override: ThemeOverride;
  setOverride: (v: ThemeOverride) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  override: null,
  setOverride: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [override, setOverride] = React.useState<ThemeOverride>(null);
  const value = React.useMemo(() => ({ override, setOverride }), [override]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
