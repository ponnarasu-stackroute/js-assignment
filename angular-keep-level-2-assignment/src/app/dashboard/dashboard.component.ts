import { Component, OnInit } from '@angular/core';
import { NotesService } from './../services/notes.service';
import { Note } from './../note';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit {
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
          const index: number =
            this.notes.findIndex(note => note.title === this.note.title);
          this.notes.splice(index, 1);
          this.errMessage = err.message;
        }
      );
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
}
