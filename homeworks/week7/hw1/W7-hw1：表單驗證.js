
const element = document.querySelector('form')
const inputName = document.querySelector('.form__body-name > input')
const inputMail = document.querySelector('.form__body-mail > input')
const inputCel = document.querySelector('.form__body-cel > input')
const inputType1 = document.querySelector('.form__body-type #type1')
const inputType2 = document.querySelector('.form__body-type #type2')
const inputHow = document.querySelector('.form__body-how > input')
const inputOthers = document.querySelector('.form__body-others > input')

// 如果輸入框內為空值時
element.addEventListener('submit', (e) => {
  if (!inputName.value) {
    e.preventDefault()
    document.querySelector('.form__body-name > .warning-text').style.color = 'red'
    // eval() 會執行() 內的 JS 代碼，也就是執行 inputName.focus() ，讓鼠標聚焦在輸入框
    inputName.focus()
  } else if (!inputMail.value) {
    e.preventDefault()
    document.querySelector('.form__body-mail > .warning-text').style.color = 'red'
    inputMail.focus()
  } else if (!inputCel.value) {
    e.preventDefault()
    document.querySelector('.form__body-cel > .warning-text').style.color = 'red'
    inputCel.focus()
  } else if (inputType1.checked !== true && inputType2.checked !== true) {
    e.preventDefault()
    document.querySelector('.form__body-type > .warning-text').style.color = 'red'
  } else if (!inputHow.value) {
    e.preventDefault()
    document.querySelector('.form__body-how > .warning-text').style.color = 'red'
    inputHow.focus()
  } else {
    let str = ''
    const type1Text = document.querySelector('.form__body-type .type1').innerText
    const type2Text = document.querySelector('.form__body-type .type2').innerText
    if (inputType1.checked === true) {
      str += type1Text
    } else if (inputType2.checked === true) {
      str += type2Text
    }

    alert(`
     暱稱：${inputName.value}

     電子郵件：${inputMail.value}

     手機號碼：${inputCel.value}

     報名類型：${str}

     怎麼知道這個活動的？：${inputHow.value}

     其它：${inputOthers.value}

    `)
  }
})

// 如果原本為空的輸入框填寫完

element.addEventListener('submit', (e) => {
  if (inputName.value) {
    document.querySelector('.form__body-name > .warning-text').style.color = '#ffffff'
  }

  if (inputMail.value) {
    document.querySelector('.form__body-mail > .warning-text').style.color = '#ffffff'
  }

  if (inputCel.value) {
    document.querySelector('.form__body-cel > .warning-text').style.color = '#ffffff'
  }

  if (inputType1.checked === true || inputType2.checked === true) {
    document.querySelector('.form__body-type > .warning-text').style.color = '#ffffff'
  }

  if (inputHow.value) {
    document.querySelector('.form__body-how > .warning-text').style.color = '#ffffff'
  }
})
