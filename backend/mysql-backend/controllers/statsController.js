import { db } from "../db.js";



const getLastGameGoals = async (req, res) =>{
    try{
        const sql = `SELECT
                        players.name,
                        COUNT(goals.id) AS value
                    FROM 
                        players INNER JOIN goals ON players.id = goals.player_id
                    WHERE
                        goals.date_time >(SELECT MAX(game.created_at) FROM game)
                    GROUP BY
                        players.name
                    ORDER BY value DESC
                    LIMIT 3`
        const [data] = await db.query(sql)
        if (!data) return res.status(404).json({message : "no stats found"})
        // console.log(res);
        
        return res.status(200).json({data})
    }catch(error){
        console.log(error);
        
    }
}


const getAllTimeGoals = async (req, res) =>{
    try{
        const sql =   `(    SELECT
                                players.name,
                                COUNT(goals.player_id) AS value
                            FROM
                                players INNER JOIN goals ON players.id = goals.player_id
                            GROUP BY
                                players.name
                            ORDER BY 
                                value  DESC
                            LIMIT 3
                        )
                        UNION
                        (   SELECT
                                players.name,
                                COUNT(goals.player_id) AS value
                            FROM
                                players INNER JOIN goals ON players.id = goals.player_id
                            GROUP BY
                                players.name
                            ORDER BY 
                                value  ASC
                            LIMIT 1
                        )`
        const [data] = await db.query(sql)
        if (!data) return res.status(404).json({message : "no stats found"})
        // console.log(res);
        
        return res.status(200).json({data})
        
    }catch(error){
        console.log(error);
        
    }
}

const getAvgGameGoals = async (req, res) =>{
    try{
        const sql = `SELECT
                        p.name,
                        ROUND(
                            COUNT( DISTINCT CASE WHEN g.own_goal = 0 THEN g.id END ) / COUNT(DISTINCT t.game_id)
                        , 1) AS value
                    FROM
                        players p
                    LEFT JOIN goals g ON
                        p.id = g.player_id AND g.own_goal = 0
                    LEFT JOIN team_players tp ON
                        p.id = tp.player_id
                    LEFT JOIN teams t ON
                        tp.team_id = t.id
                    GROUP BY
                        p.id,
                        p.name
                    ORDER BY VALUE DESC
                    LIMIT 3`
        const [data] = await db.query(sql)
        if (!data) return res.status(404).json({message : "no stats found"})

        return res.status(200).json({data})
    }catch(error){
        console.log(error);
        
    }
}



























const getLastGameRatings = async (req, res)=>{
    
    const sql = `SELECT
                    p.name,
                    ROUND(AVG(r.rating), 1) as value
                FROM
                    players p
                RIGHT JOIN ratings r ON
                    p.id = r.rated_id
                WHERE r.rated_id IN( SELECT tp.player_id FROM team_players tp WHERE tp.team_id IN (
                        SELECT
                            t.id
                        FROM
                            teams t
                        WHERE
                            t.game_id = ( SELECT MAX(id) FROM game )
                    )
                )
                GROUP BY p.name
                ORDER BY value DESC
                LIMIT 3`
    try{
        const [data] = await db.query(sql)
        if(!data) return res.sattus(404).json({message : "no last game ratings found"})

        return res.status(200).json({data})
    }catch(error){
        console.log("problem from server");      
    }
}


const getAllTimeRatings = async (req, res)=>{
     const sql = `SELECT
                    p.name,
                    ROUND(AVG(r.rating), 1) as value
                FROM
                    players p
                RIGHT JOIN ratings r ON
                    p.id = r.rated_id
               
                GROUP BY p.name
                ORDER BY value DESC
                LIMIT 3`
    try{
        const [data] = await db.query(sql)
        if(!data) return res.sattus(404).json({message : "no last game ratings found"})

        return res.status(200).json({data})
    }catch(error){
        console.log("problem from server");      
    }

}

































const getAllTimeWins = async (req, res)=>{
     const sql = ``
    const data = [
        {name : "toko", value : 17},
        {name : "tarek", value : 15},
        {name : "nabil", value : 14},
    ]
    return res.status(200).json({data})

}
const getAvgGameWins = async (req, res)=>{
     const sql = ``
    const data = [
        {name : "toko", value : 67.3},
        {name : "tarek", value : 60.1},
        {name : "nabil", value : 55.6},
    ]
    return res.status(200).json({data})

}












export { getLastGameGoals, getAllTimeGoals, getAvgGameGoals, 
         getLastGameRatings, getAllTimeRatings, 
                            getAllTimeWins, getAvgGameWins}