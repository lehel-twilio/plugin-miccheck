import * as React from 'react';
import {Notifications, NotificationType, NotificationEvent, MainContainer} from '@twilio/flex-ui';

export class CustomNotificationElement extends React.Component {

  render() {
    const {notificationContext} = this.props;
    return (
      <div>
        {notificationContext.message}
      </div>
    );
  }
}

function registerToNotifications() {

  const notification = {
    id: 'MicAccessNotification',
    content: <CustomNotificationElement customProp='custom prop'/>,
    type: NotificationType.error,
    timeout: 0
  };
  Notifications.registerNotification(notification);

}

registerToNotifications();

MainContainer.defaultProps.showNotificationBar = true;
Notifications.addListener(NotificationEvent.notificationAdded, (notification) => {
  // alert(notification.content);  OR use browser notifications api https://hackernoon.com/why-and-how-to-implement-web-notification-api-4eb795c5b05d
});

navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
  console.log('Mic check passed successfully');
}).catch(function(err) {
  Notifications.showNotification('MicAccessNotification', {message: 'Flex does not have access to the Microphone. Please allow Flex to use the Microphone'});
});
