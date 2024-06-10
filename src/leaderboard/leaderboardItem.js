import React from 'react';
import './UserCard.css';

const UserCard = ({ rank, avatarUrl, name, score, color}) => {
  console.log(rank, avatarUrl, name,score, color);
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <div className="rank">{rank}</div>
      <img className="avatar" src={avatarUrl} alt={`${name}'s avatar`} />
      <div className="name">{name}</div>
      <div className="score">{score}</div>
    </div>
  );
};


export default UserCard;
