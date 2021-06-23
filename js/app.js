// const fetch = require('node-fetch');   
let repository = (function(){
  let list = [{"name":'',"url": ''}];
  let pokemonDetails = [{"imgUrl": '', "name":'',"height":'',"weight":''}];
  const URL = 'https://pokeapi.co/api/v2/pokemon/';
  
  //dragging active
  let isDragging = false;
  //where dragging starts
  let startPos = 0;
  //value for direction
  let currentTranslate = 0;
  let prevTranslate = 0;
  //animation will use requestanimation frame
  let animationID = 0;
  //current slide
  let currentIndex = 0;
  
  function loadPage(){
    let ul = document.querySelector('.pokemon-list');

    let filteredList = document.createElement('ul');
    
    showLoadingMessage('.pokemon-list', 'list')
    
    ul.insertAdjacentElement('beforebegin', filteredList)
    
    filteredList.classList.add('filtered-list')
    return loadApi();
  }
  function loadApi(){
    fetch(URL).then(function(res){
      return res.json();
    }).then(function(json){
      hideLoadingMessage('list')
      json.results.forEach(function(item){
        let pokemon = {
          name: item.name,
          url: item.url
        }
        loadDetails(item.url)
      })
    })
  }
  function loadDetails(pokemon){
    fetch(pokemon).then(function(res){
      return res.json();
    }).then(function(json){
      let details = {
        imgUrl: json.sprites.other.dream_world.front_default,
        name: json.name,
        height: json.height,
        weight: json.weight
      }
      add(details)
    })
  }
  function add(item){
    if(!item || item == undefined){
      document.write('Make sure your passing an object and that it is not empty <br>')
      document.write('Also make sure your passing [name: string, height: int, type: object]')
      throw new Error('This add function only takes objects.<br>')
    }else if(typeof(item) == 'object'){
      let itemKeys = Object.keys(item);
      let detailsKeys = Object.keys(pokemonDetails[0]);
      let listKeys = Object.keys(list[0]);
      let addToList = true;
      
      itemKeys.forEach((key, i) => {
        if(key != detailsKeys[i]){
          addToList = false;
          document.write(`'keys need to match [${listKeys}] <br>`);
          throw new Error(`'keys need to match [${listKeys}] <br>`)
        }
      });
      if(addToList){
        pokemonDetails.push(item);
      }
    }
    // make request
    let pokemonListNode = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let listItemImage = document.createElement('img');
    let btn = document.createElement('button')
    pokemonListNode.appendChild(listItem)
    listItem.appendChild(listItemImage)
    listItem.appendChild(btn);
    btn.innerText = `${item.name}`;
    btn.classList.add('pokemon-list__card');
    listItem.classList.add('pokemon-list__item')
    listItem.classList.add('slides')
    listItemImage.setAttribute('src', `${item.imgUrl}`)
    events(btn, item)
    slider()
  }
  function slider(){
    // const slider = document.querySelector('.pokemon-list');
    const slides = Array.from(document.querySelectorAll('.pokemon-list__item'))

    slides.forEach((slide, index) => {
      const slideImage = slide.querySelector('img')
      // disable default image drag
      slideImage.addEventListener('dragstart', (e) => e.preventDefault())
      // touch events
      slide.addEventListener('touchstart', touchStart(index))
      slide.addEventListener('touchend', touchEnd)
      slide.addEventListener('touchmove', touchMove)
      // mouse events
      slide.addEventListener('mousedown', touchStart(index))
      slide.addEventListener('mouseup', touchEnd)
      slide.addEventListener('mousemove', touchMove)
      slide.addEventListener('mouseleave', touchEnd)
    })
    
  }
  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
  }
  
  // use a HOF so we have index in a closure
  function touchStart(index) {
    return function (event) {
      let slider = document.querySelector('.pokemon-list')
      currentIndex = index
      startPos = getPositionX(event)
      isDragging = true
      animationID = requestAnimationFrame(animation)
      slider.classList.add('grabbing')
    }
  }
  
  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event)
      currentTranslate = prevTranslate + currentPosition - startPos
    }
  }
  
  function touchEnd() {
    let slider = document.querySelector('.pokemon-list')
    slides = Array.from(document.querySelectorAll('.pokemon-list__item'))
    cancelAnimationFrame(animationID)
    isDragging = false
    const movedBy = currentTranslate - prevTranslate
  
    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1
  
    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1
  
    setPositionByIndex()
  
    slider.classList.remove('grabbing')
  }
  
  function animation() {
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
  }
  
  function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()
  }
  
  function setSliderPosition() {
    let slider = document.querySelector('.pokemon-list')
    slider.style.transform = `translateX(${currentTranslate}px)`
  }
  function filterByName(name){
    showLoadingMessage('.filtered-list', 'load-search')
    setTimeout(()=>{
      // store the filtered array in filtered variable
      
      let filtered = pokemonDetails.filter(pokemon => {
        console.log(pokemon.name)
      if(pokemon.name == name){
        return true;
      }
    })
    // if there is a match, the filtered array will store it in the 1st position
    if(filtered[0]){
      // hideLoadingMessage('load-search');
      let button = document.querySelector('.filtered-list');
      button.innerText = `You selected ${name} using the filter by name function on line 169`
      events(button, filtered[0])
    }else{
      document.write(`Sorry there is no pokemon by that name in my list. <br>` )
    }
    }, 2200)
  }
  function showLoadingMessage(selector, id){    
    let el = document.querySelector(selector);
    return el.innerHTML = `<h1 class='loading' id="${id}">Loading</h1>`;
  }
  function hideLoadingMessage(id){
    let el = document.querySelector(`#${id}`);
    return el.remove();
  }
  function showDetails(pokemon){
    return createModal(pokemon)
  }
  function modalEvents(){
    let modal = document.querySelector('.modal');
    let closeBtn = document.querySelector('.modal__close');
    window.addEventListener('keydown',(e)=>{
      if(e.key === 'Escape'){
        return closeModal();
      }
    })
    modal.addEventListener('click', function(e){
      let target = e.target
      if(target === modal){
        return closeModal();
      }
      
    })
    closeBtn.addEventListener('click', function(){
      return closeModal();
    })
  }
  function events(button, pokemon){
    button.addEventListener("click", ()=>{
      return showDetails(pokemon);
    })  
    //!FOR QUOKKA TESTING
    // return showDetails(pokemon.url);
  }
  function createModal(details){
    let mainContainer = document.querySelector('.container');
    let currentModal = document.querySelector('.modal')
    if(currentModal){
      document.querySelector('.modal').remove()
    }else{
      let modal = document.createElement('div');
      let modalCloseBtn = document.createElement('span');
      let modalContainer = document.createElement('div');
      let modalHeadline = document.createElement('h1');
      let modalImg = document.createElement('img');
      let modalCopy = document.createElement('ul');
      modalContainer.setAttribute('style', `background-image: linear-gradient(to left bottom, hsla(100, 0%, 0%, .75), hsla(0, 0%, 60%, 1)), url(${details.imgUrl});`)
      mainContainer.insertAdjacentElement('afterend', modal);
      modal.append(modalContainer);
      modalContainer.appendChild(modalCloseBtn);
      modalContainer.appendChild(modalHeadline);
      modalContainer.appendChild(modalImg);
      modalContainer.appendChild(modalCopy);
      
      //add classes to new elements
      modal.classList.add('modal');
      modalCloseBtn.classList.add('modal__close');
      modalContainer.classList.add('modal__container');
      modalHeadline.classList.add('modal__headline');
      modalImg.classList.add('modal__img');
      modalCopy.classList.add('modal__copy');
      
      modalCloseBtn.innerText = `Close`;
      modalHeadline.innerText = `Name:  ${details.name}`;
      modalCopy.innerHTML = `
          <li>Weight:  ${details.weight}</li>
          <li>Height:  ${details.height}</li>
        `;
      modalImg.setAttribute('src', `${details.imgUrl}`)
      modal.classList.add('modal--is-visible');
    }
    modalEvents()
  }
  function closeModal(){
    document.querySelector('.modal').classList.remove('modal--is-visible');
    return document.querySelector('.modal').remove();
  }
  return{
    loadPage : loadPage,
    filterByName : filterByName,
  }
})();
repository.loadPage()
repository.filterByName('bulbasaur')