import httpService from './http.service';

export const createGroup = (body) =>
  httpService
    .post('/group', body)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

export const getAllGroup = () =>
  httpService
    .get('/group')
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

export const getGroupTasks = (gId) =>
  httpService
    .get(`/group/${gId}/task/`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

export const getUserGroupList = (gId) =>
  httpService
    .get(`/group/${gId}/user-list`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

export const inviteUserGroupList = (gId, userId) =>
  httpService
    .put(`/group/${gId}/invite-user`, { userId: userId })
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

export const singleUserGroup = (uId) =>
  httpService
    .get(`/group/user/${uId}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

// Tasks related
export const createGroupTask = (body) =>
  httpService
    .post('/group/task', body)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

export const deleteGroupTask = (gid, tid) =>
  httpService
    .remove(`group/${gid}/task/${tid}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

export const completeGroupTask = (gid, tid) =>
  httpService
    .put(`group/${gid}/task/${tid}/complete`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));
