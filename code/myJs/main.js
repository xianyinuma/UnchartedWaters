if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var stats;

var camera, controls, scene, renderer;
var light;
var boat;

var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var output = "";

var container;

init();
// render(); // remove when using next line for animation loop (requestAnimationFrame)
animate();

function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

    renderer = new THREE.WebGLRenderer({ antialias: true } );
    renderer.setClearColor( scene.fog.color );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container = document.getElementById( 'container' );
    container.innerHTML =  output ;

    container.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    // camera = new THREE.OrthographicCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );


    camera.position.z = 10;
    camera.position.x = 10;
    camera.position.y = 10;

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    // controls = new THREE.PointerLockControls( camera );

    // controls.addEventListener( 'change', render ); // remove when using animation loop
    // enable animation loop when using damping or autorotation
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.25;
    // controls.enableZoom = false;


    // world
    boat = new Boat(scene,camera, 1);//todo



    //懒得加地面于是这是一个参照物
    var geometry = new THREE.CubeGeometry(0.5,0.5,0.5);
    var material = new THREE.MeshPhongMaterial({color: 0xffffff,shading: THREE.FlatShading});
    var cubeRef = new THREE.Mesh(geometry, material);
    cubeRef.updateMatrix();
    scene.add(cubeRef);



    // lights

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    light = new THREE.DirectionalLight( 0x002288 );
    light.position.set( -1, -1, -1 );
    scene.add( light );

    light = new THREE.AmbientLight( 0x222222 );
    scene.add( light );


    container.appendChild( renderer.domElement );

    // stats = new Stats();
    // container.appendChild( stats.dom );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );


    window.addEventListener( 'resize', onWindowResize, false );

    //control
    document.addEventListener('keydown',onKeyDown,false);

}

function onKeyDown(event){
    var value = String.fromCharCode(event.keyCode).toLowerCase();

    boat.control(value);

}




function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    // controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    render();


    // stats.update();
}


function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );

}

function render() {
    // camera.position.x += ( mouseX - camera.position.x ) * 0.1;
    // camera.position.y += ( - mouseY - camera.position.y ) * 0.1;


    // camera.lookAt( scene.position );
    renderer.render( scene, camera );
}