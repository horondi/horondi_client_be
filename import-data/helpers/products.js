const { mapToLanguages } = require('./languages');
const { mapToImages } = require('./images');
const { mapToColors } = require('./colors');
const { mapToCurrencies } = require('./currencyset');
const { mapToOptions } = require('./options');
const { getObjectId, getObjectIds } = require('mongo-seeding');

const { rolltopDescUK, rolltopDescEN, newDescUK, newDescEN, harbuzDescUK, harbuzDescEN, bagWithPatternDescUK, bagWithPatternDescEN, bagThreeColorsDescUK, bagThreeColorsDescEN, bagOneColorDescUK, bagOneColorDescEN, bagSimpleDescUK, bagSimpleDescEN, fannyPackLargeDescUK, fannyPackLargeDescEN, fannyPackSmallDescUK, fannyPackSmallDescEN } = require('./productDesc');

const fabricDescription = mapToLanguages([
    '100% poliester прошита додатковим шаром спеціального матеріалу, який зміцнює та захищає від води + підкладка + фабричний гобелен',
    '100% poliester padded with a layer of durable and water-resistant material + inner layer + factory-made pattern'
]);

const malmoDescription = mapToLanguages([
    '100% poliester (Malmo) прошита додатковим шаром спеціального матеріалу, який зміцнює та захищає від води + підкладка + фабричний гобелен',
    '100% poliester (Malmo) padded with a layer of durable and water-resistant material + inner layer + factory-made pattern'
]);

const canvasDescription = mapToLanguages([
    'Canvas-400G прошита додатковим шаром спеціального матеріалу, який зміцнює та захищає від води + підкладка',
    'Canvas-400G padded with a layer of durable and water-resistant material + inner layer'
]);

const canvasPatternDescription = mapToLanguages([
    'Canvas-400G прошита додатковим шаром спеціального матеріалу, який зміцнює та захищає від води + підкладка + фабричний гобелен',
    'Canvas-400G padded with a layer of durable and water-resistant material + inner layer + factory-made pattern'
]);

const rolltops = [
    [['Ролтоп червоний 1', 'Rolltop Red 1'], [[318, 'Темно-червоний', 'Dark-red', 'червоний', 'red']], ['Чорний', 'Black'], 'black', 'black'],
    [['Ролтоп сірий 1', 'Rolltop Grey 1'], [[213, 'Сизий', 'Slate-grey', 'сірий', 'grey']], ['Чорний', 'Black'], 'black', 'black'],
    [['Ролтоп зелений 1', 'Rolltop Green 1'], [[207, 'Темно-оливковий', 'Dark-olive', 'зелений', 'green']], ['Чорний', 'Black'], 'black', 'black'],
    [['Ролтоп рожевий 1', 'Rolltop Pink 1'], [[204, 'Світло-рожевий', 'Light-pink', 'рожевий', 'pink']], ['Вишивка', 'Embroidery'], 'embroidery', 'pink'],
    [['Ролтоп кавовий 1', 'Rolltop Coffee 1'], [[304, 'Темно-лососевий', 'Dark-salmon', 'коричневий', 'brown']], ['Вишивка', 'Embroidery'], 'embroidery', 'brown'],
    [['Ролтоп синій 1', 'Rolltop Blue 1'], [[309, 'Королівський синій', 'Royal-blue', 'синій', 'blue']], ['Стрілки', 'Arrows'], 'arrows', 'black'],
    [['Ролтоп жовтий 1', 'Rolltop Yellow 1'], [[206, 'Золотий', 'Golden', 'жовтий', 'yellow']], ['Квіти', 'Flowers'], 'flowers', 'red'],
    [['Ролтоп жовтий 2', 'Rolltop Yellow 2'], [[206, 'Золотий', 'Golden', 'жовтий', 'yellow']], ['Олені', 'Deers'], 'deers', 'purple'],
    [['Ролтоп сірий 2', 'Rolltop Grey 2'], [[208, 'Світло-сталевий', 'Light-steel', 'сірий', 'grey']], ['Олені', 'Deers'], 'deers', 'brown'],
    [['Ролтоп чорний 1', 'Rolltop Black 1'], [[215, 'Темно-сірий', 'Dark-grey', 'сірий', 'grey']], ['Чорний', 'Black'], 'black', 'black'],
    [['Ролтоп коричневий 1', 'Rolltop Brown 1'], [[305, 'Насичений коричневий', 'Saddle-brown', 'коричневий', 'brown']], ['Люди', 'People'], 'people', 'brown'],
];
const rolltopNumber = rolltops.length;

