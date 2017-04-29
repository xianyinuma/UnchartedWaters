/**
 * Created by wenjin on 2017/4/28.
 */

//in the html, load the js file, must follow the inherit chain! By order!
// let testBox = new Box(1, 2, 3, 4);
$(document).ready(function () {

    let scene, camera, renderer;
    let staticObj = new ArrayList();
    let boatArray = new ArrayList();
    let bulletArray = new ArrayList();
    let output = $("#map-output");

    function setup() {
        setupThreeJS();
        setupWorld();

        function render() {
            requestAnimationFrame(render);
            for (let i = 0; i < boatArray.size(); i++) {
                boatArray.get(i).Update();
            }
            for (let i = 0; i < bulletArray.size(); i++) {
                bulletArray.get(i).Update(boatArray);
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
        let boat = new Boat();
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

    setup();
});
