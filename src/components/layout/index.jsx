import React, { useState } from 'react';
import Header from './header';
import Aside from './aside';

const Index = ({ children, title }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <main className="layout__main">
        <Aside openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <section className="layout__body__main">
          <Header title={title} openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <section className="body__section">{children}</section>
        </section>
      </main>
    </>
  );
};

export default Index;
