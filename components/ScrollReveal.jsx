// components/ScrollReveal.tsx
"use client";

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span
          className="word inline-block mr-1"
          key={index}
          style={{
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : 'none'
          }}
        >
          {word}
        </span>
      );
    });
  }, [children, baseOpacity, blurStrength, enableBlur]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Tentukan scroller
    const scroller = scrollContainerRef?.current
      ? scrollContainerRef.current
      : window;

    // Clear existing ScrollTriggers untuk elemen ini
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === el) {
        trigger.kill();
      }
    });

    // Rotation animation
    gsap.fromTo(
      el,
      {
        transformOrigin: '0% 50%',
        rotation: baseRotation,
      },
      {
        rotation: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=100',
          end: 'bottom top+=100',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      }
    );

    const wordElements = el.querySelectorAll('.word');

    if (wordElements.length > 0) {
      // Opacity animation untuk words
      gsap.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          willChange: 'opacity',
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          stagger: 0.02,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=50%',
            end: 'bottom top',
            scrub: 0.5,
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Blur animation
      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          {
            filter: `blur(${blurStrength}px)`,
            scale: 0.9
          },
          {
            filter: 'blur(0px)',
            scale: 1,
            ease: 'power2.out',
            stagger: 0.02,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom-=50%',
              end: 'bottom top',
              scrub: 0.5
            }
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <h2
      ref={containerRef}
      className={`scroll-reveal ${containerClassName} font-sans`}
      style={{
        opacity: 1.5,
        transform: `rotate(${baseRotation}deg)`
      }}
    >
      <div className={`scroll-reveal-text ${textClassName}`}>
        {splitText}
      </div>
    </h2>
  );
};

export default ScrollReveal;