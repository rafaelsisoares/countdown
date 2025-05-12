import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  title: string = "Passa Tempo";
  hours: WritableSignal<number> = signal(0);
  minutes: WritableSignal<number> = signal(0);
  seconds: WritableSignal<number> = signal(0);
  timeToggle: string = "segundos";
  visibility: WritableSignal<boolean> = signal(true);
  isRunning: WritableSignal<boolean> = signal(false);

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    switch(this.timeToggle) {
      case "horas":
        const strHours = `${this.hours()}${value}`
        this.hours.set(parseInt(strHours));
        break;

      case "minutos":
        let strMinutes: string = `${this.minutes()}${value}`;
        while (parseInt(strMinutes) >= 60) {
          const minutesAfterConversion: number = parseInt(strMinutes) - 60;
          this.hours.set(this.hours() + 1);
          this.minutes.set(minutesAfterConversion);
          strMinutes = minutesAfterConversion.toString();
        }
        this.minutes.set(parseInt(strMinutes));
        break;

      case "segundos":
        let strSeconds: string = `${this.seconds()}${value}`;
        while (parseInt(strSeconds) >= 60) {
          const secondsAfterConversion: number = parseInt(strSeconds) - 60
          this.minutes.set(this.minutes() + 1);
          this.seconds.set(secondsAfterConversion);
          strSeconds = secondsAfterConversion.toString();
        }
        this.seconds.set(parseInt(strSeconds));
        break;

      default:
        console.log("erro!");
        break;

    }
  }

  reset(): void {
    this.hours.set(0);
    this.minutes.set(0);
    this.seconds.set(0);
  }

  handleChangeTimeToggle(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.value);

    this.timeToggle = target.value;
  }

  countdown(): void {
    this.visibility.set(true);
    this.isRunning.set(true);
    const interval = setInterval(() => {
      if (this.hours() === 0 && this.minutes() === 0 && this.seconds() === 1) {
        this.visibility.set(!this.visibility());
        this.isRunning.set(!this.isRunning());
        clearInterval(interval);
      }
      if (this.seconds() <= 0) {
        if (this.minutes() <= 0) {
          this.hours.set(this.hours() - 1);
          this.minutes.set(60);
        }
        this.minutes.set(this.minutes() - 1);
        this.seconds.set(60);
      }
      this.seconds.set(this.seconds() - 1);
    }, 1000);
  }
}
