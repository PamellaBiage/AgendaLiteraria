import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AgendaService } from './../agenda.service';
import { DadosDoLivro } from './../dados-do-livro';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  stateOptions: any[] = [{ label: 'Não', value: 'N' }, { label: 'Sim', value: 'S' }];

  value: string = 'N';

  visible: boolean = false;

  ratting: boolean = false;

  formulario = this.fb.group({
    id: [0],
    titulo: [],
    autor: [''],
    rating: [],
    flag: [''],
    inputBusca: [],

  });

  listaDeLivrosS: DadosDoLivro[] = [];

  listaDeLivrosN: DadosDoLivro[] = [];

  livro: DadosDoLivro = { id: null, titulo: '', autor: '', rating: null, flag: '' };

  constructor(
    private fb: FormBuilder,
    private service: AgendaService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,

  ) {

    this.listar();

  }


  listar() {
    this.service.listar().subscribe((retorno) => {
      this.listaDeLivrosS = retorno.filter(livro => livro.flag == 'S');
      this.listaDeLivrosN = retorno.filter(livro => livro.flag == 'N');
      console.log(this.listaDeLivrosN, this.listaDeLivrosS, retorno);
    });
  }

  cadastrar() {

    let dados: DadosDoLivro = this.formulario.getRawValue();
    this.service.cadastrar(dados).subscribe((retorno) => {
      retorno = dados;
      this.formulario.reset;
      this.listar();
    });

  }

  cancelar() {
    this.formulario.reset();
  }

  deletar(id: any) {
    if (id) {
      this.confirmationService.confirm({
        message: 'Deseja excluir esse livro?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
          this.service.deletar(id).subscribe(() =>
            this.listar());
        },
        reject: () => {

        }
      });
    }
  }

  btnAtualizar(atualizarLivro: any) {
    this.livro = atualizarLivro;
    console.log(this.livro);
    this.formulario.patchValue(atualizarLivro);
    window.scrollTo(0, 0);
  }

  atualizar(atualizarLivro: any) {
    this.service.atualizar(atualizarLivro).subscribe(() =>
      this.router.navigate(['/agenda'])
    );
  }

  refresh() {
    window.location.reload;
  }

  showBottomCenter() {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Successo', detail: 'Livro salvo com sucesso' });
  }

  avaliacao() {
    if (this.formulario?.get('flag')?.value == 'N') {
      this.formulario.get('rating')?.disable();

    } else {
      this.formulario.get('rating')?.enable();
    }
  }

  btnTop(){
    window.scrollTo(0,0);
  }

}



