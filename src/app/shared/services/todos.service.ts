import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
import { Todo } from '../models/todo.model';

const BE_URL: "http://localhost:3000/" = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})


export class TodosService {

  private httpClient: HttpClient = inject(HttpClient);
  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  public todos$: Observable<Todo[]> = this.todosSubject.asObservable();


  constructor() {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.httpClient.get<Todo[]>(`${BE_URL}todos`).subscribe(todos => {
      this.todosSubject.next(todos);
    });
  }

  public getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  public addTodo(title: string): Observable<Todo> {
    const todo = {
      title,
      completed: false,
      category: '',
      dudate: '',
      notes: ''
    };
    return this.httpClient.post<Todo>(`${BE_URL}todos`, todo).pipe(
      tap(newTodo => {
        const currentTodos = this.todosSubject.value;
        this.todosSubject.next([...currentTodos, newTodo]);
      })
    );
  }

  public getPendingTodos(): Observable<Todo[]> {
    return this.getTodos().pipe(
      map(todos => todos.filter(todo => !todo.completed))
    );
  }

  public getCompletedTodos(): Observable<Todo[]> {
    return this.getTodos().pipe(
      map(todos => todos.filter(todo => todo.completed))
    );
  }

  public getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(`${BE_URL}todos/${id}`);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(`${BE_URL}todos/${todo.id}`, todo).pipe(
      delay(1500), // This is for the check animation to be visible
      tap(updatedTodo => {
        console.log('Update successful:', updatedTodo); // Debug log
        const currentTodos = this.todosSubject.value.map(t =>
          t.id === updatedTodo.id ? updatedTodo : t
        );
        console.log('Updated todos list:', currentTodos); // Debug log
        this.todosSubject.next(currentTodos);
      })
    );
  }

}
