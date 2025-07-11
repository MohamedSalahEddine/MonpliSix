// SELECT
//     game.id as game , teams.id as team , COUNT( team_goals.goal_id) as goal
// FROM
//     `game`  INNER  JOIN teams ON game.id = teams.game_id
// INNER JOIN team_goals ON teams.id = team_goals.team_id
// GROUP BY game, team


// SELECT
//     game.id as game, game.created_at as date , teams.id as team , COUNT( team_goals.goal_id) as goal
// FROM
//     `game`  INNER  JOIN teams ON game.id = teams.game_id
// INNER JOIN team_goals ON teams.id = team_goals.team_id
// WHERE teams.id IN (SELECT teams.game_id FROM team_players INNER JOIN teams ON team_players.team_id = teams.id WHERE team_players.player_id = 5)
// GROUP BY game, team



// SELECT g.id AS game_id, g.created_at AS date, tp.team_id, 
// -- goals of player's team
//  SUM(CASE WHEN tg.team_id = tp.team_id THEN 1 ELSE 0 END) AS team_score, 
// -- goals of the other team 
// SUM(CASE WHEN tg.team_id != tp.team_id THEN 1 ELSE 0 END) AS opponent_score, 
// -- as formatted string (you can also format it in your frontend)
//  CONCAT( SUM(CASE WHEN tg.team_id = tp.team_id THEN 1 ELSE 0 END), 
// ' - ', SUM(CASE WHEN tg.team_id != tp.team_id THEN 1 ELSE 0 END) ) AS score_display 
// FROM team_players tp JOIN teams t ON tp.team_id = t.id JOIN game g ON t.game_id = g.id LEFT JOIN team_goals tg ON tg.team_id IN 
// ( SELECT id FROM teams WHERE game_id = g.id )
//  WHERE tp.player_id = 5 GROUP BY g.id, g.created_at, tp.team_id 
// ORDER BY g.created_at DESC


// SELECT g.id AS game_id, g.created_at AS date, tp.team_id, 
//  SUM(CASE WHEN tg.team_id = tp.team_id THEN 1 ELSE 0 END) AS team_score, 

// SUM(CASE WHEN tg.team_id != tp.team_id THEN 1 ELSE 0 END) AS opponent_score, 

//  CONCAT( SUM(CASE WHEN tg.team_id = tp.team_id THEN 1 ELSE 0 END), 
// ' - ', SUM(CASE WHEN tg.team_id != tp.team_id THEN 1 ELSE 0 END) ) AS score_display 
// FROM team_players tp JOIN teams t ON tp.team_id = t.id JOIN game g ON t.game_id = g.id LEFT JOIN team_goals tg ON tg.team_id IN 
// ( SELECT id FROM teams WHERE game_id = g.id )
//  WHERE tp.player_id = 5 GROUP BY g.id, g.created_at, tp.team_id 
// ORDER BY g.created_at DESC

import React, { useEffect, useState } from 'react'
import BottomMenu from '../components/BottomMenu'

import players from '../db_players.js'
import Player from '../components/Player'
import games from "../db_games"
import GameHistory from '../components/GameHistory'
import { Link, useParams } from 'react-router-dom'
import BASE_URL from '../utils/url.js'



export default function PlayerHistory() {

  const[game_history, setGameHistory] = useState(null)
  const[profile, setProfile] = useState(null)
  const {id} = useParams()
  

  useEffect(()=>{
    const loadGames = async () => {
      try{
        const [resGames, resProfile] =  await Promise.all([
          fetch(BASE_URL+"/games/gamesHistory/"+id),
          fetch(BASE_URL+"/players/profile/"+id),
        ]) 
        const [dataGames, dataProfile] = await Promise.all([
          resGames.json(),
          resProfile.json()

        ])
        const {profile} = dataProfile
        // console.log( profile);
        // console.log(data);
        setGameHistory(dataGames)
        setProfile(profile)
        
        console.log(dataGames);
        
      }catch(error){
        console.log(error);
        
      }
      
    }

    loadGames()
  }, [])




  if(game_history === null ||profile === null) return "loading.."
  return (
    <div className="frame player_history flex flex-col">
      <div className='container flex flex-col flex-1 items-center  text-white m-auto '>

        <Link to={"../"}>
          <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
        </Link>
        <Player  player={profile} size={120}  />
        <div className='history_middle w-full flex-1 overflow-scroll scrollbar-hide'>
            {
              game_history.map(game => {
                  return <GameHistory key={game.game_id} game={game} />
              })
            }
        </div>
        <div className='history_bottom text-2xl flex justify-around w-full mb-2'>
            <div className='flex flex-col'>
              <span> {game_history.filter(game => parseInt( game.opponent_score) < parseInt( game.team_score)).length} - victoire</span>
              <span> {game_history.filter(game => parseInt( game.opponent_score) > parseInt( game.team_score)).length} - défaite</span>
              <span> {game_history.filter(game => parseInt( game.opponent_score) == parseInt( game.team_score)).length} - null</span>
            </div>
            <div className='flex flex-col justify-between'>
              <span className='flex gap-3'> <span>{profile.nbr_goals}</span> <img src="/images/futbol-solid.svg" alt="" /> </span>
              <span>{game_history.length} - مباريات  </span>
            </div>
        </div>
      </div>
      <BottomMenu />
    </div>
  )
}
