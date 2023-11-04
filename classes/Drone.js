class Drone{
    constructor(){
        this.position = new Vec2(0,0);
        this.velocity = new Vec2(0,0);
        this.angle = 45;
        this.angleVelocity = 0;
        this.vertex = [
            new Vec2(0 - 60, 0 - 15),
            new Vec2(0 + 60, 0 - 15),
            new Vec2(0 - 60, 0 + 15),
            new Vec2(0 + 60, 0 + 15)
        ];
    }

    update(){
        
        if(leftDown){
            this.angleVelocity -= 0.6;
            this.velocity = Vec2.add(this.velocity, Vec2.mult(Vec2.angleToVector(this.angle), 0.08));

            spawnParticle(this.position, this.velocity, this.angle, 0);
        }
        if(rightDown){
            this.angleVelocity += 0.6;
            this.velocity = Vec2.add(this.velocity, Vec2.mult(Vec2.angleToVector(this.angle), 0.08));

            spawnParticle(this.position, this.velocity, this.angle, 1);

        }
        if(leftDown && rightDown){
            this.velocity = Vec2.add(this.velocity, Vec2.mult(Vec2.angleToVector(this.angle), 0.16));
        }
        
        this.angleVelocity *= 0.9;
        this.angle += this.angleVelocity;
        this.angle *= 0.99;
        
        if(this.angle >= 180){
            this.angle -= 360;
        }
        if(this.angle < -180){
            this.angle += 360;
        }

        this.velocity = Vec2.add(this.velocity, new Vec2(0, 0.1));
        this.velocity = Vec2.mult(this.velocity, 0.999);
        this.position = Vec2.add(this.position, this.velocity);

        this.updateVertex();
    
        for(let i = 0; i<4; i++){
            if(
                this.vertex[i].x > ground.position.x && 
                this.vertex[i].x < ground.position.x + ground.size.x &&
                this.vertex[i].y > ground.position.y && 
                this.vertex[i].y < ground.position.y + ground.size.y
            ){
                this.velocity.y = 0;
                
                if(Math.abs(ground.position.y - this.vertex[i].y) < Math.abs((ground.position.y + ground.size.y) - this.vertex[i].y)){
                    this.velocity.y -= Math.abs(ground.position.y - this.vertex[i].y)
                }
                else{
                    this.velocity.y += Math.abs((ground.position.y + ground.size.y) - this.vertex[i].y);
                }
                
                // this.velocity.y -= Math.min(Math.abs(ground.position.y - this.vertex[i].y), Math.abs((ground.position.y + ground.size.y) - this.vertex[i].y));
                this.velocity.x /= 1.1;

                if(i == 2){
                    this.angleVelocity -= 0.5;
                }
                if(i == 3){
                    this.angleVelocity += 0.5;
                }
            }
        }
    }

    updateVertex() {
        this.vertex[0].x = this.position.x - Math.cos(this.angle * Math.PI / 180) * 60 - Math.sin(this.angle * Math.PI / 180) * 15;
        this.vertex[0].y = this.position.y - Math.cos(this.angle * Math.PI / 180) * 15 + Math.sin(this.angle * Math.PI / 180) * 60;
    
        this.vertex[1].x = this.position.x + Math.cos(this.angle * Math.PI / 180) * 60 - Math.sin(this.angle * Math.PI / 180) * 15;
        this.vertex[1].y = this.position.y - Math.cos(this.angle * Math.PI / 180) * 15 - Math.sin(this.angle * Math.PI / 180) * 60;
    
        this.vertex[2].x = this.position.x - Math.cos(this.angle * Math.PI / 180) * 60 + Math.sin(this.angle * Math.PI / 180) * 15;
        this.vertex[2].y = this.position.y + Math.cos(this.angle * Math.PI / 180) * 15 + Math.sin(this.angle * Math.PI / 180) * 60;
    
        this.vertex[3].x = this.position.x + Math.cos(this.angle * Math.PI / 180) * 60 + Math.sin(this.angle * Math.PI / 180) * 15;
        this.vertex[3].y = this.position.y + Math.cos(this.angle * Math.PI / 180) * 15 - Math.sin(this.angle * Math.PI / 180) * 60;
    }

    render(){
        ctx.translate( worldToScreenX(this.position.x), worldToScreenY(this.position.y) );
        ctx.rotate(-this.angle * Math.PI / 180);
        ctx.translate(- worldToScreenX(this.position.x),- worldToScreenY(this.position.y) );
        
        ctx.drawImage(srcDrone, worldToScreenX(this.position.x - 60), worldToScreenY(this.position.y - 15), 120, 30);
        
        ctx.fillStyle = `rgb(60,240,100)`;
        if(leftDown){
            ctx.fillRect(worldToScreenX(this.position.x - 60 + 5), worldToScreenY(this.position.y - 15 + 8), 10, 5);
            ctx.drawImage(srcFire[Math.floor(Math.random() * 2)], worldToScreenX(this.position.x - 60 + 1), worldToScreenY(this.position.y - 15 + 28), 18, 32);
        }
        if(rightDown){
            ctx.fillRect(worldToScreenX(this.position.x + 60 - 15), worldToScreenY(this.position.y + 15 - 22), 10, 5);
            ctx.drawImage(srcFire[Math.floor(Math.random() * 2)], worldToScreenX(this.position.x + 60 - 19), worldToScreenY(this.position.y + 15 - 2), 18, 32);
        }


        ctx.translate( worldToScreenX(this.position.x), worldToScreenY(this.position.y) );
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.translate(- worldToScreenX(this.position.x),- worldToScreenY(this.position.y) );
        
        // ctx.fillStyle = `rgb(255,50,50)`;
        // ctx.fillRect(worldToScreenX(this.position.x) - 3, worldToScreenY(this.position.y) - 3, 6, 6);
    
        // for(let i = 0; i<4; i++){
        //     ctx.fillRect(worldToScreenX(this.vertex[i].x) - 3, worldToScreenY(this.vertex[i].y) - 3, 6, 6);
        // }
    }
}