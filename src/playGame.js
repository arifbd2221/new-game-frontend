import './App.css';
import { useRef, useEffect, createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const PlayGame = () => {
    const history = useNavigate ();
    const iframeRef = useRef(null);
    const defaultSize = {
      breakpoint: 1022,
      width: window.innerWidth,
      height: window.innerHeight
    };

    const WindowSizeContext = createContext(defaultSize);
    const size = useContext(WindowSizeContext);
  
    const handleIframeMessage = useCallback((e) => {
        
      let iframeData = e?.data;

      if (iframeData?.event_type === "GG_GAME_OVER"){
        console.log("game_over", iframeData.payload.score);
        if(localStorage){
            const user_id = localStorage.getItem("userid");
            const headers = {
                'Content-Type': 'application/json',
              }
            axios.post("https://15.207.58.248/game/game-scores/", {
                score: iframeData?.payload?.score,
                player: user_id
            }, {headers: headers})
            .then(resp => {
                console.log(resp.data);
                history("/leaderboard");
            })
            .catch(error => {
                console.log("Score push error", error);
            })
        }
        
      }
  
      if (e.data?.event_type === "GG_GAME_OVER") {
        const { defaultData } = e.data?.payload;
        console.log("GG_GAME_OVER", defaultData);
        // iframeRef.current?.contentWindow &&
        //     iframeRef.current.contentWindow.postMessage(
        //       {
        //         payload: { gameData },
        //         event_type: "GG_SET_GAME_DATA"
        //       },
        //       "*"
        //     );
      }
    }, [history])
  
  
  
  
    useEffect(() => {
      window.addEventListener("message", handleIframeMessage, false);
      return () => {
        window.removeEventListener("message", handleIframeMessage, false);
      };
    }, [handleIframeMessage]);
  
    const focusFrame = useCallback(() => {
      if (
        iframeRef.current &&
        document.activeElement !== iframeRef.current
      ) {
        iframeRef.current.focus();
      }
    }, []);
  
    useEffect(() => {
      document.addEventListener("click", focusFrame, {
        capture: true
      });
  
      return () => {
        document.removeEventListener("click", focusFrame, false);
      };
    }, [focusFrame]);


    return(
    <div className="App">
    <div
    css={pageStyle}
    className="d-flex justify-content-center"
    style={{ ...pageStyle, width: size.width, height: size.height }}
    >
        <iframe
            id="iframe"
            ref={iframeRef}
            title={"Play Game"}
            src={"https://testing-a6960.web.app/"}
            frameBorder="none"
            style={frameStyle}
            allow="camera; microphone"
            >
            </iframe>
        
    </div>
    
    </div>
    );
}

const pageStyle = {
    width: '100vw',
    height: '100vh',
    background: '#000',
    touchAction: 'none',
    msTouchAction: 'none'
  };
  
  const frameStyle = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    position: 'absolute',
    backgroundColor: '#000'
  };