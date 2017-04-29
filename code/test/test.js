/**
 * Created by wenjin on 2017/4/28.
 */

//in the html, load the js file, must follow the inherit chain! By order!
// let testBox = new Box(1, 2, 3, 4);
$(document).ready(function () {
    let length = 1200;
    let width = 900;
    let boatArray = new ArrayList();
    boatArray.add(new Boat(1));
    let bullet = new Boat(2).Fire();
    let bulletArray = new ArrayList();
    bulletArray.add(bullet);
    let staticArray = new ArrayList();
    let output = $("#map-output");

    //pass data to map
    let map = new Map(length, width);
    map.setUpMap(output, boatArray, bulletArray, staticArray);

});