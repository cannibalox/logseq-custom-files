// common =================================================================
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  const watchTarget = document.getElementById("app-container"); 
  // throttle MutationObserver 
  // from https://stackoverflow.com/a/52868150
    const throttle = (func, limit) => {
      let inThrottle;
      return (...args) => {
        if (!inThrottle) {
          func(...args);
          inThrottle = setTimeout(() => (inThrottle = false), limit);
        }
      };
    };
// ================================== END COMMON

// query table resizer ============================================== 
// source : https://htmldom.dev/resize-columns-of-a-table/   
  console.log("========= query table resizer v20220312 ============");

  const createResizableColumn = function (col, resizer) {
    // Track the current position of mouse
    let x = 0;
    let w = 0;

    const mouseDownHandler = function (e) {
      // Get the current mouse position
      x = e.clientX;

      // Calculate the current width of column
      const styles = window.getComputedStyle(col);
      w = parseInt(styles.width, 10);

      // Attach listeners for document's events
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
      // Determine how far the mouse has been moved
      const dx = e.clientX - x;
      // Update the width of column
      col.style.width = `${w + dx}px`;
    };

    // When user releases the mouse, remove the existing event listeners
    const mouseUpHandler = function () {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
    resizer.addEventListener("mousedown", mouseDownHandler);
  };

  const updateTables = function () {
    // Query the table
    const table = document.querySelectorAll(".table-auto:not(.table-resizable)");
    for (let i = 0; i < table.length; i++) {
      // Query all headers1
      const cols = table[i].querySelectorAll("thead tr > th.whitespace-nowrap");
      // Loop ver them
      Array.from(cols).forEach((col) => {
        // Create a resizer element
        const resizer = document.createElement("div");
        resizer.classList.add("query-table-resizer");
        table[i].classList.add("table-resizable");
        console.info("-- injected div.query-table-resizer --");
        // Add a resizer element to the column
        col.appendChild(resizer);
        createResizableColumn(col, resizer);
      });
    }
  };

  const updateTablesThrottled = throttle(updateTables, 1000);
  const obsTable = new MutationObserver(updateTablesThrottled);
  obsTable.observe(watchTarget, {
    subtree: true,
    childList: true,
  }); 
// ====================================================== query table resizer

// namespace prefixes collapser =============================================
  function hideNamespace() {
    console.info("====== LS HIDE NAMESPACE v20220314 =====");
    let nmsp = document.querySelectorAll(
      'a.page-ref[data-ref*="/"]:not(.hidden-namespace)'
    );
    for (var i = 0; i < nmsp.length; i++) {
      if (nmsp[i].innerText.indexOf("/") !== -1) {
        nmsp[i].innerHTML =
          "<span style='color:rgb(133, 211, 81)'>..</span>" +
          nmsp[i].innerText.substring(nmsp[i].innerText.lastIndexOf("/"));
        nmsp[i].classList.add("hidden-namespace"); 
        //console.info(" namespace off ==> " + nmsp[i].innerText);
      }
    }
  }

  const updateHideNamespace = throttle(hideNamespace, 1000);
  const obsNamespace = new MutationObserver(updateHideNamespace);
  obsNamespace.observe(watchTarget, {
    subtree: true,
    attributes: true,
  });
//===================================== end of namespace prefixes collapser 

// property data-refs =====================================
// injects [data-refs-self='property'] attributes to property divs 
// to be used in the next functions + custom.css

  console.log("========= property data-ref v20220715 ============");
  const addPropDataRef = function () {
    console.log("addPropDataRef running...");
    const propertiesBlocks = document.querySelectorAll(
      "#main-content-container .page.relative > .relative .block-properties:not(.datarefd)" //.page.relative > .relative => main container only
    );
    for (let i = 0; i < propertiesBlocks.length; i++) {
      const propertySpan = propertiesBlocks[i].children;
      Array.from(propertySpan).forEach((divProp) => {
        console.log("   divProp : ", divProp);
        let propName = divProp.firstChild.innerText;
        console.log("   property : ", propName);
        divProp.setAttribute("data-refs-self", propName);
        switch (propName) {
          case "cover-pic":
            document
              .querySelector(".page.relative > .relative .page-blocks-inner")
              .classList.add("has-coverPic");
            console.log("   .has-coverPic injected");
            break;
          case "cover-pic-height":
            console.log("   .has-coverPic injected");
            break; // TODO
        }
      });
      propertiesBlocks[i].classList.add("datarefd");
    }
  };

  const addPropDataRefThrottled = throttle(addPropDataRef, 1000);
  const obsProps = new MutationObserver(addPropDataRefThrottled);
  obsProps.observe(
    watchTarget,
    {
      subtree: true,
      childList: true,
    }
  );

// =====================================end of property data-refs

// add bg-pic =======================================
  console.log("========= bg-pic v20220327 ============");
  const addbgPic = function () {
    console.log("addbgPic running...");
    const bgPic = document.querySelectorAll(
      "[data-refs-self='bg-pic']"
    );
    console.log("has bgpic : ", bgPic.length);
    if (bgPic.length > 0) {
      const bgPica = Array.from(bgPic).filter(
        (item) => !item.closest(".references-blocks")
      );
      console.log("bg-pic exists : ", bgPica.length);
      console.log("bg-pic parent : ", bgPica);
      if (bgPica.length > 0) {
        const bgPicUrl = bgPica[0].getElementsByTagName("img")[0].src;
        console.log("bg-pic url : ", bgPicUrl);
        document.getElementById(
          "main-content-container"
        ).style.backgroundImage = "url(" + bgPicUrl + ")";
      }
    } else {
      document.getElementById("main-content-container").removeAttribute("style");
    };
  };
  const addbgPicThrottled = throttle(addbgPic, 1000);
  const addbg = new MutationObserver(addbgPicThrottled);
  addbg.observe(watchTarget, {
    subtree: true,
    childList: true,
  });
// =====================================end of bg-pic

// ============ BETTER-SIDEBAR rotate closed tabs in right sidebar=========
// ============ remove if you don't use the better-sidebar.css=============
  console.log("========= rsidebar fold 90° ============");
  const foldTab = function () {
    let foldedTab = document.querySelectorAll(
      ".sidebar-item.content > .flex.flex-col > .flex.flex-row"
    );
    if (foldedTab.length > 0) {
      let foldedTabsArray = Array.from(foldedTab);
      console.log("sidebar tabs : ", foldedTabsArray.length);
      for (let i = 0; i < foldedTabsArray.length; i++) {
        if (foldedTabsArray[i].nextElementSibling.classList.contains("hidden")) {
          // console.log("fold detected: ", foldedTabsArray[i].nextElementSibling, " is folded.");
          let tab = foldedTabsArray[i].closest(".sidebar-item.content");
          tab.classList.add("folded");
        } else {
          if (
            foldedTabsArray[i].nextElementSibling.classList.contains("initial") &&
            foldedTabsArray[i]
              .closest(".sidebar-item.content")
              .classList.contains("folded")
          ) {
            console.log("this one is unfolded !!!");
            let tab = foldedTabsArray[i].closest(".sidebar-item.content");
            tab.classList.remove("folded");
          }
        }
      }
    }
  };
  const foldTabthrottled = throttle(foldTab, 300);
  const foldTabs = new MutationObserver(foldTabthrottled);
  const sidebarTarget = document.querySelector(".sidebar-item-list");
  foldTabs.observe(watchTarget, {
    subtree: true,
    childList: true,
    attributes: true,
  });
// =================== end of rotate closed tabs in right sidebar =========

// ====== LS-TWITTER-EMBED =============================================
  console.info('====== LS-TWITTER-EMBED ======');
  // add twitter script and meta tags to head
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "https://platform.twitter.com/widgets.js";
  s.async = true;
  var m = document.createElement("meta");
  m.name = "twitter:widgets:theme";
  m.content = "dark";
  document.head.append(s, m);

  function embedTwitter() {
    let isTweet = document.querySelectorAll(
      "a.external-link[href^='https://twitter.com"
    );
    for (let i = 0; i < isTweet.length; i++) {
      if (isTweet[i].children[0] === undefined) {
        var requestUrl =
          "https://publish.twitter.com/oembed?omit_script=1&url=" +
          isTweet[i].href + "&limit=8&theme=dark&maxwidth=550&maxheight=600";
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(
              'requestUrl      : ', requestUrl,
              '\noReq.response : ', oReq.response,
              '\ndata          : ', data,
              '\ndata.html     : ', data.html
              );
              insertResponse(data, i);
            }
          }
        oReq.open("GET", requestUrl, true);
        oReq.send();
      }
    }

    function insertResponse(data, i) {
      var insTw = document.createElement("div");
      insTw.className = "twembed";
      insTw.innerHTML = data.html;
      isTweet[i].appendChild(insTw);
      console.log("embedding Tweets...");
      twttr.widgets.load();
    }
  };
  const embTwthrottled = throttle(embedTwitter, 1000);
  const embTw = new MutationObserver(embTwthrottled);
  const embTwTarget = document.getElementById('main-container');
  embTw.observe(embTwTarget, {
    subtree: true,
    childList: true,
  });
// =============================================== end of twitter embed =
