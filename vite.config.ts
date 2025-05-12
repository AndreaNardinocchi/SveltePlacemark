import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  //   server: {
  //     proxy: {
  //       "/api": {
  //         target: "http://localhost:3000", // Backend URL
  //         changeOrigin: true, // Ensures CORS headers are set properly
  //         secure: false, // Disable SSL verification (only for local)
  //         rewrite: (path) => path.replace(/^\/api/, "") // Optional: If your API doesn't need `/api` prefix
  //       }
  //     }

  //   }

  server: {
    proxy: {
      //  "/api": "http://localhost:3000"
      "/api": "https://placemark-v63d.onrender.com/"
    }
  }
});
