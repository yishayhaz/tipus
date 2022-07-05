import React from 'react'
import styles from './style.module.css';
import { SadIcon, SmileIcon } from '../../ReSources/Icons';
import Tag from '../Tag';
import Logo from '../Logo';
import StarRating from '../StarRating';

export default function Card(props) {
  const { title, description, logo, score, method, animate } = props;
  return (
  <div {...props} className={styles.Card}>
    <div className={styles.Card_header}>
      <div>
        <Logo url={logo} alt={"Logo"} />
      </div>
      <div className={styles.Card_header_content}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
    <div className={styles.Card_body}>
      <StarRating starts={score} animate={animate} />
      <div className={styles.Tag}>
        {method ? (
          <Tag type={'error'}>
            {"תשלומים"}
            <SadIcon />
          </Tag>
        ) : (
          <Tag type={'success'}>
            {"טיפים"} 
            <SmileIcon />
          </Tag>
        )}
      </div>
    </div>
  </div>
  )
}
