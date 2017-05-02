/**
 * Created by wenjin on 2017/4/29.
 */
class GameManager {
    constructor(playerID) {

        var playerID = playerID;
        var currentPlayer = new Player(playerID); //todo
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
        // bulletArray.add(new Boat(2).Fire());

        staticArray = new ArrayList();
        let box = new Box(1, 0);
        
        
        box.mesh.position.set(100, 0, 100);
        staticArray.add(box);
        // staticArray.add(new Portal(300, 1200, 900));

        //dynamic construct the camera
        var length = 1200;
        var width = 700;
        
        var camera, controls;
        var renderer = new THREE.WebGLRenderer();

        //camera初始化
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000000);
        camera.position.set(0, 20, 100);
        controls = new THREE.OrbitControls(camera, renderer.domElement);

        var map = new Map(output, length, width, renderer, camera);
        

        function UpdateOutput(currentBoat, boatArray, bulletArray, staticArray) {
            let feedback = currentBoat.BoatCheck(bulletArray, staticArray);
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

            }
            map.UpdateStatus(boatArray, bulletArray, staticArray);
            map.UpdateOutput(boatArray, bulletArray, staticArray);

        }


        self.setInterval(function () {
            UpdateOutput(currentBoat, boatArray, bulletArray, staticArray, camera);
            //camera更新
            cameraUpdate();
        }, 30);



        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);

        function onKeyUp(event) {
            var value = String.fromCharCode(event.keyCode).toLowerCase();

            currentBoat.control(value, 'keyup');
        }

        function onKeyDown(event) {
            var value = String.fromCharCode(event.keyCode).toLowerCase();

            if(value == "f"){
                let bullet = currentBoat.Fire();
                alert(bullet.mesh.position.x);
                alert(bullet.mesh.position.y);
                alert(bullet.mesh.position.z);
                bullet.mesh.position.set(0,0,0);
                bulletArray.add(bullet);
            }

            currentBoat.control(value, 'keydown');
        }


        function cameraUpdate() {
            var cameraY = camera.position.y;
            var rad = Math.PI / 180;
        
            camera.position.x += currentBoat.curSpeed * Math.sin(rad * currentBoat.theta);
            camera.position.z += currentBoat.curSpeed * Math.cos(rad * currentBoat.theta);
            camera.position.y = cameraY;
            camera.lookAt({
                x: currentBoat.mesh.position.x,
                y: currentBoat.mesh.position.y,
                z: currentBoat.mesh.position.z
            });
        
            controls.target.set(currentBoat.mesh.position.x, currentBoat.mesh.position.y, currentBoat.mesh.position.z);
            camera.position.x += ( mouseX - camera.position.x ) * 0.1;
            camera.position.y += ( - mouseY - camera.position.y ) * 0.1;
            controls.update();
        }
        //镜头跟踪，用户体验无敌尬，不建议开启
    }
}