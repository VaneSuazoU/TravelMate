import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Itinerary {
  id: number;
  name: string;
  description: string;
  date: Date;
}

@Component({
  selector: 'app-itineraries',
  templateUrl: './itineraries.page.html',
  styleUrls: ['./itineraries.page.scss'],
})
export class ItinerariesPage {
  itineraries: Itinerary[] = [
    {
      id: 1,
      name: 'Viaje a Europa',
      description: 'Visita a Londres, París y Berlín',
      date: new Date('2023-07-15')
    },
    {
      id: 2,
      name: 'Expedición a la Amazonía',
      description: 'Descubre la selva amazónica',
      date: new Date('2023-09-20')
    },
    {
      id: 3,
      name: 'Ruta por la costa',
      description: 'Recorre las hermosas playas del sur',
      date: new Date('2023-11-01')
    }
  ];

  constructor(private router: Router) {}
}