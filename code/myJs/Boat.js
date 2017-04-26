function Boat(id) {
    this.id = id;


    this.level = 1;
    this.damage = Math.pow(2, this.level - 1);
    this.speed = 10 / this.level;
    this.exp = 0;
    this.maxExp = 10 * Math.pow(2, this.level - 1);
    this.giveExp = this.maxExp / 2;
    this.maxHealth = 3 * Math.pow(2, this.level - 1);
    this.health = this.maxHealth;


    var geometry = new THREE.CubeGeometry(1,1,1);
    var material = new THREE.MeshPhongMaterial({color: 0xffffff,shading: THREE.FlatShading});
    this.body = new THREE.Mesh(geometry, material);
    this.body.updateMatrix();


    this.bullet = "null"; // todo

    this.fire = function () {
        alert("fire");
    };

    this.move = function () {
        alert("move");
    };

    this.die = function () {
        alert("die");
    };

    this.changeHealth = function (add_health) {
        var after_change = this.health + add_health;
        if (after_change > this.maxHealth) {
            this.health = this.maxHealth
        } else if (after_change <= 0) {
            this.die();
        } else {
            this.health = after_change;
        }
    };

    this.changeExp = function (add_exp) {
        if(!this.levelUp(add_exp)){
            this.exp += add_exp;
        }
    };

    this.levelUp = function (added_exp) {
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