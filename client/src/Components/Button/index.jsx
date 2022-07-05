import React from 'react';
import styles from './style.module.css';

export default function Button(props) {
  return (
    <button {...props} className={`${styles.Button} ${styles[props.type]} ${styles[props.size]}`}>{props.children}</button>
  )
}
