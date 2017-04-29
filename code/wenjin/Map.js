/**
 * Created by wenjin on 2017/4/29.
 */
class Map {

    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
    setUpMap(output, boatArray, bulletArray, staticArray) {
        this.output = output;
        this.boatArray = boatArray;
        this.bulletArray = bulletArray;
        this.staticArray = staticArray;

        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        let renderer = new THREE.WebGLRenderer();

        camera.position.z = 10;
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

        function onResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function BulletHit(bullet, boat) {
            if(bullet.Operate(boat))
                BoatDie(boat);

            scene.remove(bullet.mesh);
            bulletArray.remove(bullet);

        }

        function BoatDie(boat) {
            scene.remove(boat.mesh);
            boatArray.remove(boat);
        }

        function StaticObjHit(staticObj, boat){
            staticObj.Operate(boat);
            scene.remove(staticObj.mesh);
            staticArray.remove(staticObj);
        }

        render();
        // listen to the resize events
        window.addEventListener('resize', onResize, false);
    }

}