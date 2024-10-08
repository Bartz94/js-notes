import { renderNotes } from './render.js';
import { showAddNoteModal, hideNoteModal, editNote } from './modal.js';
import { addNote, confirmDelete } from './notes.js';

const addNoteBtn = document.getElementById('addNoteBtn');
const addNoteBtnEmpty = document.querySelector('.empty-note-content');
const searchInput = document.getElementById('search');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const cancelBtn = document.getElementById('cancelBtn');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');

searchInput.addEventListener('input', renderNotes);
addNoteBtn.addEventListener('click', showAddNoteModal);
addNoteBtnEmpty.addEventListener('click', showAddNoteModal);
saveNoteBtn.addEventListener('click', addNote);
cancelBtn.addEventListener('click', hideNoteModal);
confirmDeleteBtn.addEventListener('click', confirmDelete);
cancelDeleteBtn.addEventListener('click', () => {
    document.getElementById('deleteModal').style.display = 'none';
});

renderNotes();
