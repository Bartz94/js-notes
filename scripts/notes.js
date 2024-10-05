import { renderNotes } from './render.js';
import { hideNoteModal } from './modal.js';
import { editingNoteId } from './modal.js';

export function addNote() {
    const noteTitle = document.getElementById('noteTitle').value.trim();
    const noteBody = document.getElementById('noteBody').value.trim();
    const date = new Date().toLocaleString();
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    if (!noteTitle || !noteBody) {
        alert('Please provide both a title and a body for the note.');
        return;
    }

    if (editingNoteId !== null) {
        const noteIndex = notes.findIndex(note => note.id === editingNoteId);
        notes[noteIndex].title = noteTitle;
        notes[noteIndex].body = noteBody;
    } else {
        const newNote = {
            id: Math.floor(Math.random() * 1000000) + 1,
            title: noteTitle,
            body: noteBody,
            date: date
        };
        notes.push(newNote);
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    hideNoteModal();
    renderNotes();
}

export function confirmDelete() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.filter(note => note.id !== window.noteToDeleteIndex);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    document.getElementById('deleteModal').style.display = 'none';
    renderNotes();
}
