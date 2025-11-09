import React, { useEffect, useRef, useState } from "react";
import flagImg from "../../../assets/argentine-flag-waving-gate-field-600nw-2479157283.png";
import trigo from "../../../assets/trigo.jpg";
import campo from "../../../assets/campo.jpg";

const images = [flagImg, trigo, campo];

const Carrusel = ({ autoPlay = true, autoPlayInterval = 4000 }) => {
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
    <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <img
                src={src}
                alt={`slide-${i}`}
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] object-cover"
                style={{ maxWidth: "100vw" }}
              />
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 focus:outline-none"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 focus:outline-none"
        >
          ›
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                clearInterval(timerRef.current);
                setIndex(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carrusel;
