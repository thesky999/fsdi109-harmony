import { SharedService } from './../service/shared.service';
import { DataService } from './../service/data.service';
import { Component } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  allPosts: Post[] = [];

  constructor(private data: DataService, private shared: SharedService) {}

  // function is called everytime user navigates to tab1
  ionViewDidEnter(){
   this.data.getAllPosts().subscribe(list =>{
    console.log('exc subscription', DOMRectList); 

    // filter
    // to everyone, from you, to you
    list = list.filter(p => p.to == "Everyone" || p.from == this.shared.userName);

    this.allPosts = list.sort(function(left, right){
      if(left.timeStamp > right.timeStamp){
        return -1;
      }
      else{
        return 1;
      }
    });
   });
  }

}

