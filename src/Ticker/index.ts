import {
  collectDigits,
  disableController,
  disablePanel,
  switchController,
} from '../utils';
import countdownHandler, { openCountdown, closeCountdown } from './countdown';
import { gsap } from 'gsap';

const COUNTDOWN_THRESHOLD = 15;
const DIGIT_COUNT = 4;
const ANIMATION_CONFIG = {
  // y: -8,
  // stagger: 0.05,
  opacity: 0.5,
  ease: 'power2.inOut',
  duration: 0.3,
};
const COUNTDOWN_CLOSE_DELAY = 1000;

export default class Ticker {
  private static instance: Ticker;
  private digitElements: HTMLCollection;
  private digits: number[] = new Array(DIGIT_COUNT).fill(0);
  public initialSeconds: number;
  private remainingSeconds: number;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(digitElements: HTMLCollection) {
    this.digitElements = digitElements;
  }

  public static create(digitElements: HTMLCollection) {
    return (Ticker.instance ??= new Ticker(digitElements));
  }

  private tickHandler() {
    this.remainingSeconds--;
    this.updateDigits();
    this.updateDisplay();
    this.animateDigits();

    if (
      this.initialSeconds > COUNTDOWN_THRESHOLD &&
      this.remainingSeconds <= COUNTDOWN_THRESHOLD
    ) {
      openCountdown();
      countdownHandler(this.remainingSeconds);
    }

    if (this.remainingSeconds <= 0) {
      this.runOut();
      return;
    }
  }

  private runOut(): void {
    this.cleanup();
    disablePanel(false);
    switchController('pause');
    setTimeout(closeCountdown, COUNTDOWN_CLOSE_DELAY);
  }

  public start() {
    this.digits = collectDigits(this.digitElements);

    this.initialSeconds = this.calculateTotalSeconds(this.digits);

    if (this.initialSeconds === 0) return;

    disableController(false);

    this.remainingSeconds = this.initialSeconds;

    this.tickHandler();
    this.intervalId = setInterval(() => this.tickHandler(), 1000);
    disablePanel(true);
  }

  public pause() {
    this.cleanup();
  }

  public reset() {
    this.cleanup();
    this.digits.fill(0);
    disablePanel(false);
    switchController('pause');
  }

  private cleanup(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private calculateTotalSeconds(digits: number[]): number {
    return digits[0] * 600 + digits[1] * 60 + digits[2] * 10 + digits[3];
  }

  private updateDigits(): void {
    let remaining = this.remainingSeconds;
    this.digits[0] = Math.floor(remaining / 600);
    remaining %= 600;
    this.digits[1] = Math.floor(remaining / 60);
    remaining %= 60;
    this.digits[2] = Math.floor(remaining / 10);
    this.digits[3] = remaining % 10;
  }

  private updateDisplay(): void {
    Array.from(this.digitElements).forEach((element, index) => {
      element.textContent = this.digits[index].toString();
    });
  }

  private animateDigits(): void {
    gsap.killTweensOf(this.digitElements);
    gsap.from(this.digitElements, ANIMATION_CONFIG);
    // gsap.from('.semicolon', {
    //   color: '#0d0d0d',
    // });
  }
}
