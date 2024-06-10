import { memo } from "react";
import { twMerge } from "tailwind-merge";

type CompPanelProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
};
const CompPanel = memo(function ({
  title,
  children,
  className,
}: CompPanelProps) {
  return (
    <div
      className={twMerge(
        "bg-base-200 px-2 py-4 shadow shadow-gray-700 overflow-y-auto dark:shadow-gray-200",
        className,
      )}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
});

type CompGroupProps = {
  children: React.ReactNode;
  legend?: string;
  className?: string;
  style?: React.CSSProperties;
};
const CompGroup = memo(function ({
  children,
  legend,
  className = "",
  style,
}: CompGroupProps) {
  return (
    <fieldset
      className={twMerge(
        "bg-base-100 my-2 flex flex-wrap items-end gap-2 p-2",
        className,
      )}
      style={style}
    >
      {legend && <legend>{legend}</legend>}
      {children}
    </fieldset>
  );
});

export { CompPanel, CompGroup };
