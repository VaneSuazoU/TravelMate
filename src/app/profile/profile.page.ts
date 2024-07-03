import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, keyframes, style, AnimationBuilder } from '@angular/animations';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
  data: any;
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: Date = new Date();
  profileImage: string | undefined;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    @Inject(ANIMATION_MODULE_TYPE) private animationBuilder: AnimationBuilder,
    private alertController: AlertController
  ) {
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras && navigation.extras.state && navigation.extras.state['user']) {
        this.data = navigation.extras.state['user'];
        console.log(this.data);
      } else {
        this.router.navigate(['/profile']);
      }
    });
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      this.profileImage = image.dataUrl;
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';

    const animationName = this.animationBuilder.build([
      animate('1s', keyframes([
        style({ transform: 'translateX(0)' }),
        style({ transform: 'translateX(100%)' }),
        style({ transform: 'translateX(0)' })
      ]))
    ]);

    const animationApellido = this.animationBuilder.build([
      animate('1s', keyframes([
        style({ transform: 'translateX(0)' }),
        style({ transform: 'translateX(100%)' }),
        style({ transform: 'translateX(0)' })
      ]))
    ]);

    const elementName = document.querySelector('ion-input[name="nombre"]');
    const elementApellido = document.querySelector('ion-input[name="apellido"]');

    if (elementName && elementApellido) {
      const playerName = animationName.create(elementName);
      const playerApellido = animationApellido.create(elementApellido);
      playerName.play();
      playerApellido.play();
    }
  }

  async mostrar() {
    const alert = await this.alertController.create({
      header: 'Information',
      message: `Name: ${this.nombre}<br>Surname: ${this.apellido}`,
      buttons: ['OK']
    });

    await alert.present();
  }
}