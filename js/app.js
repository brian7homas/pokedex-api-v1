// const fetch = require('node-fetch');
let repository = (function(){
  let list = [{"name":'',"url": ''}];
  const URL = 'https://pokeapi.co/api/v2/pokemon/';  
  function loadPage(){
    const root = document.getElementById('root');
    const div = window.document.createElement('div');
    let ul = window.document.createElement('ul')
    let filteredList = document.createElement('ul');
    
    let li = window.document.createElement('li')
    let btn = window.document.createElement('button')
    let filteredListItem = document.createElement('li');
    let button = document.createElement('button');
    
    //attatach the div to the body/root
    root.appendChild(div);
    //give the div class of container
    div.classList.add('container');
    showLoadingMessage('.container')
    //attacth the ul to the div
    div.appendChild(ul)
    
    //add another list next the original
    ul.insertAdjacentElement('afterend', filteredList)
    
    
    //attatch the li to the ul
    filteredList.append(filteredListItem)
    //attatch the button to the filtered list item
    filteredListItem.append(btn)
    
    
    //attach the li to the ul
    // ul.appendChild(li)
    
    //attach the button to the li
    // li.appendChild(btn)
    
    ul.classList.add('pokemon-list')
    li.classList.add('pokemon-list__item')
    button.classList.add('btn')
    
    filteredList.classList.add('filtered-list')
    filteredListItem.classList.add('filtered-item')
    btn.classList.add('btn--filtered')
    return loadApi();
  }
  function loadApi(){
    fetch(URL).then(function(res){
      hideLoadingMessage()
      return res.json();
    }).then(function(json){
      json.results.forEach(function(item){
        let pokemon = {
          name: item.name,
          url: item.url
        }
        add(pokemon)
        // console.log(pokemon)
      })
    })
  }
  function loadDetails(pokemon){
    // showLoadingMessage('.filtered-list')
    fetch(pokemon).then(function(res){
      // hideLoadingMessage()
      return res.json();
    }).then(function(json){
      let details = {
        height: json.height,
        imgUrl: json.sprites.front_default
      }
      console.log(details)
    })
  }
  function add(item){
    if(typeof(item) == 'object' && item != undefined){
      let itemKeys = Object.keys(item) 
      // add pattern for name and url keys here
      let listKeys = Object.keys(list[0]) 
      let addToList = true; 
      
      itemKeys.forEach((key, i) => {
        if(key != listKeys[i]){
          addToList = false;
          document.write(`'keys need to match [${listKeys}] <br>`);
          throw new Error(`'keys need to match [${listKeys}] <br>`)
        }
      });
      if(addToList){
        list.push(item);
        addListItem(item);
        return list;
      }
      //! if the item is an empty object or not an object at all
    }else if(item == undefined ){
      document.write('Make sure your passing an object and that it is not empty <br>')
      document.write('Also make sure your passing [name: string, height: int, type: object]')
      throw new Error('This add function only takes objects.<br>')
    }
  }
  function filterByName(name){
    showLoadingMessage('.btn--filtered')
    setTimeout(()=>{
      // store the filtered array in filtered variable
      let filtered = list.filter(pokemon => {
      if(pokemon.name == name){
        return true;
      }
    })
    // if there is a match, the filtered array will store it in the 1st position
    if(filtered[0]){
      hideLoadingMessage();
      let button = document.querySelector('.btn--filtered');
      button.innerText = `You selected ${name}`
      events(button, filtered[0])
    }else{
      document.write(`Sorry there is no pokemon by that name in my list. <br>` )
    }
    }, 2200)
  }
  function addListItem(item){
    let pokemonListNode = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let btn = document.createElement('button')
    //attacth the listitem to the list iteself
    pokemonListNode.appendChild(listItem)
    btn.innerText = `${item.name}`;
    btn.classList.add('btn');
    listItem.appendChild(btn);
    events(btn, item)
  }
  function showLoadingMessage(selector){
    let el = document.querySelector(selector);
    return el.innerHTML = `<h1 class='loading' >Loading</h1>`;
  }
  function hideLoadingMessage(){
    let el = document.querySelector('.loading');
    return el.remove();
  }
  function showDetails(pokemon){
    return loadDetails(pokemon)
  }
  function events(button, pokemon){
    button.addEventListener("click", ()=>{
      return showDetails(pokemon.url);
    })  
    //!QUOKKA TESTING
    // return showDetails(pokemon.url);
  }
  return{
    loadApi : loadApi,
    loadPage : loadPage,
    filterByName : filterByName
  }
})();
repository.loadPage()
repository.filterByName('bulbasaur')