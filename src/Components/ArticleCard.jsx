export default function ArticleCard({ title, description, image }) {
  return (
    <div>
      <h2>{title}</h2>
      <img src={image} alt="" />
      <p>{description}</p>
    </div>
  );
}
