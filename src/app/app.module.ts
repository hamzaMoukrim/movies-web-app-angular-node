import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FilmService} from "./services/films/film.service"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmViewComponent } from './film-view/film-view.component';
import { CardFilmComponent } from './film-view/card-film/card-film.component';
import {HttpClientModule} from "@angular/common/http";
import { DetailsComponent } from './film-view/details-film/details/details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchViewComponent } from './film-view/search-view/search-view/search-view.component';
import { PaginationComponent } from './pagination/pagination.component'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FavoritesComponent } from './film-view/favorites/favorites.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './auth/signin/signup.component';
import { CookieService } from 'ngx-cookie-service';
import { httpInterceptorProviders } from './http-interceptors';
import { CommentComponent } from './film-view/comment/comment.component';
import { GenresComponent } from './film-view/genres/genres.component';
import { TopMoviesComponent } from './film-view/top-movies/top-movies.component';
import { TrendingComponent } from './film-view/trending/trending.component';
import { RatingComponent } from './film-view/Rating/rating.component';
export const firebaseConfig = {
  apiKey: "AIzaSyBSoQo9bVCITydPcFgJZIep1yeGnwIfqEk",
  authDomain: "movies-app-e4089.firebaseapp.com",
  databaseURL: "https://movies-app-e4089-default-rtdb.firebaseio.com",
  projectId: "movies-app-e4089",
  storageBucket: "movies-app-e4089.appspot.com",
  messagingSenderId: "586270458169",
  appId: "1:586270458169:web:74c5b12e67ad0ce79d68e8",
  measurementId: "G-BBSD1PL3YJ"
};


//module : qui va charger l app 
@NgModule({
  // Les components sont ici , il sont ajoute par cli ici , mais si on a fait du copy/past , on doit les ajouter manuelllement import export
  declarations: [
    AppComponent,
    FilmViewComponent,
    CardFilmComponent,
    DetailsComponent,
    NavbarComponent,
    SidebarComponent,
    SearchViewComponent,
    PaginationComponent,
    FavoritesComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    CommentComponent,
    GenresComponent,
    TopMoviesComponent,
    TrendingComponent,
    RatingComponent
  ],
  // Les modules 
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    BrowserAnimationsModule,
    MDBBootstrapModule


  ],
  // Les services pour le concept d'injection de dependance , c'est angulat qui va faire les instanciation au lieu de nous
  providers: [FilmService,CookieService,httpInterceptorProviders],
  // Le composant de pase de notre SPA
  bootstrap: [AppComponent]
})
export class AppModule { }
