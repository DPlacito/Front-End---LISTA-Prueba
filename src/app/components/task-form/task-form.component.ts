import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { TaskService } from 'src/app/services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    name: '',
    description: '',
    price: 0,
    imageURL: '',
  };

  edit: boolean = false;
  disabled: boolean = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    console.log('inicie');
    const params = this.activatedRoute.snapshot.params;
    if (Object.keys(params).length !== 0) {
      console.log('Entre al if');
      this.taskService.getTask(params['id']).subscribe((res) => {
        console.log(res);
        this.task = res;
        this.edit = true;
      });
    }
  }

  submitTask() {
    console.log('Cree un nueva tarea');
    this.taskService.createTask(this.task).subscribe(
      (res) => {
        console.log(res);
        Swal.fire('Nueva tarea', 'Tarea creada con exito!', 'success');
        this.router.navigate(['/task']);
      },
      (err) => {
        console.log(err),
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrio un error, no se logro crear la tarea',
          });
      }
    );
  }

  updateTask() {
    delete this.task.createdAt;
    this.taskService.updateTask(this.task._id, this.task).subscribe(
      (res) => {
        console.log(res);
        Swal.fire(
          'Tarea actualizada',
          'Tarea actualizada con exito!',
          'success'
        );
        this.router.navigate(['/task']);
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrio un error, no se logro actualizar la tarea',
        });
      }
    );
  }
}
