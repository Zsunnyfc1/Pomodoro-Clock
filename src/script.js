import React from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeLeft, seTtimeLeft] = React.useState(1500);
  const [timingType, setTimingtype] = React.useState("SESSION");
  
  const [play, setPlay] = React.useState(false);
  
  const timeout = setTimeout(() => {
    if(timeLeft && play){
      seTtimeLeft(timeLeft - 1)
    }
  }, 1000);
  
  const handleBreakIncrease = () => {
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }
  
  const handleBreakDecrease = () => {
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  }
  
   const handleSessionIncrease = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      seTtimeLeft(timeLeft + 60)
    }
  }
  
  const handleSessionDecrease = () => {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      seTtimeLeft(timeLeft - 60)
    }
  }
  
  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    seTtimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }
  
  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }
  
  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "SESSION"){
      seTtimeLeft(breakLength * 60)
      setTimingtype("BREAK")
      audio.play()
    }
    if(!timeLeft && timingType === "BREAK"){
      seTtimeLeft(sessionLength * 60)
      setTimingtype("SESSION")
      audio.pause()
      audio.currentTime = 0;
    }
  }
  
  const clock = () => {
    if(play){
      timeout
      resetTimer()
    }else {
      clearTimeout(timeout)
    }
  }
  
  React.useEffect(() => {
    clock()
  }, [play, timeLeft, timeout])
 
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  const title = timingType === "SESSION" ? "Work Session" : "Relax Time";

  return (
   <div>
    <div className="wrapper">
      <h2 id="timer-name">Pomodoro Clock</h2>
       <div className="timer-wrapper">
        <div className="timer">
           <h2 id="timer-label">{title}</h2>
           <h3 id="time-left">{timeFormatter()}</h3>
        </div>
         
        <div id="start_stop"onClick={handlePlay}><i className="glyphicon glyphicon-play"></i><i className="glyphicon glyphicon-pause"></i></div>
       <div id="reset"onClick={handleReset}><i className="glyphicon glyphicon-repeat"></i></div>
      </div>
      
      <div className="break-session-length">
        <div>
          <h3 id="session-label">Work</h3>
           <div>
            <button disabled={play} onClick={handleSessionIncrease} id="session-increment"><i className="glyphicon glyphicon-plus"></i></button>
              <strong id="session-length">{sessionLength}</strong>
            <button disabled={play} onClick={handleSessionDecrease} id="session-decrement"><i className="glyphicon glyphicon-minus"></i></button>
          </div>
         </div>
        
         <div>
           <h3 id="break-label">Relax</h3>
          <div>
            <button disabled={play} onClick={handleBreakIncrease} id="break-increment"><i className="glyphicon glyphicon-plus"></i></button>
              <strong id="break-length">{breakLength}</strong>
            <button disabled={play} onClick={handleBreakDecrease} id="break-decrement"><i className="glyphicon glyphicon-minus"></i></button>
          </div>
           
         </div>
      </div>

    </div>
    <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>);
}

ReactDOM.render(<App />, document.getElementById("app"))
