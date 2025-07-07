import { Component } from '@angular/core';
import Icons from '../../../../shared/icons/Icons';
import { Icon } from '../../../../shared/components/icon/icon';
@Component({
  selector: 'app-card',
  imports: [Icon],
  standalone: true,
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {

  Icons = Icons;

  handleDelete() {
    console.log('delete');
  }
}
