/**
 * Voice Search Optimization Pipeline
 * 
 * Optimize content for voice search queries:
 * - Convert content to voice-friendly FAQ format
 * - Generate speakable schema markup
 * - Optimize for conversational queries
 * - Create voice-friendly content structures
 * 
 * @pipeline voice-search
 * @version 1.0.0
 */

import { log } from '../../../utils/logger';
import type {
  VoiceSearchRequest,
  VoiceSearchResult,
  FAQItem,
  ConversationalQuery,
  VoiceSearchOptimization
} from '../../types';

export interface VoiceSearchConfig {
  targetQueries: string[];
  questionPatterns: string[];
  answerLength: number;
  includeSchema: boolean;
  includeFAQ: boolean;
  includeSpeakable: boolean;
  tone: 'professional' | 'casual' | 'friendly';
  maxQuestions: number;
}

const DEFAULT_CONFIG: VoiceSearchConfig = {
  targetQueries: [],
  questionPatterns: [
    'who is',
    'what is',
    'what are',
    'how to',
    'how does',
    'why is',
    'where is',
    'when did',
    'can i',
    'is there',
    'do you',
    'should i',
    'which is',
    'tell me about'
  ],
  answerLength: 30,
  includeSchema: true,
  includeFAQ: true,
  includeSpeakable: true,
  tone: 'professional',
  maxQuestions: 10
};

export interface ConversationalPhrase {
  query: string;
  fullQuery: string;
  question: string;
  answer: string;
  confidence: number;
}

export interface VoiceQuery {
  query: string;
  question: string;
  expectedAnswer: string;
  sourceContent: string;
  optimizationScore: number;
}

function extractQuestions(text: string, patterns: string[]): string[] {
  const questions: string[] = [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  for (const sentence of sentences) {
    const trimmed = sentence.trim().toLowerCase();
    
    for (const pattern of patterns) {
      if (trimmed.includes(pattern)) {
        const question = sentence.trim() + '?';
        if (!questions.includes(question)) {
          questions.push(question);
        }
        break;
      }
    }
  }
  
  return questions;
}

function generateConversationalQueries(
  content: string,
  config: VoiceSearchConfig
): ConversationalQuery[] {
  const queries: ConversationalQuery[] = [];
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    
    for (const pattern of config.questionPatterns) {
      if (trimmed.toLowerCase().includes(pattern)) {
        const question = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        
        queries.push({
          query: pattern,
          fullQuery: question,
          question,
          answer: trimmed,
          confidence: 0.8
        });
        
        break;
      }
    }
  }
  
  return queries;
}

function generateFAQFromContent(
  content: string,
  config: VoiceSearchConfig
): FAQItem[] {
  const faqs: FAQItem[] = [];
  const questions = extractQuestions(content, config.questionPatterns);
  
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  for (const question of questions.slice(0, config.maxQuestions)) {
    let bestAnswer = '';
    let bestScore = 0;
    
    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      const questionLower = question.toLowerCase();
      
      let score = 0;
      
      if (trimmed.toLowerCase().includes(questionLower)) {
        score += 0.3;
      }
      
      if (trimmed.length >= config.answerLength && trimmed.length <= config.answerLength * 3) {
        score += 0.4;
      }
      
      if (trimmed.includes('is') || trimmed.includes('are') || trimmed.includes('can') || trimmed.includes('does')) {
        score += 0.2;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestAnswer = trimmed;
      }
    }
    
    if (bestAnswer && !faqs.find(f => f.question === question)) {
      faqs.push({
        question,
        answer: bestAnswer,
        confidence: bestScore
      });
    }
  }
  
  return faqs;
}

function optimizeForConversationalTone(
  content: string,
  tone: 'professional' | 'casual' | 'friendly'
): string {
  let optimized = content;
  
  const transformations = {
    professional: [
      { from: 'you should', to: 'it is recommended to' },
      { from: 'you need', to: 'it is necessary to' },
      { from: 'get', to: 'obtain' },
      { from: 'find', to: 'locate' },
      { from: 'use', to: 'utilize' }
    ],
    casual: [
      { from: 'it is recommended to', to: 'you should' },
      { from: 'it is necessary to', to: 'you need to' },
      { from: 'obtain', to: 'get' },
      { from: 'locate', to: 'find' },
      { from: 'utilize', to: 'use' }
    ],
    friendly: [
      { from: 'it is recommended to', to: 'you might want to' },
      { from: 'it is necessary to', to: 'you\'ll want to' },
      { from: 'however', to: 'but' },
      { from: 'therefore', to: 'so' },
      { from: 'furthermore', to: 'also' }
    ]
  };
  
  const rules = transformations[tone];
  
  for (const rule of rules) {
    const regex = new RegExp(rule.from, 'gi');
    optimized = optimized.replace(regex, rule.to);
  }
  
  return optimized;
}

function calculateVoiceSearchScore(
  content: string,
  faqs: FAQItem[],
  config: VoiceSearchConfig
): number {
  let score = 0;
  
  if (faqs.length > 0) score += 20;
  if (faqs.length >= 5) score += 15;
  if (faqs.length >= 10) score += 15;
  
  const avgAnswerLength = faqs.reduce((sum, f) => sum + f.answer.length, 0) / (faqs.length || 1);
  if (avgAnswerLength >= 20 && avgAnswerLength <= 60) score += 20;
  
  const hasConversationalContent = config.questionPatterns.some(pattern =>
    content.toLowerCase().includes(pattern)
  );
  if (hasConversationalContent) score += 15;
  
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / (sentences.length || 1);
  if (avgSentenceLength >= 10 && avgSentenceLength <= 20) score += 15;
  
  if (content.length >= 500) score += 10;
  
  return Math.min(100, score);
}

