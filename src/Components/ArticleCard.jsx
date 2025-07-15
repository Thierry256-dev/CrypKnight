export default function ArticleCard({ title, description, image }) {
  return (
    <div>
      {image && <img src={image} alt={title} />}
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
