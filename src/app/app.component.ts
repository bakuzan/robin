import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { capitaliseEachWord } from './common/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private titleService: Title) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const { urlAfterRedirects } = event;

        if (!urlAfterRedirects.match(/\d+/g)) {
          const pageName = capitaliseEachWord(
            urlAfterRedirects.replace(/\//g, ' ').trim()
          );
          const pageTitle = `Robin - ${pageName}`;
          this.titleService.setTitle(pageTitle);
        }
      });
  }
}
