import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FatherService} from './father.service';
import { UsersService } from './users';

@Injectable()
export class ExpensesService extends FatherService {        
    ref:any;
    constructor(db:AngularFirestore) {        
        super('groupExpenses',db);
        
        this.ref=db.collection('groupExpenses',ref => ref.where('uid', '==', UsersService.user.uid))
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

    
}