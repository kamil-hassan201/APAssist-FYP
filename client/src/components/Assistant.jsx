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
import { getQueryResponse } from '../api/getQueryResponse';

export default function Assistant() {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello, I'm APAssist, a virtual student service chatbot! How can I help you?",
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
    try {
      const response = await getQueryResponse(prompt);
      const reader = response.body.getReader();

      let streamText = '';

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        // Assuming the stream is sending text data
        const message = new TextDecoder().decode(value);
        streamText += message;
        setMessages([
          ...chatMessages,
          {
            message: streamText + '| ',
            sender: 'APAssist',
          },
        ]);
      }

      setIsTyping(false);

      setMessages([
        ...chatMessages,
        {
          message: streamText,
          sender: 'APAssist',
        },
      ]);
    } catch (error) {
      alert(error?.message);
      setIsTyping(false);
    }
  }
  return (
    <div className="h-[100%]">
      <div className="w-full h-[100%]">
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
