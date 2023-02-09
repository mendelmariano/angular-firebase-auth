import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {


  @Output() droppedfiles = new EventEmitter<FileList>();

  constructor() { }

  isDraggingOver = false;

  ngOnInit(): void {
  }

  onDragOverEvent(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = true;
  }

  onDragLeaveEvent(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = false;
    
  }

  onDropEvent(event: DragEvent) {
    event.preventDefault();
    this.droppedfiles.emit(event.dataTransfer.files)
    
  }

}
