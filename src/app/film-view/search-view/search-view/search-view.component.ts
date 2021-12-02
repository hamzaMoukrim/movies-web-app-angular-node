import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { film } from 'src/app/Modules/Films';
import { FilmService } from 'src/app/services/films/film.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {

  films:any;
  userInput:any

  totalPages = 0;
  currentPage = 1;
  constructor(private route:ActivatedRoute ,private filmService:FilmService,private router: Router) {
   
   }

  ngOnInit(): void {

    this.route.queryParams.subscribe(res=>{
      // console.log(res.input) //will give query params as an object
      
      this.userInput=res.input
      console.log(this.userInput)
      if (this.userInput=="") {
        this.router.navigate(['/']);
      }
      this.filmService.getFilmsSearch(this.userInput,1).then(res=>{
        this.films=res.results;
        this.totalPages = res.total_pages;
      }); 
    })

  }

  // ngOnChanges(changes:SimpleChanges){
  //   const c: SimpleChanges = changes;

  //   console.log(c)

  // }
  

  onShowDetails(film:film){
 

  alert("title :"+ film.title);
  }


onLoadMore(userInput:string){
  //console.log(userInput);
  if(this.currentPage!=this.totalPages){
  this.currentPage++
   this.filmService.getFilmsSearch(userInput,this.currentPage).then(res=>{
     console.log(res)
     this.films=res.results;
   }); 
  }
}


onPrev(userInput:string){
  //console.log(userInput);
  if(this.currentPage>1){
  this.currentPage--
   this.filmService.getFilmsSearch(userInput,this.currentPage).then(res=>{
     console.log(res)
     this.films=res.results;
   }); 
  }
}

}
