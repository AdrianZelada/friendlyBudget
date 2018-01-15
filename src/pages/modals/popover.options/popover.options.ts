import { Component } from '@angular/core';
import { ModalController ,NavController, NavParams, ViewController} from 'ionic-angular';
import { FormBuilder,FormControl,FormGroup} from '@angular/forms';
import { ModalPeriodes} from '../../modals/modal.periodes/modal.periodes';

@Component({
    // selector:'popover-options',
    // templateUrl:'popover.options.html'
    template:`<ion-list>
                <ion-item *ngFor="let page of navs" (tap)="navigatedTo(page)">
                    {{page.title}}
                </ion-item>
            </ion-list>`
})
export class PopoverOptionsDetails {
    
    navs:Array<any>=[
        {
            component:ModalPeriodes,
            title:'Editar Periodo'            
        },
        {
            component:ModalPeriodes,
            title:'Crear Periodo'            
        },
    ]
    constructor(
        private navController: NavController,
        private fb:FormBuilder,
        public viewCtrl: ViewController,
        private modalController:ModalController
    ) {
        
    }

    navigatedTo(page:any){             
        let modalExpenses=this.modalController.create(page.component,{
            data:{}
          });
      
        modalExpenses.onDidDismiss((data:any)=>{
            console.log(data);    
            this.viewCtrl.dismiss(data);          
        });
        modalExpenses.present();
    }

    closed(){
        
    }

}