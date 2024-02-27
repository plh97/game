import { useEventListener } from "usehooks-ts";
import { DOWN, LEFT, RIGHT, UP } from "./constants";

interface IProps {
    move: (dir: string) => void;
    // moveLeft?: () => void;
    // moveRight?: () => void;
    // moveDown?: () => void;
    // moveUp?: () => void;
}

export function useBindEvent({ move }: IProps) {
    useEventListener("keydown", (e) => {
        if (e.code === "ArrowLeft") {
            move(LEFT);
        }
        if (e.code === "ArrowRight") {
            move(RIGHT);
        }
        if (e.code === "ArrowUp") {
            move(UP);
        }
        if (e.code === "ArrowDown") {
            move(DOWN);
        }
    });
}
