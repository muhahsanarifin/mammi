import React from 'react'

import { useNavigate } from 'react-router-dom'

function PrivateRoute() {
  const navigate =useNavigate()
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute