import { Component, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnimationItem } from 'lottie-web';
import { LottieComponent } from 'ngx-lottie';
import { CheckedIconComponent } from '../../shared/components/checked-icon/checked-icon.component';
import { TodosService } from '../../shared/services/todos.service';
import { Todo } from '../../shared/models/todo.model';
import { CommonModule } from '@angular/common';
import { CapitalizeFirstLetterDirective } from '../../shared/directives/capitalize-first-letter.directive';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LottieComponent,
    CheckedIconComponent,
    CapitalizeFirstLetterDirective
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  private animationItem: AnimationItem | undefined;

  private todoService = inject(TodosService);

  @ViewChild('todoInput') todoInput!: ElementRef;

  isFocused: boolean = false;

  taskText: string = '';

  todos: WritableSignal<Todo[]> = signal<Todo[]>([]);

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  addTodo(): void {
    if (this.isInputEmpty()) return;
    this.todoService.addTodo(this.taskText).subscribe((todo) => {
      this.todos.update((prevTodos) => {
        return [...prevTodos, todo];
      });
    });
    this.taskText = '';
    this.todoInput.nativeElement.blur();
  }

  // Check if the input is empty or only contains spaces
  isInputEmpty(): boolean {
    return this.taskText.trim() === '';
  }

  markAsChecked(e: Event, i: number, todoId: string): void {
    const completeBtnEl = document.querySelector(`.todo__complete-btn--${i}`);
    completeBtnEl?.classList.add('hidden');
    console.log(todoId);
  }

  onInputFocus(): void {
    this.isFocused = true;
  }

  // Set isFocused to false after a short delay so that the user can click on the button
  onInputBlur(): void {
    setTimeout(() => {
      this.isFocused = false;
    }, 100);
  }


}
