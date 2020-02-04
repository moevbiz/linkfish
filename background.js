let appName = 'Linkfish';

function init() {
  let hasFolder = false;
  let folderId = '';

  chrome.bookmarks.getTree(function(itemTree){
    itemTree.forEach(function(item){
      processNode(item);
      if(hasFolder) return;
    });
    
    // add app folder if it doesn't exist
    if(!hasFolder){
      console.log(itemTree);
      createLfFolder();
    }
  });

  function processNode(node) {
    // recursively process child nodes
    if (node.children) {
      node.children.forEach(function(child) { 
        processNode(child);
        if(hasFolder) return;
      });
    }

    // if app folder already exists, use it :~) 
    if (node.title == appName) { 
      hasFolder = true;
      folderId = node.id;
      console.log(appName + ' folder already exists: ID is ' + folderId);
      chrome.storage.local.set({lfId: folderId}, function() {
        console.log(appName + ' folder ID is set to ' + folderId);
      });
      return;
    }
  }
}

function createLfFolder() {
  chrome.bookmarks.create({
    title: appName,
    url: null
  }, onBookmarkAdded)
}

chrome.runtime.onInstalled.addListener(function() {
  init();
  console.log('Extension installed');
});

function onBookmarkAdded(bookmarkItem) {
  console.log("Bookmark addded added with ID: " + bookmarkItem.id, bookmarkItem.title);
  chrome.storage.local.set({lfId: bookmarkItem.id}, function() {
    console.log(appName + ' folder ID is set to ' + bookmarkItem.id);
  });
}