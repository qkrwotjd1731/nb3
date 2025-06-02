import { getColorSurveys, createColorSurvey } from './api.js'

console.log('get test');
const data = await getColorSurveys({offset:10, limit:10});
console.log(data);