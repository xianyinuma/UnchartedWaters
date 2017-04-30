/**
 * Created by Victor on 2017/4/27.
 */

class Boat extends MovableObject {
    constructor(radius, objectID) {
        super(radius, objectID);

        this.level = 1;
        this.damage = Math.pow(2, this.level - 1);
        this.horizontalSpeed = 10 / this.level;
        this.exp = 0;
        this.maxExp = 10 * Math.pow(2, this.level - 1);
        this.giveExp = this.maxExp / 2;
        this.maxHealth = 3 * Math.pow(2, this.level - 1);
        this.health = this.maxHealth;


        // let geometry = new THREE.CubeGeometry(2, 3, 4);
        // geometry.computeBoundingSphere();
        // let material = new THREE.MeshBasicMaterial({color: 0xffffff});
        // this.mesh = new THREE.Mesh(geometry, material);
        // this.mesh.updateMatrix();
        this.mesh = BOAT.clone();

    }

    BoatCheck(bulletArray, staticArray){
        var feedback = new Object();
        feedback.static = this.BoatCollisionArray(staticArray);
        feedback.bullet = this.BoatCollisionArray(bulletArray);

        return feedback;
    }

    BoatCollisionArray(collisionArray) {
        for (let i = 0; i < collisionArray.size(); i++) {
            if (this.BoatCollision(collisionArray.get(i).mesh))
                return collisionArray.get(i);
        }
        return null;
    }

    BoatCollision(collisionBody) {
        let originPos = this.mesh.position.clone();
        let collisionBodyPos = collisionBody.position.clone();

        let distanceSquared = originPos.distanceTo(collisionBodyPos);

        //let collisionBodyRadius = collisionBody.geometry.boundingSphere.radius;
        //let radius = this.mesh.geometry.boundingSphere.radius;

        // alert(radius);
        // alert(collisionBodyRadius);
        //return ((radius + collisionBodyRadius - 1.75) * (radius + collisionBodyRadius - 1.75) >= distanceSquared)
    }

    Fire() {
        //let bulletID = 123;
        return new Bullet(20, this.playerID, this.damage, this.level / 10);
    }

    Move() {
        // this.mesh.position.x += 0.01;
    }

    ChangeHealth(add_health) {
        var after_change = this.health + add_health;
        if (after_change > this.maxHealth) {
            this.health = this.maxHealth
        } else if (after_change <= 0) {
            this.health = 0;
        } else {
            this.health = after_change;
        }
    };

    ChangeExp(add_exp) {
        // some problem
        if (!this.LevelUp(add_exp)) {
            this.exp += add_exp;
        }
    };

    LevelUp(added_exp) {
        var after_exp = this.exp + added_exp;
        if (after_exp > this.maxExp) {
            this.level += 1;
            this.damage = Math.pow(2, this.level - 1);
            this.horizontalSpeed = 10 / this.level;
            this.exp = after_exp - this.maxExp;
            this.maxExp = 10 * Math.pow(2, this.level - 1);
            this.giveExp = this.maxExp / 2;
            this.maxHealth = 3 * Math.pow(2, this.level - 1);
            this.health = this.maxHealth;
            return true;
        } else {
            return false;
        }
    };
}
