const addInput = document.querySelector("#addInput");
const addButton = document.querySelector("#addButton");
const cardBody = document.querySelector(".space-y-3");
const body = document.getElementsByTagName("body");
const statsDiv = document.querySelector("#stats");

function eventListeners(){
    addButton.addEventListener("click", addTodo);
    cardBody.addEventListener("click", updateTodo);
    cardBody.addEventListener("click", deleteTodo);
    document.addEventListener("DOMContentLoaded", getTodos);
    document.addEventListener("click", checkBoxControl);
}

function checkBoxControl(e){
    if(e.target.classList.contains("checkBoxButton")){
        console.log("CheckBox");
        let button = e.target;
        let mainDiv = button.parentElement;
        let span = mainDiv.querySelector("span");
        const buttons = mainDiv.querySelectorAll("button");
        let editButton = buttons[1];
        
        let buttonChecked = button.querySelector("i");
        
        if(buttonChecked === null){
            span.className = "flex-1 text-gray-500 line-through";
            button.className = "checkBoxButton flex-shrink-0 w-6 h-6 rounded border-2 bg-green-500 border-green-500 flex items-center justify-center transition";
            const i = document.createElement("i");
            i.className = "fas fa-check text-white text-xs";
            console.log(button);
            
            button.appendChild(i);
            editButton.classList.add("hidden");
        }else{
        button.className = "checkBoxButton flex-shrink-0 w-6 h-6 rounded border-2 border-gray-500 hover:border-purple-500 flex items-center justify-center transition";
        button.removeChild(buttonChecked);
        span.className = "flex-1 text-white";
        editButton.classList.remove("hidden");
        }
    }
}


function deleteTodo(e){
    if(e.target.className === "fas fa-trash"){
        
        const mainDiv = e.target.parentElement.parentElement.parentElement;
        const mainDivParent = mainDiv.parentElement;
        const span = mainDiv.querySelector("span");
        let value = span.textContent;
        mainDivParent.removeChild(mainDiv);
        deleteTodoFromStorage(value);
    }
}

function deleteTodoFromStorage(todo){
    let todos = getTodosFromStorage();

    if(todos.indexOf(todo) !== -1) {
        let index = todos.indexOf(todo);
        todos.splice(index,1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    let todosLength = todos.length;
    const spans = statsDiv.querySelectorAll("span");
    let statsSpan = spans[0];
    statsSpan.textContent = `Toplam: ${todosLength} görev`;
}

function getTodos(){
    let todos = getTodosFromStorage();

    todos.forEach(todo => {
        addTodoToUI(todo);
    });

    let todosLength = todos.length;
        const spans = statsDiv.querySelectorAll("span");
        let statsSpan = spans[0];
        statsSpan.textContent = `Toplam: ${todosLength} görev`;
}

// let editingSpan = null;
// let isEditing = false;

//Todo düzenleme
function updateTodo(e){
    if(e.target.className === "fas fa-edit"){
        const mainDiv = e.target.parentElement.parentElement.parentElement;
        let value;
        let target;
        for(const child of mainDiv.children){
            if(child.tagName === "SPAN"){
                target = child;
                value = child.textContent.trim();
            }
        }

        const input = document.createElement("input");
        input.type = "text";
        input.value = value;
        input.className = "border border-gray-300 rounded-lg px-2 py-1 w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-400";

        mainDiv.replaceChild(input, target);
        
        input.addEventListener("keydown", (e) => {
            if(e.key === "Enter"){
                let span = document.createElement("span");
                span.className = "flex-1 text-white";
                span.textContent = e.target.value.trim();
                mainDiv.replaceChild(span, input);
                updateTodoFromStorage(value, e.target.value.trim());
            }
        });
    }
}

function updateTodoFromStorage(previousTodo,todo){
    let todos = getTodosFromStorage();

    let result = todos.indexOf(previousTodo);

    if(result !== -1){
        todos[result] = todo;
        localStorage.setItem("todos", JSON.stringify(todos));
    }else{
        alert("Böyle bir değer yok!");
    }

}

//Todo ekleme fonksiyonu
function addTodo(e){
    let inputValue = addInput.value.trim();
    if(inputValue === ""){
        alert("Lütfen todo ismini boş bırakmayın!");
    }else{
        addTodoToUI(inputValue);
        addTodoToStorage(inputValue);
        addInput.value = "";
        const todos = getTodosFromStorage();
        let todosLength = todos.length;
        const spans = statsDiv.querySelectorAll("span");
        let statsSpan = spans[0];
        statsSpan.textContent = `Toplam: ${todosLength} görev`; 
    }
}

function addTodoToStorage(todo){
    let todos = getTodosFromStorage();

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromStorage(){
    let todos;
    
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToUI(todo){
    /*
    <div class="bg-gray-700 border border-gray-600 rounded-lg p-4 flex items-center gap-3 hover:bg-gray-650 transition group">
                        <button class="flex-shrink-0 w-6 h-6 rounded border-2 border-gray-500 hover:border-purple-500 flex items-center justify-center transition">
                        </button>
                        <span class="flex-1 text-white">
                            Backend API'yi entegre et
                        </span>
                        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button class="p-2 text-blue-400 hover:bg-blue-900/30 rounded transition" title="Düzenle">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="p-2 text-red-400 hover:bg-red-900/30 rounded transition" title="Sil">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
    */
   const mainDiv = document.createElement("div");
   mainDiv.className = "bg-gray-700 border border-gray-600 rounded-lg p-4 flex items-center gap-3 hover:bg-gray-650 transition group";
   const checkBoxButton = document.createElement("button");
   checkBoxButton.className = "checkBoxButton flex-shrink-0 w-6 h-6 rounded border-2 border-gray-500 hover:border-purple-500 flex items-center justify-center transition";
   const todoTextSpan = document.createElement("span");
   todoTextSpan.className = "flex-1 text-white";
   todoTextSpan.textContent = todo;
   const buttonsDiv = document.createElement("div");
   buttonsDiv.className = "flex gap-2 opacity-0 group-hover:opacity-100 transition";
   const updateButton = document.createElement("button");
   updateButton.className = "p-2 text-blue-400 hover:bg-blue-900/30 rounded transition";
   updateButton.title = "Düzenle";
   updateButton.innerHTML = `<i class="fas fa-edit"></i>`;
   const deleteButton = document.createElement("button");
   deleteButton.className = "p-2 text-red-400 hover:bg-red-900/30 rounded transition";
   deleteButton.title = "Sil";
   deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;

   //Buttonları buttonDiv'e ekleme
   buttonsDiv.appendChild(updateButton);
   buttonsDiv.appendChild(deleteButton);
   //buttonsDiv, todoTextSpan ve checkBoxButton'u mainDiv'e ekleme
   mainDiv.appendChild(checkBoxButton);
   mainDiv.appendChild(todoTextSpan);
   mainDiv.appendChild(buttonsDiv);
   //mainDiv'i cardBody'e ekleme
   cardBody.appendChild(mainDiv);
}

eventListeners();
