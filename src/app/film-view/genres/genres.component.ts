import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FilmService } from 'src/app/services/films/film.service';
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  films:any;
  movies=[];
  totalPages = 0;
  currentPage = 1;
  isLoaded=false;
  FilmsSubscribe:Subscription=new Subscription()
  genre:any;
  constructor(private route: ActivatedRoute,private auth :AuthService,private filmService:FilmService) { }

  ngOnInit(): void {


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.genre = params.get('genre');
      this.filmService.getFilmsByGenre(this.currentPage,this.genre)
      this.FilmsSubscribe = this.filmService.filmsSubject.subscribe((res:any)=>{
         this.films=res.results;
         this.isLoaded=true;
       });
    })

    // this.filmService.getFilmsByGenre(this.currentPage,this.genre)
    // this.FilmsSubscribe = this.filmService.filmsSubject.subscribe((res:any)=>{
    //    this.films=res.results;
    //    this.isLoaded=true;
    //  });
 
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


  
onLoadMore(){
  //console.log(userInput);
  if(this.currentPage!=this.totalPages){
  this.currentPage++
  this.filmService.getFilmsByGenre(this.currentPage,this.genre)
  this.FilmsSubscribe = this.filmService.filmsSubject.subscribe((res:any)=>{
  this.films=res.results;
  });
  }
}


onPrev(){
  //console.log(userInput);
  if(this.currentPage>1){
  this.currentPage--
  this.filmService.getFilmsByGenre(this.currentPage,this.genre)
  this.FilmsSubscribe = this.filmService.filmsSubject.subscribe((res:any)=>{
  this.films=res.results;
   }); 
  }
}

}
