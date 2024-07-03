import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    usuario: '',
    password: ''
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    //private databaseService: DatabaseService
  ) {}

  async ingresar(){
    console.log('ingresar')
  }
  async registrar(){
    console.log('registrar')
  }
/* 
  async ingresar() {
    if (this.validarCampos()) {
      try {
        const usuario = await this.databaseService.getUser(this.user.usuario);
        if (usuario && usuario.password === this.user.password) {
          await this.databaseService.updateSessionStatus(this.user.usuario, 1);
          this.router.navigate(['/home']);
        } else {
          this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.mostrarAlerta('Error', 'Ocurrió un error al iniciar sesión');
      }
    }
  }

  async registrar() {
    if (this.validarCampos()) {
      try {
        const usuarioExistente = await this.databaseService.getUser(this.user.usuario);
        if (usuarioExistente) {
          this.mostrarAlerta('Error', 'El usuario ya existe');
        } else {
          await this.databaseService.addUser(this.user.usuario, this.user.password);
          this.mostrarAlerta('Éxito', 'Usuario registrado correctamente');
          // Opcionalmente, puedes iniciar sesión automáticamente después del registro
          await this.ingresar();
        }
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        this.mostrarAlerta('Error', 'Ocurrió un error al registrar el usuario');
      }
    }
  } */

  validarCampos(): boolean {
    if (!this.user.usuario || !this.user.password) {
      this.mostrarAlerta('Error', 'Por favor, completa todos los campos');
      return false;
    }
    if (this.user.usuario.length < 3 || this.user.usuario.length > 8) {
      this.mostrarAlerta('Error', 'El usuario debe tener entre 3 y 8 caracteres');
      return false;
    }
    if (this.user.password.length !== 4 || !/^\d+$/.test(this.user.password)) {
      this.mostrarAlerta('Error', 'La contraseña debe ser de 4 dígitos');
      return false;
    }
    return true;
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}