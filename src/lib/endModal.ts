import { playVictorySound } from "./audio";

const endModal: HTMLDivElement | null = document.querySelector(".end-modal");

export function openEndModal() {
    endModal?.classList.add("active");
    endModal?.focus();
    playVictorySound();
}

export function closeEndModal() {
    endModal?.classList.remove("active");
}