const news = [
    [['Новий червоний', 'New Red'], [[318, 'Темно-червоний', 'Dark-red', 'червоний', 'red']], ['Чорний', 'Black'], 'black', 'black2'],
    [['Новий жовтий', 'New Yellow'], [[206, 'Золотий', 'Golden', 'жовтий', 'yellow']], ['Синій', 'Blue'], 'blue', 'black2'],
    [['Новий з деревом', 'New Red with Tree'], [[318, 'Темно-червоний', 'Dark-red', 'червоний', 'red']], ['Олені', 'Deers'], 'deers', 'black2'],
];
const newsNumber = news.length;

const harbuz = [
    [['Гарбуз сірий', 'Harbuz Grey'], [[318, 'Темно-червоний', 'Dark-red', 'червоний', 'red'], [213, 'Сизий', 'Slate-grey', 'сірий', 'grey']], [], '', 'black'],
    [['Гарбуз зелений', 'Harbuz Green'], [[206, 'Золотий', 'Golden', 'жовтий', 'yellow'], [207, 'Темно-оливковий', 'Dark-olive', 'зелений', 'green']], [], '', 'black'],
    [['Гарбуз коричневий', 'Harbuz Brown'], [[206, 'Золотий', 'Golden', 'жовтий', 'yellow'], [305, 'Насичений коричневий', 'Saddle-brown', 'коричневий', 'brown']], [], '', 'black'],
];
const harbuzNumber = harbuz.length;

const bags = [
    [['Сумка з гобеленом', 'Bag with a Pattern'], [[200, 'Світло-коричневий', 'Light-brown', 'коричневий', 'brown']], ['Люди', 'People'], 'people', 'black2'],
    [['Сумка з гобеленом синя', 'Bag with a Pattern Blue'], [[209, 'Сталево-блакитний', 'Steel-blue', 'синій', 'blue']], ['Олені', 'Deers'], 'deers', 'black2'],
    [['Сумка синя', 'Bag Blue'], [[209, 'Сталево-блакитний', 'Steel-blue', 'синій', 'blue']], [], '', 'black2'],
    [['Сумка "Три кольори"', 'Three Color Bag'], [[211, 'Світло-сірий', 'Light-grey', 'сірий', 'grey'], [213, 'Сизий', 'Slate-grey', 'сірий', 'grey'], [215, 'Темно-сірий', 'Dark-grey', 'сірий', 'grey']], [], '', 'black2'],
    [['Сумка', 'Bag'], [[211, 'Світло-сірий', 'Light-grey', 'сірий', 'grey']], [], '', 'black2'],
];
const bagsNumber = bags.length;

const fannyPacks = [
    [['Бананка гірчична', 'Fanny Pack Mustard'], [[206, 'Золотий', 'Golden', 'жовтий', 'yellow']], ['Квіти', 'Flowers'], 'flowers', ''],
    [['Бананка червона', 'Fanny Pack Red'], [[205, 'Вишневий', 'Violet-red', 'червоний', 'red']], ['Червоний', 'Red'], 'red', ''],
    [['Бананка синя', 'Fanny Pack Blue'], [[209, 'Сталево-блакитний', 'Steel-blue', 'синій', 'blue']], ['Стрілки', 'Arrows'], 'arrows', ''],
    [['Бананка рожева', 'Fanny Pack Pink'], [[204, 'Світло-рожевий', 'Light-pink', 'рожевий', 'pink']], ['Вишивка', 'Embroidery'], 'embroidery', ''],
    [['Бананка зелена', 'Fanny Pack Green'], [[207, 'Темно-оливковий', 'Dark-olive', 'зелений', 'green']], ['Чорний', 'Black'], 'black', ''],
    [['Бананка асфальтна', 'Fanny Pack Slate Grey'], [[212, 'Срібний', 'Silver', 'сірий', 'grey']], ['Чорний', 'Black'], 'black', ''],
];
const fannyPacksNumber = fannyPacks.length;

