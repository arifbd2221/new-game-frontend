import React from 'react';
import './head.css';
import { useNavigate } from 'react-router-dom';

const avatars = [
  '/avatars/50-animals-avatar_1.png', '/avatars/50-animals-avatar_2.png', '/avatars/50-animals-avatar_3.png', '/avatars/50-animals-avatar_4.png', 
  '/avatars/50-animals-avatar_5.png', '/avatars/50-animals-avatar_6.png', '/avatars/50-animals-avatar_7.png', '/avatars/50-animals-avatar_8.png', 
  '/avatars/50-animals-avatar_9.png', '/avatars/50-animals-avatar_10.png', '/avatars/50-animals-avatar_11.png', '/avatars/50-animals-avatar_12.png', 
  '/avatars/50-animals-avatar_13.png', '/avatars/50-animals-avatar_14.png', '/avatars/50-animals-avatar_15.png', '/avatars/50-animals-avatar_16.png', 
  '/avatars/50-animals-avatar_17.png', '/avatars/50-animals-avatar_18.png', '/avatars/50-animals-avatar_19.png', '/avatars/50-animals-avatar_20.png', 
  '/avatars/50-animals-avatar_21.png', '/avatars/50-animals-avatar_22.png', '/avatars/50-animals-avatar_23.png', '/avatars/50-animals-avatar_24.png', 
  '/avatars/50-animals-avatar_25.png', '/avatars/50-animals-avatar_26.png', '/avatars/50-animals-avatar_27.png', '/avatars/50-animals-avatar_28.png', 
  '/avatars/50-animals-avatar_29.png', '/avatars/50-animals-avatar_30.png', '/avatars/50-animals-avatar_31.png', '/avatars/50-animals-avatar_32.png', 
  '/avatars/50-animals-avatar_33.png', '/avatars/50-animals-avatar_34.png', '/avatars/50-animals-avatar_35.png', '/avatars/50-animals-avatar_36.png', 
  '/avatars/50-animals-avatar_37.png', '/avatars/50-animals-avatar_38.png', '/avatars/50-animals-avatar_39.png', '/avatars/50-animals-avatar_40.png', 
  '/avatars/50-animals-avatar_41.png', '/avatars/50-animals-avatar_42.png', '/avatars/50-animals-avatar_43.png', '/avatars/50-animals-avatar_44.png', 
  '/avatars/50-animals-avatar_45.png', '/avatars/50-animals-avatar_46.png', '/avatars/50-animals-avatar_47.png', '/avatars/50-animals-avatar_48.png', 
  '/avatars/50-animals-avatar_49.png', '/avatars/50-animals-avatar_50.png', '/avatars/icons_3.png', '/avatars/icons_4.png', '/avatars/icons_5.png', '/avatars/icons_6.png', 
  '/avatars/icons_7.png', '/avatars/icons_8.png', '/avatars/icons_10.png', '/avatars/icons_11.png', '/avatars/icons_12.png', '/avatars/icons_13.png', '/avatars/icons_14.png', 
  '/avatars/icons_15.png', '/avatars/icons_16.png', '/avatars/icons_18.png', '/avatars/icons_19.png', '/avatars/icons_20.png', '/avatars/icons_21.png', '/avatars/icons_22.png', 
  '/avatars/icons_23.png', '/avatars/icons_24.png', '/avatars/icons_26.png', '/avatars/icons_29.png', '/avatars/icons_32.png', '/avatars/icons_35.png', '/avatars/icons_38.png', 
  '/avatars/icons_39.png', '/avatars/icons_40.png', '/avatars/icons_42.png', '/avatars/icons_43.png', '/avatars/icons_44.png', '/avatars/icons_45.png', '/avatars/icons_47.png', 
  '/avatars/icons_48.png', '/avatars/icons_50.png', '/avatars/avatars_1.png', '/avatars/avatars_2.png', '/avatars/avatars_3.png', '/avatars/avatars_4.png', 
  '/avatars/avatars_5.png', '/avatars/avatars_6.png', '/avatars/avatars_7.png', '/avatars/avatars_8.png', '/avatars/avatars_9.png', '/avatars/avatars_10.png', 
  '/avatars/avatars_11.png', '/avatars/avatars_12.png', '/avatars/avatars_13.png', '/avatars/avatars_14.png', '/avatars/avatars_15.png', '/avatars/avatars_16.png', 
  '/avatars/avatars_17.png', '/avatars/avatars_18.png', '/avatars/avatars_19.png', '/avatars/avatars_20.png', '/avatars/avatars_21.png', '/avatars/avatars_22.png', 
  '/avatars/avatars_23.png', '/avatars/avatars_24.png', '/avatars/avatars_25.png', '/avatars/avatars_26.png', '/avatars/avatars_27.png', '/avatars/avatars_28.png', 
  '/avatars/avatars_29.png', '/avatars/avatars_31.png', '/avatars/avatars_32.png', '/avatars/avatars_33.png', '/avatars/avatars_34.png', '/avatars/avatars_35.png', 
  '/avatars/avatars_36.png', '/avatars/avatars_37.png', '/avatars/avatars_38.png', '/avatars/avatars_39.png', '/avatars/avatars_40.png', '/avatars/avatars_41.png', 
  '/avatars/avatars_42.png', '/avatars/avatars_43.png', '/avatars/avatars_44.png', '/avatars/avatars_47.png', '/avatars/avatars_48.png', '/avatars/avatars_49.png'
];


const defaultAvatarUrl = 'path/to/default/avatar.png';


const LeaderboardHead = ({top_three}) => {
  const history = useNavigate ();


  const handleClick = () => {
    console.log('Back button clicked');
    history("/play");
  };

  return (
    <div className="leaderboardheader">
         <div className="top-three">
          {top_three && top_three.length > 1 && (
            <div className="player-second second">
              <div className="avatar" style={{ backgroundImage: `url(${avatars[top_three[1]?.player?.profile_pic_id] || defaultAvatarUrl})` }}></div>
              <div className="rank-circle-second">2</div>
              <div className="name">{top_three[1]?.player?.name?.trim().split(' ')?.pop()}</div>
              <div className="score">{top_three[1]?.score}</div>
            </div>
          )}
          {top_three && top_three.length > 0 && (
            <div className="player-first first">
              <div className="avatar" style={{ backgroundImage: `url(${avatars[top_three[0]?.player?.profile_pic_id] || defaultAvatarUrl})` }}></div>
              <div className="rank-circle-first">1</div>
              <div className="name">{top_three[0]?.player?.name?.trim().split(' ')?.pop()}</div>
              <div className="score">{top_three[0]?.score}</div>
            </div>
          )}
          {top_three && top_three.length > 2 && (
            <div className="player-third third">
              <div className="avatar" style={{ backgroundImage: `url(${avatars[top_three[2]?.player?.profile_pic_id] || defaultAvatarUrl})` }}></div>
              <div className="rank-circle-third">3</div>
              <div className="name">{top_three[2]?.player?.name?.trim().split(' ')?.pop()}</div>
              <div className="score">{top_three[2]?.score}</div>
            </div>
          )}
        </div>
        <div className="back-button" onClick={handleClick}>
          
        </div>
    </div>
  );
};

export default LeaderboardHead;
