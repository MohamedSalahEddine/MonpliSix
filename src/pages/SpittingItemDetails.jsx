// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import BottomMenu from '../components/BottomMenu'
// import users from '../db_players.js'
// import { useParams } from 'react-router-dom'
// import spitting_items from '../db_spitting_items.js'
// import PLayer from "../components/Player.jsx"

// export default function SpittingItemDetails() {

//     const [users, setUsers] = useState(null)
//     const [item, setItem] = useState(null)

//     const {id} = useParams()    

//     useEffect(()=>{
//     const loadData = async ()=>{
//         const  [resUsers, resItem ] = await Promise.all([
//              fetch ("http://localhost:3001/users/spittingUsers/"+id),
//              fetch ("http://localhost:3001/spittingItems/"+id)
//         ])

//         if (!resUsers.ok) throw new Error("Failed to fetch spitting users");
//         if (!resItem.ok) throw new Error("Failed to fetch spitting item");
//         const [dataUsers, dataItem] = await Promise.all([
//             resUsers.json(),
//             resItem.json(),
//         ]) 
        
//         setUsers(dataUsers)      
//         setItem(dataItem[0])      
        
//     }

//     loadData()
//     },[])
   
//     if(users === null || item === null ) return "loading..."
    
//     const {id:idd, title, img , price, date} =  item

//     const nbr_users = users.length

//     console.log(users);
    
//     // rounding up to tens
//     const price_per_user =  parseInt( price / nbr_users ) +  (10 -  parseInt( price / nbr_users ) % 10)
    
//   return (
//     <div className='frame spitting_item_details text-white'>
//          <Link to={"/spitting"}>
//             <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
//         </Link>
        
//         <div className='spitting_item_details_top flex flex-col items-center gap-4'>
//             <span className='text-right w-full'>{date.toString().split("T")[0]} </span>
//             <img className='spitting_item_details_img' src={`/images/${img === "" ? "joueurs/camera-solid.svg" : img}`} alt="pic" />
//             <span className='text-4xl flex items-center gap-1'> 
//                 <span className='text-2xl'>DA</span> 
//                 {price} / {nbr_users}
//             </span>
//             <span className={"text-blue-500 text-4xl"}>DA {  price_per_user }</span>
//         </div>
//         <div className='spitting_item_details_bottom flex h-[60vh] mt-4'>
//             <div className='paid w-[49%] border-r-2 border-gray-400 overflow-scroll flex flex-wrap content-start justify-center gap-2'>
//                 <p className="text-[#35e455] text-center w-full self-start text-4xl">DA { price_per_user * users.filter(user => user.date_paid !== null).length}</p>
//                 {
//                     users.filter(user => user.date_paid !== null).map(user=>{
//                         return <PLayer key={user.id} display_rating={false} player={user}/>
//                     })
//                 }
//             </div>
//             <div className='paid w-[49%] overflow-scroll flex flex-wrap content-start justify-center gap-2'>
//                 <p className="text-[#f46464] text-center w-full self-start text-4xl">DA { price_per_user * users.filter(user => user.date_paid === null).length}</p>
//                 {
//                     users.filter(user => user.date_paid === null).map(user=>{
//                         return <PLayer key={user.id} display_rating={false} player={user}/>
//                     })
//                 }
//             </div>
            
//         </div>

//         <BottomMenu />
//     </div>
//   )
// }





























































import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BottomMenu from '../components/BottomMenu'
import { useParams } from 'react-router-dom'
import PLayer from "../components/Player.jsx"

