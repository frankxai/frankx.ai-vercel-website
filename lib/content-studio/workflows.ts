import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { ContentStudioData, WorkflowConfig } from '@/types/content-studio'

const DATA_FILE = join(process.cwd(), 'data', 'content-studio.json')

function readData(): ContentStudioData {
  try {
    const fileContent = readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('[Workflows] Failed to read data file:', error)
    return {
      accounts: [],
      posts: [],
      workflows: [],
      lastUpdated: new Date().toISOString()
    }
  }
}

function writeData(data: ContentStudioData): void {
  try {
    data.lastUpdated = new Date().toISOString()
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error('[Workflows] Failed to write data file:', error)
    throw error
  }
}

export function getAllWorkflows(): WorkflowConfig[] {
  const data = readData()
  return data.workflows
}

export function getWorkflowById(workflowId: string): WorkflowConfig | null {
  const data = readData()
  return data.workflows.find(w => w.id === workflowId) || null
}

export function getEnabledWorkflows(): WorkflowConfig[] {
  const data = readData()
  return data.workflows.filter(w => w.enabled)
}

export function createWorkflow(workflow: Omit<WorkflowConfig, 'id'>): WorkflowConfig {
  const data = readData()

  const newWorkflow: WorkflowConfig = {
    ...workflow,
    id: `workflow_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  data.workflows.push(newWorkflow)
  writeData(data)

  return newWorkflow
}

export function updateWorkflow(workflowId: string, updates: Partial<Omit<WorkflowConfig, 'id'>>): WorkflowConfig | null {
  const data = readData()
  const workflowIndex = data.workflows.findIndex(w => w.id === workflowId)

  if (workflowIndex === -1) {
    return null
  }

  data.workflows[workflowIndex] = {
    ...data.workflows[workflowIndex],
    ...updates
  }

  writeData(data)
  return data.workflows[workflowIndex]
}

export function deleteWorkflow(workflowId: string): boolean {
  const data = readData()
  const initialLength = data.workflows.length
  data.workflows = data.workflows.filter(w => w.id !== workflowId)

  if (data.workflows.length < initialLength) {
    writeData(data)
    return true
  }

  return false
}

/**
 * Execute a workflow by ID
 * This would be called by a cron job or webhook
 */
export async function executeWorkflow(workflowId: string): Promise<{ success: boolean; error?: string }> {
  const workflow = getWorkflowById(workflowId)

  if (!workflow) {
    return { success: false, error: 'Workflow not found' }
  }

  if (!workflow.enabled) {
    return { success: false, error: 'Workflow is disabled' }
  }

  try {
    // Execute each action in sequence
    for (const action of workflow.actions) {
      await executeAction(action, workflow)
    }

    return { success: true }
  } catch (error) {
    console.error('[Workflow Execution] Error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

async function executeAction(action: WorkflowConfig['actions'][0], workflow: WorkflowConfig) {
  switch (action.type) {
    case 'generate_linkedin':
      // Generate LinkedIn post from latest blog
      console.log('[Workflow] Generating LinkedIn post', { action, workflow })
      break
    
    case 'generate_twitter':
      // Generate Twitter thread from latest blog
      console.log('[Workflow] Generating Twitter thread', { action, workflow })
      break
    
    case 'generate_instagram':
      // Generate Instagram post from latest blog
      console.log('[Workflow] Generating Instagram post', { action, workflow })
      break
    
    case 'publish':
      // Publish scheduled posts via MCP
      console.log('[Workflow] Publishing posts', { action, workflow })
      break
    
    case 'notify':
      // Send notification
      console.log('[Workflow] Sending notification', { action, workflow })
      break
    
    default:
      console.warn('[Workflow] Unknown action type:', action.type)
  }
}
