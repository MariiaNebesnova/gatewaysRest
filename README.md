# gatewaysRest
a petproject to play with ExpressJS

**Technology stack:**

* Database: MongoDB
* Server: Node.js, Express, Mongoose
* Client: ReactJS, AntD

### Start:
#### Prerequisites:
* MongoDB ver. 6.*
* Node.js 18.*

Create a new MongoDB. using mongo shell, connect to your data base and copy-paste script from `https://github.com/MariiaNebesnova/gatewaysRest/blob/main/addTestData.js` - to add test data.

#### To run server:
* clone this repo to your machine
* add `.env` file according to `.env.example`
* run `npm start` from the root directory

To open client application open `http://localhost:<YOUR_PORT>/` in your browser.

Server app already contains a builded client.

### Notes: 
* tests were added as an example. Because there's no any significant buisness logic to cover with test that will make more sence;
* according to Dependency inversion principle, it would be better to wrap `antd` imports with own components, but the result will be a huge amount of code that is an overkill for such a small app. Howewer, I've done it for `mongoose` in server application, because it doesn't look monstrous there;
* client application can be runned and debugged separately, using `npm start` script from `gateway-client` directory. but you still need to start server on 8080 port, or change `proxy` in `gateways-client\package.json`;
* AntD was used because it provides a complete UI components and allows to create a prototype without a row of `.css`. And it's not so heavy as MUI.
