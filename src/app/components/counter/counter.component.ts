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
  visibility: WritableSignal<boolean> = signal(false);

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    value >= 60 ? this.hours.set(1) : this.minutes.set(value);
  }

  countdown(): void {
    this.visibility.set(false);
    const interval = setInterval(() => {
      if (this.hours() === 0 && this.minutes() === 0 && this.seconds() === 0) {
        clearInterval(interval);
        this.visibility.set(!this.visibility());
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
//
