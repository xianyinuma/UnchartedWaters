/**
 * Created by Victor on 2017/4/27.
 */

function Box(health, exp) {
    this.health = health;
    this.exp = exp;

    this.operate = function (boat) {
        boat.changeHealth(this.health);
        boat.changeExp(this.exp);
    }
}