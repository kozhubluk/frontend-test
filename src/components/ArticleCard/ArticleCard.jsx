import styles from './ArticleCard.module.css';
import { observer } from 'mobx-react-lite';

const ArticleCard = observer(({ title, snippet, link }) => {
  return (
    <a href={link} className={styles.article} target="_blank" rel="noreferrer">
      <div className={styles.title}>{title}</div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: snippet }}></div>
    </a>
  );
});

export default ArticleCard;
