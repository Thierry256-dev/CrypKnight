export default function CoinCard({
  name,
  price,
  marketCap,
  volume,
  priceChange,
  lastUpdated,
  image,
}) {
  return (
    <div className="grid grid-cols-6 gap-1 bg-black/10 items-center p-1 rounded-md">
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-10" />
        <h2>{name}</h2>
      </div>
      <p>${price}</p>
      <p>{marketCap}</p>
      <p>{volume}</p>
      <p className={`${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
        {priceChange}
      </p>
      <p>{lastUpdated}</p>
    </div>
  );
}
