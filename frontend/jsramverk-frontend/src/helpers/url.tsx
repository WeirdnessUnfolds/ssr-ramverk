export const url = process.env.NODE_ENV === 'integration-test'
   ? "http://localhost:3539/all"
   : "https://jsramverk-eafmccbgceegf9bt.swedencentral-01.azurewebsites.net/all"