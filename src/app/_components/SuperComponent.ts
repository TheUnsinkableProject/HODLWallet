import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {GeneralService} from '../_services';

export class SuperComponent implements AfterViewChecked {
  constructor(private __globalService: GeneralService, private __router: Router,
              private __toastr: ToastrService, private __cdr: ChangeDetectorRef) {
  }

  model: any;
  loading = false;
  id: any = null;
  result: any;
  errors: any[] = [];
  errorMsgs: any[] = [];
  route = '';
  myForm: FormGroup;
  title = 'Add';
  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to Delete?';
  confirmText = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText = 'No <i class="glyphicon glyphicon-remove"></i>';
  confirmClicked = false;
  cancelClicked = false;
  msges = [] ;

  ngAfterViewChecked() {
    this.__cdr.detectChanges();
  }

  isFieldValid(field: string) {
    return !this.myForm.get(field).valid && this.myForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  reset() {
    this.myForm.reset();
  }
}
