var box = {
    locked: true,
    unlock: function () {
      this.locked = false;
    },
    lock: function () {
      this.locked = true;
    },
    _content: [],
    get content() {
      if (this.locked) {
        throw new Error("Locked!");
      }
      return this._content;
    }
};
  
function withBoxUnlocked(body) {
  var boxLocked = box.locked;
  
  try {
    box.unlock();
    body();
  } finally {
    // If an error occurs, lock the box if it was locked when this function
    //   was originally called.
    if (boxLocked) {
      box.lock();
    }
  }
}

function addGoldToBox() {
  box.content.push("gold piece");
}

//box.unlock();
//console.log("Initial box content with unlocking first", box.content);

withBoxUnlocked(addGoldToBox);
console.log("box.locked:", box.locked);

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log("box.locked:", box.locked);
box.unlock();
withBoxUnlocked(addGoldToBox);
console.log("box.locked:", box.locked);
console.log("box contents:", box.content);
