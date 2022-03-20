const Gameboard=function (){
    const arr=['','','','','','','','',''];
    const players=[];
    const winningCombinations =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    let turn=true;//true represents player 1 and false represents player 2
    return {arr,players,turn,winningCombinations}

}();

function Player(name="ron",sign="bon"){
    name,
    sign
}

const startBtn=document.getElementById("start-game");
startBtn.addEventListener('click',function(){
    makeClickSound();
    startBtn.remove();
    removeBigHeading();
    setPlayerName();
});

function removeBigHeading(){
    const h1=document.querySelector('h1');
    h1.classList.toggle('scale');
}

function setPlayerName(){
    const container= document.getElementById('container');
    let newPlayer, submitted=0;
    for(let i=1;i<=2;i++){
       const playerInput=document.createElement('input');
       playerInput.style.height="20px";
       playerInput.setAttribute('placeholder','Player '+i);
       const submit=document.createElement('button');
       submit.innerText="Add Player";
       container.append(playerInput,submit);
       submit.addEventListener('click',function(){
           makeClickSound();
           submitted++;
           newplayer= new Player();
           newplayer.name=playerInput.value;
           if(i==1)
           newplayer.sign='X';
           else
           newplayer.sign='O';
           Gameboard.players.push(newplayer);
           playerInput.remove();
           submit.remove();
           if(submitted==2){
               displayGrid();
           }
       });
    }
}

function makeClickSound(){
    let clickSound= new Audio('click.wav');
    clickSound.play();
}

function makeSound(sound){
    let Sound= new Audio(sound);
    Sound.play();
}

function displayGrid(){
    const container= document.getElementById('container');
    container.style.backgroundColor="brown";
    container.style.padding="0";
    container.style.display="grid";
    container.style.gridTemplateColumns="repeat(3,1fr)";
    container.style.gridGap="5px";
    for(let i=0;i<9;i++){
        const grid= document.createElement('div');
        grid.style.backgroundColor="#2aa5a5";
        grid.style.color="brown";
        grid.style.display="flex";
        grid.style.alignItems="center";
        grid.style.justifyContent="center";
        grid.style.fontSize=50+'px';
        grid.style.overflow="hidden";
        grid.style.minHeight="100%";
        grid.dataset.gridNumber=i;
        container.append(grid);
        grid.addEventListener('click',()=>displayGridElement(grid),{once:true});
    } 
    const turnStatus= document.getElementById('turn-status');
    turnStatus.textContent= `It's `+ Gameboard.players[0].name+`'s Turn!`;
}

function displayGridElement(grid){
    makeSound('scribble.wav');
    let turnStatus= document.getElementById('turn-status');
    if(Gameboard.turn){
        grid.innerText="X";
        Gameboard.arr.splice(grid.dataset.gridNumber,1,'X');
        turnStatus.textContent= `It's `+ Gameboard.players[1].name+`'s Turn!`;
    }
    else{
        grid.innerText="O";
        Gameboard.arr.splice(grid.dataset.gridNumber,1,'O');
        turnStatus.textContent= `It's `+ Gameboard.players[0].name+`'s Turn!`;
    }
    if(checkWin("X")){//checking if player one wins
        turnStatus.textContent=  `Congratulations! `+Gameboard.players[0].name+` Wins!`;
        //stop listening
        displayRestartBtn();
return;
    }
    if(checkWin("O")){//checking if player two wins
        turnStatus.textContent= `Congratulations! `+ Gameboard.players[1].name+` Wins!`;
        //display restart button
        displayRestartBtn();
return;
    }
    if(isDraw()){
        //display draw
        turnStatus.textContent=  `It's a Draw!`;
        displayRestartBtn();
    }
    Gameboard.turn=!Gameboard.turn;
}

function checkWin(sign){
    return Gameboard.winningCombinations.some(combination=>{
        return combination.every((index)=>{
            return Gameboard.arr[index]==sign;
        });
    });
}
function isDraw(){
    return Gameboard.arr.every((element)=>{
        return element=="O"||element=="X";//CHECKING IF EVERY CELL IS FILLED WITH EITHER ZERO OR ONE
    });
}

function displayRestartBtn(){
    const restartbtn=document.getElementById("restart");
    restartbtn.style.display="block";
    //Adding functionality to restart button
    restarting(restartbtn);
}

function restarting(restartbtn){
    //adding click event
    restartbtn.addEventListener('click',()=>{
        //Access the container div and remove it entirely
        const container= document.getElementById('container');
        container.remove();
        //remove the restartbutton itself
        restartbtn.style.display="none";
        //create New container div and append after the h1 tag
        const newcontainer= document.createElement('div');
        newcontainer.setAttribute("id", "container");
        const h1=document.querySelector('h1');
        h1.parentNode.insertBefore(newcontainer, h1.nextSibling)
        //display a fresh grid inside the new container
        displayGrid();
        //rest the array that contains the main game scribble data
        Gameboard.arr=['','','','','','','','','']; 
        
    });
}