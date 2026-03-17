# n8n-nodes-evolution-api

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

This is an advanced, custom [n8n](https://n8n.io/) node specifically designed to connect with **Evolution API** for building robust WhatsApp automations. 

Unlike basic messaging nodes, `n8n-nodes-evolution-api` is built with a **declarative, future-proof mindset**. It offers both high-level actions (like sending texts) and an authenticated *Custom API Request* engine, allowing you to consume any Evolution API endpoint without waiting for the node to be manually updated in the repository.

[n8n](https://n8n.io/) is a fair-code licensed workflow automation tool.
[Evolution API](https://doc.evolution-api.com/) is a powerful open-source WhatsApp API.

---

## 🚀 Features

* **Secure Credentials Management**: It connects directly to n8n's encrypted vault (`evolutionApiApi` credentials class), injecting the `apikey` header at the moment of execution mapping so secrets are never hardcoded or exposed in logs.
* **Declarative Request Routing**: Built following n8n's modern declarative API standards reducing boilerplate imperatively scaling easily over time.
* **Universal "Custom API Request"**: As Evolution API expands, you don't need to rebuild the node. The Custom API property allows you to select dynamically any `method` (GET, POST, PUT, DELETE) and map a raw customized JSON body directly to the chosen endpoint path. Perfect for Instance creation, fetching chats, group metadata, or interacting with new endpoints seamlessly.
* **Native Message Operations**: Built-in operations for quickly sending text messages without dealing with JSON bodies.

## 🛠 Installation

Currently, this node can be installed directly from this repository or by cloning it into your custom n8n builds.

### Installing in n8n (Docker / Local)

If you are running n8n via npm or Docker, you can install it from your command line:

```bash
npm install -g n8n-nodes-evolution-api
```
*(Note: Replace with standard GitHub install methods or npm package name once published).*

For a local development environment, clone the repository, build the TypeScript files, and use `npm link`:

```bash
git clone https://github.com/Ale/n8n-nodes-evolution-api.git
cd n8n-nodes-evolution-api
npm install
npm run build
```

## 🔐 Credentials Setup

1. Open your n8n workflow canvas.
2. Search for the **Evolution API** node and add it to your canvas.
3. In the Node settings, create a new credential for **Evolution API**.
4. You will need:
    * **Base URL**: The root URL of your Evolution API deployment (e.g., `https://api.my-evolution.com`, without trailing slashes or subpaths).
    * **Global API Key**: The master password configured on your Evolution API instance's `.env` file.

## 🕹 Usage Actions

Here is a breakdown of the available modules and their operations:

### 1. Resource: Message
* **Send Text**: Send basic text messages to any number. Simply provide the `Instance Name` from Evolution API where the message will originate, the target `Phone Number` (with country code, no plus sign), and your desired `Text`.

### 2. Resource: Custom API Request
* **Execute**: Build your own HTTP payload natively within n8n. 
    1. Select your target **Method** (e.g., `POST`).
    2. Define the **URL / Path** appending to your root (e.g., `/instance/create`).
    3. Construct your **Body JSON** graphically using n8n expressions or raw JSON input.

## 🏗 Development

If you want to contribute or modify this node, here are the available commands:

* `npm run build`: Compiles the TypeScript code into JavaScript in the `dist` directory.
* `npm run lint`: Formats and checks the code against n8n's stringent ESLint configuration.
* `npm run dev`: Starts an internal n8n playground to test your uncompiled code changes instantly.

## 📜 License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md) 
*(Built upon the n8n community node starter template).*
