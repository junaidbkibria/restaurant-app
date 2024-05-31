export const getItem = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

export const setItem = (name, value) => {
  if (name === "profile") {
    localStorage.setItem('currentUser',JSON.stringify(value));
    const userList = getItem("profile");
    if (!userList) {
      localStorage.setItem(name, JSON.stringify([value]));
    } else {
      let userFound = false;
      userList.forEach((item) => {
        if (item.email === value.email) {
          userFound = true;
        }
      });
      if (!userFound) {
        const newList = [...userList, value];
        localStorage.setItem(name, JSON.stringify(newList));
      }
    }
  } else {
    localStorage.setItem(name, JSON.stringify(value));
  }
};
