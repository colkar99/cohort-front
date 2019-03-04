import { Component, OnInit } from '@angular/core';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../shared-data.service';
declare var $: any
@Component({
  selector: 'app-charts-board',
  templateUrl: './charts-board.component.html',
  styleUrls: ['./charts-board.component.css']
})
export class ChartsBoardComponent implements OnInit {
  authToken: any
  loggedIn: boolean
  dataSource: any = {};
  chartInstance: any = {};
  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router) {
    this.getProgramChart();
  }

  ngOnInit() {

    this.authToken = this.getCookie('Authorization');
    if (this.authToken.length != 0) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }

  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  getProgramChart(): void {
    this.apiCom.getDataWithoutAuth("chart/get-program-chart")
      .subscribe(data => {
        var program_title = ""
        var program_description = ""
        var link_data = "newchart-xml-"
        for (var i = 0; i < data.data.length; i++) {
          program_title = data.data[i].label;
          // link_data = data.data[i].link
          data.data[i].link = `${link_data}${$(program_title).text()}`;
          data.data[i].label = $(program_title).text();
          data.linkeddata[i].id = $(program_title).text();
          program_description = data.linkeddata[i].linkedchart.chart.caption
          data.linkeddata[i].linkedchart.chart.caption = $(program_description).text();
        }
        this.dataSource = data
        console.log(this.dataSource);
        // this.dataSource = data
        // console.log("datasouce", this.dataSource);
        // for (let i = 0; i < this.dataSource.data.length; i++) {
        //   //let j = $(this.dataSource,data[i].label)
        //   this.dataSource.data[i].label = $(this.dataSource.data[i].label).text();

        //   var html = this.dataSource.data[i].link
        //   var div = document.createElement("div");
        //   div.innerHTML = html;
        //   var text = div.textContent || div.innerText || "";

        //   this.dataSource.data[i].link = text
        // }
        // for (let i = 0; i < this.dataSource.linkeddata.length; i++) {
        //   //let j = $(this.dataSource,data[i].label)
        //   this.dataSource.linkeddata[i].id = $(this.dataSource.linkeddata[i].id).text();
        //   this.dataSource.linkeddata[i].linkedchart.chart.caption = $(this.dataSource.linkeddata[i].linkedchart.chart.caption).text();
        // }

        // console.log("changeddatasource", this.dataSource);
      }, error => {
        console.log(this.dataSource);
      })
  }

  initialized(e) {
    console.log(e)
    this.chartInstance = e.chart; // Save it for further use
    console.log("init", this.chartInstance)

    // Configure Drilldown attributes
    // See this : https://www.fusioncharts.com/dev/api/fusioncharts/fusioncharts-methods#configureLink
    this.chartInstance.configureLink({
      type: "pie2d",
      overlayButton: {
        message: 'close',
        fontColor: '880000',
        bgColor: 'FFEEEE',
        borderColor: '660000'
      }
    }, 0)
  }


}
