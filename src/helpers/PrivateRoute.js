import React from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = () => {
  const navigate = useNavigate()
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute