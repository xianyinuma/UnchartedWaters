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


var scene, camera, renderer;
var staticObj = [], movableObj = new ArrayList();
var boat;
var output;

function setup() {
    setupThreeJS();
    setupWorld();
    output = document.getElementById("output");


    function render() {
        requestAnimationFrame(render);

        boat.Update();

        renderer.render(scene, camera);
    }

    render();
}

function setupThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

function setupWorld() {

    boat = new Boat();
    scene.add(boat.body);
    

}



setup();