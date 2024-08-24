const main = document.querySelector(".main");
const todoHeader = document.querySelector(".todo-header");
const todosList = document.querySelector(".todos-list");

let todos = [];
let idx = 0;

function createTodo(todoText) {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const input = document.createElement("input");
    input.type = "text";
    input.setAttribute("class", "disabled");
    input.value = todoText;

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "Save";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("class", `number-${idx}`);
    idx += 1;

    todo.appendChild(input);
    todo.appendChild(editButton);
    todo.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        deleteTodo(Number(todo.lastChild.classList[0].split('-')[1]));
    });

    editButton.addEventListener("click", () => {
        // change input class to enabled and button text to save
        todo.firstChild.classList = [];
        todo.firstChild.setAttribute("class", "enabled");
        const edit = todo.children[1];
        todo.removeChild(edit);

        todo.insertBefore(saveButton, todo.children[1]);

        saveButton.addEventListener("click", () => {
            const todoInput = todo.firstChild.value;
            if (!todoInput) {
                alert("Todo shouldn't be empty");
                return;
            }

            todo.firstChild.classList = [];
            todo.firstChild.setAttribute("class", "disabled");
            const save = todo.children[1];
            todo.removeChild(save);

            todo.insertBefore(edit, todo.children[1]);
        });

        render();
    });

    return todo;
}

function addTodo() {
    const todoInput = document.querySelector(".todoInput");
    if (!todoInput.value) {
        alert("Todo shouldn't be empty");
        return;
    }

    const todo = createTodo(todoInput.value);
    todoInput.value = "";

    todos.push(todo);
    render();
}

function deleteTodo(index) {
    todos = todos.filter((todo) => Number(todo.lastChild.classList[0].split('-')[1]) !== index);
    render();
}

function render() {
    todosList.replaceChildren(...todos);
}
