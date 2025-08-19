import React from 'react'
import { useState } from 'react'
import useTheme from '../utils/theme'

export default function ThemeToggle(){
  const { toggle } = useTheme()
  const [t, setT] = useState(localStorage.getItem('theme') || 'dark')
  const onClick = () => { toggle(); setT(localStorage.getItem('theme')) }
  return (
    <button onClick={onClick} className="px-3 py-1 border rounded">
      {t === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
