import { Component, OnInit  } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../USER';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user =  {} as User;
  
  constructor( private Auth:AngularFireAuth, private db:AngularFireDatabase, private router:Router )
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
  
  ngOnInit() {
  }

// SignUp to the app
signUpUser(user:User):Promise<any>
{
    if(user.email != null && user.password !=null)
    {
      return this.Auth.auth.createUserWithEmailAndPassword(user.email , user.password).
      then(newUser => 
        {
          console.log(user.email);
          this.db.database.ref(`/User/${newUser.user.uid}/username`).set(user.username);
          this.db.database.ref(`/User/${newUser.user.uid}/email`).set(user.email);
          this.db.database.ref(`/User/${newUser.user.uid}/password`).set(user.password);
          this.db.database.ref(`/User/${newUser.user.uid}/universityName`).set(user.universityName);
          this.db.database.ref(`/User/${newUser.user.uid}/collegeName`).set(user.collegeName);
          this.db.database.ref(`/User/${newUser.user.uid}/urlImage`).set(user.urlImage);
        }).then( data => 
        {
          console.log('got some data');
          this.router.navigateByUrl('/');
        })
        .catch( error => {
          console.log('got an error', error);
        });
      } else {
        // this.alert('ادخل الايميل او الرمز السري');
      }
}
 
}
