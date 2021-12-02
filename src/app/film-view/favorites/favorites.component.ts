import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { film } from 'src/app/Modules/Films';
import { FilmService } from 'src/app/services/films/film.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit,OnDestroy {

  films:any;
  totalPages = 0;
  currentPage = 1;
  isLoaded=false;
  FilmsSubscribe:Subscription=new Subscription()
   constructor(private filmService:FilmService) {}


  ngOnInit(): void {

    this.filmService.getFavFilms(this.currentPage)
    this.FilmsSubscribe = this.filmService.favSubject.subscribe((res:any)=>{
      this.films=res.fav;
      this.isLoaded=true
      this.totalPages=res.total_pages
   
     });
  }

  ngOnDestroy(){
    this.FilmsSubscribe.unsubscribe()
  }

  onShowDetails(film:film){
 

    alert("title :"+ film.title);
    }


    
onLoadMore(){

  if(this.currentPage!=this.totalPages){
  this.currentPage++
   this.filmService.getFavFilms(this.currentPage)
   this.FilmsSubscribe = this.filmService.favSubject.subscribe((res:any)=>{
    this.films=res.fav;
  });
  }
}


onPrev(){

  if(this.currentPage>1){
  this.currentPage--
   this.filmService.getFavFilms(this.currentPage)
   this.FilmsSubscribe = this.filmService.favSubject.subscribe((res:any)=>{

     this.films=res.fav;
   }); 
  }
}


}
