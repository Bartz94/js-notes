export let editingNoteId = null;

export function showAddNoteModal() {
    const noteModal = document.getElementById('noteModal');
    document.getElementById('formTitle').innerText = 'Add new note';
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteBody').value = '';
    editingNoteId = null;
    noteModal.style.display = 'flex';
}

export function hideNoteModal() {
    document.getElementById('noteModal').style.display = 'none';
}

export function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes.find(note => note.id === noteId);
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteBody').value = note.body;
    document.getElementById('formTitle').innerText = 'Edit note';
    editingNoteId = noteId;
    document.getElementById('noteModal').style.display = 'flex';
}

export function confirmDelete(noteId) {
    document.getElementById('deleteModal').style.display = 'flex';
    window.noteToDeleteIndex = noteId;
}
