import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FilmService } from 'src/app/services/films/film.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {

  
  @Input()  film:any ;
  comment=""
  comments:any;
  constructor(private router: Router,private auth :AuthService,private filmservice :FilmService) { }

  ngOnInit(): void {

    this.filmservice.getComments(this.film.id).then(res=>{
   
      this.comments=res.comments;
   
    });
  }


  submitComment(){

    if (this.auth.isLoggedIn()) {
    this.filmservice.addComment(this.film,this.comment).then(res=>{
      if (!res.status) {
        Swal.fire({
          title: 'Error!',
          text: res.errors,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }else{
        this.comments=res.comments
        this.comment=""
        Swal.fire(
          'You add a comment!',
          res.messages,
          'success'
        )
      }
    }); 

  }else{      
    Swal.fire({
      title: 'You are not logged in !',
      text: "You won't be able to comment if you didn't logged in !",
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

  

}
