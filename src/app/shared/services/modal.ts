import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isOpen = signal(false);
  constructor() { }

  openModal() {
    this.isOpen.set(true);
  }

  closeModal() {
    this.isOpen.set(false);
  }
}
