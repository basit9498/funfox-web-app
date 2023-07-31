import React from 'react';

const UsersDetail = ({ data, showTag = false, isAdmin }) => {
  return (
    <>
      <div className="users_list">
        <h3>{data.name.charAt(0)}</h3>
        <div>
          <p>{data.name} </p>
          {showTag ? (
            <span>New Member</span>
          ) : (
            <span>{isAdmin ? 'Admin' : 'Member'}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersDetail;
