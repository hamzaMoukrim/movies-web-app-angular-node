import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import "../Modules/Films"
import { film } from '../Modules/Films';
import { AuthService } from '../services/auth.service';
import { FilmService } from '../services/films/film.service';

@Component({
  selector: 'app-film-view',
  templateUrl: './film-view.component.html',
  styleUrls: ['./film-view.component.css']
})
export class FilmViewComponent implements OnInit,OnDestroy {

  films:any;
  movies=[];
  totalPages = 0;
  currentPage = 1;
  isLoaded=false;
  FilmsSubscribe:Subscription=new Subscription()
  
  constructor(private auth :AuthService,private filmService:FilmService) {
   
   }

  ngOnInit(): void {
    this.filmService.getAllFilms(this.currentPage)
   this.FilmsSubscribe = this.filmService.filmsSubject.subscribe((res:any)=>{
      this.films=res.results;
      this.isLoaded=true;
    });

   if(this.auth.isLoggedIn()){

    this.filmService.getFavFilms(this.currentPage)
    this.filmService.favSubject.subscribe((res:any)=>{
      this.movies=Object.values(res.allFav);
     });
   }
  }

  isFav(id:Number):Boolean{
    let fav=false;
    this.movies.map((m:any)=>{
      if (m.id==id) {
        fav=true
      }
    })
   
    return fav
    // movies
  }

  ngOnDestroy(){
    this.FilmsSubscribe.unsubscribe()
  }

  onShowDetails(film:film){
 

  alert("title :"+ film.title);
  }


onSearch(){
 
   this.filmService.getAllFilms(this.currentPage)
   this.FilmsSubscribe = this.filmService.filmsSubject.subscribe((res:any)=>{
     this.films=res.fav;
   });

  
}




onLoadMore(){
 
  if(this.currentPage!=this.totalPages){
  this.currentPage++
  this.filmService.getAllFilms(this.currentPage)
  this.FilmsSubscribe = this.filmService.filmsSubject.subscribe((res:any)=>{
  this.films=res.results;
  });
  }
}


onPrev(){

  if(this.currentPage>1){
  this.currentPage--
  this.filmService.getAllFilms(this.currentPage)
  this.FilmsSubscribe = this.filmService.filmsSubject.subscribe((res:any)=>{
  this.films=res.results;
   }); 
  }
}




}
