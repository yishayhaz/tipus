import React from 'react';
import styles from './style.module.css';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { SearchIcon } from '../../ReSources/Icons'

export default function Filter(props) {
  return (
    <div className={styles.filter}>
      <Input
        placeholder="מסעדה"
        onChange={e => props.filterData(e.target.value)}
        autoFocus={true}
      />
      <Button
        type={'success'}
        style={{ marginRight: '10px' }}
      >
        <SearchIcon/>
      </Button>
    </div>
  )
}
