function calcPoints (){
  var cardLists = document.getElementsByClassName("js-list list-wrapper");
  for (var i = 0; i < cardLists.length; i++){
    var listPoints = 0;
    var currentList = cardLists[i];
    var cards = currentList.querySelectorAll(".list-card");
    for (var j = 0; j < cards.length; j++){
      // get card score from name and add it to listPoints
      var card = cards[j];
      var label = card.querySelector(".list-card-title").innerText;
      var regex = /\[([0-9]+)\]/;
      var matches = label.match(regex);
      if(matches != null){
          // if matchs, score will be the second match. Add it to listPoints
          var cardScore = parseInt(matches[1]);
          listPoints += cardScore;
      }
    }
    // prepend list score to list title
    var listHeader = currentList.querySelector('.list-header-name');
    var currentTitle = listHeader.value;
    // check if already has score
    var existingScore = currentTitle.match(regex);
    if(existingScore != null){
      currentTitle = currentTitle.split("] ")[1]
    }
    listHeader.value = '[' + listPoints.toString() +'] ' + currentTitle;
  }
}

// handle navigaton by clicking on board
document.addEventListener('click', function(){
    if(window.location.href == 'https://trello.com/'){
      // click was on home, might be clicking into a board
      setTimeout(calcPoints, 800)
    }
}, false);

// handle potential drop event when moving cards
document.addEventListener('mouseup', function(e){
  calcPoints()
}, false);

// handle back/forward button events
window.addEventListener('popstate', function(event) {
  setTimeout(calcPoints, 800)
}, false);

// handle page refresh or arriving directly on board
window.onload = calcPoints;
