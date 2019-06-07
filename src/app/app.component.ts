import { Component } from '@angular/core';

class ParentItem {
  id: number;
  name: string;
  children: ChildItem[];
  opened: boolean;

}

class ChildItem {
  parentId: number;
  name: string;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // DATA
  data: ParentItem[] =
    [
      {
        id: 1,
        name: 'Parent 1',
        children: [
          { name: 'Child 1', parentId: 1 },
          { name: 'Child 2', parentId: 1 }
        ],
        opened: true
      },

      {
        id: 2,
        name: 'Parent 2',
        children: [
          { name: 'Child 3', parentId: 2 },
          { name: 'Child 4', parentId: 2 }
        ],
        opened: true
      },

      {
        id: 3,
        name: 'Parent 3',
        children: [
          { name: 'Child 5', parentId: 3 },
          { name: 'Child 6', parentId: 3 }
        ],
        opened: true
      },
    ];

  // ACTIVE
  active: ChildItem[] = [];

  moveToActive(dataItem: ParentItem, childItem: ChildItem): void {
    dataItem.children = dataItem.children.filter(obj => obj !== childItem);
    this.active.push(childItem);
  }

  /*  addItem(text: string, price: number): void {

      if (text === null || text.trim() === '' || price === null) {
        return;
      }
  //    this.items.push(new Item(text, price));
    }*/
}
