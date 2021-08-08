import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  quizid = 0;
  quiz;
  categories;

  constructor(private _router: ActivatedRoute, private _quiz: QuizService, private _cat: CategoryService,private _snack:MatSnackBar,private _routerlink:Router) { }

  ngOnInit(): void {
    this.quizid = this._router.snapshot.params.quizId;
    //alert(this.quizid);

    this._quiz.getQuiz(this.quizid).subscribe(
      (data) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      });

      //get all categories
    this._cat.categories().subscribe((data: any) => {
      this.categories = data;
    }, (error) => {
      alert('error in loading categories')
    });

  }

  //update form submit
  public updateQuizFormSubmit(){
    //start validations
    if (this.quiz.quizTitle.trim() == '' || this.quiz.quizTitle == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.quizDescription.trim() == '' || this.quiz.quizDescription == null) {
      this._snack.open('Description Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.quizMaximumMarks == '' || this.quiz.quizMaximumMarks == null) {
      this._snack.open('Maximum Marks Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.quizNumberOfQuestions == '' || this.quiz.quizNumberOfQuestions == null) {
      this._snack.open('Number Of Questions Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.category.categoryId == '' || this.quiz.category.categoryId == null) {
      this._snack.open('Category Required !!', '', {
        duration: 3000,
      });
      return;
    }
    //end validations

    this._quiz.updateQuiz(this.quiz).subscribe((data:any)=>{
      Swal.fire('Success','Quiz Updated Successfully','success').then((e)=>{
        this._routerlink.navigate(['admin/quizes']);
      });
    },
    (error)=>{
      Swal.fire('Error','Error in updating Quiz','error');
      console.log(error);
      
    });

  }
}
