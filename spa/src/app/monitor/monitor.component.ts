import { Component, OnInit } from '@angular/core';
import { MonitorService } from './monitor.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  constructor(
    private service: MonitorService
  ) { }

  monitor = { "pilsner": -5, "ipa": -5.5, "lager": -5.5, "stout": -7, "wheat": -4, "pale": -5 }


  ngOnInit() {
    setTimeout(() => {
      this.requestMonitor();
    }, 1000);
  }

  requestMonitor(){
    let mnt: Subscription;
    setTimeout(() => {
      mnt = this.service.monitorGet("http://localhost:8000/monitor-status").subscribe(
      res => {
        this.monitor = res;
        mnt.unsubscribe();
        }
      )
      this.requestMonitor();
    }, 1000);
  }

  requestAdjustmentMonitor(frz, adj){
    let adjsutment: Subscription;
    adjsutment = this.service.monitorAdjustment("http://localhost:8000/adjustment", frz, adj).subscribe(
      res => {   
        this.monitor = res;
        adjsutment.unsubscribe();
      }
    )
  }

}
