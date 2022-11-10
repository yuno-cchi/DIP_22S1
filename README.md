# NyMe
## IEM 22S1 IM3080 Design and Innovation Project submission by Group 1

![](https://cdn.discordapp.com/attachments/770296022089728072/1039797823534813274/logo.png)

> *"Why ride alone, when **together** is an option"*

NyMe is a ride-hitching app we developed in React Native for NTU's Design and Innovation Project module IM3080.

# Requirements
The app requires the NPM package `expo` to run, which can be installed via the command:
```
npm install expo
```

# API keys
The screens that require the use of map navigation should insert your own Google api in a const named GOOGLE_API which are declared before the JSX elements.
NOTE: Existing API keys are ineffective from 4pm 16 November 2022 onwards.
```
const GOOGLE_API = "Your API key";
```

# Database API
The screens that fetch data from the database should replace the url to your own data base url, look for the axios get method
```
axios.get("Your database fetching url");
```
