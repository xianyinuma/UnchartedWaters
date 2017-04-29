/**
 * Created by wenjin on 2017/4/28.
 */
class Box extends StaticObject {
    //initial the int: health and int: exp
    constructor(objectID, health, exp) {
        super(objectID);
        this.health = health;
        this.exp = exp;
    }

    Operate(boat){
        boat.ChangeExp(this.exp);
        boat.ChangeHealth(this.health);
    }
}