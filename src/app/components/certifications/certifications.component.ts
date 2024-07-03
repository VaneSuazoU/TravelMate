import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
})
export class CertificationsComponent implements OnInit {
  certificationName: string = '';
  obtainedDate: string = '';
  hasExpiration: boolean = false;
  expirationDate: string = '';

  constructor() { }

  ngOnInit() {
    console.log('Hola')
  }
}