import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'raddit-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  name = 'RadditHome';
  posts: any[];

  constructor(af: AngularFire) {
    af.database.list('/posts', {
      query: {
        limitToLast: 15,
        orderByChild: 'createdAt',
      }
    }).subscribe(posts => this.posts = posts.reverse());
  }
}
