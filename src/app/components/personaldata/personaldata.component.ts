import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personaldata',
  templateUrl: './personaldata.component.html',
  styleUrls: ['./personaldata.component.scss'],
})
export class PersonaldataComponent implements OnInit {
  @Input() userData: any;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('Hola');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}