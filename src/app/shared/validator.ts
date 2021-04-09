import { AbstractControl, ValidationErrors } from '@angular/forms';

export class NoSpaceValidator {
  static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
    if(control.value)
    {
      if((control.value as string).indexOf(' ') >= 0)

      {
        return {cannotContainSpace: true}
      }

    }
    return null;
  }
}


// export class passwordSpaceValidator {
//   static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
//     let value = control.value;
//     if (value && value.length && value[0] == ' ') {
//       return {cannotContainSpace: true}
//     }
//     return null;
//   }
// }
