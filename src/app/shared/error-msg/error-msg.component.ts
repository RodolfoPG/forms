import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent {

  // @Input() mostrarErro?: boolean
  // @Input() msgErro!: string

  @Input() control!: FormControl
  @Input() label!: string

  get errorMessage() {

    for (const propertName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertName) &&
        this.control.touched) {
          // TODO
          return FormValidations.getErrorMsg(this.label, propertName, this.control.errors[propertName])
        }
    }

    return null
  }

}
