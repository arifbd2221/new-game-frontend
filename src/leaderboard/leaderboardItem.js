import React from 'react';
import './UserCard.css';

const UserCard = ({ id, rank, avatarUrl, name, score, color, currentUser}) => {
  const isCurrentUser = currentUser && currentUser === id;
  console.log("Rendering UserCard:", {isCurrentUser, name, currentUser, id, types: { currentUser: typeof currentUser, id: typeof id }});
  return (
    <div className={`card ${isCurrentUser ? 'highlight' : ''}`} style={{ backgroundColor: color }}>
      <div className="rank">{rank}</div>
      <img className="avatar" src={avatarUrl} alt={`${name}'s avatar`} />
      <div className="name">{name} {isCurrentUser && <span className="its-you">⭐ It's You!</span>}</div>
      <div className="score">{score}</div>
    </div>
  );
};


export default UserCard;
