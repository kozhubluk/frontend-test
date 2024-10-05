const ArticleCard = ({ title, snippet, link }) => {
  return (
    <div>
      <div>{title}</div>
      <dnpiv dangerouslySetInnerHTML={{ __html: snippet }}></dnpiv>
      <a href={link}>Сюда</a>
    </div>
  );
};

export default ArticleCard;
