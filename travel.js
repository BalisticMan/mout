var myTracks = {

}; //emmagatzemem tots els tracks en ordre cronologic

$.getJSON('http://time.jsontest.com', function(data) {
        
    var origen = `${data.origin}`
    var desti = `${data.desti}`

});

/*
 funció a conversió a json
 funcio per pujar el json al server
 funcio per imprimir al html
 funció per passar de direccio a parada de TP
*/

class Node {
    constructor(stationName,type) {
        //la informació del node la extraurem del directionService
        this.sationName = stationName;
        this.type = type;
    }
}

class Track {
    constructor (origin,end,time,nextTrack,times,type) {
        //1 track esta format per 2 nodes, origen desti
        //Separem els tracks per temps i els ordenem aixi
        //cada track te un punter al següent
        this.origin = origin;
        this.end = end;
        this.time = time;
        this.nextTrack = nextTrack;
        this.type = type;
        this.times = times; //nombre de vegades que apareix el track
    }
}

class Travel {
    constructor (firstTrack) {
        //un trajecte apunta al primer track
        //a partir del primer avancem amb el punter interior
    
        this.firstTrack = firstTrack;
    }
}

/* function dicotomicSearch(track,left,right) {
    //Pre: vector de tracks ordenat cronologicament
    //Post: es retorna true si el track ja hi és i track = posició on es troba. Si es retorna false,
    //track passa a ser la posició en la qual s'hauria de trobar el track que passem per referència
    var n = myTracks.length;

    left = myTracks[0];
    right = myTracks[n-1];
    track = track;
    n = myTracks.length/2;
    if (myTracks[n].time >= track.time) {

    } else {

    }  
} */

function getTravel  (start,end) {
    //funció que a partir de la api genera els nodes amb
    //els noms, cada 2 nodes crida a addTrack
    //crida a la API de google maps
    //start i end surten de les ubicacions predeterminades dels usuaris
    var travel = new Travel(start);
    var directionService = new google.maps.DirectionsService;
    var directionsDisplay;

    directionService.route({
        origin: document.getElementById(''), //aqui posem l'adreça origen del perfil de la persona
        destination:document.getElementById(''), //aqui posem l'adreça destí del perfil de la persona
        travelMode: 'TRANSIT'
        /*transitOptions: {
            arrivalTime: Date,
            departureTime: Date,
        }, */
    }, function(response, status) {
        if (status === 'OK') {
            //tenim la ruta a response
            directionsDisplay.setDirections(response);
            makeTracks(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function makeTracks(directionResult) {
    var auxTrack = new Track();
    var myRoute = directionResult.routes[0].legs[0];
    for (var i=0; i < myRoute.steps.length(); i++) {

        //comprovem que l'step en el que ens trobem sigui de transport públic, altrament no ens interessa   
        if (myRoute.steps[i].travelMode === 'TRANSIT') {
            //formació de la track a guardar
        auxTrack.origin = myRoute.steps[i].transit.departure_stop;
        auxTrack.nextTrack = auxTrack.end = myRoute.steps[i].transit.arrival_stop;
        auxTrack.time = myRoute.steps[i].transit.departure_time;
        auxTrack.type = myRoute.steps[i].transit.type; //tipus de transport públic del track
        //afegim el track al diccionari de tracks
        addTrack(auxTrack);
        }
    }
}

    //blucle fins que s'acabin les ubicacions tot creant tracks i acabar formar un travel
    //el primer travel incorporara totes les parelles de tracks ja que no hi haura cap
    //track i totes les hores seran noves
    


function addTrack(track) {
    //newTrack es true si es tracta d'un track inexistent, true altrament. pos = posisció correcta del track
    //Post: Si es un nou track, s'afegeix en l'ordre correcte a mytracks. Si el track
    //ja existeix, s'incrementa en 1 a la posicióx
    
    if (myTracks[track.time] === undefined) {
        //initialize array with first element
        myTracks[track.time] = [track];
    } else {
        //search through all elements with same time. Compare origin from element 
        //to add with existing elements and only add if not existing
        var auxTrack = myTracks[track.time].find(hasName, this);
        if (auxTrack === undefined) //afegim el nou track al time line
        else auxTrack.times += 1;
    }


}

function hasName(element) {
    return element.origin === this.track.origin;
}