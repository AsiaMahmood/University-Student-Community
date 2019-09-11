import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Topic } from '../TOPIC';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent implements OnInit {

  topic = {} as Topic;
  topicList:AngularFireList<any>;
  userId:string;

  constructor(public db: AngularFireDatabase , public router: Router , private Auth: AngularFireAuth) 
  {
      this.topicList = db.list('topics');
      // Check Current User
      this.Auth.auth.onAuthStateChanged( (user) => 
      {
          if(user)
          {
            this.userId = user.uid;
            console.log("Current user is: " , user.email  , " Exist");
          } 
          else
          {
            console.log("Not exsist")
          }
      });
   }

  ngOnInit() { }

  insertTopic(topic:Topic){
    this.topicList.push({
      userid: this.userId,
      title:topic.title,
      description:topic.description,
      imageUrl:topic.imageUrl    
    }),
    this.router.navigate(['/home']),
    console.log("Done");
  }

}
