import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Destination {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.page.html',
  styleUrls: ['./destinations.page.scss'],
})
export class DestinationsPage {
  destinations: Destination[] = [
    {
      id: 1,
      name: 'Machu Picchu',
      description: 'Antigua ciudad inca en los Andes peruanos'
    },
    {
      id: 2,
      name: 'Islas Galápagos',
      description: 'Archipiélago de Ecuador con una rica biodiversidad'
    },
    {
      id: 3,
      name: 'Gran Barrera de Coral',
      description: 'Uno de los mayores sistemas de arrecifes de coral del mundo'
    },
    {
      id: 4,
      name: 'Torres del Paine',
      description: 'Parque nacional en la Patagonia chilena'
    }
  ];

  constructor(private router: Router) {}
}