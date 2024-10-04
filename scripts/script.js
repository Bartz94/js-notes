const notesList = document.getElementById('notes-list');
const emptyNotesList = document.getElementById('empty-notes-list');
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
const emptyNotesElement = document.createElement('div');
let noteToDeleteIndex = null;
let editingNoteId = null;
let notes = JSON.parse(localStorage.getItem('notes')) || [];

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

    if (sortedNotes.length > 0) {
        addNoteBtn.style.display = 'inline-block'
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
    } else {
        addNoteBtn.style.display = 'none'
        emptyNotesElement.style.display = 'flex';
        emptyNotesElement.classList.add('empty-note-content')
        emptyNotesElement.innerHTML = `
            <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.0001 61.2223C47.6913 61.2223 61.2223 47.6913 61.2223 31.0001C61.2223 14.3088 47.6913 0.777832 31.0001 0.777832C14.3088 0.777832 0.777832 14.3088 0.777832 31.0001C0.777832 47.6913 14.3088 61.2223 31.0001 61.2223Z" fill="#EEEFF0"/>
                <path d="M31 57.1038C45.4167 57.1038 57.1037 45.4168 57.1037 31.0001C57.1037 16.5834 45.4167 4.89636 31 4.89636C16.5833 4.89636 4.89624 16.5834 4.89624 31.0001C4.89624 45.4168 16.5833 57.1038 31 57.1038Z" fill="#1B1C1E"/>
                <path d="M30.6749 36.15H32.4749V30H30.6749V36.15ZM31.4999 28.35C31.7999 28.35 32.0457 28.2542 32.2374 28.0625C32.4291 27.8708 32.5249 27.6333 32.5249 27.35C32.5249 27.0333 32.4291 26.7792 32.2374 26.5875C32.0457 26.3958 31.7999 26.3 31.4999 26.3C31.1999 26.3 30.9541 26.3958 30.7624 26.5875C30.5707 26.7792 30.4749 27.0333 30.4749 27.35C30.4749 27.6333 30.5707 27.8708 30.7624 28.0625C30.9541 28.2542 31.1999 28.35 31.4999 28.35ZM31.4999 41.35C30.0332 41.35 28.6707 41.0875 27.4124 40.5625C26.1541 40.0375 25.0582 39.3083 24.1249 38.375C23.1916 37.4417 22.4624 36.3458 21.9374 35.0875C21.4124 33.8292 21.1499 32.4667 21.1499 31C21.1499 29.55 21.4124 28.1917 21.9374 26.925C22.4624 25.6583 23.1916 24.5625 24.1249 23.6375C25.0582 22.7125 26.1541 21.9792 27.4124 21.4375C28.6707 20.8958 30.0332 20.625 31.4999 20.625C32.9499 20.625 34.3082 20.8958 35.5749 21.4375C36.8416 21.9792 37.9374 22.7125 38.8624 23.6375C39.7874 24.5625 40.5207 25.6542 41.0624 26.9125C41.6041 28.1708 41.8749 29.5333 41.8749 31C41.8749 32.4667 41.6041 33.8292 41.0624 35.0875C40.5207 36.3458 39.7874 37.4417 38.8624 38.375C37.9374 39.3083 36.8416 40.0375 35.5749 40.5625C34.3082 41.0875 32.9499 41.35 31.4999 41.35ZM31.4999 39.375C33.7999 39.375 35.7707 38.5583 37.4124 36.925C39.0541 35.2917 39.8749 33.3167 39.8749 31C39.8749 28.7 39.0541 26.7292 37.4124 25.0875C35.7707 23.4458 33.7999 22.625 31.4999 22.625C29.1999 22.625 27.2291 23.4458 25.5874 25.0875C23.9457 26.7292 23.1249 28.7 23.1249 31C23.1249 33.3167 23.9457 35.2917 25.5874 36.925C27.2291 38.5583 29.1999 39.375 31.4999 39.375Z" fill="white"/>
            </svg>


            <custom-typography font-size="20px" font-weight="500" >No notes yet</custom-typography>
            <custom-typography font-size="16px" font-weight="400" >Add a note to keep track of your learnings.</custom-typography>

            <custom-button 
                icon='<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.25 14.425H12.75V14.925V17.65H12.25V14.925V14.425H11.75H9V13.925H11.75H12.25V13.425V10.675H12.75V13.425V13.925H13.25H16V14.425H13.25ZM14.775 7.65V3.5V3H14.275H6H5.5V3.5V8.15V20.5V21H6H19H19.5V20.5V8.15V7.65H19H14.775ZM19 21.5H6C5.74128 21.5 5.5161 21.409 5.30355 21.1964C5.09101 20.9839 5 20.7587 5 20.5V3.5C5 3.24128 5.09101 3.0161 5.30355 2.80355C5.5161 2.59101 5.74128 2.5 6 2.5H14.8179L20 7.68211V20.5C20 20.7587 19.909 20.9839 19.6964 21.1964C19.4839 21.409 19.2587 21.5 19 21.5Z" fill="black" stroke="#1B1C1E"/>
                      </svg>
                    '
                max-width="370px" 
                width="100%" 
                variant="secondary" 
                onclick="showAddNoteModal()">
                    Add Note
                </custom-button>
    `;
        emptyNotesList.appendChild(emptyNotesElement);
    }
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
    emptyNotesElement.style.display = 'none';
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
