import type { ParserSpec, ParserInput, ParserResult } from './spec.js';
/**
 * Extracts and parses YAML design tokens from DESIGN.md content.
 * Supports two embedding modes: frontmatter (---) and fenced yaml code blocks.
 * Never throws — all errors returned as ParserResult failures.
 */
export declare class ParserHandler implements ParserSpec {
    execute(input: ParserInput): ParserResult;
    /**
     * Merge multiple code blocks into a single ParsedDesignSystem.
     * Detects duplicate top-level sections across blocks.
     */
    private mergeCodeBlocks;
    /**
     * Map a raw parsed object to the ParsedDesignSystem interface.
     */
    private toDesignSystem;
    private extractHeadingText;
}
