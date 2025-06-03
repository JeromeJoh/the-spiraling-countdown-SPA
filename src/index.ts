import Ticker from './Ticker/index';
import { clearPanel, switchController } from './utils';
import { gsap } from 'gsap';

const oPanel: HTMLElement = document.querySelector('.panel');
const oDigits: HTMLCollection = oPanel.getElementsByClassName('num');
const oController: HTMLElement = document.querySelector('.controller');
let ticker: Ticker;

const init = (): void => {
  ticker = Ticker.create(oDigits);
  bindEvent();
  entranceAnimation();
};

function entranceAnimation(): void {
  const plusButton: HTMLElement[] = Array.from(
    document.querySelectorAll('.plus')
  );
  const minusButton: HTMLElement[] = Array.from(
    document.querySelectorAll('.minus')
  );
  const tl = gsap.timeline({
    defaults: {
      duration: 0.3,
      ease: 'power2.inOut',
    },
  });

  gsap.set(plusButton, {
    transformOrigin: 'top center',
    rotate: (index) => (index > 2 ? -20 : 20),
    ease: 'power1.inOut',
    opacity: 0,
  });

  tl.from('.panel', {
    y: -100,
    opacity: 0,
  })
    .from('.num', {
      y: -8,
      stagger: 0.05,
      opacity: 0,
    })
    .to(
      plusButton,
      {
        transformOrigin: 'top center',
        rotate: 0,
        opacity: 1,
      },
      '<'
    )
    .to(
      minusButton,
      {
        y: 0,
        opacity: 1,
      },
      '<'
    )
    .from('.controller', {
      y: -8,
      opacity: 0,
    })
    .from('.decor img', {
      rotate: 360,
      scale: 0,
      ease: 'elastic.out(1, 0.6)',
      duration: 2,
    });
}

function bindEvent(): void {
  oPanel?.addEventListener('click', handleSetTime, false);
  oController?.addEventListener('click', handleController, false);
}

function handleSetTime(e: MouseEvent): void {
  const tar: HTMLElement = e.target as HTMLElement;
  const tagName: string = tar.tagName.toLowerCase();

  if (tagName !== 'button') return;

  const className: string = tar.className;
  const oUnit: HTMLElement = tar.parentElement.querySelector('.num');
  let currentDigit: number = parseInt(oUnit.textContent);

  switch (className) {
    case 'plus':
      currentDigit < 9 && currentDigit++;
      break;
    case 'minus':
      currentDigit > 0 && currentDigit--;
      break;
    default:
      break;
  }

  oUnit.textContent = currentDigit + '';
}

function handleController(e: MouseEvent): void {
  const tar: HTMLElement = e.target as HTMLElement;
  const tagName: string = tar.tagName.toLowerCase();

  if (tagName !== 'button') return;

  const className = tar.className;

  switch (className) {
    case 'start':
      ticker.start();
      if (ticker.initialSeconds) switchController(className);
      else
        gsap.from(['.plus', '.minus'], {
          scale: 0,
          duration: 0.5,
        });
      break;
    case 'pause':
      ticker.pause();
      switchController(className);
      break;
    case 'reset':
      ticker.reset();
      clearPanel(oDigits);
      switchController(className);
      break;
    default:
      break;
  }
}

init();
