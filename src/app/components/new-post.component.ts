import { Component, OnDestroy } from '@angular/core';
import { Router }   from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AngularFire } from 'angularfire2';
import { PostModel } from '../models/post.model';
import { LoginService } from '../services/login.service';

@Component({
  moduleId: module.id,
  selector: 'new-post',
  templateUrl: './new-post.component.html',
})
export class NewPostComponent implements OnDestroy {
  postModel = new PostModel('', '');

  constructor(
    private loginService: LoginService,
    private router: Router,
    public af: AngularFire) {
  }

  ngOnDestroy() {
  }

  onSubmit(): void {
    const userInfo = this.loginService.getUserInfo();
    if (!userInfo) return;

    this.af.database.list('/posts').push({
      title: this.postModel.title,
      body: this.postModel.body,
      createdAt: (new Date()).valueOf(),
      votes: {
        [userInfo.uid]: 1,
      }
    }).then(result => {
      console.log('submitted!', result)
      this.router.navigate(['/']);
    });
  }
}
