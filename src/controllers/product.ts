import { Brand } from '@/models/Brand';
import { Product } from '@/models/Product';
import { RequestHandler, Request, Response } from 'express';
import { ParsedQs } from 'qs';
const { Op } = require('sequelize');

export const search: RequestHandler = async (req, res) => {
  const { keyword } = req.query;

  const products = await Product.findAll({
    include: [
      {
        model: Brand,
      },
    ],
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${keyword}%` } },
        { '$brand.name$': { [Op.like]: `%${keyword}%` } },
      ],
    },
  });

  try {
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getLimitedEdition: RequestHandler = async (req, res) => {
  req.query.quantity = '20';
  const filter = createFilter(req.query);
  try {
    const result = await getProductsByFilter(filter);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const Popular: RequestHandler = async (req, res) => {
  req.query.rating = '4.5';
  const filter = createFilter(req.query);
  try {
    const result = await getProductsByFilter(filter);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const newArrivals: RequestHandler = async (req, res) => {
  req.query.isNew = '1';
  const filter = createFilter(req.query);
  try {
    const result = await getProductsByFilter(filter);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const Handpicked: RequestHandler = async (req, res) => {
  req.query.handpicked = '1';
  const filter = createFilter(req.query);
  try {
    const result = await getProductsByFilter(filter);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getProducts: RequestHandler = async (req, res) => {
  const filter = createFilter(req.query);

  try {
    const result = await getProductsByFilter(filter);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

async function getProductsByFilter(filter) {
  return await Product.findAll({
    where: filter,
  });
}

function createFilter(query: ParsedQs) {
  const { limited } = query;
  const { discount } = query;
  const { rating } = query;
  const { isNew } = query;
  const { handpicked } = query;
  const { minPrice } = query;
  const { maxPrice } = query;
  let filter = {};

  if (limited == '1') {
    filter['quantity'] = {
      [Op.lt]: 20,
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
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
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
