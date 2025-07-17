export default function ArticleCard({ title, description, image, url }) {
  return (
    <div className="flex gap-2 rounded-lg">
      {image && <img src={image} alt={title} className="w-50 rounded-4xl" />}
      <div>
        <h2 className="font-bold text-xl text-read/90">{title}</h2>
        <p className="p-2 text-read/70">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="italic text-read/30"
        >
          ReadMore
        </a>
      </div>
    </div>
  );
}
