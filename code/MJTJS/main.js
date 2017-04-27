/**
 * Created by Victor on 2017/4/25.
 */
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

        for (var i = 0; i < movableObj.size(); i++) {
            var b = movableObj.toArray()[i];
            
            if (b.m_update(staticObj)) {
                b.destroy();

                new Bullet();
            }
        }

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

    staticObj[0] = boat.body;
    new Bullet();
    // movableObj.add(new Bullet());
}





setup();