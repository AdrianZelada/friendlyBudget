import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FatherService} from './father.service';

@Injectable()
export class MonetaryActivitiesService extends FatherService {        
    constructor(db:AngularFirestore) {
        super('monetaryActivities',db);
    }
}