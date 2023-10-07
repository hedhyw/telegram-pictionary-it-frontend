# Telegram Pictionary It (Frontend)

This a frontend for Telegram Mini App "Pictionary It".

Check [this](https://github.com/hedhyw/telegram-pictionary-it) if you want to run this frontend with [the backend](https://github.com/hedhyw/telegram-pictionary-it-backend).

## Setup

### Configuration

Declare the following variable in [.env](.env):

```
REACT_APP_API_URL=wss://example.com/api/websocket
```

Replace `example.com` with your public hostname of the backend (example: ngrok domain).

### Install Packages

```shell
npm i --legacy-peer-deps
```

### Run frontend

```shell
npm start
```

It runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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
