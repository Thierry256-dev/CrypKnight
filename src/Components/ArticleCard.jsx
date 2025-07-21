export default function ArticleCard({ title, description, image, url }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-[100%] h-90 rounded-4xl"
          loading="lazy"
        />
      )}
      <div>
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="p-2 opacity-70">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="italic opacity-30"
        >
          ReadMore
        </a>
      </div>
    </div>
  );
}
