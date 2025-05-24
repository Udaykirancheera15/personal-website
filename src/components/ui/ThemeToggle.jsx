import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button 
      className="theme-toggle"
      onClick={toggleTheme}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      whileHover={{ y: -3, rotate: 15 }}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </motion.button>
  );
};

export default ThemeToggle;
