import { Component, computed, OnChanges, OnInit } from '@angular/core';
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
  tasks: Task[] = [];
  showErros = false;
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
        this.tasks = tasks;
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
        this.tasks.push(task);
        this.modalService.closeModal();
        this.taskForm.reset();
      },
      error: (error) => {
        console.error('Error creating task:', error);
        this.showErros = true;
      }
    });
    this.modalService.closeModal();
  }


}
