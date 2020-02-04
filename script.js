// generateBookmarkTree();


// // import Bookmarks from JSON
// function importBookmarks(url) {
//     chrome.storage.local.get(['lfId'], function(result) {
//       localStorage.setItem('LFID', result.lfId);
//     }),
    
//     fetch(url)
//         .then(
//             function(response) {
//             if (response.status !== 200) {
//                 console.log('Error Status Code: ' +
//                 response.status);
//                 return;
//             }

//             response.json().then(function(data) {
//                 console.log(data);
//                 for (var el in data) {
//                     chrome.bookmarks.create({
//                         parentId: localStorage.getItem('LFID'),
//                         title: el,
//                         url: null,
//                     }, onFolderCreated)
//                     function onFolderCreated(folder) {
//                         console.log(data[folder.title]);
//                         data[folder.title].forEach(function(bookmark) {
//                             chrome.bookmarks.create({
//                                 parentId: folder.id,
//                                 title: bookmark.name,
//                                 url: bookmark.url
//                             })
//                         })
//                     }
//                 }
//             });
//             }
//         )
//         .catch(function(err) {
//             console.log('Fetch Error', err);
//         });
// }

document.addEventListener('click', function(e) {
    console.log(e.target);
    if(e.target.classList.contains('add_bookmark_to')) {
        newBookmark(e);
    }
    if(e.target.classList.contains('open_random')) {
        openRandomBookmark();
    }
    if(e.target.id == 'new_bm_form_container') {
        e.target.style.display="none";
    }
    if(e.target.classList.contains('open_manager')) {
        openManager();
    }
    if(e.target.classList.contains('import_JSON')) {
        importBookmarks('import.json');
    }
})

// open bookmark manager at app folder location
function openManager() {
    chrome.storage.local.get(['lfId'], function(result) {
        chrome.tabs.update(null, {url:`chrome://bookmarks?id=${result.lfId}`});
    });
}

// open a random bookmark
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

    // app view
    function appGetBookmarks() {
        chrome.storage.local.get(['lfId'], function(result) {
            console.log(result.lfId);
            let lfId = result.lfId;
            appGetChildren(lfId);
        });
        function appGetChildren(element) {
            chrome.bookmarks.getChildren(element, function(children) {
                if (children.length == 0) {
                    var container = document.getElementById('container');
                    var el = document.createElement('p');
                        el.innerHTML = 'Nothing here yet.'
                    container.appendChild(el);
                };
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