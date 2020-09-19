import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import * as $ from 'jquery';
import {CardModule} from 'primeng/card';
import {AutoCompleteModule} from 'primeng/autocomplete';

interface states{
active:any,
recovered:any,
deaths:any,
confirmed:any,
state:any;
}
interface district{
  active:any,
  recovered:any,
  deceased:any,
  confirmed:any,
  name:any;

  }

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.scss']
})
export class IndiaComponent implements OnInit, AfterViewInit {

  data:any;
  options:any;
  dataIndia:any;
  dataStates:any;
  dataLabels=[];
  dataDeaths=[];
  dataRecovered=[];
  dataTimeSeries:any;
  dataTimeSeriesGraph:any;
  dataSource:any;
  districtData:any;
  selectedState:any;
  selectedListDistricts:any;
  dataDistrictGraph:any[]=[];
  stateData:any;
  currentState:any;
  isLoading:boolean;
  stateDetails:states;
  districtDetails:any;
  
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [ 'State', 'Active', 'Confirmed', 'Deaths', 'Recovered', 'Migrated'];
  
  constructor(private httpService:HttpService) {
    let authObs,obsDistricts: Observable<any>;

    authObs = this.httpService.getIndiaStat();
    authObs.subscribe(
      data=>{
        if(data) {
          this.dataIndia=data.statewise;
          this.dataTimeSeries=data.cases_time_series;
          this.dataIndia.sort = this.sort;
          // console.log("data is", data);
          this.gn();
        }
        
        
      },
      errorResp=>{
        console.log(errorResp);
      }
    )
    obsDistricts = this.httpService.getIndiaDistricts();
    obsDistricts.subscribe(
      data=>{
        if(data) {
          
            this.districtData = data;
            console.log(this.districtData);
        }
      },
      errorResp=>{
        console.log(errorResp);
      }
    )
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  }
   }

  ngOnInit(): void {
  this.isLoading=false;
    
    this.fetchStateData();
  
  }
  gn() {

    this.dataTimeSeriesGraph={
      labels:this.dataTimeSeries.map( x =>  x.date),
      datasets:[
        {
          label:'Total Confirmed',
          data:this.dataTimeSeries.map( x =>  x.totalconfirmed),
          borderColor:'red'
        },
        {
         label:'Recovered',
         data:this.dataTimeSeries.map( x =>  x.totalrecovered ),
          borderColor:'green'
        }
      ]
    }

   
    console.log("k",this.dataLabels, this.dataRecovered, this.dataDeaths);
    this.dataStates={
      labels:this.dataIndia.map( x =>  x.state ),
      datasets:[
        {
          label:'Recovered',
          data:this.dataIndia.map( x =>  x.recovered ),
          borderColor:'green'
        },
        {
         label:'Confirmed',
         data:this.dataIndia.map( x =>  x.confirmed ),
          borderColor:'red'
        }
      ]
    }
    
  }
  fetchStateData() {
    let obsState: Observable<any>;

    obsState = this.httpService.getStateData();
    obsState.subscribe(
      data=>{
        if(data) {
        

          this.stateData=data;
        }
        
        
      },
      errorResp=>{
        console.log(errorResp);
      }
    )
  }
  onSelectDistrict(value) {
    console.log(value, this.selectedListDistricts[value].active);
    this.districtDetails=this.selectedListDistricts[value];
    this.districtDetails.name=value;

      console.log(this.districtDetails)
  }
  onSelectState(value) {
 
    this.stateData.statewise.forEach((element, index, array) => {
     if(element.state==value) {
       console.log(element.active);
       this.stateDetails=element;
      //  this.stateDetails.active=element.active;
      //  this.stateDetails.confirmed=element.confirmed;
      //  this.stateDetails.deaths=element.deaths;
      //  this.stateDetails.recovered=element.recovered;
      //  this.stateDetails.state=element.state;
     }
  });
  console.log(this.stateData);

  this.dataDistrictGraph=[];
  //  console.log(value,this.districtData);
  //  console.log( this.districtData[value].districtData);
   this.selectedListDistricts = this.districtData[value].districtData; 
   console.log("ll", this.selectedListDistricts);
   for (let key of Object.keys(this.selectedListDistricts)) {
    let districts = this.selectedListDistricts[key];
    // console.log(key,districts.active, districts.confirmed);
    this.options = {
      title: {
          display: true,
          text: 'My Title',
          fontSize: 16
      },
      legend: {
          position: 'bottom'
      }
  };

    this.dataDistrictGraph.push(
      {
        
       labels:['Active', 'Confirmed','test'],
       datasets:[
        {
          data: [districts.active, districts.confirmed, 100],
          backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
          ],
          hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
          ]
      }
          
       ]
      }
    );
  }
  // console.log(this.dataDistrictGraph);
  }
  ngAfterViewInit() {
   
    
  }

}
