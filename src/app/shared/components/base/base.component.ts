import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnDestroy {

  public notifier = new Subject();

  ngOnDestroy(): void {
    this.notifier.next(null);
    this.notifier.complete();
  }

}
