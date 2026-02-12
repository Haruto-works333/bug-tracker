import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// バグ一覧取得
router.get('/', async (req, res) => {
  try {
    const { status, priority } = req.query;
    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;

    const bugs = await prisma.bug.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bugs' });
  }
});

// バグ詳細取得
router.get('/:id', async (req, res) => {
  try {
    const bug = await prisma.bug.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!bug) {
      return res.status(404).json({ error: 'Bug not found' });
    }
    res.json(bug);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bug' });
  }
});

// バグ新規作成
router.post('/', async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const bug = await prisma.bug.create({
      data: {
        title,
        description,
        priority: priority || 'medium',
      },
    });
    res.status(201).json(bug);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create bug' });
  }
});

// バグ更新
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const bug = await prisma.bug.update({
      where: { id: Number(req.params.id) },
      data: { title, description, status, priority },
    });
    res.json(bug);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update bug' });
  }
});

// バグ削除
router.delete('/:id', async (req, res) => {
  try {
    await prisma.bug.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete bug' });
  }
});

export default router;