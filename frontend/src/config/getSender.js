export const getsender = (loggedUser, users) => {
    if (!loggedUser || !users || users.length !== 2) {
      return "Unknown User";
    }
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };
  