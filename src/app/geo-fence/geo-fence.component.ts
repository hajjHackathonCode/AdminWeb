import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {}  from '@types/googlemaps';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-geo-fence',
  templateUrl: './geo-fence.component.html',
  styleUrls: ['./geo-fence.component.scss']
})
export class GeoFenceComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  fromModel = {
    fromdate :  new Date(),
    todate :  new Date(),
  }
  title = 'google maps';
  lat = 51.678418;
  fromDate
  toDate
  lng = 7.809007;
  map: google.maps.Map;
  rectangle: google.maps.Rectangle;
  rectangles: google.maps.Rectangle[] = [];
  constructor(private http: HttpClient) {


  }

  drawRecangle(){
     this.rectangle = new google.maps.Rectangle();

    this.rectangle.setOptions({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      bounds: this.map.getBounds(),
      editable: true,
      draggable: true,
    });

  }
  ngOnInit() {
    console.log("ngOnInit")

    if ('geolocation' in navigator) {
      console.log("map mapmapngmap mapmapngmap mapmapngmap mapmapngmap mapmapng  map mapOnInit")

      navigator.geolocation.getCurrentPosition((position) => {

        let mapProp = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
        this.http.get("http://198.211.119.242/HajjConnect//groups/5b625b7a190a4f23ca0c072a",{}).subscribe((data:any ) =>{

          console.log("geolocations ::::: ",data)
          if(data.timedGeoFences){
            data.timedGeoFences.forEach(timedGeoFence =>{
              console.log("geolocations ::::: ",timedGeoFence)
              let tempRectangle = new google.maps.Rectangle({
                strokeColor: '#3e34da',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                // timedGeoFence:timedGeoFence,
                map: this.map,
                bounds: {
                  north: timedGeoFence.geoPoints[0].lat,
                  south: timedGeoFence.geoPoints[1].lat,
                  east: timedGeoFence.geoPoints[1].lon,
                  west: timedGeoFence.geoPoints[2].lon,
                }
              });
              google.maps.event.addListener(tempRectangle, 'click', (data : any) => {
                 tempRectangle.setMap(null);
                this.http.post("http://198.211.119.242/HajjConnect//groups/removegeofence",{"id":"5b625b7a190a4f23ca0c072a","fenceId":tempRectangle.timedGeoFence.id}).subscribe((data:any ) =>{

                })


                });

              this.rectangles.push(tempRectangle);

            })
          }

        })
      });
    }

  }

  saveGeoFence(){
    let ne = this.rectangle.getBounds().getNorthEast();
    let sw = this.rectangle.getBounds().getSouthWest();

    let contentString = `<b>Rectangle moved.</b><br>
      New north-east corner:  ${ ne.lat() } , ${ ne.lng()}  <br>
      New south-west corner:   ${sw.lat()}  , ${sw.lng()}`;

    console.log(this.fromModel);

    let body = {
      "id": "5b625b7a190a4f23ca0c072a",
      "from": this.fromModel.fromdate,
      "to": this.fromModel.todate,
      "geoPoints": [
        {
          "lat": ne.lat(),
          "lon": ne.lng()
        },
        {
          "lat": sw.lat(),
          "lon": ne.lng()
        },
        {
          "lat": sw.lat(),
          "lon": sw.lng()
        },
        {
          "lat": ne.lat(),
          "lon": sw.lng()
        }
      ]
    }


    this.http.post("http://198.211.119.242/HajjConnect//groups/addgeofence",body,{}).subscribe((data ) =>{
      console.log("sw",data)
    })
  }
}


