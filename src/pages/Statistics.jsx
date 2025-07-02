import React, { useEffect, useState } from 'react'
import BottomMenu from '../components/BottomMenu'
import StatisticsEntry from '../components/StatisticsEntry'
import StatisticsSet from '../components/StatisticsSet'
import BASE_URL from '../utils/url.js'

export default function Statistics() {

  const [last_game_goals, setLastGameGoals] = useState([])
  const [all_time_goals, setAllTimeGoals] = useState([])
  const [avg_game_goals, setAvgGameGoals] = useState([])

  const [last_game_ratings, setLastGameRatings] = useState([])
  const [all_time_ratings, setAllTimeRatings] = useState([])


  const [all_time_wins, setAllTimeWins] = useState([])
  const [avg_game_wins, setAvgGameWins] = useState([])


  useEffect(()=>{
    const loadData = async () => {
      const [
              res_last_game_goals,
              res_all_time_goals,
              res_avg_game_goals,
              res_last_game_ratings,
              res_all_time_ratings,

              res_all_time_wins,
              res_avg_game_wins

            ] = await Promise.all(
              [
                //                     goals
                fetch(BASE_URL+"/stats/lastgame/goals"),
                fetch(BASE_URL+"/stats/alltime/goals"),
                fetch(BASE_URL+"/stats/avggame/goals"),
                //                     ratings
                fetch(BASE_URL+"/stats/lastgame/ratings"),
                fetch(BASE_URL+"/stats/alltime/ratings"),

                // //                     wins
                fetch(BASE_URL+"/stats/alltime/wins"),
                fetch(BASE_URL+"/stats/avggame/wins"),


                

              ]
            ) 


      const [
        data_last_game_goals,
        data_all_time_goals,
        data_avg_game_goals,

        data_last_game_ratings,
        data_all_time_ratings,


        data_all_time_wins,
        data_avg_game_wins,

      ] = await  Promise.all([
        res_last_game_goals.json(),
        res_all_time_goals.json(),
        res_avg_game_goals.json(),

        res_last_game_ratings.json(),
        res_all_time_ratings.json(),


        res_all_time_wins.json(),
        res_avg_game_wins.json(),

      ]) 

      
      setLastGameGoals(data_last_game_goals.data);
      setAllTimeGoals(data_all_time_goals.data);
      setAvgGameGoals(data_avg_game_goals.data)

      setLastGameRatings(data_last_game_ratings.data);
      setAllTimeRatings(data_all_time_ratings.data);


      setAllTimeWins(data_all_time_wins.data);
      setAvgGameWins(data_avg_game_wins.data)


    }
    loadData()
  }, [])

  if(all_time_goals === null || last_game_goals === null) return "loading stats"

  return (
    <div className='statistics frame flex flex-col'> 
      <div className='container flex-1 flex flex-col gap-2 justify-center'>
        
        <div className='last_game flex-[.3] w-full bg-red-300 px-1 py-1 flex justify-evenly relative'>
          <span className='text-black text-sm absolute top-0 left-0'>Last Game</span>
          <StatisticsSet title={"buts"} set={last_game_goals}/>
          <StatisticsSet title={"mvp"} set={last_game_ratings}/>
        </div>
        <div className='last_game flex-[.3] w-full bg-green-300 px-2 py-1 flex justify-evenly relative'>
          <span className='text-black text-sm absolute top-0 left-0'>All Time</span>
          <StatisticsSet title={"buts"} set={all_time_goals}/>
          <StatisticsSet title={"mvp"} set={all_time_ratings}/>
          <StatisticsSet title={"victoires"} set={all_time_wins}/>
        </div>
        <div className='last_game flex-[.3] w-full bg-blue-300 px-2 py-1 flex justify-evenly relative'>
          <span className='text-black text-sm absolute top-0 left-0'>Avg </span>
          <StatisticsSet title={"buts"} set={avg_game_goals}/>
          <StatisticsSet title={"victoires"} set={avg_game_wins}/>
        </div>
        

      </div>
      <BottomMenu />
    </div>
  )
}































