const { newsQuery, newsMutation } = require('./modules/news/news.resolver');
const { userQuery, userMutation } = require('./modules/user/user.resolver');
const {
  productsQuery,
  productsMutation,
} = require('./modules/product/product.resolver');

const {
  ordersQuery,
  ordersMutation,
} = require('./modules/order/order.resolver');

const {
  commentsQuery,
  commentsMutation,
} = require('./modules/comment/comment.resolver');

const {
  contactQuery,
  contactMutation,
} = require('./modules/contact/contact.resolver');

const {
  currencyQuery,
  currencyMutation,
} = require('./modules/currency/currency.resolver');
const {
  materialQuery,
  materialMutation,
} = require('./modules/material/material.resolver');
const {
  modelsQuery,
  modelsMutation,
} = require('./modules/model/model.resolver');
const {
  patternQuery,
  patternMutation,
} = require('./modules/pattern/pattern.resolver');
const {
  categoryQuery,
  categoryMutation,
} = require('./modules/category/category.resolver');
const {
  novaPoshtaQuery,
} = require('./modules/delivery/nova-poshta/nova-poshta.resolver');
const { paymentQuery } = require('./modules/payment/payment.resolver');
const {
  businessTextQuery,
  businessTextMutation,
} = require('./modules/business-text/business-text.resolver');
const {
  emailChatQuestionQuery,
  emailChatQuestionMutation,
} = require('./modules/email-chat/email-chat.resolver');

const {
  homePageImagesMutation,
  homePageImagesQuery,
} = require('./modules/homepage-images/home-page-images.resolver');

const {
  headerQuery,
  headerMutation,
} = require('./modules/header/header.resolver');

const { colorQuery, colorMutation } = require('./modules/color/color.resolver');

const {
  homePageSlideQuery,
  homePageSlideMutation,
} = require('./modules/homepage-slider/homepage-slider.resolves');

const {
  closureQuery,
  closureMutation,
} = require('./modules/closures/closures.resolver');

const {
  constructorBasicQuery,
  constructorBasicMutation,
} = require('./modules/constructor/constructor-basic/constructor-basic.resolves');

const {
  constructorFrontPocketQuery,
  constructorFrontPocketMutation,
} = require('./modules/constructor/constructor-front-pocket/constructor-front-pocket.resolves');

const {
  constructorBottomMutation,
  constructorBottomQuery,
} = require('./modules/constructor/constructor-bottom/constructor-bottom.resolver');

const { cartMutation, cartQuery } = require('./modules/cart/cart.resolver');

const categoryService = require('./modules/category/category.service');
const userService = require('./modules/user/user.service');
const productsService = require('./modules/product/product.service');
const commentsService = require('./modules/comment/comment.service');
const sizeService = require('./modules/size/size.service.js');
const { uploadMutation } = require('./modules/upload/upload.resolver');
const { sizeQuery, sizeMutation } = require('./modules/size/size.resolver');
const constructorServices = require('./modules/constructor/constructor.services');
const constructorBottomModel = require('./modules/constructor/constructor-bottom/constructor-bottom.model');
const constructorBasicModel = require('./modules/constructor/constructor-basic/constructor-basic.model');
const constructorFrontPocketModel = require('./modules/constructor/constructor-front-pocket/constructor-front-pocket.model');
const materialService = require('./modules/material/material.service');
const closuresService = require('./modules/closures/closures.service');
const patternService = require('./modules/pattern/pattern.service');
const modelService = require('./modules/model/model.service');
const colorService = require('./modules/color/color.service');
const {
  ukrPoshtaQuery,
} = require('./modules/delivery/ukr-poshta/ukr-poshta.resolver');

const SCHEMA_NAMES = {
  paginatedProducts: 'PaginatedProducts',
  category: 'Category',
  news: 'News',
  pattern: 'Pattern',
  material: 'Material',
  materials: 'Materials',
  currency: 'Currency',
  product: 'Product',
  comment: 'Comment',
  businessText: 'BusinessText',
  successfulResponse: 'SuccessfulResponse',
  model: 'Model',
  contact: 'Contact',
  order: 'Order',
  user: 'User',
  emailQuestion: 'EmailQuestion',
  header: 'Header',
  homePageImages: 'HomePageImages',
  homePageSlide: 'HomePageSlide',
  token: 'Token',
  size: 'Size',
  closure: 'Closure',
  color: 'Color',
  constructorBottom: 'ConstructorBottom',
  constructorBasic: 'ConstructorBasic',
  constructorFrontPocket: 'ConstructorFrontPocket',
};

