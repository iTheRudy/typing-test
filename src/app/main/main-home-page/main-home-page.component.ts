import {
    AfterViewInit, Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren
} from '@angular/core';
import {FileService} from "../../files.service";
import {DEFAULT_NO_OF_WORDS} from "../main.constants";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";
import {interval, Subscription} from "rxjs";

@Component({
    selector: 'app-main-home-page',
    templateUrl: './main-home-page.component.html',
    styleUrls: ['./main-home-page.component.scss']
})
export class MainHomePageComponent implements OnInit, AfterViewInit {


    subscription!: Subscription;

    updateCount = 0;

    constructor(protected fileService: FileService) {
        // this.subscription = interval(100) // 1000 milliseconds = 1 second
        //     .subscribe(() => {
        //         // Function to run every interval
        //         if (this.updateCount == 5) {
        //             this.subscription.unsubscribe();
        //             console.log('unsubscribed')
        //             return;
        //         }
        //         this.updateCount++;
        //         this.myFunction();
        //     });
        this.restartBackgroundUpdateSubscription();
    }

    myFunction() {
        // console.log('Subscription Started');
        this.handleBackgroundChange()
    }

    ngOnDestroy() {
        // Unsubscribe from the interval when component is destroyed
        this.subscription.unsubscribe();
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

    highlightedElement = document.getElementsByClassName('highlighted-word')[0];
    @ViewChild('backgroundDiv')
    backgroundDiv!: HTMLElement;


    ngOnInit() {
        //console.log('text');
        this.fetchText(this.selectedDifficultyLevel);
        this.firstRowOfWords = this.displayTextArray.slice(this.startIndex, this.endIndex);
        this.secondRowOfWords = this.displayTextArray.slice(this.endIndex, this.endIndex + DEFAULT_NO_OF_WORDS)


    }

    ngAfterViewInit() {
        //console.log('After view init');

        this.textAreaElement?.nativeElement.focus()// backgroundDiv!.style.height = this.highlightedElement.clientHeight+"";
    }

    handleBackgroundChange() {

        setTimeout(() => {
        }, 100)
        if (this.backgroundDiv?.style) {
            if (this.showTypingSpeed || this.textAreaElement?.nativeElement?.focusout) {
                this.backgroundDiv.style.display = "none";
            } else {
                this.backgroundDiv.style.display = "inline-block";
            }
        }
        this.highlightedElement = document.getElementsByClassName('highlighted-word')[0];
        const rect = this.highlightedElement?.getBoundingClientRect();
        // @ts-ignore
        this.backgroundDiv = document.getElementById('background-div');
        // console.log(this.highlightedElement);
        // console.log(this.backgroundDiv);
        try {
            this.backgroundDiv!.style.top = `${rect.top}px`;
            this.backgroundDiv!.style.left = `${rect.left}px`;
            this.backgroundDiv!.style.width = `${rect.width}px`;
            this.backgroundDiv!.style.height = `${rect.height}px`;
        } catch (e) {

        }
        // console.log(this.backgroundDiv);
    }

    restartBackgroundUpdateSubscription() {
        this.subscription = new Subscription();
        this.updateCount = 0;
        this.subscription = interval(1) // 1000 milliseconds = 1 second
            .subscribe(() => {
                // Function to run every interval
                if (this.updateCount == 5) {
                    this.subscription.unsubscribe();
                    // console.log('unsubscribed')
                    return;
                }
                this.updateCount++;
                this.myFunction();
            });
    }

    resetTest() {
        // this.restartBackgroundUpdateSubscription();
        this.shuffleArray(this.displayTextArray);
        this.wrongWords.clear();
        //console.log(this.displayTextArray)
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
        //console.log('test reset end')
    }

    fetchText(difficultyLevel: string) {
        this.selectedDifficultyLevel = difficultyLevel;
        const fetchTextSubscription = this.fileService.getFileContent(difficultyLevel).subscribe(value => {
            this.displayText = value.toString();
            this.displayTextArray = this.displayText.split(' ');
            this.textLoaded = true;
            console.log(this.displayTextArray);
            this.resetTest();
        })
        // fetchTextSubscription.unsubscribe();
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
        this.updateHighlightedIndex();
    }


    onTextareaChange(event: Event): void {
        // this.handleBackgroundChange();
        if (this.showTypingSpeed) {
            this.resetTest()
        }
        // @ts-ignore
        const input: HTMLTextAreaElement = event.target;
        const textAreaWords = input.value.split(' ');
        //console.log('User Input', input.value);
        const length = input.value.split('').length;
        console.log("length:", textAreaWords.length % 10);
        this.changeFirstRowOfWords(textAreaWords);
        this.checkSpellingOfLastWord(textAreaWords, this.firstRowOfWords);
    }

    checkSpellingOfLastWord(textAreaWords: string[], firstRowOfWords: string[]) {
        const lastEnteredWord = textAreaWords[textAreaWords.length - 1];
        const correspondingDisplayWord = firstRowOfWords[this.highlightedWord];
        const previousFirstRowOfWord = firstRowOfWords[this.highlightedWord - 1];
        const previousEnteredWord = textAreaWords[textAreaWords.length - 2];
        if (previousFirstRowOfWord !== previousEnteredWord) {
            this.wrongWords.add(this.highlightedWord - 1);
        }
        //console.log('lastEnteredWord', lastEnteredWord);
        //console.log('correspondingDisplayWord', correspondingDisplayWord);
        const wrongWord = !correspondingDisplayWord.startsWith(lastEnteredWord);
        if (wrongWord) {
            this.wrongWords.add(this.highlightedWord);
        } else {
            this.wrongWords.delete(this.highlightedWord);
        }
    }

    collectedWords: string[] = [];

    changeFirstRowOfWords(textAreaWords: string[]) {
        // if (textAreaWords.length % 10 == 10)
        if (textAreaWords.length > this.endIndex) {
            this.restartBackgroundUpdateSubscription();
            // this.collectedWords.concat(this.textAreaContent.split(' '));
            // this.textAreaContent = '';
            // console.log(this.collectedWords);
            this.wrongWords.clear();
            this.currentIndex = this.endIndex;
            this.endIndex = Math.min(this.endIndex + DEFAULT_NO_OF_WORDS, this.displayTextArray.length)
            ////console.log(this.currentIndex, '/', this.endIndex)
            ////console.log(this.firstRowOfWords.length)
            this.firstRowOfWords = this.secondRowOfWords;
            this.secondRowOfWords = this.displayTextArray.slice(this.endIndex, this.endIndex + DEFAULT_NO_OF_WORDS)
            //console.log('firstRowOfWords', this.firstRowOfWords);
        } else {

        }
    }


    print(data?: any) {
        ////console.log(data);
        // this.textAreaElement.target.click;
    }

    handleFocus() {
        let words = document.getElementsByClassName('actual-word');
        //console.log('actual-words', words[0]);
        words[0]?.classList?.add('highlighted-word');
        this.highlightedElement = document.getElementsByClassName('highlighted-word')[0];
        //console.log('actual-words', words[0]);
        this.handleBackgroundChange();
        ////console.log('textArea on focus');
    }

    handleClick() {
        ////console.log('textArea on click');
    }

    protected readonly DEFAULT_NO_OF_WORDS = DEFAULT_NO_OF_WORDS;

    updateHighlightedIndex() {
        // this.handleBackgroundChange();
        // this.highlightedWord =
        //     //console.log(this.textAreaContent);
        this.highlightedWord = (this.textAreaContent.split(' ').length - 1) % (DEFAULT_NO_OF_WORDS);
        //console.log(this.textAreaContent.split(' ').length - 1, '%', DEFAULT_NO_OF_WORDS, '=', this.highlightedWord);
        let words = document.getElementsByClassName('actual-word');
        this.highlightedElement = document.getElementsByClassName('highlighted-word')[0];
        this.highlightedElement?.classList.remove('highlighted-word');
        words[this.highlightedWord % 10]?.classList?.add('highlighted-word');
        this.highlightedElement = document.getElementsByClassName('highlighted-word')[0];
        //console.log('highlighted' , this.highlightedElement?.innerHTML);
        this.handleBackgroundChange();
        // this.handleBackgroundChange();
        // //console.log(this.highlightedWord);
    }
}
