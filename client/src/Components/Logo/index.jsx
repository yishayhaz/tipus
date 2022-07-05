import React from 'react';
import styles from './style.module.css';

export default function Logo(props) {
  const { url, alt } = props;
  return (
    <div className={styles.Logo}>
      {url ? (
        <img src={url} alt={alt} {...props}/>
      ) : (
        <span>{alt}</span>
      )}
    </div>
  )
}
