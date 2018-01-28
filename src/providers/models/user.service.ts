import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FatherService} from './father.service';
import { UsersService } from './users';
import { ExpensesService} from './expenses';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap'


@Injectable()
export class UserServiceDB extends FatherService {        
    ref:any;
    constructor(db:AngularFirestore, private expensesService:ExpensesService) {        
        super('users',db);
        
        // this.ref=db.collection('users');
    }

    getGroup(){
        return this.ref.snapshotChanges().map((actions:any)=>{        
            return actions.map(a=>{          
              let data = a.payload.doc.data();
              const id = a.payload.doc.id;
              if(data.uid){
                data.permission = data.uid == UsersService.getUser().uid; 
              } 
              return {id, ...data};
            });
          });
    }

    getExpensesUser(){
      return this.getSubCollection(UsersService.user.uid,'myExpenses');        
    }

    getExpensesSharing(){
        return this.getSubCollection(UsersService.user.uid,'sharedExpenses');         
      }

    forkJoinData(data:any){
        let join:any=[];
        if(data.length>0){
            console.log(data);            
            data.forEach((val:any)=>{
                join.unshift(this.expensesService.getDoc(val.id));
            });
            console.log(join);            
            return Observable
                .forkJoin(join)
                .flatMap((data)=>{
                    return data
                })                
        }else{
            return Observable.create('');
        }
        
    }


}