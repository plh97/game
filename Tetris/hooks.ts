import { useEventListener } from "usehooks-ts";

interface IProps {
    moveLeft: () => void;
    moveRight: () => void;
    moveDown: () => void;
    moveDownImmediate: () => void;
    rotate: () => void;
}

const event = "keydown";

export function useBindEvent({
    moveLeft,
    moveRight,
    moveDown,
    moveDownImmediate,
    rotate,
}: IProps) {
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
