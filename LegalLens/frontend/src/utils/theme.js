export const useTheme = () => {
  const init = () => {
    const prefer = localStorage.getItem('theme') || 'dark'
    setTheme(prefer)
  }
  const setTheme = (t) => {
    const root = document.documentElement
    if(t === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', t)
  }
  const toggle = () => {
    const current = localStorage.getItem('theme') || 'dark'
    setTheme(current === 'dark' ? 'light' : 'dark')
  }
  return { init, setTheme, toggle }
}
export default useTheme
