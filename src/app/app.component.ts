import { Component } from '@angular/core';
import { film } from './Modules/Films';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movies-app';

  constructor() {}

//   films = [

//     new film(2,"The shawshank redemption", 
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5kM38v0N_NVi96FOrQqiOWX16jl2KlQvMREa1ZcD6GhWa_gU2Y-XjAkTJ8q-RehLuLgw&usqp=CAU"
//     ,1998,"film 2"),

//     new film(1,"Film 1", 
//     "https://m.media-amazon.com/images/I/519NBNHX5BL._AC_SY445_.jpg"
//     ,this.makeid(20), 2001),

//     new film(3,"the dark knight", 
// "https://f.top4top.io/p_18441he2y0.jpg"
//      , this.makeid(20),2001,1),
//    ]

}

