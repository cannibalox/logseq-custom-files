# logseq-custom-files
**custom.js** and **custom.css** utilities for Logseq.

## curent verion v20220314

* **query table view** : add handles on the query table headers to resize column width (not persistent)
![20220312_NUC8_M49yriOEAH](https://user-images.githubusercontent.com/4605693/158709862-5eb0917f-8b84-4c0b-be9e-bf84eda4e042.gif)

* **namespace prefixes collapser** : collapse namespace prefixes eg: [[prefix/page/test]] becomes [[../test]] (use the hover tootip to see the original name or enter edit mode)
![20220314_NUC8_cMu56YIkrd](https://user-images.githubusercontent.com/4605693/158709836-762e4274-6604-4df8-9d1f-3d0260c6545c.gif)

## How-to use/install

- if you are not using any custom.js or custom.css, copy the files into your `%graph-name%/logseq/` folder.
- alternatively, if you don't want to overwrite your current files or are only interested in some of the utilites, open the each file with a text editor/code editor then copy-paste the relevant sections into your own files (some utilities require to copy sections from both custom.js **and** custom.css to work, also make sure to include the mutation observer declaration at the start of the custom;js), the utilities are separated by comments sections with descriptive names, use the search function to find what you need.
