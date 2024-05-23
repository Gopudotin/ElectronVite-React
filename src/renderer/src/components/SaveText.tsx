import React, { useState } from 'react'

const numsRows=10;
const numsCols=30;

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
      <textarea id="mytext" rows={numsRows} cols={numsCols} value={inputValue} onChange={handleInputChange} />
      <br />
      <button onClick={handleSaveText} id="mybutton">
        Save Text
      </button>
    </div>
  )
}

export default SaveText
