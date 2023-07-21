const oCountdown = document.querySelector('.countdown');

export default function countdownHandler(seconds: number): void {
  if(!oCountdown.classList.contains('active')) {
    oCountdown.classList.add('active');
  }

  // image
  oCountdown.querySelector('img').src = getImgUrl(seconds);

  // audio
  let audio: HTMLAudioElement =  new Audio('src/assets/sounds/smashed.wav');

  switch(seconds) {
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 6:
    case 1:
      audio = new Audio('src/assets/sounds/tick.wav');
      break;
    case 0:
      audio.play();
      audio = new Audio('src/assets/sounds/outro.mp3');
      break;
    default:
      break;
  }

  audio.play();
}

export function closeCountdown() {
  oCountdown.classList.remove('active');
}

function getImgUrl(num: number): string {
  return new URL(`../assets/svg/${num}.svg`, import.meta.url).href;
}