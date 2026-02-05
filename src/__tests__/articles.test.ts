import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const ARTICLES_DIR = path.join(process.cwd(), 'src/app/articles')

// Get all article directories (excluding _template)
function getArticleDirs(): string[] {
  return fs.readdirSync(ARTICLES_DIR)
    .filter(dir => !dir.startsWith('_') && !dir.startsWith('.'))
    .filter(dir => fs.statSync(path.join(ARTICLES_DIR, dir)).isDirectory())
}

describe('Article Structure', () => {
  const articles = getArticleDirs()

  it('should have at least one article', () => {
    expect(articles.length).toBeGreaterThan(0)
  })

  articles.forEach(article => {
    describe(`${article}`, () => {
      const articlePath = path.join(ARTICLES_DIR, article, 'page.tsx')

      it('should have a page.tsx file', () => {
        expect(fs.existsSync(articlePath)).toBe(true)
      })

      it('should contain DATA object', () => {
        const content = fs.readFileSync(articlePath, 'utf-8')
        expect(content).toContain('const DATA')
      })

      it('should contain SOURCES array', () => {
        const content = fs.readFileSync(articlePath, 'utf-8')
        expect(content).toContain('const SOURCES')
      })

      it('should have data-theme attribute', () => {
        const content = fs.readFileSync(articlePath, 'utf-8')
        expect(content).toMatch(/data-theme=["']/)
      })

      it('should import shared components', () => {
        const content = fs.readFileSync(articlePath, 'utf-8')
        expect(content).toContain('ArticleEndCTA')
        expect(content).toContain('SourcesCitations')
        expect(content).toContain('SubscribeBar')
      })

      it('should have at least 3 sources', () => {
        const content = fs.readFileSync(articlePath, 'utf-8')
        // Count source objects (rough match for { title:, outlet:, url: })
        const sourceMatches = content.match(/{\s*title:/g)
        expect(sourceMatches?.length || 0).toBeGreaterThanOrEqual(3)
      })
    })
  })
})

describe('Source URLs', () => {
  const articles = getArticleDirs()

  articles.forEach(article => {
    it(`${article} sources should have valid URL format`, () => {
      const articlePath = path.join(ARTICLES_DIR, article, 'page.tsx')
      const content = fs.readFileSync(articlePath, 'utf-8')

      // Extract URLs from the file
      const urlMatches = content.match(/url:\s*["']([^"']+)["']/g)

      urlMatches?.forEach(match => {
        const url = match.match(/["']([^"']+)["']/)?.[1]
        if (url) {
          expect(url).toMatch(/^https?:\/\//)
        }
      })
    })
  })
})

describe('Template', () => {
  const templatePath = path.join(ARTICLES_DIR, '_template', 'page.tsx.example')

  it('should exist', () => {
    expect(fs.existsSync(templatePath)).toBe(true)
  })

  it('should contain required structure', () => {
    const content = fs.readFileSync(templatePath, 'utf-8')
    expect(content).toContain('const DATA')
    expect(content).toContain('const SOURCES')
    expect(content).toContain('ArticleEndCTA')
    expect(content).toContain('SourcesCitations')
    expect(content).toContain('SubscribeBar')
    expect(content).toContain('data-theme')
  })
})
