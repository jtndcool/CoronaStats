import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import * as $ from 'jquery';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit, AfterViewInit {

  dataSource:any;
  isLoading:boolean;
  xml = `<note><to>User</to><from>Library</from><heading>Message</heading><body>Some XML to convert to JSON!</body></note>`;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [ 'Country', 'NewConfirmed', 'TotalConfirmed', 'NewDeaths', 'TotalDeaths', 'NewRecovered', 'TotalRecovered'];
  constructor(private httpService:HttpService, private ngxXml2jsonService: NgxXml2jsonService) { }

  ngOnInit(): void {

    let authObs: Observable<any>;
    this.isLoading=true;
    authObs = this.httpService.getWorldStat()
    authObs.subscribe(
      data=>{
        if(data) {
          console.log("data is", data);
          this.dataSource = new MatTableDataSource<any>(data.Countries);
          this.dataSource.sort = this.sort;
          this.isLoading=false;
        }
        
        
      },
      errorResp=>{
        console.log(errorResp);
        this.isLoading=false;
      }
    )
  }

  getWorld() {
    const parser = new DOMParser();
    const xml = parser.parseFromString(this.xml, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    console.log(obj);
  }


  ngAfterViewInit() {
    $('.count').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 4000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
  });
    
  }

}
