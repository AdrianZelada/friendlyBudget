import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FatherService} from './father.service';

@Injectable()
export class ExpensesService extends FatherService {        
    constructor(db:AngularFirestore) {
        super('groupExpenses',db);
    }
}