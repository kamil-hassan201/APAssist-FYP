import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';
import apassist_avatar from './../assets/avatar.png';
import student_avatar from './../assets/student_avatar.jpg';
import { getChatResponse } from '../api/chat';

export default function RecommendationChat({ course_info }) {
  const [messages, setMessages] = useState([
    {
      message: `Top 3 courses that best match to your profile are ${course_info.top_3_courses
        .map((course) => course.course_title)
        .join(', ')}`,
      sender: 'APAssist',
    },
    {
      message: 'Among them which one best fit me?',
      direction: 'outgoing',
      sender: 'user',
    },
    {
      message: course_info.rationale,
      sender: 'APAssist',
    },
    {
      message: 'You can ask any further question about this 3 courses!',
      sender: 'APAssist',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processQuery(newMessages);
  };

  async function processQuery(chatMessages) {
    const prompt = chatMessages[chatMessages.length - 1].message;

    // get stream response
    const response = await getChatResponse(prompt);

    setIsTyping(false);

    setMessages([
      ...chatMessages,
      {
        message: response,
        sender: 'APAssist',
      },
    ]);
  }
  return (
    <div className="h-full">
      <div className="w-full h-full">
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="APAssist is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                return (
                  <Message
                    style={{
                      marginTop: '10px',
                    }}
                    key={i}
                    model={message}
                    avatarPosition={message.sender === 'APAssist' ? 'tl' : 'tr'}
                  >
                    {message.sender === 'APAssist' ? (
                      <Avatar
                        src={apassist_avatar}
                        status="available"
                        name="Lilly"
                      />
                    ) : (
                      <Avatar src={student_avatar} name="Lilly" />
                    )}
                  </Message>
                );
              })}
            </MessageList>
            <MessageInput
              attachButton={false}
              placeholder="Type your query here"
              autoFocus
              onSend={handleSend}
              sendDisabled={false}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}
