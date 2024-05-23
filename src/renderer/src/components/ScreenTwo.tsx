import React, { useEffect, useState } from 'react'
import SaveText from './SaveText'

const ScreenTwo: React.FC = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const result = await window.api.getScreenTwoData()
      setData(result)
    }

    fetchData()
  }, [])

  return (
    <div>
      <p id="screen-two">Screen Two</p>
      <p>{data}</p>
      <SaveText/>
    </div>
  )
}

export default ScreenTwo
