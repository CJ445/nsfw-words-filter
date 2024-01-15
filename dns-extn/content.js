console.log("Content script is running...");
const nsfwWords = ["bitch", "word2", "word3"];

function filterNSFW() {
  console.log("Filtering NSFW words...");
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  let node;
  while ((node = walker.nextNode())) {
    let modified = false;

    nsfwWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      if (node.nodeValue.match(regex)) {
        node.nodeValue = node.nodeValue.replace(regex, "***");
        modified = true;
      }
    });

    if (modified) {
      const newNode = document.createTextNode(node.nodeValue);
      node.replaceWith(newNode);
    }
  }
}

filterNSFW();

const observer = new MutationObserver((mutations) => {
  console.log("DOM mutation observed:", mutations);
  filterNSFW();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
// content.js
