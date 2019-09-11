import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// firebase angularfire
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule  } from 'angularfire2/auth';
import { AngularFireDatabaseModule   } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { MyTopicsComponent } from './my-topics/my-topics.component';
import { AllTopicsComponent } from './all-topics/all-topics.component';

const routes: Routes =  [
  { path:'' , redirectTo:'home' , pathMatch:'full'},
  { path:'' , component:HomeComponent},
  { path:'home' , component:HomeComponent},
  { path:'login' , component:LoginComponent},
  { path:'register' , component:RegisterComponent},
  { path:'addTopic' , component:AddTopicComponent },
  { path:'myTopics' , component:MyTopicsComponent },
  { path:'allTopics' , component:AllTopicsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    AddTopicComponent,
    MyTopicsComponent,
    AllTopicsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
