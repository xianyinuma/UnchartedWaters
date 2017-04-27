/**
 * Created by Victor on 2017/4/25.
 */

function Bullet(){
    this.boat;//to do
    this.speed = 0.1;//to do
    this.downSpeed = 0;
    this.gravity = -0.01;//to do

    var geometry = new THREE.BoxGeometry(1, 0.5, 0.5);
    var material = new THREE.MeshBasicMaterial({color: 0xffffff * Math.random()});
    this.body = new THREE.Mesh(geometry, material);
    this.body.position.x = -10;
    
    scene.add(this.body);
    movableObj.add(this);


}

Bullet.prototype.collision = function(CollisionArray){

    var MovingCube = this.body;
    var originPoint = MovingCube.position.clone();

    for(var vertexIndex = 0; vertexIndex < MovingCube.geometry.vertices.length; vertexIndex++){
        //顶点原始坐标
        var localVertex = MovingCube.geometry.vertices[vertexIndex].clone();
        //顶点经过变换后的坐标
        var globalVertex = localVertex.applyMatrix4(MovingCube.matrix);
        //获得由中心指向顶点的向量
        var directionVector = globalVertex.sub(MovingCube.position);

        //将方向向量初始化
        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        //检测射线与多个物体相交的情况
        var collisionResults = ray.intersectObjects(CollisionArray, true);

        //如果返回结果不为空，且交点与射线起点的距离小于物体中心至顶点的距离，则发生碰撞
        if( collisionResults.length > 0  &&
            collisionResults[0].distance < (MovingCube.scale.x/2 + 0.1)){//原先是directionVector.length(),但在刚开始渲染阶段这个length有问题所以有修改

            //take Damage and destroy it
            scene.remove(this.body);
            return true;
        }
    }
};

Bullet.prototype.m_update = function (CollisionArray) {
    this.body.translateX(this.speed);
    this.downSpeed += this.gravity;
    this.body.translateY(this.downSpeed);

    return this.collision(CollisionArray);
};

Bullet.prototype.destroy = function () {
    scene.remove(this.body);
    movableObj.remove(this);
};
