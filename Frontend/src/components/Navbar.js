import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './styles/Navbar.scss'

const Navbar = () => {
  return (
    <div className='ent'>
      <Container className='sum'>
        <div className="logo">
          <Link to='/'>Epic Rap Battle</Link>
        </div>
        <nav className="item">
          <ul className='ul'>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/rank'>Rank</Link>
            </li>
            <li>
              <Link to='/game'>Game Start</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  )
}

export default Navbar