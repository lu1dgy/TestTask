import styles from './Button.module.css';
export default function Button(props: any) {
  const { children, disabled = false } = props;
  return (
    <button {...props} className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
}
