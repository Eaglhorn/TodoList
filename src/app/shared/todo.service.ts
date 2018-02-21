import { Todo } from './todo';

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders,} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import {RequestOptions} from '@angular/http';

@Injectable()
export class TodoService {
  todos: Todo[];

  private apiUrl = 'api/todos';
  constructor(private httpClient: HttpClient) {}

  getTodos(): Promise<Todo[]> {
    return this.httpClient.get(this.apiUrl)
      .toPromise()
      .then(res => res as Todo[])
      .then(todos => this.todos = todos)
      .catch(this.handleError);
  }

  createTodo(title: string) {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers});
    let todo = new Todo(title);
    this.httpClient.post(this.apiUrl, todo, options)
      .toPromise()
      .then(res => res.json().data)
      .then(todo => this.todos.push(todo))
      .catch(this.handleError);
  }

  deleteTodo(todo: Todo) {

      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers });
      let url = `${this.apiUrl}/${todo.id}`;

      this.httpClient.delete(url,options)
        .toPromise()
        .then(res => {
          let index = this.todos.indexOf(todo);
          if (index > -1) {
            this.todos.splice(index, 1);
        }
    })
        .catch(this.handleError);


  }


    toggleTodo(todo:Todo) {

      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers });
      let url = `${this.apiUrl}/${todo.id}`;

      this.httpClient.put(url,todo,options)
        .toPromise()
        .then(res => {todo.completed = !todo.completed})
        .catch(this.handleError);



    }

    private handleError(error: any) {
    console.error('Произошла ошибка' , error);
      return Promise.reject(error.message || error);
    }

}
