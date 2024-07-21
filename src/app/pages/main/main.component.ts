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

  private todoService = inject(TodosService);

  @ViewChild('todoInput') todoInput!: ElementRef;

  isFocused: boolean = false;

  taskText: string = '';

  pendingTodos: WritableSignal<Todo[]> = signal<Todo[]>([]);

  completedTodos: WritableSignal<Todo[]> = signal<Todo[]>([]);

  ngOnInit(): void {
    this.todoService.getPendingTodos().subscribe((todos) => {
      this.pendingTodos.set(todos);
    });

    this.todoService.getCompletedTodos().subscribe((completedTodos) => {
      this.completedTodos.set(completedTodos);
    });
  }

  addTodo(): void {
    if (this.isInputEmpty()) return;
    this.todoService.addTodo(this.taskText).subscribe((todo) => { });
    this.taskText = '';
    this.todoInput.nativeElement.blur();
  }

  markAsCompleted(todoId: string): void {
    this.todoService.getTodoById(todoId).subscribe((todo) => {
      todo.completed = true;
      this.todoService.updateTodo(todo).subscribe((updatedTodo) => {
        console.log('Todo updated:', updatedTodo);
      });
    });
  }


  // Check if the input is empty or only contains spaces
  isInputEmpty(): boolean {
    return this.taskText.trim() === '';
  }

  markAsChecked(e: Event, todoId: string): void {
    const completeBtnEl = document.querySelector(`.todo__complete-btn--${todoId}`);
    completeBtnEl?.classList.add('hidden');
    this.markAsCompleted(todoId);
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
