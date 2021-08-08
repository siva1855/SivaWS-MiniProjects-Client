import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  categoryId;
  quizes;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.categoryId = params.categoryId;
      if (this.categoryId == 0) {
        console.log("Load All The Quiz....")
        this._quiz.getActiveQuizes().subscribe((data: any) => {
          this.quizes = data;
          console.log(this.quizes);
        }, (error) => {
          console.log(error);
          alert("Error in loading all Quizes");
        });
      } else {
        console.log("load Specific quiz......");
        this._quiz.getActiveQuizesOfCategory(this.categoryId).subscribe(
          (data: any) => {
            this.quizes = data;
            console.log(this.quizes);
          },
          (error) => {
            alert('Error in loading Quiz data')
          });
      }
    });
  }
}
