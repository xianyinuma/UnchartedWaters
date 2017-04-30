/**
 * Created by wenjin on 2017/4/29.
 */
class Map {
    constructor(output, length, width, camera) {
        this.output = output;
        this.length = length;
        this.width = width;
        this.camera = camera;
    }
    UpdateStatus(boatArray, bulletArray, staticArray) {
        for (let i = 0; i < boatArray.size(); i++) {
            boatArray.get(i).Move();
        }
        for (let i = 0; i < bulletArray.size(); i++) {
            bulletArray.get(i).Move();
        }
    }
    UpdateOutput(boatArray, bulletArray, staticArray) {
        this.scene = new THREE.Scene();
        //alert(boatArray.size());
        for (let i = 0; i < boatArray.size(); i++) {
            this.scene.add(boatArray.get(i).mesh)
        }
        for (let i = 0; i < bulletArray.size(); i++) {
            this.scene.add(bulletArray.get(i).mesh)
        }
        for (let i = 0; i < staticArray.size(); i++) {
            this.scene.add(staticArray.get(i).mesh)
        }
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.length, this.width);
        this.output.html(this.renderer.domElement);
        this.renderer.render(this.scene, this.camera);

    }
}