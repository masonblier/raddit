import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/**
  Post Component
*/
@Component({
  moduleId: module.id,
  selector: 'raddit-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  name = 'RadditHome';
  posts: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
    this.posts = af.database.list('/posts');
  }
}
