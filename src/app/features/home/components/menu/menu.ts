import { Component, Input } from '@angular/core';
import Icons from '../../../../shared/icons/Icons';
import { Icon } from '../../../../shared/components/icon/icon';
import { ModalService } from '../../../../shared/services/modal';

@Component({
  selector: 'app-menu',
  imports: [Icon],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
  @Input() openModal: any;
  icons = Icons
  constructor(private modalService: ModalService) { }
  createTask() {
    this.modalService.openModal();
  }
}
