

class RevealingText {
    constructor(config) {
        this.element = config.element;
        this.text = config.text;
        this.timeout = null;
        this.isDone = false;
    }

    revealOneCharacter(list) {
        const next = list.splice(0, 1)[0];
        if (next) {
            next.span.classList.add("revealed");

            if (list.length > 0) {
                this.timeout = setTimeout(() => {
                    this.revealOneCharacter(list);
                }, next.delayAfter);
            } else {
                this.isDone = true;
            }
        }
    }

    warpToDone() {
        if (this.isDone) return;
        clearTimeout(this.timeout);
        this.isDone = true;
        this.element.querySelectorAll("span").forEach(s => {
            s.classList.add("revealed");
        });
    }

    createCharacterSpans(text) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = text;
        const nodes = [];
        function traverseNodes(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent.split("").forEach(char => {
                    const span = document.createElement("span");
                    span.textContent = char;
                    nodes.push({
                        span,
                        delayAfter: char === " " ? 0 : 35
                    });
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const span = document.createElement("span");
                span.innerHTML = node.outerHTML;
                nodes.push({
                    span,
                    delayAfter: 35
                });
            }
        }
        Array.from(wrapper.childNodes).forEach(traverseNodes);
        return nodes;
    }

    init() {
        const characters = this.createCharacterSpans(this.text);

        characters.forEach(({ span }) => {
            this.element.appendChild(span);
        });

        this.revealOneCharacter(characters);
    }
}
