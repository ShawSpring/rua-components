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
import "./style.css";

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
      label: "Guide",
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
        { key: "dark", element: <ThemeItem theme="dark" />, onclick: setTheme },
        {
          key: "system",
          element: <ThemeItem theme="system" />,
          onclick: setTheme,
        },
        {
          key: "corporate",
          element: <ThemeItem theme="corporate" />,
          onclick: setTheme,
        },
        {
          key: "dracula",
          element: <ThemeItem theme="dracula" />,
          onclick: setTheme,
        },
        {
          key: "cupcake",
          element: <ThemeItem theme="cupcake" />,
          onclick: setTheme,
        },
        {
          key: "bumblebee",
          element: <ThemeItem theme="bumblebee" />,
          onclick: setTheme,
        },
        {
          key: "luxury",
          element: <ThemeItem theme="luxury" />,
          onclick: setTheme,
        },
        {
          key: "wireframe",
          element: <ThemeItem theme="wireframe" />,
          onclick: setTheme,
        },
        {
          key: "halloween",
          element: <ThemeItem theme="halloween" />,
          onclick: setTheme,
        },
        {
          key: "black",
          element: <ThemeItem theme="black" />,
          onclick: setTheme,
        },

        {
          key: "valentine",
          element: <ThemeItem theme="valentine" />,
          onclick: setTheme,
        },
        {
          key: "emerald",
          element: <ThemeItem theme="emerald" />,
          onclick: setTheme,
        },
        { key: "cmyk", element: <ThemeItem theme="cmyk" />, onclick: setTheme },
        {
          key: "cyberpunk",
          element: <ThemeItem theme="cyberpunk" />,
          onclick: setTheme,
        },
        {
          key: "retro",
          element: <ThemeItem theme="retro" />,
          onclick: setTheme,
        },
        {
          key: "fantasy",
          element: <ThemeItem theme="fantasy" />,
          onclick: setTheme,
        },
        {
          key: "garden",
          element: <ThemeItem theme="garden" />,
          onclick: setTheme,
        },
        { key: "aqua", element: <ThemeItem theme="aqua" />, onclick: setTheme },
        {
          key: "pastel",
          element: <ThemeItem theme="pastel" />,
          onclick: setTheme,
        },
        { key: "lofi", element: <ThemeItem theme="lofi" />, onclick: setTheme },
        {
          key: "forest",
          element: <ThemeItem theme="forest" />,
          onclick: setTheme,
        },
        {
          key: "autumn",
          element: <ThemeItem theme="autumn" />,
          onclick: setTheme,
        },
        {
          key: "synthwave",
          element: <ThemeItem theme="synthwave" />,
          onclick: setTheme,
        },
        {
          key: "business",
          element: <ThemeItem theme="business" />,
          onclick: setTheme,
        },
        { key: "acid", element: <ThemeItem theme="acid" />, onclick: setTheme },
        {
          key: "lemonade",
          element: <ThemeItem theme="lemonade" />,
          onclick: setTheme,
        },
        {
          key: "night",
          element: <ThemeItem theme="night" />,
          onclick: setTheme,
        },
        {
          key: "coffee",
          element: <ThemeItem theme="coffee" />,
          onclick: setTheme,
        },
        {
          key: "winter",
          element: <ThemeItem theme="winter" />,
          onclick: setTheme,
        },
        { key: "dim", element: <ThemeItem theme="dim" />, onclick: setTheme },
        { key: "nord", element: <ThemeItem theme="nord" />, onclick: setTheme },
        {
          key: "sunset",
          element: <ThemeItem theme="sunset" />,
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
