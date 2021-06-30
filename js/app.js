// const fetch = require('node-fetch');
// import validate from './modules/validate.js';
let plist = [];
let index = 0;
let previousValue = document.querySelector('#search').value;
let isWaiting = false;
let pokemonRepository = (function(){
  const URL = 'https://pokeapi.co/api/v2/pokemon/';
  fetch(URL).then(function(res){
    return res.json();
  }).then(function(json){
    json.results.forEach(function(item){
      callBack(item)
    })
  })
  
  let callBack = (function(list){
    fetch(list.url).then(function(res){
      return res.json();
    }).then(function(json){
      let pokemon = {
        id: json.id,
        imgUrl: json.sprites.other.dream_world.front_default,
        name: json.name,
        height: json.height,
        weight: json.weight,
        abilities: json.abilities,
        png: json.sprites.front_default,
        types: json.types
      }
      
      let ObjectTest = [{'id': '','imgUrl': '', 'name':'','height':'','weight':'','abilities':'','png':'','types':''}];
      let itemKeys = Object.keys(pokemon);
      let testKeys = Object.keys(ObjectTest[0]);
      let pokemonObject = typeof(pokemon);
      switch(pokemonObject){
        case 'array':
          console.log('This is an array')
          break;
        case 'object':
          testKeys.forEach((key, i) => {
            if(key != itemKeys[i]){
              document.write(`'keys need to match [${itemKeys}] <br>`);
              throw new Error(`'keys need to match [${itemKeys}] <br>`)
            }
          });
          return build(pokemon, plist).add(pokemon)
        case 'string':
            console.log('This is an string')
            break;
        case 'number':
          console.log('This is an number')
          break;
        case 'boolean':
          console.log('This is an bool')
          break;
        case 'undefined':
            console.log('You need to pass something')
            break;
        default:
          console.log('this is a ' + pokemonObject)
      }
    })
  })
})();

let build = (function (data, list){
  let fromList = list;
  let fromFetch = data;
  // takes data directly from fetch
  // to build carousel items
  let carousel = (function (fromFetch){
    let itemHook = document.querySelector('.carousel-inner')
    // let name = (function(){return `The pokemon's name is ${fromFetch.name}`})()
    let name = fromFetch.name
    let item = `<div class="carousel-item">
    <img class="d-block w-100 h-100 main-img" src="${fromFetch.imgUrl}" alt="${fromFetch.name} slide">
    <div class="carousel-caption d-xs-block mb-5">
      <button type="button" class="btn btn-primary get-info" data-toggle="modal" data-target="#exampleModal2" onclick="modal()">
        ${name}
      </button>
    </div>
  </div>`;
  itemHook.insertAdjacentHTML('beforeend', item)
  if(!document.querySelector('.carousel-item').classList.contains('active')){
    //IF THERE IS NO ACTIVE CLASS -- SET ONE
    document.querySelector('.carousel-item').classList.add('active')
  }
    })(fromFetch)
  
  // takes data directly from fetch
  // to build carousel items  
  let indicators = (function (fromFetch){
    let itemHook =  document.querySelector('.carousel-indicators')
    let indicator = `<li data-target="#carouselExampleIndicators" data-slide-to="${index++}" class="carousel-indicator"><img class="indicator-img w-100" src="${fromFetch.png}" alt="${fromFetch.name}"/></li>`
    itemHook.insertAdjacentHTML('beforeend', indicator)
    })(fromFetch)
  
  //adds the pokemon to the array
  function add(pokemon){
    if(pokemon){
      fromList.push(pokemon)
    }
  }
  return{
    add:add
  }
});

function searchFunction(){
  let timer;
  let value = (function(){return document.querySelector('input#search').value;})()
  let searchHook = document.querySelector('#search-result');
  if(previousValue != value || value != false){
    clearTimeout(timer)
    if(value != null){
      if(!isWaiting){
        searchHook.innerText = 'loading..'
      }
      timer = setTimeout(()=>{
        let results = plist.filter(pokemon=>{
          if(pokemon.name === value){
            return pokemon
          }
        })
        let searchHook = document.querySelector('#search-result');
        if(results.length != 0){
          searchHook.innerText = results[0].name
          let result = `
            <a data-toggle="modal" data-target="#exampleModal2" onclick="modal('${results[0].name}')" id="search-result" class="nav-link active" href="#">
              <div class="search-display">
                <img class="search-display__img" src="${results[0].imgUrl}" />
              </div>
            </a>
          `
          return searchHook.insertAdjacentHTML('beforeend', result)  
        }else{
          searchHook.innerText = 'No results'
        }
      }, 850)
    }
  }
  previousValue = value;
}

