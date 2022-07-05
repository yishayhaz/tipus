import styles from './style.module.css';

export default function SwitchButton({ mode, onChange }) {
  return (
    <div className={styles.btn} onClick={onChange}>
      <div
        className={`${styles.switch} ${mode === "light" ? styles.right : styles.left}`}
      >
      </div>
      <div>🌛</div>
      <div>🌞</div>
    </div>
  )
}
