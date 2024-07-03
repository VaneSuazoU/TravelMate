import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
//import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedPath = '';

  public pages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'Itinerarios', url: '/itineraries', icon: 'map' },
    { title: 'Destinos', url: '/destinations', icon: 'location' },
  ];

  constructor(
    private router: Router,
    //private databaseService: DatabaseService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.selectedPath = this.router.url;
      }
    });

    //this.initializeApp();
  }

/*   async initializeApp() {
    try {
      await this.databaseService.initializeDatabase();
      console.log('Base de datos inicializada correctamente desde AppComponent');
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }*/
}