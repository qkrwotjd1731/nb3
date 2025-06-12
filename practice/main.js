fetch('https://example.com/...')
  .then(response => response.json())
  .then(data => console.log(data)) //fullfilled 상태 일시 내용 출력
  .catch(err => console.log(err)); //rejected 상태 일시 오류 출력
