import { Component ,OnInit,OnDestroy} from '@angular/core';
import { NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { MonetaryActivitiesService} from '../../providers/models/monetary.activities';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ModalDetails} from '../modals/modal.details/modal.details';
import { ModalPeriodes} from '../modals/modal.periodes/modal.periodes';
import { PeriodesService } from '../../providers/models/periodes';
import { ExpensesService } from '../../providers/models/expenses';

@Component({
  selector: 'page-monetary-activities',
  templateUrl: 'monetary-activities.html'
})
export class MonetaryActivitiesPage implements OnInit,OnDestroy{

  activities:any;
  unsubscribe:Array<any>=[];
  period:any={};  
  groupId:any;
  entry:number=0;
  egress:number=0;

  constructor(  
    private expensesService:ExpensesService,
    private periodesService:PeriodesService,  
    private monetaryActivitiesService:MonetaryActivitiesService,
    private navParams:NavParams,
    private actionSheetCtrl:ActionSheetController,
    private modalController:ModalController
  ) {
    console.log(navParams.get('data'));
    this.period=navParams.get('data');
    this.groupId=navParams.get('groupId');
    
  }

  ngOnInit(){
    
    this.monetaryActivitiesService.getSubCollection(this.period.id,'activities').subscribe((data:any)=>{
      console.log(data)
      this.entry=0;
      this.egress=0;
      this.activities=data.reverse();
      this.activities.forEach((activity:any)=>{
        if(activity.statusActivity){
          this.entry = this.entry + parseInt(activity.amount);
        }else{
          this.egress = this.egress + parseInt(activity.amount);
        }            
      });
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

  openOptions(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Editar',          
          handler: () => {
            console.log('Editar clicked');
            let modalPeriod=this.modalController.create(ModalPeriodes,{
              data:this.period
            });
            modalPeriod.onDidDismiss((data:any)=>{
              console.log(data);
              if(data.amountInitial){
                let newPeriod = Object.assign(this.period,data); 
                this.periodesService.updateDocSubCollection(this.groupId,'periodes',newPeriod);                                
              }              
            });
            modalPeriod.present();
          }
        },        
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
}
