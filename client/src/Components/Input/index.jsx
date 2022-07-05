import React from 'react'
import styles from './style.module.css';

export default function Input(props) {
  return (
    <input {...props} className={`${styles.Input} ${styles[props.status]}`}/>
  )
}
export function TextArea(props) {
  return <textarea {...props} className={`${styles.TextArea} ${styles[props.status]}`}></textarea>
}