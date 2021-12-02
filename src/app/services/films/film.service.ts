import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl+"/api/";
@Injectable({
  providedIn: 'root'
})
export class FilmService {

films:any;
favs:any;
favSubject=new Subject<any>()
filmsSubject= new Subject<any>()



  constructor(private http: HttpClient) { }



// verison avec les subjects

getAllFilms(page:number){

  const url ="https://api.themoviedb.org/3/movie/popular?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page="+page;

 return this.http.get(url).subscribe((films:any)=>{
   this.films=films;
   this.emitFilmsSubject();
 });

}



getFilmsByGenre(page:number,genre:string){
  let url="";


if(genre=="action"){
  url ="https://api.themoviedb.org/3/discover/movie?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page=2&with_genres=28"+"&page="+page;

}else if(genre=="animation") {
  url ="https://api.themoviedb.org/3/discover/movie?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page=2&with_genres=16"+"&page="+page;


}else if(genre=="adventure"){
  url ="https://api.themoviedb.org/3/discover/movie?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page=2&with_genres=12"+"&page="+page;

}else if(genre=="comedy"){
  url ="https://api.themoviedb.org/3/discover/movie?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page=2&with_genres=35"+"&page="+page;

}else if(genre=="documentary"){
  url ="https://api.themoviedb.org/3/discover/movie?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page=2&with_genres=99"+"&page="+page;

}else if(genre=="drama"){
  url ="https://api.themoviedb.org/3/discover/movie?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page=2&with_genres=18"+"&page="+page;

}else if(genre=="family"){
  url ="https://api.themoviedb.org/3/discover/movie?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page=2&with_genres=10751"+"&page="+page;

}else if(genre=="horror"){
  url ="https://api.themoviedb.org/3/discover/movie?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page=2&with_genres=27"+"&page="+page;

}else if(genre=="romance"){
  url ="https://api.themoviedb.org/3/discover/movie?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page=2&with_genres=10749"+"&page="+page;

}else if(genre=="science-fiction"){
  url ="https://api.themoviedb.org/3/discover/movie?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page=2&with_genres=878"+"&page="+page;

}else {
  url ="https://api.themoviedb.org/3/movie/popular?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page="+page;

}
 
 return this.http.get(url).subscribe((films:any)=>{
   this.films=films;
   this.emitFilmsSubject();
 });

}

// get trending movies

getTopMovies(page:number){

  const url ="https://api.themoviedb.org/3/movie/top_rated?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page="+page;

 return this.http.get(url).subscribe((films:any)=>{
   this.films=films;
   this.emitFilmsSubject();
 });
}

getTrendingFilms(page:number){

  const url ="https://api.themoviedb.org/3/trending/all/day?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&page="+page;

 return this.http.get(url).subscribe((films:any)=>{
   this.films=films;
   this.emitFilmsSubject();
 });
}

//

emitFilmsSubject(){
  this.filmsSubject.next(this.films)
}

emitFavSubject(){
  this.favSubject.next(this.favs)
}

   getFilmsSearch(userInput:string,page:number){
  // const url ="https://api.themoviedb.org/3/movie/550?api_key=653c2ee8cd95fbd2626732aa98a8333e";
    const url= 'https://api.themoviedb.org/3/search/movie?api_key=' + "653c2ee8cd95fbd2626732aa98a8333e" + '&language=fr&query=' + userInput + "&page=" + page;

   return this.http.get(url).toPromise().then((res:any)=>{return res;},(error)=>{console.log("Error Occcured : " + error)});

  }



 getFilmDetail(id:any){
     
    const url= 'https://api.themoviedb.org/3/movie/'+id+'?api_key=53cd43478eccb1239bfa57194c3cfe90&language=en-US&append_to_response=videos';
  
     return this.http.get(url).toPromise().then((res:any)=>{return res;},(error)=>{console.log("Error Occcured : " + error)});
  
  }


    addFavorite(film:any){
      const url=apiUrl+"movies/addFav";
     return this.http.post(url,{film:film}).toPromise().then((res:any)=>{return res;},(error)=>{console.log("Error Occcured : " + error)});
    }

    removeFavorite(film:any){
      const url=apiUrl+"movies/removeFav";
     return this.http.post(url,{film:film}).toPromise().then((res:any)=>{return res;},(error)=>{console.log("Error Occcured : " + error)});
    }

    
getFavFilms(page : Number){
const url =apiUrl+"movies/getFav/"+page;

 return this.http.get(url).subscribe((films:any)=>{

   this.favs=films;
   this.emitFavSubject();
 });
}


    
addComment(film:any,comment:String){
  const url=apiUrl+"comments/addComment";

 return this.http.post(url,{film:film,comment}).toPromise().then((res:any)=>{return res;},(error)=>{console.log("Error Occcured : " + error)});

}



getComments(id : Number){

  const url =apiUrl+"comments/get/"+id;

  return this.http.get(url).toPromise().then((res:any)=>{return res;},(error)=>{console.log("Error Occcured : " + error)});
  

}


}
