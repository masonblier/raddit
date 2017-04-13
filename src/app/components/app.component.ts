import { Component, ChangeDetectorRef } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/**
  App Component
*/
@Component({
  moduleId: module.id,
  selector: 'raddit-app',
  templateUrl: './app.component.html',
})
export class AppComponent  {
  name = 'RadditApp';
  posts: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
    this.posts = af.database.list('/posts');
  }

  onDataChange(nextData: any) {
    // this.cdref.detectChanges();
  }
}
