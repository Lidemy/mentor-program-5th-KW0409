
// 待辦事項區域
const todoList = $('.list__todo-area')
// 完成事項區域
const finishedList = $('.list__finished-area')

// 所有用到的 function 的集合
const utils = {
  // 將 list__input 裡的輸入加到待辦事項
  addTodo: () => {
    const input = $('.list__input')
    if (input.val() !== '') {
      const str = input.val()
      utils.appendItem('todo', str)
      input.val('')
    } else {
      alert('輸入處不可為空白，寫點東西啊 pok gai(撲街)！！')
    }
  },

  // 轉義字串的 function，避免出現奇怪的輸入
  escapeHTML: (unsafe) => unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;'),

  // 新增到待辦/完成事項的 template
  itemTemplate: (listType, str) => {
    let template
    if (listType === 'todo') {
      template = `
      <div class="list__todo-area-content">
        <div class="list__todo-area-content-text">${utils.escapeHTML(str)}</div>
        <div class="todo__icon-area">
          <i class="fas fa-edit edit-btn"></i>
          <i class="fas fa-trash-alt trash-btn"></i>
          <i class="fas fa-check-circle check-btn"></i>
        </div>
        <input class="hide list__todo-area-update-input" />
        <div class="hide todo__icon-area alt__icon">
          <i class="fas fa-undo restore-btn"></i>
        </div>
      </div>`
    } else {
      template = `
      <div class="list__finished-area-content">
        <div class="list__finished-area-content-text">${utils.escapeHTML(str)}</div>
        <div class="finished__icon-area">
          <i class="fas fa-edit edit-btn"></i>
          <i class="fas fa-trash-alt trash-btn"></i>
          <i class="fa fa-minus-circle cancel-btn"></i>
        </div>
        <input class="hide list__finished-area-update-input" />
        <div class="hide finished__icon-area alt__icon">
          <i class="fas fa-undo restore-btn"></i>
        </div>
      </div>`
    }
    return template
  },

  // 將事項添加到不同分類的 function
  appendItem: (ListType, itemStr) => {
    const item = utils.itemTemplate(ListType, itemStr)
    $(`.list__${ListType}-area`).append(item)
  },

  // 刪除待辦/完成事項的 function
  removeItem: (e, typeStr) => {
    $(e.target).closest(`.list__${typeStr}-area-content`).remove()
  },

  // 將事項移動到不同分類的 function
  moveItem: (e, originListType, transListType) => {
    const targetItem = $(e.target).closest(`.list__${originListType}-area-content`)
    const element = targetItem.find(`.list__${originListType}-area-content-text`)
    const elementStr = element.text()
    utils.removeItem(e, originListType)
    utils.appendItem(transListType, elementStr)
  },

  // 編輯待辦/完成事項的 function
  updateItem: (e, typeStr) => {
    const targetItem = $(e.target).closest(`.list__${typeStr}-area-content`)
    const targetContent = targetItem.find(`.list__${typeStr}-area-content-text`)
    const targetIcon = targetItem.find(`.${typeStr}__icon-area`)
    const targetInput = targetItem.find(`.list__${typeStr}-area-update-input`)
    const targetAltIcon = targetItem.find(`.${typeStr}__icon-area.alt__icon`)

    targetContent.addClass('hide')
    targetIcon.addClass('hide')
    targetInput.removeClass('hide')
    targetAltIcon.removeClass('hide')
    targetInput.val(`${targetContent.text()}`)

    $(targetInput).keypress((env) => {
      if (env.keyCode === 13) {
        switch (targetInput.val()) {
          case '':
            targetItem.remove()
            break
          default:
            // FIXME: 想問一下助教，這邊不知道為什麼，targetAltIcon.addClass('hide') 會沒作用
            // 用 devtool 的 console 可以看到 before 有印出，表示有抓到這個元素沒錯
            // targetAltIcon.addClass('hide') 之後，在 devtool 的 console 也可看到 after 有多了 hide 的 class
            // 但是在 devtool 的 element 上看卻是沒有加上 hide，很奇怪
            console.log('before:', targetAltIcon)
            targetAltIcon.addClass('hide')
            console.log('after:', targetAltIcon)
            targetInput.addClass('hide')
            targetContent.removeClass('hide')
            targetIcon.removeClass('hide')
            targetContent.text(`${targetInput.val()}`)
        }
      }
    })
  },

  // 恢復編輯前的待辦/完成事項的 function
  restoreItemContent: (e, typeStr) => {
    const targetItem = $(e.target).closest(`.list__${typeStr}-area-content`)
    const targetContent = targetItem.find(`.list__${typeStr}-area-content-text`)
    const targetInput = targetItem.find(`.list__${typeStr}-area-update-input`)

    targetInput.val(`${targetContent.text()}`)
  },

  // 切換顯示的事項的 function(同時切換清除的顯示字樣)
  display: (isShow, chosen) => {
    $(`.display__btn-${isShow}`).removeClass('selected')
    $(`.display__btn-${chosen}`).addClass('selected')

    const displayArr = []
    let clearText
    switch (chosen) {
      case 'todo':
        displayArr.push('show', 'hide', 'hide')
        clearText = '清除待辦'
        break
      case 'finished':
        displayArr.push('hide', 'hide', 'show')
        clearText = '清除完成'
        break
      default: // case 'all':
        displayArr.push('show', 'show', 'show')
        clearText = '清除全部'
    }
    $('.list__todo-body')[displayArr[0]]()
    $('.first__hr')[displayArr[1]]()
    $('.list__finished-body')[displayArr[2]]()
    $('.clear__btn').text(`${clearText}`)
  },

  // 將 todo list 的所有事項都變成一個 array
  itemsData: (target) => {
    const items = $(`.list__${target}-area-content-text`)
    const itemsData = []
    for (let i = 0; i < items.length; i++) {
      itemsData.push($(items[i]).text())
    }
    return itemsData
  },

  // 按下儲存將 todo-list 寫入資料庫後，在資料庫取得時間資訊並顯示出來
  getInform: (createdAt, updatedAt) => {
    $('.list__inform-area').fadeIn(1000)
    $('.list__created-at').text(`建立時間：${createdAt}`)
    $('.list__updated-at').text(`更新時間：${updatedAt}`)
    $('.list__url').text(`網址：${window.location.href}`)
  },

  // 串接 get API 來取得 id 為 URL 中的 id 參數值的 todo list 資料
  getListDataAPI: (password, listId, cb) => {
    const reqURL = `http://mentor-program.co/mtr04group1/KWang/Week12/W12-hw2/W12_hw2_Todo_List_api_get.php?id=${listId}`

    // 如果有傳 password，表示是有上鎖的 todo list 第二次撈資料
    if (password) {
      $.ajax({
        method: 'POST',
        url: reqURL,
        data: { password },
        success: (resp) => {
          if (!resp.status) {
            alert(resp.message)
            return
          }

          const listData = resp.list_data
          cb(null, listData)
        },
        error: (err) => {
          alert('Error')
          console.log(err)
        }
      })
    } else {
      // 第一次撈資料都先執行這邊
      $.ajax({
        type: 'GET',
        url: reqURL,
        success: (resp) => {
          if (!resp.status) {
            alert(resp.message)
            return
          }

          if (resp.status === 'need password') {
            // todo list 有上鎖
            alert(resp.message)
            cb(true, listId)
            return
          }

          // todo list 沒上鎖
          const listData = resp.list_data
          cb(null, listData)
        },
        error: (err) => {
          alert('Error')
          console.log(err)
        }
      })
    }
  },

  // 處理取得的 listData 的 function
  handleListData: (password, listData) => {
    if (password) {
      // 若 password 是 true，表示要輸入密碼，此時的 listData 就是 listId
      $('.list__wrapper').addClass('hide')
      $('.password__form').removeClass('hide')
      $('.password__btn').click((e) => {
        e.preventDefault()
        const inputVal = $('.password__input').val()
        $('.unlock__mode').addClass('hide')
        $('.lock__locked-mode').removeClass('hide')
        $('.input__area').val(`${$('.password__input').val()}`)
        utils.getListDataAPI(inputVal, listData, utils.handleListData)
      })
    } else {
      if (listData.password) {
        alert('密碼認證成功！')
        $('.list__wrapper').removeClass('hide')
      }
      $('.password__form').remove()

      const listContent = JSON.parse(listData.list_content)
      const todos = listContent.todoData
      const finisheds = listContent.finishedData
      todos.forEach((todo) => {
        utils.appendItem('todo', todo)
      })
      finisheds.forEach((finished) => {
        utils.appendItem('finished', finished)
      })
      utils.getInform(listData.created_at, listData.updated_at)
    }
  },

  // 將 todo list 的資料 post 到 api_post 去
  addListDataAPI: (listId) => {
    const reqURL = 'http://mentor-program.co/mtr04group1/KWang/Week12/W12-hw2/W12_hw2_Todo_List_api_add.php'
    const listContent = {
      todoData: utils.itemsData('todo'),
      finishedData: utils.itemsData('finished')
    }

    let listPassword = $('.input__area').val()
    if (listPassword === '') {
      listPassword = null
    }

    $.ajax({
      method: 'POST',
      url: reqURL,
      data: {
        list_id: listId,
        list_content: JSON.stringify(listContent),
        password: listPassword
      },
      dataType: 'text'
    })
      .done((resp) => {
        if (resp[0] === '{') {
          const data = JSON.parse(resp)
          if (!data.status) {
            alert(data.message)
            return
          }

          const listId = data.id
          // 用 window.history.pushState 來改變當前頁面的 URL，這樣儲存的時候，才不會無限加上 ?id
          // 方法參考自 https://www.codenong.com/22753052/
          window.history.pushState({}, document.location, '?' + `id=${listId}`)
          window.location = $(location).attr('href')
          // 用 js 的 window.location.href 或 jQuery 的 $(location).attr('href')
          // 都可以取得當前頁面的 URL(但會包含參數)
          // 方法參考自 https://www.delftstack.com/zh-tw/howto/jquery/how-to-get-current-url-in-jquery/
        } else {
          console.log('Error:', resp)
        }
      })
      .fail((resp) => {
        console.log('Connect Error:', resp)
      })
  }
}