function modal(search = null){
  function capitalize(str){
    String(str)
    let lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1)
  }
  // THE SEARCH PARAMETER CONTAINS A STRING 
  if(search != null){
    // THE RESULT GETS WHAT IS RETURNED IN SEARCH-RESULT
    let searchResult = document.querySelector('#search-result').innerText;
    // STRIP WHITESPACE
    searchResult = searchResult.trim();
    
    for(let i = 0; i < plist.length; i++){
      let listName = plist[i].name
      if(listName === searchResult){
        // console.log(listName)
        let modal = (function(){
          let listName = capitalize(plist[i].name)
          //IF THERE IS A MATCH WITH POKEMON THAT IS DISPLAYED AND WHAT IS IN THE ARRAY
          
          let currentModal = document.querySelector('.modal')
          let modal = document.querySelector('.modal-content')
          let title = document.querySelector('.modal-title');
          let img = document.querySelector('.modal-body img');
          let abilityList = document.querySelector('.ability-list')
          let abilities = document.querySelectorAll('#abilities')
          let type = document.querySelectorAll('#type')
          let typeList = document.querySelector('.type-list')
          let height = document.querySelector('#height')
          let weight = document.querySelector('#weight')
          
          if(currentModal){
            if(abilities){
              abilities.forEach((el)=>{
                el.remove()
                return true;
              })
              type.forEach((el)=>{
                el.remove()
                return true
              })
            }
          }
          
          let result = plist[i];
          title.innerText = result.name;
          img.setAttribute('src', `${result.imgUrl}`);
          height.innerText = `Height: ${result.height}`;
          weight.innerText = `Weight: ${result.weight}`;
          modal.setAttribute('style', `background-image: linear-gradient(to left bottom, hsla(6, 83%, 43%, 1), hsla(0, 0%, 91%, .6)), url(${result.imgUrl});`)
          let buildAblitiesList = (function(){  
            for(let i = 0; i < result.abilities.length; i++){
              let li = `<li id="abilities" class="text-dark list-group-item">${result.abilities[i].ability.name}</li>`
              abilityList.insertAdjacentHTML('afterbegin', li)
            }
            
          })()
          let buildTypesList = (function(){
            for(let i = 0; i < result.types.length; i++){
              let li = `<li id="type" class="text-dark list-group-item">${result.types[i].type.name}</li>`
              typeList.insertAdjacentHTML('afterbegin', li)
            }
          })()
        
          
        
        })()
      }
    }
  }else{
    // CURRENT DISPLAYED POKEMON'S NAME
    let activePokemon = document.querySelector('div.active div button').innerText;
    activePokemon = capitalize(activePokemon)
    let modal = (function(){
      for(var i = 0; i < plist.length; i++){
        let listName = capitalize(plist[i].name)
        //IF THERE IS A MATCH WITH POKEMON THAT IS DISPLAYED AND WHAT IS IN THE ARRAY
        if(listName === activePokemon){
          let currentModal = document.querySelector('.modal')
          let modal = document.querySelector('.modal-content')
          let title = document.querySelector('.modal-title');
          let img = document.querySelector('.modal-body img');
          let abilityList = document.querySelector('.ability-list')
          let abilities = document.querySelectorAll('#abilities')
          let type = document.querySelectorAll('#type')
          let typeList = document.querySelector('.type-list')
          let height = document.querySelector('#height')
          let weight = document.querySelector('#weight')
          
          if(currentModal){
            if(abilities){
              abilities.forEach((el)=>{
                el.remove()
                return true;
              })
              type.forEach((el)=>{
                el.remove()
                return true
              })
            }
          }
          
          let result = plist[i];
          title.innerText = result.name;
          img.setAttribute('src', `${result.imgUrl}`);
          height.innerText = `Height: ${result.height}`
          weight.innerText = `Weight: ${result.weight}`
          modal.setAttribute('style', `background-image: linear-gradient(to left bottom, hsla(6, 83%, 43%, 1), hsla(0, 0%, 91%, .6)), url(${result.imgUrl});`)
          let buildAblitiesList = (function(){  
            for(let i = 0; i < result.abilities.length; i++){
              let li = `<li id="abilities" class="text-dark list-group-item">${result.abilities[i].ability.name}</li>`
              abilityList.insertAdjacentHTML('afterbegin', li)
            }
            
          })()
          let buildTypesList = (function(){
            for(let i = 0; i < result.types.length; i++){
              let li = `<li id="type" class="text-dark list-group-item">${result.types[i].type.name}</li>`
              typeList.insertAdjacentHTML('afterbegin', li)
            }
          })()
        }else{
          console.log(listName + ' is not a match')
        }
        
      }
    })()
    //SEARCH THROUGH THE ARRAY LIST OF POKEMON
    
  }
}