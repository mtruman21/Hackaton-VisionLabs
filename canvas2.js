static async draw(context, inputjson) {
    this.context = context;
    let rear;
    let lear;
    let nosex;
    let nosey;
    let wristx;
    let wristy;
    let lwx;
    let lwy;
    let rwx;
    let rwy;
    for (let i = 0; i < inputjson.length; i += 1) {
        rear = _.get(inputjson[i], 'keypoints.[4].position.x');
        lear = _.get(inputjson[i], 'keypoints.[3].position.x');
        nosex = _.get(inputjson[i], 'keypoints.[0].position.x');
        nosey = _.get(inputjson[i], 'keypoints.[0].position.y');
        lwx = _.get(inputjson[i], 'keypoints.[9].position.x');
        lwy = _.get(inputjson[i], 'keypoints.[9].position.y');
        rwx = _.get(inputjson[i], 'keypoints.[10].position.x');
        rwy = _.get(inputjson[i], 'keypoints.[10].position.y');
        if (lwy < rwy) {
            wristx = lwx;
            wristy = lwy;
        } else {
            wristx = rwx;
            wristy = rwy;
        }
        if (nosey > wristy) {
            context.fillStyle = "green";
            context.strokeStyle = "green";
        } else {
            context.fillStyle = "red";
            context.strokeStyle = "red";
        }
        //draw fisrt circle for head
        context.globalAlpha = 0.4;
        context.beginPath();
        context.arc(nosex, nosey, (lear - rear) / 2, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
        //draw second circle for leftwrist
        context.globalAlpha = 0.4;
        context.beginPath();
        context.arc(lwx, lwy, (lear - rear) / 3, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
        //draw second circle for rightwrist
        context.globalAlpha = 0.4;
        context.beginPath();
        context.arc(rwx, rwy, (lear - rear) / 3, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
        //draw the line
        context.beginPath();
        context.lineWidth = 5;
        context.globallAlpha = 1;
        context.moveTo(lwx, lwy);
        context.lineTo(nosex, nosey);
        context.lineTo(rwx, rwy);
        context.stroke();
    }
}