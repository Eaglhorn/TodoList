import { Component } from '@angular/core';

import { Todo } from './shared/todo';
//import { todos } from './shared/data.servise';


// Добавление задач
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
  title: string = 'Angular 2Do';

}


