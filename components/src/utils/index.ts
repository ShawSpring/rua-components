import { composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv, type TVReturnType, TV } from "tailwind-variants";

export const focusRing = tv({
  base: "outline outline-offset-2 outline-teal-700 dark:outline-teal-300 forced-colors:outline-[Highlight]",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

export function composeTWRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}

// 使用renderProps的写法
/*    
   className={composeRenderProps(props.className, (className, renderProps) =>
        button({
          ...renderProps,
          variant: props.variant,
          className,
        }),
      )} */

/**
 * a wrapper for composeTailwindRenderProps, automatically populate variants from props
 * @param {object} props
 * @param {TVReturnType} vt
 * @returns {string | ((v: any) => string)}   result for className
 * @warning all variantKeys in vt is populated 
 ```ts
 button is return from vt(), need manually populate variants from props.
className={composeTailwindRenderProps(
  props.className,
  button({ variant: props.variant, isDisabled: props.isDisabled }),
)} 
```
replaced with mergeCls
```ts
className={mergeCls(props, button)}
```
 */
export function mergeCls(props: any, vt: any): string | ((v: any) => string) {
  const variants = Object.fromEntries(
    vt.variantKeys.map((k: string) => [k, props[k]]),
  );
  return composeTWRenderProps(props.className, vt(variants));
}
