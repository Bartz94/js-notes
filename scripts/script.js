const notesList = document.getElementById('notes-list');
const addNoteBtn = document.getElementById('addNoteBtn');
const searchInput = document.getElementById('search');
const noteModal = document.getElementById('noteModal');
const noteTitleInput = document.getElementById('noteTitle');
const noteBodyInput = document.getElementById('noteBody');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const cancelBtn = document.getElementById('cancelBtn');
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');
let noteToDeleteIndex = null;
let editingNoteId = null;
let notes = [];

// Render notes function
function renderNotes() {
    notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = '';
    const filteredNotes = notes.filter(note =>
        (note.title && note.title.toLowerCase().includes(searchInput.value.toLowerCase())) ||
        (note.body && note.body.toLowerCase().includes(searchInput.value.toLowerCase())) ||
        (note.date && note.date.toLowerCase().includes(searchInput.value.toLowerCase()))
    );

    const sortedNotes = filteredNotes.sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedNotes.forEach((note,) => {
        const editNoteIcon = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.875 12.1042L15.3958 10.625L16 10.0208C16.1111 9.90972 16.2569 9.85417 16.4375 9.85417C16.6181 9.85417 16.7639 9.90972 16.875 10.0208L17.4792 10.625C17.5903 10.7361 17.6458 10.8819 17.6458 11.0625C17.6458 11.2431 17.5903 11.3889 17.4792 11.5L16.875 12.1042ZM10 17.5V16.0208L14.5 11.5208L15.9792 13L11.4792 17.5H10ZM2.5 13.125V11.875H8.75V13.125H2.5ZM2.5 9.6875V8.4375H12.2917V9.6875H2.5ZM2.5 6.25V5H12.2917V6.25H2.5Z" fill="#3B3C3E"/>
        </svg>
        `;
        const deleteNoteIcon = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.25 16.25H13.75V6.25H6.25V16.25ZM4.375 4.58333V3.33333H7.16667L8 2.5H12L12.8333 3.33333H15.625V4.58333H4.375ZM6.25 17.5C5.91667 17.5 5.625 17.375 5.375 17.125C5.125 16.875 5 16.5833 5 16.25V5H15V16.25C15 16.5833 14.875 16.875 14.625 17.125C14.375 17.375 14.0833 17.5 13.75 17.5H6.25ZM6.25 16.25H13.75H6.25Z" fill="#3B3C3E"/>
        </svg>
        `;

        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <div class="note-content">
                <custom-typography font-weight="700" >${note.title}</custom-typography>
                <custom-typography font-weight="400"  color="#3B3C3E">${note.body}</custom-typography>
                <custom-typography font-weight="300" font-size="12px" color="#5B5C5E">${convertDate(note.date)}</custom-typography>
            </div>
            <div class="note-icons">
                <i class="icon-button" onclick="editNote(${note.id})">
                  ${editNoteIcon}
                </i>
                <i class="icon-button" onclick="confirmDelete(${note.id})">
                    ${deleteNoteIcon}
                </i>
            </div>
        `;

        notesList.appendChild(noteElement);
    });
}

// Show add note modal
function showAddNoteModal() {
    noteTitleInput.value = '';
    noteBodyInput.value = '';
    document.getElementById('formTitle').innerText = 'Add New Note';
    editingNoteId = null;
    noteModal.style.display = 'flex';
}

// Show edit note modal
function editNote(noteId) {
    const note = notes.find(note => note.id === noteId);
    noteTitleInput.value = note.title;
    noteBodyInput.value = note.body;
    document.getElementById('formTitle').innerText = 'Edit Note';
    editingNoteId = noteId;
    noteModal.style.display = 'flex';
}

// Hide modal function (after save or cancel)
function hideNoteModal() {
    noteModal.style.display = 'none';
}

saveNoteBtn.addEventListener('click', () => {
    const title = noteTitleInput.value.trim();
    const body = noteBodyInput.value.trim();
    const date = new Date().toLocaleString();

    if (!title || !body) {
        alert('Please provide both a title and a body for the note.');
        return;
    }

    if (editingNoteId !== null) {
        notes.find(note => note.id === editingNoteId).title = title;
        notes.find(note => note.id === editingNoteId).body = body;
        notes.find(note => note.id === editingNoteId).date = date;
    } else {
        const newNote = {
            id: Math.floor(Math.random() * 1000000) + 1,
            title,
            body,
            date
        };
        notes.push(newNote);
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    hideNoteModal();
    renderNotes();
});

cancelBtn.addEventListener('click', hideNoteModal);
addNoteBtn.addEventListener('click', showAddNoteModal);

function confirmDelete(noteId) {
    noteToDeleteIndex = notes.find(note => note.id === noteId).id;
    deleteModal.style.display = 'flex';
}

confirmDeleteBtn.addEventListener('click', () => {
    updatedNotes = notes.filter((note) => note.id !== noteToDeleteIndex);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    deleteModal.style.display = 'none';
    renderNotes();
});

cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';
});

// Search function
searchInput.addEventListener('input', renderNotes);

function convertDate(dateStr) {
    const [datePart, _timePart] = dateStr.split(', ');
    const [_day, month, year] = datePart.split('.').map(Number);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const formattedMonth = monthNames[month - 1];

    return `${formattedMonth}  ${year}`;
}

renderNotes();
