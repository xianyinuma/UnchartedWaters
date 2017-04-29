function Boat(scene,camera, id) {

    this.id = id;

    var level = 1;
    var exp = 0;
    var damage = Math.pow(2, level - 1);
    var speed = 0.1 * level;
    var maxExp = 10 * Math.pow(2, level - 1);
    var giveExp = maxExp / 2;
    var maxHealth = 3 * Math.pow(2, level - 1);
    var health = maxHealth;

    var speedTimeDecreaseFlag = false;


    var theta = 0;
    var curSpeed = 0;
    //move info
    var time1, time2;

    var geometry = new THREE.CubeGeometry(1,2,3);
    var material = new THREE.MeshPhongMaterial({color: 0xffffff,shading: THREE.FlatShading});
    var body = new THREE.Mesh(geometry, material);
    body.updateMatrix();
    body.position.z = 1;

    scene.add(body);

    this.bullet = "null"; // todo


    this.getBody = function(){
        return body;
    };


    this.fire = function () {
        // this.bullet.biubiu();

    };


    //

    this.timeExecute = function(){
        if(Date.now() - time1 >= 500){
            speedTimeDecreaseFlag = true;
        }
        if(speedTimeDecreaseFlag){
            if (curSpeed > 0){
                if (curSpeed - 0.002 >= 0)
                    curSpeed -= 0.002;
                else{
                    curSpeed = 0;
                }
            }else{
                if (curSpeed + 0.002 <= 0)
                    curSpeed += 0.002;
                else{
                    curSpeed = 0;
                }
            }
        }

        forward(curSpeed);

    };

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
            if (curSpeed + 0.002 <= speed){
                curSpeed += 0.002;
            }else{
                curSpeed = speed;
            }
        }else{
            curSpeed = speed;
        }
    };

    var decreaseSpd = function(){
        if (curSpeed > -speed){
            if (curSpeed - 0.002 >= -speed){
                curSpeed -= 0.002;
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
    
    //

    var changeHealth = function (add_health) {
        var after_change = health + add_health;
        if (after_change > maxHealth) {
            health = maxHealth
        } else if (after_change <= 0) {
            this.die();
        } else {
            health = after_change;
        }
    };

    var changeExp = function (add_exp) {
        if(!this.levelUp(add_exp)){
            exp += add_exp;
        }
    };
    
    var levelUp = function (added_exp) {
        var after_exp = exp + added_exp;
        if (after_exp > maxExp) {
            level += 1;
            damage = Math.pow(2, level - 1);
            speed = 0.01 * level;
            exp = after_exp - maxExp;
            maxExp = 10 * Math.pow(2, level - 1);
            giveExp = maxExp / 2;
            maxHealth = 3 * Math.pow(2, level - 1);
            health = maxHealth;
            return true;
        } else {
            return false;
        }
    };

    //setInterval(this.timeExecute,50);

}