const resolvers = {
  Query: {
    ...cartQuery,

    ...currencyQuery,

    ...materialQuery,

    ...patternQuery,

    ...categoryQuery,

    ...newsQuery,

    ...userQuery,

    ...productsQuery,

    ...commentsQuery,

    ...businessTextQuery,

    ...modelsQuery,

    ...contactQuery,

    ...novaPoshtaQuery,

    ...ukrPoshtaQuery,

    ...paymentQuery,

    ...ordersQuery,

    ...emailChatQuestionQuery,

    ...homePageImagesQuery,

    ...headerQuery,

    ...sizeQuery,

    ...homePageSlideQuery,

    ...closureQuery,

    ...constructorBottomQuery,

    ...constructorBasicQuery,

    ...constructorFrontPocketQuery,

    ...colorQuery,
  },
  ProductsFilter: {
    categories: parent =>
      parent.categories.map(category =>
        categoryService.getCategoryById(category)
      ),
    models: parent =>
      parent.models.map(model => modelService.getModelById(model)),
    patterns: parent =>
      parent.patterns.map(pattern => patternService.getPatternById(pattern)),
    closures: parent =>
      parent.closures.map(closure => closuresService.getClosureById(closure)),
    mainMaterial: parent =>
      parent.mainMaterial.map(material =>
        materialService.getMaterialById(material)
      ),
    mainMaterialColor: parent =>
      parent.mainMaterialColor.map(color => colorService.getColorById(color)),
    innerMaterial: parent =>
      parent.innerMaterial.map(material =>
        materialService.getMaterialById(material)
      ),
    innerMaterialColor: parent =>
      parent.innerMaterialColor.map(color => colorService.getColorById(color)),
    bottomMaterial: parent =>
      parent.bottomMaterial.map(material =>
        materialService.getMaterialById(material)
      ),
    bottomMaterialColor: parent =>
      parent.bottomMaterialColor.map(color => colorService.getColorById(color)),
  },
  User: {
    wishlist: parent => productsService.getProductsForWishlist(parent._id),
  },

  Comment: {
    product: parent => productsService.getProductById(parent.product),
    user: parent => userService.getUser(parent.user),
  },

  Product: {
    category: parent => categoryService.getCategoryById(parent.category),
    comments: parent =>
      commentsService.getAllCommentsByProduct({ productId: parent._id }),
    model: parent => modelService.getModelById(parent.model),
    mainMaterial: parent => ({
      material: () =>
        materialService.getMaterialById(parent.mainMaterial.material),
      color: () => colorService.getColorById(parent.mainMaterial.color),
    }),
    innerMaterial: parent => ({
      material: () =>
        materialService.getMaterialById(parent.innerMaterial.material),
      color: () => colorService.getColorById(parent.innerMaterial.color),
    }),
    bottomMaterial: parent => ({
      material: () =>
        materialService.getMaterialById(parent.bottomMaterial.material),
      color: () => colorService.getColorById(parent.bottomMaterial.color),
    }),
    pattern: parent => patternService.getPatternById(parent.pattern),
    closure: parent => closuresService.getClosureById(parent.closure),
    sizes: parent => parent.sizes.map(size => sizeService.getSizeById(size)),
  },
  Cart: {
    items: parent =>
      parent.items.map(item => {
        console.log(item);

        if (item.product) {
          return {
            product: productsService.getProductById(item.product),
            price: item.price,
            quantity: item.quantity,
            options: {
              size: sizeService.getSizeById(item.options.size),
            },
          };
        }
        if (item.fromConstructor) {
          return {
            productFromConstructor: {
              constructorBasics: constructorServices.getConstructorElementById(
                item.fromConstructor.constructorBasics,
                constructorBasicModel
              ),
              constructorBottom: constructorServices.getConstructorElementById(
                item.fromConstructor.constructorBottom,
                constructorBottomModel
              ),
              constructorFrontPocket: constructorServices.getConstructorElementById(
                item.fromConstructor.constructorFrontPocket,
                constructorFrontPocketModel
              ),
              constructorPattern: patternService.getPatternById(
                item.fromConstructor.constructorPattern
              ),
            },
            price: item.price,
            quantity: item.quantity,
            options: {
              size: sizeService.getSizeById(item.options.size),
            },
          };
        }
      }),
  },
  Order: {
    items: parent =>
      parent.items.map(item => {
        if (item.isFromConstructor) {
          return {
            constructorBottom: constructorServices.getConstructorElementById(
              item.constructorBottom,
              constructorBottomModel
            ),
            constructorBasics: constructorServices.getConstructorElementById(
              item.constructorBasics,
              constructorBasicModel
            ),
            constructorFrontPocket: constructorServices.getConstructorElementById(
              item.constructorFrontPocket,
              constructorFrontPocketModel
            ),
            constructorPattern: patternService.getPatternById(
              item.constructorPattern
            ),
            model: modelService.getModelById(item.model),
            options: {
              size: sizeService.getSizeById(item.options.size),
              sidePocket: item.options.sidePocket,
            },
            isFromConstructor: item.isFromConstructor,
            quantity: item.quantity,
            fixedPrice: item.fixedPrice,
          };
        }
        return {
          fixedPrice: item.fixedPrice,
          isFromConstructor: item.isFromConstructor,
          quantity: item.quantity,
          options: {
            size: sizeService.getSizeById(item.options.size),
            sidePocket: item.options.sidePocket,
          },
          product: productsService.getProductById(item.product),
        };
      }),
  },
  Pattern: {
    material: parent => materialService.getMaterialById(parent.material),
  },
  Model: {
    category: parent => categoryService.getCategoryById(parent.category),
    sizes: parent => parent.sizes.map(size => sizeService.getSizeById(size)),
    constructorBottom: parent =>
      parent.constructorBottom.map(el =>
        constructorServices.getConstructorElementById(
          el,
          constructorBottomModel
        )
      ),
    constructorBasic: parent =>
      parent.constructorBasic.map(el =>
        constructorServices.getConstructorElementById(el, constructorBasicModel)
      ),
    constructorFrontPocket: parent =>
      parent.constructorFrontPocket.map(el =>
        constructorServices.getConstructorElementById(
          el,
          constructorFrontPocketModel
        )
      ),
    constructorPattern: parent =>
      parent.constructorPattern.map(el => patternService.getPatternById(el)),
  },
  Closure: {
    material: parent => materialService.getMaterialById(parent.material),
  },
  ConstructorBottom: {
    material: parent => materialService.getMaterialById(parent.material),
    color: parent => colorService.getColorById(parent.color),
  },
  ConstructorBasic: {
    material: parent => materialService.getMaterialById(parent.material),
    color: parent => colorService.getColorById(parent.color),
  },
  ConstructorFrontPocket: {
    material: parent => materialService.getMaterialById(parent.material),
    color: parent => colorService.getColorById(parent.color),
  },

  UserRate: {
    user: parent => userService.getUserByFieldOrThrow('_id', parent.user),
  },
  Material: {
    colors: parent =>
      parent.colors.map(color => colorService.getColorById(color)),
  },
  EmailQuestion: {
    answer: parent => {
      if (parent.answer.date) {
        return parent.answer;
      }
      return null;
    },
  },
  EmailAnswer: {
    admin: parent => userService.getUserByFieldOrThrow('_id', parent.admin),
  },

  Mutation: {
    ...cartMutation,

    ...uploadMutation,

    ...patternMutation,

    ...materialMutation,

    ...categoryMutation,

    ...currencyMutation,

    ...newsMutation,

    ...userMutation,

    ...productsMutation,

    ...commentsMutation,

    ...businessTextMutation,

    ...modelsMutation,

    ...contactMutation,

    ...ordersMutation,

    ...emailChatQuestionMutation,

    ...homePageImagesMutation,

    ...headerMutation,

    ...sizeMutation,

    ...homePageSlideMutation,

    ...closureMutation,

    ...colorMutation,

    ...constructorBasicMutation,

    ...constructorFrontPocketMutation,

    ...constructorBottomMutation,
  },
  TokenResult: {
    __resolveType: obj => {
      if (obj.token || obj.accessToken || obj.refreshToken) {
        return SCHEMA_NAMES.token;
      }
      return 'Error';
    },
  },
  CategoryResult: {
    __resolveType: obj => {
      if (obj.name) {
        return SCHEMA_NAMES.category;
      }
      return 'Error';
    },
  },
  PaginatedProductsResult: {
    __resolveType: obj => {
      if (obj.items) {
        return SCHEMA_NAMES.paginatedProducts;
      }
      return 'Error';
    },
  },
  CurrencyResult: {
    __resolveType: obj => {
      if (obj.lastUpdatedDate) {
        return SCHEMA_NAMES.currency;
      }
      return 'Error';
    },
  },
  NewsResult: {
    __resolveType: obj => {
      if (obj.title) {
        return SCHEMA_NAMES.news;
      }
      return 'Error';
    },
  },
  MaterialResult: {
    __resolveType: obj => {
      if (obj.name) {
        return SCHEMA_NAMES.material;
      }
      return 'Error';
    },
  },

  PatternResult: {
    __resolveType: obj => {
      if (obj.name) {
        return SCHEMA_NAMES.pattern;
      }
      return 'Error';
    },
  },
  ProductResult: {
    __resolveType: obj => {
      if (obj.name) {
        return SCHEMA_NAMES.product;
      }
      return 'Error';
    },
  },
  ConstructorBottomResult: {
    __resolveType: obj => {
      if (obj.name) {
        return SCHEMA_NAMES.constructorBottom;
      }
      return 'Error';
    },
  },
  CommentResult: {
    __resolveType: obj => {
      if (obj.product) {
        return SCHEMA_NAMES.comment;
      }
      return 'Error';
    },
  },
  BusinessTextResult: {
    __resolveType: obj => {
      if (obj.title) {
        return SCHEMA_NAMES.businessText;
      }
      return 'Error';
    },
  },
  LogicalResult: {
    __resolveType: obj => {
      if (obj.isSuccess) {
        return SCHEMA_NAMES.successfulResponse;
      }
      return 'Error';
    },
  },
  ModelResult: {
    __resolveType: obj => {
      if (obj.name) {
        return SCHEMA_NAMES.model;
      }
      return 'Error';
    },
  },
  ContactResult: {
    __resolveType: obj => {
      if (obj.address) {
        return SCHEMA_NAMES.contact;
      }
      return 'Error';
    },
  },
  OrderResult: {
    __resolveType: obj => {
      if (obj.status) {
        return SCHEMA_NAMES.order;
      }
      return 'Error';
    },
  },
  UserResult: {
    __resolveType: obj => {
      if (obj.email) {
        return SCHEMA_NAMES.user;
      }
      return 'Error';
    },
  },
  EmailQuestionResult: {
    __resolveType: obj => {
      if (obj.text) {
        return SCHEMA_NAMES.emailQuestion;
      }
      return 'Error';
    },
  },
  HeaderResult: {
    __resolveType: obj => {
      if (obj.title) {
        return SCHEMA_NAMES.header;
      }
      return 'Error';
    },
  },
  HomepageImagesResult: {
    __resolveType: obj => {
      if (obj.images) {
        return SCHEMA_NAMES.homePageImages;
      }
      return 'Error';
    },
  },
  HomePageSlideResult: {
    __resolveType: obj => {
      if (obj.title) {
        return SCHEMA_NAMES.homePageSlide;
      }
      return 'Error';
    },
  },
  ClosureResult: {
    __resolveType: obj => {
      if (obj.name) {
        return SCHEMA_NAMES.closure;
      }
      return 'Error';
    },
  },
  SizeResult: {
    __resolveType: obj => {
      if (obj.name) {
        return SCHEMA_NAMES.size;
      }
      return 'Error';
    },
  },
  ColorResult: {
    __resolveType: obj => {
      if (obj.colorHex) {
        return SCHEMA_NAMES.color;
      }
      return 'Error';
    },
  },
  ColorDeletingResult: {
    __resolveType: obj => {
      if (obj.colorHex) {
        return SCHEMA_NAMES.color;
      }
      if (obj.items) {
        return SCHEMA_NAMES.materials;
      }
      return 'Error';
    },
  },

  ConstructorBasicResult: {
    __resolveType: obj => {
      if (obj.name) {
        return SCHEMA_NAMES.constructorBasic;
      }
      return 'Error';
    },
  },

  ConstructorFrontPocketResult: {
    __resolveType: obj => {
      if (obj.name) {
        return SCHEMA_NAMES.constructorFrontPocket;
      }
      return 'Error';
    },
  },
};

module.exports = resolvers;
