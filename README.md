![image](https://github.com/user-attachments/assets/7520e7d6-17ef-47b9-b470-ae266089fda6)

# kaya⚡onic

**App builder for Web & Mobile devices.**

kaya⚡onic is an AI-powered development environment that allows you to build, test, and iterate on web and mobile applications directly in your browser. Describe your project, and kaya⚡onic will help bring it to life.

## Features

*   **AI-Powered Development:** Leverage Large Language Models (LLMs) to generate code, components, and full applications based on your prompts.
*   **Multi-LLM Support:** Choose from various LLM providers (OpenAI, Anthropic, Google Gemini, Ollama, Mistral, etc.) for each prompt. Easily configure API keys via the UI.
*   **Web & Mobile Capabilities:** Build applications using a wide range of modern frameworks and technologies.
*   **Integrated Environment:** Includes a file explorer, code editor, terminal, and preview window within a single interface.
*   **Chat Interface:** Interact with the AI assistant through a conversational interface.
*   **Image Support:** Attach images to prompts for visual context.
*   **Code Management:** View code diffs, revert changes, and download your project as a ZIP archive.
*   **Deployment:** Deploy directly to Netlify or Vercel (configuration required).

## Build Capabilities

kaya⚡onic supports building applications with:

*   TypeScript
*   Expo (for React Native mobile apps)
*   Astro
*   Next.js
*   Vite (Vanilla, React, Vue, Svelte, etc.)
*   Qwik
*   Remix
*   Slidev (Presentations)
*   Svelte Kit
*   Vanilla.js
*   React.js
*   Vue.js
*   Angular

## Getting Started

### Prerequisites

*   **Node.js:** LTS version recommended. [Download Node.js](https://nodejs.org/en/download/)
*   **pnpm:** Used for package management. Install via npm:
    ```bash
    npm install -g pnpm
    ```

### Running Locally

1.  **Clone or Download:**
    *   Clone the repository: `git clone https://github.com/stackblitz-labs/bolt.diy.git` (Note: Repo URL might change if forked/renamed)
    *   OR Download the source code ZIP from the repository/release page.

2.  **Navigate to Project Directory:**
    ```bash
    cd kayasonic 
    ``` 
    (Or the directory name where you cloned/extracted the code)

3.  **Install Dependencies:**
    ```bash
    pnpm install
    ```

4.  **Run the Development Server:**
    ```bash
    pnpm run dev
    ```

5.  Open your browser to the local address provided (usually `http://localhost:5173`).

## Usage

1.  Select your preferred LLM provider and model from the dropdown in the chat input area.
2.  If required, click the edit icon next to the provider dropdown to enter your API key. (A default Google Gemini key is included for initial trial).
3.  Enter your prompt describing the application or feature you want to build.
4.  kaya⚡onic will generate the code, display file changes, and run necessary commands.
5.  Use the integrated editor, terminal, and preview to interact with and refine your project.

## Contributing

Contributions are welcome! Please refer to the `CONTRIBUTING.md` file for guidelines (if available).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

**Important Note on WebContainer API Licensing:**

kaya⚡onic uses StackBlitz WebContainers API. The source code for kaya⚡onic is distributed under the MIT License, but the underlying WebContainers API [requires a commercial license](https://webcontainers.io/enterprise) for production usage in a commercial, for-profit setting (prototypes or POCs do not require a license). Please ensure compliance with their Terms of Service if using this application commercially.
