import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  
  quizId;
  quizTitle;
  question = {
    quiz: {},
    questionContent: '',
    questionOption1: '',
    questionOption2: '',
    questionOption3: '',
    questionOption4: '',
    questionAnswer: ''
  }

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params.quizId;
    this.quizTitle = this._route.snapshot.params.quizTitle;
    this.question.quiz['quizId'] = this.quizId;
  }

  addQuestionFormSubmit() {
    //start validations
    if (this.question.questionContent.trim() == '' || this.question.questionContent == null) {
      this._snack.open('Content Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.question.questionOption1.trim() == '' || this.question.questionOption1 == null) {
      this._snack.open('Option1 Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.question.questionOption2.trim() == '' || this.question.questionOption2 == null) {
      this._snack.open('Option2 Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.question.questionOption3.trim() == '' || this.question.questionOption3 == null) {
      this._snack.open('Option3 Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.question.questionOption4.trim() == '' || this.question.questionOption4 == null) {
      this._snack.open('Option4 Required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.question.questionAnswer.trim() == '' || this.question.questionAnswer == null) {
      this._snack.open('Answer Required !!', '', {
        duration: 3000,
      });
      return;
    }
    //end validations

    //call server
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question Added Successfully', 'success');
        this.question.questionContent='';
        this.question.questionOption1='';
        this.question.questionOption2='';
        this.question.questionOption3='';
        this.question.questionOption4='';
        this.question.questionAnswer='';
      },
      (error) => {
        Swal.fire('Error', 'Error in Adding Question', 'error');
      })

  }
}
