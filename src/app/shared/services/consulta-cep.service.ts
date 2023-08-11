import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string) {

    //nova variável cep somente com digitos
    cep = cep.replace(/\D/g, '')

    //verifica se o campo cep possui valor informado
    if (cep != "") {
      // Expressão regular para validar o CEP
      const validacep = /^[0-9]{8}$/

      //Se o cep estiver validado:
      if (validacep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json/`)
      }
    }

    return of({})
  }
}
