import { Observable } from 'rxjs';
import { DadosDoLivro } from './dados-do-livro';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AgendaService {

  private readonly API = 'api/agenda';

  constructor(
    private http: HttpClient,

  ) { }

  cadastrar(dados: DadosDoLivro):Observable<DadosDoLivro>{
    return this.http.post<DadosDoLivro>(this.API, dados);
  }

  listar(){
    return this.http.get<any[]>(this.API);
  }

  deletar(id:number):Observable<DadosDoLivro>{
    const url = `${this.API}/${id}`
    return this.http.delete<DadosDoLivro>(url)
  }

  atualizar(atualizar: DadosDoLivro):Observable<DadosDoLivro>{
    const url = `${this.API}`
    return this.http.put<DadosDoLivro>(url, atualizar)
  }


}
