import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/switchMap';

/**
  Post Component
*/
@Component({
  moduleId: module.id,
  selector: 'raddit-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  name = 'RadditPost';
  post: any;

  constructor(private af: AngularFire, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        return this.af.database.object(`/posts/${params['id']}`)
      }).subscribe(post => this.post = post);
  }
}
