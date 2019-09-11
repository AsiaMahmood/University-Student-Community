import { Component, OnInit } from '@angular/core';
import { User } from '../USER';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {} as User;

  constructor(private Auth:AngularFireAuth , private router:Router) 
  {
      // Check Current User
      this.Auth.auth.onAuthStateChanged( (user) => 
      {
        if(user != null)
        {
          this.router.navigateByUrl('/');
        }
      });
   }

  ngOnInit() { }
    
  // Login Function

  loginUser(user:User):Promise<any>
  {
    if(user.email != null && user.password !=null)
    {
      return this.Auth.auth.signInWithEmailAndPassword(user.email,user.password).then( data => 
        {
          // user is logged in
          console.log( user.email , "Logged In");
          this.router.navigateByUrl('/');
        })
        .catch( error => {
          console.log('got an error', error);
        })
    } else {
      console.log('Username or password  INCORRECT');
    }

  }

}
