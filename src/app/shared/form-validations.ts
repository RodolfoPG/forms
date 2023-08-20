import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms"


export class FormValidations {
    static requiredMinCheckbox(min: number = 1) {
        const validator: ValidatorFn = (formArray: AbstractControl) => {
          // const values = formArray.controls
          // let totalChecked = 0
          // for (let i = 0; i < values.length; i++) {
          //   if (values[i].value) {
          //     totalChecked +=1
          //   }
          // }
          if (formArray instanceof FormArray) {
            const totalChecked = formArray.controls
              .map(v => v.value)
              .reduce((total, current) => current ? total + current : total, 0)
            return totalChecked >= min ? null : { required: true }
          }
          throw new Error('formArray is not an instance of FormArray')
        }
        return validator
    }

    static cepValidator(control: FormControl) {

      const cep = control.value
      if (cep && cep !== '') {
        const validacep = /^[0-9]{8}$/
        return validacep.test(cep) ? null : { cepInvalido: true }
      }
      return null
    }

    static equalsTo(otherField: string) {
      const validator: ValidatorFn = (formControl: AbstractControl) => {
        if (formControl instanceof FormControl) {
          if (otherField == null){
              throw new Error('É necessário informar um campo.');
          }
          // Colocamos essa validação abaixo para sabermos se o Angular já preparou esses
          // componentes na renderização. Muitas vezes o objeto vem null por esse motivo,
          // ou seja, as vezes o Angular precisa de um tempinho a mais.
          if (!formControl.root || !(<FormGroup>formControl.root).controls){
              return null;
          }
          // Também poderíamos utilizar a propriedade .parent do formControl,
          // porém, para garantir, vamos utilziar a root (raiz).
          const field = (<FormGroup>formControl.root).get(otherField);

          if (!field){
              throw new Error('É necessário informar um campo válido.');
          }

          if (field.value !== formControl.value){
              // Aqui a validação propriamente feita, onde se não forem iguais, retornamos um erro.
              // Precisamos retornar um objeto com a propriedade de erro com seu nome, no caso
              // usamos o nome sendo equalsTo.
              return { equalsTo: otherField };
          }

          return null;
        }
        throw new Error('formControl não é uma instância de FormControl');
      };
      return validator;
    }

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
      const config: { [key: string]: any } = {
        'required': `${fieldName} é obrigatório.`,
        'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
        'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
        'cepinvalido': 'CEP inválido.'
      }

      return config[validatorName]
    }
}