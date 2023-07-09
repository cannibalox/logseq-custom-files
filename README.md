# logseq-custom-files
**custom.js** and **custom.css** utilities for Logseq.

## Current Version v20230709

### **Query table view resizer** :
Add handles on the query table headers to resize column width

![20220312_NUC8_M49yriOEAH](https://user-images.githubusercontent.com/4605693/158709862-5eb0917f-8b84-4c0b-be9e-bf84eda4e042.gif)


### **Namespace prefixes collapser** : 
Collapse namespace prefixes eg: [[prefix/page/test]] becomes [[../test]] (use the hover tootip to see the original name or enter edit mode)

![20220314_NUC8_cMu56YIkrd](https://user-images.githubusercontent.com/4605693/158709836-762e4274-6604-4df8-9d1f-3d0260c6545c.gif)


### **Twitter embeds** :
Fetches and embeds tweets and timelines without using logseq's internal syntax `{{tweet https://twitter.com/username/status/id}}`. Instead, you can just write the tweet url inline.

Benefits: 
- doesn't add extra markup to the source file 
- shows the timelines.

A demo with Logtool's kanban css to display latest tweets :

![Logseq_DASHBOARD_20220517_1586](https://user-images.githubusercontent.com/4605693/168820686-4af1e0b5-e638-4b00-ac23-0fce80427755.png)

### **Better sidebar** :
Enhance the right sidebar by replacing the vertical scroll with horizontal panes which are collapsible and resizable. Inspired by the sliding panes/matuschak mode with improved usability.

This works in conjunction with a custom.js snippet. If you don't want to use this sidebar mod, you need to REMOVE the better-sidebar javascript (edit the custom.js and comment out or remove the lines)

![ss_Logseq_All_pages_20230213_V5ihMcrohP](https://user-images.githubusercontent.com/4605693/218562643-542a8455-1845-43df-ab90-d89d87cdb5cd.gif)


## How-to use/install

### No exisiting custom.css/custom.js
If you are not using any custom.js[^1] or custom.css, copy the files into your `%graph-name%/logseq/` folder.

### Existing custom.css/custom.js
Alternatively, if you don't want to overwrite your current files or are only interested in some of the utilites : 
  1. Open the desired file with a text editor/code editor
  2. Copy-paste the relevant sections into your own custom.js/custom.css files. Some utilities require to copy sections from **both** custom.js **and** custom.css to work. Make sure to include the mutation observer declaration at the start of the custom.js)
  3. Use the search function to find the relevant snippets delimited by comments with descriptive names. For custom.css, it's possible to add `@import url("https://cdn.jsdelivr.net/gh/cannibalox/logseq-custom-files@latest/custom.css");` at the beginning of your file.

[^1]: - custom.js has been introduced in logseq on 2021-11-10, see details here https://github.com/logseq/logseq/pull/2943
    - The custom.js file is **not** created by the default installer; it has to be created manually in `/logseq`.
    - Before executing the code, the user will be asked for execution permission.
    - When the content of the custom.js file is modified, it needs to be restarted or refreshed to take effect.
    
## Help me improve the utilities

- I'm glad to accept Pull Requests if you know how to improve or optimize the utilities.
- If you find this useful, you can also buy me a coffee :) <br><br>
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/O5O1BN89Y)

More js snippets and css customizations are coming soon, stay tuned

## changelog

- **v20230709** : fix better-sidebar's arrow location for logseq 0.9.10
- **v20230214** : new: add better-sidebar, fix: props data-refs (`bg-pic::`)
- **v20220517** : new: add function to add properties to the data-refs attributes; new: add bg-pic attribute
- **v20220517** : new: add function for tweet embed
- **v20220331** : fix sorting : resizer handle was overlapping the table headers. moved style to custom.css
- **v20220329** : fix for advanced queries
