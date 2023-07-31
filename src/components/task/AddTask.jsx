import React, { useState } from 'react';
import ModalBox from '../ModalBox/ModalBox';
import ModalHeader from '../ModalBox/ModalHeader';
import Button from '../Button';
import { createGroupTask } from '../../services/group.service';
import { useUserContext } from '../../context/UserContext';
import Loader from '../Loader';

const AddTask = ({ modalOpen, setModalOpen, setAllTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { selectGroup, isSocket } = useUserContext();
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');

  const taskAddRealTimeHandler = (group_id, task) => {
    isSocket.emit('task_added', { group_id, task });
  };

  const handleAddGroupTask = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);
      const newTask = await createGroupTask({
        name: title,
        description: description,
        group_id: selectGroup?._id,
      });

      setAllTask((oldTask) => {
        return [...oldTask, newTask?.groupTask];
      });
      setTitle('');
      setDescription('');
      setMessage('');

      taskAddRealTimeHandler(selectGroup?._id, newTask?.groupTask);

      setLoader(false);
      setModalOpen(false);
    } catch (error) {
      setLoader(false);
      setMessage(error?.error?.detail);
      console.log('Error', error);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <ModalBox open={modalOpen} className={`task_modal`}>
        <ModalHeader
          onClick={() => setModalOpen(false)}
          text={'Add New Task'}
        />
        <section className="add__task__form">
          <div>
            <label>Title</label>
            <input
              className="input"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              className="input"
              type="text"
              placeholder="Description title"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              text="Add New Task"
              className={'bg-primary'}
              onClick={(e) => handleAddGroupTask(e)}
            />
          </div>
        </section>
      </ModalBox>
    </>
  );
};

export default AddTask;
