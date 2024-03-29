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
    selectedDifficultyLevel!: string;

    @Input()
    displayTextArray!: string[];

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
        //console.log('this.words;', this.displayTextArray)
        let i = 0;
        let correctWords = 0;
        let multiplier = 60 / this.selectedTiming;
        console.log('user input text in calculate speed', this.userInputText);
        //console.log(this.userInputText.length);
        this.userInputText.map(value => {
            //console.log('value ', value, ' word ', this.displayTextArray[i])
            if (value === this.displayTextArray[i]) {
                correctWords++;
                //console.log(correctWords)
                //console.log(value)
                this.validCharacters += this.displayTextArray[i].length
                this.correctText += value + ' ';
            }
            this.totalCharacters += value.length;
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

    reset(){
        this.totalCharacters = 0;
        this.validCharacters = 0;
        this.currentTypingSpeed = 0;
    }

}
