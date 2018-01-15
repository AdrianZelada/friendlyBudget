import { Component ,OnInit,OnDestroy} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PeriodesService} from '../../providers/models/periodes';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ModalPeriodes} from '../modals/modal.periodes/modal.periodes';
import { MonetaryActivitiesPage} from '../monetary-activities/monetary-activities';


@Component({
  selector: 'page-periodes',
  templateUrl: 'periodes.html'
})
export class PeriodesPage implements OnInit,OnDestroy{

  periodes:any;
  unsubscribe:Array<any>=[];
  groupExpenses:any={};  
  constructor(
    private periodesService:PeriodesService,
    private navParams:NavParams,
    private navCtrl: NavController,
    private modalController:ModalController
  ) {
    console.log(navParams.get('data'));
    this.groupExpenses=navParams.get('data');
  }

  ngOnInit(){
    this.unsubscribe.push(this.periodesService.getDoc(this.groupExpenses.id).subscribe((data:any)=>{
      // console.log(data)
      // this.periodes=data;
    }));


    this.periodesService.getPeriodes(this.groupExpenses.id).subscribe((data:any)=>{
      console.log(data)
      this.periodes=data;
    });
  }

  ngOnDestroy(){
    this.unsubscribe.forEach((subs:any)=>{
      subs.unsubscribe();
    })
  }

  openModal(period:any){
    console.log(period)
    let modalExpenses=this.modalController.create(ModalPeriodes,{
      data:period || {}
    });
    modalExpenses.onDidDismiss((data:any)=>{
      if(period){      
        let newPeriod = Object.assign(period,data); 
        console.log(newPeriod);
        this.periodesService.updateDocSubCollection(this.groupExpenses.id,"periodes",newPeriod);                                
      }else{
        // create
        // this.periodes.periodes.push(data);
        // this.periodesService.updateDoc(this.groupExpenses.id,this.periodes);        
        this.periodesService.addDocSubCollection(this.groupExpenses.id,"periodes",data);                        
      }             
    });
    modalExpenses.present();
  }

  goToActivities(period){
    this.navCtrl.push(MonetaryActivitiesPage,{
      data:period
    });
  }
}
