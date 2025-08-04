import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './AnimatedButton.css';

const AnimatedButton = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  animation = 'ripple',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    
    const handleClick = (e) => {
      if (disabled || loading) return;
      
      // Create ripple effect
      if (animation === 'ripple' && rippleRef.current) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        gsap.set(rippleRef.current, {
          width: size,
          height: size,
          x: x,
          y: y,
          scale: 0,
          opacity: 0.6
        });
        
        gsap.to(rippleRef.current, {
          scale: 1,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      }
      
      // Button press animation
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
      
      if (onClick) onClick(e);
    };

    const handleMouseEnter = () => {
      if (disabled || loading) return;
      
      switch (animation) {
        case 'lift':
          gsap.to(button, {
            y: -3,
            duration: 0.3,
            ease: "power2.out"
          });
          break;
          
        case 'glow':
          gsap.to(button, {
            boxShadow: `0 8px 25px rgba(224, 40, 74, 0.4)`,
            duration: 0.3,
            ease: "power2.out"
          });
          break;
          
        case 'scale':
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
          break;
          
        default:
          gsap.to(button, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
      }
    };

    const handleMouseLeave = () => {
      if (disabled || loading) return;
      
      gsap.to(button, {
        y: 0,
        scale: 1,
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    button.addEventListener('click', handleClick);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('click', handleClick);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animation, disabled, loading, onClick]);

  const buttonClasses = [
    'animated-button',
    `btn-${variant}`,
    `btn-${size}`,
    disabled && 'btn-disabled',
    loading && 'btn-loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={buttonRef}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {animation === 'ripple' && (
        <span ref={rippleRef} className="button-ripple" />
      )}
      
      <span className="button-content">
        {loading && (
          <span className="button-spinner">
            <span className="spinner-dot"></span>
            <span className="spinner-dot"></span>
            <span className="spinner-dot"></span>
          </span>
        )}
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;
