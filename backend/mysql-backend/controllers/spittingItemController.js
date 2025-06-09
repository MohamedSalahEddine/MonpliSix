import { db } from "../db.js";



const getAllSpittingItems = async (req, res) => {
    try{
        const [spitting_items] = await db.query("SELECT * FROM spitting_items")
        if(spitting_items.length < 1) return res.status(400).json({message : "no spitting_items found"})

        return res.status(200).json(spitting_items)
    }catch(error){
        res.status(500).json({mesasge : "server failed to retreive spitting items"})
    }
}


const getSpittingItem = async (req, res ) => {
    try{
        const [spitting_items] = await db.query("SELECT * FROM spitting_items WHERE id=?", [req.params.id])
        if(spitting_items.length < 1) return res.status(400).json({message : "no spitting_items found"})

        return res.status(200).json(spitting_items)
    }catch(error){
        res.status(500).json({mesasge : "server failed to retreive spitting items"})
    }
}


function addSpittingItem  (){

}


export {getAllSpittingItems, getSpittingItem, addSpittingItem}