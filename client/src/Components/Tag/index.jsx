import styles from './style.module.css';

function Tag(props){
  return (
    <label {...props} className={`${styles.Tag} ${styles[props.type]}`}>
      {props.children}
    </label>
  )
}

export default Tag;