import { Component, OnInit,OnDestroy } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
// import { HttpErrorResponse } from '@angular/common/http';
import { SharedDataService } from '../../shared-data.service'
declare var $:any
import { ImageCompressService } from  'ng2-image-compress';
// import { PusherService } from '../../pusher.service';
import { Subscription } from 'rxjs';
import { ActionCableService, Channel } from 'angular2-actioncable';

@Component({
  selector: 'app-startupby-programs',
  templateUrl: './startupby-programs.component.html',
  styleUrls: ['./startupby-programs.component.css']
})
export class StartupbyProgramsComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  message: any
  authToken: string;
  loggedIn: boolean;
  livePrograms: any;
  expPrograms: any
  public user_details: any[];
  allPrograms: any[];
  allStartups: any[];
  startup: any;
  appRespQues: any;
  showStartup: boolean = false;
  location_program_id: any;
  formrequestarray: Array<any> = []
  programselected
  filterfeild
  filtervalue
  unfilteredvalue: any = []
  courses: any
  selectedcourses: any = []
  startupsidall: any = []
  selected_startups:any = []
  allfeeds:any = []
  feed:any = {}
  commentobj:any = {}
  showcomments:any = []
  comment:any = []
  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private cableService: ActionCableService
    // private pusherService: PusherService
  ) { }

  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    if (this.authToken.length != 0) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }
    this.location_program_id = this.getCookie('program_id')
    console.log("location_program_id", this.location_program_id)
    if (this.authToken.length != 0) {
      debugger
      if (this.location_program_id.length != 0) {
        this.showStartups(this.location_program_id);
      }
    }

    this.getAllProgram();
    // this.pusherService.channel.bind('news-feed-data', data => {
    //   debugger
    //   // this.allfeeds = data.news_feeds ;
    //   this.showfeeds();
    // });
    // this.sharedDataService.currentMessage.subscribe(message => {
    //   this.message = message;
    // })
    // this.newMessage();
    const channel: Channel = this.cableService
    .cable('ws://ec2-54-172-0-213.compute-1.amazonaws.com/cable')
    // .cable('ws://localhost:3000/cable')
    .channel('NewsFeedsChannel');
    this.subscription = channel.received().subscribe(message => {
      debugger
      this.showfeeds();
    });
  }
  ngOnDestroy() {
    // Unsubscribing from the messages Observable automatically
    // unsubscribes from the ActionCable channel as well
    this.subscription.unsubscribe();
  }
  // newMessage() {
  //   this.sharedDataService.changeMessage('Hello World');
  // }
  getAllProgram() {
    this.apiCom.getDataWithoutAuth('get-list-of-programs')
      .subscribe(data => {
        //   this.allPrograms = data;
        this.livePrograms = data.all_programs.live;
        this.expPrograms = data.all_programs.exp;
        console.log(data);
        console.log(data.all_programs.live);
        console.log(data.all_programs.exp);
        this.setStatusForPrograms(data);
      }, error => {
        console.log(`The following error has been occured: ${error}`)

      })
  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  setStatusForPrograms(programs) {
    this.allPrograms = [];
    for (let data of programs.all_programs.live) {
      console.log(data);
      data["status"] = "Running"
      this.allPrograms.push(data)
    }
    for (let data of programs.all_programs.exp) {
      console.log(data);
      data["status"] = "Expired"
      this.allPrograms.push(data)
    }
    console.log(this.allPrograms);
    let pr_id = this.getCookie('program_id')
    this.programselected = pr_id
    if (pr_id != (null && undefined && 0)) {
      this.showStartups(pr_id);
    }

  }

  showStartups(id: any) {
    debugger
    this.location_program_id = id
    this.showStartup = false;
    this.allStartups = []
    let data = { "program_id": id };
    this.cookieService.set('program_id', id, 30, '/');
    let url = "startup/show-profiles-for-admin";
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        debugger
        console.log(data);
        this.allStartups = data;
        this.unfilteredvalue = data
        this.allStartups.sort((a, b) => { if (a.score < b.score) { return 1; } if (a.score > b.score) { return -1; } })
        console.log("this.allStartups" + this.allStartups)
        this.showStartup = true;

        if (this.unfilteredvalue.length > 0) {
          this.startupsidall = []
          for (let i = 0; i < this.unfilteredvalue.length; i++) {
            this.startupsidall.push(this.unfilteredvalue[i].id)
          }
          console.log("this.startupsidall",this.startupsidall)
          this.getAllCourses();
        }
      }, error => {
        console.log(error);
      })

  }
  getAllCourses() {
    let url = "framework/course/view-all"
    this.apiCom.getDataWithAuth(url, this.authToken)
      .subscribe(data => {
        console.log(data);
        this.courses = data;

      }, error => {
        console.log(error);
      })
  }
  viewprofile(item) {
    console.log(item)
    this.sharedDataService.changeMessage(item);
    this.router.navigate(['admin/dashboard/about-profile'])
  }
  setmsg(i, item,e) {
    console.log("helloitem",item,e)
    this.courses[i].target_date = e
}

  filtervalues(value: string) {
    let item = value.toLowerCase();
    if (this.filterfeild == 'score') {
      this.allStartups = this.unfilteredvalue.filter((list) => list.score == Number(value))

    } else if (this.filterfeild != 'startup_name') {
      this.allStartups = this.unfilteredvalue.filter((list) => list.startup_registration[this.filterfeild].toLowerCase().includes(item))
    } else if (value != "") {
      this.allStartups = this.unfilteredvalue.filter((list) => list[this.filterfeild].toLowerCase().includes(item))

    } else {
      this.allStartups = this.unfilteredvalue
    }

  }

  resetprogram() {
    this.allStartups = this.unfilteredvalue
  }
  setids(checked, item) {
    if (checked == true) {
      if (this.selectedcourses == (null || undefined)) {
        this.selectedcourses = []
        this.selectedcourses.push(item);
      } else {
        this.selectedcourses.push(item);
      }
    } else {
      if (checked == false) {
        let deleteindex = this.selectedcourses.findIndex(x => x.id == item.id)
        console.log(deleteindex)
        if (deleteindex != -1) {
          this.selectedcourses.splice(deleteindex, 1)
          console.log("this.formrequestarray", this.selectedcourses)
        }
      }
    }

  }
  assigncourses(){
    if(this.selectedcourses != (null && undefined) && this.selectedcourses.length >0){
      let url = "framework/course/assign_activities_to_startup"
      let params = JSON.stringify({ courses: this.selectedcourses, program_id: this.programselected, startups: this.startupsidall,singular:false })
      console.log(params)
      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        console.log("assignres", res);
        alert("Courses Assigned Successfully")
        $("#selectstarts").modal("hide");
        this.getAllCourses();
        this.selectedcourses = [];

      })
    }else{
      alert("Select atleast one course to assign")
    }
  }
  openstartups(){
    $("#selectstarts").modal("show");
    this.selected_startups = []
  }
  assignselectcourses(){
    let url = "framework/course/assign_activities_to_startup"
      let params = JSON.stringify({ courses: this.selectedcourses, program_id: this.programselected, startups: this.selected_startups,singular:false })
      console.log(params)
      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        console.log("assignres", res);
        this.getAllCourses();
        alert("Courses Assigned Successfully")
        $("#selectstarts").modal("hide");
      })

  }
  closestartpopup(){
    $("#selectstarts").modal("hide");
    this.selected_startups = []
  }
  setstartupsids(checked,item){
    if (checked == true) {
      if (this.selected_startups == (null || undefined)) {
        this.selected_startups = []
        this.selected_startups.push(item.id);
      } else {
        this.selected_startups.push(item.id);
      }
    } else {
      if (checked == false) {
        let deleteindex = this.selected_startups.findIndex(x => x == item.id)
        console.log(deleteindex)
        if (deleteindex != -1) {
          this.selected_startups.splice(deleteindex, 1)
          console.log("this.selected_startups", this.selected_startups)
        }
      }
    }
  }
  showfeeds(){
    let url= "program/show-news-feeds"
    let params = JSON.stringify({program:{id:this.programselected}})
    this.apiCom.putDataWithToken(url,params,this.authToken).subscribe((res)=>{
      res;
      this.allfeeds = res;
      console.log("allfeeds",this.allfeeds)
      
    })
  }
  openfeedspop(){
    $("#newsfeeds").modal("show"); 
  }
  createfeed(){
    let url = "program/create-news-feed"
    let params = JSON.stringify({news_feed:{title:null,description:this.feed.description,images:this.feed.images,program_id:this.programselected}})
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
  closefeeds(){
    $("#newsfeeds").modal("hide");
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
    let params = JSON.stringify({news_feed:{id:this.feed.id,title:this.feed.title,description:this.feed.description,images:this.feed.images,program_id:this.programselected}})
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
    let params = JSON.stringify({news_feed_comment:{news_feed_id:id,comment:this.comment[i]}});
    this.apiCom.postDataWithToken(url,params,this.authToken).subscribe((res)=>{
      res;
      this.comment[i] = undefined
    })
  }
  updatecomments(){
    let url = "program/update-news-feed-comment";
    let params = JSON.stringify({news_feed_comment:{id:this.commentobj.id,comment:this.commentobj.comment,news_feed_id:this.commentobj.news_feed_id}})
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
