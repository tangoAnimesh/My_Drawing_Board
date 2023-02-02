const canvas  = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 2a364f
// GETTING PEN COLOR ---------------------------------------
const penColor = document.getElementById("pen-color");
const penSize = document.getElementById("pen-size");
const eraserSize = document.getElementById("eraser-size");
const eraser = document.querySelectorAll(".tools__image");

let inputVal_pencolor = "#ffffff";
let inputVal_pensize = "3";
let inputVal_erasersize = "3";

let inputVal_erasercolor = "#2a364f";
// let eraser__Flag = true;-----------------------------------------

// UNDO_REDO-------------------------------------------
const undo = document.getElementById("undo");
const redo = document.getElementById("redo");
let undoRedoTracker = []; // Data
let track = 0; // Represent Which action have to perform

const leser__pen = document.getElementById("leser__pen");
let leser_pen = true;
let leser_pen_color = "#b7ff00";

function gettingPenColor(e){
    inputVal_pencolor = e.target.value;
    return inputVal_pencolor;
}

function gettingPenSize(e){
    inputVal_pensize = e.target.value;
    return inputVal_pensize;
}

function gettingEraserSize(e){
    inputVal_erasersize = e.target.value;
    return inputVal_erasersize;
}




// API ---------
const tool = canvas.getContext('2d');
let mouseDown = false;


penSize.addEventListener('change' , (e) =>{
    tool.lineWidth = gettingPenSize(e);
})

penColor.addEventListener("change", (e) => {
    tool.strokeStyle = gettingPenColor(e);
 });

eraserSize.addEventListener("change" ,(e) =>{
    tool.lineWidth =  gettingEraserSize(e);
})

eraser[1].addEventListener("click" , (e) =>{
    if(eraser__Flag){
        tool.strokeStyle = inputVal_erasercolor;
        tool.lineWidth = gettingEraserSize(e);
    }else{
        tool.strokeStyle = inputVal_pencolor;
        tool.lineWidth = inputVal_pensize;
    }
})

leser__pen.addEventListener('click' ,() => {
    if(leser_pen){
        tool.strokeStyle = leser_pen_color;
        tool.lineWidth = "5"
    }
    else{
        tool.strokeStyle = inputVal_pencolor;
        tool.lineWidth = inputVal_pensize;
    }
})

// Mousedown -> start new path, mousemove -> path fill (graphics);

canvas.addEventListener('mousedown' , (e) => {
    mouseDown = true;
    beginPath({
        x : e.clientX,
        y : e.clientY,
    })
   
})

canvas.addEventListener('mousemove' , (e) => {
    if(mouseDown){
        drawStroke({
            x : e.clientX,
            y : e.clientY,
            
        })
    }
})

canvas.addEventListener('mouseup' , (e) => {
    mouseDown = false

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1;
})

undo.addEventListener('click' , (e) => {
    if(track > 0){
        track--;
    } else{
        alert("No More Work Done Before");
    }

     // Track Action
     let tractObj = {
        trackValue : track,
        undoRedoTracker 
    }
    undoRedoCanvas(tractObj);

})

redo.addEventListener('click' , (e) => {
    if(track < undoRedoTracker.length - 1){
        track++;
    }
     else{
        alert("No More Work Done After");
    }

    // Track Action
    let tractObj = {
        trackValue : track,
        undoRedoTracker 
    }
    undoRedoCanvas(tractObj);

})

function undoRedoCanvas(tractObj) { 
    track = tractObj.trackValue;
    undoRedoTracker = tractObj.undoRedoTracker;


    let url = undoRedoTracker[track];
    let img = new Image(); // Creating a New image reference Element
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width , canvas.height);
    }

}



function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x , strokeObj.y);
}

function drawStroke(strokeObj) {
   
    tool.lineTo(strokeObj.x , strokeObj.y);
    tool.stroke();
}




// BOARD IMAGE DOWNLOAD ------------------
const download = document.getElementById("download");


download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg"
    a.click()
})