import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController} from 'ionic-angular';
import { FormBuilder,FormControl,FormGroup} from '@angular/forms';
@Component({
    selector:'modal-details',
    templateUrl:'modal.details.html'
})
export class ModalDetails {
    formModalDetails:FormGroup;
    details:any={};
    constructor(params: NavParams,private fb:FormBuilder,private viewController:ViewController) {
        this.details = params.get('data')||{};        
        this.formModalDetails = this.fb.group({
            description: new FormControl(''),
            amount: new FormControl(''),
            priceItem: new FormControl(''),
            excess : new FormControl(''),
            createDate : new FormControl('')
        });

        if(this.details.description){
            this.formModalDetails.setValue({
                description: this.details.description,
                amount: this.details.amount,
                priceItem: this.details.priceItem,
                excess : this.details.excess,
                createDate : ''
            });
        }
        
    }

    save(){
        this.viewController.dismiss(this.formModalDetails.getRawValue());
    }

    closed(){
        this.viewController.dismiss({});
    }

}