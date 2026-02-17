# Dekker Lab Website source

This repository contains the source code for the Dekker Lab website.

## Project Structure

- `src/`: Contains all source files (content, templates, styles).
- `src/_data/`: **Global Data**. Files here (JSON, YAML, JS) are automatically loaded by 11ty and available as global variables.
- `src/utils/`: **Utility Scripts**. Helper functions and build scripts (e.g., `generate-publications.js`, `site.js`) that are *manually* required or executed. They are NOT automatically loaded as data.
- `.eleventy.js`: Main configuration file.

## Getting Started

These instructions will guide you on how to set up and run the website locally.

### Prerequisites

* **Node.js** (version 18 or later recommended): typically called `nodejs` in popular package managers. Ensure `npm` (Node Package Manager) is installed with Node.js.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:dekkerlab/labsite.git
    cd your-repository-name
    ```

    Replace `git@github.com:dekkerlab/labsite.git` with the URL of your Git repository.

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    This command installs all the necessary packages listed in the `package.json` file, including 11ty and any plugins (like `@11ty/eleventy-plugin-dates` and `js-yaml`). The fate of the `package.lock.json` is less clear to me (to be figured out)...

### Rendering and Serving the Website

* **Build the static site:**

    ```bash
    npx @11ty/eleventy
    ```

    This command will generate the static website files in the `_site` directory.

* **Serve the website locally (with live reloading):**

    ```bash
    npx @11ty/eleventy --serve
    ```

    This command will build the site and start a local development server, usually accessible at `http://localhost:8080`. Any changes you make to the source files will automatically trigger a rebuild and refresh in your browser. Except some of the JS-related changes require a full server restart to take effect !

    **To view on your local network:**
    Run:
    ```bash
    npm run serve
    ```
    (Do NOT use `--output=public`).
    The terminal output will now show a "Network" URL (e.g., `http://192.168.1.x:8080`) thanks to the updated configuration.

### Key Dependencies

* **Eleventy (@11ty/eleventy):** The static site generator used to build the website.
* **js-yaml:** Used for parsing YAML data files (e.g., `_data/members.yaml`).
* **@11ty/eleventy-plugin-dates** (optional): Provides date formatting filters in Nunjucks templates.

### Updating the Copyright Year

The copyright year in the website's footer is currently generated at build time using JavaScript in the Eleventy configuration. **To update the copyright year for a new year, you will need to:**

1.  **Open the `_data/site.js` file.**
2.  **Locate the `getCurrentYear()` function.**
3.  **Re-run the Eleventy build process** using either `npm run build` (or the direct Eleventy commands mentioned above) in the terminal after the year has changed.
4.  **Deploy the newly generated `_site` directory** to your web hosting provider.

**Note:** For automatic year updates without manual rebuilding, the website uses client-side JavaScript in the `_includes/layouts/base.njk` file. Ensure this script remains in place for the year to update dynamically in users' browsers.

### Updating Publications

To update the list of publications on the website:

1.  **Export from PubMed:**
    *   Go to PubMed and search for the new publications (e.g., `Job Dekker[Author]`).
    *   Select the publications you want to add or update.
    *   Click "Send to" -> "File".
    *   Format: **Summary (text)**.
    *   Create File.
    *   Save this file as `_data/pubmed-jobdekker-set.txt` in your project directory (replacing the old one).

2.  **Generate Data and Build:**
    *   Run the following command in your terminal:
        ```bash
        npm run build
        ```
    *   This command executes a script that parses the text file, generates a `_data/publications.json` file, and then builds the static site.

3.  **Verify:**
    *   Check `_site/publications/index.html` or run `npx @11ty/eleventy --serve` to see the changes locally.

## Disclaimer

gemini 2.0 was heavily involved in the website generation
