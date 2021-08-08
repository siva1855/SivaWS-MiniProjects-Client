import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  quizId;
  quizTitle;
  questions = [];

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params.quizId;
    this.quizTitle = this._route.snapshot.params.quizTitle;
    console.log(this.quizId);
    console.log(this.quizTitle);

    this._question.getQuestionsOfQuiz(this.quizId).subscribe((data: any) => {
      console.log(data);
      this.questions = data;
    }, (error) => {
      console.log(error);
    })
  }

  //delete Question
  deleteQuestion(questionId) {
    //alert(questionId);
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure, want to delete this question??'
    }).then((result) => {
      if (result.isConfirmed) {
        //confirm
        this._question.deleteQuestion(questionId).subscribe(
          (data) => {
            this._snack.open('Question Deleted Successfully...', '', {
              duration: 3000
            });
            this.questions = this.questions.filter((q) => q.questionId != questionId);
          },
          (error)=>{
            this._snack.open('Error in Deleting Question','',{
              duration:3000
            });
          });

      }
    });


  }

}
