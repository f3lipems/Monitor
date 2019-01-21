import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from "@angular/common/http";
import 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MonitorService {

  constructor(private http: HttpClient) {}

  monitorGet(url):Observable<any> {
    return this.http.get(url);
  }

  monitorAdjustment(url, frz, adj):Observable<any> {
    let headers = new HttpHeaders()
    .set("Content-Type", "application/x-www-form-urlencoded");
    
    return this.http.post(url, {freezer:frz, adjsutment: adj}, {headers});
  }

}