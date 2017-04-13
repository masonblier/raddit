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
      return Object.keys(post.votes).reduce((a,k) => a + parseInt(post.votes[k], 10), 0);
    }
    return 0;
  }

  upvoted(post: any, userInfo: any): boolean {
    if (post && userInfo) {
      if (post.votes[userInfo.uid] > 0) {
        return true;
      }
    }
    return false;
  }
  downvoted(post: any, userInfo: any): boolean {
    if (post && userInfo) {
      if (post.votes[userInfo.uid] < 0) {
        return true;
      }
    }
    return false;
  }

  toggleUpvote(post: any, userInfo: any): void {
    const upvoted = this.upvoted(post, userInfo);
    const voteObject = this.af.database.object(`/posts/${post.$key}/votes/${userInfo.uid}`);
    voteObject.set(upvoted ? 0 : 1);
  }
  toggleDownvote(post: any, userInfo: any): void {
    const downvoted = this.downvoted(post, userInfo);
    const voteObject = this.af.database.object(`/posts/${post.$key}/votes/${userInfo.uid}`);
    voteObject.set(downvoted ? 0 : -1);
  }
}
