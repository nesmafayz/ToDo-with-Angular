import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TasksService } from './../../services/tasks.service';
import { FormsModule } from '@angular/forms';
import { ITask, Task } from '../../models/itask';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit  {
   tasks : ITask[] = [];
   obj:Task = new Task();
  constructor(private _TasksService:TasksService )
  {

  }

  ngOnInit(): void {
    this.DisplayAllTasks();
    
  }
  DisplayAllTasks()
  {
      this._TasksService.getAllTasks().subscribe({
      next:(res:any) =>
      {
        this.tasks = res.data;
        console.log(res.data);

      }
      
    });

  }

  AddNewTask() {
    this.obj.completedOn = new Date(); 
    this.obj.createdOn = new Date();

    this._TasksService.addTask(this.obj).subscribe({
        next: (res: any) => {
            console.log('API Response:', res); 
            if (res.result) {
                this.DisplayAllTasks();
                this.obj = new Task(); 
            }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding task:', error);
          console.error('Error details:', error.error); 
      }
      
    });
}


  editTask(task:Task)
  {
    this.obj = task;  
  

  }

  UpdateTask()
  {
    this._TasksService.updateTask(this.obj).subscribe({
      next: (res: any) => {
        console.log('API Response:', res); 
        if (res.result) {
            this.DisplayAllTasks();
            this.obj = new Task(); 
        }
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error adding task:', error);
      console.error('Error details:', error.error); 
  }
  
    })
  }


  DeleteTask(itemId: number) {
    console.log('ID:', itemId); 
    this._TasksService.deleteTask(itemId).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.DisplayAllTasks();
      }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting task:', error);
      }
    });
  }
  
  toggleOfCompleteTask(task: ITask) {
    task.isCompleted = !task.isCompleted;

    this._TasksService.updateTask(task).subscribe({
      next: (res: any) => {
        console.log('Task completion status updated:', res);
        this.DisplayAllTasks();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error updating task completion status:', error);
      }
    });
  }

}