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
        this.fileService.getFileContent().subscribe(value => {
            this.inputString = value.toString();
            //console.log('File loaded')
            this.textLoaded = true;
            this.ngOnInit()
        })
    }

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

    showTypingSpeed = false;

    currentTypingSpeed: number | undefined;


    // inputString = 'the quick brown fox jumps over the lazy dog cat and elephant giraffe computer keyboard monitor and mouse make for a dynamic desktop setup whether working on a laptop or a desktop the internet connects us to vast websites developers engage in programming crafting software and understanding hardware intricacies the world of technology intersects with science mathematics and ongoing learning education at a university involves research analysis and statistical exploration information and communication form the core of language and literature creating structured paragraphs efficiency productivity and multitasking are key in meeting deadlines and project innovation creativity and imagination drive solutions to problems optimizing collaboration in teamwork effective communication in meetings supports strategic implementation for overall success'
    inputString = 'text to be loaded'
    textAreaContent = '';

    actualText = this.inputString.split(' ')
    firstRowOfWords = new Array<string>();
    secondRowOfWords = new Array<string>();

    highlightedWord!: number;

    selectedTiming!: number;

    textLoaded = false;

    ngOnInit() {
        console.log(this.indexArray);
        this.actualText = this.inputString.split(' ');
        this.firstRowOfWords = this.actualText.slice(this.startIndex, this.endIndex);
        this.secondRowOfWords = this.actualText.slice(this.endIndex, this.endIndex + DEFAULT_NO_OF_WORDS)
        // this.textAreaElement?.nativeElement.focus();
    }

    ngAfterViewInit() {
        //console.log('inside afterViewInit')
        this.textAreaElement?.nativeElement.focus()
    }

    resetTest() {
        //console.log('test reset')
        this.startIndex = 0;
        this.currentIndex = 0;
        this.endIndex = DEFAULT_NO_OF_WORDS;
        this.showTypingSpeed = false;
        this.textAreaElement?.nativeElement.enable
        this.currentTypingSpeed = undefined;
        this.textAreaContent = '';
        this.updateHighlightedIndex();
        this.textAreaElement?.nativeElement.focus();
        this.firstRowOfWords = this.actualText.slice(this.currentIndex, this.endIndex);
        this.secondRowOfWords = this.actualText.slice(this.endIndex, this.endIndex + DEFAULT_NO_OF_WORDS);
        // this.ca
        //console.log('test reset end')
    }


    onTextareaChange(event: Event): void {
        if (this.showTypingSpeed) {
            this.resetTest()
        }
        // @ts-ignore
        const input: HTMLTextAreaElement = event.target;
        const textAreaWords = input.value.split(' ');
        console.log('User INput',input.value);
        const length = input.value.split('').length;
        this.changeFirstRowOfWords(textAreaWords);
    }

    changeFirstRowOfWords(textAreaWords: string[]) {
        if (textAreaWords.length > this.endIndex) {
            this.currentIndex = this.endIndex;
            this.endIndex = Math.min(this.endIndex + DEFAULT_NO_OF_WORDS, this.actualText.length)
            //console.log(this.currentIndex, '/', this.endIndex)
            //console.log(this.firstRowOfWords.length)
            this.firstRowOfWords = this.secondRowOfWords;
            this.secondRowOfWords = this.actualText.slice(this.endIndex, this.endIndex + DEFAULT_NO_OF_WORDS)
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
        this.highlightedWord = (this.textAreaContent.split(' ').length-1) % (DEFAULT_NO_OF_WORDS);
        console.log(this.textAreaContent.split(' ').length-1 , '%', DEFAULT_NO_OF_WORDS , '=' ,this.highlightedWord);
        // console.log(this.highlightedWord);
    }
}
