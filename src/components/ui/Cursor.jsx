import { useEffect, useRef } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';
import './Cursor.scss';

const Cursor = () => {
  const { position, isHovering } = useMousePosition();
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const updateCursorPosition = () => {
      const { x, y } = position;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    updateCursorPosition();

    // Add hover class to outline when hovering over links
    if (outlineRef.current) {
      if (isHovering) {
        outlineRef.current.classList.add('hover');
      } else {
        outlineRef.current.classList.remove('hover');
      }
    }
  }, [position, isHovering]);

  // Add link-hover class to all interactive elements
  useEffect(() => {
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    
    interactiveElements.forEach(el => {
      el.classList.add('link-hover');
    });
    
    return () => {
      interactiveElements.forEach(el => {
        el.classList.remove('link-hover');
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-outline" ref={outlineRef}></div>
    </>
  );
};

export default Cursor;
