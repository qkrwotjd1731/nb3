import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://learn.codeit.kr/api',
	timeout: 3000
});

export async function getColorSurveys(params = {}) {
    const res = await instance.get('/color-surveys', { params });
    return res.data;
}

export async function getColorSurvey(id) {
    const res = await instance.get(`/color-surveys/${id}`);
    return res.data;
}

export async function createColorSurvey(surveyData) {
    const res = await instance.post('/color-surveys', surveyData);
    return res.data;
}