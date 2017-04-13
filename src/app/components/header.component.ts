import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { LoginService } from '../services/login.service';

@Component({
  moduleId: module.id,
  selector: 'raddit-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  userInfo: Object;

  constructor(private loginService: LoginService, public af: AngularFire) {
    loginService.getUserInfoObservable().subscribe(info => this.userInfo = info);
  }

  showLogin() {
    this.loginService.setVisibility(true);
  }
  doLogout() {
    this.af.auth.logout();
  }
}
