import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  notStartedNotes: Array<Note> = [];
  startedNotes: Array<Note> = [];
  completedNotes: Array<Note> = [];
  constructor(private notesService: NotesService) {
  }
  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      this.notStartedNotes = notes.filter(note => ('not-started' === note.state));
      this.startedNotes = notes.filter(note => ('started' === note.state));
      this.completedNotes = notes.filter(note => ('completed' === note.state));
    }, (err) => {});
  }
}
