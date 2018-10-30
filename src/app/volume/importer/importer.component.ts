import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent implements OnInit {
  isLoading = false;
  importData = '';

  constructor() {}

  ngOnInit() {}

  async onFileSelect(e) {
    const [file] = e.target.files;
    if (!file) {
      return;
    }

    this.isLoading = true;
    const fileText = await new Response(file).text();
    console.log('file selected text', fileText);
  }
}
