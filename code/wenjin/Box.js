/**
 * Created by wenjin on 2017/4/28.
 */
class Box extends StaticObject {
    //initial the int: health and int: exp
    constructor(objectID, health, exp) {
        super(objectID);
        this.health = health;
        this.exp = exp;

        var geometry = new THREE.SphereGeometry(0.5);
        geometry.computeBoundingSphere();
        var material = new THREE.MeshBasicMaterial({color: 0xffff00});
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x = 5;
        this.mesh.position.y = 0;

    }

    Operate(boat){
        boat.ChangeExp(this.exp);
        boat.ChangeHealth(this.health);
    }
}