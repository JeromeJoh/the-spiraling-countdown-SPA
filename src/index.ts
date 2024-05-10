import './style.css';
import Ticker from './Ticker/index';
import { clearPanel, switchController } from './utils';

(function (doc: Document) {
  const oPanel: HTMLElement = doc.querySelector('.panel');
  const oDigits: HTMLCollection = oPanel.getElementsByClassName('num');
  const oController: HTMLElement = doc.querySelector('.controller');
  let ticker: Ticker;

  const init = (): void => {
    ticker = Ticker.create(oDigits);
    bindEvent();
  };

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
        switchController(className);
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
})(document);
