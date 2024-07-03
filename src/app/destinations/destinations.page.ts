import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';

export interface Destination {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.page.html',
  styleUrls: ['./destinations.page.scss'],
})
export class DestinationsPage implements OnInit {
  destinations: Destination[] = [
    {
      id: 1,
      name: 'Machu Picchu',
      description: 'Antigua ciudad inca en los Andes peruanos',
      lat: -13.1631,
      lng: -72.5450
    },
    {
      id: 2,
      name: 'Islas Galápagos',
      description: 'Archipiélago de Ecuador con una rica biodiversidad',
      lat: -0.7393,
      lng: -90.4775
    },
    {
      id: 3,
      name: 'Gran Barrera de Coral',
      description: 'Uno de los mayores sistemas de arrecifes de coral del mundo',
      lat: -18.2871,
      lng: 147.6992
    },
    {
      id: 4,
      name: 'Torres del Paine',
      description: 'Parque nacional en la Patagonia chilena',
      lat: -51.0593,
      lng: -73.0153
    }
  ];

  currentLocation: { lat: number, lng: number } | null = null;

  constructor(private router: Router, private platform: Platform) {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      if (this.platform.is('cordova') || this.platform.is('capacitor')) {
        // Código para dispositivos móviles
        const permissionStatus = await Geolocation.checkPermissions();
        if (permissionStatus.location === 'granted') {
          const position = await Geolocation.getCurrentPosition();
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        } else {
          const permission = await Geolocation.requestPermissions();
          if (permission.location === 'granted') {
            await this.getCurrentLocation();
          } else {
            console.log('Permiso de ubicación denegado');
          }
        }
      } else {
        // Código para navegador web
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          }, (error) => {
            console.error('Error al obtener la ubicación en el navegador', error);
          });
        } else {
          console.log('Geolocalización no disponible en este navegador');
        }
      }
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
    }
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distancia en km
    return d;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  getDistanceToDestination(destination: Destination): string {
    if (this.currentLocation) {
      const distance = this.calculateDistance(
        this.currentLocation.lat,
        this.currentLocation.lng,
        destination.lat,
        destination.lng
      );
      return `${distance.toFixed(2)} km`;
    }
    return 'Calculando...';
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  async updateLocation() {
    await this.getCurrentLocation();
  }

  sortDestinationsByDistance() {
    if (this.currentLocation) {
      this.destinations.sort((a, b) => {
        const distanceA = this.calculateDistance(
          this.currentLocation!.lat,
          this.currentLocation!.lng,
          a.lat,
          a.lng
        );
        const distanceB = this.calculateDistance(
          this.currentLocation!.lat,
          this.currentLocation!.lng,
          b.lat,
          b.lng
        );
        return distanceA - distanceB;
      });
    }
  }
}