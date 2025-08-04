import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './AnimatedCard.css';

const AnimatedCard = ({ 
  children, 
  className = '', 
  hoverEffect = 'lift',
  glowColor = '#e0284a',
  delay = 0,
  ...props 
}) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;

    // Entrance animation
    gsap.fromTo(card, 
      { 
        opacity: 0, 
        y: 30, 
        scale: 0.95 
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6, 
        delay: delay,
        ease: "power2.out" 
      }
    );

    // Hover animations
    const handleMouseEnter = () => {
      const tl = gsap.timeline();
      
      switch (hoverEffect) {
        case 'lift':
          tl.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          })
          .to(glow, {
            opacity: 0.6,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          }, 0);
          break;
          
        case 'tilt':
          tl.to(card, {
            rotationY: 5,
            rotationX: 5,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          })
          .to(glow, {
            opacity: 0.8,
            duration: 0.3,
            ease: "power2.out"
          }, 0);
          break;
          
        case 'glow':
          tl.to(glow, {
            opacity: 1,
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out"
          })
          .to(card, {
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out"
          }, 0);
          break;
          
        case 'bounce':
          tl.to(card, {
            y: -5,
            duration: 0.2,
            ease: "power2.out"
          })
          .to(card, {
            y: 0,
            duration: 0.2,
            ease: "bounce.out"
          });
          break;
          
        default:
          tl.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(glow, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Mouse move for tilt effect
    const handleMouseMove = (e) => {
      if (hoverEffect !== 'tilt') return;
      
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      gsap.to(card, {
        rotationY: deltaX * 10,
        rotationX: -deltaY * 10,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoverEffect, delay]);

  return (
    <div 
      ref={cardRef}
      className={`animated-card ${className}`}
      {...props}
    >
      <div 
        ref={glowRef}
        className="card-glow"
        style={{ 
          background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)` 
        }}
      />
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default AnimatedCard;
