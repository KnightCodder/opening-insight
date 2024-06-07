export const sendNotification = (message: string) => {
    if (Notification.permission === "granted") {
      new Notification(message);
    }
  };
