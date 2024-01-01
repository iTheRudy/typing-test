import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
    selector: 'app-main-home-page',
    templateUrl: './main-home-page.component.html',
    styleUrls: ['./main-home-page.component.scss']
})
export class MainHomePageComponent implements OnInit, AfterViewInit {


    constructor() {
    }


    // @ViewChild("textAreaElement", {static: false})
    // textAreaElement: TemplateRef<any>;
    @ViewChild('textAreaElement') textAreaElement: ElementRef | undefined;

    startIndex = 0;
    currentIndex = 0;
    endIndex = 0;

    showTypingSpeed = false;

    currentTypingSpeed: number | undefined;


    inputString = 'the quick brown fox jumps over the lazy dog cat and elephant giraffe computer keyboard monitor and mouse make for a dynamic desktop setup whether working on a laptop or a desktop the internet connects us to vast websites developers engage in programming crafting software and understanding hardware intricacies the world of technology intersects with science mathematics and ongoing learning education at a university involves research analysis and statistical exploration information and communication form the core of language and literature creating structured paragraphs efficiency productivity and multitasking are key in meeting deadlines and project innovation creativity and imagination drive solutions to problems optimizing collaboration in teamwork effective communication in meetings supports strategic implementation for overall success'
    textAreaContent = '';

    actualText = this.inputString.split(' ')
    displayWords = new Array<string>();
    selectedTiming!: number;


    ngOnInit() {
        this.actualText = this.inputString.split(' ');
        this.endIndex = 10
        this.displayWords = this.actualText.slice(this.startIndex, this.endIndex);
        // this.textAreaElement?.nativeElement.focus();
    }

    ngAfterViewInit() {
        console.log('inside afterViewInit')
        this.textAreaElement?.nativeElement.focus()
    }

    resetTest() {
        console.log('test reset')
        this.startIndex = 0;
        this.currentIndex = 0;
        this.endIndex = 10;
        this.showTypingSpeed = false;
        this.textAreaElement?.nativeElement.enable
        this.currentTypingSpeed = undefined;
        this.textAreaContent = '';
        this.textAreaElement?.nativeElement.focus();
        this.displayWords = this.actualText.slice(this.currentIndex, this.endIndex)
        console.log('test reset end')
    }


    onTextareaChange(event: Event): void {
        // @ts-ignore
        const input: HTMLTextAreaElement = event.target;
        const textAreaWords = input.value.split(' ');
        const length = input.value.split('').length;
        this.changeDisplayWords(textAreaWords);
    }

    changeDisplayWords(textAreaWords: string[]) {
        if (textAreaWords.length == this.endIndex) {
            this.currentIndex = this.endIndex;
            this.endIndex = Math.min(this.endIndex + 10, this.actualText.length)
            console.log(this.currentIndex, '/', this.endIndex)
            console.log(this.displayWords.length)
            this.displayWords = this.actualText.slice(this.currentIndex, this.endIndex);
        }
    }




    print(data?: any) {
        console.log(data);
        // this.textAreaElement.target.click;
    }

    handleFocus() {
        console.log('textArea on focus');
    }

    handleClick() {
        console.log('textArea on click');
    }
}
