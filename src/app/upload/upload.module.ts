import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { DropzoneComponent } from './upload-files/dropzone/dropzone.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    UploadComponent, 
    DropzoneComponent,
    UploadFilesComponent,
    MyFilesComponent,
    
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    MaterialModule
  ]
})
export class UploadModule { }
