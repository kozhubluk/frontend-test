import { memo } from 'react';
import styles from './ArticleCard.module.css';

const ArticleCard = memo(({ title, snippet, link }) => {
  return (
    <a href={link} className={styles.article} target="_blank" rel="noreferrer">
      <div className={styles.title}>{title}</div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: snippet }}></div>
    </a>
  );
});

export default ArticleCard;
