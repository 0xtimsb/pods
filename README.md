<img src="assets/zenmode-logo.png" alt="ZenMode Logo" width="180px" />
<h3>A Project Management and Communication Tool for Teams.</h3>

## 🧐 Features

### Team Management and Communication
- **Create pods and invite users as members and admins.**
- **Websocket based messaging using graphql subscription.**
- **Less data usage with cursor-pagination while fetching saved messages.**
- **Cache modification for faster UI updates without reload using apollo client.**

### Project Management
- **Drag-n-drop project board in sync with postgresql database.**
- **Lexo-ranking algorithm to store order of drag-n-drop in a board.**
- **Assign tasks to members on project board.**
- **Add multiple stories and tasks to the project board.**

### Authetication and Security
- **Secure authetication with diffrent access levels for diffrent APIs (Public, Authenticated, Member and Admin).**
- **Cookie-session based authetication using redis.**

## 👨🏻‍🚀 Tech Stack

- **Client** - **React, Apollo Client, Primer Components, React-Beautiful-DND, React-Hook-Form**
- **Server** - **Node, Apollo Server Express, TypeORM, Type GraphQL, GraphQL Subscriptions, Argon, Connect-Redis**
- **Database** - **PostgreSQL, Redis**

## 📸 Screenshots
<img src="assets/preview-1.png" alt="Preview" width="75%" align="center" />

## Getting Started

Follow the steps below, after cloning the project:

### ⏳ Installation

- (Use **yarn** to install (recommended). [Install yarn with these docs](https://yarnpkg.com/lang/en/docs/install/).)

```bash
yarn install
```

This command installs all the dependencies needed for project to run locally.

Enjoy 🎉

### 🖐 Requirements

**Installing:**

- Node
- Yarn

**Databases:**

- PostgreSQL
- Redis

**Note - Make .env and specify all the information about your local database, redis and other.**

## Contributing

Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting a Pull Request to the project.
