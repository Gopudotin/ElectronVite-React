import React, { useEffect, useState } from 'react'

const ScreenOne: React.FC = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    const fetchData = async () :Promise<void> => {
      const result = await window.api.getScreenOneData()
      setData(result)
    }

    fetchData()
  }, [])

  return (
    <div>
      <p id="screen-one">Screen One</p>
      <p>{data}</p>
    </div>
  )
}

export default ScreenOne;
