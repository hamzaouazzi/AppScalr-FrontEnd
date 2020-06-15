import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    id: 1,
    CreatedAt: '2020-06-12T09:02:00',
    Log: 'touch icons and theme screenshot',
  }, {
    id: 2,
    CreatedAt: '2020-06-13T09:10:00',
    Log: 'namespaced all functions',
  }, {
    id: 3,
    CreatedAt: '2020-06-13T10:00:00',
    Log: 'added default system font stack',
  }, {
    id: 4,
    CreatedAt: '2020-06-15T22:12:00',
    Log: 'expanded Quicktags',
  }, {
    id: 5,
    CreatedAt: '2020-06-15T22:00:00',
    Log: 'template part library',
  },   ];

  getData() {
    return this.data;
  }
}
