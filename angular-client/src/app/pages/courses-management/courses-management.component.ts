import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-courses-management',
  templateUrl: './courses-management.component.html',
  styleUrls: ['./courses-management.component.scss']
})
export class CoursesManagementComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
    // Online API
    this.obterCursos();
  }

  // Online API
  obterCursos(){
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

  salvarCurso(){
    if (this.selectedCourse.name != undefined && this.selectedCourse.price != undefined){
      let courseId = parseInt(this.selectedCourse.id, 10);
      let coursePrice = parseInt(this.selectedCourse.price, 10);
      let courseName = this.selectedCourse.name;

      if (!courseId){

        this.apiService.adicionarNovoCurso(courseName, coursePrice).subscribe({
          next: (response) => {
            if (response.status === 'sucesso') {} else {
              this.mensagem = response.mensagem || 'Erro desconhecido.';
              console.log(this.mensagem);
              this.refreshInfo();
            }
          },
          error: (error) => {
            console.error('Erro ao cadastrar curso.:', error);
          }});
      } else {
        this.apiService.atualizarCurso(courseId, courseName, coursePrice).subscribe({
          next: (response) => {
            if (response.status === 'sucesso') {} else {
              this.mensagem = response.mensagem || 'Erro desconhecido.';
              this.refreshInfo();
            }
          },
          error: (error) => {
            console.log('Erro ao atualizar curso');
            console.error('Erro:', error);
        }});
      }
      
    }
  }

  excluirCurso(){
    let itemId = parseInt(this.selectedCourse.id, 10);
    if (!itemId) {
      this.mensagem = 'ID inválido.';
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
      },
      error: (err) => {
        console.error('Erro ao excluir curso:', err);
        this.mensagem = 'Erro ao excluir curso.';
      }
    });

    this.refreshInfo();
  }

  refreshInfo(){
    this.obterCursos();
    this.selectedCourse= {id: '' , name: '', price: '' };
  }
 
  // Offline
  cursoSelecionado(courseId: number ): void {
    let cursoApontado = this.cursos.find(c => c.id === courseId);
    if (cursoApontado) {
      this.selectedCourse = {
        id: cursoApontado.id.toString() ,
        name: cursoApontado.name,
        price: cursoApontado.price.toString()
      };
    }
    this.isEditMode = true;
  }
}
