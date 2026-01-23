import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/William.jpg';
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatMessage.css';
import dayjs from 'dayjs';


export function ChatMessage({ message, sender, time }) {
  // const {message, sender} = props;

  // if (sender === 'robot') {
  //   return (
  //     <div>
  //       <img src="./image/robot.png" width="50"/>
  //       {message}
  //     </div>
  //   );
  // }
  
  return (
    <div className={sender === 'user' 
      ? 'chat-message-user' 
      : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img 
        src={RobotProfileImage}
        className="chat-message-profile"
        />
      )}
      <div className="chat-message-text">
        {message === 'LOADING' ? (
          <img src={LoadingSpinner} alt="loading" className="loading-spinner" />
        ) : (
          message
        )}
        
        {time && (
          <div className='chat-message-time'>
            {dayjs(time).format('h:mma')}
          </div>
        )}
      </div>
      {sender === 'user' && (
        <img 
        src={UserProfileImage}
        className="chat-message-profile"
        />
      )}
    </div>
  );
}