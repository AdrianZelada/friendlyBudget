import { Component ,OnInit,OnDestroy} from '@angular/core';
import { NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { PeriodesService} from '../../providers/models/periodes';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ModalPeriodes} from '../modals/modal.periodes/modal.periodes';
import { MonetaryActivitiesPage} from '../monetary-activities/monetary-activities';
import { ModalExpenses } from '../modals/modal.expenses/modal.expenses';
import { ExpensesService } from '../../providers/models/expenses';


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
    private expensesService:ExpensesService,
    private navCtrl: NavController,
    private actionSheetCtrl:ActionSheetController,
    private modalController:ModalController
  ) {
    console.log(navParams.get('data'));
    this.groupExpenses=navParams.get('data');
  }

  ngOnInit(){
    this.periodesService.getSubCollection(this.groupExpenses.id,'periodes').subscribe((data:any)=>{
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
      // debugger;
      if(data.amountInitial){      
        let newPeriod = Object.assign({},data); 
        console.log(newPeriod);
        this.periodesService.addDocSubCollection(this.groupExpenses.id,"periodes",newPeriod);                                
      }             
    });
    modalExpenses.present();
  }

  goToActivities(period){
    this.navCtrl.push(MonetaryActivitiesPage,{
      data:period,
      groupId:this.groupExpenses.id
    });
  }


  openOptions(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Editar',          
          handler: () => {
            console.log('Editar clicked');
            let modalPeriod=this.modalController.create(ModalExpenses,{
              data:this.groupExpenses
            });
            modalPeriod.onDidDismiss((data:any)=>{
              console.log(data);
              if(data.name){
                let newPeriod = Object.assign(this.groupExpenses,data); 
                this.expensesService.updateDoc(this.groupExpenses.id,newPeriod);                                
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
