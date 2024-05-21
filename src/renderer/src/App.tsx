import React, { useState } from 'react'

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState('')

  const handleSendIPC = (): void => {
    window.electron.ipcRenderer.send('ping', inputValue)
  }

  const handleSaveText = (): void => {
    window.api.appendText(inputValue)
    // window.electron.ipcRenderer.send('saveText', inputValue);
    console.log('Text saved:', inputValue) // Log for debugging purposes
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputValue(event.target.value)
  }

  return (
    <>
      <textarea id="mytext" rows="10" cols="30" value={inputValue} onChange={handleInputChange} />
      <br />
      <div>
        <button onClick={handleSendIPC}>Send IPC</button>
        <button onClick={handleSaveText} id="mybutton">
          Save Text
        </button>
      </div>
    </>
  )
}

export default App
