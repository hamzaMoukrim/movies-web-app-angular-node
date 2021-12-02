import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { FilmService } from 'src/app/services/films/film.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
export interface Item { name: string; }

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: any;
  film:any;
  items:any;
  isLoaded=false;
  safeSrc: SafeResourceUrl;
  date=""
  movies=[];
  constructor(private router: Router,private auth :AuthService,private sanitizer: DomSanitizer,private route: ActivatedRoute,private filmservice:FilmService) {
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/`);
   }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    })

    this.filmservice.getFilmDetail(this.id).then(res=>{
   
      this.film=res;
      this.date=this.getDate(res.release_date)
      this.isLoaded=true
      this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${res.videos.results[0].key}`);
    });


    if(this.auth.isLoggedIn()){      
      this.filmservice.getFavFilms(1)
      this.filmservice.favSubject.subscribe((res:any)=>{
        this.movies=res.allFav;
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
  }


  getDate(s:string){
    var day  = new Date(s);
    return day.toLocaleDateString("en-US",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  getFilmImage(image:string){
    return "https://image.tmdb.org/t/p/w300"+image;
  }

  getTrailer(id:string){
    return `https://www.youtube.com/embed/${id}`
  }


  onLike(film:any){

    if (this.auth.isLoggedIn()) {

      this.filmservice.addFavorite(film).then(res=>{
   

        if (!res.status) {
          Swal.fire({
            title: 'Error!',
            text: res.errors,
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }else{
  
          this.filmservice.getFavFilms(1)
          this.filmservice.favSubject.subscribe((res:any)=>{
            this.movies=res.allFav;
           });
         
         
          Swal.fire(
            res.messages[0],
            res.messages,
            'success'
          )
        }
      }); 
    }else{
      Swal.fire({
        title: 'You are not logged in !',
        text: "You won't be able to add this movie to favorite if you didn't logged in !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Register'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['auth']);
        }
        
      })
    }

   
  }


  onRemoveFav(film:any){
    this.filmservice.removeFavorite(film).then(res=>{
      if (!res.status) {
        Swal.fire({
          title: 'Error!',
          text: res.errors,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }else{

        this.filmservice.getFavFilms(1)
        this.filmservice.favSubject.subscribe((res:any)=>{
          this.movies=res.allFav;
         });
        Swal.fire(
          res.messages[0],
          res.messages,
          'success'
        )
      }
    }); 

  }

}
