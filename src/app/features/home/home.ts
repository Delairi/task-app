import { Component, computed, OnChanges, OnInit } from '@angular/core';
import { Card } from './components/card/card';
import { CommonModule } from '@angular/common';
import { Filters } from './components/filters/filters';
import { Menu } from './components/menu/menu';
import { Modal } from '../../shared/components/modal/modal';
import Icons from '../../shared/icons/Icons';
import { ModalService } from '../../shared/services/modal';

@Component({
  selector: 'app-home',
  imports: [Modal, Menu, Filters, Card, CommonModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home{
  isOpen = computed(() => this.modalService.isOpen());
  icons = Icons;
  tasks = new Array(12).fill(0)
  constructor(private modalService: ModalService) {}
  
  closeModal() {
    this.modalService.closeModal();
  }
  
  
}
