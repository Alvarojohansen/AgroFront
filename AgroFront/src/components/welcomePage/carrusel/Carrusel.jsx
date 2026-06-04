import React, { useEffect, useRef, useState } from "react";
import flagImg from "../../../assets/siembra.png";
import trigo from "../../../assets/trigo2.jpg";
import campo from "../../../assets/campo.jpg";

const images = [flagImg, trigo, campo];

const Carrusel = ({ autoPlay = true, autoPlayInterval = 5000 }) => {
  const [index, setIndex] = useState(0);
  const length = images.length;
  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, autoPlayInterval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, autoPlayInterval, length]);

  const prev = () => {
    clearInterval(timerRef.current);
    setIndex((i) => (i - 1 + length) % length);
  };
  
  const next = () => {
    clearInterval(timerRef.current);
    setIndex((i) => (i + 1) % length);
  };

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <div className="w-full h-full overflow-hidden relative">
        {/* Contenedor de las imágenes */}
        <div
          className="flex w-full h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="min-w-full h-full flex-shrink-0">
              <img
                src={src}
                alt={`slide-${i}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Controles: Prev / Next */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-3 focus:outline-none transition-all z-20 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-3 focus:outline-none transition-all z-20 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                clearInterval(timerRef.current);
                setIndex(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index ? "bg-white w-8" : "bg-white/50 w-2.5 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carrusel;
