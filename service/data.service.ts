
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs';
import { firestore } from 'firebase';
import { Friend } from '../explore-container/models/friend';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  allPost: Observable<Post[]>;

  allFriends: Observable<Friend[]>;

  // collection object <--> database
  postCollection: AngularFirestoreCollection<Post>;
  friendCollection: AngularFirestoreCollection<Friend>;

  constructor(private fst: AngularFirestore) {
    this.postCollection = fst.collection<Post>('posts');
    this.friendCollection = fst.collection<Friend>('friends');
   }

   private retrievePosts(){
     // this.allPost = this.postCollection.valueChanges();
     this.allPost = this.postCollection.snapshotChanges().pipe(
     map(actions => {
       return actions.map(p => {
         const data: any = p.payload.doc.data();
         const badDate: any = data.timeStamp || data.timestamp;
         data.timeStamp = new firestore.Timestamp(badDate.seconds, badDate.nanoseconds).toDate();
         return{...data};
       });
     })
     );
   }

   private retrieveFriends(){
     this.allFriends = this.friendCollection.valueChanges();
   }

  sendPost(post){
    const item = Object.assign({}, post);
    this.postCollection.add(post);
  }

  saveFriend(friend){
    const item = Object.assign({}, friend);
    this.friendCollection.add(item);
  }

  getAllPosts(){
    this.retrievePosts();
    return this.allPost;
  }

  getAllFriends(){
    this.retrieveFriends();
    return this.allFriends;
  }

}
