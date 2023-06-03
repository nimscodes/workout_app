import React from 'react'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material'
import Logo from '../assets/images/Logo.png'

const Navbar = () => {
  return (
    <Stack direction='row'
    justifyContent='space-around'
    sx={{
      gap : {
        xs: '40px',
        sm: '122px',
      },
      mt : {
        xs: '20px',
        sm: '32px',
      },
      justifyContent: 'none'
    }}>
      <Link to="/">
        <img src={Logo} alt="logo" 
          style={{ width: '48px', height: '48px', margin: '0 20px' }}
        />
      </Link>
      <Stack 
      direction='row'
      gap='40px'
      alignItems="flex-end">
        <Link style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #FF2625'}} to="/">Home</Link>
        <a style={{ textDecoration: 'none', color: '#3A1212'}} href="#exercises">Exercises</a>
      </Stack>
    </Stack>
  )
}

export default Navbar