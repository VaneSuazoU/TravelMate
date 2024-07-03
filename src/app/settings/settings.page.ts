import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  darkMode: boolean = false;
  notifications: boolean = true;

  constructor(private router: Router, private alertController: AlertController) {}

  toggleDarkMode() {
    // Lógica para cambiar el tema de la aplicación
    console.log('Modo oscuro:', this.darkMode);
  }

  toggleNotifications() {
    // Lógica para activar/desactivar las notificaciones
    console.log('Notificaciones:', this.notifications);
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      message: 'Esta acción eliminará permanentemente su cuenta.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Lógica para eliminar la cuenta del usuario
            console.log('Cuenta eliminada');
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}