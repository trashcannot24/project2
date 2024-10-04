class WorldMap{
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.floorImage = new Image();
        this.floorImage.src = config.floorSrc;

        this.isCutScenePlaying = false;
    }

    drawImage(ctx, cameraPerson){
        ctx.drawImage(
            this.floorImage, 
            utils.widthGrid(10.5) - cameraPerson.x, 
            utils.widthGrid(6) - cameraPerson.y
        )
    }

    isSpaceTaken(currentX, currentY, direction){
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects(){
        Object.keys(this.gameObjects).forEach(key => {
            let object = this.gameObjects[key];
            object.id = key;
            object.mount(this);
        })
    }

    async startCutScene(events){
        this.isCutScenePlaying = true;
        for(let i=0; i<events.length; i++){
            const eventHandler = new OverWorldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }
        this.isCutScenePlaying = false;
    }

    addWall(x,y){
        this.walls[`${x},${y}`] = true;
    } 
    removeWall(x,y){
        delete this.walls[`${x},${y}`];
    } 

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
    }

    checkForActionCutscene(){
        const hero = this.gameObjects["hero"];
    }

    checkForGiftboxAction() {
        const hero = this.gameObjects["hero"];
        const giftbox = this.gameObjects["giftbox"];
        
        const heroX = hero.x / 32;
        const heroY = hero.y / 32;
        const giftboxX = giftbox.x / 32;
        const giftboxY = giftbox.y / 32;

        if (Math.abs(heroX - giftboxX) <= 1 && Math.abs(heroY - giftboxY) <= 1) {
            this.showGiftboxImage();
        }
    }

    showGiftboxImage() {
        const imagePopup = document.createElement("div");
        imagePopup.style.position = "fixed";
        imagePopup.style.top = "50%";
        imagePopup.style.left = "50%";
        imagePopup.style.transform = "translate(-50%, -50%)";
        imagePopup.style.backgroundColor = "white";
        imagePopup.style.padding = "20px";
        imagePopup.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
        imagePopup.style.zIndex = "1000";

        const image = document.createElement("img");
        image.src = "images/Siam.jpg";
        image.style.maxWidth = "100%";
        image.style.maxHeight = "80vh";

        imagePopup.appendChild(image);
        document.body.appendChild(imagePopup);
    }
}

window.MyMap = {
    BedRoom:{
        floorSrc: "images/map.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.widthGrid(10),
                y: utils.widthGrid(9),
            }),
            giftbox: new GameObject({
                x: utils.widthGrid(6),
                y: utils.widthGrid(7),
                src: "images/giftbox.png",
            }),
        },
        walls: {
            [utils.asGridCoord(0,4)]: true,
            [utils.asGridCoord(1,4)]: true,
            [utils.asGridCoord(2,4)]: true,
            [utils.asGridCoord(3,4)]: true,
            [utils.asGridCoord(4,4)]: true,
            [utils.asGridCoord(5,4)]: true,
            [utils.asGridCoord(6,4)]: true,
            [utils.asGridCoord(7,4)]: true,
            [utils.asGridCoord(8,4)]: true,
            [utils.asGridCoord(9,4)]: true,
            [utils.asGridCoord(10,4)]: true,
            [utils.asGridCoord(11,4)]: true,
            [utils.asGridCoord(12,4)]: true,
            [utils.asGridCoord(12,5)]: true,
            [utils.asGridCoord(12,6)]: true,
            [utils.asGridCoord(12,7)]: true,
            [utils.asGridCoord(12,8)]: true,
            [utils.asGridCoord(12,9)]: true,
            [utils.asGridCoord(12,10)]: true,
            [utils.asGridCoord(12,11)]: true,
            [utils.asGridCoord(0,11)]: true,
            [utils.asGridCoord(1,11)]: true,
            [utils.asGridCoord(2,11)]: true,
            [utils.asGridCoord(3,11)]: true,
            [utils.asGridCoord(4,11)]: true,
            [utils.asGridCoord(5,11)]: true,
            [utils.asGridCoord(6,11)]: true,
            [utils.asGridCoord(7,11)]: true,
            [utils.asGridCoord(8,11)]: true,
            [utils.asGridCoord(9,11)]: true,
            [utils.asGridCoord(10,12)]: true,
            [utils.asGridCoord(11,12)]: true,
            [utils.asGridCoord(0,5)]: true,
            [utils.asGridCoord(0,6)]: true,
            [utils.asGridCoord(0,7)]: true,
            [utils.asGridCoord(0,8)]: true,
            [utils.asGridCoord(0,9)]: true,
            [utils.asGridCoord(0,10)]: true,
            [utils.asGridCoord(0,11)]: true,
            [utils.asGridCoord(4,5)]: true,
            [utils.asGridCoord(3,6)]: true,
            [utils.asGridCoord(2,6)]: true,
            [utils.asGridCoord(1,6)]: true,
            [utils.asGridCoord(0,6)]: true,
            [utils.asGridCoord(7,5)]: true,
            [utils.asGridCoord(8,5)]: true,
            [utils.asGridCoord(10,5)]: true,
            [utils.asGridCoord(11,5)]: true,
            [utils.asGridCoord(4,8)]: true,
            [utils.asGridCoord(5,8)]: true,
            [utils.asGridCoord(4,9)]: true,
            [utils.asGridCoord(5,9)]: true,
            [utils.asGridCoord(4,10)]: true,
            [utils.asGridCoord(5,10)]: true,
            [utils.asGridCoord(9,10)]: true,
            [utils.asGridCoord(10,10)]: true,
            [utils.asGridCoord(10,11)]: true,
            [utils.asGridCoord(6,10)]: true,
        }
    },
}