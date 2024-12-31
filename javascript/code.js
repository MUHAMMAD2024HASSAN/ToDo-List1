function addTask() {
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const task = todoInput.value.trim();
  
    if (task) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        ${task}
        <button onclick="deleteTask(this)">Delete</button>
      `;
      todoList.appendChild(listItem);
      todoInput.value = '';  // Clear the input after adding task
    } else {
      alert('Please enter a task!');
    }
  }
  
  function deleteTask(button) {
    button.parentElement.remove();  // Removes the task (list item)
  }