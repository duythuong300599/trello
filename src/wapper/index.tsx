import React from 'react';
import { Route, Routes } from 'react-router-dom';

import routes from '@/routes';

function Wrapper() {
  return (
    <Routes>
      {routes.map((route, index) => {
        const Layout = route.layout ?? React.Fragment;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <React.Fragment>
                <Layout>
                  <route.component />
                </Layout>
              </React.Fragment>
            }
          />
        );
      })}
    </Routes>
  );
}

export default Wrapper;
