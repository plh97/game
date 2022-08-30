import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: "./index.html",
                2048: "./2048/index.html",
                BreakoutPC: "./BreakoutPC/index.html",
                BreakoutMap: "./BreakoutPC/mapCreate.html",
                snake: "./snake/index.html",
            },
        },
    },
});
