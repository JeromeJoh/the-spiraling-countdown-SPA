export function collectDigits(oDigits: HTMLCollection): number[] {
  return [...oDigits].map((oDigit) => parseInt(oDigit.textContent));
}

export function clearPanel(oDigit: HTMLCollection): void {
  [...oDigit].forEach((oDigit) => (oDigit.textContent = '0'));
}

export function switchController(className: string): void {
  const target = document.querySelector('#start_pause');
  switch (className) {
    case 'start':
      target.className = 'pause';
      break;
    case 'pause':
      target.className = 'start';
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
