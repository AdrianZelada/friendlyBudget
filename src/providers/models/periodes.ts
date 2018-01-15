import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FatherService} from './father.service';

@Injectable()
export class PeriodesService extends FatherService {        
    constructor(db:AngularFirestore) {
        super('periodes',db);
    }

    getPeriodes(id:string){
        return this.collection.doc(id).collection('periodes').snapshotChanges().map((actions:any)=>{        
            return actions.map(a=>{          
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return {id, ...data};
            });
          });
    }
}