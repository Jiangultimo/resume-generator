import styles from '@/styles/Loading.module.css'
import loadingImg from '@/public/source/loading.svg'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <img
        src={loadingImg.src}
        className={styles['loading-icon']}
        alt="loading"
      />
    </div>
  );
};

export default Loading