export default function SpittingItemDetails() {
    const [users, setUsers] = useState(null)
    const [item, setItem] = useState(null)
    const [draggedUser, setDraggedUser] = useState(null)
    const {id} = useParams()    

    useEffect(() => {
        const loadData = async () => {
            const [resUsers, resItem] = await Promise.all([
                fetch("http://localhost:3001/users/spittingUsers/"+id),
                fetch("http://localhost:3001/spittingItems/"+id)
            ])

            if (!resUsers.ok) throw new Error("Failed to fetch spitting users");
            if (!resItem.ok) throw new Error("Failed to fetch spitting item");
            
            const [dataUsers, dataItem] = await Promise.all([
                resUsers.json(),
                resItem.json(),
            ]) 
            
            setUsers(dataUsers)      
            setItem(dataItem[0])      
        }

        loadData()
    }, [id])
   
    if(users === null || item === null) return "loading..."
    
    const {id: idd, title, img, price, date} = item
    const nbr_users = users.length
    
    // rounding up to tens
    const price_per_user = parseInt(price / nbr_users) + (10 - parseInt(price / nbr_users) % 10)

    // Handle drag start
    const handleDragStart = (e, user) => {
        setDraggedUser(user)
        e.dataTransfer.setData('text/plain', user.id)
    }

    // Handle drag over
    const handleDragOver = (e) => {
        e.preventDefault()
    }

    // Handle drop to mark as paid
    const handleDropPaid = async (e) => {
        e.preventDefault()
        if (!draggedUser) return
        
        // Update locally first for instant feedback
        const updatedUsers = users.map(user => 
            user.id === draggedUser.id ? {...user, date_paid: new Date().toISOString()} : user
        )
        setUsers(updatedUsers)
        
        // Update in the database
        try {
            const response = await fetch(`http://localhost:3001/users/markPaid/${draggedUser.id}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            
            if (!response.ok) {
                // Revert if API call fails
                setUsers(users)
                throw new Error('Failed to update payment status')
            }
        } catch (error) {
            console.error('Error updating payment status:', error)
        }
    }

    // Handle drop to mark as unpaid
    const handleDropUnpaid = async (e) => {
        e.preventDefault()
        if (!draggedUser) return
        
        // Update locally first for instant feedback
        const updatedUsers = users.map(user => 
            user.id === draggedUser.id ? {...user, date_paid: null} : user
        )
        setUsers(updatedUsers)
        
        // Update in the database
        try {
            const response = await fetch(`http://localhost:3001/users/markUnpaid/${draggedUser.id}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            
            if (!response.ok) {
                // Revert if API call fails
                setUsers(users)
                throw new Error('Failed to update payment status')
            }
        } catch (error) {
            console.error('Error updating payment status:', error)
        }
    }

    return (
        <div className='frame spitting_item_details text-white'>
            <Link to={"/spitting"}>
                <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
            </Link>
            
            <div className='spitting_item_details_top flex flex-col items-center gap-4'>
                <span className='text-right w-full'>{date.toString().split("T")[0]} </span>
                <img className='spitting_item_details_img' src={`/images/${img === "" ? "joueurs/camera-solid.svg" : img}`} alt="pic" />
                <span className='text-4xl flex items-center gap-1'> 
                    <span className='text-2xl'>DA</span> 
                    {price} / {nbr_users}
                </span>
                <span className={"text-blue-500 text-4xl"}>DA {price_per_user}</span>
            </div>
            
            <div className='spitting_item_details_bottom flex h-[60vh] mt-4'>
                <div 
                    className='paid w-[49%] border-r-2 border-gray-400 overflow-scroll flex flex-wrap content-start justify-center gap-2'
                    onDragOver={handleDragOver}
                    onDrop={handleDropPaid}
                >
                    <p className="text-[#35e455] text-center w-full self-start text-4xl">
                        DA {price_per_user * users.filter(user => user.date_paid !== null).length}
                    </p>
                    {users.filter(user => user.date_paid !== null).map(user => (
                        <div 
                            key={user.id} 
                            draggable 
                            onDragStart={(e) => handleDragStart(e, user)}
                        >
                            <PLayer display_rating={false} player={user}/>
                        </div>
                    ))}
                </div>
                
                <div 
                    className='unpaid w-[49%] overflow-scroll flex flex-wrap content-start justify-center gap-2'
                    onDragOver={handleDragOver}
                    onDrop={handleDropUnpaid}
                >
                    <p className="text-[#f46464] text-center w-full self-start text-4xl">
                        DA {price_per_user * users.filter(user => user.date_paid === null).length}
                    </p>
                    {users.filter(user => user.date_paid === null).map(user => (
                        <div 
                            key={user.id} 
                            draggable 
                            onDragStart={(e) => handleDragStart(e, user)}
                        >
                            <PLayer display_rating={false} player={user}/>
                        </div>
                    ))}
                </div>
            </div>

            <BottomMenu />
        </div>
    )
}