const squareWrapper = document.querySelector("#square-wrapper");

function createSquares(size) {
    let numberOfSquares = (size * size);
    let squareSize = (640/size).toString();
    for (i = 1; i <= numberOfSquares; i++) {      
        let square = document.createElement("div");        
        square.classList.add("square");
        square.style.height = `${squareSize}px`;
        square.style.width = `${squareSize}px`;
        square.id = "Square" + i;
        squareWrapper.appendChild(square);
    };
}

createSquares(16);


function getRandomColor () {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (i=0; i<6; i++) {
        color += letters[Math.floor(Math.random()*16)];
    }
    return color
}

function changeBackgroundColor(e) {    
    const colormode = document.querySelector("input[name=\"colormode\"]:checked").value;
    if (colormode == "rgb") {
        e.target.style.backgroundColor = getRandomColor();
    } else if (colormode == "grayscale") {
        let currentColor = e.target.style.backgroundColor;
        console.log(currentColor);
        if (!currentColor) {
            e.target.style.backgroundColor = `rgb(230,230,230)`;
        } else {
            let colorvalue = currentColor.split(",");
            e.target.style.backgroundColor = `rgb(${colorvalue[1]-25},${colorvalue[1]-25},${colorvalue[1]-25})`
        }        
    }
    
}

function resetSquares() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.style.backgroundColor = "rgb(255,255,255)");
}

function changeGridsize(e) {      
    let squaresPerSide = e.target.value;
    if (squaresPerSide >100) {
        alert("Wrong input!")
        return;
    } 
    while (squareWrapper.firstChild) {
        squareWrapper.removeChild(squareWrapper.lastChild);
    }
    createSquares(squaresPerSide);
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.addEventListener("mouseover", changeBackgroundColor));
}

const squares = document.querySelectorAll(".square");
squares.forEach(square => square.addEventListener("mouseover", changeBackgroundColor));

const BtnClear = document.querySelector("#btnClear");
BtnClear.addEventListener("click", resetSquares);

const sliderGrid = document.querySelector("#sliderGridSize");
sliderGrid.addEventListener("mouseup", changeGridsize);
sliderGrid.addEventListener("input", function(e) {
    const textGridSize = document.querySelector("#textGridSize");
    textGridSize.innerText = "Gridsize: " + e.target.value.toString() + "x" +e.target.value.toString();
})