import {Injectable} from '@angular/core';

@Injectable()
export class ValidationService {
  static getValidatorErrorMessage(type: string, controlName: string, controlTxt: string, validatorName: string,
                                  validatorValue?: any, equalWith?: string, validErrors?: any) {
    const config = {
      'required': `The ${controlTxt} field is required`,
      'email': 'The email must be a valid email address',
      'number': `The ${controlTxt} must be a number`,
      'date': `The ${controlTxt} is not a valid date`,
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${(validatorValue ? validatorValue.requiredLength : '')}`,
      'invalidCreditCard': 'Is invalid credit card number',
      'min': `The ${controlTxt} must be at least ${((validErrors != null || validErrors !== undefined) ? validErrors.requiredValue : '')}.`,
      'max': `The ${controlTxt} may not be greater than ${((validErrors != null || validErrors !== undefined)
        ? validErrors.requiredValue : '')}.`,
      'equalTo': `${controlTxt} is not equal with ${equalWith}`
    };

    let msg = '';

    if (type === 'api') {
      msg = validatorValue;
    } else {
      msg = config[validatorName];
    }

    return msg;
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value != null && control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return {'invalidPassword': true};
    }
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return {'invalidCreditCard': true};
    }
  }
}
