import { useEventListener } from "usehooks-ts";

interface IProps {
    moveLeft: () => void;
    moveRight: () => void;
    moveDown: () => void;
    moveUp: () => void;
}

export function useBindEvent({
    moveLeft,
    moveRight,
    moveDown,
    moveUp,
}: IProps) {
    useEventListener("keydown", (e) => {
        if (e.code === "ArrowLeft") {
            moveLeft();
        }
        if (e.code === "ArrowRight") {
            moveRight();
        }
        if (e.code === "ArrowUp") {
            moveUp();
        }
        if (e.code === "ArrowDown") {
            moveDown();
        }
    });
}
