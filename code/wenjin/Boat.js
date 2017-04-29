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

        // let geometry = new THREE.CubeGeometry(20,30,40);
        // geometry.computeBoundingSphere();
        // let material = new THREE.MeshBasicMaterial({color: 0xffffff});
        this.mesh = BOAT.clone();
        this.radius = 100;
        this.mesh.position.y = 10;
        this.mesh.updateMatrix();

        //move here
        var speedTimeDecreaseFlag = false;
        var theta = 0;
        var curSpeed = 0;
        var speed = this.horizontalSpeed;
        //move info
        var time1, time2;
        var body = this.mesh;


        var deltaSpeed = 2;//0.002
        //update
        this.timeExecute = function(){
            if(Date.now() - time1 >= 500){
                speedTimeDecreaseFlag = true;
            }
            if(speedTimeDecreaseFlag){
                if (curSpeed > 0){
                    if (curSpeed - deltaSpeed >= 0)
                        curSpeed -= deltaSpeed;
                    else{
                        curSpeed = 0;
                    }
                }else{
                    if (curSpeed + deltaSpeed <= 0)
                        curSpeed += deltaSpeed;
                    else{
                        curSpeed = 0;
                    }
                }
            }

            forward(curSpeed);

        };

        //control
        this.control = function(key){
            switch (key){
                case 'w':
                case 's':
                case 'a':
                case 'd':
                    move(key);


            }
        };

        var move = function(key){
            switch(key){
                case 'w':
                    increaseSpd();
                    time1 = Date.now();
                    speedTimeDecreaseFlag = false;
                    break;
                case 's':
                    decreaseSpd();
                    time1 = Date.now();
                    speedTimeDecreaseFlag = false;
                    break;
                case 'a':
                    changeDir(1);
                    break;
                case 'd':
                    changeDir(-1);
                    break;
            }
        };

        var increaseSpd = function(){
            if(curSpeed < speed){
                if (curSpeed + deltaSpeed <= speed){
                    curSpeed += deltaSpeed;
                }else{
                    curSpeed = speed;
                }
            }else{
                curSpeed = speed;
            }
        };

        var decreaseSpd = function(){
            if (curSpeed > -speed){
                if (curSpeed - deltaSpeed >= -speed){
                    curSpeed -= deltaSpeed;
                }else{
                    curSpeed = -speed;
                }
            }else{
                curSpeed = -speed;
            }
        };

        var changeDir = function(dir){
            if (curSpeed != 0){
                theta += dir;
                if (theta >= 360){
                    theta -= 360;
                }

                if (theta <= -360){
                    theta += 360;
                }
            }

            var rad = Math.PI / 180;
            body.rotation.y = rad * theta;
        };

        var forward = function(dist){
            var cameraX = camera.position.x;
            var cameraY = camera.position.y;
            var cameraZ = camera.position.z;
            var cameraDirX = camera.rotation.x;
            var cameraDirY = camera.rotation.y;
            var cameraDirZ = camera.rotation.z;

            var xDir = body.position.x;
            var zDir = body.position.z;
            var rad = Math.PI / 180;

            // var distance = Math.sqrt(xDir * xDir + zDir * zDir);
            //
            // distance += dist;

            zDir = zDir + dist * Math.cos(rad * theta);
            xDir = xDir + dist * Math.sin(rad * theta);

            body.position.z = zDir;
            body.position.x = xDir;


            camera.position.x += dist * Math.sin(rad * theta);
            camera.position.z += dist * Math.cos(rad * theta);
            camera.position.y = cameraY;
            camera.lookAt({
                x : body.position.x,
                y : body.position.y,
                z : body.position.z,
            });

        };

    }

    Fire() {
        let bulletID = 123;
        let bullet = new Bullet(bulletID, this, this.level / 10);
        bullet.mesh.position.set(this.mesh.position.clone());
        bullet.mesh.position.z += bullet.mesh.geometry.boundingSphere.radius;
        bullet.mesh.position.y += bullet.mesh.geometry.boundingSphere.radius;
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

