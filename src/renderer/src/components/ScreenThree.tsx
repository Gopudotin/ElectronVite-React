import React, { useEffect, useState } from 'react'

const ScreenThree: React.FC = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const result = await window.api.getScreenThreeData()
      setData(result)
    }

    fetchData()
  }, [])

  return (
    <div>
      <p id="screen-three">Screen Three</p>
      <p>{data}</p>
    </div>
  )
}

export default ScreenThree
