const form = document.querySelector('.form')
const tasksList = document.querySelector('#tasksList')
const taskInput = document.querySelector('#taskInput')


let dataTask = []

if (localStorage.getItem('dataTask')){
    dataTask = JSON.parse(localStorage.getItem('dataTask'))
    dataTask.forEach((task) =>  renderTask(task))
}


form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)


function addTask(event) {
    event.preventDefault();
    const textInput = taskInput.value

    const tasks = {
        id: Date.now(),
        text: textInput,
        done: false
    }

    dataTask.push(tasks)
        
    renderTask(tasks)

    taskInput.value = ""

    taskInput.focus()

    saveToLocalStorage()
    
}

function deleteTask(event) {
    if (event.target.dataset.action === 'delete'){
        // console.log('dellete!')

      const parent = event.target.closest('.list-group-item')
    //   console.log(parent);

      //определяем ID задачи
      const id = Number(parent.id) // получаем как строку поэтому сравниваем не строго или преобразовываем в тип намбер

      dataTask = dataTask.filter((task) => task.id !== id)

    //   console.log(dataTask);

      parent.remove()
      
      saveToLocalStorage()
    }

    
}

function doneTask(event) {
    if (event.target.dataset.action === 'done'){
        const parent = event.target.closest('.list-group-item')

        const id = Number(parent.id)

        // console.log(id);

        const tasks = dataTask.find((task) => task.id === id)

        tasks.done = !tasks.done

        const task = parent.querySelector('.task-title')

        task.classList.toggle('task--done')
        
        saveToLocalStorage()
    }

   
}

function saveToLocalStorage() {
    localStorage.setItem('dataTask', JSON.stringify(dataTask))
}

function renderTask(event) {

    const cssClass  = event.done ? 'task-title task--done' : 'task-title' // формируем css class

    const textHTML = `
    <li id="${event.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${event.text}</span>
        <div class="task-item__buttons">
         <button type="button" data-action="done" class="btn-action">
                <img src="./img/done.png" alt="Done" width="18" height="18">
            </button>
         <button type="button" data-action="delete" class="btn-action">
               <img src="./img/none.png" alt="Done" width="18" height="18">
         </button>
        </div>
    </li>
    `

    tasksList.insertAdjacentHTML('beforeend', textHTML)
}