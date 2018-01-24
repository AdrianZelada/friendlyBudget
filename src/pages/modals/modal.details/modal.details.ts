import { Component,OnInit } from '@angular/core';
import { ModalController, NavParams, ViewController} from 'ionic-angular';
import { FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { decimalNumberValidator} from '../../fullcalendar/validate.custom'
@Component({
    selector:'modal-details',
    templateUrl:'modal.details.html'
})
export class ModalDetails implements OnInit{
    formModalDetails:FormGroup;
    details:any={};
    status:Array<any>=[
        {
            label:'Ingreso',
            value:true,
        },
        {
            label:'Egreso',
            value:false,
        }
    ]
    constructor(params: NavParams,private fb:FormBuilder,private viewController:ViewController) {
        this.details = params.get('data')||{};        
        this.formModalDetails = this.fb.group({
            description: new FormControl('',Validators.required),
            amount: new FormControl('',[Validators.required,decimalNumberValidator(/^\d+(\.\d{1,2})?$/)]),
            priceItem: new FormControl('',[decimalNumberValidator(/^\d+(\.\d{1,2})?$/)]),
            // excess : new FormControl(''),
            // createDate : new FormControl(''),
            statusActivity:new FormControl(false)
        });

        if(this.details.description){
            this.formModalDetails.setValue({
                description: this.details.description,
                amount: this.details.amount,
                priceItem: this.details.priceItem || 0,
                // excess : this.details.excess,
                statusActivity:this.details.statusActivity || false,
                // createDate : ''
            });
        }
        
    }

    ngOnInit(){
        this.formModalDetails.controls.amount.valueChanges.subscribe((data)=>{
            this.formModalDetails.controls.priceItem.setValue(data);
        });
    }

    save(){
        let data:any=this.formModalDetails.getRawValue();
        data.priceItem = data.priceItem == 0 ? data.amount : data.priceItem;
        this.viewController.dismiss(this.formModalDetails.getRawValue());
    }

    closed(){
        this.viewController.dismiss({});
    }

}