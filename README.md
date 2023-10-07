# Telegram Pictionary It (Frontend)

This a frontend for Telegram Mini App "Pictionary It".

Check [this](https://github.com/hedhyw/telegram-pictionary-it) if you want to run this frontend with [the backend](https://github.com/hedhyw/telegram-pictionary-it-backend).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Known issues

- Scroll problem on iOS and Android devices:
    https://bugs.telegram.org/c/32721

## Theme events

An example of handling Telegram theme changes in real time can be found in [src/app/appSlice.js](src/app/appSlice.js).

## License

[MIT](./LICENSE).
