$(document).ready(function(){
    let clicks = 0;
    let player1 = 'X';
    let player2 = 'O';
    let ganador = false;

    const opcionesGanar = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let clickedPlayers = ["","","","","","","","",""]

    $(".cells").on("click", function(e){
        if(!ganador) {
            console.log(clickedPlayers.length);
            let boardClicked = parseInt($(this).attr("data-cell-index"));
            let player = clicks % 2 == 0 ? player1 : player2;   

            if(e.target.innerHTML == "") {
                $(e.target).html(player);
                clickedPlayers[boardClicked] = player;
                clicks++;

                console.log(clickedPlayers);
                if(compruebaGanar(player)) {
                    $("#message").html(player == "X" ? "Jugador X ha ganado!" : "Jugador O ha ganado!");
                    generarReiniciar();
                }else if(compruebaEmpate()) {
                    $("#message").html("Empate!");
                    generarReiniciar();
                }
            }
        }
    });

    $("#btnReiniciar").on("click", function() {
        for (let i = 0; i < 9; i++) {
            clickedPlayers[i] = "";
        }
        $(".cells").html("");
        $("#message").html("");
        $("#btnReiniciar").addClass("d-none");
        ganador = false;
        clicks = 0;
    });

    function compruebaGanar(player) {
        opcionesGanar.forEach(options => {
            if(clickedPlayers[options[0]] == player && clickedPlayers[options[1]] == player && clickedPlayers[options[2]] == player)
                ganador = true;
        });
        return ganador;
    }

    function compruebaEmpate() {
        let relleno = true;

        clickedPlayers.forEach(value => {
            if(value == "")
                relleno = false;
        });
        return relleno;
    }

    function generarReiniciar() {
        $("#btnReiniciar").removeClass("d-none");
    }
});