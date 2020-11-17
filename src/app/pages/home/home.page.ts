import { Component, OnDestroy } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewDidEnter, OnDestroy {
  constructor(private mapService: MapService) {}

  ionViewDidEnter(): void {
    this.mapService.loadMap();
  }

  ngOnDestroy(): void {
    this.mapService.destroyMap();
  }
}
