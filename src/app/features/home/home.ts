import { Component, computed, OnInit, signal } from '@angular/core';
import { Card } from './components/card/card';
import { CommonModule } from '@angular/common';
import { Filters } from './components/filters/filters';
import { Menu } from './components/menu/menu';
import { Modal } from '../../shared/components/modal/modal';
import Icons from '../../shared/icons/Icons';
import { ModalService } from '../../shared/services/modal';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tasks } from '../../services/tasks';
import { Task } from '../../models/task';

export interface TaskForm {
  title: FormControl<string>;
  description: FormControl<string | null>;
  category: FormControl<string | null>;
}

@Component({
  selector: 'app-home',
  imports: [Modal, Menu, Filters, Card, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  isOpen = computed(() => this.modalService.isOpen());
  icons = Icons;
  tasks = signal<Task[]>([]);
  taskForm = new FormGroup<TaskForm>({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl(''),
    category: new FormControl('')
  })
  constructor(private modalService: ModalService, private tasksService: Tasks) { }

  ngOnInit() {
    this.getTasks();
  }

  async getTasks() {
    this.tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    })
  }
  closeModal() {
    this.modalService.closeModal();
  }

  handleCreateTask() {
    if (!this.taskForm.valid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const newTask: Pick<Task, 'title' | 'description' | 'category'> = {
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description || null,
      category: this.taskForm.value.category || null,
    }
    this.tasksService.createTask(newTask).subscribe({
      next: (task) => {
        const currentTasks = this.tasks();
        this.tasks.set([...currentTasks, task]);
        this.modalService.closeModal();
        this.taskForm.reset();
      },
      error: (error) => {
        console.error('Error creating task:', error);
      }
    });
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.set(this.tasks().filter(task => task.id !== id));
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }

  get taskList() {
    return this.tasks();
  }

}
