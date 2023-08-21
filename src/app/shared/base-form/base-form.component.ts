import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent {

  formulario!: FormGroup

  abstract submit(): any

  onSubmit() {
    if (this.formulario.valid) {
      this.submit()
    } else {
      console.log('Formulário inválido')
      this.verificaValidacoesForm(this.formulario)
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo)
      const controle = formGroup.get(campo)
      controle?.markAsDirty()
      controle?.markAllAsTouched()
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle)
      }
    })
  }

  resetar() {
    this.formulario.reset()
  }

  verificaValidTouched(campo: string) {

    const isValidated = !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    
    return [
      isValidated,
      isValidated || this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    ]
  }

  verificaRequired(campo: string) {
    return (
      this.formulario.get(campo)?.hasError('required') &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    )
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email')
    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'was-validated': this.verificaValidTouched(campo)[1]
    }
  }

  getCampo(campo: string) {
    return this.formulario.get(campo)
  }

}
