const users = [];

const addUser = ({ id, name }) => {
  if (name) {
    name = name.trim();
  }

  const existingUser = users.find((user) => user.name === name);

  if (!name) return { error: "Someone once told me everything needs a name." };
  if (existingUser) return { error: "Your name needs to be a unique key" };

  const user = { id, name };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room, name) => {
  return users;
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
