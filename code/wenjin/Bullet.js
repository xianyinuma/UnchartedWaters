/**
 * Created by Victor on 2017/4/25.
 */

class Bullet extends MyObject {
    constructor(objectID, boat, speed) {
        super(objectID);
        this.boat = boat;//to do
        this.horizontalSpeed = speed;//to do
        this.verticalSpeed = 0;
        this.gravity = 0;//to do

        //for test (need to change)
        var geometry = new THREE.SphereGeometry(0.5);
        geometry.computeBoundingSphere();
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.mesh = new THREE.Mesh(geometry, material);
        // this.mesh.position.x = -5;
        // this.mesh.position.y = 0;

        //scene.add(this.body);
        //movableObj.add(this);
    }

    Update() {
        this.Move();
    }

    Move() {
        //bullet move
        this.mesh.translateX(this.horizontalSpeed);
        this.verticalSpeed += this.gravity;
        this.mesh.translateY(this.verticalSpeed);
    }

    Operate(boat){
        if(boat.ChangeHealth(-this.boat.damage)){
            this.boat.ChangeExp(boat.giveExp);
            return true;
        }
        return false;
    }

    Destroy() {
        //scene.remove(this.body);
        //movableObj.remove(this);
    };
}
