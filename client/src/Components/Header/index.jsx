import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import SwitchButton from '../SwitchButton';
import { MenuIcon, CloseIcon } from '../../ReSources/Icons';

  
const root = document.documentElement.style;
const lightMode = () => {
  root.setProperty('--primaryBg', '#F0F2F5');
  root.setProperty('--secondaryBg', '#fff');
  root.setProperty('--primaryColor', '#333');
}

const darkMode = () => {
  root.setProperty('--primaryBg', '#18191A');
  root.setProperty('--secondaryBg', '#242526');
  root.setProperty('--primaryColor', '#ddd');
}

export default function Header() {
  const GoTo = useNavigate();

  const [mode, setMode] = useState(localStorage.getItem('mode') || 'dark');
  const [menu, setMenu] = useState(false);

  const Change = () => setMode(mode === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    setMenu(false);
  }, [GoTo]);

  useEffect(() => {
    if(mode === 'dark') {
      darkMode();
    } else if(mode === 'light') {
      lightMode();
    } else {
      lightMode();
      localStorage.setItem('mode', 'light');
    }
    localStorage.setItem('mode', mode);
  }, [mode]);

  return (
    <>
      <div className={styles.Header}>
        <div className={styles.Headline}>
          <h1>טיפוס</h1>
        </div>
        <div className={styles.Menu} onClick={() => setMenu(!menu)}>
          {menu ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
      <div className={`${styles.sideBar} ${menu ? styles.show : styles.hide}`}>
        <div className={styles.top}>
          <ul>
            <a onClick={() => GoTo('/')}>
              בית
            </a>
            <a onClick={() => GoTo('/restaurants')}>
              מסעדות
            </a>
            <a onClick={() => GoTo('/add/restaurant')}>
              הוספת מסעדה
            </a>
          </ul>
        </div>
        <div className={styles.bottom}>
          <ul>
            <a>
              <SwitchButton mode={mode} onChange={Change}/>
            </a>
          </ul>
        </div>
      </div>
    </>
  )
}
