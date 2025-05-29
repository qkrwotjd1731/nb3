import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./ProductService.js";
import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService.js";

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
    if (typeof value === 'string') {
      this._name = value;
    } else {
      console.log('invaild value.');
    }
  }

  get description() {
    return this._description;
  }

  set description(value) {
    if (typeof value === 'string') {
      this._description = value;
    } else {
      console.log('invaild value.');
    }
  }

  get price() {
    return this._price;
  }

  set price(value) {
    if (typeof value === 'number' && value >= 0) {
      this._price = value;
    } else {
      console.log('invaild value.');
    }
  }

  get tags() {
    return this._tags;
  }

  set tags(value) {
    if (Array.isArray(value)) {
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
    if (typeof value === 'number' && p >= 0) {
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

const data1 = await createProduct({
  "name": "지우개",
  "description": "지우지우",
  "price": 200,
  "tags": ["#문구류"],
  "images": ["https://example.com/..."],
});
const data = await getProductList();
console.log(data1);
console.log('-------');
const products = [];
data.list.forEach((product) => {
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

// await deleteProduct(868);
console.log(products);