
let url = "";

if (process.env.NODE_ENV === 'dev') {
   url = "http://localhost:3539";
} else if (process.env.NODE_ENV === 'integration-test') {
   url = "http://localhost:3539"
} else if (process.env.NODE_ENV === 'test') {
   url = "http://localhost:3539"
} 
else {
   url = "https://jsramverk-eafmccbgceegf9bt.swedencentral-01.azurewebsites.net"
}


export default url;
