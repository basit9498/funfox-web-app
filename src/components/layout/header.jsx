import React from 'react';
import UserAvata from '../../assets/images/user.png';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import BarIcon from '../../assets/images/bar.svg';

const Header = ({ title, setOpenMenu, openMenu }) => {
  const { user, clearAll } = useUserContext();
  const navigation = useNavigate();
  return (
    <>
      <header className="header__section">
        <div className="top_header">
          <img
            role="button"
            onClick={() => {
              setOpenMenu(true);
            }}
            src={BarIcon}
            alt="icons"
          />
          <h1 className="title">{title}</h1>
        </div>
        <section className="avatar__section">
          <img src={UserAvata} alt="avatar" />
          <p
            className="title"
            onClick={() => {
              localStorage.removeItem('authToken');
              clearAll();
              navigation('/');
            }}
          >
            {user && user?.user?.name}
          </p>
        </section>
      </header>
    </>
  );
};

export default Header;
