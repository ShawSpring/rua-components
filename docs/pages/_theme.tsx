import React, { useMemo } from "react";
import { createTheme, defaultSideNavs } from "@shawspring/vite-pages-theme-doc";

import Component404 from "./404";
import ThemeItem from "./selfComps/ThemeItem";
import { Navigate } from "react-router-dom";

function setTheme({ key }: { key: string }) {
  document.body.setAttribute("data-theme", key);
  localStorage.setItem("data-theme", key);
}
document.body.setAttribute(
  "data-theme",
  localStorage.getItem("data-theme") || "light",
);

export default createTheme({
  logo: (
    <div
      style={{ fontSize: "20px" }}
      onClick={() => {
        Navigate({ to: "/" });
      }}
    >
      📘 Rua components
    </div>
  ),
  topNavs: [
    {
      label: "Index",
      path: "/",
      activeIfMatch: {
        // match all first-level paths
        path: "/:foo",
        end: true,
      },
    },
    {
      label: "Components",
      path: "/components/Button",
      activeIfMatch: "/components",
    },
    { label: "Vite", href: "https://github.com/vitejs/vite" },
    {
      label: "Vite Pages",
      href: "https://github.com/vitejs/vite-plugin-react-pages",
    },
    {
      subMenu: "Theme",
      icon: "🎨",
      children: [
        {
          key: "light",
          element: <ThemeItem theme="light" />,
          onclick: setTheme,
        },
        {
          key: "dark",
          element: <ThemeItem theme="dark" />,
          onclick: setTheme,
        },
      ],
    },
  ],
  sideNavs: (ctx) => {
    return defaultSideNavs(ctx, {
      groupConfig: {
        components: {
          demos: {
            label: "Demos (dev only)",
            order: -1,
          },
          general: {
            label: "General",
            order: 1,
          },
        },
      },
    });
  },
  Component404,
});
