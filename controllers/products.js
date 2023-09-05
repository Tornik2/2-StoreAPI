const Product = require('../models/product')

const getAllProds = async (req, res) => {
    const {featured, company, name, sort, select, numericFilters} = req.query
    const queryObject = {}
    if(featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name) {
        queryObject.name = { $regex: name, $options: 'i'}
    }
    
    if (numericFilters) {
  const operatorMap = {
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq',
    '<': '$lt',
    '<=': '$lte',
  };
  const regEx = /\b(<|>|>=|=|<|<=)\b/g;

  let filters = numericFilters.replace(regEx, (operator) => `-${operatorMap[operator]}-`)
  const options = ['price', 'rating']
  filters.split(',').forEach(item => {
    const [field, operator, value] = item.split('-')
    if(options.includes(field)) {
        queryObject[field] = {[operator]: Number(value)}
    }
  })
  
}
      
    let result = Product.find(queryObject)

    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    if (select) {
        const selectList = select.split(',').join(' ')
        result = result.select(selectList)
    }
  

    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const skip = (page - 1) * limit

    const products = await result.skip(skip).limit(limit)

    res.status(200).json({nbHits: products.length, products})
}

const getAllProdsStatic = (req, res) => {
    res.status(200).json({msg: 'testing NOOOO'})
}
module.exports = {
    getAllProds,
    getAllProdsStatic
}