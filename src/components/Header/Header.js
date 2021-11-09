import logo from '../../images/logo.svg'
import './Header.css'

function Header() {
  return(
    <header className="header">
      <img src={logo} alt="Логотип" />
    </header>
  )
}

export default Header;