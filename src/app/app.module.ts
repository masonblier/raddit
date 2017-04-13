import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { LoginService } from './services/login.service';

import { AppComponent }  from './components/app.component';
import { HeaderComponent }  from './components/header.component';
import { LoginComponent }  from './components/login.component';
import { HomeComponent }  from './components/home.component';
import { PostComponent }  from './components/post.component';
import { PostItemComponent }  from './components/post-item.component';
import { NewPostComponent }  from './components/new-post.component';

import { firebaseConfig } from './firebase.config'

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};

// app module
@NgModule({
  imports:      [ BrowserModule, FormsModule,
    RouterModule.forRoot([
      {
        path: 'post/:id',
        component: PostComponent
      },
      {
        path: 'new-post',
        component: NewPostComponent
      },
      {
        path: '',
        component: HomeComponent
      }
    ], { useHash: true }),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  declarations: [ AppComponent, HeaderComponent, LoginComponent,
    HomeComponent, PostComponent, NewPostComponent,
    PostItemComponent ],
  providers: [LoginService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
