import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react(), vue()],
    build: {
        rollupOptions: {
            input: {
                index: "./index.html",
                2048: "./2048/index.html",
                BreakoutPC: "./BreakoutPC/index.html",
                BreakoutMap: "./BreakoutPC/mapCreate.html",
                Snake: "./Snake/index.html",
                Tetris: "./Tetris/index.html",
            },
        },
    },
});
