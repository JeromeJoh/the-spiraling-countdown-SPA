import { gsap } from 'gsap';

export function collectDigits(oDigits: HTMLCollection): number[] {
  return [...oDigits].map((oDigit) => parseInt(oDigit.textContent));
}

export function clearPanel(oDigit: HTMLCollection): void {
  [...oDigit].forEach((oDigit) => (oDigit.textContent = '0'));
}

export function switchController(className: string): void {
  const buttonTween = gsap.timeline({
    defaults: {
      duration: 0.3,
      ease: 'power2.inOut',
    },
    paused: true,
  });
  buttonTween
    .to('.reset', {
      x: -60,
    })
    .to(
      '#start_pause',
      {
        x: 60,
      },
      '<'
    )
    .to(
      '.plus',
      {
        y: -8,
        opacity: 0,
        scaleY: 1.8,
      },
      '<'
    )
    .to(
      '.minus',
      {
        y: 8,
        opacity: 0,
        scaleY: 1.8,
      },
      '<'
    );

  const target = document.querySelector('#start_pause');
  switch (className) {
    case 'start':
      target.className = 'pause';
      buttonTween.play();
      break;
    case 'pause':
      target.className = 'start';
      buttonTween.progress(1);
      buttonTween.reverse();
      break;
    default:
      break;
  }
}

export function disablePanel(disabled: boolean): void {
  const oPanel: HTMLElement = document.querySelector('.panel');
  if (disabled) {
    oPanel.style.pointerEvents = 'none';
  } else {
    oPanel.style.pointerEvents = 'auto';
  }
}

export function disableController(disabled: boolean): void {
  const oController: HTMLElement = document.querySelector('.controller');
  if (disabled) {
    oController.style.pointerEvents = 'none';
  } else {
    oController.style.pointerEvents = 'auto';
  }
}
