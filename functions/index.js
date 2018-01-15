const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

exports.createExpensesItem = functions
    .firestore.document('groupExpenses/{groupId}')
    .onCreate(event=>{
        let date = new Date();
        console.log(event);
        console.log(event.data);
        console.log(event.data.data());
        console.log(event.params.groupId);
        let documentRef = firestore.doc('periodes/'+event.params.groupId);
        // let subcollection = documentRef.collection(event.params.groupId);
        // let periodes = firestore.collection('periodes').doc();
        // periodes.
        // documentRef
        documentRef.create({
            id:event.params.groupId,
            periodes:[]
        })        
        return event.data.ref.set({
                createDate:date
            },{ merge : true });
    }); 

// exports.createPeriod = functions
    // .firestore.document('periodes/{periodId}')
    // .onCreate(event=>{
    //     let date = new Date();
    //     return event.data.ref.set({
    //             createDate:date
    //         },{ merge : true });
    // });    

// exports.updatePeriod = functions
//     .firestore.document('periodes/{periodId}')
//     .onUpdate(event=>{
//         let date = new Date();
//         let data = event.data.data();
//         let previous = event.data.previous.data();
//         if(previous.items){
//             if(data.items.length != previous.items.length ){
//                 data.items.forEach((obj)=>{
//                     if(!obj.createDate){
//                         obj.createDate= new Date();
//                     }
//                 });
//             }
//         }else{
//             if(data.items.length){
//                 data.items.forEach((obj)=>{
//                     if(!obj.createDate){
//                         obj.createDate= new Date();
//                     }
//                 });
//             }
//         }
        
//         return event.data.ref.set(data,{ merge : true });
//     });