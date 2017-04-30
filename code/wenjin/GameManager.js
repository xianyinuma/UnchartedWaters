/**
 * Created by wenjin on 2017/4/29.
 */
class GameManager {
    constructor(playerID) {

        var playerID = playerID;
        var currentPlayer = new Player(playerID);
        var currentBoat = currentPlayer.InitialBoat();
        //adjust size by window
        var output = $("#map-output");
        //access the map data by playerID
        var boatArray = null;
        var bulletArray = null;
        var staticArray = null;

        boatArray = new ArrayList();
        boatArray.add(currentBoat);
        bulletArray = new ArrayList();
        bulletArray.add(new Boat(2).Fire());
        staticArray = new ArrayList();
        staticArray.add(new Box(1, 0));
        staticArray.add(new Portal(300, 1200, 900));

        //dynamic construct the camera
        var length = 1200;
        var width = 900;
        var camera = new THREE.PerspectiveCamera(75, length / width, 0.1, 30000000);
        camera.position.set(0, 20, 100);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.length, this.width);
        new THREE.OrbitControls( camera, renderer.domElement );

        var map = new Map(output, length, width, renderer, camera);

        function UpdateOutput(currentBoat, boatArray, bulletArray, staticArray) {
            /*let feedback = currentBoat.BoatCheck(bulletArray, staticArray);
            if (feedback.static != null) {
                //collision with static object
                feedback.static.Operate(currentBoat);
                staticArray.removeValue(feedback.static);
            }
            if (feedback.bullet != null) {
                currentBoat.ChangeHealth(-feedback.bullet.damage);
                if (currentBoat.health == 0) {
                    //died
                    alert(boatArray.size());
                    boatArray.removeValue(currentBoat);
                    alert(boatArray.size());
                    //send back the giveExp to do

                }
                bulletArray.removeValue(feedback.bullet);

            }*/
            map.UpdateStatus(boatArray, bulletArray, staticArray);
            map.UpdateOutput(boatArray, bulletArray, staticArray);
        }
        UpdateOutput(currentBoat, boatArray, bulletArray, staticArray);

        self.setInterval(function(){
          UpdateOutput(currentBoat, boatArray, bulletArray, staticArray, camera);
        },50);
    }
}