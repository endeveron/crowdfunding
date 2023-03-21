import { Outlet } from 'react-router-dom';

import { Sidebar } from 'components';

import './Layout.scss';

const Layout = () => {
  return (
    <div className="layout">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };
