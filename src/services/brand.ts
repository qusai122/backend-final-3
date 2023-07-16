import { Brand } from '@/models/Brand';

export async function getAllBrands() {
  try {
    return await Brand.findAll();
  } catch (e) {
    return e;
  }
}
