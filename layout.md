```
├─.git
├─.gitignore
├─README.md
├─assets
│ ├─preview-1.png
│ └─schema.png
├─bin
│ └─heroku-postbuild.sh
├─layout.md
├─node_modules
├─package.json
├─server
│ ├─.env
│ ├─.env.example
│ ├─Procfile
│ ├─dist
│ ├─node_modules
│ ├─package.json
│ ├─src
│ │ ├─constants.ts
│ │ ├─entities
│ │ │ ├─invite.ts
│ │ │ ├─message.ts
│ │ │ ├─pod.ts
│ │ │ ├─story.ts
│ │ │ ├─task.ts
│ │ │ ├─user-pod.ts
│ │ │ └─user.ts
│ │ ├─index.ts
│ │ ├─inputs
│ │ │ ├─pod-input.ts
│ │ │ ├─story-input.ts
│ │ │ ├─task-input.ts
│ │ │ └─user-input.ts
│ │ ├─middleware
│ │ │ └─auth-middleware.ts
│ │ ├─objects
│ │ │ ├─field-error.ts
│ │ │ ├─pod-response.ts
│ │ │ ├─story-response.ts
│ │ │ ├─task-response.ts
│ │ │ └─user-response.ts
│ │ ├─resolvers
│ │ │ ├─message-resolver.ts
│ │ │ ├─pod-resolver.ts
│ │ │ ├─story-resolver.ts
│ │ │ ├─task-resolver.ts
│ │ │ └─user-resolver.ts
│ │ ├─types
│ │ │ ├─context.d.ts
│ │ │ └─env.d.ts
│ │ └─utils
│ │   ├─mid-string.ts
│ │   ├─send-email.ts
│ │   └─validate-user-input.ts
│ └─tsconfig.json
├─web
│ ├─.env.example
│ ├─.gitignore
│ ├─Procfile
│ ├─codegen.yml
│ ├─node_modules
│ ├─package.json
│ ├─public
│ │ ├─favicon.ico
│ │ ├─index.html
│ │ ├─logo192.png
│ │ ├─logo512.png
│ │ ├─manifest.json
│ │ └─robots.txt
│ ├─server.js
│ ├─src
│ │ ├─components
│ │ │ ├─App.tsx
│ │ │ ├─Container.tsx
│ │ │ ├─Layout.tsx
│ │ │ ├─Loading.tsx
│ │ │ ├─MessageBox.tsx
│ │ │ ├─MessageInputBox.tsx
│ │ │ ├─MessagePanel.tsx
│ │ │ ├─Navbar.tsx
│ │ │ ├─PodPage.tsx
│ │ │ ├─UnderlineNavbar.tsx
│ │ │ ├─common
│ │ │ │ ├─Button.tsx
│ │ │ │ └─Input.tsx
│ │ │ ├─home
│ │ │ │ ├─Invites.tsx
│ │ │ │ └─Pods.tsx
│ │ │ ├─layout
│ │ │ │ ├─AppLayout.tsx
│ │ │ │ └─AuthLayout.tsx
│ │ │ └─project
│ │ │   ├─Board.tsx
│ │ │   ├─Card.tsx
│ │ │   └─Column.tsx
│ │ ├─constants
│ │ │ ├─constant.ts
│ │ │ ├─navItems.ts
│ │ │ └─routes.ts
│ │ ├─generated
│ │ │ └─graphql.tsx
│ │ ├─graphql
│ │ │ ├─mutations
│ │ │ │ ├─message
│ │ │ │ │ └─create-message.graphql
│ │ │ │ ├─pod
│ │ │ │ │ ├─cancel-invite.graphql
│ │ │ │ │ ├─create-pod.graphql
│ │ │ │ │ ├─delete-pod.graphql
│ │ │ │ │ ├─invite-to-pod.graphql
│ │ │ │ │ ├─join-pod.graphql
│ │ │ │ │ ├─leave-pod.graphql
│ │ │ │ │ ├─remove-from-pod.graphql
│ │ │ │ │ └─uninvite-to-pod.graphql
│ │ │ │ ├─story
│ │ │ │ │ ├─create-story.graphql
│ │ │ │ │ ├─delete-story.graphql
│ │ │ │ │ └─move-story.graphql
│ │ │ │ ├─task
│ │ │ │ │ ├─assign-user-to-task.graphql
│ │ │ │ │ ├─create-task.graphql
│ │ │ │ │ ├─delete-task.graphql
│ │ │ │ │ ├─move-task.graphql
│ │ │ │ │ └─remove-user-to-task.graphql
│ │ │ │ └─user
│ │ │ │   ├─change-password.graphql
│ │ │ │   ├─forgot-password.graphql
│ │ │ │   ├─login.graphql
│ │ │ │   ├─logout.graphql
│ │ │ │   └─register.graphql
│ │ │ ├─queries
│ │ │ │ ├─me.graphql
│ │ │ │ └─pod.graphql
│ │ │ └─subscription
│ │ │   └─message.graphql
│ │ ├─hooks
│ │ │ ├─useInputAndCheckModal.ts
│ │ │ ├─useInputModal.ts
│ │ │ ├─useModal.ts
│ │ │ ├─useOutsideClick.ts
│ │ │ └─useProject.ts
│ │ ├─images
│ │ │ └─profile.png
│ │ ├─index.tsx
│ │ ├─lib
│ │ │ └─apolloClient.ts
│ │ ├─pages
│ │ │ ├─Home.tsx
│ │ │ ├─LogIn.tsx
│ │ │ ├─SignUp.tsx
│ │ │ └─pod
│ │ │   ├─Discussion.tsx
│ │ │   └─Settings.tsx
│ │ ├─react-app-env.d.ts
│ │ ├─types
│ │ │ └─react-app-env.d.ts
│ │ └─utils
│ │   └─date.ts
│ └─tsconfig.json
└─yarn.lock
```