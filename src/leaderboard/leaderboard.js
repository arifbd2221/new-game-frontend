import React, { useEffect, useState } from 'react';
import axios from "axios";
import LeaderboardHead from './headsection/leaderboardHead';
import UserCard from '../leaderboard/leaderboardItem';
import './LeaderboardStyle.css'; // Assuming you have a separate CSS file for styling
import Loader from '../loader/loading';

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

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const colors = [
  '#ffe699',
  '#b4c7e7',
  '#cc99fe',
  '#c5e0b5'
]


const Leaderboard = () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const [loading, setLoading] = useState(true);
  const [containerHeight, setContainerHeight] = useState(window.innerHeight);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  

  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  // useEffect(() => {
  //   const userId = localStorage.getItem("userid");
  //   console.log("Retrieved userId from localStorage:", userId); // Log the retrieved userId
  //   setLoading(true);
  //   const timer = setTimeout(() => {
  //     console.log('Timer finished');
  //     // Perform some action after the timer finishes
  //     console.log("setCurrentUser", currentUser, userId);
  //     setCurrentUser(userId);
  //     setLoading(false);
  //   }, 2000); // 5000 ms = 5 seconds

  //   // Cleanup the timer when the component unmounts or when the effect re-runs
  //   return () => clearTimeout(timer);
  // }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://game1.makegame.io/game/leaderboard/'); // Replace with your API endpoint
        setLeaderboardData(response.data);
        console.log({leaderboardData});
        const userId = localStorage.getItem("userid");
        console.log("Retrieved userId from localStorage:", userId); // Log the retrieved userId

        if (userId) {
          await sleep(500); // Sleep for 1 second
          setCurrentUser(userId);
        } else {
          console.warn("No userId found in localStorage");
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (currentUser !== null) {
      console.log("currentUser updated:", currentUser);
    }
  }, [currentUser]);


  if (loading) {
    return (
      <div className="leaderboard-loader">
        <Loader />
      </div>
    );
  }
  

  return (
    <div className="leaderboard">
      
      <div className="leaderboard-header">
        Leaderboard
      </div>
      

        <div className="scrollable-container" style={{ height: containerHeight }}>
        
        <div className='head-container'>
          {leaderboardData.length > 0 ? (<LeaderboardHead top_three={leaderboardData.slice(0,3)}></LeaderboardHead>): null}
        
        </div>

        <div className="other-players" >
          {leaderboardData.map((player, index) => (
            <UserCard
            key={index}
              id={String(player.player.id).trim()}
              rank={index+1}
              avatarUrl={avatars[player.player.profile_pic_id]}
              name={player.player.name.trim().split(' ')[player.player.name.trim().split(' ').length - 1]}
              score={player.score}
              color={colors[getRandomNumber(0,3)]}
              currentUser={currentUser}
          />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
