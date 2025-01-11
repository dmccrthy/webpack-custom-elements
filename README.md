# Webpack Custom Elements

Dynamically add <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements"> custom elements</a> to you Javascript using webpack.

## 🗒️ License
This package is provided under the MIT license, for more information see LICENSE.

## 🏁 Getting Started

1. **Install Package**
    
    In your webpack project run the following command to install the package.

    ```shell
    npm install webpack-custom-elements
    ```

2. **Setup Webpack Config**

    In your webpack config you will want to add a new rule in as shown below

    ```js
    module: {
        rules: [
            {
                test: /\main.js$/,
                use: [
                    {
                        loader: "webpack-custom-elements",
                        options: {
                            source: "./src/components",
                            keepElements: false,
                        },
                    },
                ],
            },

            // ...other rules
        ],
    },
    ```

    - **test:** 
        - The name of your **target javascript file** (ie: the one being imported into your HTML)
    - **source:** 
        - The **RELATIVE Path** to your components folder
    - **keepElements (Optional):** 
        - Determines if custom elements are preserved in HTML
        - Set to **true** or **false** (defaults to **false**)

3. **Create Custom Elements**

    In your specified source folder add an .html file which will contain you element. **Component files MUST be named in all lowercase with dashes.** This is required for <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements">HTML custom elements</a>, you will get an error if you don't. 
    
    ```html
    <nav>
        <a>Home</a>
        <a>About</a>
        <a>Contact</a>
    </nav>
    ```
    
    Outside of that no special templating is needed; processing the HTML will be handled by the loader so its fine. To use your elements simply reference them by there name in your HTML. **Depending on the value of keepElements, the custom elements may be compiled out.**

    ```html
    <body>
        <nav-bar>

        // ...other elements
    </body>
    ```

##

This project is a work in-progress and is likely to change overtime. If you find any bugs, or have feature requests feel free to fill out an issue.

-Dan
