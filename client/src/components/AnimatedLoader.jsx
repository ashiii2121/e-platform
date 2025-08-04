import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AnimatedLoader.css';

const AnimatedLoader = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Loading...', 
  showText = true 
}) => {
  const loaderRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const dots = dotsRef.current;
    
    // Create a timeline for the loading animation
    const tl = gsap.timeline({ repeat: -1 });
    
    // Animate dots in sequence
    tl.to(dots, {
      scale: 1.5,
      backgroundColor: '#e0284a',
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.out"
    })
    .to(dots, {
      scale: 1,
      backgroundColor: '#667eea',
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.2");

    // Rotate the entire loader
    gsap.to(loaderRef.current, {
      rotation: 360,
      duration: 2,
      ease: "none",
      repeat: -1
    });

    return () => {
      tl.kill();
    };
  }, []);

  const sizeClass = `loader-${size}`;
  const colorClass = `loader-${color}`;

  return (
    <div className={`animated-loader ${sizeClass} ${colorClass}`}>
      <div className="loader-container" ref={loaderRef}>
        <div className="loader-dots">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="loader-dot"
              ref={el => dotsRef.current[index] = el}
              style={{
                transform: `rotate(${index * 45}deg) translateY(-20px)`
              }}
            />
          ))}
        </div>
      </div>
      {showText && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default AnimatedLoader;
