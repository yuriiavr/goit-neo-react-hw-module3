import css from "./Notification.module.css";

const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  const notificationClass = type === "error" ? css.error : css.success;

  return (
    <div className={`${css.notification} ${notificationClass}`} role="alert">
      <span className={css.messageText}>{message}</span>
    </div>
  );
};

export default Notification;
