import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userId:string;
  CheckUser:boolean;
  username:string;

  constructor( private Auth: AngularFireAuth, private db: AngularFireDatabase, private router: Router ) 
  {
      // Check Current User
      this.Auth.auth.onAuthStateChanged( (user) => 
      {
          if(user)
          {
            this.userId = user.uid;
            console.log("Current user is: " , user.email  , " Exist");
            this.CheckUser = true;
          } 
          else
          {
            console.log("Not exsist")
            this.CheckUser = false;
          }
      });
   }

  ngOnInit() { }

   // LogOut 
   // Check Current User

   logoutUser(): Promise<void>
   {
      if(this.userId)
      {
          this.db.database.ref(`/userProfile/${this.userId}`).off();
          return this.Auth.auth.signOut()
          .then( data => 
          {
            console.log('got some data', this.Auth.auth.currentUser);
            this.router.navigateByUrl('/');
          })
          .catch( error => {
            console.log('got an error', error);
          })
      }
   } // End of logout

}
