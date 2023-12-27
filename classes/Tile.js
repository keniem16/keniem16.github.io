class Tile{
    constructor(position, tileSize){
        this.tileSize = tileSize;
        this.matrixPosition = position;
        this.worldPosition = Vec2.mult(position, tileSize);
        
        // this.type = Math.floor(Math.random() * 2);
        this.type = 0;
        this.var = Math.floor(Math.random() * 5);

        // console.log(position.x, position.y)

        if(map[position.x] !== undefined && map[position.x][position.y] !== undefined){
            if(map[position.x][position.y] == " "){
                this.type = 1;
            }
            if(map[position.x][position.y] == "X"){
                this.type = 2;
            }
        }

    }

    render(){
        if(this.type == 0){
            ctx.fillStyle = `rgb(15,15,15)`;
            ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), this.tileSize + 1, this.tileSize + 1);
        }
        else if(this.type == 1){
            ctx.fillStyle = `rgb(255, 210, 210)`;
            ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), this.tileSize + 1, this.tileSize + 1);
        }
        else if(this.type == 2){
            ctx.fillStyle = `rgb(210, 210, 255)`;
            ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), this.tileSize + 1, this.tileSize + 1);

            ctx.fillStyle = `rgb(180, 180, 255)`;


            if(map[this.matrixPosition.x - 1][this.matrixPosition.y] != "X"){
                ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), 10, this.tileSize + 1);
            }
            if(map[this.matrixPosition.x + 1][this.matrixPosition.y] != "X"){
                ctx.fillRect(worldToScreenX(this.worldPosition.x) + this.tileSize - 10, worldToScreenY(this.worldPosition.y), 10, this.tileSize + 1);
            }
            if(map[this.matrixPosition.x][this.matrixPosition.y - 1] != "X"){
                ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), this.tileSize + 1, 10);
            }
            if(map[this.matrixPosition.x][this.matrixPosition.y + 1] != "X"){
                ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y) + this.tileSize - 10, this.tileSize + 1, 10);
            }
        }

        // ctx.drawImage(srcTiles, this.var * 145, 0, 144, 144, worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), 144, 144)
    }
}