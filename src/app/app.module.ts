import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Facebook } from '@ionic-native/facebook'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { GroupExpensesPage} from '../pages/group-expenses/group-expenses';
import { PeriodesPage} from '../pages/periodes/periodes';
import { MonetaryActivitiesPage} from '../pages/monetary-activities/monetary-activities';

import { ExpensesService} from '../providers/models/expenses';
import { ExpensesUsersService} from '../providers/models/expenses.users';
import { PeriodesService} from '../providers/models/periodes';
import { UsersService} from '../providers/models/users';
import { MonetaryActivitiesService } from '../providers/models/monetary.activities';


import { ModalDetails} from '../pages/modals/modal.details/modal.details';
import { ModalExpenses} from '../pages/modals/modal.expenses/modal.expenses';
import { ModalPeriodes} from '../pages/modals/modal.periodes/modal.periodes';
import { PopoverOptionsDetails} from '../pages/modals/popover.options/popover.options';

import { NgFullCalendarComponent} from '../pages/fullcalendar/fullcalendar.component';
import { ListCalendarPage} from '../pages/list-calendar/list-calendar';

//Angular Firebase Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoadingProvider } from '../providers/loading/loading';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import * as FConfig from './env';

// env ..... configuration firebase

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    GroupExpensesPage,
    PeriodesPage,
    MonetaryActivitiesPage,

    ModalDetails,
    ModalExpenses,
    ModalPeriodes,
    PopoverOptionsDetails,
    NgFullCalendarComponent,
    ListCalendarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'',
      iconMode:'md',
      pageTransition: 'ios-transition'
    }),
    AngularFireModule.initializeApp(FConfig.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    GroupExpensesPage,
    MonetaryActivitiesPage,
    PeriodesPage,
    ModalDetails,
    ModalExpenses,
    ModalPeriodes,
    PopoverOptionsDetails,
    NgFullCalendarComponent,
    ListCalendarPage
  ],
  providers: [
    StatusBar,
    Camera,
    File,
    FilePath,
    FileTransfer,
    Facebook,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoadingProvider,

    ExpensesService,
    ExpensesUsersService,
    UsersService,
    PeriodesService,
    MonetaryActivitiesService
    // FatherService
  ]
})
export class AppModule {}
