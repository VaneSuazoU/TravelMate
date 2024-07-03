import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DBTaskService } from '../services/dbtask.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    nombre: '',
    password: ''
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private dbTaskService: DBTaskService
  ) {}

  async ingresar() {
    if (this.validarCampos()) {
      try {
        const user = await this.dbTaskService.getUser(this.user.nombre, this.user.password);
        if (user) {
          this.mostrarAlerta('Éxito', 'Inicio de sesión exitoso');
          this.router.navigate(['/home']);
        } else {
          this.mostrarAlerta('Error', 'Credenciales inválidas');
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
        await this.dbTaskService.addUser(this.user.nombre, this.user.password);
        this.mostrarAlerta('Éxito', 'Usuario registrado exitosamente');
        this.user.nombre = '';
        this.user.password = '';
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        this.mostrarAlerta('Error', 'Ocurrió un error al registrar el usuario');
      }
    }
  }

  validarCampos(): boolean {
    if (!this.user.nombre || !this.user.password) {
      this.mostrarAlerta('Error', 'Por favor, completa todos los campos');
      return false;
    }
    if (this.user.nombre.length < 3 || this.user.nombre.length > 8) {
      this.mostrarAlerta('Error', 'El nombre debe tener entre 3 y 8 caracteres');
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