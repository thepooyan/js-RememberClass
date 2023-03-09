class Remember {
      constructor(commonAttribute) {
            this.commonAttribute = commonAttribute;
      }

      remember(elementIdentifier) {
            let storage = localStorage.getItem(this.commonAttribute);

            if (!storage) {
                  localStorage.setItem(this.commonAttribute, JSON.stringify([elementIdentifier]));
                  return;
            }
            storage = JSON.parse(storage);
            if (storage.includes(elementIdentifier)) return
            storage.push(elementIdentifier);
            localStorage.setItem(this.commonAttribute, JSON.stringify(storage))
      }

      forget(elementIdentifier) {
            let storage = localStorage.getItem(this.commonAttribute);
            storage = JSON.parse(storage);
            storage = storage.filter(i => i !== elementIdentifier);
            localStorage.setItem(this.commonAttribute, JSON.stringify(storage))
      }

      check(elementIdentifier) {
            let storage = localStorage.getItem(this.commonAttribute);
            storage = JSON.parse(storage);
            return (storage?.includes(elementIdentifier))
      }

      recall() {
            let storage = localStorage.getItem(this.commonAttribute);
            storage = JSON.parse(storage);
            return storage
      }

      forgetAll() {
            localStorage.removeItem(this.commonAttribute)
      }
}

let isClicked = new Remember("isClicked");

document.querySelectorAll('button').forEach(item => {
      if (isClicked.check(item.id)) {
            item.classList.add('clicked')
      } else {

            item.onclick = _ => {
                  item.classList.add('clicked')
                  isClicked.remember(item.id);
            }
      }
});

document.querySelector('a').onclick = _ => {
      isClicked.forgetAll();
      window.location.reload();
} 