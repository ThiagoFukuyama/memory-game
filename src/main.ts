import { icons } from "./lib/icons";
import { createTile } from "./lib/createTile";
import { playStartSound, playFlipSound } from "./lib/audio";
import { openEndModal, closeEndModal } from "./lib/endModal";

const FLIPPED_CLASSNAME = "flipped";

const tilesContainer: HTMLDivElement | null = document.querySelector(".tiles");

document.querySelectorAll(".restart-button").forEach((button) => {
    button.addEventListener("click", restartGame);
});

let tileCount: number = 0;
let revealedCount: number = 0;
let prevTile: HTMLButtonElement | null = null;
let isAwaitingEndOfMove: boolean = false;

startGame();

function startGame() {
    const gameIcons = icons[getRandomIndex(icons.length)];
    const iconsPicklist = [...gameIcons, ...gameIcons];
    tileCount = iconsPicklist.length;

    if (tilesContainer) tilesContainer.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < tileCount; i++) {
        const randomIndex = getRandomIndex(iconsPicklist.length);
        const icon = iconsPicklist[randomIndex];
        iconsPicklist.splice(randomIndex, 1);

        const tile = createTile(icon, 40 * i);
        tile.setAttribute("data-icon", icon);
        tile.style.pointerEvents = "none";

        tile.addEventListener("click", handleTileClick);
        tile.addEventListener(
            "animationend",
            () => (tile.style.pointerEvents = "all")
        );

        fragment.appendChild(tile);
    }

    tilesContainer?.appendChild(fragment);
    playStartSound();
}

function handleTileClick(e: MouseEvent) {
    const currentTile = e.currentTarget as HTMLButtonElement;

    if (isAwaitingEndOfMove || currentTile === prevTile) return;

    currentTile.classList.add("flipped");
    playFlipSound();

    if (!prevTile) {
        prevTile = currentTile;
        return;
    }

    if (
        currentTile.getAttribute("data-icon") ==
        prevTile.getAttribute("data-icon")
    ) {
        currentTile.removeEventListener("click", handleTileClick);
        prevTile.removeEventListener("click", handleTileClick);

        revealedCount += 2;
        prevTile = null;
        isAwaitingEndOfMove = false;

        if (revealedCount === tileCount) setTimeout(openEndModal, 1000);

        return;
    }

    isAwaitingEndOfMove = true;
    setTimeout(() => {
        currentTile.classList.remove(FLIPPED_CLASSNAME);
        prevTile?.classList.remove(FLIPPED_CLASSNAME);
        prevTile = null;
        isAwaitingEndOfMove = false;
    }, 850);
}

function restartGame() {
    revealedCount = 0;
    prevTile = null;
    isAwaitingEndOfMove = false;

    tilesContainer?.focus();
    closeEndModal();
    startGame();
}

function getRandomIndex(arrayLength: number): number {
    return Math.floor(Math.random() * arrayLength);
}
