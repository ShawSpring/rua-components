import React from "react";

import {
  composeRenderProps,
  Button as RACButton,
  ButtonProps as RACButtonProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { focusRing, composeTWRenderProps, mergeCls } from "../utils";
import { twJoin } from "tailwind-merge";

const cls_disabled =
  "disabled:grayscale-[0.8] disabled:cursor-not-allowed disabled:opacity-50";
const cls_interactions =
  "pressed:animate-btn-pop hover:ring-2 hover:bg-opacity-60";
const cls_base =
  "rounded-btn ring-teal-700 dark:ring-teal-300 cursor-pointer border border-black/10 px-4 py-2 text-center text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition dark:border-white/10";

const button = tv({
  extend: focusRing,
  base: twJoin(cls_base, cls_disabled, cls_interactions),
  variants: {
    variant: {
      base: "bg-base-300 text-base-c",
      primary: "bg-primary text-primary-c",
      secondary: "bg-secondary text-secondary-c",
      accent: "bg-accent text-accent-c",
      success: "bg-success text-success-c",
      warning: "bg-warning text-warning-c",
      error: "bg-error text-error-c",
    },
    /**
     * define button border radius
     */
    shape: {
      round: "rounded-btn",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "base",
    shape: "round",
  },
});

export type ButtonProps = RACButtonProps & VariantProps<typeof button>;

// export interface ButtonProps extends RACButtonProps {
//   variant?:
//     | "primary"
//     | "secondary"
//     | "accent"
//     | "success"
//     | "warning"
//     | "error"
//     | "base";
//   // isDisabled?: boolean; // already in RACButtonProps
// }

function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeTWRenderProps(
        props.className,
        button({ variant: props.variant, shape: props.shape }),
      )}
    />
  );
}

export { Button };
