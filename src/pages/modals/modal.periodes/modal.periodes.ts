import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController} from 'ionic-angular';
import { FormBuilder,FormControl,FormGroup} from '@angular/forms';
@Component({
    selector:'modal-periodes',
    templateUrl:'modal.periodes.html'
})
export class ModalPeriodes
 {
    formModalCrudExpenses:FormGroup;
    period:any={};
    constructor(params: NavParams,private fb:FormBuilder,private viewController:ViewController) {
        this.period = params.get('data')||{};
        console.log(this.period);
        this.formModalCrudExpenses = this.fb.group({
            description: new FormControl(''),
            amountInitial: new FormControl(''),   
            status: new FormControl(false)
        });
        if(this.period.description){
            this.formModalCrudExpenses.setValue({
                description:this.period.description,
                amountInitial:this.period.amountInitial,
                status:this.period.status                
            });
        }        
    }

    save(){
        this.viewController.dismiss(this.formModalCrudExpenses.getRawValue());
    }

    closed(){
        this.viewController.dismiss({});
    }

}