class Sprite {
    constructor(config) {
  
      //Set up the image
      this.image = new Image();
      this.image.src = config.src;
      this.image.onload = () => {
        this.isLoaded = true;
      }

      //Configure Animation & Initial State
      this.animations = config.animations || {
        "idle-down": [  [0,1] ],
        "idle-right": [  [0,0] ],
        "idle-up": [  [0, 3] ],
        "idle-left": [  [3,0] ],
        "walk-down": [  [0,1] , [1, 1], [0,1], [3,1]],
        "walk-right": [  [0, 2] , [1, 2], [0,2], [3,2]],
        "walk-up": [  [0, 3] , [1, 3], [0,3], [3,3]],
        "walk-left": [  [0, 4] , [1, 4], [0, 4], [3, 4]],

      }
      this.currentAnimation = config.currentAnimation || "idle-down";
      this.currentAnimationFrame = 0;

      this.animationFrameLimit = config.animationFrameLimit || 8;
      this.animationFrameProgress =  this.animationFrameLimit;


  
      //Reference the game object
      this.gameObject = config.gameObject;
    }
    
    get frame() {
      return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key){
      if (this.currentAnimation !== key){
        this.currentAnimation = key;
        this.currentAnimationFrame = 0;
        this.animationFrameProgress = this.animationFrameLimit;
      }
    }

    updateAnimationProgress(){
      //Downtick frame progress
      if(this.animationFrameProgress > 0){
        this.animationFrameProgress -= 1;
        return;
      }

      //Reset the counter
       this.animationFrameProgress = this.animationFrameLimit;
       this.currentAnimationFrame += 1;

       if(this.frame === undefined){
        this.currentAnimationFrame = 0;
       }
    }
  
    draw(ctx, cameraPerson) {
      const x = this.gameObject.x - 8 + utils.widthGrid(10.5) - cameraPerson.x;
      const y = this.gameObject.y - 18 + utils.widthGrid(6) - cameraPerson.y;

  
      const [frameX, frameY] = this.frame;

  

      this.isLoaded && ctx.drawImage(this.image,
        frameX * 64, frameY * 64,
        64, 64,
        x, y,
        64, 64
      )

      this.updateAnimationProgress();

    }
  }