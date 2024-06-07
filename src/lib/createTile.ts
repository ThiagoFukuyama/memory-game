export function createTile(icon: string, animationDelay: number) {
    const tile = document.createElement("button");
    tile.classList.add("tile");
    tile.style.animationDelay = `${animationDelay}ms`;

    const tileIcon = document.createElement("span");
    tileIcon.classList.add("tile-icon");
    tileIcon.textContent = icon;

    tile.appendChild(tileIcon);

    return tile;
}
