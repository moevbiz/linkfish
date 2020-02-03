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
        openManager();
    }
})

// open bookmark manager at app folder location
function openManager() {
    chrome.storage.local.get(['lfId'], function(result) {
        chrome.tabs.update(null, {url:`chrome://bookmarks?id=${result.lfId}`});
    });
}

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