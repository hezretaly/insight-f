function YtVideoComponent() {
  const videoId = "OpOJFUDcPWY"; //Replace with the actual video id. Extarct it from the URL

  return (
    <div className="mt-12 relative w-full pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0`} // autoplay=0 prevents autoplay
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YtVideoComponent;