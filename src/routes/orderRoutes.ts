import { Router, Request, Response } from 'express';
import { OrderService } from '../services';

const router = Router();
const orderService = new OrderService();

// GET /api/orders - Get all orders
router.get('/', (req: Request, res: Response) => {
  try {
    const orders = orderService.getAllOrders();
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/orders/:id - Get order by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    const order = orderService.getOrderById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/orders - Create new order
router.post('/', (req: Request, res: Response) => {
  try {
    const { customerId, items } = req.body;

    if (!customerId || !items) {
      return res.status(400).json({ error: 'CustomerId and items are required' });
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items must be an array' });
    }

    for (const item of items) {
      if (!item.shopItemId || !item.quantity) {
        return res.status(400).json({ error: 'Each item must have shopItemId and quantity' });
      }
    }

    const order = orderService.createOrder({ customerId, items });
    return res.status(201).json(order);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// PUT /api/orders/:id - Update order
router.put('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    const { customerId, items } = req.body;
    const updates: any = {};
    
    if (customerId !== undefined) updates.customerId = customerId;
    if (items !== undefined) {
      if (!Array.isArray(items)) {
        return res.status(400).json({ error: 'Items must be an array' });
      }

      for (const item of items) {
        if (!item.shopItemId || !item.quantity) {
          return res.status(400).json({ error: 'Each item must have shopItemId and quantity' });
        }
      }
      updates.items = items;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'At least one field must be provided for update' });
    }

    const order = orderService.updateOrder(id, updates);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.json(order);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// DELETE /api/orders/:id - Delete order
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    const success = orderService.deleteOrder(id);
    if (!success) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;