import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Note } from '../note';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/do';
@Injectable()
export class NotesService {
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  constructor(private http: HttpClient,
    private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }
  fetchNotesFromServer() {
    return this.http.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    }, (err) => {});
  }
  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }
  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(addedNote => {
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    });
  }
  editNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(addedNote => {
      const selectedNote = this.notes.find((currentNote) => currentNote.id === addedNote.id);
      Object.assign(selectedNote, addedNote);
      this.notesSubject.next(this.notes);
    });
  }
  getNoteById(noteId): Note {
    const selectedNote = this.notes.find(note => note.id === noteId);
    return Object.assign({}, selectedNote);
  }
}
