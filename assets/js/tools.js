const options__container = document.querySelector('.options__container');
const tools__container = document.querySelector('.tools__container');
let options__Flag = true;


const pen__container = document.querySelector('.pen__tool__container');
const eraser__container = document.querySelector('.eraser__tool__container');
const tools__image = document.querySelectorAll(".tools__image");
let pen__Flag = true;
let eraser__Flag = true;


// OPTIONS  -------------------------------------


options__container.addEventListener('click', (e) => {
    // true -> Show Tools 
    // false -> Hide Tools 

    options__Flag = !options__Flag;
    if (options__Flag) {
        open_Tools();
    } else {
        close_Tools();
    }

})



function open_Tools() {
    let iconElement = options__container.children[0];
    iconElement.classList.remove("fa-xmark");
    iconElement.classList.add("fa-bars");
    tools__container.style.display = "flex";
}


function close_Tools() {
    let iconElement = options__container.children[0];
    iconElement.classList.add("fa-xmark");
    iconElement.classList.remove("fa-bars");
    tools__container.style.display = "none";

    pen__container.style.display = "none";
    eraser__container.style.display = "none";

}

// PEN CONTAINER -------------------------------
tools__image[0].addEventListener('click', (e) => {
    // true -> Show Tool flase -> Hide Tool
    pen__Flag = !pen__Flag;
    if (pen__Flag) {
        pen__container.style.display = "block"
    } else {
        pen__container.style.display = "none"

    }
})
// ERASER CONTAINER -------------------------------
tools__image[1].addEventListener('click', (e) => {
    // true -> Show Tool flase -> Hide Tool
    eraser__Flag = !eraser__Flag;
    if (eraser__Flag) {
        eraser__container.style.display = "block"
    } else {
        eraser__container.style.display = "none"

    }
})
// ------------------------ STCKY CONTAINER -------------------------------



tools__image[5].addEventListener('click', (e) => {

    let stickyContainer = document.createElement('div');
    stickyContainer.setAttribute("class", "sticky__container");
    stickyContainer.innerHTML = `   

        <div class="header__container">
            <div class="minimize">-</div> 
            <div class="remove">✠</div>
        </div>
        <div class="note__container">
            <textarea spellcheck="false" ></textarea>
        </div>

    `;

    document.body.appendChild(stickyContainer);

    
    // STICKY NOTE MINIMIZE AND DELETE FUNCTIONALITY ----------------------

    let note__minimize  = stickyContainer.querySelector(".minimize");
    let note__remove  = stickyContainer.querySelector(".remove");

    stickyNoteActions(note__minimize, note__remove,stickyContainer);

})


// STICKY NOTES DRAG AND DROP FEATURES --------------

const position = {
    x: 0,
    y: 0
}

interact('.sticky__container').draggable({
    listeners: {
        start(event) {
            // console.log(event.type, event.target)
        },
        move(event) {
            position.x += event.dx
            position.y += event.dy

            event.target.style.transform =
                `translate(${position.x}px, ${position.y}px)`
        },
    }
});


// STICKY NOTE MINIMIZE AND DELETE FUNCTIONALITY ----------------------

function stickyNoteActions(minimize , remove ,sticky__container) {
    remove.addEventListener('click' , (e) => {
        sticky__container.remove();
    });
    minimize.addEventListener('click' ,(e) => {
        let note_container = sticky__container.querySelector('.note__container');
        let display = getComputedStyle(note_container).getPropertyValue("display");
        if(display === "none"){
            note_container.style.display ="block";
        }
        else{
            note_container.style.display ="none";
        }
    })
}