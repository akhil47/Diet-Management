import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService{
    public loginStatus = new Subject<boolean>()
    public isLoggedIn: boolean = false
    public user : User

    constructor(private router: Router, private angularFireAuth: AngularFireAuth){
        this.angularFireAuth.authState.subscribe(user => {
            if (user){
              this.user = user;
              this.isLoggedIn = true
              this.loginStatus.next(true)
            } else {
              this.isLoggedIn = false
              this.loginStatus.next(false)
            }
          })
    }
    isAutheticated(){
        return this.isLoggedIn;
    }
    signInUser(){
        this.angularFireAuth.signInWithRedirect(new auth.GoogleAuthProvider())
    }
    signOut(){
        this.angularFireAuth.signOut()
        this.loginStatus.next(false)
        this.isLoggedIn = false
        this.router.navigate(['/login'])
        
    }
    // setLogin(flag: boolean){
    //     this.isLoggedIn = flag
    // }

}