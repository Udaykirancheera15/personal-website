import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import './Button.scss';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  icon = null,
  iconPosition = 'right',
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      className={`btn ${variant}-btn ${className}`}
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ y: 0 }}
      {...props}
    >
      {iconPosition === 'left' && icon && (
        <span className="btn-icon">{icon}</span>
      )}
      
      {children}
      
      <div className="btn-shine"></div>
      
      {iconPosition === 'right' && icon && (
        <span className="btn-icon">{icon}</span>
      )}
    </motion.button>
  );
});

export default Button;
