import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Logo, SignOutIcon } from 'assets';
import { SidebarIcon } from 'components';
import { navLinks } from 'data/navLinks';

import './Sidebar.scss';
import { useAuth } from 'features/auth';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

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
          <SidebarIcon
            className="tooltip"
            tooltip="Logout"
            imgUrl={SignOutIcon}
            onClick={() => logout()}
          />
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
