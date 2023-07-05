import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  taskCompletado: Task = {
    name: '',
    description: '',
    price: 0,
    imageURL: '',
    status: '',
  };
  taskNoCompletado: Task = {
    name: '',
    description: '',
    price: 0,
    imageURL: '',
    status: '',
  };

  allTasks: boolean = true;
  completeTasks: boolean = false;
  noCompleteTasks: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      (res) => {
        this.tasks = res;
      },
      (err) => {
        console.log(err);
        //this.swalAlertService.catchError(error)
      }
    );
  }

  updateStatus(id: any) {
    //Buscar la tarea para cambiarle el status
    this.taskService.getTask(id).subscribe((res) => {
      this.taskCompletado = res;
      //Comparamos si ya esta completada o no
      if (this.taskCompletado.status === 'NoCompletado') {
        this.taskCompletado.status = 'Completado';
      } else {
        this.taskCompletado.status = 'NoCompletado';
      }
      //Cambiarle el status
      this.taskService.updateTask(id, this.taskCompletado).subscribe(
        (res) => {
          Swal.fire(
            'Status actualizado',
            'Tarea actualizada con exito!',
            'success'
          );
          this.getTasks();
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
    });
  }

  filterAll() {
    this.allTasks = true;
    this.completeTasks = false;
    this.noCompleteTasks = false;
    this.getTasks();
  }
  filterCompleteTasks() {
    this.allTasks = false;
    this.completeTasks = true;
    this.noCompleteTasks = false;
    this.getTasks();
  }
  filterNoCompleteTasks() {
    this.allTasks = false;
    this.completeTasks = false;
    this.noCompleteTasks = true;
    this.getTasks();
  }

  //Eliminar definitivamente
  deleteTask(id: any) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar esta tarea?',
      text: "¡Esta tarea se eliminara permanentemente!'",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe(
          (res) => {
            Swal.fire('Eliminado!', 'Tu tarea ha sido eliminada.', 'success');
            this.filterAll();
          },
          (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrio algun problema',
            });
          }
        );
      }
    });
  }
}
