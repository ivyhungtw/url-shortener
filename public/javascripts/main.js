// Variables
const copyBtn = document.querySelector('#copyBtn')
const textArea = document.querySelector('#textArea')

// Event listeners
copyBtn.addEventListener('click', event => {
  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand('copy')
    const msg = successful ? 'successful' : 'unsuccessful'
    console.log('Copying text command was ' + msg)
  } catch (err) {
    console.log('Oops, unable to copy')
  }
})
