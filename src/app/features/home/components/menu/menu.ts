import { Component } from '@angular/core';
import Icons from '../../../../shared/icons/Icons';
import { Icon } from '../../../../shared/components/icon/icon';

@Component({
  selector: 'app-menu',
  imports: [Icon],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {

  icons = Icons

  createTask() {
    console.log('Create task clicked');
  }
}
