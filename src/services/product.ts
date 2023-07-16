const { Op } = require('sequelize');
import { Product } from '@/models/Product';
import { ParsedQs } from 'qs';

export async function getProductsByFilter(filter) {
  try {
    return await Product.findAll({
      where: filter,
    });
  } catch (e) {
    return e;
  }
}

export function createProductFilter(query: ParsedQs) {
  const {
    quantity,
    discount,
    rating,
    isNew,
    handpicked,
    minPrice,
    maxPrice,
    brand_id,
    category_id,
  } = query;

  const filter = {};

  if (quantity) {
    filter['quantity'] = {
      [Op.lt]: quantity,
    };
  }

  if (discount) {
    filter['discount'] = {
      [Op.gte]: discount,
    };
  }
  if (rating) {
    filter['rating'] = {
      [Op.gte]: rating,
    };
  }
  if (handpicked == '1') {
    filter['rating'] = {
      [Op.gte]: 4.5,
    };
    filter['price'] = {
      [Op.lt]: 100,
    };
  }
  if (isNew == '1') {
    const threeMonthsAgo = getNewArrivalsEarliestDate();
    filter['createdAt'] = {
      [Op.gte]: threeMonthsAgo,
    };
  }
  if (minPrice && maxPrice) {
    filter['price'] = {
      [Op.between]: [minPrice, maxPrice],
    };
  } else if (minPrice) {
    filter['price'] = {
      [Op.gte]: minPrice,
    };
  } else if (maxPrice) {
    filter['price'] = {
      [Op.lte]: maxPrice,
    };
  }
  console.log(filter);
  return filter;
}

export function getNewArrivalsEarliestDate() {
  const date = new Date();
  date.setMonth(date.getMonth() - 3);
  return date;
}
