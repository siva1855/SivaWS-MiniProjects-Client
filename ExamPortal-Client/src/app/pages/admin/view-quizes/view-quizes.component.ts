import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {

  quiz = [];

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {

    this._quiz.Quizes().subscribe((data: any) => {
      this.quiz = data;
      console.log(this.quiz);
    }, (error) => {
      console.log(error);
      Swal.fire('Error !', 'Error in loading Data !', 'error');
    });

  }

  //delete Quiz
  removeQuiz(quizId) {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure ??',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // alert(quizId);
        this._quiz.deleteQuiz(quizId).subscribe((data) => {
          //to remove the data in collection
          this.quiz = this.quiz.filter((quiz) => quiz.quizId != quizId);
          Swal.fire('Success', 'Quiz Deleted', 'success');
        }, (error) => {
          Swal.fire('Error', 'Error in Deleting Quiz ', 'error');
          console.log("Error in Deleting Record")
        });
      }
    });
  }

}
