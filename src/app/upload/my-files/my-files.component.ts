import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesService } from '../files.service';
import { MyFile } from '../models/my-file';


@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {

  constructor(private filesService: FilesService) { }

  files$: Observable<MyFile[]>

  ngOnInit(): void {
    this.files$ = this.filesService.getFiles();
  }

  getDate(n) {
    return new Date(n);
  }

  delete(f: MyFile) {
    
    this.filesService.deleteFile(f);
    
  }

}
