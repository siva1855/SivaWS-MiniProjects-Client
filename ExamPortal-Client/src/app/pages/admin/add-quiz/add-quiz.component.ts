import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories = [];

  quizData = {
    quizTitle: '',
    quizDescription: '',
    quizMaximumMarks: '',
    quizNumberOfQuestions: '',
    quizActive: true,
    category: {
      categoryId: ''
    }
  };

  constructor(private _cat: CategoryService, private _snack: MatSnackBar, private _quiz: QuizService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data: any) => {
      this.categories = data;
      //console.log(this.categories);
    },
      (error) => {
        console.log(error);
        Swal.fire('error !!', 'Error in Loading Data From Server', 'error');
      }
    );

  }


  public addQuizFormSubmit() {
    //start validations
    if (this.quizData.quizTitle.trim() == '' || this.quizData.quizTitle == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.quizData.quizDescription.trim() == '' || this.quizData.quizDescription == null) {
      this._snack.open('Description Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.quizData.quizMaximumMarks == '' || this.quizData.quizMaximumMarks == null) {
      this._snack.open('Maximum Marks Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.quizData.quizNumberOfQuestions == '' || this.quizData.quizNumberOfQuestions == null) {
      this._snack.open('Number Of Questions Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.quizData.category.categoryId == '' || this.quizData.category.categoryId == null) {
      this._snack.open('Category Required !!', '', {
        duration: 3000,
      });
      return;
    }
    //end validations

    //call server 
    this._quiz.saveQuiz(this.quizData).subscribe((data: any) => {
      Swal.fire('Success', 'Quiz is added', 'success');
      this.quizData = {
        quizTitle: '',
        quizDescription: '',
        quizMaximumMarks: '',
        quizNumberOfQuestions: '',
        quizActive: true,
        category: {
          categoryId: ''
        }
      };
    }, (error) => {
      Swal.fire('Error', 'Error While Adding Quiz', 'error');
      console.log(error);
    });
  }
}
