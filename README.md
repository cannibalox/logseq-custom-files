# logseq-custom-files
**custom.js** and **custom.css** utilities for Logseq.

## current version v20230213

* **query table view resizer** : add handles on the query table headers to resize column width
![20220312_NUC8_M49yriOEAH](https://user-images.githubusercontent.com/4605693/158709862-5eb0917f-8b84-4c0b-be9e-bf84eda4e042.gif)

* **namespace prefixes collapser** : collapse namespace prefixes eg: [[prefix/page/test]] becomes [[../test]] (use the hover tootip to see the original name or enter edit mode)
![20220314_NUC8_cMu56YIkrd](https://user-images.githubusercontent.com/4605693/158709836-762e4274-6604-4df8-9d1f-3d0260c6545c.gif)

* **twitter embeds** : fetches and embeds tweets and timelines without using logseq's internal syntax `{{tweet https://twitter.com/username/status/id}}`, instead just write the tweet url inline (benefits: it doesn't add extra markup to the source file and it shows timelines). a demo with Logtool's kanban css to display latest tweets :
![Logseq_DASHBOARD_20220517_1586](https://user-images.githubusercontent.com/4605693/168820686-4af1e0b5-e638-4b00-ac23-0fce80427755.png)

* **better sidebar.css** : a custom.css to enhance the right sidebar : replaces the vertical scroll by horizontal panes (collapsible and resizable). inspired by the sliding panes/matuschak mode with imporved useability.<br> 
INSTALL : edit your `custom.css` file to add `@import url("https://cdn.jsdelivr.net/gh/cannibalox/logseq-custom-files@master/better-sidebar.css");` or manually copy/paste the rules.
![ss_Logseq_All_pages_20230213_V5ihMcrohP](https://user-images.githubusercontent.com/4605693/218562643-542a8455-1845-43df-ab90-d89d87cdb5cd.gif)


## How-to use/install

- if you are not using any custom.js[^1] or custom.css, copy the files into your `%graph-name%/logseq/` folder.
- alternatively, if you don't want to overwrite your current files or are only interested in some of the utilites, open the each file with a text editor/code editor then copy-paste the relevant sections into your own custom.js/custom.css files (some utilities require to copy sections from **both** custom.js **and** custom.css to work, also make sure to include the mutation observer declaration at the start of the custom.js), use the search function to find the relevant snippets delimited by comments with descriptive names.

[^1]: - custom.js has been introduced in logseq on 2021-11-10, see details here https://github.com/logseq/logseq/pull/2943
    - the custom.js file is **not** created by the default installer, it has to be created manually in /logseq
    - Before executing the code, the user will be asked for execution permission.
    - When the content of the custom.js file is modified, it needs to be restarted or refreshed to take effect.
    
## help me improve the utilities

- I'm glad to accept Pull Requests if you know how to improve or optimize the utilities
- if you find this useful, you can also buy me a coffee :) <br><br>
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/O5O1BN89Y)

more js snippets and css customizations are coming soon, stay tuned

## changelog

- **v20220517** : new: add function to add properties to the data-refs attributes; new: add bg-pic attribute
- **v20220517** : new: add function for tweet embed
- **v20220331** : fix sorting : resizer handle was overlapping the table headers. moved style to custom.css
- **v20220329** : fix for advanced queries
