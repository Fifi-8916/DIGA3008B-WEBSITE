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