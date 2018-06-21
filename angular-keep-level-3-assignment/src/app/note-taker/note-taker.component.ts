import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit  {
  errMessage: String;
  note: Note = new Note();
  notes: Array<Note> = [];
  constructor(private noteService: NotesService) { }
  ngOnInit() {
    this.noteService.getNotes().subscribe(
      notes => this.notes = notes,
      err => this.errMessage = err.message
    );
  }
  takeNotes() {
    if (this.note.title && this.note.text) {
      this.notes.push(this.note);
      this.noteService.addNote(this.note).subscribe(
        data => { },
        err => {
          this.errMessage = err.message;
        }
      );
      this.note = new Note();
    } else {
        this.errMessage = 'Title and Text both are required fields';
    }
  }
}
