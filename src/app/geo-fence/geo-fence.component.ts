import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-geo-fence',
  templateUrl: './geo-fence.component.html',
  styleUrls: ['./geo-fence.component.scss']
})
export class GeoFenceComponent implements OnInit {
  title: string = 'google maps';
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor(private http: HttpClient) {

  }
  pingServer(location) {
    this.http
      .post('http://localhost:4000/ping', location)
      .subscribe((res) => {});
  }
  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((position) => {
        this.pingServer({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }
}
