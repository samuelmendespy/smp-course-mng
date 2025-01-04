import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { ApiService } from 'src/app/services/api.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-management',
  templateUrl: './courses-management.component.html',
  styleUrls: ['./courses-management.component.scss']
})
export class CoursesManagementComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse = {id: '' , name: '', price: '' };
  isEditable: boolean = true;
  isEditMode : boolean = false;

  // Online API
  cursos: Course[] = [];
  erro : string | null = null;
  cursoId!: number;
  mensagem: string = '';

  constructor(
    private apiService: ApiService,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    console.log('Courses:');
    this.courses = this.coursesService.getAllCourses();
    
    // Online API
    this.apiService.obterCursos().subscribe({
      next: (data) => {
        this.cursos = data.cursos;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar cursos';
        console.error(err);
      }
    });

  }

  // Online API

  cursoSelecionado(courseId: number ): void {
    let cursoApontado = this.cursos.find(c => c.id === courseId);
    if (cursoApontado) {
      this.selectedCourse = { id: cursoApontado.id.toString() , name: cursoApontado.name, price: cursoApontado.price.toString() };
      console.log('Course selected:', cursoApontado.id);
    }
    this.isEditMode = true;
  }


  salvarCurso(){
    if (this.selectedCourse.name != undefined && this.selectedCourse.price != undefined){
      let courseId = parseInt(this.selectedCourse.id, 10);
      let coursePrice = parseInt(this.selectedCourse.price, 10);
      let courseName = this.selectedCourse.name;

      if (!courseId){
        // add new course
        console.log('Novo curso sendo adicionado');

        this.apiService.adicionarNovoCurso(courseName, coursePrice).subscribe({
          next: (response) => {
            if (response.status === 'sucesso') {
              this.mensagem = response.mensagem;
            } else {
              this.mensagem = response.mensagem || 'Erro desconhecido.';
            }
            console.log(response);
          },
          error: (error) => {
            this.mensagem = 'Erro ao cadastrar curso.';
            console.error('Erro:', error);
          }});

      } else {
        // update course
        console.log('O curso existe e está sendo atualizado');
        this.apiService.atualizarCurso(courseId, courseName, coursePrice).subscribe({
          next: (response) => {
            if (response.status === 'sucesso') {
              this.mensagem = response.mensagem;
            } else {
              this.mensagem = response.mensagem || 'Erro desconhecido.';
            }
            console.log(response);
          },
          error: (error) => {
            this.mensagem = 'Erro ao atualizar curso.';
            console.error('Erro:', error);
        }});
        
      }
    }
    // clear selected course
    this.selectedCourse= {id: '' , name: '', price: '' };
  }


  excluirCurso(){
    let itemId = parseInt(this.selectedCourse.id, 10);

    if (!itemId) {
      this.mensagem = 'Por favor, insira um ID válido.';
      console.log(this.mensagem);
      return;
    }


    this.apiService.excluirCurso(itemId).subscribe({
      next: (response) => {

        if (response.status === 'sucesso') {
          this.mensagem = response.mensagem;
        } else {
          this.mensagem = response.mensagem || 'Erro desconhecido.';
        }
        console.log(response);

      },
      error: (err) => {
        console.error('Erro ao excluir curso:', err);
        this.mensagem = 'Erro ao excluir curso.';
      }
    });

  }
 
  // Offline

  onCourseSelected(courseId: number ): void {
    let courseFound = this.courses.find(c => c.id === courseId);
    if (courseFound) {
      this.selectedCourse = { id: courseFound.id.toString() , name: courseFound.name, price: courseFound.price.toString() };
      console.log('Course selected:', courseFound.id);
    }
    this.isEditMode = true;
  }

  saveChanges(){
    if (this.selectedCourse.name != undefined && this.selectedCourse.price != undefined){
      let courseId = parseInt(this.selectedCourse.id, 10);
      let coursePrice = parseInt(this.selectedCourse.price, 10);
      let courseName = this.selectedCourse.name;

      if (!courseId){
        // add new course
        this.coursesService.addNewCourse(courseName, coursePrice);
        console.log('New course added:', courseName);
      } else {
        // update course
        this.coursesService.updateCourse(courseId, courseName, coursePrice);
        console.log('Updated course with ID', courseId);
      }
    }
    // clear selected course
    this.selectedCourse= {id: '' , name: '', price: '' };
  }

  deleteCourse(){
    let courseId = parseInt(this.selectedCourse.id, 10);
    if (courseId){
      this.coursesService.deleteCourseById(courseId);
      console.log('Deleted course with ID', courseId);
    }

    // clear selected course
    this.selectedCourse= {id: '' , name: '', price: '' };
  }

}
