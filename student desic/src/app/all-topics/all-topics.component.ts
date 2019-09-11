import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Topic } from './../TOPIC';

@Component({
  selector: 'app-all-topics',
  templateUrl: './all-topics.component.html',
  styleUrls: ['./all-topics.component.css']
})
export class AllTopicsComponent implements OnInit {

  topicArray = [];
  userArray= [];
  topicList:AngularFireList<any>;

  constructor(public db: AngularFireDatabase) 
  { 
    // Get All topics
    this.topicList = db.list('topics');
    this.topicList.snapshotChanges().subscribe(actions =>{
      actions.forEach(action => {
        let data = action.payload.toJSON();
        data['$key'] = action.key;

        console.log('Hello its me:' , data['userid'] );
          // Get User Image Profile
          this.db.list('User').snapshotChanges().subscribe(actions =>{
            actions.forEach(action => {
              let user = action.payload.toJSON();
              user['$key'] = action.key;
              if( user['$key'] == data['userid'])
              {
                data['profileImage'] =user['urlImage']; 
              }
            })
          }); 

          this.topicArray.push(data as Topic);
        
        })
      });
  }
  
  ngOnInit() {
  }

}
