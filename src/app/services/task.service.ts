import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  BASE_URL: string = 'http://localhost:3000'; //DIRECCION DE SERVIDOR DE NESTJS

  constructor(private httpClient: HttpClient) {}

  getTask(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.BASE_URL}/task/${id}`);
  }
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.BASE_URL}/task`);
  }
  createTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.BASE_URL}/task/create`, task);
  }
  deleteTask(id: string): Observable<Task> {
    return this.httpClient.delete<Task>(
      `${this.BASE_URL}/task/delete?taskID=${id}`
    );
  }
  updateTask(id: any, task: Task): Observable<Task> {
    return this.httpClient.put<Task>(
      `${this.BASE_URL}/task/update?taskID=${id}`,
      task
    );
  }
}
