const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});
const APP_NAME = 'Presupuestos';


admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

exports.createExpensesItem = functions
    .firestore.document('groupExpenses/{groupId}')
    .onCreate(event=>{
        let date = new Date();  
        let data = event.data.data();       
        if(data.uid){
            let documentRef = firestore.doc('users/'+ data.uid+'/myExpenses/'+event.params.groupId);
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
        console.log(user.uid);
        let documentRef = firestore.doc('users/'+ user.uid);        
        documentRef.create({
            email:user.email,
            displayName:user.displayName,
        })
        
        return true;        
    });


function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email
    };
    
    // The user subscribed to the newsletter.
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
    return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New welcome email sent to:', email);
    });
}

function sendEmailInviteExist(email, user, userMain, expensesName) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email
    };
    
    // The user subscribed to the newsletter.
    mailOptions.subject = `${APP_NAME}!`;
    mailOptions.text = `Hey ${user || ''}! El usuario ${userMain}. Te compartio el presupuesto de ${expensesName}`;
    return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New welcome email sent to:', email);
    });
}

function sendEmailInviteNotExist(email, userMain, expensesName) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email
    };
    
    // The user subscribed to the newsletter.
    mailOptions.subject = `${APP_NAME}!`;
    mailOptions.text = `Hey !!! El usuario ${userMain}. Te compartio el presupuesto de ${expensesName} ... Descargate la App`;
    return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New welcome email sent to:', email);
    });
}

function searchEmail(email){
    return firestore.collection('users').where('email','==',email).get();
}


app.get('/hello', (req, res) => {
  res.send(`Hello ${req.query.name}`);
});


app.get('/invite', (req, res) => {
    // sendWelcomeEmail(req.query.email,'muchacho')
    searchEmail(req.query.email).then((results)=>{

        if(results.length){
            let obj=results[0];            
            let user = {
                uid:obj.id,
                displayName:obj.data().displayName,
                email:obj.data().email
            }
            console.log(user);
            firestore.doc(`groupExpenses/${req.query.groupId}`).get().then((data)=>{
                console.log(data);
                console.log(data.data());  
                let dataUser=data.data();          
                sendEmailInviteExist(user.email,user.displayName,req.query.user,dataUser.name);                
                let documentRef = firestore.doc('users/'+ user.uid+'/invitees/'+req.query.groupId);
                    documentRef.create(dataUser);
            });            
        }else{                     
            firestore.doc(`groupExpenses/${req.query.groupId}`).get().then((data)=>{
                sendEmailInviteNotExist(req.query.email,req.query.user,data.name);   
                let collectionRef = firestore.doc(`notifications/${req.query.email}`).collection('invitees');
                    collectionRef.add(data);
            });         
        }
    });
    res.json({
        status:true
    });   
});

exports.app = functions.https.onRequest(app);
