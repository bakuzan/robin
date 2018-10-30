import { Component, OnInit } from '@angular/core';

import SidebarLink from './sidebar-link.model';
import { Urls } from 'src/app/common/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  links: SidebarLink[] = [
    { to: Urls.dashboard, text: 'Dashboard', icon: 'D' },
    { to: Urls.seriesList, text: 'Series', icon: 'S' },
    { to: Urls.purchaseHistory, text: 'Purchase History', icon: 'PH' },
    { to: Urls.importer, text: 'Importer', icon: 'I' }
  ];

  constructor() {}

  ngOnInit() {}
}
