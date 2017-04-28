/**
 * Created by wenjin on 2017/4/28.
 */

//in the html, load the js file, must follow the inherit chain! By order!
let testBox = new Box(1, 2, 3, 4);
let movableObject = new MovableObject(5, 6);
testBox.Operate();
movableObject.Update();
movableObject.Collision();
movableObject.Destroy();