const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.getElementById('up')
const btnLeft = document.getElementById('left')
const btnRight = document.getElementById('right')
const btnDown = document.getElementById('down')

let level=0;
let lives = 3;
let canvasSize;
let elementsSize;
let playerPosition = {
    x: undefined,
    y: undefined
}
let bombsPositions=[]
const giftPosition = {
    x: undefined,
    y: undefined
}


window.addEventListener('load', startGame )
window.addEventListener('resize', resizeGame)

btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)

window.addEventListener('keydown', moveByKeys)

/*-----------------------posicionamiento del jugador --------------*/ 
function moveByKeys(event){
    if(event.key == 'ArrowUp') moveUp();
    else if(event.key == 'ArrowLeft') moveLeft();
    else if(event.key == 'ArrowRight') moveRight();
    else if(event.key == 'ArrowDown') moveDown();
}

function moveUp(){
    if(!(playerPosition.y - elementsSize <= 0)){
        playerPosition.y -= elementsSize 
        bombTouched()
        giftTaken()
        startGame()
    }  
}

function moveLeft(){
    if(!(playerPosition.x - elementsSize <= 0)){
        playerPosition.x -= elementsSize 
        bombTouched()
        giftTaken()
        startGame()
    }
}

function moveRight(){
    if(!(playerPosition.x + elementsSize >= canvasSize)){
        playerPosition.x += elementsSize 
        bombTouched()
        giftTaken()
        startGame()
    }
}

function moveDown(){
    if(!((playerPosition.y + elementsSize) >= canvasSize+10)){
        playerPosition.y += elementsSize 
        bombTouched()
        giftTaken()
        startGame()
    }
}

function botonApretado(e){
    console.log("se apreto un boton: " + e.target.id)
}

/*-----------------------FIN posicionamiento del jugador --------------*/ 

function resizeGame(){
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    lives=3;
    level=0
    startGame()
}

function startGame(){
    setCanvasSize()
    bombsPositions=[]    
    game.textAlign = 'right'
    game.font = (elementsSize-5) +'px Verdana'

    const nivel = maps[level]
    if(!nivel){
        gameWin()
        return
    }

    const arrayNivel = nivel.split("")    
    let i=1;
    let j=1;
    arrayNivel.forEach(element => {
        if(emojis[element]){
            game.fillText(emojis[element], (i * elementsSize), elementsSize * j)            
            if(element=="O"){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = i * elementsSize;
                    playerPosition.y = elementsSize * j;
                }
            }
            if(element=="I"){
                giftPosition.x =i * elementsSize
                giftPosition.y = elementsSize * j
            }
            if(element=="X"){
                bombsPositions.push([i * elementsSize, elementsSize * j])
            }
            i++
        }

        if(i>=11){i=1;j++}
    });

    movePlayer()

}

function movePlayer(){
    game.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y)
}

function setCanvasSize(){
    canvasSize = 0;
    if(window.innerHeight > window.innerWidth){
        canvasSize = Math.round(window.innerWidth * 0.8)
        
    }else{
        canvasSize = Math.round(window.innerHeight * 0.8)
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize+10)

    elementsSize = Math.round(canvasSize / 10);

}

function giftTaken(){
    if((playerPosition.x == giftPosition.x) && (playerPosition.y==giftPosition.y)){
        levelWin()
    }
}

function levelWin(){
    level++
}

function gameWin(){
    console.log("hola")
}

function bombTouched(){
    if((bombsPositions.some((posicionesXY)=>{
        return (posicionesXY[0]==playerPosition.x)&&(posicionesXY[1]==playerPosition.y)
    }))){
        lives -=1;
        playerPosition.x=undefined
        playerPosition.y=undefined
        if(!lives>0){
            resizeGame()
        }
    }
}