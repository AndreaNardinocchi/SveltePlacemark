import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  // https://devs.keenthemes.com/question/you-can-also-disable-this-overlay-by-setting-serverhmroverlay-to-false-in-viteconfigjs
  server: {
    hmr: {
      overlay: false
    }
  }
});
