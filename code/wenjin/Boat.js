/**
 * Created by Victor on 2017/4/27.
 */

class Boat extends MyObject {
    constructor(id) {
        super(id);

        this.level = 1;
        this.damage = Math.pow(2, this.level - 1);
        this.horizontalSpeed = 10 / this.level;
        this.exp = 0;
        this.maxExp = 10 * Math.pow(2, this.level - 1);
        this.giveExp = this.maxExp / 2;
        this.maxHealth = 3 * Math.pow(2, this.level - 1);
        this.health = this.maxHealth;

        this.speedTimeDereaseFlag = false;

        // let geometry = new THREE.CubeGeometry(20,30,40);
        // geometry.computeBoundingSphere();
        // let material = new THREE.MeshBasicMaterial({color: 0xffffff});
        this.mesh = BOAT.clone();
        this.mesh.position.y = 10;
        this.mesh.updateMatrix();
    }

    Fire() {
        let bulletID = 123;
        let bullet = new Bullet(bulletID, this, this.level / 10);
        bullet.mesh.position.set(this.mesh.position.clone());
        bullet.mesh.position.z += 2;
        bullet.mesh.position.y += 2;
        return bullet;
    }

    Move() {
        //this.mesh.position.x += 0.1;
        // this.mesh.rotateY(0.1);
    }
    
    //返回碰撞物品集对象
    Update(bulletArray, staticArray) {
        this.Move();
        
        var option = new Object();
        option.staticObj = this.CollisionArray(staticArray);
        option.bullet = this.CollisionArray(bulletArray);
        
        return option;
    }
    
    //返回碰撞物品对象
    CollisionArray(collisionArray) {
        for (let i = 0; i < collisionArray.size(); i++) {

            if (this.Collision(collisionArray.get(i).mesh))
                return collisionArray.get(i);
        }
        return null;
    }
    Collision(collisionBody) {
        let originPos = this.mesh.position.clone();
        let collisionBodyPos = collisionBody.position.clone();

        let distanceSquared = originPos.distanceTo(collisionBodyPos);

        let collisionBodyRadius = collisionBody.geometry.boundingSphere.radius;
        let radius = this.mesh.geometry.boundingSphere.radius;

        // alert(radius);
        // alert(collisionBodyRadius);
        return ((radius + collisionBodyRadius - 1.75) * (radius + collisionBodyRadius - 1.75) >= distanceSquared)
    }


    ChangeHealth(add_health) {
        alert("ChangeHealth " + add_health);
        var after_change = this.health + add_health;
        if (after_change > this.maxHealth) {
            this.health = this.maxHealth
        } else if (after_change <= 0) {
            this.health = 0;
            this.Die();
            return true;
        } else {
            this.health = after_change;
        }
        return false;
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

