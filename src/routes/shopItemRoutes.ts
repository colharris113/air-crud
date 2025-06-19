import { Router, Request, Response } from 'express';
import { ShopItemService } from '../services';

const router = Router();
const shopItemService = new ShopItemService();

// GET /api/shop-items - Get all shop items
router.get('/', (req: Request, res: Response) => {
  try {
    const items = shopItemService.getAllItems();
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/shop-items/:id - Get shop item by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid shop item ID' });
    }

    const item = shopItemService.getItemById(id);
    if (!item) {
      return res.status(404).json({ error: 'Shop item not found' });
    }

    return res.json(item);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/shop-items - Create new shop item
router.post('/', (req: Request, res: Response) => {
  try {
    const { title, description, price, categoryIds } = req.body;

    if (!title || !description || price === undefined || !categoryIds) {
      return res.status(400).json({ error: 'Title, description, price, and categoryIds are required' });
    }

    if (!Array.isArray(categoryIds)) {
      return res.status(400).json({ error: 'categoryIds must be an array' });
    }

    const item = shopItemService.createItem({ title, description, price, categoryIds });
    return res.status(201).json(item);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// PUT /api/shop-items/:id - Update shop item
router.put('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid shop item ID' });
    }

    const { title, description, price, categoryIds } = req.body;
    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = price;
    if (categoryIds !== undefined) {
      if (!Array.isArray(categoryIds)) {
        return res.status(400).json({ error: 'categoryIds must be an array' });
      }
      updates.categoryIds = categoryIds;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'At least one field must be provided for update' });
    }

    const item = shopItemService.updateItem(id, updates);
    if (!item) {
      return res.status(404).json({ error: 'Shop item not found' });
    }

    return res.json(item);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// DELETE /api/shop-items/:id - Delete shop item
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid shop item ID' });
    }

    const success = shopItemService.deleteItem(id);
    if (!success) {
      return res.status(404).json({ error: 'Shop item not found' });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;