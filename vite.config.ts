import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                index: "./index.html",
                2048: "./2048/index.html",
                "2048dom": "./2048dom/index.html",
                BreakoutPC: "./BreakoutPC/index.html",
                BreakoutMap: "./BreakoutPC/mapCreate.html",
                Snake: "./Snake/index.html",
                Tetris: "./Tetris/index.html",
            },
        },
    },
});
