
/*
此部分在實驗讓 Todo List 能結合 localStorage 功能

if(localStorage.getItem('todoList') !== null){
  const oldTodoData = localStorage.getItem('todoList').split(',')
  for(let i=0; i<oldTodoData.length; i++){
    let todoDataValue = oldTodoData[i]
    let oldTodoItem = document.createElement('div')
    oldTodoItem.classList.add('List__todo-area-content')
    oldTodoItem.innerHTML = `
              <div class="List__todo-area-content-text">
                ${todoDataValue}
              </div>
              <div class="todo__icon-area">
                <div class="todo__icon-area-trash">
                  <i class="fas fa-trash-alt trash-btn"></i>
                </div>
                <div class="todo__icon-area-check">
                  <i class="fas fa-check-circle check-btn"></i>
                </div>
              </div>`
    todoList.appendChild(oldTodoItem);
  }
}

let todoListData = []
btn.addEventListener('click',function(){
  if(input.value !== ''){
    todoListData.push(input.value)
    localStorage.setItem('todoList', todoListData)
  }
})

finishedList.addEventListener('click',function(e){
  if(e.target.classList.contains('check-btn')){
    let fctStr = e.target.closest('.List__finished-area-content').innerText
    todoListData.push(fctStr)
    localStorage.setItem('todoList', todoListData)
  }
})

*/

// 設常數 input 來選取輸入框
const input = document.querySelector('.List__input')

// 設常數 btn 來選取輸入框旁的加號按鈕
const btn = document.querySelector('.List__input-add-btn')

// 設常數 todoList 來選取代辦事項區
const todoList = document.querySelector('.List__todo-area')

// 設常數 finishedList 來選取完成事項區
const finishedList = document.querySelector('.List__finished-area')

// 轉義字串的 function，避免出現奇怪的輸入
function escapeHTML(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// 此部分為監聽輸入框旁的按鈕，讓輸入框的內容能加入待辦事項
btn.addEventListener('click', () => {
  if (input.value !== '') {
    const todoItem = document.createElement('div')
    const str = input.value
    todoItem.classList.add('List__todo-area-content')
    todoItem.innerHTML = `
      <div class="List__todo-area-content-text">${escapeHTML(str)}</div>
      <div class="todo__icon-area">
        <div class="todo__icon-area-trash">
          <i class="fas fa-trash-alt trash-btn"></i>
        </div>
        <div class="todo__icon-area-check">
          <i class="fas fa-check-circle check-btn"></i>
        </div>
      </div>`
    input.value = ''
    todoList.appendChild(todoItem)
  } else {
    alert('輸入處為空白！！')
  }
})

// 刪除事項的 function
function removeItem(list, e, typeStr) {
  list.removeChild(e.target.closest(`.List__${typeStr}-area-content`))
}

// 將事項移動到不同分類的 function
function appendItem(e, originType, transType) {
  const elementStr = e.target.closest(`.List__${originType}-area-content`).innerText
  const elementItem = document.createElement('div')
  elementItem.classList.add(`List__${transType}-area-content`)
  if (originType === 'todo') {
    elementItem.innerHTML = `
    <div class="List__finished-area-content-text">${escapeHTML(elementStr)}</div>
    <div class="finished__icon-area">
      <div class="finished__icon-area-trash">
        <i class="fas fa-trash-alt trash-btn"></i>
      </div>
      <div class="finished__icon-area-cancel">
        <i class="fa fa-minus-circle cancel-btn"></i>
      </div>
    </div>`

    finishedList.appendChild(elementItem)
    todoList.removeChild(e.target.closest(`.List__${originType}-area-content`))
  } else if (originType === 'finished') {
    elementItem.innerHTML = `
    <div class="List__todo-area-content-text">${escapeHTML(elementStr)}</div>
    <div class="todo__icon-area">
      <div class="todo__icon-area-trash">
        <i class="fas fa-trash-alt trash-btn"></i>
      </div>
      <div class="todo__icon-area-check">
        <i class="fas fa-check-circle check-btn"></i>
      </div>
    </div>`

    todoList.appendChild(elementItem)
    finishedList.removeChild(e.target.closest(`.List__${originType}-area-content`))
  }
}

todoList.addEventListener('click', (e) => {
  // 此處為監聽待辦事項內的 垃圾桶 按鈕，讓待辦事項能被刪除
  if (e.target.classList.contains('trash-btn')) {
    removeItem(todoList, e, 'todo')
  } else if (e.target.classList.contains('check-btn')) {
    // 此處為監聽待辦事項內的 打勾 按鈕，讓待辦事項能被分類到完成事項區
    appendItem(e, 'todo', 'finished')
  }
})

finishedList.addEventListener('click', (e) => {
  // 此部分為監聽完成事項內的 垃圾桶 按鈕，讓完成事項能被刪除
  if (e.target.classList.contains('trash-btn')) {
    removeItem(finishedList, e, 'finished')
  } else if (e.target.classList.contains('cancel-btn')) {
    // 此部分為監聽完成事項內的 打勾 按鈕，讓完成事項能重新被分類到待辦事項區
    appendItem(e, 'finished', 'todo')
  }
})
