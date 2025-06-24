import React, { useEffect, useState } from 'react'
import BottomMenu from '../components/BottomMenu'
import StatisticsEntry from '../components/StatisticsEntry'
import StatisticsSet from '../components/StatisticsSet'

export default function Statistics() {

  const [all_time_goals, setAllTimeGoals] = useState([])
  const [last_game_goals, setLastGameGoals] = useState([])
  const [avg_game_goals, setAvgGameGoals] = useState([])


  useEffect(()=>{
    const loadData = async () => {
      const [
              res_all_time_goals,
              res_last_game_goals,
              res_avg_game_goals,
            ] = await Promise.all(
              [
                fetch("https://monplisix.onrender.com/stats/alltime/goals"),
                fetch("https://monplisix.onrender.com/stats/lastgame/goals"),
                fetch("https://monplisix.onrender.com/stats/avggame/goals"),

              ]
            ) 
      const [
        data_all_time_goals,
        data_last_game_goals,
        data_avg_game_goals,
      ] = await  Promise.all([
        res_all_time_goals.json(),
        res_last_game_goals.json(),
        res_avg_game_goals.json(),
      ]) 

      
      // console.log("all time", data_all_time_goals);
      // console.log(data_last_game_goals);
      // console.log(data_avg_game_goals);
      
      setAllTimeGoals(data_all_time_goals.data);
      setLastGameGoals(data_last_game_goals.data);
      setAvgGameGoals(data_avg_game_goals.data)
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
        </div>
        <div className='last_game flex-[.3] w-full bg-green-300 px-2 py-1 flex justify-evenly relative'>
          <span className='text-black text-sm absolute top-0 left-0'>All Time</span>
          <StatisticsSet title={"buts"} set={all_time_goals}/>
        </div>
        <div className='last_game flex-[.3] w-full bg-blue-300 px-2 py-1 flex justify-evenly relative'>
          <span className='text-black text-sm absolute top-0 left-0'>Avg </span>
          <StatisticsSet title={"buts"} set={avg_game_goals}/>
        </div>
        

      </div>
      <BottomMenu />
    </div>
  )
}
