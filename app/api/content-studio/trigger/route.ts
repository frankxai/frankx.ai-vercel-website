import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const QUEUE_DIR = join(process.cwd(), 'data', 'content-queue');
const QUEUE_FILE = join(QUEUE_DIR, 'queue.json');

interface QueueTask {
  id: string;
  type: string;
  params: Record<string, string>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
}

interface ContentQueue {
  pending: QueueTask[];
  completed: QueueTask[];
}

function loadQueue(): ContentQueue {
  if (!existsSync(QUEUE_FILE)) {
    return { pending: [], completed: [] };
  }
  const data = readFileSync(QUEUE_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveQueue(queue: ContentQueue) {
  if (!existsSync(QUEUE_DIR)) {
    mkdirSync(QUEUE_DIR, { recursive: true });
  }
  writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, params = {} } = body;

    if (!action) {
      return NextResponse.json({ error: 'Action required' }, { status: 400 });
    }

    const queue = loadQueue();

    // Create new task
    const task: QueueTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: action,
      params,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    queue.pending.push(task);
    saveQueue(queue);

    // Log for Claude Code watcher to pick up
    console.log(`[Content Studio] New task queued: ${action}`, params);

    return NextResponse.json({
      success: true,
      taskId: task.id,
      message: `Task "${action}" queued. Run Claude Code watcher to process.`,
    });
  } catch (error) {
    console.error('Failed to queue task:', error);
    return NextResponse.json({ error: 'Failed to queue task' }, { status: 500 });
  }
}
