import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { DBTaskService } from './dbtask.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private dbTaskService: DBTaskService) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    console.log(route);

    const isAuthenticated = await this.dbTaskService.isAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}