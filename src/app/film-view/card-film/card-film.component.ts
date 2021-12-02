import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';
import {film} from "../../Modules/Films"

@Component({
  selector: 'app-card-film',
  templateUrl: './card-film.component.html',
  styleUrls: ['./card-film.component.css']
})
export class CardFilmComponent implements OnInit {
  @Output() showDetails = new EventEmitter<film>();

  @Input()  film:any ;
  @Input()  liked:any ;
  constructor() { }

  ngOnInit(): void {
  }

 onShowDetails(film:film){
  this.showDetails.emit(film);
}

getFilmImage(image:string){
if (image != null)
  return "https://image.tmdb.org/t/p/w300"+image;
else
return "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg";
}


}
