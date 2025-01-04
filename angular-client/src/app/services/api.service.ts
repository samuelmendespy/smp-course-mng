import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Course } from '../models/course.model';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost/api/listar';
  apiPostUrl = 'http://localhost/api/cadastrar';
  apiDeleteUrl = 'http://localhost/api/excluir';
  apiPatchUrl = 'http://localhost/api/alterar';

  constructor(private http: HttpClient) { }

  // Online


  //GET
  obterCursos(): Observable<{ cursos: Course[] }> {
    return this.http.get<{ cursos: Course[] }>(this.apiUrl);
  }

  //DELETE
  excluirCurso(id: number): Observable<any> {
    return this.http.delete<any>(this.apiDeleteUrl, {
      headers: {'Content-Type': 'application/json'},
      body: {id: id},
    });

  }

  //POST

  adicionarNovoCurso(nome: string, preco:number): Observable<any> {
    const body = {
      name: nome,
      price: preco,
    };

    console.log('--- Curso recebido para ser adicionado');

    return this.http.post<any>(this.apiPostUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }

  // PATCH
  atualizarCurso(id: number, nome: string, preco: number):Observable<any>  {
    console.log('O curso será alterado');

    const body = {
      id: id,
      name: nome,
      price: preco,
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.patch(this.apiPatchUrl, { cursos: body }, { headers });
  }

}
