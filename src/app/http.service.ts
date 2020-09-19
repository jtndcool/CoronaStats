import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private router: Router) { }

  getWorldStat() {
    return this.http.get<any>('https://api.covid19api.com/summary').pipe(timeout(5000),

      catchError(this.handleError)
    );

  }
  getStateData() {
    return this.http.get<any>('https://api.covid19india.org/data.json').pipe(timeout(5000),

    catchError(this.handleError)
  );
  }
  getWhoFeeds() {
    return this.http.get('https://www.who.int/feeds/entity/csr/don/en/rss.xml', { responseType: 'text' }).pipe(timeout(5000),
      catchError(this.handleError));
  }
  getIndiaDistricts() {
    return this.http.get("https://api.covid19india.org/state_district_wise.json").pipe(timeout(5000),
    catchError(this.handleError));
  }

  getIndiaStat() {
    return this.http.get('https://api.covid19india.org/data.json').pipe(timeout(5000),
      catchError(this.handleError));
  }
  private handleError(httpError: HttpErrorResponse) {
    return throwError("An unknown Error Occured ..Pls check your connection");
  }

}
