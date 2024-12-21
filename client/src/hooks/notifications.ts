import { notification } from "antd";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationConfig {
  message: string;
  description: string;
}

const useNotification = () => {
  const notify = (type: NotificationType, config: NotificationConfig) => {
    const { message, description } = config;
    notification[type]({
      message,
      description,
      className: "notification",
      duration: 3,
      closeIcon: false,
    });
  };

  return {
    notifySuccess: (config: NotificationConfig) => notify("success", config),
    notifyError: (config: NotificationConfig) => notify("error", config),
    notifyInfo: (config: NotificationConfig) => notify("info", config),
    notifyWarning: (config: NotificationConfig) => notify("warning", config),
  };
};

export default useNotification;
