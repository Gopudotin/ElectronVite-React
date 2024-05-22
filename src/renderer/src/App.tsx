import React from 'react'
import SaveText from './components/SaveText'

function App(): JSX.Element {
  const handleSendIPC = (): void => {
    window.electron.ipcRenderer.send('ping')
  }

  return (
    <>
      {/* <SaveText />
      <br />
      <button onClick={handleSendIPC}>Send IPC</button> */}
    </>
  )
}

export default App
