import { Component } from '@angular/core';
import { Card } from './components/card/card';
import { CommonModule } from '@angular/common';
import { Filters } from './components/filters/filters';
import { Menu } from './components/menu/menu';

@Component({
  selector: 'app-home',
  imports: [Menu, Filters, Card, CommonModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  tasks = new Array(12).fill(0)

}
