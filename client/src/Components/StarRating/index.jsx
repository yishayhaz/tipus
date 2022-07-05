import styles from './style.module.css';
import { StarIcon, HalfStarIcon } from '../../ReSources/Icons';

export default function StarRating({ starts, animate }) {
  return (
    <div
        className={`
          ${styles.Rating}
          ${animate ? styles.animate : null}
        `}
      >
        {Array(Math.floor(starts)).fill(0).map((item, i) => <StarIcon key={i}/>)}
        {String(starts).includes('.') ? <HalfStarIcon /> : null}
      </div>
  )
}
