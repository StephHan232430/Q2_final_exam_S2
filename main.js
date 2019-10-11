(function () {
  const background = document.querySelector('.container')
  const presentPanel = document.querySelector('.item-wrapper')
  const redValue = document.querySelector('.red-parameter')
  const greenValue = document.querySelector('.green-parameter')
  const blueValue = document.querySelector('.blue-parameter')
  const colorCode = document.querySelector('.color-code')

  // RGB轉16進位，並判斷是否需補0
  function valueToCode(inputValue) {
    let value = inputValue
    let colorCode = value.toString(16)
    parseInt(colorCode, 16) < 16 ? colorCode = '0' + colorCode : colorCode = colorCode
    return colorCode
  }

  // 調用RGB/16進位轉換函式，並依slide-bar不同組合色碼
  function codeAssemble(originalCode, inputValue, caseName) {
    const convertedCode = valueToCode(inputValue)
    let newCode = ''
    switch (caseName) {
      case 'red-input':
      case 'red-parameter':
        newCode = '#' + convertedCode + originalCode.substring(3)
        break
      case 'green-input':
      case 'green-parameter':
        newCode = '#' + originalCode.substring(1, 3) + convertedCode + originalCode.substring(5)
        break
      case 'blue-input':
      case 'blue-parameter':
        newCode = '#' + originalCode.substring(1, 5) + convertedCode
        break
    }

    return newCode
  }

  // 因新增數值輸入欄位，檢查數值格式
  function checkParameter(target, newValue) {
    if (!isNaN(newValue) && newValue <= 255 && newValue >= 0) {
      target.previousElementSibling.children[0].children[1].value = newValue
      return newValue
    } else {
      while (true) {
        newValue = Number(prompt('please enter a number between 0~255: ', target.previousElementSibling.children[0].children[1].value))
        if (!isNaN(newValue) && newValue <= 255 && newValue >= 0) {
          target.value = newValue
          target.previousElementSibling.children[0].children[1].value = newValue
          return newValue
        }
      }
    }
  }

  // Execution
  // 初始化為#000000(黑)
  background.style.backgroundColor = colorCode.textContent

  // 架設監聽器，判斷目標slidebar後，即時寫入RGB值，並調用codeAssemble函式組成色碼，顯示於畫面，再以顯示之色碼設定畫面背景色
  // 曾嘗試以change事件撰寫，但因為結果會在滑鼠左鍵釋放後才呈現，考量UX和題目示意動畫，改以input撰寫。
  presentPanel.addEventListener('input', event => {
    const target = event.target
    let newValue = Number(event.target.value)
    const caseName = event.target.classList[0]
    const originalCode = colorCode.textContent


    switch (caseName) {
      case 'red-input':
        redValue.value = newValue
        break
      case 'green-input':
        greenValue.value = newValue
        break
      case 'blue-input':
        blueValue.value = newValue
        break
      case 'red-parameter':
      case 'green-parameter':
      case 'blue-parameter':
        newValue = checkParameter(target, newValue)
        break
    }

    colorCode.textContent = codeAssemble(originalCode, newValue, caseName)
    background.style.backgroundColor = colorCode.textContent
  })

  // 架設數值輸入欄位監聽器，以搭配CSS一起控制placeholder顯示時機
  presentPanel.addEventListener('focusin', event => {
    const inputField = event.target
    if (inputField.classList.contains('red-parameter')) {
      inputField.classList.remove('red-placeholder')
    } else if (inputField.classList.contains('green-parameter')) {
      inputField.classList.remove('green-placeholder')
    } else if (inputField.classList.contains('blue-parameter')) {
      inputField.classList.remove('blue-placeholder')
    }
  })

  presentPanel.addEventListener('focusout', event => {
    const inputField = event.target
    console.log(inputField.value)
    // console.log(inputField.placeholder)
    if (inputField.classList.contains('red-parameter') && inputField.value === '') {
      inputField.classList.add('red-placeholder')
    } else if (inputField.classList.contains('green-parameter') && inputField.value === '') {
      inputField.classList.add('green-placeholder')
    } else if (inputField.classList.contains('blue-parameter') && inputField.value === '') {
      inputField.classList.add('blue-placeholder')
    }
  })
})()