import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-main-calculate-typing-speed',
    templateUrl: './main-calculate-typing-speed.component.html',
    styleUrls: ['./main-calculate-typing-speed.component.scss']
})
export class MainCalculateTypingSpeedComponent implements AfterViewInit{
    @Input()
    showTypingSpeed = false;

    currentTypingSpeed: number | undefined;

    @Input()
    actualText!: string[];

    @Input()
    userInputText!: string[];

    @Input()
    selectedTiming!: number;

    @Output()
    typingSpeedCalculated = new EventEmitter<number>();

    calculateSpeed(){
        console.log('inputwords;', this.userInputText)
        console.log('this.words;', this.actualText)
        let i = 0;
        let correctWords = 0;
        let multiplier = 60 / this.selectedTiming;
        console.log(this.userInputText.length);
        this.userInputText.map(value => {
            console.log('value ', value, ' word ', this.actualText[i])
            if (value === this.actualText[i]) {
                correctWords++;
            }
            i++;
        })
        console.log('correctWords ', correctWords);
        console.log('multiplier ', multiplier)
        this.currentTypingSpeed = correctWords * multiplier;
        this.typingSpeedCalculated.emit(this.currentTypingSpeed)
    }

    ngAfterViewInit() {
        console.log('from calculator', this.selectedTiming)
    }

}
