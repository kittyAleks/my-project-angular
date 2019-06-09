import { Component, NgZone } from '@angular/core';
import { icon, tileLayer, latLng, marker, Marker } from 'leaflet';

class ParentItem {
  id: number;
  name: string;
  children: ChildItem[];
  opened: boolean;
}

class ChildItem {
  parentId: number;
  name: string;
  markerInstance: Marker;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  map;
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ],
    zoom: 10,
    center: latLng(50.442, 30.521)
  };

  // DATA
  data: ParentItem[] =
    [
      {
        id: 1,
        name: 'Parent 1',
        children: [
          { name: 'Child 1', parentId: 1, markerInstance: null },
          { name: 'Child 2', parentId: 1, markerInstance: null }
        ],
        opened: true
      },

      {
        id: 2,
        name: 'Parent 2',
        children: [
          { name: 'Child 3', parentId: 2, markerInstance: null },
          { name: 'Child 4', parentId: 2, markerInstance: null}
        ],
        opened: true
      },

      {
        id: 3,
        name: 'Parent 3',
        children: [
          { name: 'Child 5', parentId: 3, markerInstance: null },
          { name: 'Child 6', parentId: 3, markerInstance: null }
        ],
        opened: true
      },
    ];

  // ACTIVE
  active: ChildItem[] = [];

  constructor(private zone: NgZone) {}

  moveToActive(dataItem: ParentItem, childItem: ChildItem): void {
    dataItem.children = dataItem.children.filter(obj => obj !== childItem);
    this.active.push(childItem);

    let marker_ = marker(
      [
        this.options.center.lat + this.getRandom(-0.2, 0.2),
        this.options.center.lng + this.getRandom(-0.2, 0.2)
      ],
      {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png'
        }),
        title: childItem.name
      }
    );
    marker_.addTo(this.map);
    marker_.on('click', () => {
      this.zone.run(() => {
        this.moveToData(childItem);
      });
    });
    childItem.markerInstance = marker_;
  }

  moveAllToActive(dataItem: ParentItem): void {
    dataItem.children.forEach((childItem) => {
      this.moveToActive(dataItem, childItem);
    });
  }

  moveToData(childItem: ChildItem): void {
    this.data.forEach(dataItem => {
      if (dataItem.id === childItem.parentId) {
        this.active = this.active.filter(obj => obj !== childItem);
        dataItem.children.push(childItem);
        childItem.markerInstance.removeFrom(this.map);
        childItem.markerInstance = null; // освобождаем объект из памяти
      }
    });
  }

  onMapReady(map) {
    // get a local reference to the map as we need it later
    this.map = map;
  }

  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }


  /*  addItem(text: string, price: number): void {

      if (text === null || text.trim() === '' || price === null) {
        return;
      }
  //    this.items.push(new Item(text, price));
    }*/
}
