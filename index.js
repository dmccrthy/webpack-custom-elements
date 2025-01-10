/**
 * Build HTML custom elements from html files
 * @author Dan McCarthy
 */

const fs = require("fs").promises;
const path = require("path");

/**
 * This is the main loader used to add custom elements into the JS, contents
 * of the target file are provided by webpack prior to the compilation
 *
 * @param {string|Buffer} content Content of the resource file (Webpack Loader)
 * @returns {string|Buffer} Returns updated content to webpack compiler
 */
async function elementLoader(content) {
    const options = this.getOptions();
    const source = options.source;
    const callback = this.async();

    // Catch any erroes and return to callback
    try {
        // Get array of files in given source dir
        let files = await fs.readdir(path.resolve(source));

        // Append each files contents as a class in the target js file
        for (let i = 0; i < files.length; i++) {
            // Get name minus extension (ie: .html)
            let template = await fs.readFile(
                path.resolve(`${source}/${files[i]}`)
            );
            let name = files[i].split(".")[0];

            content += `\n\nclass ${name.replace("-", "")} extends HTMLElement {
                constructor() {
                    super();
                }

                connectedCallback() {
                    this.innerHTML = \`${template}\`;

                    this.replaceWith(this.children[0]);
                }
            }

            customElements.define("${name}", ${name.replace("-", "")});`;
        }

        // Return altered content through callback
        callback(null, content);
    } catch (err) {
        callback(err);
    }
}

module.exports = elementLoader;
