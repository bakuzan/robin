import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor() {}

  downloadCSV(fileName: string, rawString: string) {
    const fullName = `${fileName}.csv`;
    const blob = new Blob(['\ufeff', rawString]);
    this.initiateDownload(fullName, blob);
  }

  /* Private methods */

  private initiateDownload(fileName: string, downloadBlob: Blob) {
    const downloadLink = URL.createObjectURL(downloadBlob);
    const link = document.createElement('a');
    link.setAttribute('href', downloadLink);
    link.setAttribute('download', fileName);
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  }
}
