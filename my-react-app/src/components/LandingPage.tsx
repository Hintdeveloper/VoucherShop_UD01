import { Button, Typography } from '@mui/material'
import '../styles/landingpage.scss'
import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <>
      <div className='container'>
        <div className='BG'>
          <Typography variant='h1' fontFamily='"Calistoga", serif'>WELCOME TO OUR VOUCHER SHOP</Typography>
          <Link to={'/login'}>
            <button className='loginBtn'>
              <span className="text">Get started</span>
            </button>

          </Link>

        </div>
      </div>

    </>
  )
}
