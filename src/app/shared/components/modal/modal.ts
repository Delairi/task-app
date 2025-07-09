import { Component, Input, OnInit } from '@angular/core';
import { Icon } from '../icon/icon';
import { ModalService } from '../../services/modal';

@Component({
  selector: 'app-modal',
  imports: [Icon],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {

  constructor(private modalService: ModalService) {}
  @Input() icons: { [key: string]: string } = {};

  closeModal() {
    this.modalService.closeModal();
  }


}