const wallets = [
    [['Гаманець гірчичний', 'Wallet Mustard'], [[206, 'Золотий', 'Golden', 'жовтий', 'yellow']], ['Квіти', 'Flowers'], 'flowers', ''],
    [['Гаманець червоний', 'Wallet Red'], [[205, 'Вишневий', 'Violet-red', 'червоний', 'red']], ['Червоний', 'Red'], 'red', ''],
    [['Гаманець синій', 'Wallet Blue'], [[209, 'Сталево-блакитний', 'Steel-blue', 'синій', 'blue']], ['Стрілки', 'Arrows'], 'arrows', ''],
    [['Гаманець рожевий', 'Wallet Pink'], [[204, 'Світло-рожевий', 'Light-pink', 'рожевий', 'pink']], ['Вишивка', 'Embroidery'], 'embroidery', ''],
    [['Гаманець зелений', 'Wallet Green'], [[207, 'Темно-оливковий', 'Dark-olive', 'зелений', 'green']], ['Чорний', 'Black'], 'black', ''],
    [['Гаманець асфальтний', 'Wallet Slate Grey'], [[212, 'Срібний', 'Silver', 'сірий', 'grey']], ['Чорний', 'Black'], 'black', ''],
];
const walletsNumber = wallets.length;

let products = [];
let counter = 0;
let oldTotalProducts = 0;
let newTotalProducts = 0;
let pattern;
let patternImages;
let strapLengthInCm;
let innerMaterial;
let mainMaterial;
let closure;
let closureColor;
let model;

newTotalProducts += rolltopNumber;
while (counter < newTotalProducts){
    mapProduct('main-backpacks', 'sub-backpacks', 'rolltop', counter, rolltops[counter - oldTotalProducts], rolltopDescUK, rolltopDescEN, 145000);
    counter++
}

oldTotalProducts = newTotalProducts;
newTotalProducts += newsNumber;
while (counter < newTotalProducts){
    mapProduct('main-backpacks', 'sub-backpacks', 'new', counter, news[counter - oldTotalProducts], newDescUK, newDescEN, 165000);
    counter++
}

oldTotalProducts = newTotalProducts;
newTotalProducts += harbuzNumber;
while (counter < newTotalProducts){
    mapProduct('main-backpacks', 'sub-backpacks', 'harbuz', counter, harbuz[counter - oldTotalProducts], harbuzDescUK, harbuzDescEN, 155000);
    counter++
}

oldTotalProducts = newTotalProducts;
newTotalProducts += bagsNumber;
mapProduct('main-bags', 'sub-bags', 'patbag', counter, bags[0], bagWithPatternDescUK, bagWithPatternDescEN, 90000);
mapProduct('main-bags', 'sub-bags', 'patbag', counter + 1, bags[1], bagWithPatternDescUK, bagWithPatternDescEN, 90000);
mapProduct('main-bags', 'sub-bags', 'col1bag', counter + 2, bags[2], bagOneColorDescUK, bagOneColorDescEN, 90000);
mapProduct('main-bags', 'sub-bags', 'col3smplbag', counter + 3, bags[3], bagThreeColorsDescUK, bagThreeColorsDescEN, 90000);
mapProduct('main-bags', 'sub-bags', 'col3smplbag', counter + 4, bags[4], bagSimpleDescUK, bagSimpleDescEN, 95000);
counter += bagsNumber;

