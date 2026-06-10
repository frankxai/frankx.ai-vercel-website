import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { requireAdmin } from '@/lib/admin-auth';

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
    // Auth: this enqueues tasks an automated watcher later executes, so it must
    // not be open to anonymous callers (prompt-injection / queue-poisoning risk).
    const denied = requireAdmin(request);
    if (denied) return denied;

    // Safe parse: bad/empty/non-object bodies return 400, not a 500.
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid JSON or request body' }, { status: 400 });
    }
    const { action, params = {} } = body;

    // Validate action: short, safe identifier only.
    if (typeof action !== 'string' || !/^[a-z0-9:_-]{1,64}$/i.test(action)) {
      return NextResponse.json({ error: 'Invalid or missing action' }, { status: 400 });
    }

    // Validate params: plain object of string values (matches QueueTask), bounded size.
    if (params === null || typeof params !== 'object' || Array.isArray(params)) {
      return NextResponse.json({ error: 'params must be an object' }, { status: 400 });
    }
    for (const value of Object.values(params)) {
      if (typeof value !== 'string') {
        return NextResponse.json({ error: 'params values must be strings' }, { status: 400 });
      }
    }
    if (JSON.stringify(params).length > 4000) {
      return NextResponse.json({ error: 'params too large' }, { status: 413 });
    }

    const queue = loadQueue();

    // Cap queue growth to prevent unbounded disk/queue flooding.
    if (queue.pending.length >= 500) {
      return NextResponse.json({ error: 'Queue is full; try again later' }, { status: 429 });
    }

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
