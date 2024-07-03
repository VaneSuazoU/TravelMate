import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBTaskService {
  private dbInstance: SQLiteObject | null = null; 
  readonly dbName: string = 'travelmate.db';
  readonly dbTable: string = 'user';
  private isAuthenticatedValue: boolean = false;

  constructor(
    private platform: Platform, 
    private sqlite: SQLite,
    private apiService: ApiService
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.initializeDatabase();
      } else {
        console.log('Usando json-server en lugar de SQLite.');
      }
    });
  }

  private async initializeDatabase(): Promise<void> {
    try {
      this.dbInstance = await this.sqlite.create({
        name: this.dbName,
        location: 'default'
      });
      await this.dbInstance.executeSql(`CREATE TABLE IF NOT EXISTS ${this.dbTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT UNIQUE, password TEXT)`, []);
      console.log('Table created successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  private ensureDatabaseInitialized(): Promise<SQLiteObject> {
    return new Promise((resolve, reject) => {
      if (this.dbInstance) {
        resolve(this.dbInstance);
      } else {
        this.platform.ready().then(() => {
          if (this.platform.is('cordova')) {
            this.sqlite.create({
              name: this.dbName,
              location: 'default'
            }).then((db: SQLiteObject) => {
              this.dbInstance = db;
              db.executeSql(`CREATE TABLE IF NOT EXISTS ${this.dbTable} (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT UNIQUE, password TEXT)`, [])
                .then(() => {
                  console.log('Table created successfully');
                  resolve(this.dbInstance!);
                })
                .catch(e => reject(e));
            }).catch(e => reject(e));
          } else {
            reject('Cordova no está disponible. Asegúrate de ejecutar en un dispositivo o emulador.');
          }
        });
      }
    });
  }

  public async addUser(nombre: string, password: string): Promise<void> {
    if (this.platform.is('cordova')) {
      return this.addUserSQLite(nombre, password);
    } else {
      return this.addUserJsonServer(nombre, password);
    }
  }

  private addUserSQLite(nombre: string, password: string): Promise<void> {
    const data = [nombre, password];
    return this.ensureDatabaseInitialized().then((db: SQLiteObject) => {
      return db.executeSql(`INSERT INTO ${this.dbTable} (nombre, password) VALUES (?, ?)`, data)
        .then(() => {
          console.log('User added to SQLite');
        });
    });
  }

  private async addUserJsonServer(nombre: string, password: string): Promise<void> {
    try {
      await firstValueFrom(this.apiService.addUser({ nombre, password }));
      console.log('User added to json-server');
    } catch (error) {
      console.error('Error adding user to json-server:', error);
      throw error;
    }
  }

  public async getUser(nombre: string, password: string): Promise<any> {
    if (this.platform.is('cordova')) {
      return this.getUserSQLite(nombre, password);
    } else {
      return this.getUserJsonServer(nombre, password);
    }
  }

  private getUserSQLite(nombre: string, password: string): Promise<any> {
    return this.ensureDatabaseInitialized().then((db: SQLiteObject) => {
      return db.executeSql(`SELECT * FROM ${this.dbTable} WHERE nombre = ? AND password = ?`, [nombre, password])
        .then(res => {
          if (res.rows.length > 0) {
            return res.rows.item(0);
          }
          return null;
        });
    });
  }

  private async getUserJsonServer(nombre: string, password: string): Promise<any> {
    try {
      const users = await firstValueFrom(this.apiService.getUser(nombre, password));
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Error getting user from json-server:', error);
      throw error;
    }
  }

  public async login(nombre: string, password: string): Promise<boolean> {
    const user = await this.getUser(nombre, password);
    if (user) {
      this.isAuthenticatedValue = true;
      return true;
    }
    return false;
  }

  public logout(): void {
    this.isAuthenticatedValue = false;
  }

  public isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }
}