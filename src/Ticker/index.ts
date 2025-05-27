import {
  collectDigits,
  disableController,
  disablePanel,
  switchController,
} from '../utils';
import countdownHandler, { openCountdown, closeCountdown } from './countdown';

export default class Ticker {
  private static instance: Ticker;
  private oDigits: HTMLCollection;
  private firstDigit: number;
  private secondDigit: number;
  private thirdDigit: number;
  private fourthDigit: number;

  public initialSeconds: number;
  private leftSeconds: number;
  private countdown: number = 15;
  private intervalId: number;

  constructor(oDigits: HTMLCollection) {
    this.oDigits = oDigits;
  }

  public static create(oDigits: HTMLCollection) {
    if (Ticker.instance) return Ticker.instance;
    return new Ticker(oDigits);
  }

  private tickHandler = () => {
    this.updateDigits(--this.leftSeconds);
    [
      this.firstDigit,
      this.secondDigit,
      this.thirdDigit,
      this.fourthDigit,
    ].forEach((digit, index) => (this.oDigits[index].textContent = digit + ''));

    if (
      this.initialSeconds > this.countdown &&
      this.leftSeconds <= this.countdown
    ) {
      openCountdown();
      countdownHandler(this.leftSeconds);
    }

    if (this.leftSeconds === 0) {
      this.runOut();
    }
  };

  private runOut() {
    disablePanel(false);
    switchController('pause');
    clearInterval(this.intervalId);
    setTimeout(() => closeCountdown(), 1000);
  }

  public start() {
    const digits: number[] = collectDigits(this.oDigits);
    [this.firstDigit, this.secondDigit, this.thirdDigit, this.fourthDigit] =
      digits;
    this.initialSeconds =
      digits[0] * 600 + digits[1] * 60 + digits[2] * 10 + digits[3];

    if (this.initialSeconds === 0) {
      disableController(true);
      return;
    } else {
      disableController(false);
    }

    this.leftSeconds = this.initialSeconds;

    this.tickHandler();
    this.intervalId = setInterval(this.tickHandler, 1000);
    disablePanel(true);
  }

  public pause() {
    clearInterval(this.intervalId);
  }

  public reset() {
    clearInterval(this.intervalId);
    disablePanel(false);
    switchController('pause');
  }

  private updateDigits(seconds: number) {
    this.firstDigit = Math.floor(seconds / 600);
    this.secondDigit = Math.floor((seconds - this.firstDigit * 600) / 60);
    this.thirdDigit = Math.floor(
      (seconds - this.firstDigit * 600 - this.secondDigit * 60) / 10
    );
    this.fourthDigit = seconds % 10;
  }
}
