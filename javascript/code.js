// script.js

// Load notes on page load
window.onload = loadNotes;

// Save a new note to local storage
function saveNote() {
    const noteText = document.getElementById("noteText").value.trim();
    if (!noteText) {
        alert("Note is empty!");
        return;
    }

    const notes = getNotes();
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
    clearNote();
}

// Load notes from local storage and display them
function loadNotes() {
    const notes = getNotes();
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.textContent = note;
        li.onclick = () => displayNoteForEdit(note, index);
        noteList.appendChild(li);
    });
}

// Display a selected note in the textarea for editing
function displayNoteForEdit(note, index) {
    document.getElementById("noteText").value = note;
    document.getElementById("noteText").setAttribute("data-edit-index", index);
}

// Delete a specific note based on the index
function deleteNote() {
    const editIndex = document.getElementById("noteText").getAttribute("data-edit-index");
    const notes = getNotes();

    if (editIndex !== null) {
        notes.splice(editIndex, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
        clearNote();
    } else {
        alert("No note selected to delete.");
    }
}

// Clear the textarea
function clearNote() {
    document.getElementById("noteText").value = "";
    document.getElementById("noteText").removeAttribute("data-edit-index");
}

// Clear all notes from local storage and the DOM
function clearAllNotes() {
    if (confirm("Are you sure you want to delete all notes?")) {
        localStorage.removeItem("notes");  // Remove all notes from local storage
        loadNotes();                       // Reload the note list to reflect removal
        clearNote();                       // Clear the textarea
    }
}

// Get notes from local storage or return an empty array if none exist
function getNotes() {
    return JSON.parse(localStorage.getItem("notes") || "[]");
}
