import { useRef, forwardRef } from "react";
import "./button.module.css";
import clsx from "clsx";

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type?:
    | "base"
    | "primary"
    | "secondary"
    | "accent"
    | "error"
    | "success"
    | "warning";
  size?: "small" | "large" | "middle";
  fill?: "solid" | "outline" | "text";
  shape?: "round" | "square" | "circle";
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    type = "base",
    size = "middle",
    fill = "solid",
    shape = "round",
    disabled = false,
    ...props
  },
  ref,
) {
  // const ref = useRef<HTMLButtonElement>(null);
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (disabled) {
      return;
    }
    props.onClick?.(e); // 调用用户传入的点击事件
    const ele = e.currentTarget;
    ele.classList.add("animate-btn-pop");
    ele.addEventListener("animationend", (e: AnimationEvent) => {
      if (e.animationName === "btn-pop") {
        ele.classList.remove("animate-btn-pop");
      }
    });
  }
  return (
    <>
      <button
        onClick={handleClick}
        ref={ref}
        className={clsx(
          "duration-btn hocus:ring-2 focusible:ring-2 ring-base-c inline-flex cursor-pointer items-center justify-center",
          "rounded transition hover:bg-opacity-80 focus-visible:outline-none focus-visible:ring-offset-1",
          {
            "text-base-c bg-base-300": type === "base" && fill === "solid",
            "bg-primary text-primary-c": type === "primary" && fill === "solid",
            "bg-secondary text-secondary-c":
              type === "secondary" && fill === "solid",
            "bg-accent text-accent-c": type === "accent" && fill === "solid",
            "bg-error text-error-c": type === "error" && fill === "solid",
            "bg-success text-success-c": type === "success" && fill === "solid",
            "bg-warning text-warning-c": type === "warning" && fill === "solid",
            "rounded-btn": shape === "round",
            "rounded-full": shape === "circle",
            "hocus:ring-1 px-2 py-2 text-sm": size === "small",
            "px-2 py-2 text-base": size === "middle",
            "px-6 py-2 text-xl": size === "large",

            "text-base-c ring-base-c hocus:text-base-300 hocus:bg-base-c bg-transparent":
              type === "base" && ["outline", "text"].includes(fill),
            "text-primary ring-primary hocus:text-primary-c hocus:bg-primary bg-transparent":
              type === "primary" && ["outline", "text"].includes(fill),
            "text-secondary ring-secondary hocus:text-secondary-c hocus:bg-secondary bg-transparent":
              type === "secondary" && ["outline", "text"].includes(fill),
            "text-accent ring-accent hocus:text-accent-c hocus:bg-accent bg-transparent":
              type === "accent" && ["outline", "text"].includes(fill),
            "text-error ring-error hocus:text-error-c hocus:bg-error bg-transparent":
              type === "error" && ["outline", "text"].includes(fill),
            "text-success ring-success hocus:text-success-c hocus:bg-success bg-transparent":
              type === "success" && ["outline", "text"].includes(fill),
            "text-warning ring-warning hocus:text-warning-c hocus:bg-warning bg-transparent":
              type === "warning" && ["outline", "text"].includes(fill),
            "ring-2": fill === "outline",
            "ring-0": fill === "text",
          },
        )}
        {...props}
      ></button>
    </>
  );
});

export default Button;
