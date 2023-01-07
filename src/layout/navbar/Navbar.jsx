import React from 'react'
import './navbar.scss'

import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import useApi from '../../hooks/useApi';

function Navbar(props) {

  const {isSidebarActive} = props
  const { data } = useApi("/api/user", "GET")

  return (
    <div className={isSidebarActive ? "navbar collapse" : "navbar"}>

      <div className="wrapper">

        <div className="displayname">
          <p>{data?.name}</p>
        </div>

        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon/>
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon/>
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon/>
          </div>
          <div className="item">
            <ListOutlinedIcon/>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Navbar