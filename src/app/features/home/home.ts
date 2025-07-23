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
import { Loader } from '../../shared/components/loader/loader';

export interface TaskForm {
  title: FormControl<string>;
  description: FormControl<string | null>;
  category: FormControl<string | null>;
}

@Component({
  selector: 'app-home',
  imports: [Loader, Modal, Menu, Filters, Card, CommonModule, ReactiveFormsModule],
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
  isLoading = signal<boolean>(false);
  constructor(private modalService: ModalService, private tasksService: Tasks) { }

  ngOnInit() {
    this.getTasks();
  }

  async getTasks() {
    this.isLoading.set(true);
    this.tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.isLoading.set(false);
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
    this.isLoading.set(true);
    this.tasksService.createTask(newTask).subscribe({
      next: (task) => {
        const currentTasks = this.tasks();
        this.tasks.set([...currentTasks, task]);
        this.modalService.closeModal();
        this.taskForm.reset();
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error creating task:', error);
        this.isLoading.set(false);
      }
    });
  }

  deleteTask(id: number) {

      this.isLoading.set(true);
    this.tasksService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.set(this.tasks().filter(task => task.id !== id));
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        this.isLoading.set(false);
      }
    });
  }

  get taskList() {
    return this.tasks();
  }

}
