class GameObject {
    constructor(config) {
      this.id = null;
      this.isMounted = false;
      this.x = config.x || 0;
      this.y = config.y || 0;
      this.direction = config.direction || "down";
      this.sprite = new Sprite({
        gameObject: this,
        src: config.src || "images/goose_spritesheet.png",
      });

      this.behaviorLoop = config.behaviorLoop || [];
      this.behaviorLoopIndex = 0;

      this.dialogue = config.dialogue || [];

    }

    mount(map) {
      console.log("mounting!");
      this.isMounted = true;
      map.addWall(this.x, this.y);

      setTimeout(() =>{
        this.doBehaviorEvent(map);

      }, 10)

    }


    update(){

    }

    async doBehaviorEvent(map){

       if(map.isCutScenePlaying || this.behaviorLoop.length ===0){
        return;
       }

      //setting up our event with relevant info

      let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
      eventConfig.who = this.id;

      //Create an event instance out of our next event config

      const eventHandler = new OverWorldEvent({map, event: eventConfig});
      await eventHandler.init();
      
      //Setting the next event to fire

      this.behaviorLoopIndex += 1;
      if (this.behaviorLoopIndex === this.behaviorLoop.length) {
        this.behaviorLoopIndex = 0;
      }

      // Do it again
      this.doBehaviorEvent(map);


    }
    
  }