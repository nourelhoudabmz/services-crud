import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = "https://jsonplaceholder.typicode.com";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // Get Posts list
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/posts/')
      .pipe(catchError(this.errorHandler))
  }

  // Create Post
  create(post: Post): Observable<any> {
    return this.httpClient.post(this.apiURL + '/posts/', JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  //  Get Post by id
  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/posts/' + id)
      .pipe(catchError(this.errorHandler))
  }

  // Update Post
  update(id: number, post: Post): Observable<any> {
    return this.httpClient.put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  // Delete Post
  delete(id: number) {
    return this.httpClient.delete(this.apiURL + '/posts/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  // Error handling
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code:
    ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}