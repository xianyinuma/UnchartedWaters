/**
 * Created by wenjin on 2017/4/28.
 */

//in the html, load the js file, must follow the inherit chain! By order!
// let testBox = new Box(1, 2, 3, 4);
// let movableObject = new MovableObject(5, 6);
// testBox.Operate(boat);
// movableObject.Update();
// movableObject.Collision();
// movableObject.Destroy();
$(document).ready(function () {

    let scene, camera, renderer;
    let staticObj = new ArrayList();
    let movableObj = new ArrayList();
    let boat;
    let output = $("#map-output");

    function setup() {
        setupThreeJS();
        setupWorld();

        function render() {
            requestAnimationFrame(render);
            boat.Update();
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
        boat = new Boat();
        scene.add(boat.body);
    }

    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setup();
});
