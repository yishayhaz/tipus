import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './style.module.css';
import Card from '../../Components/Card';

export default function Content({ data, firstLoad }) {

  const GoTo = useNavigate();

  return (
    <div className={styles.container}>
      {data.map((item, i) =>
        <Card
          key={i}
          onClick={() => GoTo(`/restaurant/${item._id}`)}
          title={item.title}
          description={item.description}
          logo={item.logo}
          score={item.score}
          method={item.method}
          animate={firstLoad ? 'animate' : null}
        />
      )}
    </div>
  )
}
