import { getProductList, createProduct } from "./ProductService.js";

class Product {
  constructor(name, description, price, tags, images, favoriteCount = 0) {
    this._name = name;  // 상품명
    this._description = description;  // 상품 설명
    this._price = price;  // 판매 가격
    this._tags = tags;  // 해시태그 배열
    this._images = images;  // 이미지 배열
    this._favoriteCount = favoriteCount;  // 찜하기 수
  }

  // 캡슐화 get/set
  get name() {
    return this._name;
  }
  
  set name(value) {
    const isString = typeof value === 'string'; // 문자열인지 판단
    const isLengthValid = value.length >= 1 && value.length <= 30; // 1자 이상, 30자 이하
    const noSpecialChars = /^[가-힣a-zA-Z0-9\s]+$/.test(value) // 한글, 영문, 숫자, 공백만 허용

    if (isString && isLengthValid && noSpecialChars) {
      this._name = value;
    } else {
      console.log('상품명은 1~30자의 특수문자를 제외한 문자열이어야 합니다.');
    }
  }

  get description() {
    return this._description;
  }

  set description(value) {
    if (typeof value === 'string') {
      this._description = value;
    } else {
      console.log('상품 설명은 문자열이어야 합니다.');
    }
  }

  get price() {
    return this._price;
  }

  set price(value) {
    const isNumber = typeof value === 'number'; // 숫자인지 판단
    const isNumberValid = value >=0 && value <= 9999999; //0원 이상, 9999999원 이하

    if (isNumber && isNumberValid) {
      this._price = value;
    } else {
      console.log('판매 가격은 0 이상 9999999 이하의 숫자여야 합니다.');
    }
  }

  get tags() {
    return this._tags;
  }

  set tags(value) {
    if (Array.isArray(value)) {
      let isValid = true;

      value.forEach((tag) => {
        if (typeof tag !== string || tag[0] !== '#') {  // starsWith 고려
          isValid = false;
        }
      })
    }
    // 중복제거 set 고려
    if (isValid) {
      this._tags = value;
    } else {
      console.log('invaild value.');
    }
  }

  get images() {
    return this._images;
  }

  set images(value) {
    if (Array.isArray(value)) {
      this._images = value;
    } else {
      console.log('invaild value.');
    }
  }

  get favoriteCount() {
    return this._favoriteCount;
  }

  set favoriteCount(value) {
    if (typeof value === 'number' && value >= 0) {
      this._favoriteCount = value;
    } else {
      console.log('invaild value.');
    }
  }

  // 찜하기 수 1 증가시키기
  favorite() {
    this.favoriteCount++;
  }
}

class ElectronicProduct extends Product {
  constructor(name, description, price, tags, images, favoriteCount, manufacturer) {
    super(name, description, price, tags, images, favoriteCount);
    this._manufacturer = manufacturer;  // 제조사
  }

  // 캡슐화 get/set
  get manufacturer() {
    return this._manufacturer;
  }

  set manufacturer(value) {
    if (typeof value === 'string') {
      this._manufacturer = value;
    } else {
      console.log('invaild value.');
    }
  }
}

class Article {
  constructor(title, content, writer, likeCount = 0) {
    this._title = title;  // 제목
    this._content = content;  // 내용
    this._writer = writer;  // 작성자
    this._likeCount = likeCount;  // 좋아요 수
    this._createdAt = new Date(); // 생성일자
  }

  // 캡슐화 get/set
   get title() {
    return this._title;
  }

  set title(value) {
    if (typeof value === 'string') {
      this._title = value;
    } else {
      console.log('invaild value.');
    }
  }

  get content() {
    return this._content;
  }

  set content(value) {
    if (typeof value === 'string') {
      this._content = value;
    } else {
      console.log('invaild value.');
    }
  }

  get writer() {
    return this._writer;
  }

  set writer(value) {
    if (typeof value === 'string') {
      this._writer = value;
    } else {
      console.log('invaild value.');
    }
  }

  get likeCount() {
    return this._likeCount;
  }

  set likeCount(value) {
    if (typeof value === 'number' && value >= 0) {
      this._likeCount = value;
    } else {
      console.log('invaild value.');
    }
  }

  // 좋아요 수 1 증가시키기
  like() {
    this.likeCount++;
  }
}

// ---Product Test Code---
  const newProduct = await createProduct({
  "name": "헤드셋",
  "description": "스피커,마이크 가능",
  "price": 30000,
  "tags": ["#전자제품"],
  "images": ["https://example.com/..."],
});
const productData = await getProductList();
console.log(newProduct);
console.log('-------');
const products = [];
// tag에 '#전자제품'이 포함되어있는지 확인하고 맞는 클래스 생성
productData.list.forEach((product) => {
  if (product.tags.includes('#전자제품')) {
    products.push(new ElectronicProduct(
      product.name,
      product.description,
      product.price,
      product.tags,
      product.images,
      product.favoriteCount,
      product.manufacturer
    ));
  } else {
    products.push(new Product(
      product.name,
      product.description,
      product.price,
      product.tags,
      product.images,
      product.favoriteCount
    ));
  }
});

console.log(products);

// ---Article Test Code---
/*const newArticle = await createArticle({
  "title": "님블뉴런",
  "content": "세계 최악의 게임회사",
  "image": "https://example.com/..."
});
const articleData = await getArticleList();
console.log(newArticle);
console.log('-------');
console.log(articleData); */