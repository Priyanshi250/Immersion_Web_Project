// Function to create a new note
function addNote() {
    const container = document.getElementById('notes-container');
    const note = document.createElement('div');
    note.className = 'note';
    
    // Create note header
    const header = document.createElement('div');
    header.className = 'note-header';
    
    // Create date element
    const date = document.createElement('div');
    date.className = 'note-date';
    date.textContent = new Date().toLocaleDateString();
    
    // Create note actions
    const actions = document.createElement('div');
    actions.className = 'note-actions';
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.title = 'Delete note';
    deleteBtn.onclick = () => {
        note.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => note.remove(), 300);
    };
    
    // Create color picker button
    const colorBtn = document.createElement('button');
    colorBtn.innerHTML = '<i class="fas fa-palette"></i>';
    colorBtn.title = 'Change color';
    colorBtn.onclick = () => {
        const colors = ['#fff', '#f8f9fa', '#e3f2fd', '#f3e5f5', '#e8f5e9'];
        const currentColor = note.style.backgroundColor;
        const currentIndex = colors.indexOf(currentColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        note.style.backgroundColor = colors[nextIndex];
    };

    // Create add button for the notepad
    const addBtn = document.createElement('button');
    addBtn.className = 'add-note-btn';
    addBtn.innerHTML = '<i class="fas fa-plus"></i> Add Note';
    addBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent double-click event
        addNote();
    };
    
    // Create textarea
    const textarea = document.createElement('textarea');
    textarea.className = 'note-content';
    textarea.placeholder = 'Write your note here...';
    
    // Add auto-save functionality
    textarea.addEventListener('input', () => {
        localStorage.setItem(`note-${Date.now()}`, textarea.value);
    });
    
    // Assemble the note
    actions.appendChild(colorBtn);
    actions.appendChild(deleteBtn);
    header.appendChild(date);
    note.appendChild(header);
    note.appendChild(textarea);
    note.appendChild(actions);
    note.appendChild(addBtn);
    
    // Add the note to the container
    container.insertBefore(note, container.firstChild);
    
    // Focus on the new note
    textarea.focus();
}

// Add fadeOut animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(style);

// Add double-click event listener to the container
document.getElementById('notes-container').addEventListener('dblclick', function(e) {
    if (e.target.closest('.note')) {
        const note = e.target.closest('.note');
        note.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => note.remove(), 300);
    }
}); 