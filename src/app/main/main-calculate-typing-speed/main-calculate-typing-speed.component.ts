import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-main-calculate-typing-speed',
    templateUrl: './main-calculate-typing-speed.component.html',
    styleUrls: ['./main-calculate-typing-speed.component.scss']
})
export class MainCalculateTypingSpeedComponent implements AfterViewInit {
    @Input()
    showTypingSpeed = false;

    currentTypingSpeed: number | undefined;

    @Input()
    actualText!: string[];

    @Input()
    userInputText!: string[];

    @Input()
    selectedTiming!: number;

    totalCharacters = 0;

    validCharacters = 0;

    newCalculatedSpeed!: number;

    calculatedRawSpeed!: number;

    @Output()
    typingSpeedCalculated = new EventEmitter<number>();

    correctText = '';

    calculateSpeed() {
        //console.log('inputwords;', this.userInputText)
        //console.log('this.words;', this.actualText)
        let i = 0;
        let correctWords = 0;
        let multiplier = 60 / this.selectedTiming;
        //console.log(this.userInputText.length);
        this.userInputText.map(value => {
            //console.log('value ', value, ' word ', this.actualText[i])
            if (value === this.actualText[i]) {
                correctWords++;
                //console.log(correctWords)
                //console.log(value)
                this.validCharacters += this.actualText[i].length
                this.correctText += value + ' ';
            }
            this.totalCharacters += this.actualText[i].length;
            i++;
        })
        //console.log('correctWords ', correctWords);
        //console.log('multiplier ', multiplier)
        console.log(this.validCharacters)
        //console.log(this.correctText)
        this.newCalculatedSpeed = (this.validCharacters / 5) / (this.selectedTiming / 60);
        //console.log(`(${this.validCharacters}/5)/(${this.selectedTiming}/60) = ${this.newCalculatedSpeed}`)
        this.calculatedRawSpeed = (this.totalCharacters / 5) / (this.selectedTiming / 60);
        this.currentTypingSpeed = correctWords * multiplier;
        this.typingSpeedCalculated.emit(this.currentTypingSpeed)
    }

    ngAfterViewInit() {
        //console.log('from calculator', this.selectedTiming)
    }

}
