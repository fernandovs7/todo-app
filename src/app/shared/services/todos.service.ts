import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

const BE_URL: "http://localhost:3000/" = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})


export class TodosService {

  private httpClient: HttpClient = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${BE_URL}todos`);
  }

  public addTodo(title: string): Observable<Todo> {
    const todo = {
      title,
      completed: false,
      category: '',
      dudate: '',
      notes: ''
    };
    return this.httpClient.post<Todo>(`${BE_URL}todos`, todo);
  }

}
