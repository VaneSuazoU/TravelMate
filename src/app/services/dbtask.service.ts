import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DBTaskService {
  private dbInstance: SQLiteObject | null = null; 
  readonly dbName: string = 'travelmate.db';
  readonly dbTable: string = 'user';

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.initializeDatabase();
      } else {
        console.error('Cordova no está disponible. Asegúrate de ejecutar en un dispositivo o emulador.');
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

  public addUser(nombre: string, password: string): Promise<void> {
    const data = [nombre, password];
    return this.ensureDatabaseInitialized().then((db: SQLiteObject) => {
      return db.executeSql(`INSERT INTO ${this.dbTable} (nombre, password) VALUES (?, ?)`, data)
        .then(() => {
          console.log('User added');
        });
    });
  }

  public getUser(nombre: string, password: string): Promise<any> {
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
}
