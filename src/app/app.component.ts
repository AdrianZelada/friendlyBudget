import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { GroupExpensesPage } from '../pages/group-expenses/group-expenses';
import { ListCalendarPage } from '../pages/list-calendar/list-calendar';
import { UsersService} from '../providers/models/users';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = ListCalendarPage;  
  // rootPage:any = GroupExpensesPage;
  rootPage:any = LoginPage;
  user:any={};

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      UsersService.$user.subscribe((data)=>{
        this.user=data;
      });
    });

    
  }
}

