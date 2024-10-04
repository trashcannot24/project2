class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
      const step = () => {
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

         const cameraPerson = this.map.gameObjects.hero;

         Object.values(this.map.gameObjects).forEach(object => {
          object.update({
            arrow: this.directionInput.direction,
            map: this.map,
           })
         })

         this.map.drawImage(this.ctx, cameraPerson);

         Object.values(this.map.gameObjects).sort((a,b) => {
         return a.y - b.y;
        }).forEach(object => {
          object.sprite.draw(this.ctx, cameraPerson);
        })
    
         requestAnimationFrame (() => {
          step();
         })
       }
       step();
  } 

  bindActionInput(){
    new KeyPressListener("Enter", () =>{
      this.map.checkForActionCutscene()
    })
  }
 

  init() {

      this.map = new WorldMap(window.MyMap.BedRoom);
      this.map.mountObjects();

      this.bindActionInput();

      this.directionInput = new DirectionInput;
      this.directionInput.init();
    
      this.startGameLoop();

      this.map.startCutScene([
          { who: "hero", type: "stand", direction: "down"},
          {type: "textMessage", text: "Monsieur, I come to you with this message after a full year's absence. First, I must apologize for my sudden disappearance. When we last spoke, my daft sister was by my side, and we were celebrating your birthday."},
          {type: "textMessage", text: "Shortly after conveying our good wishes, I embarked on my usual travels to meet members of our goose clan in different parts of the world. However, I soon found myself in a challenging situation."},
          {type: "textMessage", text: "You see, the purpose of our existence as geese is to spread joy and happiness, especially in those places where sunlight struggles to reach. But sometimes, even within our clan, hearts can become poisoned, and this negativity can quickly turn into an epidemic." },
          {type: "textMessage", text: "That's why every few years, I make a point to visit as many of our brothers, sisters, elders, and young ones as possible, reminding them to stay vigilant against such poison affecting their hearts. It's an incredibly daunting task, and I am just a goose, so sometimes I might miss the signs."},
          {type: "textMessage", text: "During my travels, I encountered a troubling situation in a remote goose community. Several members had become bitter and disillusioned, spreading negativity among their fellows. I realized this was the very poison I had been warning against."},
          {type: "textMessage", text: "Determined to help, I spent months there, listening to their grievances and working to rekindle their sense of purpose. It was challenging, but slowly, I saw glimmers of hope return to their eyes." },
          {type: "textMessage", text: "Personally overwhelmed by these events, I needed some time to myself. So I journeyed to France to visit local art exhibitions, an activity I've always enjoyed and one that my sister shares a fondness for."},
          {type: "textMessage", text: "Impressionism, as you may know, is one of her favorite genres - an art movement born in France in the mid-1800s. A small group of artists came together, determined to do something different and revolutionary."},
          {type: "textMessage", text: "Like many rebels in history who tried to break free from the norm, they were initially ridiculed, but they remained steadfast in their desire to change how people thought about art. Their victory truly reflects in the relics they've left behind." },
          {type: "textMessage", text: "In these exhibitions, I've noticed how pleasant it is to skim through the neatly arranged rows of paintings attempting to imitate the vigor of their impressionist ancestors. Yet, only once in a blue moon do you find a painting that truly startles your senses."},
          {type: "textMessage", text: "Often, it's the subtle details that make you stare at a painting for hours. Perhaps it's simply the sentiment behind the concept, or a particular shade of blue somewhere in the background that fits so perfectly with a gamboge dot in the foreground. "},
          {type: "textMessage", text: "You start thinking about the thought process behind creating something unique, and that is when you truly understand the motivation behind all these historical revolutions." },
          {type: "textMessage", text: "As I pondered this at a recent exhibition, I was reminded of how my sister once likened you to one of these once-in-a-blue-moon paintings at a quaint little exhibition."},
          {type: "textMessage", text: "I find myself inclined to agree with her. Monsieur, it's usually enough to tell someone 'you are special', but I believe what my sister said about the painting and you goes beyond mere flattery."},
          {type: "textMessage", text: "I realize now that my year-long journey - from tending to troubled goose communities to contemplating art in French galleries - has brought me full circle. It has reminded me of the importance of connection, of appreciation for the extraordinary in the everyday, and of the power each of us holds to make a difference." },
          {type: "textMessage", text: "So I return to you, Monsieur, with a renewed sense of purpose and gratitude. On this birthday of yours, I would like to thank you for being that once-in-a-blue-moon painting in the gallery of life."},
          {type: "textMessage", text: "I also felt very inspired by the art exhibitions I visited and tried to come up with my own masterpiece for you. I would like you to open it." },
      ])
      .then(() => {
          this.bindGiftboxAction();
      });
  }

  bindGiftboxAction() {
    document.addEventListener("click", () => {
        this.map.checkForGiftboxAction();
    });
}

}