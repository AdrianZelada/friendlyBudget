const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

exports.createExpensesItem = functions
    .firestore.document('groupExpenses/{groupId}')
    .onCreate(event=>{
        let date = new Date();  
        let data = event.data.data();       
        if(data.createdFor){
            let documentRef = firestore.doc('users/'+ data.uid+'/myExpenses/'+data.id);
            documentRef.create(data);
        }   
        return event.data.ref.set({
            createDate:date
        },{ merge : true });
}); 

exports.createPeriod = functions
    .firestore.document('periodes/{groupId}/periodes/{periodesId}')
    .onCreate(event=>{
        let date = new Date();
        return event.data.ref.set({
            createDate:date
        },{ merge : true });
});  

exports.updatePeriod = functions
    .firestore.document('periodes/{groupId}/periodes/{periodesId}')
    .onUpdate(event=>{
        let data = event.data.data();
        let date = new Date();
        if(data.status){
            return event.data.ref.set({
                endDate:date
            },{ merge : true });
        }
        return event;
});  

exports.createActivities = functions
    .firestore.document('monetaryActivities/{periodesId}/activities/{activityId}')
    .onCreate(event=>{
        let date = new Date();
        return event.data.ref.set({
            createDate:date
        },{ merge : true });
});

exports.authUser = functions
    .auth.user()
    .onCreate((event)=>{
        let user = event.data;
        let documentRef = firestore.doc('users/'+ user.uid);        
        documentRef.create(user);
    });
    
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