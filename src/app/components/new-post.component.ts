import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AngularFire } from 'angularfire2';
import { PostModel } from '../models/post.model';

@Component({
  moduleId: module.id,
  selector: 'new-post',
  templateUrl: './new-post.component.html',
})
export class NewPostComponent implements OnDestroy {
  postModel = new PostModel('', '');

  constructor(public af: AngularFire) {
  }

  ngOnDestroy() {
  }

  onSubmit(): void {
    console.log('submit!', this.postModel)
  }
}
