// function newBookmark(event) {
//     var node = event.target;
//     var folderNode = node.parentElement.parentElement;
//     var folderTitle = folderNode.dataset.title;
//     var folderIdString = folderNode.id
//     var folderId = folderIdString.substring(prefix.length);
//     var submit = document.getElementById('new_bm_submit');
//     submit.innerHTML = `Add to "${folderTitle}"`;
//     var container = document.getElementById('new_bm_form_container');
//     container.style.display="block";
//     var input = document.getElementById('new_bm_url');
//     var title = document.getElementById('new_bm_title');
//     input.focus();

//     function createNewBookmark() {
//         if(input.checkValidity() && title.checkValidity()) {
//             chrome.bookmarks.create({
//                 parentId: folderId,
//                 title: title.value,
//                 url: input.value
//             }, onBookmarkAdded)
//             console.log('success');
//             container.style.display="none";
//         } else {
//             console.log('failure')
//         }
//     }

//     submit.addEventListener('click', createNewBookmark);
// }

// function onBookmarkAdded(bookmarkItem) {
//   console.log("Bookmark added with ID: " + bookmarkItem.id, bookmarkItem);
// }

// if (!chrome.bookmarks)
// 	  location.reload();
	
// 	var logEvent = function(name, data) {
// 	  var log = document.getElementById("event-log");
// 	  log.innerHTML = name + "<br>" + log.innerHTML;
// 	  console.log("got event: " + name);
// 	}
	
// 	// chrome.bookmarks.onAdded.addListener(function(data) {
// 	//   logEvent("onBookmarkAdded", data);
// 	// });
	
// 	chrome.bookmarks.onRemoved.addListener(function(data) {
// 	  logEvent("onBookmarkRemoved", data);
// 	});
	
// 	chrome.bookmarks.onChanged.addListener(function(data) {
// 	  logEvent("onBookmarkChanged", data);
// 	});
	
// 	chrome.bookmarks.onMoved.addListener(function(data) {
// 	  logEvent("onBookmarkMoved", data);
// 	});
	
// 	chrome.bookmarks.onChildrenReordered.addListener(function(data) {
// 	  logEvent("onBookmarkChildrenReordered", data);
// 	});
	
// 	var prefix = "bookmark_";
	
// 	var toggleBookmark = function(event) {
//         if(!event.target.classList.contains('noP')) {
//             event.stopPropagation();
//             var node = event.currentTarget;
//             var id_str = node.id;
//             if (id_str < prefix.length)
//                 return;
//             var id = id_str.substring(prefix.length);
//             if (id == NaN)
//                 return;
//             console.log("toggle: " + id);
//             //console.dir(event);
//             //   if (node.childNodes.length > 1) {
//             //     var i = 0;
//             //     while (node.childNodes.length > i) {
//             //       var child = node.childNodes.item(i);
//             //       if (child.tagName == "UL")
//             //         node.removeChild(child);
//             //       else
//             //         i++;
//             //     }
//             //   } else {
//             //     chrome.bookmarks.getChildren(id, function(children) {
//             //       console.dir(children);
//             //       addBookmarks(children, node);
//             //     });
//             //   }

//             // hide divs instead of removing them, so closing a node retains open folders on reopen
//             if (node.classList.contains('open')) {
//                 node.classList.remove('open');
//                 node.childNodes.forEach(function(el) {
//                     if (el.tagName == "UL") {
//                         el.style.display = 'none';
//                     }
//                 })
//                 // console.log(node.childNodes);
//                 node.classList.add('closed');
//             } else {
//             chrome.bookmarks.getChildren(id, function(children) {
//                 console.dir(children);
//                 if (!node.classList.contains('children_loaded')) {
//                     addBookmarks(children, node);
//                 }
//                 node.classList.remove('closed');
//                 node.childNodes.forEach(function(el) {
//                     if (el.tagName == "UL") {
//                         el.style.display = 'block';
//                     }
//                 })
//                 node.classList.add('open');
//             });
//             }
//         } else {
//             console.log('p')
//         }
	  
//   };
	
// 	var addBookmark = function(bookmark, parent) {
// 	  console.log("addBookmark " + bookmark.id);
// 	  var child = document.createElement('li');
// 	  child.className = 'bookmark';
//       child.id = prefix + bookmark.id;
//       child.dataset.id = bookmark.id;
//       child.dataset.title = bookmark.title;
// 	  child.addEventListener('click', toggleBookmark, false);
// 	  if (bookmark.url && bookmark.url.length) {
// 	    var link = document.createElement('a');
// 	    link.href = bookmark.url;
//         link.innerHTML = bookmark.title;
//         link.className = 'bookmark_title';
//         child.appendChild(link);
        
//         var newTabIcon = document.createElement('div');
//         newTabIcon.innerHTML = '↗';
//         newTabIcon.className = 'hovericon noP';
//         newTabIcon.dataset.description = "New Tab";
//         link.append(newTabIcon);
// 	  } else {
//         var title = document.createElement('div');
// 	    title.innerHTML = bookmark.title;
// 	    title.className = 'bookmark_title';
//         child.appendChild(title);

//         var plus = document.createElement('div');
//         plus.innerHTML = '+';
//         plus.className = 'add_bookmark_to hovericon noP';
//         plus.dataset.description = "Add";
//         title.append(plus);
// 	  }
// 	  parent.appendChild(child);
// 	};
	
// 	var addBookmarks = function(bookmarks, parent) {
//         parent.classList.add('children_loaded');
//         // console.log("addBookmarks " + parent.id);
//         var list = document.createElement("ul");
//         parent.appendChild(list);
//         bookmarks.forEach(function(bookmark) { addBookmark(bookmark, list); });
//     };
    
// 	var loadBookmarks = function() {
// 	  var container = document.getElementById('container');
// 	  var rootElement = document.createElement("div");
// 	  var rootId = '0';
// 	  rootElement.id = prefix + rootId;
// 	  // root element is empty / invisible, just an id to be looked up
// 	  container.appendChild(rootElement);
// 	  chrome.bookmarks.getChildren(rootId, function(children) {
// 	    addBookmarks(children, rootElement);
// 	  });
//     };