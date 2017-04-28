/**
 * Created by wenjin on 2017/4/28.
 */
class Portal extends StaticObject{
    constructor(objectID, body, lifeSpan) {
        super(objectID, body);
        this.lifeSpan = lifeSpan;
    }
}