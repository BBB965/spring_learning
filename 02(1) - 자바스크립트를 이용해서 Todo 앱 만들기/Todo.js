
const form = document.querySelector('.new-todo');
const input = document.querySelector('.todo-input');
const toDolist = document.querySelector('.todos');

const todo_list = "todos";
let todos = [];

function saveTodos() {
    localStorage.setItem(todo_list, JSON.stringify(todos));
}

function checkTodo(e) {
    const d = e.target;
    const p = d.parentNode.parentNode;
    const taskInput = p.querySelector('.text');
    const todoId = Number(p.id);
    console.log(p);
    if (d.checked) {
        taskInput.classList.add("isDone");
    }
    else {
        taskInput.classList.remove("isDone");
    }
    updateDone(todoId,d.checked);
}

function editTodo(e) {
    const btn = e.target;
    const p = btn.parentNode.parentNode;
    const taskInput = p.querySelector('.text');

    if (btn.innerText.toLowerCase() === "edit") {
        taskInput.removeAttribute("readonly");
        taskInput.focus();
        btn.innerText = "SAVE";
    } else {
        const newTodoText = taskInput.value;
        const todoId = Number(p.id);
        updateTodoText(todoId, newTodoText);

        taskInput.setAttribute("readonly", "readonly");
        btn.innerText = "EDIT";
    }
}

function updateDone(todoId, checked) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === todoId) {
            todos[i].done = checked;
            saveTodos();
            break;
        }
    }
}

function updateTodoText(todoId, newText) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === todoId) {
            todos[i].text = newText;
            saveTodos();
            break;
        }
    }
}

function deleteTodo(e) {
    console.log(e);
    const btn = e.target;
    const div = btn.parentNode;
    const p = div.parentNode;

    toDolist.removeChild(p);
    const cleanTodos = todos.filter(function(toDo) {
        return toDo.id !== parseInt(p.id);
    })
    todos = cleanTodos;
    saveTodos();
}

function addTodoToList(text, done) {
    const todo = document.createElement('div');
    const newId = todos.length + 1;
    todo.classList.add('todo');

    const todo_Done = document.createElement('div');
    todo_Done.classList.add('check');

    const task_Done = document.createElement("input");
    task_Done.classList.add("checkBox");
    task_Done.type = "checkbox";
    task_Done.checked = done;
    todo_Done.appendChild(task_Done);
    todo.appendChild(todo_Done);

    task_Done.addEventListener("click", checkTodo);

    const todo_content = document.createElement('div');
    todo_content.classList.add('content');

    const task_input = document.createElement("input");
    task_input.classList.add("text");
    task_input.type = "text";
    task_input.value = text;
    task_input.setAttribute("readonly","readonly");
    if(done) task_input.classList.add('isDone');

    todo_content.appendChild(task_input);

    const task_buttons = document.createElement("div");
    task_buttons.classList.add("buttons");

    const task_edit = document.createElement("button");
    task_edit.classList.add("edit");
    task_edit.innerHTML = "EDIT";
    task_edit.addEventListener("click", editTodo);
    
    const task_delete = document.createElement("button");
    task_delete.classList.add("delete");
    task_delete.innerHTML = "DELETE";
    task_delete.addEventListener("click", deleteTodo);

    task_buttons.appendChild(task_edit);
    task_buttons.appendChild(task_delete);

    todo.appendChild(todo_content);
    todo.appendChild(task_buttons);
    todo.id = newId;

    toDolist.appendChild(todo);

    const todoObj = {
        text,
        done,
        id : newId,
    };
    todos.push(todoObj);
    saveTodos();
}

function submitTodo(event) {
    event.preventDefault();
    const currentValue = input.value;
    if (!currentValue) {
        alert("할 일을 적어주세요!");
        return;
    }

    addTodoToList(currentValue , false);
    input.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(todo_list);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (todo) {
            addTodoToList(todo.text, todo.done);
        });
    }
}

function init() {
    loadToDos();
    form.addEventListener("submit", submitTodo);
}

init();