import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { ExpensesService } from '../../providers/models/expenses';
import { PeriodesPage } from '../periodes/periodes';
import { ModalExpenses } from '../modals/modal.expenses/modal.expenses';

@Component({
  selector: 'page-group-expenses',
  templateUrl: 'group-expenses.html'
})
export class GroupExpensesPage implements OnInit {

  expenses:Array<any>=[];
  

  constructor( 
    private expensesService:ExpensesService,
    private navCtrl:NavController,
    private modalController:ModalController
  ) {
  
  }

  ngOnInit(){
    this.expensesService.get().subscribe((data)=>{
      console.log(data)
      this.expenses=data;
    });
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
