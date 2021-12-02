import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signin/signup.component';
import { DetailsComponent } from './film-view/details-film/details/details.component';
import { FavoritesComponent } from './film-view/favorites/favorites.component';
import { FilmViewComponent } from './film-view/film-view.component';
import { GenresComponent } from './film-view/genres/genres.component';
import { SearchViewComponent } from './film-view/search-view/search-view/search-view.component';
import { TopMoviesComponent } from './film-view/top-movies/top-movies.component';
import { TrendingComponent } from './film-view/trending/trending.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
{path:'', component:FilmViewComponent},
{path:'auth', component:AuthComponent,children: [{
    path: '', // child route path
    component: LoginComponent, // child route component that the router renders
  },
  {
    path: 'signup', // child route path
    component: SignupComponent, // child route component that the router renders
  }
]},
{path:'search', component:SearchViewComponent},
{path:'popular', component:FilmViewComponent},
{path:'top', component:TopMoviesComponent},
{path:'trending', component:TrendingComponent},
{path:'genre/:genre', component:GenresComponent},
{path:'fav', component:FavoritesComponent,canActivate: [AuthGuard]  },
{path:'details/:id', component:DetailsComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
