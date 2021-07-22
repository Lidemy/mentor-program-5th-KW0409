
const form = document.querySelector('form')
const mustInputs = document.querySelectorAll('.required .text')
const mustRadios = document.querySelectorAll('.required input[type=radio]')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let allFilled = true
  let minIndex = mustInputs.length
  const value = {}
  for (let i = 0; i < mustInputs.length; i++) {
    value[mustInputs[i].name] = mustInputs[i].value
    if (!mustInputs[i].value) { // 如果輸入框內為空值時
      mustInputs[i].parentNode.querySelector('.hide-text').classList.add('warning')
      allFilled = false
      if (i < minIndex) { // 聚焦在第一個其值為空的輸入框的效果
        minIndex = i
        mustInputs[minIndex].focus()
      }
    } else { // 如果輸入框內不為空值時
      mustInputs[i].parentNode.querySelector('.hide-text').classList.remove('warning')
    }
  }
  if (mustRadios[0].checked !== true && mustRadios[1].checked !== true) {
    mustRadios[0].parentNode.querySelector('.hide-text').classList.add('warning')
    allFilled = false
  }

  if (allFilled) {
    if (mustRadios[0].checked === true) {
      value[mustRadios[0].name] = document.querySelector('label.type1').innerText
    } else if (mustRadios[1].checked === true) {
      value[mustRadios[1].name] = document.querySelector('label.type1').innerText
    }

    const inputOthers = document.querySelector('.form__others > input')
    if (inputOthers.value === '') {
      value[inputOthers.name] = '未填寫'
    } else {
      value[inputOthers.name] = inputOthers.value
    }

    alert(`
    暱稱：${value.nickname}

    電子郵件：${value.email}

    手機號碼：${value.phone_number}

    報名類型：${value.category}

    怎麼知道這個活動的？ ${value.reason}

    其它建議：${value.advice}

    `)
  }
})
