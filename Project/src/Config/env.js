// import {BASE_URI , PROD_BASE_URI} from "react-native-dotenv"

// require('dotenv').config();

const DevEnvirenementVarialbe = 
    process.env.REACT_APP_API_URL


const ProdEnvirenementVarialbe = 
    process.env.PROD_BASE_URI


export default __DEV__? DevEnvirenementVarialbe : ProdEnvirenementVarialbe