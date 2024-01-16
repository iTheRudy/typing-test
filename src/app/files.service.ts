// file.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    constructor(private httpClient: HttpClient) {
    }

    getFileContent(difficultyLevel: string): Observable<string> {
        return this.httpClient.get(`assets/${difficultyLevel}.txt`, {responseType: 'text'})
    }
}
