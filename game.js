
let position = document.querySelectorAll(".position");
let turn = document.querySelector(".container");

let player = "p1";

let tab = [
    [1, 1, 1],
    [0, 0, 0],
    [2, 2, 2]
];

for(var elmt of position){
    var temp,
        from;

    elmt.addEventListener("click", function(e){

        if(!turn.classList.contains("moving")) {

            if(turn.classList.contains("player2")) {

                if(this.classList.contains("white")) {
                    from = this.id;

                    this.classList.remove("white");
                    this.classList.add("active-white");
                    temp = this; 

                    turn.classList.add("moving");
                }
                else {
                    alert("CHOISISSEZ UN AUTRE PIONS ");
                }

            }

            else if(turn.classList.contains("player1")) {

                if(this.classList.contains("black")) {
                    from = this.id;

                    console.log(this.id);

                    this.classList.remove("black");
                    this.classList.add("active-black"); 
                    temp = this;

                    turn.classList.add("moving");
                }
                else {
                    alert("CHOISISEZ UN AUTRE PIONS ");
                }

            }

        }
        else {
            
            if(turn.classList.contains("player2")) {

                if(this != temp) {
                    if(!this.classList.contains("white") && !this.classList.contains("p2") && isValid(from, this.id)) {
                        moveTo(from, this.id);
                        this.classList.add("white");
                        temp.classList.remove("active-white"); 

                        turn.classList.remove("moving");
                        turn.classList.remove("player2");
                        turn.classList.add("player1");
                    }
                    else {
                        alert("MOUVEMENT INVALIDE");
                    }

                    if(gameOver(1)){
                        alert("LES NOIRS EN GAGNER");
                        window.location.reload();
                    }

                }
                else {
                    this.classList.add("white");
                    this.classList.remove("active-white");

                    turn.classList.remove("moving");
                }

            }

            else if(turn.classList.contains("player1")) {

                if(this != temp) {

                    if(!this.classList.contains("white") && !this.classList.contains("p2") && this != temp && isValid(from, this.id)) {
                        moveTo(from, this.id);

                        this.classList.add("black");
                        
                        temp.classList.remove("active-black"); 

                        turn.classList.remove("moving");
                        turn.classList.remove("player1");
                        turn.classList.add("player2");
                    }
                    else {
                        alert("MOUVEMENT INVALIDE");
                    }

                    if(gameOver(2)){
                        alert("LES BLANCS EN GAGNER ");
                        window.location.reload();
                    }

                }
                else {
                    this.classList.add("white");
                    this.classList.remove("active-white");

                    turn.classList.remove("moving");
                }

            }

        }

    }, false);
}

// Fonction
function moveTo(id1, id2) {
    var start = id1.split("-")[1].split("");
    var end = id2.split("-")[1].split("");

    if(tab[end[0]][end[1]] != 0){
        console.log("Erreur!!")
        return;
    }

    tab[end[0]][end[1]] = tab[start[0]][start[1]];
    tab[start[0]][start[1]] = 0;
}

/* ---------//--------------------//------------*/

function display() {
    for(var i=0; i<3; i++) {
        console.log(tab[i][0], " ", tab[i][1], " ", tab[i][2]);
    }
}

/* ------//---------------------//--------------*/
function isValid(id1, id2) {
    var start = id1.split("-")[1];
    var end = id2.split("-")[1];

    // au centre
    if(start === "11")
        return true;

    // 
    if(start === "00") {
        if(end === "01" || end === "10" || end === "11")
            return true;
    }

    if(start === "02") {
        if(end === "01" || end === "12" || end === "11")
            return true;
    }

    if(start === "20") {
        if(end === "21" || end === "10" || end === "11")
            return true;
    }

    if(start === "22") {
        if(end === "21" || end === "12" || end === "11")
            return true;
    }

    // axe
    if(start === "01") {
        if(end === "00" || end === "02" || end === "11")
            return true;
    }

    if(start === "10") {
        if(end === "00" || end === "20" || end === "11")
            return true;
    }

    if(start === "21") {
        if(end === "20" || end === "22" || end === "11")
            return true;
    }

    if(start === "12") {
        if(end === "02" || end === "22" || end === "11")
            return true;
    }
    return false;
}

/* --------//-----------------//----------------*/

function isAlignedX(x){
    var compt = 0;

    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(tab[i][j] == x){
                compt++;
            }
        }
        if(compt == 3){
            return true;
        }
        compt = 0;
    }
    return false;
}

function isAlignedY(x){
    var compt = 0;
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(tab[j][i] == x){
                compt++;
            }
        }
        if(compt == 3){
            return true;
        }
        compt = 0;
    }
    return false;
}

function isAlignedDiag(x){
    if(x == tab[0][0] || x == tab[2][2] || x == tab[1][1])
        if(tab[1][1] == tab[0][0] && tab[1][1] == tab[2][2])
            return true;
    
    if(x == tab[0][2] || x == tab[2][0] || x == tab[1][1])
        if(tab[1][1] == tab[0][2] && tab[1][1] == tab[2][0])
            return true;

    return false;
}

/* --------//------------------//---------------*/

function gameOver(x){
    if(isAlignedX(x) || isAlignedY(x) || isAlignedDiag(x))
        return true;

    return false;
}


















