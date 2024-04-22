"use client"

import '../(routes)/layout.scss'
import { logout } from '../__actions/authActions'

export default function () {
  return (
    <button onClick={() => logout()} className="logout">
      <img src="/unselected_icon/logout.svg" />
      Logg ut
    </button>
  )
}
