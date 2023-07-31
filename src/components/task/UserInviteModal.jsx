import React, { useEffect, useState } from 'react';
import ModalBox from '../ModalBox/ModalBox';
import ModalHeader from '../ModalBox/ModalHeader';
import UsersDetail from '../UsersDetail';
import Button from '../Button';
import { useUserContext } from '../../context/UserContext';
import {
  getUserGroupList,
  inviteUserGroupList,
} from '../../services/group.service';

const UserInviteModal = ({
  userInviteOpen,
  setUserInviteOpen,
  setGroupUser,
}) => {
  const [userList, setUserList] = useState([]);
  const { selectGroup, setGroups, groups } = useUserContext();

  const getUsersList = async (id) => {
    try {
      const list = await getUserGroupList(id);
      setUserList(list?.userList);
    } catch (error) {
      console.log('error', error);
    }
  };

  const inviteUser = async (id, userId) => {
    try {
      await inviteUserGroupList(id, userId);
      setGroupUser((oldData) => {
        return [...oldData, ...userList.filter((uf) => uf._id === userId)];
      });
      setUserList(userList?.filter((lf) => lf?._id !== userId));
      const updateGroups = groups?.map((gm) => {
        if (gm?._id === selectGroup?._id) {
          const newUser = userList.filter((uf) => uf._id === userId);
          gm.users.push(...newUser);
        }
        return gm;
      });

      setGroups(updateGroups);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log('groups', groups);
    setUserList([]);
    if (selectGroup) {
      getUsersList(selectGroup?._id);
    }
  }, [selectGroup, userInviteOpen]);
  return (
    <>
      <ModalBox open={userInviteOpen} className={`task_modal`}>
        <ModalHeader
          onClick={() => setUserInviteOpen(false)}
          text={'User invite list'}
        />
        <section className="user__invite__section">
          {userList.map((data) => (
            <div
              className="user__invite__list"
              onClick={() => {
                inviteUser(selectGroup?._id, data?._id);
              }}
            >
              <UsersDetail data={data} showTag={true} />
              <Button text="Invite" className={'bg-primary'} />
            </div>
          ))}
        </section>
      </ModalBox>
    </>
  );
};

export default UserInviteModal;
