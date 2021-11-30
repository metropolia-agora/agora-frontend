# Agora (frontend)

> Agora *ag·o·ra*
>
> *plural* **agoras** *or* **agorae**
>
> The center of the athletic, artistic, business, social, spiritual and political life in the city.

## Prerequisites

- Backend service `agora-backend` can be installed from [here](https://github.com/metropolia-agora/agora-backend)
- Node (>= 16.0.0) and npm (>= 8.0.0) can be installed from [here](https://nodejs.org/en/)
- (optional) GitHub Desktop client can be installed from [here](https://desktop.github.com/)
- (optional) ESLint extension for [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) or [WebStorm](https://www.jetbrains.com/help/webstorm/eslint.html)

## Usage

**1.** Clone this repository using any git client
```bash
git clone https://github.com/metropolia-agora/agora-frontend.git
```

**2.** Install the dependencies using npm
```bash
npm install
```

**3.** Start the website hosting server
```bash
npm start
```

**4.** Access the website using any browser at
```bash
http://localhost:3000/
```

**Note:** a local instance of `agora-backend` must be running in order for the website to function as intended.

## CI/CD

A GitHub action has been set up to be triggered by a push - including a pull request merge - to the `main` branch of the repository, and re-deploy the express server to the host.
