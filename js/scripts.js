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
    {
      name: 'Ivysaur',
      height: 1,
      types: [
        'grass',
        'poison'
      ]
    },
    {
      name: 'Arbok',
      height: 3.5,
      types: [
        'poison'
      ]
    },
  ];
  
//add all height values
let totalHeight = pokemonList.reduce((acc, curr)=> curr.height + acc, 0); 
//get number of object inside the array
let itemCount = pokemonList.length; 

//calculate the average height 
let averageHeight = totalHeight/itemCount; //?

//removed this
let positiveRange = .2 + averageHeight;
let negitiveRange = averageHeight - .2;


  function getAll(){
    return pokemonList;
  }
  function add(item){
    // Check for object type and if the object is empty
    if(typeof(item) == 'object' && item != undefined){
      let itemKeys = Object.keys(item)                  // get itemKeys to define/validate what is being passed
      let listKeys = Object.keys(pokemonList[0])        // get the original keys from the pokemonList array (1st object)
      let addToList = true;                             // define a switch to display/add output to list
      itemKeys.forEach((key, i) => {                    // iterate through the array of keys
        if(key != listKeys[i]){                         // if key does not equal what is in the listKeys (original) array
          addToList = false;                            // do not add to list
          document.write(`'keys need to match [${listKeys}] <br>`);
          throw new Error(`'keys need to match [${listKeys}] <br>`)
        }
      });
      if(addToList){                                    // if addToList is not set to false on line 61
        item
        pokemonList.push(item);                         // add (push) item to the list
        pokemonList
      }
      
    //! if the item is an empty object or not an object at all
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
        return true;
      }
    })
    // if there is a match, the filtered array will store it in the 1st position
    if(filtered[0]){
      //select node to be used
      let filteredListItem = document.createElement('li');
      let button = document.createElement('button');
      let pokemonListNode = document.querySelector('.pokemon-list');
      let filteredList = document.createElement('ul');
      
      // insert new list item alongside the pokemonListNode
      pokemonListNode.insertAdjacentElement('afterend', filteredList)
      
      // add classes
      filteredList.classList.add('filtered-list')
      filteredListItem.classList.add('filtered-item')
      button.classList.add('btn--filtered')
      
      // append
      filteredListItem.append(button)
      filteredList.append(filteredListItem)
      
      //insert text
      button.innerText = `You Selected ${filtered[0].name}`;
      
      //add event
      events(button, filtered[0])
    }else{
      document.write(`Sorry there is no pokemon by that name in my list. <br>` )
    }
  }
  function addListItem(pokemon){  
    //select/create nodes to be used
    let pokemonListNode = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    
    if(pokemon.height < pokemonRepository.positiveRange){
      button.innerText = `${pokemon.name} is below the set average height.`;
    }else if(pokemon.height > pokemonRepository.positiveRange){
      button.innerText = `${pokemon.name} is well above the set average height.`;
    }else{
      button.innerText = `${pokemon.name} is closest to the set average height.`;
    }
    button.classList.add('btn')
    listItem.append(button)
    pokemonListNode.append(listItem)
    // call the events function
    events(button, pokemon);
  }
  function showDetails(pokemon){
    console.log(pokemon)
  }
  function events(button, pokemon){
    button.addEventListener("click", ()=>{
      return showDetails(pokemon);
    })
  }
  return{
    add: add,
    getAll: getAll,
    filterByName: filterByName,
    addListItem: addListItem,
    positiveRange: positiveRange,
    negitiveRange: negitiveRange
  }
})();

//add new pokemon
pokemonRepository.add({name:'Clefairy', height: 1.5, types:['fairy']})


//? SORT THROUGH ARRAY BASED ON HEIGHT
// pokemonList is removed from global context
// pokemonRepository.getAll() is how it can be accessed
pokemonRepository.getAll().forEach(element => {
  pokemonRepository.addListItem(element)
});

//filter pokemon from the pokemon list
pokemonRepository.filterByName('Charmandoer')

//display the entire list of pokemon
//console.log(pokemonRepository.getAll());