import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SignOutIcon } from 'assets';
import { SidebarIcon } from 'components';
import { navLinks } from 'data/navLinks';
import { useAuth } from 'features/auth';

import './Sidebar.scss';

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
      <div className="sidebar__main">
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
      <div className="sidebar__footer">
        <SidebarIcon
          className="tooltip"
          tooltip="Logout"
          imgUrl={SignOutIcon}
          onClick={() => logout()}
        />
      </div>
    </div>
  );
};

export { Sidebar };
