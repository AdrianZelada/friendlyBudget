import { Component ,OnInit,OnDestroy} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MonetaryActivitiesService} from '../../providers/models/monetary.activities';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ModalDetails} from '../modals/modal.details/modal.details';

@Component({
  selector: 'page-monetary-activities',
  templateUrl: 'monetary-activities.html'
})
export class MonetaryActivitiesPage implements OnInit,OnDestroy{

  activities:any;
  unsubscribe:Array<any>=[];
  period:any={};  
  constructor(    
    private monetaryActivitiesService:MonetaryActivitiesService,
    private navParams:NavParams,
    private modalController:ModalController
  ) {
    console.log(navParams.get('data'));
    this.period=navParams.get('data');
  }

  ngOnInit(){
    
    this.monetaryActivitiesService.getSubCollection(this.period.id,'activities').subscribe((data:any)=>{
      console.log(data)
      this.activities=data;
    });
  }

  ngOnDestroy(){
    this.unsubscribe.forEach((subs:any)=>{
      subs.unsubscribe();
    })
  }

  openModal(period:any){
    console.log(period)
    let modalExpenses=this.modalController.create(ModalDetails,{
      data:period || {}
    });
    modalExpenses.onDidDismiss((data:any)=>{
      if(period){
        // update

        // this.periodesService.add(data);
        // this.periodesService.updateDoc(this.groupExpenses.id,data);
        let newActivity = Object.assign(period,data); 
        console.log(newActivity);
        this.monetaryActivitiesService.updateDocSubCollection(this.period.id,"activities",newActivity);                               
      }else{
        // create
        // this.periodes.periodes.push(data);
        // this.periodesService.updateDoc(this.groupExpenses.id,this.periodes);        
        this.monetaryActivitiesService.addDocSubCollection(this.period.id,'activities',data);                        
      }             
    });
    modalExpenses.present();
  }
}
