let users = [
  {
    name: "Adlene",
    img: "adlene",
    foot: "d",
    pos: "md",
    rating: 2.5,
    status: "invite",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("default")
  },
  {
    name: "Alla",
    img: "alla",
    foot: "d",
    pos: "at",
    rating: 8.5,
    status: "invite",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("default")
  },
  {
    name: "Aziz",
    img: "aziz",
    foot: "d",
    pos: "md",
    rating: 8.5,
    status: "invite",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("default")
  },
  {
    name: "Booba",
    img: "booba",
    foot: "d",
    pos: "at",
    rating: 7.5,
    status: "invite",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("default")
  },
  {
    name: "Chapou",
    img: "chapou.jpg",
    foot: "d",
    pos: "gb",
    rating: 7.9,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  },
  {
    name: "Ghani",
    img: "ghani",
    foot: "d",
    pos: "at",
    rating: 9.5,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  },
  {
    name: "Hamoudi",
    img: "hamoudi",
    foot: "d",
    pos: "at",
    rating: 7.2,
    status: "invite",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("default")
  },
  {
    name: "Jack",
    img: "jack",
    foot: "g",
    pos: "at",
    rating: 7.5,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  },
  {
    name: "Karim",
    img: "karim",
    foot: "d",
    pos: "at",
    rating: 7.5,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  },
  {
    name: "Naps",
    img: "naps",
    foot: "d",
    pos: "at",
    rating: 5.5,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  },
  {
    name: "Tarek",
    img: "tarek",
    foot: "d",
    pos: "at",
    rating: 8.1,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: true,
    last_played_date: getDate("recent")
  },
  {
    name: "Tech",
    img: "tech",
    foot: "d",
    pos: "at",
    rating: 4.5,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("default")
  },
  {
    name: "Tokoto",
    img: "tokoto",
    foot: "d",
    pos: "md",
    rating: 3.5,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: true,
    last_played_date: getDate("recent")
  },
  {
    name: "Youssri",
    img: "youssri",
    foot: "d",
    pos: "at",
    rating: 7.5,
    status: "invite",
    coor: "top-[0px] left-[140px]",
    selected: false,
    paid: false,
    last_played_date: getDate("default")
  },
  {
    name: "Zak",
    img: "zak",
    foot: "d",
    pos: "md",
    rating: 7.0,
    status: "permanent",
    coor: "top-2 right-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  },
  {
    name: "Isam",
    img: "isam",
    foot: "d",
    pos: "md",
    rating: 5.5,
    status: "invite",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  },
  {
    name: "Lamine",
    img: "",
    foot: "d",
    pos: "at",
    rating: 5.5,
    status: "invite",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  },
  {
    name: "Houssem",
    img: "",
    foot: "d",
    pos: "md",
    rating: 6.0,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  },
  {
    name: "Alilou",
    img: "",
    foot: "d",
    pos: "gb",
    rating: 6.5,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  },
  {
    name: "Seif",
    img: "",
    foot: "d",
    pos: "at",
    rating: 6.8,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: true,
    last_played_date: getDate("recent")
  },
  {
    name: "Paylou",
    img: "",
    foot: "d",
    pos: "at",
    rating: 7.3,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  },
  {
    name: "Kagawa",
    img: "",
    foot: "d",
    pos: "at",
    rating: 7.3,
    status: "permanent",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  },
  {
    name: "Patach",
    img: "patach",
    foot: "d",
    pos: "at",
    rating: 7.3,
    status: "invite",
    coor: "top-2 left-2",
    selected: false,
    paid: false,
    last_played_date: getDate("recent")
  }
];


function getDate(type){
  let today = new Date()
  today.setDate(today.getDate() - (type === "recent" ?   1 : 14))  
  return today.toISOString().split("T")[0]
}



function playerComparator(player1, player2){
  if(player1.last_played_date > player2.last_played_date){
    return -1
  }else if(player1.last_played_date < player2.last_played_date){
    return 1
  }else{
    if(player1.name > player2.name){
      return 1
    }else if(player1.name < player2.name){
      return -1
    }else{
      return 0
    }
  }
  // return player1.name - player2.name
  
}

users.sort(playerComparator)

// console.log(players);


export default users;
