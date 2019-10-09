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
        newCode = '#' + convertedCode + originalCode.substring(3)
        break
      case 'green-input':
        newCode = '#' + originalCode.substring(1, 3) + convertedCode + originalCode.substring(5)
        break
      case 'blue-input':
        newCode = '#' + originalCode.substring(1, 5) + convertedCode
        break
    }

    return newCode
  }

  // Execution
  // 初始化為#000000(黑)
  background.style.backgroundColor = colorCode.textContent

  // 架設監聽器，判斷目標slidebar後，即時寫入RGB值，並調用codeAssemble函式組成色碼，顯示於畫面，再以顯示之色碼設定畫面背景色
  // 曾嘗試以change事件撰寫，但因為結果會在滑鼠左鍵釋放後才呈現，考量UX和題目示意動畫，改以input撰寫。
  presentPanel.addEventListener('input', event => {
    const newValue = Number(event.target.value)
    const caseName = event.target.classList[1]
    const originalCode = colorCode.textContent

    switch (caseName) {
      case 'red-input':
        redValue.textContent = newValue
        break
      case 'green-input':
        greenValue.textContent = newValue
        break
      case 'blue-input':
        blueValue.textContent = newValue
        break
    }

    colorCode.textContent = codeAssemble(originalCode, newValue, caseName)
    background.style.backgroundColor = colorCode.textContent
  })
})()