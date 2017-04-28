/**
 * Created by wenjin on 2017/4/28.
 */
class Box extends StaticObject{
    //initial the int: health and int: exp
    constructor(objectID, body, health, exp) {
        super(objectID, body);
        this.health = health;
        this.exp = exp;
    }
}