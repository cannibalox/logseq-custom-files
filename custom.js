// common =================================================================
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

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
  const watchTarget = document.getElementById("app-container"); 
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
