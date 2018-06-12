var points_regex = /\[([0-9]+)\]/;
var valid_classes = ['list-card', 'card-short-id'];

function calcPoints(){
  var lists = document.querySelectorAll(".list-wrapper");
  for (var list of lists){
    var totalPoints = 0, cards = list.querySelectorAll(".list-card");

    // Get card score from name and add it to totalPoints
    for (var card of cards){
      var label = card.querySelector(".list-card-title");
      if (label !== null){
        var matches = label.innerText.match(points_regex);
        if (matches !== null){
          totalPoints += parseInt(matches[1]); // Score is second regex match
        }
      }
    }

    // Prepend list score to list title
    var listHeader = list.querySelector('.list-header-name');
    var pointsNode = listHeader.parentNode.querySelector('.list-header-points');
    if (pointsNode === null){
      var newNode = document.createElement("H4");
      newNode.className = 'list-header-points';
      newNode.appendChild(document.createTextNode("[" + totalPoints + "]"));
      listHeader.parentNode.insertBefore(newNode, listHeader);
    } else {
      pointsNode.innerText = "[" + totalPoints + "]";
    }
  }
}


function begin() {
  // Initialise mutation observer
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      for (var node of mutation.addedNodes) {
        for (var cls of valid_classes){
          if (node.classList && node.classList.contains(cls)){
            calcPoints();
          }
        }
      }
    });
  });

  // Attach observer to card lists
  var lists = document.querySelectorAll(".list-wrapper");
  for (var list of lists){
    observer.observe(list, {childList: true, subtree: true, characterData: true});
  }

  // Run calcPoints
  calcPoints();
}

// Initialise script
window.onload = begin;
