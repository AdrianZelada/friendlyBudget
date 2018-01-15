import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FatherService} from './father.service';

@Injectable()
export class UsersService extends FatherService {        
    constructor(db:AngularFirestore) {
        super('users',db);
    }
}