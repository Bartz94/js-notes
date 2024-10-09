import { editNote, confirmDelete, showAddNoteModal } from './modal.js';
import { convertDate } from './utils.js';
import { emptyIcon, editNoteIcon, deleteNoteIcon, addIcon } from '../icons/icons.js';

export function renderNotes() {
    const notesList = document.getElementById('notes-list');
    const emptyNotes = document.getElementById('empty-notes');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const emptyNotesElement = document.createElement('div');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = '';

    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredNotes = notes.filter(note =>
        (note.title && note.title.toLowerCase().includes(searchInput)) ||
        (note.body && note.body.toLowerCase().includes(searchInput)) ||
        (note.date && note.date.toLowerCase().includes(searchInput))
    );

    const sortedNotes = filteredNotes.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (notes.length === 0) {
        document.getElementById('search').disabled = true;
        emptyNotes.style.display = "block";
        addNoteBtn.style.display = 'none';
        emptyNotesElement.style.display = 'flex';
        emptyNotesElement.classList.add('empty-note-content');
        emptyNotesElement.innerHTML = `
          ${emptyIcon}
            <custom-typography font-size="20px" font-weight="500" >No notes yet</custom-typography>
            <custom-typography font-size="16px" font-weight="400" >Add a note to keep track of your learnings.</custom-typography>
            <custom-button 
            id="add-new-note-btn"
                icon='${addIcon}
                    '
                max-width="370px" 
                width="100%" 
                variant="secondary" >
                    Add Note
                </custom-button>

    `;
        emptyNotes.appendChild(emptyNotesElement);
        emptyNotes.querySelector('#add-new-note-btn').addEventListener('click', () => showAddNoteModal());

    } else {
        document.getElementById('search').disabled = false;
        addNoteBtn.style.display = 'inline-block';

        sortedNotes.forEach((note) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <div class="note-content">
                    <custom-typography font-weight="700">${note.title}</custom-typography>
                    <custom-typography font-weight="400" color="#3B3C3E">${note.body}</custom-typography>
                    <custom-typography font-weight="300" font-size="12px" color="#5B5C5E">${convertDate(note.date)}</custom-typography>
                </div>
                <div class="note-icons">
                    <i class="icon-button edit-btn">
                        ${editNoteIcon}
                    </i>
                    <i class="icon-button delete-btn">
                        ${deleteNoteIcon}
                    </i>
                 </div>
            `;
            notesList.appendChild(noteElement);

            noteElement.querySelector('.edit-btn').addEventListener('click', () => editNote(note.id));
            noteElement.querySelector('.delete-btn').addEventListener('click', () => confirmDelete(note.id));
        });
    }
    // Work around for duplicating element after render
    const divElements = emptyNotes.querySelectorAll('div');
    if (divElements.length > 1) {
        emptyNotes.removeChild(emptyNotesElement);
    }
}

