const axios = require('axios');
const fs = require('fs');

const urlsMicroservices = ['https://web-technologies-api-master.as51985.net/openapi.json', 'https://web-projects-api-master.as51985.net/openapi.json'];
const openapi = {
openapi: '3.0.0',
info: {
title: 'LoopBack Application',
version: '1.0.0',
},
paths: {},
components: {},
};

const getOpenapiPaths = async url => {
const req = await axios.get(url);
return {
paths: req.data.paths,
components: req.data.components,
};
};

const main = async () => {
for (const url of urlsMicroservices) {
console.log(url);

const openapiData = await getOpenapiPaths(url);
openapi.paths = { ...openapi.paths, ...openapiData.paths };
openapi.components = { ...openapi.components, ...openapiData.components };
}

console.log(openapi);

fs.writeFileSync('openapi.json', JSON.stringify(openapi));
};

main(); 