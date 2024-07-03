import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userData: any;
  selectedComponent = 'personaldata';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activatedRoute.queryParams.subscribe(params => {
          this.userData = this.router.getCurrentNavigation()?.extras?.state?.['user'];
        });
      }
    });
  }

  navigateToProfile() {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.userData
      }
    };
    this.router.navigate(['/profile'], navigationExtras);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  segmentChanged(event: any) {
    this.selectedComponent = event.detail.value;
  }
}