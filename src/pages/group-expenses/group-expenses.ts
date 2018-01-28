import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { ExpensesService } from '../../providers/models/expenses';
import { PeriodesPage } from '../periodes/periodes';
import { ModalExpenses } from '../modals/modal.expenses/modal.expenses';
import { UserServiceDB} from '../../providers/models/user.service';

@Component({
  selector: 'page-group-expenses',
  templateUrl: 'group-expenses.html'
})
export class GroupExpensesPage implements OnInit {

  expenses:Array<any>=[];
  

  constructor( 
    private expensesService:ExpensesService,
    private navCtrl:NavController,
    private userServiceDB:UserServiceDB,
    private modalController:ModalController
  ) {
  
  }

  ngOnInit(){
    this.expensesService.getGroup().subscribe((data)=>{
      console.log(data)
      this.expenses=data;
    });

    // this.userServiceDB.getExpensesUser().subscribe((data)=>{
    //   this.expenses=data;      
    //   console.log(data);
    // },(e)=>{
    //   console.log(e);
    // })
  }

  selectExpenses(expense:any){
    this.navCtrl.push(PeriodesPage,{
      data:expense
    })
  }

  openModal(){
    let modalExpenses=this.modalController.create(ModalExpenses,{});

    modalExpenses.onDidDismiss((data:any)=>{
      if(data.name){
        this.expensesService.add(data);
      }
    });
    modalExpenses.present();
  }
}
