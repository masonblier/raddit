import { Component, Input, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { LoginService } from '../services/login.service';

/**
  Post Component
*/
@Component({
  moduleId: module.id,
  selector: 'raddit-post-item',
  templateUrl: './post-item.component.html',
})
export class PostItemComponent implements OnInit {
  name = 'RadditPostItem';
  @Input() postId: string;
  post: any;
  userInfo: any;

  constructor(private loginService: LoginService, private af: AngularFire) {
  }

  ngOnInit(): void {
    this.userInfo = this.loginService.getUserInfo();
    this.loginService.getUserInfoObservable().subscribe(info => this.userInfo = info);
    this.af.database.object(`/posts/${this.postId}`).subscribe(post => this.post = post);
  }

  postVoteScore(post: any): number {
    if (post) {
      console.log('need vote score for post', post)
    }
    return 0;
  }
}
