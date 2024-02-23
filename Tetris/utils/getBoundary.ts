export function getBoundary(matrix: number[][]) {
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i].some((e) => e > 0)) {
            top = i;
            break;
        }
    }
    for (let i = matrix.length - 1; i >= 0; i--) {
        if (matrix[i].some((e) => e > 0)) {
            bottom = i;
            break;
        }
    }
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix.some((e) => e[i] > 0)) {
            left = i;
            break;
        }
    }
    for (let i = matrix[0].length - 1; i >= 0; i--) {
        if (matrix.some((e) => e[i] > 0)) {
            right = i;
            break;
        }
    }
    return { top, bottom, left, right };
}
