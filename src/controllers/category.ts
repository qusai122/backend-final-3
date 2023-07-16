import { getCategories } from '@/services/category';
import { RequestHandler } from 'express';
import { getProductsByFilter } from '@/services/product';
const { Op } = require('sequelize');

export const getAllCategories: RequestHandler = async (req, res) => {
  try {
    const result = await getCategories();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getCategoryProducts: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getProductsByFilter({ category_id: id });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
