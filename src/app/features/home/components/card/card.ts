import { Component, Input } from '@angular/core';
import Icons from '../../../../shared/icons/Icons';
import { Icon } from '../../../../shared/components/icon/icon';
import { Task } from '../../../../models/task';
import { Tasks } from '../../../../services/tasks';
@Component({
  selector: 'app-card',
  imports: [Icon],
  standalone: true,
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input() task!: Task;
  Icons = Icons;

  constructor(private tasksService: Tasks) { }
  handleDelete() {
    this.tasksService.deleteTask(this.task.id).subscribe({
      next: (task) => {
        console.log('Task deleted successfully', task);
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }
}
