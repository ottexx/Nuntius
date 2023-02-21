const Nuntius = {};

Nuntius.messages = [];

Nuntius.messageNumber = 1;

Nuntius.show = function(text, type) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "nuntius-msg nuntius-" + type;
    msgDiv.id = "nuntius-" + Nuntius.messageNumber;
    msgDiv.style.top = Nuntius.getFreePosition() + "px";
    const textDiv = document.createTextNode(text);
    msgDiv.appendChild(textDiv);
    const b = document.getElementsByTagName("body")[0];
    b.appendChild(msgDiv);
    Nuntius.messages.push(Nuntius.messageNumber);
    let msgNumber = Nuntius.messageNumber;
    Nuntius.messageNumber++;
    setTimeout(function() {
        let opacity = 1.0;
        const fadeOutFunction = setInterval(function() {
            opacity -= 0.05;
            document.getElementById("nuntius-"+msgNumber).style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(fadeOutFunction);
                document.getElementById("nuntius-"+msgNumber).remove();
                Nuntius.messages.splice(Nuntius.messages.findIndex(n => n === msgNumber), 1);
                Nuntius.moveElementsUp();
            }
        }, 50);
    }, 4000);
}

Nuntius.showError = function(text) {
    Nuntius.show(text, "error");
}

Nuntius.showSuccess = function(text) {
    Nuntius.show(text, "success");
}

Nuntius.getFreePosition = function() {
    if (Nuntius.messages.length === 0) {return 30;}
    let rect = document.getElementById("nuntius-" + Nuntius.messages[Nuntius.messages.length - 1]).getBoundingClientRect();
    return rect.y + rect.height + 30;
}

Nuntius.pxToInt = function(val) {
    return parseInt(val.substring(0, val.length - 2));
}

Nuntius.moveTo = function (num, target) {
    let el = document.getElementById("nuntius-" + num);
    let moveFunc = setInterval(function() {
        let pos = Nuntius.pxToInt(el.style.top);
        if (pos - 5 <= target) {
            el.style.top = target + "px";
            clearInterval(moveFunc);
            return;
        }
        el.style.top = (pos - 5) + "px";
    }, 1);
}

Nuntius.moveElementsUp = function() {
    let newPositions = [];
    newPositions.push(30);
    for(let i = 0; i < Nuntius.messages.length - 1; i++) {
        let msgEl = document.getElementById("nuntius-" + Nuntius.messages[i]);
        newPositions.push(msgEl.getBoundingClientRect().y);

    }
    for(let i in Nuntius.messages) {
        Nuntius.moveTo(Nuntius.messages[i], newPositions[i]);
    }
}
