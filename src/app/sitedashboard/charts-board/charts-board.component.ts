import { Component, OnInit } from '@angular/core';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../shared-data.service';
@Component({
  selector: 'app-charts-board',
  templateUrl: './charts-board.component.html',
  styleUrls: ['./charts-board.component.css']
})
export class ChartsBoardComponent implements OnInit {
  authToken: any
  loggedIn: boolean
  dataSource: Object;
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
        this.dataSource = data
        console.log(this.dataSource);
      }, error => {
        console.log(this.dataSource);
      })
  }

  initialized(e) {
    this.chartInstance = e.chart; // Save it for further use

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
