# user-store

Test project that goes with this [tutorial](https://www.positronx.io/vue-js-firebase-build-vue-crud-app-with-cloud-firestore/) 
to investigate using VueJS with Firebase (specifically Firestore as a db).

The project is VueJS 2.x and uses Typescript.

To deploy to Firebase, create a project as detailed in the tutorial. This gives the configuration to access
the Firebase functionality. Create a file called `firebase.config.ts` in the api directory of the project and add your config
```js
export const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
}
```

You can then build the project and run `npm run deploy` to host the app in Firebase

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