oldTotalProducts = newTotalProducts;
newTotalProducts += fannyPacksNumber;
while (counter < newTotalProducts){
    mapProduct('main-bags', 'sub-fanny-packs', 'fanny-pack', counter, fannyPacks[counter - oldTotalProducts], fannyPackLargeDescUK, fannyPackLargeDescEN, 50000);
    counter++
}

oldTotalProducts = newTotalProducts;
newTotalProducts += walletsNumber;
while (counter < newTotalProducts){
    mapProduct('main-accessories', 'sub-wallets', 'wallet', counter, wallets[counter - oldTotalProducts], 'Опис очікуйте найближчим часом...', 'Description will appear shortly...', 20000);
    counter++
}

function mapProduct(cat, subcat, name, i, product, descUK, descEN, price) {
    model = [product[0][0].split(' ')[0], product[0][1].split(' ')[0]];
    model = (model[0] == 'Сумка') ? [product[0][0], product[0][1]] : model;
    model = (name == 'patbag') ? ['Сумка з гобеленом', 'Bag with a Pattern'] : model;
    model = (name == 'col1bag') ? ['Сумка одноколірна', 'One Color Bag'] : model;
    model = (name == 'fanny-pack') ? ['Бананка', 'Fanny Pack'] : model;
    pattern = (product[2].length === 0) ? mapToLanguages(['Немає', 'None']) : mapToLanguages(product[2]);
    patternImages = (product[3] === '') ? null : mapToImages(product[3]);
    if (model[1] == 'Rolltop' || model[1] == 'New' || model[1] == 'Harbuz') {
        strapLengthInCm = 100;
        innerMaterial = mapToLanguages(['Oxford 135', 'Oxford 135']);
        mainMaterial = fabricDescription;
        closure = mapToLanguages(['Фастекс (пластикова защіпка)', 'Plastic closure']);
        closureColor = 'black'
    } else if (model[1] == 'Fanny Pack' || model[1] == 'Wallet') {
        strapLengthInCm = 0;
        innerMaterial = [];
        mainMaterial = malmoDescription;
        closure = [];
        closureColor = ''
    } else {
        strapLengthInCm = 0;
        innerMaterial = [];
        mainMaterial = (product[2].length === 0) ? canvasDescription : canvasPatternDescription;
        closure = [];
        closureColor = ''
    }
    products.push({
        id: getObjectId('product' + i),
        category: getObjectId(cat),
        subcategory: getObjectId(subcat),
        model: mapToLanguages([model[0], model[1]]),
        name: mapToLanguages([product[0][0], product[0][1]]),
        description: mapToLanguages([descUK, descEN]),
        mainMaterial: mainMaterial,
        innerMaterial: innerMaterial,
        strapLengthInCm: strapLengthInCm,
        images: {
            primary: mapToImages('primary_' + i),
            additional: [
                mapToImages('additional_'+ i + '_1'),
                mapToImages('additional_'+ i + '_2'),
                mapToImages('additional_'+ i + '_3')
            ]
        },
        colors: mapToColors(product[1]),
        pattern: pattern,
        patternImages: patternImages,
        closure: closure,
        closureColor: closureColor,
        basePrice: mapToCurrencies(price),
        options: mapToOptions(name, product[4])
    })
}


// const products = [{
//     id: getObjectId('product' + 9),
//     category: getObjectId('sub-fanny-packs'),
//     name: mapToLanguages(['Бананка маленька', 'Fanny pack small']),
//     description: mapToLanguages([fannyPackSmallDescUK, fannyPackSmallDescEN]),
//     images: {
//         primary: mapToImages('primary-fanny-pack-small'),
//         additional: [
//             mapToImages('additional-fanny-pack-small-1'),
//             mapToImages('additional-fanny-pack-small-2'),
//             mapToImages('additional-fanny-pack-small-3')
//         ]
//     },
//     basePrice: 400,
//     items: mapToItems('fanny-pack', [[10, 20]], 'malmo', 400, 10)
// }];

module.exports = products;