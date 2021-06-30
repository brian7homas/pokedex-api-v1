/* 
  DISPLAYS INFORMATION BASED ON IF A VALUE IS PASSED INTO MODAL
  MODAL IS ADDED WHEN THE CAROUSEL IS CREATED
 */
// eslint-disable-next-line no-unused-vars
let modal = (function (search = null){
  let modalData = [];
  // pokemonRepository is defined in the global scope of app.js
  // eslint-disable-next-line no-undef
  modalData = pokemonRepository;
  // IF THE SEARCH PARAMETER CONTAINS A STRING 
  if(search != null){
    // THE RESULT GETS WHAT IS RETURNED IN SEARCH-RESULT
    let searchResult = document.querySelector('#search-result').innerText;
    // STRIP WHITESPACE
    searchResult = searchResult.trim();
    for(let i = 0; i < modalData.length; i++){
      let listName = modalData[i].name;
      if(listName === searchResult){
        (function(){
          //IF THERE IS A MATCH WITH POKEMON THAT IS DISPLAYED AND WHAT IS IN THE ARRAY
          let currentModal = document.querySelector('.modal');
          let modal = document.querySelector('.modal-content');
          let title = document.querySelector('.modal-title');
          let img = document.querySelector('.modal-body img');
          let abilityList = document.querySelector('.ability-list');
          let abilities = document.querySelectorAll('#abilities');
          let type = document.querySelectorAll('#type');
          let typeList = document.querySelector('.type-list');
          let height = document.querySelector('#height');
          let weight = document.querySelector('#weight');
          
          if(currentModal){
            if(abilities){
              abilities.forEach((el)=>{
                el.remove();
                return true;
              });
              type.forEach((el)=>{
                el.remove();
                return true;
              });
            }
          }
          
          let result = modalData[i];
          title.innerText = result.name;
          img.setAttribute('src', `${result.imgUrl}`);
          height.innerText = `Height: ${result.height}`;
          weight.innerText = `Weight: ${result.weight}`;
          modal.setAttribute('style', `background-image: linear-gradient(to left bottom, hsla(6, 83%, 43%, 1), hsla(0, 0%, 91%, .6)), url(${result.imgUrl});`);
          (function(){  
            for(let i = 0; i < result.abilities.length; i++){
              let li = `<li id="abilities" class="text-dark list-group-item">${result.abilities[i].ability.name}</li>`;
              abilityList.insertAdjacentHTML('afterbegin', li);
            }
          })();
          (function(){
            for(let i = 0; i < result.types.length; i++){
              let li = `<li id="type" class="text-dark list-group-item">${result.types[i].type.name}</li>`;
              typeList.insertAdjacentHTML('afterbegin', li);
            }
          })();
        
          
        
        })();
      }
    }
  }else{
    // activePokemon CONTAINS THE CURRENTLY DISPLAYED POKEMON'S NAME
    let activePokemon = document.querySelector('div.active div button').innerText;
    // activePokemon = capitalize(activePokemon);
    // IIFE BUILDS THE MODAL
    (function(){
      for(let i = 0; i < modalData.length; i++){
        let listName = modalData[i].name;
        //IF THERE IS A MATCH WITH POKEMON THAT IS DISPLAYED AND WHAT IS IN THE ARRAY
        if(listName === activePokemon){
          let currentModal = document.querySelector('.modal');
          let modal = document.querySelector('.modal-content');
          let title = document.querySelector('.modal-title');
          let img = document.querySelector('.modal-body img');
          let abilityList = document.querySelector('.ability-list');
          let abilities = document.querySelectorAll('#abilities');
          let type = document.querySelectorAll('#type');
          let typeList = document.querySelector('.type-list');
          let height = document.querySelector('#height');
          let weight = document.querySelector('#weight');
          
          if(currentModal){
            if(abilities){
              abilities.forEach((el)=>{
                el.remove();
                return true;
              });
              type.forEach((el)=>{
                el.remove();
                return true;
              });
            }
          }
          
          let result = modalData[i];
          title.innerText = result.name;
          img.setAttribute('src', `${result.imgUrl}`);
          height.innerText = `Height: ${result.height}`;
          weight.innerText = `Weight: ${result.weight}`;
          modal.setAttribute('style', `background-image: linear-gradient(to left bottom, hsla(6, 83%, 43%, 1), hsla(0, 0%, 91%, .6)), url(${result.imgUrl});`);
          (function(){
            for(let i = 0; i < result.abilities.length; i++){
              let li = `<li id="abilities" class="text-dark list-group-item">${result.abilities[i].ability.name}</li>`;
              abilityList.insertAdjacentHTML('afterbegin', li);
            }
          })();
          (function(){
            for(let i = 0; i < result.types.length; i++){
              let li = `<li id="type" class="text-dark list-group-item">${result.types[i].type.name}</li>`;
              typeList.insertAdjacentHTML('afterbegin', li);
            }
          })();
        }
      }
    })();
    //SEARCH THROUGH THE ARRAY LIST OF POKEMON
    
  }
});