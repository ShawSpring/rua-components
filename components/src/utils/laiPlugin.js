import plugin from "tailwindcss/plugin";

export default function () {
  return plugin(
    function ({ matchUtilities, addVariant, addUtilities, theme }) {
      addVariant("notlast", "&:not(:last-child)"); // [&:not(:last-child)]
      addVariant("hocus", ["&:hover", "&:focus"]); //一次生成两个 &:hover &:focus
      addVariant("disabled", "&:disabled"); // 使用原生的伪类覆盖aria插件中的复杂写法:where([data-rac])[data-disabled]  :where(:not([data-rac])):disabled
      matchUtilities(
        {
          "grid-autofit": (value) => ({
            "grid-template-columns": `repeat(auto-fit, minmax(${value}, 1fr))`,
          }),
        },
        {
          values: {
            80: "20rem",
            100: "25rem",
            120: "30rem",
            160: "40rem",
            200: "50rem",
            300: "75rem",
            400: "100rem",
          },
        },
      );
    },
    {
      theme: {
        extend: {
          keyframes: {
            "btn-pop": {
              "0%,100%": { transform: "scale(1)" },
              "30%": { transform: "scale(var(--l-btn-focus-scale,0.9))" },
              "70%": {
                transform: "scale(calc(2 - var(--l-btn-focus-scale,0.9)))",
              },
            },
          },
          animation: {
            "btn-pop": "btn-pop var(--l-animation-btn,0.3s) ease-out",
          },
          screens: {
            xs: "475px",
          },
          colors: {
            primary: "oklch(var(--l-primary) / <alpha-value>)",
            "primary-c": "oklch(var(--l-primary-c) / <alpha-value>)",
            secondary: "oklch(var(--l-secondary) / <alpha-value>)",
            "secondary-c": "oklch(var(--l-secondary-c) / <alpha-value>)",
            accent: "oklch(var(--l-accent) / <alpha-value>)",
            "accent-c": "oklch(var(--l-accent-c) / <alpha-value>)",
            neutral: "oklch(var(--l-neutral) / <alpha-value>)",
            "neutral-c": "oklch(var(--l-neutral-c) / <alpha-value>)",
            info: "oklch(var(--l-info) / <alpha-value>)",
            "info-c": "oklch(var(--l-info-c) / <alpha-value>)",
            success: "oklch(var(--l-success) / <alpha-value>)",
            "success-c": "oklch(var(--l-success-c) / <alpha-value>)",
            warning: "oklch(var(--l-warning) / <alpha-value>)",
            "warning-c": "oklch(var(--l-warning-c) / <alpha-value>)",
            error: "oklch(var(--l-error) / <alpha-value>)",
            "error-c": "oklch(var(--l-error-c) / <alpha-value>)",
            base: {
              300: "oklch(var(--l-base-300) / <alpha-value>)",
              200: "oklch(var(--l-base-200) / <alpha-value>)",
              100: "oklch(var(--l-base-100) / <alpha-value>)",
              c: "oklch(var(--l-base-c) / <alpha-value>)",
            },
          },
          borderRadius: {
            btn: "var(--l-rounded-btn)",
            box: "var(--l-rounded-box)",
            badge: "var(--l-rounded-badge)",
          },
          transitionDuration: {
            btn: "var(--l-animation-btn,0.3s)",
            input: "var(--l-animation-input,0.3s)",
          },
        },
      },
    },
  );
}
