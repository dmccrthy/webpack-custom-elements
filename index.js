/**
 * Build HTML custom elements from html files
 * @author Dan McCarthy
 */

const fs = require("fs").promises;
const path = require("path");

/**
 *  Creates a class definition for a given HTML component
 *
 * @param {string} name Name used when
 * @param {string} component
 * @param {Boolean} keepElements
 * @returns {string} The class definition for a given HTML component
 */
function buildClass(name, component) {
    // keepElements determines if the custom element remains in the HTML
    return `\n\nclass ${name.replace("-", "")} extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = \`${component}\`
        }
    }

    customElements.define("${name}", ${name.replace("-", "")});`;
}

/**
 * Get an array of HTML files in project.
 * Used to overwrite custom-elemetns from project.
 *
 * @returns {Array}
 */
function getHtmlFiles() {
    let file = [];
}

/**
 * This is the main loader used to add custom elements into the JS, contents
 * of the target file are provided by webpack prior to the compilation
 *
 * @param {string|Buffer} content Content of the resource file (Webpack Loader)
 * @returns {string|Buffer} Returns updated content to webpack compiler
 */
async function elementLoader(content) {
    // Get options from webpack
    const options = this.getOptions();
    const source = options.source;
    const keepElements = options.keepElements || false;
    const callback = this.async();

    // Catch any errors and return to callback
    try {
        // Get array of files in given source dir
        let files = await fs.readdir(path.resolve(source));

        // Append each files contents as a class in the target js file
        for (let i = 0; i < files.length; i++) {
            let name = files[i].split(".")[0];
            let component = await fs.readFile(
                path.resolve(`${source}/${files[i]}`)
            );

            // Check if keepElements flag is set
            if (keepElements) {
                content += buildClass(name, component);
            } else {
                // Read files from dir and scan for elements
                let files = getHtmlFiles();

                // Replace instance of component in each file
                for (file in files) {
                    console.log(file);
                }
            }
        }

        // Return altered content through callback
        callback(null, content);
    } catch (err) {
        callback(err);
    }
}

module.exports = elementLoader;
