import { Component } from '@angular/core';
import { Card } from './components/card/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Card, CommonModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  tasks = new Array(12).fill(0)

}
