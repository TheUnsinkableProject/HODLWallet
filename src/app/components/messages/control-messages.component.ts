import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ValidationService} from '../../_services/validation.service';

@Component({
  selector: 'control-messages',
  template: `
    <div class="error-msg" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  @Input() controlName: string;
  @Input() controlTxt: string;
  @Input() errorApi: any[];
  @Input() equalWith: string;

  constructor() {
  }

  get errorMessage() {


    if (this.control.errors) {
      for (const propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          const x = ValidationService.getValidatorErrorMessage('form',
            this.controlName, this.controlTxt, propertyName, this.control.errors[propertyName], this.equalWith, this.control.errors);
          if (x !== undefined) {
            return x;
          }
        }
      }
    } else {
      if (this.errorApi) {
        for (const propertyName in this.errorApi) {
          if (this.errorApi.hasOwnProperty(this.controlName) && this.controlName) {
            return ValidationService.getValidatorErrorMessage('api', this.controlName, this.controlTxt,
              propertyName, this.errorApi[this.controlName][0], this.equalWith, this.control.errors);
          }
        }
      }
    }
    return null;
  }
}

