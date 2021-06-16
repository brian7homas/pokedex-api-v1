//data
let pokemonList = [
  {
    name: 'Charmandoer',
    height: 0.6,
    types: [
      'fire',
      'speed'
    ]
  },
  {
    name: 'Pidgey',
    height: 0.3,
    types: [
      'flying',
      'normal'
    ]
  },
  {
    name: 'Nidoking',
    height: 1.4,
    types: [
      'ground',
      'poison'
    ]
  },
  {
    name: 'Weepinbell',
    height: 1,
    types: [
      'grass',
      'poison'
    ]
  },
];


//define variables in the global scope 

/*
  reduce adds the current height(curr.height)
  to the accelorator (acc)
*/

//add all height values
let totalHeight = pokemonList.reduce((acc, curr)=> curr.height + acc, 0); //3.3
//get number of object inside the array
let itemCount = pokemonList.length; //4 

//calculate the average height 
let averageHeight = totalHeight/itemCount; //0.825

//set a range of .2 ABOVE the average height
let positiveRange = .2 + averageHeight //1.025

//set a range of .2 BELOW the average height
let negitiveRange = averageHeight - .2  //0.625

//iterate through the array using itemCount
for(let i = 0; i < itemCount; i++){
  //if object's height value is LESS THAN the set negitive range
  if(pokemonList[i].height < negitiveRange){
    document.write(`${pokemonList[i].name} is below the set average height.<br>`);
  }
  //if object's height value is GREATER than the set positive range
  else if(pokemonList[i].height > positiveRange ){
    document.write(`${pokemonList[i].name} is well above the set average height.<br>`);
  }
  //if object's height value is within .2 of the averageHeight
  else{
    document.write(`${pokemonList[i].name}  is the closest to average height.<br>`) //?
  }
}