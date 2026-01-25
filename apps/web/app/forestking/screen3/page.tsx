export default function ForestKingScreen3Page() {
  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        loop
        controls={false}
        preload="auto"
      >
        {/* Prefer the requested filename if it exists, fall back to the actual file in /public */}
        <source src="/display/forestking/@screen3.mp4" type="video/mp4" />
        <source src="/display/forestking/screen3.mp4" type="video/mp4" />
      </video>
    </div>
  );
}


