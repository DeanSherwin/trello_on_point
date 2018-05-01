console.log("EXT LOADED");
// need to wait for whole DOM to load as Trello loads so much JS to populate cards
window.onload = function (){
  console.log("RUN");
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
    console.log(listHeader);
    listHeader.value = '[' + listPoints.toString() +'] ' + currentTitle;
  }
}
