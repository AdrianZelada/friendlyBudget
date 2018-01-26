import { Subject} from 'rxjs/Subject';
declare let window:any;
export class UsersService{        
    static user : any = {};
    static $user : Subject<any> = new Subject(); 
    
    static getUser(){
        UsersService.user = JSON.parse(localStorage.getItem('userExpenses'));
        return UsersService.user;
    }

    static setUser(data:any){
        UsersService.user = data.additionalUserInfo.profile;
        UsersService.user.uid = data.user.uid;
        localStorage.setItem('userExpenses',JSON.stringify(UsersService.user));
        UsersService.$user.next(UsersService.user);
    }

    static logout(){
        UsersService.user={};
        localStorage.removeItem('userExpenses');
        UsersService.$user.next(UsersService.user);
    }

}