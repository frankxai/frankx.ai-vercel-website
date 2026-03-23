import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const QUEUE_FILE = join(process.cwd(), 'data', 'content-queue', 'queue.json');

interface QueueTask {
  id: string;
  type: string;
  params: Record<string, string>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  result?: string;
}

interface ContentQueue {
  pending: QueueTask[];
  completed: QueueTask[];
}

export async function GET() {
  try {
    if (!existsSync(QUEUE_FILE)) {
      return NextResponse.json({ pending: [], completed: [] });
    }

    const queueData = readFileSync(QUEUE_FILE, 'utf-8');
    const queue: ContentQueue = JSON.parse(queueData);

    return NextResponse.json(queue);
  } catch (error) {
    console.error('Failed to load queue:', error);
    return NextResponse.json({ pending: [], completed: [] });
  }
}
