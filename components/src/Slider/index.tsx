import React from "react";
import {
  Slider as AriaSlider,
  SliderProps as AriaSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Label } from "../Field";
import { composeTWRenderProps, focusRing } from "../utils";

const trackStyles = tv({
  base: "rounded-full",
  variants: {
    orientation: {
      horizontal: "h-[6px] w-full",
      vertical: "ml-[50%] h-full w-[6px] -translate-x-[50%]",
    },
    isDisabled: {
      false: "bg-gray-300 dark:bg-zinc-500 forced-colors:bg-[ButtonBorder]",
      true: "bg-gray-100 dark:bg-zinc-800 forced-colors:bg-[GrayText]",
    },
  },
});

const thumbStyles = tv({
  extend: focusRing,
  base: "group-orientation-horizontal:mt-6 group-orientation-vertical:ml-3 h-6 w-6 rounded-full border-2 border-gray-700 bg-gray-50 dark:border-gray-300 dark:bg-zinc-900",
  variants: {
    isDragging: {
      true: "bg-gray-700 dark:bg-gray-300 forced-colors:bg-[ButtonBorder]",
    },
    isDisabled: {
      true: "border-gray-300 dark:border-zinc-700 forced-colors:border-[GrayText]",
    },
  },
});

export interface SliderProps<T> extends AriaSliderProps<T> {
  label?: string;
  thumbLabels?: string[];
}

export function Slider<T extends number | number[]>({
  label,
  thumbLabels,
  ...props
}: SliderProps<T>) {
  return (
    <AriaSlider
      {...props}
      className={composeTWRenderProps(
        props.className,
        "orientation-horizontal:grid orientation-vertical:flex orientation-horizontal:w-64 grid-cols-[1fr_auto] flex-col items-center gap-2",
      )}
    >
      <Label>{label}</Label>
      <SliderOutput className="orientation-vertical:hidden text-sm font-medium text-gray-500 dark:text-zinc-400">
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")
        }
      </SliderOutput>
      <SliderTrack className="orientation-horizontal:h-6 orientation-vertical:w-6 orientation-vertical:h-64 group col-span-2 flex items-center">
        {({ state, ...renderProps }) => (
          <>
            <div className={trackStyles(renderProps)} />
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                aria-label={thumbLabels?.[i]}
                className={thumbStyles}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
