import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  quizId;
  questions;

  marksGot = 0;
  correctAnswers = 0;
  attemptedQuestions = 0;

  isSubmit = false;

  timer: any;

  constructor(
    private locationStra: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this._route.snapshot.params.quizId;
    console.log(this.quizId);
    this.loadQuestions();
  }

  //load all questions(server call)
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.quizId).subscribe(
      (data: any) => {
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        //front end --to create the variable
        // this.questions.forEach((q) => {
        //   q['givenAnswer'] = '';
        // });

        console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading Questions of Quiz', 'error');
      });
  }

  //logic -it is not going to previous page
  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStra.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }


  submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit The QUIZ?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluateQuiz();
      }
    });
  }

  //timer logic
  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluateQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  //time format
  getFormattedTime() {
    let mm: number = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min:${ss} sec`;
  }

  //timer automatically submit the quiz
  evaluateQuiz() {
    //call to server to check questions
    this._question.evaluateQuiz(this.questions).subscribe(
      (data: any) => {
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attemptedQuestions = data.attemptedQuestions;
        this.isSubmit = true;
      }, (error) => {
        console.log(error);
      });

    // this.isSubmit = true;
    // this.questions.forEach((q) => {
    //   if (q.givenAnswer == q.questionAnswer) {
    //     this.correctAnswers++;
    //     let singleQuestionMarks = this.questions[0].quiz.quizMaximumMarks / this.questions.length;
    //     this.marksGot += singleQuestionMarks;
    //   }
    //   if (q.givenAnswer.trim() != '') {
    //     this.attemptedQuestions++;
    //   }
    // });
    // console.log("Correct Answers :: " + this.correctAnswers);
    // console.log("Marks Got :: " + this.marksGot);
    // console.log("Attempted Questions :: " + this.attemptedQuestions);
    // console.log("Total Questions :: " + this.questions.length);
    // console.log(this.questions);
  }

  //print Quiz Result
  printQuizResult() {
    window.print();
  }
}
