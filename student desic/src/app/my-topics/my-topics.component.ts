import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Topic } from './../TOPIC';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-my-topics',
  templateUrl: './my-topics.component.html',
  styleUrls: ['./my-topics.component.css']
})
export class MyTopicsComponent implements OnInit {

  topicArray = [];
  userArray= [];
  data = {
    $key:'',
    title:'',
    description:'',
    imageUrl:'',
    userid:''
    }
  topicList:AngularFireList<any>;
  profileImage:string;
  userid:string;

  constructor(public db: AngularFireDatabase, private Auth:AngularFireAuth) 
  {
    // Check Current User
    this.Auth.auth.onAuthStateChanged( (user) => 
    {
      if(user != null)
      {
          this.userid = user.uid;
      }
    });

    // Get My topics
    this.topicList = db.list('topics');
    this.topicList.snapshotChanges().subscribe(actions =>{
      actions.forEach(action => {
        let data = action.payload.toJSON();
        data['$key'] = action.key;
        if(data['userid'] == this.userid)
        {
          this.topicArray.push(data as Topic);
        }
          // Get User Image Profile
          this.db.list('User').snapshotChanges().subscribe(actions =>{
            actions.forEach(action => {
              let user = action.payload.toJSON();
              user['$key'] = action.key;
              if( user['$key'] == this.userid)
              {
                this.profileImage = user['urlImage'];
              }
            })
          });
        })
      });

  }

  ngOnInit() {
  }

  //Edit form
  editForm( $key)
  {
    for (let value of  this.topicArray) {
      if (value['$key'] == $key) {
        this.data.$key = value['$key'];
        this.data.title = value['title'] ;
        this.data.description = value['description'] ;
        this.data.imageUrl = value['imageUrl'] ;
        this.data.userid = value['userid'];
      }   
    }
  }
  // End Edit Form 

  // Edit topic
  onEdit( $key ){

    this.data.title 
    this.data.description  
    this.data.imageUrl  
    this.data.userid

    this.db.database.ref(`/topics/${$key}`).set({
      title : this.data.title ,
      description :  this.data.description ,
      imageUrl : this.data.imageUrl,
      userid: this.data.userid
    });      
    
    this.topicArray = []
  }    

    // Delete Topic
    onDelete($key)
    {
      console.log('The key : ' , $key);
      this.db.database.ref(`/topics/${$key}`).remove();
    }
    // End Delete Topic
}
