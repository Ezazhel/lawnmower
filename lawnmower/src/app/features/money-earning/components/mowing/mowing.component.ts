import { Component, OnInit } from '@angular/core';
import { IdlingService } from '@core/services/idling.service';

const Neighboors = [
  {
    title: 'MowingTown',
    completion: 0,
    maxCompletion: 100,
    subTitle: 'Somewhere to start',
    content: `
    <p>
      First neighborhood, easy cleaning, slow income
      income per neighbors : 0.0012$
      </p>
  `,
    lastTimeCut: null,
    lastTimeRegrow: null,
    cutPercent: 0,
    regrowPercent: 100,
    regrowing: false,
    time: 5.00 * 1000,
    regrow : 8.00 * 1000,
    income: 0.0012,
    isMowing: false,
  },
  {
    title: 'MowingTown 2',
    completion: 0,
    maxCompletion: 1000,
    subTitle: 'Somewhere to continue',
    content: `
    <p>
      Second neighborhood, more neighboor, slow cleaning, average income
      income per neighbors : 0.0050$
      </p>
  `,
    lastTimeCut: null,
    lastTimeRegrow: null,
    cutPercent: 0,
    income: 0.005,
    regrow : 3.00 * 1000,    
    regrowing: false,
    regrowPercent: 100,
    time: 10.00  * 1000,
  },
];
@Component({
  selector: 'mowing',
  templateUrl: './mowing.component.html',
  styleUrls: ['./mowing.component.scss'],
})
export class MowingComponent implements OnInit {
  neighboors = Neighboors;

  constructor(private idlingService: IdlingService) {}

  ngOnInit(): void {}

  cut = (neighboor:any) => {
    let interval = setInterval(()=>{
      let cutTime = Date.now();
      if(neighboor.lastTimeCut == null) neighboor.lastTimeCut = cutTime;
      let deltaTime = cutTime - neighboor.lastTimeCut;
      neighboor.cutPercent += deltaTime / neighboor.time  * 100;
      neighboor.lastTimeCut = cutTime;
      if(neighboor.cutPercent >= 100){
        this.idlingService.earnMoney(1);
        neighboor.completion += 1;
        neighboor.cutPercent = 0;
        neighboor.lastTimeCut = null;
        if(!neighboor.regrowing) this.regrow(neighboor);
        window.clearInterval(interval);
      }
    }, 50);
  }

  regrow = (neighboor: any) => {
    neighboor.regrowing = true;
    let interval = setInterval(()=>{
      let regrowtTime = Date.now();
      if(neighboor.lastTimeRegrow == null) neighboor.lastTimeRegrow = regrowtTime;
      let deltaTime = regrowtTime - neighboor.lastTimeRegrow;
      neighboor.regrowPercent -= deltaTime / neighboor.regrow * 100;
      neighboor.lastTimeRegrow = regrowtTime;
      if(neighboor.regrowPercent <= 0){
        neighboor.completion -= 1;
        neighboor.regrowPercent = 100;
        neighboor.lastTimeRegrow = null;
        if(neighboor.completion <= 0){
          neighboor.regrowing = false;
          window.clearInterval(interval);
        }
      }
    }, 50);
  }
  trackByFunction(index: number, object: any) {
    return object;
  }
}
