/**
 * Created by Victor on 2017/4/25.
 */

class Bullet extends MovableObject {
    constructor(radius, playerID, damage, speed) {
        super(radius, playerID);
        //this.boat = boat;//to do
        this.damage = damage;
        this.horizontalSpeed = speed;//to do
        this.verticalSpeed = 0;
        this.gravity = 0;//to do

        //for test (need to change)
        // let geometry = new THREE.SphereGeometry(0.5);
        // geometry.computeBoundingSphere();
        // let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        // this.mesh = new THREE.Mesh(geometry, material);
        //
        // this.mesh.position.x = -5;
        // this.mesh.position.y = 0;
        this.mesh = BULLETSPHERE.clone();

    }

    Move() {
        //Bullet Move
        this.mesh.translateX(this.horizontalSpeed);
        this.verticalSpeed += this.gravity;
        this.mesh.translateY(this.verticalSpeed);
    }

}
