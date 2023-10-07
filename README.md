# Telegram Pictionary It (Frontend)

This a frontend for Telegram Mini App "Pictionary It".

Check [this](https://github.com/hedhyw/telegram-pictionary-it) if you want to run this frontend with [the backend](https://github.com/hedhyw/telegram-pictionary-it-backend).

## Configuration

Declare `REACT_APP_API_URL=wss://example.com/api/websocket` in [.env](.env).
Replace `example.com` with your public hostname of the backend (example: ngrok domain).

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

## Docker image

In order to build and push the frontend docker image, declare the following variables in [.env](.env):

```
DOMAIN=your_public_domain_change_it
IMAGE=image_name_change_it
```

Then run:
```shell
npm run image
```

## Known issues

- Scroll problem on iOS and Android devices:
    https://bugs.telegram.org/c/32721

## Theme events

An example of handling Telegram theme changes in real time can be found in [src/app/appSlice.js](src/app/appSlice.js).

## License

[MIT](./LICENSE).
