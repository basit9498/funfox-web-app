import React, { useState } from 'react';
import Logo from '../../assets/images/logo.png';
import TaskIcon from '../../assets/images/task.svg';
import Button from '../Button';
import ModalBox from '../ModalBox/ModalBox';
import ModalHeader from '../ModalBox/ModalHeader';
import { useUserContext } from '../../context/UserContext';
import { createGroup } from '../../services/group.service';
import CrossIcon from '../../assets/images/cross.svg';

const Aside = ({ setOpenMenu, openMenu }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [message, setMessage] = useState('');
  const { groups, setGroups, setSelectGroup } = useUserContext();

  const createNewGroup = async () => {
    try {
      const newGroup = await createGroup({ name: groupName });
      setGroups((oldData) => {
        return [...oldData, newGroup?.group];
      });
      setModalOpen(false);
      setGroupName('');
      setMessage('');
    } catch (error) {
      setMessage(error?.error?.detail);
    }
  };
  return (
    <>
      <ModalBox open={modalOpen} className={`task_modal`}>
        <ModalHeader onClick={() => setModalOpen(false)} text={'Add Group'} />
        <section className="add__task__form">
          <div>
            <label>Group name</label>
            <input
              className="input"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>
          {Array.isArray(message) && (
            <div className="error__section">
              <ul>
                {message?.map((message) => {
                  return <li>{message}</li>;
                })}
              </ul>
            </div>
          )}
          <div className="modal__footer">
            <Button
              onClick={(e) => setModalOpen(false)}
              text="Cancel"
              className={''}
            />
            <Button
              text="Add New Group"
              className={'bg-primary'}
              onClick={() => {
                createNewGroup();
              }}
            />
          </div>
        </section>
      </ModalBox>
      <aside
        className={`${
          openMenu ? 'show-menu' : 'close-menu'
        } layout__aside__section`}
      >
        <img
          onClick={() => setOpenMenu(false)}
          src={CrossIcon}
          className="cross__icon"
          alt="logo"
        />
        <div className="aside__logo">
          <img src={Logo} alt="logo" />
        </div>
        <ul className="menu__main__section ">
          <Button
            onClick={(e) => setModalOpen(true)}
            text="Add group"
            className="bg-primary"
          />
          <p>Groups List</p>
          {groups?.map((data) => {
            return (
              <li>
                <button
                  className="menu__item active__menu"
                  onClick={() => {
                    setSelectGroup(data);
                    setOpenMenu(false);
                  }}
                >
                  <img src={TaskIcon} alt="TaskIcon" />
                  <span> {data.name}</span>
                </button>
              </li>
            );
          })}

          {/* <li>
            <Link to={'/task'} className="menu__item active__menu">
              <img src={TaskIcon} />
              <span> Group Name</span>
            </Link>
          </li> */}
        </ul>
      </aside>
    </>
  );
};

export default Aside;
