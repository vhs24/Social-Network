import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import chatService from './ChatService';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';
import loading from '@app/assets/loader.gif';
import {
  StompSessionProvider,
  useStompClient,
  useSubscription,
  withStompClient,
  withSubscription,
} from 'react-stomp-hooks';

interface ChatContainerProps {
  currentChat: any;
  currentUser: User | undefined;
  socket: any;
  topicContactId: any;
}
export interface Message {
  fromSelf: boolean;
  content: string;
  image?: string;
  user: User | undefined;
}

export interface User {
  username: string;
  email: string;
  isAvatarImageSet: boolean;
  id: string;
  password: string;
  __v?: number;
  avatarImage: string;
  topicId: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<Message>();
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stompClient = useStompClient();

  useEffect(() => {
    const getMsg = async () => {
      if (currentChat && currentUser) {
        const response = await chatService.getAllMessages(currentChat.topicContactId);
        response.data?.map((item: Message) => {
          if (item?.user?.id === currentUser?.id) {
            item.fromSelf = true;
          }
        });
        setMessages(response.data);
      }
      setIsLoading(false);
    };
    getMsg();
    //
  }, [currentChat, currentChat._id, currentUser]);

  useSubscription(`/topic/chat/${currentChat.topicContactId}`, (message: any) => {
    const body = JSON.parse(message.body);
    console.log(body);
    setArrivalMessage({
      fromSelf: body.user.id === currentUser?.id ? true : false,
      content: body.content,
      user: body.user.id,
    });
  });
  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg: string) => {
        console.log(msg);
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (msg: string, image: string) => {
    console.log(image, msg);

    if (currentUser) {
      if (stompClient) {
        //Send Message
        if (image === '' || image === null) {
          stompClient.publish({
            destination: '/app/chat/' + currentChat.topicContactId,
            body: JSON.stringify({ content: msg, chatParent: null, isFile: false }),
          });
        } else {
          console.log(JSON.stringify({ content: image, chatParent: null, isFile: true }));
          stompClient.publish({
            destination: '/app/chat/' + currentChat.topicContactId,
            body: JSON.stringify({ content: image, chatParent: null, isFile: Boolean(true) }),
          });
        }
      }
    }

    setMessages((msgs) => [...msgs, { fromSelf: true, content: msg, image, user: currentUser }]);
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={currentChat.avatarImage} alt="current Chat avatar" />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="loading-messages">
          <img src={loading} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="chat-messages">
          {messages?.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div className={`message ${message.fromSelf ? 'sended' : 'recieved'}`}>
                  {message.content && (
                    <div className="content ">
                      <p>{message.content}</p>
                    </div>
                  )}
                  {message.image && (
                    <div className="content-image">
                      <img src={message.image} alt="sended" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  /* gap: 0.1rem; */
  overflow: hidden;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 1px solid #ffffff15;
    -webkit-box-shadow: 0px 17px 20px -26px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 17px 20px -26px rgba(66, 68, 90, 1);
    box-shadow: 0px 17px 20px -26px rgba(66, 68, 90, 1);
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3.1rem;
        }
      }
      .username {
        h3 {
          color: #e4e6eb;
        }
      }
    }
    @media screen and (min-width: 720px) {
      .avatar {
        img {
          height: 3rem;
        }
      }
    }
  }

  .loading-messages {
    text-align: center;
    margin-top: 35vh;
    img {
      width: 120px;
      height: 120px;
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 70%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 0.9rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) {
          max-width: 50%;
          font-size: 1.1rem;
        }
      }
      .content-image {
        max-width: 70%;
        /* justify-self: flex-end; */
        img {
          max-width: 300px;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: rgb(255, 82, 161);
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: rgb(0, 135, 255);
      }
    }
  }
  @media screen and (max-width: 900px) and (orientation: landscape) {
    grid-template-rows: 15% 70% 15%;

    .chat-header {
      .user-details {
        .avatar {
          img {
            height: 2.6rem;
          }
        }
      }
    }
  }
`;

export default ChatContainer;
