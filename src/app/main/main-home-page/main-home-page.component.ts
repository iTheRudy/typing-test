import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FileService} from "../../files.service";
import {DEFAULT_NO_OF_WORDS} from "../main.constants";

@Component({
    selector: 'app-main-home-page',
    templateUrl: './main-home-page.component.html',
    styleUrls: ['./main-home-page.component.scss']
})
export class MainHomePageComponent implements OnInit, AfterViewInit {


    constructor(protected fileService: FileService) {
    }

    shuffleText = true;

    selectedDifficultyLevel = 'easy';

    @ViewChild('buttonElement', {static: true})
    timer!: HTMLButtonElement;

    // @ViewChild("textAreaElement", {static: false})
    // textAreaElement: TemplateRef<any>;
    @ViewChild('textAreaElement') textAreaElement: ElementRef | undefined;

    startIndex = 0;
    indexFill = 0;
    currentIndex = 0;
    endIndex = DEFAULT_NO_OF_WORDS;

    indexArray = Array.from({length: DEFAULT_NO_OF_WORDS}, (_, index) => index);

    resetIndexArray() {
        this.indexArray = Array.from({length: DEFAULT_NO_OF_WORDS}, (_, index) => index);

    }

    showTypingSpeed = false;

    currentTypingSpeed: number | undefined;


    // displayText = 'the quick brown fox jumps over the lazy dog cat and elephant giraffe computer keyboard monitor and mouse make for a dynamic desktop setup whether working on a laptop or a desktop the internet connects us to vast websites developers engage in programming crafting software and understanding hardware intricacies the world of technology intersects with science mathematics and ongoing learning education at a university involves research analysis and statistical exploration information and communication form the core of language and literature creating structured paragraphs efficiency productivity and multitasking are key in meeting deadlines and project innovation creativity and imagination drive solutions to problems optimizing collaboration in teamwork effective communication in meetings supports strategic implementation for overall success'
    displayText = 'text to be loaded'
    textAreaContent = '';

    displayTextArray = this.displayText.split(' ')
    firstRowOfWords = new Array<string>();
    secondRowOfWords = new Array<string>();
    wrongWords = new Set<number>();

    highlightedWord!: number;

    selectedTiming!: number;

    textLoaded = false;

    ngOnInit() {
        console.log('text');
        this.fetchText(this.selectedDifficultyLevel);
        this.firstRowOfWords = this.displayTextArray.slice(this.startIndex, this.endIndex);
        this.secondRowOfWords = this.displayTextArray.slice(this.endIndex, this.endIndex + DEFAULT_NO_OF_WORDS)
    }

    ngAfterViewInit() {
        this.textAreaElement?.nativeElement.focus()
    }

    resetTest() {
        this.shuffleArray(this.displayTextArray);
        this.wrongWords.clear();
        console.log(this.displayTextArray)
        this.resetHighlightedIndex();
        this.enableTextArea();
        this.showTypingSpeed = false;
        this.currentTypingSpeed = undefined;
        this.textAreaContent = '';
        this.updateHighlightedIndex();
        this.textAreaElement?.nativeElement.focus();
        this.changeFirstRowOfWords(new Array<string>())
        this.resetIndexArray()
        this.firstRowOfWords = this.displayTextArray.slice(this.currentIndex, this.endIndex);
        this.secondRowOfWords = this.displayTextArray.slice(this.endIndex, this.endIndex + DEFAULT_NO_OF_WORDS);
        // this.ca
        console.log('test reset end')
    }

    fetchText(difficultyLevel: string) {
        this.selectedDifficultyLevel = difficultyLevel;
        this.fileService.getFileContent(difficultyLevel).subscribe(value => {
            this.displayText = value.toString();
            this.displayTextArray = this.displayText.split(' ');
            this.textLoaded = true;
            console.log(this.displayTextArray);
            this.resetTest();
        })
    }


    shuffleArray(strings: string[]): string[] {
        const arrayCopy = [...strings];
        if (this.shuffleText) {
            // Math.random() returns a floating point number between 0 and 1;

            for (let i = arrayCopy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
            }
        }
        this.displayTextArray = arrayCopy;
        return arrayCopy;
    }


    enableTextArea() {
        this.textAreaElement?.nativeElement.enable

    }

    resetHighlightedIndex() {
        this.startIndex = 0;
        this.currentIndex = 0;
        this.endIndex = DEFAULT_NO_OF_WORDS;
    }


    onTextareaChange(event: Event): void {
        if (this.showTypingSpeed) {
            this.resetTest()
        }
        // @ts-ignore
        const input: HTMLTextAreaElement = event.target;
        const textAreaWords = input.value.split(' ');
        console.log('User Input', input.value);
        const length = input.value.split('').length;
        this.changeFirstRowOfWords(textAreaWords);
        this.checkSpellingOfLastWord(textAreaWords, this.firstRowOfWords);
    }

    checkSpellingOfLastWord(textAreaWords: string[], firstRowOfWords: string[]) {
        const lastEnteredWord = textAreaWords[textAreaWords.length - 1];
        const correspondingDisplayWord = firstRowOfWords[this.highlightedWord];
        console.log('lastEnteredWord', lastEnteredWord);
        console.log('correspondingDisplayWord', correspondingDisplayWord);
        const wrongWord = !correspondingDisplayWord.startsWith(lastEnteredWord);
        if (wrongWord) {
            this.wrongWords.add(this.highlightedWord);
        } else {
            this.wrongWords.delete(this.highlightedWord);
        }
    }

    changeFirstRowOfWords(textAreaWords: string[]) {
        if (textAreaWords.length > this.endIndex) {
            this.wrongWords.clear();
            this.currentIndex = this.endIndex;
            this.endIndex = Math.min(this.endIndex + DEFAULT_NO_OF_WORDS, this.displayTextArray.length)
            //console.log(this.currentIndex, '/', this.endIndex)
            //console.log(this.firstRowOfWords.length)
            this.firstRowOfWords = this.secondRowOfWords;
            this.secondRowOfWords = this.displayTextArray.slice(this.endIndex, this.endIndex + DEFAULT_NO_OF_WORDS)
            console.log('firstRowOfWords', this.firstRowOfWords);
        } else {

        }
    }


    print(data?: any) {
        //console.log(data);
        // this.textAreaElement.target.click;
    }

    handleFocus() {
        //console.log('textArea on focus');
    }

    handleClick() {
        //console.log('textArea on click');
    }

    protected readonly DEFAULT_NO_OF_WORDS = DEFAULT_NO_OF_WORDS;

    updateHighlightedIndex() {
        // this.highlightedWord =
        //     console.log(this.textAreaContent);
        this.highlightedWord = (this.textAreaContent.split(' ').length - 1) % (DEFAULT_NO_OF_WORDS);
        console.log(this.textAreaContent.split(' ').length - 1, '%', DEFAULT_NO_OF_WORDS, '=', this.highlightedWord);
        // console.log(this.highlightedWord);
    }
}
