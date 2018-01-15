import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController} from 'ionic-angular';
import { FormBuilder,FormControl,FormGroup} from '@angular/forms';
@Component({
    selector:'modal-expenses',
    templateUrl:'modal.expenses.html'
})
export class ModalExpenses {
    formModalExpenses:FormGroup;
    constructor(params: NavParams,private fb:FormBuilder,private viewController:ViewController) {
        this.formModalExpenses=this.fb.group({
            name:new FormControl(''),
        })
    }

    save(){
        this.viewController.dismiss(this.formModalExpenses.getRawValue());
    }

    closed(){
        this.viewController.dismiss({});
    }

}