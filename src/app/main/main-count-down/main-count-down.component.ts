import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-main-count-down',
    templateUrl: './main-count-down.component.html',
    styleUrls: ['./main-count-down.component.scss']
})
export class MainCountDownComponent implements OnInit {


    selectedTiming = 10;

    timings = [10, 15, 30, 60, 120];

    difficultyLevels = ['easy', 'medium', 'hard'];

    selectedDifficultyLevel = this.difficultyLevels[0];

    @Output()
    selectedTimingChanged = new EventEmitter<number>();

    @Output()
    selectedDifficultyLevelChanged = new EventEmitter<string>();

    countdown: number | undefined;

    timerStarted = false;
    timerInterval: any;
    @Output()
    timerEnded = new EventEmitter<boolean>();


    ngOnInit() {
        this.selectedTiming = this.timings[0];
        this.countdown = this.selectedTiming;
        this.selectedTimingChanged.emit(this.selectedTiming)
    }

    changeTime = () => {
        // @ts-ignore
        this.countdown--;
        if (this.countdown == 0) {
            this.timerEnded.emit(true);
            clearInterval(this.timerInterval)
        }
    }

    initializeTimer() {
        if (!this.timerStarted) {
            this.timerStarted = true;
            this.setTimeIntervalAndStartTimer()
        }
    }

    setTimeIntervalAndStartTimer() {
        //console.log('inside setTimeIntervalAndStartTimer')
        this.timerInterval = setInterval(this.changeTime, 1000)
    }

    reset() {
        this.countdown = this.selectedTiming;
        this.timerStarted = false;
        clearInterval(this.timerInterval)
    }

}
