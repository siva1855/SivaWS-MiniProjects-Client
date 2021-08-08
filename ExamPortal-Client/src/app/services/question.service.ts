import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  //get all Questions of quiz (admin using)
  public getQuestionsOfQuiz(quizId) {
    return this._http.get(`${baseUrl}/examportal/question/quiz/all/${quizId}`);
  }

  //get all Questions of quiz for exam(Test)
  public getQuestionsOfQuizForTest(quizId) {
    return this._http.get(`${baseUrl}/examportal/question/quiz/${quizId}`);
  }


  //add question
  public addQuestion(question) {
    return this._http.post(`${baseUrl}/examportal/question/save`, question);
  }

  //delete Question
  public deleteQuestion(questionId) {
    return this._http.delete(`${baseUrl}/examportal/question/delete/${questionId}`);
  }

  //evaluate Quiz
  public evaluateQuiz(questions) {
    return this._http.post(`${baseUrl}/examportal/question/evaluate-quiz`, questions);
  }
}
