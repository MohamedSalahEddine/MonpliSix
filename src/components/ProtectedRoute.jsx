import React from 'react'

import {isTokenValid} from "../utils/auth.js"
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
  return isTokenValid() ? children : <Navigate to={"/"} />
}