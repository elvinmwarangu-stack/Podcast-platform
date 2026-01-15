export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-6">About PodWave</h1>
      <div className="bg-gray-800 rounded-lg p-8 space-y-6 text-gray-300">
        <p className="text-lg">
          PodWave is a modern podcast streaming platform designed to connect listeners with amazing audio content from creators around the world.
        </p>
        <h2 className="text-2xl font-bold text-white mt-8">Our Mission</h2>
        <p>
          We believe in the power of audio storytelling and aim to provide a seamless platform where creators can share their voices and listeners can discover content that inspires, educates, and entertains.
        </p>
        <h2 className="text-2xl font-bold text-white mt-8">What We Offer</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>High-quality audio streaming</li>
          <li>Easy podcast discovery across multiple categories</li>
          <li>Simple upload process for creators</li>
          <li>Community engagement through comments and favorites</li>
          <li>Free access to thousands of podcasts</li>
        </ul>
      </div>
    </div>
  );
}
