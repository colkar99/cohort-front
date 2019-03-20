import { Component, OnInit } from '@angular/core';
import { ApiCommunicationService } from '../../api-communication.service'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any
import { sharingData } from '../../sharingdata'
import { ImageCompressService } from  'ng2-image-compress';
import { PusherService } from '../../pusher.service';

@Component({
  selector: 'app-startup-updates',
  templateUrl: './startup-updates.component.html',
  styleUrls: ['./startup-updates.component.css']
})
export class StartupUpdatesComponent implements OnInit {
  startupid:any
  authToken:any
  startupprofile:any = {}
  allfeeds:any
  feed:any = {}
  comment:any = []
  commentobj:any = {}
  showcomments:any = []
  status:string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  constructor( private imgCompressService: ImageCompressService,public apiCom: ApiCommunicationService, public sharedata: sharingData,
    private router: Router,
    private pusherService: PusherService,
    private cookieService: CookieService) {
    this.startupid = this.getCookie('startup_profile_id');
    this.authToken = this.getCookie('Authorization');
    this.startupprofile = this.sharedata.startupprofile
    console.log("feeds",this.startupprofile)
  }

  ngOnInit() {
    this.showfeeds();
    this.pusherService.channel.bind('new-like', data => {
      debugger
      this.feed = data.data ;
    });
  }
  showfeeds(){
    let url= "program/show-news-feeds"
    console.log("this.startupprofile",this.startupprofile)
    let params = JSON.stringify({program:{id:this.startupprofile.startup_registration.program_id}})
    this.apiCom.putDataWithToken(url,params,this.authToken).subscribe((res)=>{
      res;
      this.allfeeds = res;

      console.log("allfeeds",this.allfeeds)
     
    })
  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  createfeed(){
    let url = "program/create-news-feed"
    let params = JSON.stringify({news_feed:{title:null,description:this.feed.description,images:this.feed.images,program_id:this.startupprofile.startup_registration.program_id,startup_profile_id:this.startupprofile.id}})
    this.apiCom.postDataWithToken(url,params,this.authToken).subscribe((res)=>{
      res;
      console.log("createdfeed",res);
      alert("Feeds posted Successfully")
     this.feed = {}
    })
  }
  addfeedimages(){
    document.getElementById("images").click()
  }
 
  handleInputChange(e) {
    ImageCompressService.filesToCompressedImageSource(e.target.files).then(observableImages => {
      observableImages.subscribe((image) => {
        console.log("image",image)
        this.feed.images = image.compressedImage.imageDataUrl;
       // this.submitprofile();
      }, (error) => {
        console.log("Error while converting");
      }, () => {
                 
      });
    });
  }
  editfeed(item){
    $("#editfeeds").modal("show");
    this.feed = Object.assign({},item)

  }
  updatefeed(){
    let url = "program/update-news-feed"
    let params = JSON.stringify({news_feed:{id:this.feed.id,title:this.feed.title,description:this.feed.description,images:this.feed.images,program_id:this.startupprofile.startup_registration.program_id,startup_profile_id:this.startupprofile.id}})
    this.apiCom.putDataWithToken(url,params,this.authToken).subscribe((res)=>{
      res;
      console.log("createdfeed",res);
      alert("Feeds Updated Successfully")
     this.feed = {}
     $("#editfeeds").modal("hide");
    })
  }
  closeupdatefeed(){
    this.feed = {}
    $("#editfeeds").modal("hide");
  }
  deletefeed(feeds){
    let url = "program/delete-news-feed"
    let params = JSON.stringify({news_feed:{id:feeds.id}})
    this.apiCom.putDataWithToken(url,params,this.authToken).subscribe((res)=>{
      res;
      console.log("createdfeed",res);
      alert("Feeds Deleted Successfully")
     this.feed = {}
    })
  }
  createcomment(id,i){
    let url = "program/create-news-feed-comment"
    let params = JSON.stringify({news_feed_comment:{news_feed_id:id,comment:this.comment[i],startup_profile_id:this.startupprofile.id}});
    this.apiCom.postDataWithToken(url,params,this.authToken).subscribe((res)=>{
      res;
      this.comment[i] = undefined
    })
  }
  updatecomments(){
    let url = "program/update-news-feed-comment";
    let params = JSON.stringify({news_feed_comment:{id:this.commentobj.id,comment:this.commentobj.comment,news_feed_id:this.commentobj.news_feed_id,startup_profile_id:this.startupprofile.id}})
    this.apiCom.putDataWithToken(url,params,this.authToken).subscribe((res)=>{
      res;
      $("#editcommentpop").modal("hide")
    })
  }
  opencomments(news_feed_comments){
    this.showcomments = news_feed_comments;
    $("#commentspop").modal("show")
  }
  closecomments(){
    $("#commentspop").modal("hide");
    this.showcomments = [];
  }
  editcomments(com){
    this.commentobj = Object.assign({},com)
    $("#editcommentpop").modal("show")
  }
  closeeditcomment(){
    this.commentobj ={}
    $("#editcommentpop").modal("hide")
  }
  deletecomments(com){
    let url = "program/delete-news-feed-comment"
    let params = JSON.stringify({news_feed_comment:{id:com.id}})
    this.apiCom.putDataWithToken(url,params,this.authToken).subscribe((res)=>{
      res;
      console.log("createdfeed",res);
      alert("Comments Deleted Successfully")
     this.commentobj = {}
    })
  }

}
