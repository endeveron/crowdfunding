import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Logo, SunIcon } from 'assets';
import { SidebarIcon } from 'components';
import { navLinks } from 'data/navLinks';

import './Sidebar.scss';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('dashboard');

  useEffect(() => {
    const path = location.pathname;
    if (path) {
      const navLink = navLinks.find((item) => item.link === path);
      if (navLink) setActive(navLink.name);
    }
  }, [location]);

  return (
    <div className="sidebar">
      <Link to="/">
        <Logo />
      </Link>

      <div className="sidebar__content">
        <div className="sidebar__content__main">
          {navLinks.map((item) => (
            <SidebarIcon
              key={item.name}
              {...item}
              active={active === item.name}
              onClick={() => {
                if (!item.disabled) {
                  setActive(item.name);
                  navigate(item.link);
                }
              }}
            />
          ))}
        </div>
        <div className="sidebar__content__bottom">
          <SidebarIcon imgUrl={SunIcon} />
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
