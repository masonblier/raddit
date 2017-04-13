import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {
  visibilityBool$: Observable<boolean>;
  private visibilityBoolSubject: Subject<boolean>;
  _userInfo: any;
  userInfo$: Observable<Object>;
  private userInfoSubject: Subject<Object>;

  constructor() {
    this.visibilityBoolSubject = new Subject<boolean>();
    this.visibilityBool$ = this.visibilityBoolSubject.asObservable();
    this.userInfoSubject = new Subject<Object>();
    this.userInfo$ = this.userInfoSubject.asObservable();
  }

  getVisibilityObservable() {
    return this.visibilityBool$;
  }
  setVisibility(visible: boolean) {
    this.visibilityBoolSubject.next(visible);
  }

  getUserInfoObservable() {
    return this.userInfo$;
  }
  getUserInfo() {
    return this._userInfo;
  }
  setUserInfo(info: any) {
    this._userInfo = info;
    this.userInfoSubject.next(info);
  }
}
