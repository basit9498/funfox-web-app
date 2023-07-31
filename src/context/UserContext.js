import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isSocket, setIsSocket] = useState(null);
  const [selectGroup, setSelectGroup] = useState(null);

  const checkLogin = () => {
    const user = localStorage.getItem('authToken');
    setUser(JSON.parse(user));
  };

  const clearAll = () => {
    setUser(null);
    setGroups([]);
    setIsSocket(null);
    setSelectGroup(null);
  };
  const shareValue = {
    setGroups,
    groups,

    selectGroup,
    setSelectGroup,

    user,
    setUser,

    isSocket,
    setIsSocket,

    clearAll,
  };

  //
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <UserContext.Provider value={shareValue}>{children}</UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
