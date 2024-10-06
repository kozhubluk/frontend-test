import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
          Задание 1
        </NavLink>
        <NavLink to="/wiki" className={({ isActive }) => (isActive ? styles.active : '')}>
          Задание 2
        </NavLink>
        <NavLink to="/todo" className={({ isActive }) => (isActive ? styles.active : '')}>
          Задание 3
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
