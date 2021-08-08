import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  //get All Quizes
  public Quizes() {
    return this._http.get(`${baseUrl}/examportal/quiz/getall`);
  }

  //add Quiz
  public saveQuiz(quiz) {
    return this._http.post(`${baseUrl}/examportal/quiz/save`, quiz);
  }

  //delete Quiz
  public deleteQuiz(quizId) {
    return this._http.delete(`${baseUrl}/examportal/quiz/delete/${quizId}`);
  }

  //get one Quiz
  public getQuiz(quizId){
    return this._http.get(`${baseUrl}/examportal/quiz/getone/${quizId}`);
  }

  //update Quiz
  public updateQuiz(quiz){
    return this._http.put(`${baseUrl}/examportal/quiz/update`,quiz);
  }

  //get Quizes of Category
  public getQuizesOfCategory(categoryId){
    return this._http.get(`${baseUrl}/examportal/quiz/category/${categoryId}`)
  }

  //get Active Quizes
  public getActiveQuizes(){
    return this._http.get(`${baseUrl}/examportal/quiz/active`);
  }

  //get Active Quizes of Category
  public getActiveQuizesOfCategory(categoryId){
    return this._http.get(`${baseUrl}/examportal/quiz/category/active/${categoryId}`);
  }
}
