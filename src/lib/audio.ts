import flipSoundUrl from "../assets/audio/card-sound-effect.m4a";
import victorySoundUrl from "../assets/audio/victory-sound.m4a";
import startSoundUrl from "../assets/audio/start-sound.m4a";

const startSound = new Audio(startSoundUrl);
const victorySound = new Audio(victorySoundUrl);

const flipSoundPool = [new Audio(flipSoundUrl), new Audio(flipSoundUrl)];
let flipSoundIndex = 0;

export function playFlipSound() {
    const audioToPlay = flipSoundPool[flipSoundIndex % flipSoundPool.length];
    audioToPlay.currentTime = 0;
    audioToPlay.play();
    flipSoundIndex++;
}

export function playStartSound() {
    startSound.currentTime = 0;
    startSound.play();
}

export function playVictorySound() {
    victorySound.currentTime = 0;
    victorySound.play();
}