function generateSpeakableCSSSelectors(content: string): string[] {
  const selectors: string[] = [];
  
  const h1Match = content.match(/<h1[^>]*>([^<]*)<\/h1>/i);
  if (h1Match) {
    selectors.push('h1');
  }
  
  const pMatches = content.match(/<p[^>]*>([^<]*)<\/p>/gi);
  if (pMatches && pMatches.length > 0) {
    selectors.push('p:first-of-type');
    if (pMatches.length > 1) {
      selectors.push('p:nth-of-type(2)');
    }
  }
  
  const h2Matches = content.match(/<h2[^>]*>([^<]*)<\/h2>/gi);
  if (h2Matches && h2Matches.length > 0) {
    selectors.push('h2');
  }
  
  const liMatches = content.match(/<li[^>]*>([^<]*)<\/li>/gi);
  if (liMatches && liMatches.length > 0) {
    selectors.push('li:first-of-type');
  }
  
  return selectors;
}

function generateSchemaMarkup(faqs: FAQItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
  
  return JSON.stringify(schema, null, 2);
}

function generateSpeakableSchema(selectors: string[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: selectors
    }
  };
  
  return JSON.stringify(schema, null, 2);
}

function extractKeyPhrases(text: string): string[] {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need',
    'this', 'that', 'these', 'those', 'it', 'its'
  ]);
  
  const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  const wordFreq = new Map<string, number>();
  
  for (const word of words) {
    if (!stopWords.has(word)) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  }
  
  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);
}

export async function executeVoiceSearch_pipeline(
  request: VoiceSearchRequest
): Promise<VoiceSearchResult> {
  const pipelineId = `voiceseo-${Date.now()}`;
  const startTime = Date.now();
  
  log.info({ requestId: pipelineId }, 'Starting Voice Search Optimization Pipeline');
  
  const config = { ...DEFAULT_CONFIG, ...request.config };
  
  try {
    const content = request.content || '';
    
    if (!content) {
      throw new Error('Content is required for voice search optimization');
    }
    
    const optimizedContent = optimizeForConversationalTone(content, config.tone);
    
    const faqs = generateFAQFromContent(optimizedContent, config);
    
    const conversationalQueries = generateConversationalQueries(optimizedContent, config);
    
    const speakableSelectors = generateSpeakableCSSSelectors(content);
    
    const faqSchema = config.includeFAQ ? generateSchemaMarkup(faqs) : undefined;
    const speakableSchema = config.includeSpeakable ? generateSchemaMarkup(speakableSelectors) : undefined;
    
    const voiceSearchScore = calculateVoiceSearchScore(content, faqs, config);
    
    const keyPhrases = extractKeyPhrases(content);
    
    const recommendations: string[] = [];
    
    if (faqs.length < 5) {
      recommendations.push('Add more FAQ questions to capture voice queries');
    }
    
    if (voiceSearchScore < 70) {
      recommendations.push('Simplify sentence structure for better voice readability');
    }
    
    if (!config.includeSchema) {
      recommendations.push('Enable schema markup to improve voice search visibility');
    }
    
    if (conversationalQueries.length < 3) {
      recommendations.push('Use more conversational language patterns');
    }
    
    const duration = Date.now() - startTime;
    
    log.info({ requestId: pipelineId, duration, score: voiceSearchScore }, 'Voice Search Optimization completed');
    
    return {
      success: true,
      data: {
        pipelineId,
        timestamp: new Date().toISOString(),
        overallScore: voiceSearchScore,
        optimizedContent,
        faqs,
        conversationalQueries,
        schemaMarkup: {
          faq: faqSchema,
          speakable: speakableSchema
        },
        keyPhrases,
        recommendations,
        summary: {
          status: voiceSearchScore >= 70 ? 'optimized' : 'needs_improvement',
          faqCount: faqs.length,
          queryCount: conversationalQueries.length,
          estimatedVoiceTrafficIncrease: voiceSearchScore >= 70 ? '30-50%' : '10-20%'
        }
      },
      metadata: {
        pipelineId,
        startedAt: new Date(startTime).toISOString(),
        completedAt: new Date().toISOString(),
        duration,
        version: '1.0.0'
      }
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    
    log.error({ 
      requestId: pipelineId, 
      error: error instanceof Error ? error.message : 'Unknown error',
      duration 
    }, 'Voice Search Optimization failed');
    
    return {
      success: false,
      error: {
        code: 'VOICESEARCH_PIPELINE_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined
      },
      metadata: {
        pipelineId,
        startedAt: new Date(startTime).toISOString(),
        completedAt: new Date().toISOString(),
        duration,
        version: '1.0.0'
      }
    };
  }
}

export { extractQuestions, generateConversationalQueries, generateFAQFromContent, optimizeForConversationalTone, calculateVoiceSearchScore, generateSpeakableCSSSelectors, extractKeyPhrases };
