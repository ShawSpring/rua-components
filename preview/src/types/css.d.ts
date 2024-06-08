import 'react';
declare module 'react' {
  interface CSSProperties {
    // '--theme-color'?:'dark'|'light';
    [index: `--${string}`]: string;
  }
}
