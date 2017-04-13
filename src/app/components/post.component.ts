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
  // posts: FirebaseListObservable<any[]>;

  constructor(af: AngularFire, private route: ActivatedRoute) {
    console.log('route params', this.route.params)
    // this.posts = af.database.list('/posts');
  }

  ngOnInit(): void {
    // this.route.params
      // .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      // .subscribe(hero => this.hero = hero);
  }

}
