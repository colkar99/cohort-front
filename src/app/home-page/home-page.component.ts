import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  datas: Array<any>;
  result: Array<any>;

  constructor() { }

  ngOnInit() {
    this.datas = [{
      growth: [
        { img: "https://vive.vc/wp-content/uploads/2018/11/1.png",
          h3: "Santeon",
          em: "",
          p: "A Leading Provider of Enterprise Level Business Process Management Platform"
          },
          { img: "https://vive.vc/wp-content/uploads/2018/11/2-1.png",
          h3: "eBenefits Network",
          em: "",
          p: "The largest independent Insurance Benefits Enrollment and Management Platform"
          },
          { img: "https://vive.vc/wp-content/uploads/2018/11/3.png",
          h3: "CorumX",
          em: "",
          p: "CryptoCurrency Trading Platform and Blockchain Products and Services"
          },
          { img: "https://vive.vc/wp-content/uploads/2018/11/large-logo.png",
          h3: "CoruIlerramX",
          em: "",
          p: "A Global Agile Software Development Outsourcing company serving Fortune 500 Companies"
          }
      ]},
      {seed: [
        { img: "https://vive.vc/wp-content/uploads/2018/11/716351_4e8ec35f2def4a848db6ea0410e561da_mv2-3.png",
          h3: "One City Entertainment",
          em: "Spring Cohort 2018",
          p: "Providing a video competition platform to bring the storytelling back to hip-hop music."
          },{ img: "https://vive.vc/wp-content/uploads/2018/11/716351_0cb7eb87a49a482e925617e76e0b570a_mv2.png",
          h3: "BlackBook",
          em: "Summer Cohort 2018",
          p: "Providing a platform that removes friction from the bar industry and helps improve the customer experience, and staff operations."
          },{ img: "https://vive.vc/wp-content/uploads/2018/11/716351_4e8ec35f2def4a848db6ea0410e561da_mv2-1.png",
          h3: "JuneBrain",
          em: "Spring Cohort 2018",
          p: " Providing a home monitoring device to enable providers with insights to help with early detection and treatment for multiple sclerosis patients."
          },{ img: "https://vive.vc/wp-content/uploads/2018/11/ao2zd-wi_400x400.jpg",
          h3: "Gravatate",
          em: "Spring Cohort 2018",
          p: "Providing business messaging that is simple and affordable for teams, clients, and vendors so they can organize easily and collaborate to stay on the same page."
          },{ img: "https://vive.vc/wp-content/uploads/2018/11/716351_4e8ec35f2def4a848db6ea0410e561da_mv2-2.png",
          h3: "Lifetagger",
          em: "Spring Cohort 2018",
          p: "Providing a platform for businesses and users to tag a place with content and receive user generated, location relevant content."
          },{ img: "https://vive.vc/wp-content/uploads/2018/11/716351_6ddea40e2b79448d8682c874ff5487b1_mv2.png",
          h3: "Glowmode",
          em: "Spring Cohort 2018",
          p: "Providing a skin care roadmap and regimen for individuals to achieve their skin goals through tele-consultations and online support."
          },{ img: "https://vive.vc/wp-content/uploads/2018/11/716351_4e8ec35f2def4a848db6ea0410e561da_mv2.png",
          h3: "Place Tempo",
          em: "Spring Cohort 2018",
          p: "Providing the best places to work or study for students and remote workers to improve their productivity."
          },{ img: "https://vive.vc/wp-content/uploads/2018/11/herdomain.png",
          h3: "HerDomain",
          em: "Spring Cohort 2018",
          p: "Providing women with remote work, insights, and a community that"
          }
          ,{ img: "https://vive.vc/wp-content/uploads/2018/12/Untitled-1.jpg",
          h3: "TrustWire",
          em: "Spring Cohort 2018",
          p: "Providing a legally compliant web-based encrypted file transfer solution for businesses where secure and reliable communication is mission critical."
          }
      ]}]
      this.setData('seed');
  }
  setData(val){
    this.result = [];
    if (val == "seed"){
      this.result.push(this.datas[1].seed);
    }else{
      this.result.push(this.datas[0].growth);
    }
  }

}
