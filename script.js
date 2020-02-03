// printBookmarks('0');

// function printBookmarks(id) {
//  chrome.bookmarks.getChildren(id, function(children) {
//     children.forEach(function(bookmark) { 
//       console.log(bookmark.title);
//       printBookmarks(bookmark.id);
//     });
//  });
// }

function randomFish() {
    var dir = "./images/";
    var fish = [
        '15.png',
        '224.png',
        '264.png',
        '315.png',
        '360.png',
        '1098.png',
        '1126.png'
    ];
    var key = Math.floor(Math.random() * fish.length);
    var rand = fish[key];
    var url = dir + rand;
    console.log(url);
    document.getElementById('fish').src = url;
}

randomFish();

// generateBookmarkTree();

function generateBookmarkTree() {
    chrome.bookmarks.getTree(function(bookmarks) {
        bookmarks.forEach(function(bookmark) {
            marks.push(bookmark);
        })
    })
    console.log(marks);
}
  
// function printBookmarks(bookmarks) {
//   bookmarks.forEach(function(bookmark) {
//     console.log(bookmark.id + ' - ' + bookmark.title + ' - ' + bookmark.url);
//     if (bookmark.children)
//     printBookmarks(bookmark.children);
//   });
// }

// chrome.bookmarks.getTree(function(bookmarks) {
//   printBookmarks(bookmarks);
// });

document.addEventListener('click', function(e) {
    console.log(e.target);
    if(e.target.classList.contains('add_bookmark_to')) {
        newBookmark(e);
    }
    if(e.target.id == 'random') {
        openRandomBookmark();
    }
    if(e.target.id == 'new_bm_form_container') {
        e.target.style.display="none";
    }
    if(e.target.classList.contains('open_manager')) {
        // openManager();
    }
})

function openManager() {
    chrome.storage.local.get(['lfId'], function(result) {
        window.location.href=`chrome://bookmarks/?id=${result.lfId}`;
    });
}

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

    var openRandomBookmark = function(bookmarks) {
        var urls = [];
        chrome.bookmarks.getTree(function(bookmarks) {
            addUrls(bookmarks, urls);
            var key = Math.floor(Math.random() * urls.length);
            var rand = urls[key];
            window.location.href = rand;
        })
    }

    function addUrls(bookmarks, array) {
        bookmarks.forEach(function(bookmark) {
            if(bookmark.children) {
                addUrls(bookmark.children, array);
                // console.log(bookmark);
            } else {
                array.push(bookmark.url)
            }
        })
    }

    function appGetBookmarks() {
        chrome.storage.local.get(['lfId'], function(result) {
            console.log(result.lfId);
            appGetChildren(result.lfId);
        });
        function appGetChildren(element) {
            chrome.bookmarks.getChildren(element, function(children) {
                children.forEach(function(child) {
                    if (!child.url) {
                        var container = document.getElementById('container');
                        var el = document.createElement('ul');
                            el.className = "linkset";
                            el.dataset.lf_id = child.id;
                            // el.innerHTML = child.title;
                            el.setAttribute('aria-label', child.title);
                        container.appendChild(el);
                        appGetChildren(child.id);
                    } else {
                        var parentUl = document.querySelector(`[data-lf_id~="${child.parentId}"]`);
                        var el = document.createElement('li');
                            el.dataset.lf_id = child.id;

                        var a = document.createElement('a');
                            a.href = child.url;
                            a.innerHTML = child.title;
                        el.appendChild(a);
                        parentUl.appendChild(el);
                    };
                    // console.log(child);
                })
            });
        }
    }

    appGetBookmarks();
    
    // document.addEventListener('DOMContentLoaded', loadBookmarks());