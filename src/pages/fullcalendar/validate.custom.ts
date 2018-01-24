import { NG_VALIDATORS, Validator, AbstractControl,ValidatorFn} from '@angular/forms';

export function decimalNumberValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const forbidden = !nameRe.test(control.value);
      return forbidden ? {'decimalNumber': {value: control.value}} : null;
    };
  }