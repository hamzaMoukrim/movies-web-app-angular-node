// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl:"http://localhost:5000",
  firebase: {
    projectId: 'movies-app-e4089',
    appId: '1:586270458169:web:74c5b12e67ad0ce79d68e8',
    databaseURL: 'https://movies-app-e4089-default-rtdb.firebaseio.com',
    storageBucket: 'movies-app-e4089.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyBSoQo9bVCITydPcFgJZIep1yeGnwIfqEk',
    authDomain: 'movies-app-e4089.firebaseapp.com',
    messagingSenderId: '586270458169',
    measurementId: 'G-BBSD1PL3YJ',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
