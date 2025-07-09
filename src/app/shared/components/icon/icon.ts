import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml,DomSanitizer } from "@angular/platform-browser"

@Component({
  selector: 'app-icon',
  imports: [],
  standalone: true,
  templateUrl: './icon.html',
  styleUrl: './icon.scss'
})
export class Icon implements OnInit {

  @Input() icon: string = '';
  iconHtml: SafeHtml = '';
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.iconHtml = this.sanitizer.bypassSecurityTrustHtml(this.icon);
  }
  
}
