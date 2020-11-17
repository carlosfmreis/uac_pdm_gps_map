import { Injectable } from '@angular/core';
import { Map, tileLayer, marker, Marker, LatLng, icon } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private coordinates: LatLng;
  private map: Map;
  private marker: Marker;
  private positionSubscription: Subscription;

  constructor(private geolocation: Geolocation) {}

  loadMap(): void {
    this.placeMap();
    this.placeMarker();
    this.watchPosition();
  }

  private placeMap(): void {
    this.coordinates = new LatLng(37.7396, -25.6685); // by default it's Ponta Delgada
    this.map = new Map('map').setView(this.coordinates, 15);
    tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    ).addTo(this.map);
  }

  private placeMarker(): void {
    this.marker = marker(this.coordinates, {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 0],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png',
      }),
    }).addTo(this.map);
    this.marker.bindPopup('You are here!');
  }

  private watchPosition(): void {
    this.positionSubscription = this.geolocation
      .watchPosition()
      .subscribe((data) => {
        if ('coords' in data) {
          this.updateMap(data.coords.latitude, data.coords.longitude);
        }
      });
  }

  private updateMap(latitude: number, longitude: number): void {
    this.coordinates = new LatLng(latitude, longitude);
    this.map.flyTo(this.coordinates);
    this.marker.setLatLng(this.coordinates);
  }

  destroyMap(): void {
    this.positionSubscription.unsubscribe();
    this.map.remove();
    this.marker.remove();
  }
}
