import { Component } from '@angular/core';
import { Card } from './components/card/card';

@Component({
  selector: 'app-home',
  imports: [Card],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
