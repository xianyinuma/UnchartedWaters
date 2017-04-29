/**
 * Created by wenjin on 2017/4/28.
 */

//in the html, load the js file, must follow the inherit chain! By order!
// let testBox = new Box(1, 2, 3, 4);
$(document).ready(function () {
    let length = 1200;
    let width = 900;
    
    let boatArray = new ArrayList();
    let bulletArray = new ArrayList();
    let staticArray = new ArrayList();

    let map = new Map(length, width);
    map.loadModel();

    setTimeout(function () {
        //添加一艘船
        let boat = new Boat(1);
        boatArray.add(boat);

        let output = $("#map-output");

        //pass data to map
        map.setUpMap(output, boatArray, bulletArray, staticArray);
    },1000);

    //发射子弹
    // map.fire(boat);

    // document.addEventListener('keydown',onKeyDown,false);

    function onKeyDown(event){
        var value = String.fromCharCode(event.keyCode).toLowerCase();
        if(value == " "){
            map.fire(boat);
        }
    }
});