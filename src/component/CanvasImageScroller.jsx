import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CanvasImageScroller = ({ isCar }) => {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const frames = {
      currentIndex: 0,
      maxIndex: isCar ? 442 : 2552,
    };
    let imagesLoaded = 0;
    const images = [];

    function preloadImages() {
      for (let i = 0; i <= frames.maxIndex; i++) {
        const imgUrl = `/${isCar ? "car" : "porsce"}/frame_${String(i + 1).padStart(4, "0")}.jpeg`;
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
          imagesLoaded++;
          if (imagesLoaded === frames.maxIndex) {
            setLoading(false); // Hide loader when images are loaded
            loadImage(frames.currentIndex);
            startAnimation();
          }
        };
        images.push(img);
      }
    }

    function loadImage(index) {
      if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index;
      }
    }

    function startAnimation() {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".parent",
          start: "top top",
          scrub: 1,
        },
      }).to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: function () {
          loadImage(Math.floor(frames.currentIndex));
        },
      });
    }

    preloadImages();
  }, [isCar]);

  return (
    <>
      {loading && (
        <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
          <div className="loader"></div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-screen" id="frame" />
    </>
  );
};

export default CanvasImageScroller;
