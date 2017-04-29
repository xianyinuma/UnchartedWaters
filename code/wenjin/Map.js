/**
 * Created by wenjin on 2017/4/29.
 */
class Map {

    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    loadModel(){
        createWoodenShip();
        createRecruit();
        createBulletSphere();
    }

    setUpMap(output, boatArray, bulletArray, staticArray) {
        this.output = output;
        this.boatArray = boatArray;
        this.bulletArray = bulletArray;
        this.staticArray = staticArray;

        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.5, 3000000);
        let renderer = new THREE.WebGLRenderer();

        camera.position.set(0, 20, 100);
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.output.append(renderer.domElement);

        for (let i = 0; i < this.boatArray.size(); i++) {
            scene.add(this.boatArray.get(i).mesh)
        }
        for (let i = 0; i < this.bulletArray.size(); i++) {
            scene.add(this.bulletArray.get(i).mesh)
        }
        for (let i = 0; i < this.staticArray.size(); i++) {
            scene.add(this.staticArray.get(i).mesh)
        }

        //fog
        scene.fog = new THREE.FogExp2(0xaabbbb, 0.0001);


        let water;
        //add mirror mesh
        AddMirrorMesh();

        //add sky box
        AddSkyBox();




        // sky box
        function AddSkyBox() {
            var cubeMap = new THREE.CubeTexture([]);
            cubeMap.format = THREE.RGBFormat;

            var loader = new THREE.ImageLoader();
            loader.load('../../assets/textures/skyboxsun25degtest.png', function (image) {

                var getSide = function (x, y) {

                    var size = 1024;

                    var canvas = document.createElement('canvas');
                    canvas.width = size;
                    canvas.height = size;

                    var context = canvas.getContext('2d');
                    context.drawImage(image, -x * size, -y * size);

                    return canvas;

                };

                cubeMap.images[0] = getSide(2, 1); // px
                cubeMap.images[1] = getSide(0, 1); // nx
                cubeMap.images[2] = getSide(1, 0); // py
                cubeMap.images[3] = getSide(1, 2); // ny
                cubeMap.images[4] = getSide(1, 1); // pz
                cubeMap.images[5] = getSide(3, 1); // nz
                cubeMap.needsUpdate = true;

            });

            var cubeShader = THREE.ShaderLib['cube'];
            cubeShader.uniforms['tCube'].value = cubeMap;

            var skyBoxMaterial = new THREE.ShaderMaterial({
                fragmentShader: cubeShader.fragmentShader,
                vertexShader: cubeShader.vertexShader,
                uniforms: cubeShader.uniforms,
                depthWrite: false,
                side: THREE.BackSide
            });

            var skyBox = new THREE.Mesh(
                new THREE.BoxGeometry(1000000, 1000000, 1000000),
                skyBoxMaterial
            );

            scene.add(skyBox);
        }

        //add mirror mesh
        function AddMirrorMesh() {
            scene.add(new THREE.AmbientLight(0x444444));

            var light = new THREE.DirectionalLight(0xffffbb, 1);
            light.position.set(-1, 1, -1);
            scene.add(light);

            let parameters = {
                width: 2000,
                height: 2000,
                widthSegments: 250,
                heightSegments: 250,
                depth: 1500,
                param: 4,
                filterparam: 1
            };

            let waterNormals = new THREE.TextureLoader().load('../../assets/textures/waternormals.jpg');
            waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

            water = new THREE.Water(renderer, camera, scene, {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: waterNormals,
                alpha: 1.0,
                sunDirection: light.position.clone().normalize(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 50.0,
                fog: scene.fog != undefined
            });


            let mirrorMesh = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(parameters.width * 500, parameters.height * 500),
                water.material
            );

            mirrorMesh.add(water);
            mirrorMesh.rotation.x = -Math.PI * 0.5;

            scene.add(mirrorMesh);


        }


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


            water.material.uniforms.time.value += 1.0 / 60.0;
            water.render();
            renderer.render(scene, camera);
        }

        function onResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function BulletHit(bullet, boat) {
            if (bullet.Operate(boat))
                BoatDie(boat);

            scene.remove(bullet.mesh);
            bulletArray.remove(bullet);

        }

        function BoatDie(boat) {
            scene.remove(boat.mesh);
            boatArray.remove(boat);
        }

        function StaticObjHit(staticObj, boat) {
            staticObj.Operate(boat);
            scene.remove(staticObj.mesh);
            staticArray.remove(staticObj);
        }

        render();
        // listen to the resize events
        window.addEventListener('resize', onResize, false);
    }

    fire(boat) {
        let bullet = boat.Fire(1);
        this.bulletArray.add(bullet);
        this.scene.add(bullet.mesh);
    }

}