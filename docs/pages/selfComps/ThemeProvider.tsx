import {createContext, useContext, useEffect, useState} from 'react';

export type Theme =
  | 'light'
  | 'dark'
  | 'system'
  | 'corporate'
  | 'cupcake'
  | 'bumblebee'
  | 'wireframe'
  | 'halloween'
  | 'black'
  | 'luxury'
  | 'valentine'
  | 'emerald'
  | 'dracula'
  | 'cmyk'
  | 'cyberpunk'
  | 'retro'
  | 'garden'
  | 'aqua'
  | 'pastel'
  | 'fantasy'
  | 'lofi'
  | 'forest'
  | 'autumn'
  | 'synthwave'
  | 'business'
  | 'acid'
  | 'lemonade'
  | 'night'
  | 'coffee'
  | 'winter'
  | 'dim'
  | 'nord'
  | 'sunset';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const body = window.document.body;

    body.removeAttribute('data-theme');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      body.setAttribute('data-theme', systemTheme);
      return;
    }

    body.setAttribute('data-theme', theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
