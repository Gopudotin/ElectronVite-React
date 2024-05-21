import React, { useState } from 'react'

const SaveText: React.FC = () => {
  const [inputValue, setInputValue] = useState('')

  const handleSaveText = (): void => {
    window.api.appendText(inputValue)
    console.log('Text saved:', inputValue) // Log for debugging purposes
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputValue(event.target.value)
  }

  return (
    <div>
      <textarea id="mytext" rows="10" cols="30" value={inputValue} onChange={handleInputChange} />
      <br />
      <button onClick={handleSaveText} id="mybutton">
        Save Text
      </button>
    </div>
  )
}

export default SaveText
