import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NicknamePage() {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (nickname.trim()) {
      navigate(`/chat?nickname=${encodeURIComponent(nickname)}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>친구 채팅방</h1>
      <input
        type="text"
        placeholder="닉네임 입력"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={handleJoin}>입장하기</button>
    </div>
  );
}
