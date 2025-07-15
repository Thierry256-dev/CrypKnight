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
    <div>
      <img src={image} alt="coin image" />
      <h2>{name}</h2>
      <p>{price}</p>
      <p>{marketCap}</p>
      <p>{volume}</p>
      <p>{priceChange}</p>
      <p>{lastUpdated}</p>
    </div>
  );
}
