import { db } from "../db.js";

const getAllTimeGoals = async (req, res) =>{
    try{
        const sql =   `(
                            SELECT
                                
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
                        (
                            SELECT
                                
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



// SELECT 
//   p.name,
//   COUNT(CASE WHEN g.own_goal = 0 THEN g.id END) AS total_goals,
//   COUNT(DISTINCT t.game_id) AS total_games
// FROM 
//   players p
// LEFT JOIN 
//   goals g ON p.id = g.player_id
// LEFT JOIN 
//   team_players tp ON p.id = tp.player_id
// LEFT JOIN 
//   teams t ON tp.team_id = t.id
// GROUP BY 
//   p.id, p.name;


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
                    LEFT JOIN Team_Players tp ON
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

export {getAllTimeGoals, getLastGameGoals, getAvgGameGoals}