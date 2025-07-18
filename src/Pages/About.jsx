export default function About() {
  return (
    <div className="w[100%] h-screen p-8">
      <div className="flex flex-col items-items w-[100%] mx-auto p-8 bg-secondary/10 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-accent text-center">
          About CryptoKnight
        </h1>
        <p className="mb-4 text-lg text-read/80">
          CryptoKnight is your all-in-one dashboard for tracking cryptocurrency
          markets, global stats, trending coins and NFTs, and the latest news in
          the crypto world.
        </p>
        <h2 className="text-2xl text-read font-semibold mt-6 mb-2">Features</h2>
        <ul className="list-disc ml-6 mb-4 text-read/80">
          <li>Live price charts and candlestick graphs for top coins</li>
          <li>Global market statistics and exchange information</li>
          <li>Trending coins and NFTs updated in real-time</li>
          <li>Latest crypto news headlines from trusted sources</li>
        </ul>
        <h2 className="text-2xl text-read font-semibold mt-6 mb-2">
          Our Mission
        </h2>
        <p className="mb-4 text-read/80">
          We aim to make crypto data accessible, clear, and actionable for
          everyone—from beginners to seasoned traders. CryptoKnight brings
          together essential information so you can make informed decisions in
          the fast-moving world of digital assets.
        </p>
        <h2 className="text-xl mt-6 mb-2 text-read/80">
          Contact: <strong>+256702792026</strong>
        </h2>
        <p className="text-read/50">Developed by Thierry.</p>
      </div>
    </div>
  );
}
