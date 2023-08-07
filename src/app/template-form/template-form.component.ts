import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';

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

  onSubmit(form: any) {
    console.log(form)

    //console.log(this.usuario)
  }

  constructor(private http: HttpClient) {

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

  consultaCEP(cep: any) {
    //nova variável cep somente com digitos
    cep = cep.replace(/\D/g, '')

    //verifica se o campo cep possui valor informado
    if (cep != "") {
      // Expressão regular para validar o CEP
      const validacep = /^[0-9]{8}$/

        //Se o cep estiver validado:
        if (validacep.test(cep)) {

          this.http.get(`//viacep.com.br/ws/${cep}/json/`)
            .pipe(map((dados: any) => dados))
            .subscribe(dados => console.log(dados))
        }
    }
  }

}
