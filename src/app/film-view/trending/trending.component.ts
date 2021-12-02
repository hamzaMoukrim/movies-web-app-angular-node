import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FilmService } from 'src/app/services/films/film.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit,OnDestroy {
  films:any;
  movies=[];
  totalPages = 0;
  currentPage = 1;
  isLoaded=false;
  FilmsSubscribe:Subscription=new Subscription()
  
  constructor(private auth :AuthService,private filmService:FilmService) {
   
   }

  ngOnInit(): void {
    this.filmService.getTrendingFilms(this.currentPage)
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




onSearch(){
  //console.log(userInput);
   this.filmService.getTrendingFilms(this.currentPage)
   this.FilmsSubscribe = this.filmService.filmsSubject.subscribe((res:any)=>{
     this.films=res.fav;
   });

  
}




onLoadMore(){
  //console.log(userInput);
  if(this.currentPage!=this.totalPages){
  this.currentPage++
  this.filmService.getTrendingFilms(this.currentPage)
  this.FilmsSubscribe = this.filmService.filmsSubject.subscribe((res:any)=>{
  this.films=res.results;
  });
  }
}


onPrev(){
  //console.log(userInput);
  if(this.currentPage>1){
  this.currentPage--
  this.filmService.getTrendingFilms(this.currentPage)
  this.FilmsSubscribe = this.filmService.filmsSubject.subscribe((res:any)=>{
  this.films=res.results;
   }); 
  }
}


}
