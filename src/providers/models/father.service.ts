// import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { UsersService } from './users';


// @Injectable()
export class FatherService {
    
    collection:AngularFirestoreCollection<any>;    
    model:string='';
    constructor(
        private schema:string,
        private db:AngularFirestore        
    ) {        
        this.model=schema;
        this.collection = db.collection(this.model);
    }

    get(){
        return this.collection.snapshotChanges().map((actions:any)=>{        
            return actions.map(a=>{          
              let data = a.payload.doc.data();
              const id = a.payload.doc.id;              
              return {id, ...data};
            });
          });
    }

    getSubCollection(id:string,collectionId:string){
        return this.collection.doc(id).collection(collectionId).snapshotChanges().map((actions:any)=>{        
            return actions.map(a=>{          
              let data = a.payload.doc.data();
              const id = a.payload.doc.id;                       
              return {id, ...data};
            });
          });
    }

    getDoc(id:string){        
        return this.db.doc(`${this.model}/${id}`).valueChanges();
    }

    updateDoc(id:string,data:any){
        let model = this.db.doc(`${this.model}/${id}`);
        return fromPromise(model.update(data));
    }

    add(data:any){        
        this.getDataUser(data);
        this.collection.add(data);
    }

    addDocSubCollection(id:string,collectionId:string,data:any){
        this.getDataUser(data);
        let model = this.collection.doc(id).collection(collectionId);
        return fromPromise(model.add(data));        
    }

    updateDocSubCollection(id:string,collectionId:string,data:any){
        let model = this.collection.doc(id).collection(collectionId).doc(data.id);
        return fromPromise(model.update(data));        
    }

    getDataUser(data){
        let user:any=UsersService.getUser();        
        data.uid = user.uid;
        data.nameUser = user.name        
    }
}