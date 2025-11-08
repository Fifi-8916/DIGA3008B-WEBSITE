async function fetchMultipleCards(count) {
  try {
    const cardPromises = [];
    for (let i = 0; i < count; i++) {
      cardPromises.push(
        fetch("https://api.scryfall.com/cards/random", {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        }).then(res => {
          if (!res.ok) throw new Error("Network response was not OK!!");
          return res.json();
        })
      );
    }

    // Wait for all card fetches to complete
    const cards = await Promise.all(cardPromises);

    // Render all cards
    renderCards(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
  }
}

// render multiple cards
function renderCards(cards) {
  const randCard = document.getElementById("cardsCarousel");
  randCard.innerHTML = ""; // Clear existing cards

  cards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card-object";

    const cardName = document.createElement("p");
    cardName.className = "card-name";
    cardName.textContent = card.name;

    if (card.image_uris && card.image_uris.small) {
      const cardImg = document.createElement("img");
      cardImg.src = card.image_uris.small;
      cardImg.alt = card.name;
      cardImg.className = "card-img";
      cardDiv.appendChild(cardImg);
    }

    cardDiv.appendChild(cardName);
    randCard.appendChild(cardDiv);
  });

  // Animate user items as they appear
  gsap.from(".card-object", {
    opacity: 0,
    y: 40,
    duration: 1.5,
    stagger: 0.3,
    ease: "power2.out",
  });

  initialiseCarousel();
}

function initialiseCarousel(){
    //second carousel for cards
    const wrapper2 = document.querySelector(".card-carousel");
    
    const cards = gsap.utils.toArray(".card-object");
    
    let activeElement2;//Horizontal Loop is a helper Funtin provided
    const loop2 = horizontalLoop(cards, {//adds an active state to the current box when in the center; "box" becomes "box active" when in the center
        paused: true,
        draggable: true,
        center: true,
        onChange: (element,index)=>{activeElement&&activeElement.classList.remove("active");//call this function when the active element chages from the
            element.classList.add("active");
            activeElement=element;
        }
    });
    
    cards.forEach((box,i)=>box.addEventListener("click",()=>loop2.toIndex(i,{duration:0.8, ease: "power1.inOut"})));//listen for changing element;call loop index funtion
    document.querySelector(".next-card").addEventListener("click", () => loop2.next({duration: 0.4, ease: "power1.inOut"}));
    document.querySelector(".prev-card").addEventListener("click", () => loop2.previous({duration: 0.4, ease: "power1.inOut"}));
}

fetchMultipleCards(7);