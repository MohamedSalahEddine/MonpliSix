import React, { useEffect, useState } from 'react'
import BottomMenu from '../components/BottomMenu'
// import playersData from "../db_players"
import Player from '../components/Player'
import { Link, Navigate, useNavigate } from 'react-router-dom'



export default function NewGame() {

  const [players, setPlayers] = useState(null)
  const [teamA, setTeamA] = useState([])
  const [teamB, setTeamB] = useState([])
  const [draggedPlayer, setDraggedPlayer] = useState(null)
  const [game_on, setGameOn] = useState(false)
  const [teams_confirmed, setTeamsConfirmed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const savedTeamA = JSON.parse(localStorage.getItem("teamA"));
    const savedTeamB = JSON.parse(localStorage.getItem("teamB"));
    
    const loadPlayers = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("https://monplisix.onrender.com/players", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch players");
        const data = await res.json();
        setPlayers(data);
        if (savedTeamA &&  savedTeamA.length>0 && savedTeamB && savedTeamB.length>0) {
          console.log("yes");
          
          setTeamA(savedTeamA);
          setTeamB(savedTeamB);
        }         
      };
      loadPlayers();
    
  }, []);

useEffect(() => {
  if (teamA) localStorage.setItem("teamA", JSON.stringify(teamA));
}, [teamA]);

useEffect(() => {
  if (teamB) localStorage.setItem("teamB", JSON.stringify(teamB));
}, [teamB]);


  
  const handleClick = (player) => {
    // console.log(player.id+ " clicked upon");
    navigate("/history/"+player.id)
  }

  const handleDragEnd = () => {

  }
 
  
  const handleAnnuler = () => {
    setTeamA([]);
    setTeamB([]);
    localStorage.removeItem("teamA");
    localStorage.removeItem("teamB");
};
  
  const handleConfirmer = async (e)=>{
    e.preventDefault()
    console.log("btn confirmer clicked");
    
    const token = localStorage.getItem("token")
    const res = await fetch("https://monplisix.onrender.com/games",
      {
        method : "POST",
        headers : {
          "Content-Type" :"application/json",
          "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({ 
          playersTeamA : teamA.map(player => player.id),
          playersTeamB : teamB.map(player => player.id)
        })
      }
    )
    setTeamsConfirmed(true)
  }

  const handlePlayerClickedA = async (player) => {
    
    try{

      console.log(player.name+" scored");
      const res = await fetch("https://monplisix.onrender.com/games/score/"+player.id)
      console.log(res);
      const data = await res.json()
      
    }catch(error){
      console.log("error : "+error);
      
    }
  }
  
  const handlePlayerClickedB = async (player) => {
    try{
      
      console.log(player.name+" scored");
      const res = await fetch("https://monplisix.onrender.com/games/score/"+player.id)
      console.log(res);
      const data = await res.json()

      
    }catch(error){
      console.log("error : "+error);
      
    }
    
  }


  const cn = `new_game frame
              flex flex-col 
              text-white m-auto`

  if(players === null) return "loading.."

  return (
    <div className={cn}>
      <div className='container top flex-1'>

        <div className='flex justify-center gap-6 m-2'>
          {   
            !game_on && !teams_confirmed && 
            <>
              <button disabled={teamA.length === 0 || teamA.length === 0 } onClick={handleAnnuler} className='btn rounded-lg px-4 bg-red-300'>annuler</button>
              <button disabled={teamA.length < 6   || teamA.length < 6  } onClick={handleConfirmer} className='btn rounded-lg px-4 bg-green-300'>confirmer</button>
            </>
          }
          {   
            !game_on && teams_confirmed &&
            <>
              <button onClick={()=> setGameOn(true)} className='bg-green-300 w-[50%] py-2 text-gray-500 text-xl rounded-md'>start game</button>
            </>
          }
          
        </div>
        
        <div className='feild  h-[68vh] w-[92vw] m-auto'>
          <div onDragEnd={handleDragEnd} className='team-A relative h-[34vh] flex flex-wrap '  onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                          e.preventDefault();
                          if (draggedPlayer) {
                            const container = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - container.left - draggedPlayer.offsetX;
                            const y = e.clientY - container.top - draggedPlayer.offsetY;

                            setTeamA(prev => [...prev, { ...draggedPlayer, x, y }]);
                            setTeamB(prev => prev.filter(p => p.id !== draggedPlayer.id));
                            setPlayers(prev => prev.filter(p => p.id !== draggedPlayer.id));
                            setDraggedPlayer(null);
                          }
                        }}
          >
            <span className='bg-white m-1 h-fit rounded-full px-1 text-blue-600 text-xs font-bold'>avg : {teamA.length > 0 && (teamA.reduce((acc, player) => player.rating + acc, 0) / teamA.length).toFixed(1)}</span>
            {
              teamA && teamA.length > 0 &&  teamA.map(player => (
                <div
                  key={player.id}
                  onClick={() => handlePlayerClickedA(player)}
                  className='absolute'
                  style={{ left: player.x, top: player.y }}
                >
                  <Player player={player} size={40} />
                </div>
              ))
            }
          </div>
          
          <div onDragEnd={handleDragEnd} className='team-B relative h-[34vh] flex flex-wrap' onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                    e.preventDefault();
                    if (draggedPlayer) {
                      const container = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - container.left - draggedPlayer.offsetX;
                      const y = e.clientY - container.top - draggedPlayer.offsetY;

                      setTeamB(prev => [...prev, { ...draggedPlayer, x, y }]);
                      setTeamA(prev => prev.filter(p => p.id !== draggedPlayer.id));
                      setPlayers(prev => prev.filter(p => p.id !== draggedPlayer.id));
                      setDraggedPlayer(null);
                    }
                  }}

            >
            <span className='bg-white m-1 h-fit rounded-full px-1 text-blue-600 text-xs font-bold'>avg : {teamB.length > 0 && (teamB.reduce((acc, player) => player.rating + acc, 0) / teamB.length).toFixed(1)}</span>
            {
              teamB && teamB.length > 0 &&  teamB.map(player => (
                <div
                  key={player.id}
                  onClick={() => handlePlayerClickedB(player)}
                  className='absolute'
                  style={{ left: player.x, top: player.y }}
                >
                  <Player player={player} size={40} />
                </div>
              ))
            }
          </div>
          <div className='flex gap-2 h-fit overflow-y-hidden overflow-x-scroll scrollbar-hide py-3'>
            {
              players.filter(p =>
                !teamA.some(tp => tp.id === p.id) &&
                !teamB.some(tp => tp.id === p.id)
              ).map(player=>{
                return  (
                  <div className='movable h-fit' draggable onDragStart={(e) => {
                      const rect = e.target.getBoundingClientRect();
                      setDraggedPlayer({
                        ...player,
                        offsetX: e.clientX - rect.left,
                        offsetY: e.clientY - rect.top
                      });
                    }}
                    key={player.id}
                  >
                    <Player size={55}  player={player} onClick={() => handleClick(player)}/>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <BottomMenu />
    </div>
  )
}
