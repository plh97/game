import { useEffect } from "react";
import { useEventListener } from "usehooks-ts";

export function useBindEvent({
    moveLeft,
    moveRight,
    moveDown,
    moveDownImmediate,
    rotate,
}) {
    const event = "keydown";
    function cb(e: KeyboardEvent) {
        if (e.code === "ArrowLeft") {
            moveLeft();
        }
        if (e.code === "ArrowRight") {
            moveRight();
        }
        if (e.code === "ArrowUp") {
            rotate();
        }
        if (e.code === "ArrowDown") {
            moveDown();
        }
        if (e.code === "Space") {
            moveDownImmediate();
        }
    }
    useEventListener(event, cb);
}
