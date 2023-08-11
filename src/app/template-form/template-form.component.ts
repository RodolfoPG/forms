import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(formulario: any) {
    console.log(formulario)

    //console.log(this.usuario)

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .subscribe((dados: any) => {
        console.log(dados)
        formulario.form.reset()
      })
  }

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
  ) {

  }

  verificaValidTouched(campo: any) {

    const isValidated = !campo.valid && campo.touched

    return [
      isValidated,
      isValidated || campo.valid && campo.touched
    ]
  }

  aplicaCssErro(campo: any) {
    return {
      'was-validated': this.verificaValidTouched(campo)[1]
    }
  }

  consultaCEP(cep: any, form: any) {
    //nova variável cep somente com digitos
    cep = cep.replace(/\D/g, '')

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)?.subscribe(dados => this.populaDadosForm(dados, form))
    }
  }

  populaDadosForm(dados: any, formulario: any) {
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     rua: dados.logradouro,
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: dados.complemento,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //   }
    // })

    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        //cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })

    //console.log(formulario)
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

}
