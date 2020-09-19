import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-who',
  templateUrl: './who.component.html',
  styleUrls: ['./who.component.scss']
})
export class WhoComponent implements OnInit {

newsFeed:any;
isLoading:boolean;
  constructor(private http: HttpClient,private ngxXml2jsonService: NgxXml2jsonService,private httpService:HttpService) { }

  ngOnInit(): void {
   this.isLoading=true;
 
    this.http.get('https://www.who.int/feeds/entity/csr/don/en/rss.xml', { responseType: 'text' }).subscribe(
      data=>{
        if(data) {
          this.isLoading=false;
          console.log(data);
          const parser = new DOMParser();
          const xml = parser.parseFromString(data, 'text/xml');
          var obj = this.ngxXml2jsonService.xmlToJson(xml);
          console.log(obj);
          this.newsFeed=obj;

        }
      },
      error=>{
        this.isLoading=false;
        console.log(error);
      }
    )
   }
}
