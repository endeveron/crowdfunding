import { Outlet } from 'react-router-dom';

import { Sidebar } from 'components';

import './Layout.scss';

const Layout = () => {
  return (
    <div className="layout">
      <main className="main">
        <Outlet />
      </main>
      <Sidebar />
    </div>
  );
};

export { Layout };
