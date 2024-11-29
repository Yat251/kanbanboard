export const priorityNames = {
    "0": "No Priority",
    "4": "Urgent",
    "3": "High",
    "2": "Medium",
    "1": "Low",
};
export const priorityOrder = ["4", "3", "2", "1", "0"];
export const statusOrder = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

export const getInitials = (name) => {
    return name
        .split(" ")
        .map((part) => part[0]?.toUpperCase())
        .join("")
        .slice(0, 2);
};

export const getUserName = (userId, users) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
};