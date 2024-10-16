import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask, Task } from '../models/itask';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  apiUrl:string = 'https://freeapi.gerasim.in/api/JWT/'
  constructor(private http: HttpClient)
  {

  }
  
  getAllTasks():Observable<ITask>
  {
    return this.http.get<ITask>(`${this.apiUrl}GetAllTaskList`);

  }
  addTask(obj:Task):Observable<ITask>
  {
    return this.http.post<ITask>(`${this.apiUrl}CreateNewTask`,obj);

  }
  updateTask(obj:Task):Observable<ITask>
  {
    return this.http.put<ITask>(`${this.apiUrl}UpdateTask`,obj);

  }
  deleteTask(itemId:number):Observable<ITask>
  {
    return this.http.delete<ITask>(`${this.apiUrl}DeleteTask?itemId=${itemId}`);

  }
}