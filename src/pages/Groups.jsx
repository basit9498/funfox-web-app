import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Button from '../components/Button';
import AddTask from '../components/task/AddTask';
import TaskCard from '../components/task/TaskCard';
import UsersDetail from '../components/UsersDetail';
import {
  completeGroupTask,
  deleteGroupTask,
  getAllGroup,
  getGroupTasks,
  singleUserGroup,
} from '../services/group.service';
import { useUserContext } from '../context/UserContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import UserInviteModal from '../components/task/UserInviteModal';
import Loader from '../components/Loader';
import { io } from 'socket.io-client';

const Groups = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userInviteOpen, setUserInviteOpen] = useState(false);
  const [allTask, setAllTask] = useState([]);
  const [groupUser, setGroupUser] = useState([]);
  const [loader, setLoader] = useState(false);

  const { setGroups, selectGroup, user, setIsSocket, isSocket } =
    useUserContext();

  const getGroups = async () => {
    try {
      setLoader(true);
      const getGroup = await getAllGroup();
      setGroups(getGroup.group);
      setLoader(false);
    } catch (error) {
      console.log('error', error);
      setLoader(false);
    }
  };

  const getGroupAllTasks = async (id) => {
    try {
      setLoader(true);
      const getTasks = await getGroupTasks(id);
      setAllTask(getTasks?.tasks);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log('error', error);
    }
  };

  const deleteTask = async (gid, tid) => {
    try {
      setLoader(true);
      await deleteGroupTask(gid, tid);
      setAllTask(allTask?.filter((tf) => tf?._id !== tid));
      // isSocket.emit('task_added', { group_id: selectGroup?._id, id: tid });
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log('error', error);
    }
  };

  const singleUser = async (uId) => {
    try {
      return await singleUserGroup(uId);
    } catch (error) {}
  };

  const completeTask = async (gid, tid) => {
    try {
      setLoader(true);
      await completeGroupTask(gid, tid);
      setAllTask(
        allTask?.map((tm) => {
          if (tm?._id === tid) {
            tm.is_complete = true;
          }
          return tm;
        })
      );
      // isSocket.emit('task_completed', { group_id: selectGroup?._id, id: tid });

      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log('error', error);
    }
  };

  // real-time trigger group join
  const joinGroupHandler = (id) => {
    isSocket.emit('join_group', { group_id: id });
  };

  // real-time task added
  const receivedGroupTaskHandler = (data) => {
    console.log('task_add_received', data);
    setAllTask((oldTask) => {
      return [...oldTask, { ...data?.task }];
    });
  };

  // real-time task delete
  // const deletedGroupTaskHandler = (data) => {
  //   setAllTask((oldTask) => {
  //     return [...oldTask];
  //   });
  //   setAllTask(allTask?.filter((tf) => tf?._id !== data?.taskId));
  // };

  // real-time task completed
  // const completedGroupTaskHandler = (data) => {
  //   // setAllTask(allTask?.filter((tf) => tf?._id !== data?.taskId));
  //   const updateTasks = allTask?.map((tm) => {
  //     if (tm?._id === data?.taskId) {
  //       tm.is_complete = true;
  //     }
  //     return tm;
  //   });

  //   setAllTask((old) => {
  //     return [...old];
  //   });

  //   console.log('updateTasks', updateTasks);
  // };

  useEffect(() => {
    if (isSocket) {
      // isSocket.on('task_delete', deletedGroupTaskHandler);
      // isSocket.on('task_completed_received', completedGroupTaskHandler);
      isSocket.on('task_add_received', receivedGroupTaskHandler);
      return () => {
        // isSocket.off('task_delete', deletedGroupTaskHandler);
        // isSocket.off('task_completed_received', completedGroupTaskHandler);
        isSocket.off('task_add_received', receivedGroupTaskHandler);
      };
    }
  }, [isSocket]);

  // Drag
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(allTask);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAllTask(items);
  }

  useEffect(() => {
    getGroups();
    if (isSocket === null) {
      const socketIo = io.connect('http://localhost:5000');
      console.log('socketIo,socketIo', socketIo);
      socketIo.on('connect_error', (err) => {
        console.log(`connect_error due to ${err}`);
      });
      setIsSocket(socketIo);
    }
  }, []);

  useEffect(() => {
    if (selectGroup) {
      const groupAdmin = [];
      getGroupAllTasks(selectGroup._id);
      singleUser(selectGroup?.owner_id).then((response) => {
        groupAdmin.push(response.user);
        if (selectGroup?.users.length > 0) {
          setGroupUser([
            ...groupAdmin,
            ...selectGroup?.users?.filter((uf) => uf?._id !== user?.user?._id),
          ]);
        } else {
          setGroupUser([...groupAdmin]);
        }
      });

      // joinGroupHandler
      joinGroupHandler(selectGroup?._id);
    }
  }, [selectGroup]);

  return (
    <>
      {loader && <Loader />}
      <AddTask
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setAllTask={setAllTask}
      />
      <UserInviteModal
        userInviteOpen={userInviteOpen}
        setUserInviteOpen={setUserInviteOpen}
        setGroupUser={setGroupUser}
      />
      <Layout title={'Task management'}>
        {selectGroup ? (
          <>
            <div className="task__top__section">
              <div className="task__top__title">
                {selectGroup && (
                  <>
                    <p>Group Name : </p>
                    <span>{selectGroup?.name}</span>
                  </>
                )}
              </div>
              <div className="task__top__buttons">
                <Button
                  onClick={() => setUserInviteOpen(true)}
                  className={'task__button bg-primary'}
                  text={'User Invite'}
                />
                <Button
                  onClick={() => setModalOpen(true)}
                  className={'task__button bg-primary'}
                  text={'Create New Task'}
                />
              </div>
            </div>

            <section className="task__mian__body">
              <main className="task__mian__section">
                <h3>Task List</h3>
                <section className="task__section">
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId={selectGroup?._id + new Date()}>
                      {(provided) => (
                        <ul
                          className="characters"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {allTask?.map((data, index) => (
                            <Draggable
                              key={data?._id}
                              draggableId={data?._id}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TaskCard
                                    data={data}
                                    onDeleteHandler={deleteTask}
                                    onCompleteHandler={completeTask}
                                  />
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </DragDropContext>
                  {/* {allTask?.map((data) => {
                return (
                  <TaskCard
                    data={data}
                    onDeleteHandler={deleteTask}
                    onCompleteHandler={completeTask}
                  />
                );
              })} */}
                </section>
              </main>
              <main className="task__details__section">
                <h3>Task Details</h3>
                <div className="detail__text">
                  <h3 className="">Total Task {`(${allTask?.length})`}</h3>
                  <h3 className="">
                    Total number of users {`(${groupUser?.length})`}
                  </h3>
                </div>
                <div className="users_details_list">
                  {/* <UsersDetail data={user?.user} isAdmin={true} /> */}
                  {groupUser?.filter((gf) => gf?._id === user?.user._id) <
                    1 && <UsersDetail data={user?.user} isAdmin={false} />}
                  {groupUser?.map((data, index) => {
                    return <UsersDetail data={data} isAdmin={index === 0} />;
                  })}
                </div>
              </main>
            </section>
          </>
        ) : (
          <div className="main_message">
            <h1>Please select the group or create new group</h1>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Groups;
