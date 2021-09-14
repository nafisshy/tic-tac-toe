const Gameboard=function (){
    const arr=['','','','','','','','',''];
    const set=Array(9).fill(false,0);
    const players=[];
    let turn=true;//true represents player 1 and false represents player 2
    return {arr,players,turn,set}

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
    let newPlayer;
    for(let i=1;i<=2;i++){
       const playerInput=document.createElement('input');
       playerInput.style.height="20px";
       playerInput.setAttribute('placeholder','Player '+i);
       const submit=document.createElement('button');
       submit.innerText="Add Player";
       container.append(playerInput,submit);
       submit.addEventListener('click',function(){
           makeClickSound();
           newplayer= new Player();
           newplayer.name=playerInput.value;
           if(i==1)
           newplayer.sign='X';
           else
           newplayer.sign='O';
           Gameboard.players.push(newplayer);
           playerInput.remove();
           submit.remove();
           if(i==2){
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
        grid.addEventListener('click',()=>displayGridElement(grid));
    } 
    const turnStatus= document.getElementById('turn-status');
    turnStatus.textContent= `It's `+ Gameboard.players[0].name+`'s Turn!`;
}

function displayGridElement(grid){
    if(Gameboard.set[grid.dataset.gridNumber]){
        return;
    }
    makeSound('scribble.wav');
    Gameboard.set[grid.dataset.gridNumber]=true;
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
    Gameboard.turn=!Gameboard.turn;
}