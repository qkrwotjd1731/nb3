import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://panda-market-api-crud.vercel.app'
});

export async function getArticleList(page=1, pageSize=5, keyword='') {
  return instance.get('/articles',{ page, pageSize, keyword })
    .then((res) => res.data)
    .catch((err) => console.log(`Error T.T: ${err.response.status} ${err.response.statusText}`));
}

export async function getArticle(id) {
  return instance.get(`/articles/${id}`)
    .then((res) => res.data)
    .catch((err) => cconsole.log(`Error T.T: ${err.response.status} ${err.response.statusText}`));
}

export async function createArticle(articleData) {
  // 구조 분해를 통해 request body에 속성 할당
    const { title, content, image } = articleData;
    const requestBody = {
      title,
      content,
      image
    };

  return instance.post('/articles', requestBody)
    .then((res) => res.data)
    .catch((err) => console.log(`Error T.T: ${err.response.status} ${err.response.statusText}`));
}

export async function patchArticle(id, articleData) {
  return instance.patch(`/articles/${id}`, articleData)
    .then((res) => res.data)
    .catch((err) => console.log(`Error T.T: ${err.response.status} ${err.response.statusText}`));
}

export async function deleteArticle(id) {
  return instance.delete(`/articles/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(`Error T.T: ${err.response.status} ${err.response.statusText}`));
}