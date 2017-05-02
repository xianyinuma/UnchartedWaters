function Boat(scene, id) {

    this.id = id;

    let level = 1;
    let exp = 0;
    let damage = Math.pow(2, level - 1);
    let speed = 1 * level;
    let maxExp = 10 * Math.pow(2, level - 1);
    let giveExp = maxExp / 2;
    let maxHealth = 3 * Math.pow(2, level - 1);
    let health = maxHealth;

    let speedTimeDecreaseFlag = false;


    var theta = 0;
    var curSpeed = 0;
    //move info
    var time1, time2;

    var geometry = new THREE.CubeGeometry(20,15,45);
    var material = new THREE.MeshPhongMaterial({color: 0xffffff,shading: THREE.FlatShading});
    var body = new THREE.Mesh(geometry, material);
    body.updateMatrix();
    body.position.z = 1;
    // var body = BOAT.clone();

    scene.add(body);

    this.bullet = "null"; // todo


    this.setSpeed = function(spd){
        this.speed = spd;
    };

    this.getBody = function(){
        return body;
    };

    this.getCurSpeed = function(){
        return curSpeed;
    };

    this.getTheta = function(){
        return theta;
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


    let wFlag,aFlag,sFlag,dFlag = false;


    this.control = function(key,operation){
        if (operation == 'keydown'){
            switch (key){
                case 'w':
                    wFlag = true;
                    break;
                case 's':
                    sFlag = true;
                    break;
                case 'a':
                    aFlag = true;
                    break;
                case 'd':
                    dFlag = true;
                    break;
            }
        }else if(operation == 'keyup'){
            switch (key){
                case 'w':
                    wFlag = false;
                    break;
                case 's':
                    sFlag = false;
                    break;
                case 'a':
                    aFlag = false;
                    break;
                case 'd':
                    dFlag = false;
                    break;
            }
        }


        if (wFlag) move('w');
        if (aFlag) move('a');
        if (sFlag) move('s');
        if (dFlag) move('d');
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


    };

    //

    //this part

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
        if(!levelUp(add_exp)){
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
