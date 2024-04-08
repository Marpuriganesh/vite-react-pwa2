import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [
    VitePWA({
      mode: "production",
      base: "/",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["vite-72x72.svg", "vite-96x96.svg", "vite-128x128.svg", "vite-144x144.svg", "vite-152x152.svg", "vite-192x192.svg", "vite-384x384.svg", "vite-512x512.svg","vite.ico"],
      manifest: {
        name: "PWA Router",
        short_name: "PWA Router",
        theme_color: "#242424",
        icons: [

          {
            src: "vite.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "vite-72x72.svg",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "vite-96x96.svg",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "vite-128x128.svg",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "vite-144x144.svg",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "vite-152x152.svg",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "vite-192x192.svg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "vite-384x384.svg",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "vite-512x512.svg",
            sizes: "512x512",
            type: "image/png",

          },
        ],
        display: "standalone",
        start_url: "/",
        orientation: "portrait",

      },
      // injectRegister: null,
      strategies: "injectManifest",
      filename:"firebase-messaging-sw.js",
      injectManifest: {
        injectionPoint: undefined
      },
    }),
    react(),
    mkcert(),

  ],

  server: {
    port: 4001,
    open: true
  },
});
