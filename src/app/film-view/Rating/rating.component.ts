import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
@Input() movie_average:any


  constructor() { }

  ngOnInit(): void {
  }

  firstConditon(i:number){
   return i<this.movie_average && this.movie_average - i < 1 && this.movie_average - i > 0
  }

  secondCondition(i:number){
   return i < this.movie_average && this.movie_average - i > 0
  }

}
