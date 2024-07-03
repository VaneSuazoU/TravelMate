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
      this.dbTaskService.getUser(this.user.nombre, this.user.password)
        .then(user => {
          if (user) {
            this.mostrarAlerta('Éxito', 'Inicio de sesión exitoso');
            this.router.navigate(['/home']);
          } else {
            this.mostrarAlerta('Error', 'Credenciales inválidas');
          }
        })
        .catch(e => this.mostrarAlerta('Error', 'Error al iniciar sesión: ' + e.message));
    }
  }

  async registrar() {
    if (this.validarCampos()) {
      this.dbTaskService.addUser(this.user.nombre, this.user.password)
        .then(() => {
          this.mostrarAlerta('Éxito', 'Usuario registrado exitosamente');
          this.user.nombre = '';
          this.user.password = '';
        })
        .catch(e => this.mostrarAlerta('Error', 'Error registrando usuario: ' + e.message));
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
