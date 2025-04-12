import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ChatPage() {
  const socketRef = useRef(null); // WebSocket은 ref로!
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const nickname = new URLSearchParams(useLocation().search).get('nickname');

  useEffect(() => {
    const ws = new WebSocket('ws://chat-backend-production-5553.up.railway.app/ws');
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('✅ WebSocket 연결 완료!');
    };

    ws.onmessage = (event) => {
      console.log('📩 받은 메시지:', event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    const socket = socketRef.current;
  
    if (!socket) {
      console.log('🚫 socket이 아직 준비되지 않았음');
      return;
    }
  
    console.log('📡 socket 상태:', socket.readyState);
  
    if (input.trim() && socket.readyState === WebSocket.OPEN) {
      console.log('📤 보내는 메시지:', `${nickname}: ${input}`);
      socket.send(`${nickname}: ${input}`);
      setInput('');
    } else {
      console.log('❌ WebSocket이 아직 연결되지 않았거나 메시지가 비었음');
    }
  };
  
  
  

  return (
    <div style={{ padding: 20 }}>
      <h2>{nickname}의 채팅방</h2>
      <div
        style={{
          height: 300,
          overflowY: 'scroll',
          border: '1px solid gray',
          marginBottom: 10,
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>보내기</button>
    </div>
  );
}
