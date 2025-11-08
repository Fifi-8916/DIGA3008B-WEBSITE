const wrapper = document.querySelector(".carousel-container");

const boxes = gsap.utils.toArray(".set-card");

let activeElement;//Horizontal Loop is a helper Funtin provided
const loop = horizontalLoop(boxes, {//adds an active state to the current box when in the center; "box" becomes "box active" when in the center
    paused: true,
    draggable: true,
    center: true,
    onChange: (element,index)=>{activeElement&&activeElement.classList.remove("active");//call this function when the active element chages from the
        element.classList.add("active");
        activeElement=element;
    }
});

boxes.forEach((box,i)=>box.addEventListener("click",()=>loop.toIndex(i,{duration:0.8, ease: "power1.inOut"})));//listen for changing element;call loop index funtion
document.querySelector(".next").addEventListener("click", () => loop.next({duration: 0.4, ease: "power1.inOut"}));
document.querySelector(".prev").addEventListener("click", () => loop.previous({duration: 0.4, ease: "power1.inOut"}));
//second carousel for cards
const wrapper2 = document.querySelector(".card-carousel");

const cards = gsap.utils.toArray(".set-magic-card");

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