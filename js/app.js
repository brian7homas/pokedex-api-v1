// const fetch = require('node-fetch');
let pokemonRepository = [];
let index = 0;
let previousValue = document.querySelector('#search').value;
let isWaiting = false;
// GETS POKEMON
(function(){
  const URL = 'https://pokeapi.co/api/v2/pokemon/';
  fetch(URL).then(function(res){
    return res.json();
  }).then(function(json){
    json.results.forEach(function(item){
      callBack(item);
    });
  });
  
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
      };
      
      let ObjectTest = [{'id': '','imgUrl': '', 'name':'','height':'','weight':'','abilities':'','png':'','types':''}];
      let itemKeys = Object.keys(pokemon);
      let testKeys = Object.keys(ObjectTest[0]);
      let pokemonObject = typeof(pokemon);
      switch(pokemonObject){
        case 'object':
          testKeys.forEach((key, i) => {
            if(key != itemKeys[i]){
              document.write(`'keys need to match [${itemKeys}] <br>`);
              throw new Error(`'keys need to match [${itemKeys}] <br>`);
            }
          });
          return build(pokemon, pokemonRepository).add(pokemon);
        case 'undefined':
          throw new Error('You need to pass an Object');
        default:
          throw new Error('The parameter needs to be an Object');
      }
    });
  });
})();
// BUILDS CAROUSEL/INDICATORS/MODAL
let build = (function (data, list){
  let fromList = list;
  let fromFetch = data;
  // takes data directly from fetch
  // to build carousel items
  (function (fromFetch){
    let itemHook = document.querySelector('.carousel-inner');
    // let name = (function(){return `The pokemon's name is ${fromFetch.name}`})()
    let name = fromFetch.name;
    let item = `<div class="carousel-item">
    <img class="d-block w-100 h-100 main-img" src="${fromFetch.imgUrl}" alt="${fromFetch.name} slide">
    <div class="carousel-caption d-xs-block mb-5">
      <button type="button" class="btn btn-primary get-info" data-toggle="modal" data-target="#exampleModal2" onclick="modal()">
        ${name}
      </button>
    </div>
  </div>`;
  itemHook.insertAdjacentHTML('beforeend', item);
  if(!document.querySelector('.carousel-item').classList.contains('active')){
    //IF THERE IS NO ACTIVE CLASS -- SET ONE
    document.querySelector('.carousel-item').classList.add('active');
  }
    })(fromFetch);
  
  // takes data directly from fetch
  // to build carousel items  
  (function (fromFetch){
    let itemHook =  document.querySelector('.carousel-indicators');
    let indicator = `<li data-target="#carouselExampleIndicators" data-slide-to="${index++}" class="carousel-indicator"><img class="indicator-img w-100" src="${fromFetch.png}" alt="${fromFetch.name}"/></li>`;
    itemHook.insertAdjacentHTML('beforeend', indicator);
    })(fromFetch);
  
  //adds the pokemon to the array
  function add(pokemon){
    if(pokemon){
      fromList.push(pokemon);
      return fromList;
    }
  }
  //add() is used in the switch statement on line 44
  return{
    add:add
  };
});
// SEARCHES THROUGH pokemonRepository ARRAY
function searchFunction(){
  let timer;
  let value = (function(){return document.querySelector('input#search').value;})();
  let searchHook = document.querySelector('#search-result');
  if(previousValue != value || value != false){
    clearTimeout(timer);
    if(value != null){
      if(!isWaiting){
        searchHook.innerText = 'loading..';
      }
      timer = setTimeout(()=>{
        let results = pokemonRepository.filter(pokemon=>{
          if(pokemon.name === value){
            return pokemon;
          }
        });
        let searchHook = document.querySelector('#search-result');
        if(results.length != 0){
          searchHook.innerText = results[0].name;
          let result = `
            <a data-toggle="modal" data-target="#exampleModal2" onclick="modal('${results[0].name}')" id="search-result" class="nav-link active" href="#">
              <div class="search-display">
                <img class="search-display__img" src="${results[0].imgUrl}" />
              </div>
            </a>
          `;
          return searchHook.insertAdjacentHTML('beforeend', result);  
        }else{
          searchHook.innerText = 'No results';
        }
      }, 850);
    }
  }
  previousValue = value;
}
searchFunction();