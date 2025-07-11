import { Component, EventEmitter, Input, Output } from '@angular/core';
import Icons from '../../../../shared/icons/Icons';
import { Icon } from '../../../../shared/components/icon/icon';
import { Task } from '../../../../models/task';
@Component({
  selector: 'app-card',
  imports: [Icon],
  standalone: true,
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input() task!: Task;
  @Output() deleted = new EventEmitter<number>();
  Icons = Icons;

  constructor() { }
  handleDelete() {
    if (!this.task.id) {
      return;
    }
    this.deleted.emit(this.task.id);
  }
}
