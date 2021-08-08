import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  quizId;
  quiz;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService,private _router:Router) { }

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params.quizId;
    //console.log(this.quizId);

    this._quiz.getQuiz(this.quizId).subscribe(
      (data: any) => {
        console.log(data);
        this.quiz=data;
      },
       (error) => {
        console.log(error);
        alert("Error in loading dada");
      });
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to Start The QUIZ?',
      showCancelButton: true,
      confirmButtonText: `Start`,
      denyButtonText: `Don't save`,
      icon:'info'
    }).then((result) => {
      if (result.isConfirmed) {
       this._router.navigate(['/start/'+this.quizId]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
