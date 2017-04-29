/**
 * Created by Victor on 2017/4/27.
 */

class Boat extends MovableObject {
    constructor(id) {
        super(id);

        this.level = 1;
        this.damage = Math.pow(2, this.level - 1);
        this.speed = 10 / this.level;
        this.exp = 0;
        this.maxExp = 10 * Math.pow(2, this.level - 1);
        this.giveExp = this.maxExp / 2;
        this.maxHealth = 3 * Math.pow(2, this.level - 1);
        this.health = this.maxHealth;


        let geometry = new THREE.CubeGeometry(2, 2, 2);
        let material = new THREE.MeshBasicMaterial({color: 0xffffff * Math.random()});
        this.body = new THREE.Mesh(geometry, material);
        this.body.updateMatrix();
    }

    Fire() {
        //alert("fire");
        let bullet = new Bullet();
        return bullet;
    }

    Move() {
        this.body.position.x += 0.1;
    }

    Die() {
        alert("die");
    }
    
    Update(){
        this.Move();
        this.Collision();
    }
    
    Collision(){
        
    }


    ChangeHealth(add_health) {
        var after_change = this.health + add_health;
        if (after_change > this.maxHealth) {
            this.health = this.maxHealth
        } else if (after_change <= 0) {
            this.die();
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
            this.speed = 10 / this.level;
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

