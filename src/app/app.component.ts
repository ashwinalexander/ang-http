import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();

  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.http.post<{ name: string }>('https://ng-angular-http-6d502-default-rtdb.firebaseio.com/posts.json', postData).subscribe(responseData => {
      console.log(responseData);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request

  }


  private fetchPosts() {

    this.http.get<{ [key: string]: Post }>('https://ng-angular-http-6d502-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        console.log(responseData);
        console.log("once");
        const postsArray: Post[] = [];
        for (const key in responseData) {

          if (responseData.hasOwnProperty(key)) {

            postsArray.push({ ...responseData[key], id: key })
          }
        }
        return postsArray;

      }))
      .subscribe(posts => {
        this.loadedPosts = posts;
      })


  }
}