// todo list 功能
$(document).ready(() => {
  // 預設 todo list icon 的狀態
  let listMode = 'unlock'

  // URL 中的 ? 後面必須要有值，window.location.search 才會把 ? 以後(包含 ?)的數值都變成 string 印出來
  // 或是用 jQuery 的 $(location).attr('search') 也可以做到相同的事
  // 若沒有 ? 存在(或只有 ? 存在)，都只會印出 ''(空字串)
  const searchParams = new URLSearchParams(window.location.search)
  // 不管 URL 中有沒有 params，searchParams 都會是一個 obj

  // 如果完全沒有 id 這個 params，searchParams.get('id') 會是 null
  // 如果有 id 這個 params 但沒有賦值，則 searchParams.get('id') 會是 ''(空字串)
  // 先宣告 listId 讓下面的 storage__btn 能接收到
  let listId
  if (searchParams.get('id')) {
    listId = searchParams.get('id')
    utils.getListDataAPI(null, listId, utils.handleListData)
    // FIXME: 這邊想問一下助教，因爲想不太到什麼好的方法用來判斷這個 todo list 是否上鎖
    // 來決定要不要改變 listMode 的值，所以就用了判斷是否有點擊 password__btn 這個感覺不太好的方法
    // 雖然是有加上如果沒上鎖或輸入完密碼或 url 中沒有 id，就移除掉整個 password__form 的機制
    // 防止使用者影響這個判斷的機制，但就是感覺好像不太對勁(?)
    // 還是說直接在 url 多設置一個參數 mode 讓前後端去判斷，這樣會比較好嗎？
    $('.password__btn').click(() => {
      listMode = 'locked'
    })
  } else {
    // 若 url 中沒有 id，就直接移除 password__form
    $('.password__form').remove()
  }

  // 上鎖/解鎖的功能
  $('.list__mode-area').click((e) => {
    // 當點擊上鎖/解鎖圖示時
    if ($(e.target).hasClass('unlock__icon') || $(e.target).hasClass('lock__icon')) {
      if ($('.lock__waiting-mode').hasClass('hide') && $('.lock__locked-mode').hasClass('hide')) {
        // listMode = unlock 或 input 時
        $('.unlock__mode').toggleClass('hide')
        $('.lock__input-mode').toggleClass('hide')
        $('.input__area').val('')
        if ($('.lock__input-mode').hasClass('hide')) {
          listMode = 'unlock'
        } else {
          listMode = 'input'
        }
      } else {
        // listMode = waiting 或 locked 時，點擊圖示會取消上鎖並將輸入框的值歸零
        $('.input__area').val('')
        $('.lock__waiting-mode').addClass('hide')
        $('.lock__locked-mode').addClass('hide')
        $('.unlock__mode').removeClass('hide')
        listMode = 'unlock'
      }
    }

    // 當點擊確認上鎖時
    if ($(e.target).hasClass('lock__btn')) {
      switch ($('.input__area').val()) {
        case '':
          $('.unlock__mode').removeClass('hide')
          $('.lock__input-mode').addClass('hide')
          listMode = 'unlock'
          break
        default: // case !== ''
          $('.lock__input-mode').addClass('hide')
          $('.lock__waiting-mode').removeClass('hide')
          listMode = 'waiting'
      }
    }
  })

  // 將輸入框的內容加入待辦事項(點擊)
  $('.list__input-add-btn').click(() => {
    utils.addTodo()
  })
  // 將輸入框的內容加入待辦事項(Enter)
  $('.list__input').keypress((e) => {
    if (e.key === 'Enter') {
      utils.addTodo()
    }
  })

  // 待辦事項區域的編輯, 刪除, 標記完成功能
  todoList.click((e) => {
    // 待辦事項的編輯功能
    if ($(e.target).hasClass('edit-btn')) {
      utils.updateItem(e, 'todo')
    } else if ($(e.target).hasClass('restore-btn')) {
    // 編輯待辦事項時的恢復功能
      utils.restoreItemContent(e, 'todo')
    } else if ($(e.target).hasClass('trash-btn')) {
    // 待辦事項的刪除功能
      utils.removeItem(e, 'todo')
    } else if ($(e.target).hasClass('check-btn')) {
    // 待辦事項的標記完成功能
      utils.moveItem(e, 'todo', 'finished')
    }
  })

  // 完成事項區域的編輯, 刪除, 標記未完成功能
  finishedList.click((e) => {
    // 完成事項的編輯功能
    if ($(e.target).hasClass('edit-btn')) {
      utils.updateItem(e, 'finished')
    } else if ($(e.target).hasClass('restore-btn')) {
    // 編輯完成事項時的恢復功能
      utils.restoreItemContent(e, 'finished')
    } else if ($(e.target).hasClass('trash-btn')) {
    // 完成事項的刪除功能
      utils.removeItem(e, 'finished')
    } else if ($(e.target).hasClass('cancel-btn')) {
    // 完成事項的標記未完成功能
      utils.moveItem(e, 'finished', 'todo')
    }
  })

  let isShow = 'all'
  // 切換顯示事項的功能
  $('.display__btn-list').click((e) => {
    if ($(e.target).hasClass('display__btn-all')) {
      const chosen = 'all'
      utils.display(isShow, chosen)
      isShow = `${chosen}`
    } else if ($(e.target).hasClass('display__btn-todo')) {
      const chosen = 'todo'
      utils.display(isShow, chosen)
      isShow = `${chosen}`
    } else if ($(e.target).hasClass('display__btn-finished')) {
      const chosen = 'finished'
      utils.display(isShow, chosen)
      isShow = `${chosen}`
    }
  })

  // 清除全部/待辦/完成的所有事項的功能
  $('.clear__btn').click(() => {
    switch (isShow) {
      case 'todo':
        $('.list__todo-area-content').remove()
        break
      case 'finished':
        $('.list__finished-area-content').remove()
        break
      default: // case 'all':
        $('.list__todo-area-content').remove()
        $('.list__finished-area-content').remove()
    }
  })

  // 儲存 todo list 的功能
  $('.storage__btn').click(() => {
    if (listMode === 'unlock' || listMode === 'input') {
      // 若儲存時，是未上鎖狀態或存在上鎖密碼的輸入框，則跳提示框
      const yes = confirm('您的 todo list 並未上鎖，是否要上鎖？')
      if (yes) {
        if (listMode === 'unlock') {
          // 未上鎖狀態時，先進入 input 狀態
          $('.unlock__icon').click()
        }
        // 存在上鎖密碼的輸入框或從 unlock 變 input 後
        $('.input__area').focus()
      } else {
        if (listMode === 'input') {
          // 存在上鎖密碼的輸入框時，先跳回 unlock 狀態
          $('.lock__icon').click()
        }
        // 若是未上鎖狀態就傳資料
        utils.addListDataAPI(listId)
      }
      return
    } else if (listMode === 'waiting') {
      // 若儲存時，為等待儲存後上鎖的狀態時，則跳到已上鎖狀態
      $('.lock__waiting-mode').addClass('hide')
      $('.lock__locked-mode').removeClass('hide')
    }
    utils.addListDataAPI(listId)
  })
})
