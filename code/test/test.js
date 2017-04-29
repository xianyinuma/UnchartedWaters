/**
 * Created by wenjin on 2017/4/28.
 */

//in the html, load the js file, must follow the inherit chain! By order!
// let testBox = new Box(1, 2, 3, 4);
$(document).ready(function () {

    let scene, camera, renderer;
    let staticArray = new ArrayList();
    let boatArray = new ArrayList();
    let bulletArray = new ArrayList();
    let output = $("#map-output");


    function setup() {
        setupThreeJS();
        setupWorld();

        function render() {
            requestAnimationFrame(render);
            
            for (let i = 0; i < boatArray.size(); i++) {
                let option = boatArray.get(i).Update(bulletArray, staticArray);

                if (option.staticObj != null) {
                    StaticObjHit(option.staticObj, boatArray.get(i));
                }

                if (option.bullet != null) {
                    BulletHit(option.bullet, boatArray.get(i));
                }
            }
            
            for (let i = 0; i < bulletArray.size(); i++) {
                bulletArray.get(i).Update();
            }
            
            renderer.render(scene, camera);
        }

        render();
        // listen to the resize events
        window.addEventListener('resize', onResize, false);
    }

    function setupThreeJS() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();

        camera.position.z = 10;
        renderer.setSize(window.innerWidth, window.innerHeight);
        output.append(renderer.domElement);
    }

    function setupWorld() {
        let boat = new Boat(1);
        boatArray.add(boat);

        for (let i = 0; i < boatArray.size(); i++) {
            scene.add(boatArray.get(i).body);
        }


        let bullet = boat.Fire();
        bulletArray.add(bullet);
        for (let i = 0; i < bulletArray.size(); i++) {
            scene.add(bulletArray.get(i).body);
        }
    }

    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function BulletHit(bullet, boat) {
        if(bullet.Operate(boat))
            BoatDie(boat);

        scene.remove(bullet.body);
        bulletArray.remove(bullet);

    }
    
    function BoatDie(boat) {
        scene.remove(boat.body);
        boatArray.remove(boat);
    }

    function StaticObjHit(staticObj, boat){
        staticObj.Operate(boat);
        scene.remove(staticObj.body);
        staticArray.remove(staticObj);
    }


    setup();
});
