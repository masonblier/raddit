import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AngularFire } from 'angularfire2';
import { RegisterModel } from '../models/register.model';
import { LoginModel } from '../models/login.model';
import { LoginService } from '../services/login.service';

@Component({
  moduleId: module.id,
  selector: 'login-modal',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnDestroy {
  public visible = false;
  public visibleAnimate = false;
  visibilitySubscription: Subscription;
  userInfoSubscription: Subscription;

  registerModel = new RegisterModel('', '', '', '');
  loginModel = new LoginModel('', '');

  constructor(private loginService: LoginService, public af: AngularFire) {
      this.visibilitySubscription = this.loginService.getVisibilityObservable().subscribe(visible => {
        if (visible) {
          this.visible = true;
          setTimeout(() => this.visibleAnimate = true);
        } else {
          this.visibleAnimate = false;
          setTimeout(() => this.visible = false, 300);
        }
      });
      this.af.auth.subscribe(auth => {
        console.log('auth updated', auth);
        if (auth) {
          this.userInfoSubscription = this.af.database.object(`/users/${auth.uid}`).subscribe(info => {
            this.loginService.setUserInfo({
              uid: auth.uid,
              name: info.name,
            });
          });
          this.hide();
        } else {
          if (this.userInfoSubscription) {
            this.userInfoSubscription.unsubscribe();
            this.userInfoSubscription = null;
          }
          this.loginService.setUserInfo(null);
        }
      });
  }

  ngOnDestroy() {
      this.visibilitySubscription.unsubscribe();
  }

  public show(): void {
    this.loginService.setVisibility(true);
  }

  public hide(): void {
    this.loginService.setVisibility(false);
  }

  onLoginSubmit(): void {
    console.log('login!', this.loginModel)
    this.af.auth.login({
      email: this.loginModel.email,
      password: this.loginModel.password,
    });
  }
  onRegisterSubmit(): void {
    console.log('register!', this.registerModel)
    const name = this.registerModel.name;
    this.af.auth.createUser({
      email: this.registerModel.email,
      password: this.registerModel.password,
    }).then((auth) => {
      this.af.database.object(`/users/${auth.uid}`).set({
        name: name,
      }).then(result => {
        console.log('user info saved!', result, auth)
        this.loginService.setUserInfo({
          uid: auth.uid,
          name: name,
        });
      });
    });
  }
}
