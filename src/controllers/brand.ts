import { Product } from '@/models/Product';
import { Brand } from '@/models/Brand';
import { createProductFilter, getProductsByFilter } from '@/services/product';
import { getAllBrands } from '@/services/brand';
import { RequestHandler, Request, Response } from 'express';
const { Op } = require('sequelize');

export const getBrands: RequestHandler = async (req, res) => {
  try {
    const result = await getAllBrands();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getBrandProducts: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getProductsByFilter({ brand_id: id });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
