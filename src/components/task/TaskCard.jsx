import React from 'react';
import Delete from '../../assets/images/trash.svg';
import { useUserContext } from '../../context/UserContext';

const TaskCard = ({ data, onDeleteHandler, onCompleteHandler }) => {
  const { selectGroup } = useUserContext();
  return (
    <>
      <section className="task__card">
        <h6>{data?.name}</h6>
        <p>{data?.description}</p>
        <div className="card__footer">
          <label className="check__box">
            <input
              type="checkbox"
              disabled={data?.is_complete}
              checked={data?.is_complete}
              onChange={(e) => {
                if (e.target.checked) {
                  onCompleteHandler(selectGroup?._id, data?._id);
                }
              }}
            />
            <span>Complete</span>
          </label>
          <img
            src={Delete}
            alt="delete"
            onClick={() => {
              onDeleteHandler(selectGroup?._id, data?._id);
            }}
          />
        </div>
      </section>
    </>
  );
};

export default TaskCard;
