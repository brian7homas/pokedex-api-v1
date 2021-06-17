let pokemonRepository = (function(){
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
  
//add all height values
let totalHeight = pokemonList.reduce((acc, curr)=> curr.height + acc, 0); //3.3
//get number of object inside the array
let itemCount = pokemonList.length; //4 

//calculate the average height 
let averageHeight = totalHeight/itemCount; //0.825

// variable using this to be accessible in global context
this.positiveRange = .2 + averageHeight; //1.025
this.negitiveRange = averageHeight - .2;  //0.625


  function getAll(){
    return pokemonList;
  }
  function add(item){
    if(typeof(item) == 'object' && item != undefined){
      let itemKeys = Object.keys(item) // get itemKeys to define/validate what is being passed
      let listKeys = Object.keys(pokemonList[0]) // get the original keys from the pokemonList array (1st object)
      let addToList = true; // define a switch to display output from add function on line
      itemKeys.forEach((key, i) => {
        if(key != listKeys[i]){ // if key does not equal what is in the listKeys array
          addToList = false;    // do not add to list
          document.write(`'keys need to match [${listKeys}] <br>`);
          throw new Error(`'keys need to match [${listKeys}] <br>`)
        }
      });
      if(addToList){
        pokemonList.push(item);  
      }
      
    }else if(item == undefined ){
      document.write('Make sure your passing an object and that it is not empty <br>')
      document.write('Also make sure your passing [name: string, height: int, type: object]')
      throw new Error('This add function only takes objects.<br>')
    }
  }
  function filterByName(name){
    // store the filtered array in filtered variable
    let filtered = pokemonList.filter(pokemon => {
      if(pokemon.name == name){
        pokemon.name 
        name 
        return true;
      }
    })
    // if there is a match, the filtered array will store it in the 1st position
    if(filtered[0]){
      document.write(`You selected ${filtered[0].name} <br>` )
    }else{
      document.write(`Sorry there is no pokemon by that name in my list. <br>` )
    }
  }
  return{
    add: add,
    getAll: getAll,
    filterByName: filterByName
  }
})();

console.log(pokemonRepository.add({name:'Takka', height: 1, types:{}}));
console.log(pokemonRepository.getAll());
console.log(pokemonRepository.filterByName('Charmandoer'));

//? SORT THROUGH ARRAY BASED ON HEIGHT
// pokemonList is removed from global context
// pokemonRepository.getAll() is how it can be accessed
pokemonRepository.getAll().forEach(element => {
  if(element.height < negitiveRange){
    document.write(`${element.name} is below the set average height. <br>`)
  }else if(element.height > positiveRange){
    document.write(`${element.name} is well above the set average height. <br>`)
  }else{
    document.write(`${element.name} is closest to the set average height. <br>`)
  }
});