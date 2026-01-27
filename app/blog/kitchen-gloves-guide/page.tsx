// ============================================================================
// ESSENTIAL GUIDE TO KITCHEN GLOVES - Blog Page (Data-Driven)
// Migrated from inline (539 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { glovesData } from './gloves-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import {
  BlogLayout,
  BlogHero,
  BlogFAQ,
  BlogEmailCapture
} from '@/components/blog'
import AuthorBio from '@/components/review/AuthorBio'
import { getBlogMetadata } from '@/data/metadata'

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('kitchen-gloves-guide')

export default function KitchenGlovesGuide() {
  const blogMeta = getBlogMetadata('kitchen-gloves-guide')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'kitchen-gloves-guide',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: glovesData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/kitchen-gloves-guide' }
  ])

  const faqSchema = generateFAQSchema(glovesData.faq.questions)

  // Type assertions for complex sections
  const introSection = glovesData.sections[0] as {
    id: string
    content: string[]
  }

  const whySection = glovesData.sections[1] as {
    id: string
    title: string
    intro: string
    functions: { name: string; description: string }[]
    closing: string
  }

  const disposableSection = glovesData.sections[2] as {
    id: string
    title: string
    intro: string
    whenToUse: string[]
    criticalRules: { emphasis: string; description: string }[]
    choosing: { intro: string; criteria: string[] }
  }

  const cutResistantSection = glovesData.sections[3] as {
    id: string
    title: string
    intro: string
    mandolineNote: string
    mandolineLink: string
    whenToUse: { task: string; note: string }[]
    knifeLink: string
    boningKnifeLink: string
    professionalContext: string
    ratings: { intro: string; levels: { range: string; description: string }[]; recommendation: string }
    cuttingBoardLink: string
    limitations: { emphasis: string; description: string }[]
  }

  const layeringSection = glovesData.sections[4] as {
    id: string
    title: string
    intro: string
    tripleLayer: {
      title: string
      intro: string
      layers: { layer: string; description: string }[]
      explanation: string
    }
    proTip: string
    alternative: {
      title: string
      intro: string
      layers: { layer: string; description: string }[]
      note: string
    }
  }

  const protocolsSection = glovesData.sections[5] as {
    id: string
    title: string
    intro: string
    protocols: { task: string; rule: string }[]
    managerPerspective: string
  }

  const maintenanceSection = glovesData.sections[6] as {
    id: string
    title: string
    disposable: { title: string; tips: string[] }
    cutResistant: { title: string; tips: string[] }
    cleanerLink: string
  }

  const mistakesSection = glovesData.sections[7] as {
    id: string
    title: string
    mistakes: { mistake: string; consequence: string }[]
  }

  const safetySystemSection = glovesData.sections[8] as {
    id: string
    title: string
    intro: string
    bundleLink: string
    components: string[]
  }

  const conclusionSection = glovesData.sections[9] as {
    id: string
    title: string
    content: string[]
  }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={glovesData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={glovesData.hero.title}
          introduction={glovesData.hero.introduction}
          publishedDate={blogMeta.publishedDate}
          lastUpdated={blogMeta.lastUpdated}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          {/* Why Kitchen Gloves Matter */}
          <h2>{whySection.title}</h2>
          <p>{whySection.intro}</p>
          <ul>
            {whySection.functions.map((func, index) => (
              <li key={index}>
                <strong>{func.name}:</strong> {func.description}
              </li>
            ))}
          </ul>
          <p>{whySection.closing}</p>

          {/* Disposable Gloves */}
          <h2>{disposableSection.title}</h2>
          <p>{disposableSection.intro}</p>

          <h3>When to Use Disposable Gloves</h3>
          <ul>
            {disposableSection.whenToUse.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>

          <h3>Critical Rules for Disposable Gloves</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
            {disposableSection.criticalRules.map((rule, index) => (
              <p key={index} className={index === disposableSection.criticalRules.length - 1 ? 'mb-0' : ''}>
                <strong>&#9888;&#65039; {rule.emphasis}.</strong> {rule.description}
              </p>
            ))}
          </div>

          <h3>Choosing Disposable Gloves</h3>
          <p>{disposableSection.choosing.intro}</p>
          <ul>
            {disposableSection.choosing.criteria.map((criterion, index) => (
              <li key={index}>{criterion}</li>
            ))}
          </ul>

          {/* Cut-Resistant Gloves */}
          <h2>{cutResistantSection.title}</h2>
          <p>{cutResistantSection.intro}</p>
          <p>
            When using equipment like the{' '}
            <CTAVisibilityTracker
              ctaId="blog-kitchen-gloves-guide-review-link-1"
              position="mid_article"
              productSlug="kitchen-gloves-guide"
              merchant="internal"
            >
              <Link href={cutResistantSection.mandolineLink} className="text-blue-700 underline">Benriner mandoline</Link>
            </CTAVisibilityTracker>
            , {cutResistantSection.mandolineNote}
          </p>

          <h3>When to Use Cut-Resistant Gloves</h3>
          <ul>
            {cutResistantSection.whenToUse.slice(0, 4).map((item, index) => (
              <li key={index}><strong>{item.task}:</strong> {item.note}</li>
            ))}
            <li>
              <strong>{cutResistantSection.whenToUse[4].task}:</strong> Anyone learning to use sharp equipment like{' '}
              <CTAVisibilityTracker
                ctaId="blog-kitchen-gloves-guide-review-link-2"
                position="mid_article"
                productSlug="kitchen-gloves-guide"
                merchant="internal"
              >
                <Link href={cutResistantSection.knifeLink} className="text-blue-700 underline">professional chef knives</Link>
              </CTAVisibilityTracker>{' '}
              or{' '}
              <CTAVisibilityTracker
                ctaId="blog-kitchen-gloves-guide-review-link-3"
                position="mid_article"
                productSlug="kitchen-gloves-guide"
                merchant="internal"
              >
                <Link href={cutResistantSection.boningKnifeLink} className="text-blue-700 underline">boning knives</Link>
              </CTAVisibilityTracker>
            </li>
          </ul>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>Professional Context:</strong> {cutResistantSection.professionalContext}
            </p>
          </div>

          <h3>Understanding Cut-Resistant Ratings</h3>
          <p>{cutResistantSection.ratings.intro}</p>
          <ul>
            {cutResistantSection.ratings.levels.map((level, index) => (
              <li key={index}><strong>{level.range}:</strong> {level.description}</li>
            ))}
          </ul>
          <p>
            {cutResistantSection.ratings.recommendation} Essential when working at your{' '}
            <CTAVisibilityTracker
              ctaId="blog-kitchen-gloves-guide-review-link-4"
              position="mid_article"
              productSlug="kitchen-gloves-guide"
              merchant="internal"
            >
              <Link href={cutResistantSection.cuttingBoardLink} className="text-blue-700 underline">cutting board station</Link>
            </CTAVisibilityTracker>.
          </p>

          <h3>Important Limitations</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
            {cutResistantSection.limitations.map((limit, index) => (
              <p key={index} className={index === cutResistantSection.limitations.length - 1 ? 'mb-0' : ''}>
                <strong>&#9888;&#65039; {limit.emphasis}.</strong> {limit.description}
              </p>
            ))}
          </div>

          {/* Layering Technique */}
          <h2>{layeringSection.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: layeringSection.intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          <h3>{layeringSection.tripleLayer.title}</h3>
          <p>{layeringSection.tripleLayer.intro}</p>
          <ol>
            {layeringSection.tripleLayer.layers.map((layer, index) => (
              <li key={index}><strong>{layer.layer}:</strong> {layer.description}</li>
            ))}
          </ol>
          <p>{layeringSection.tripleLayer.explanation}</p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <p className="mb-0"><strong>Pro Tip:</strong> {layeringSection.proTip}</p>
          </div>

          <h3>{layeringSection.alternative.title}</h3>
          <p>{layeringSection.alternative.intro}</p>
          <ol>
            {layeringSection.alternative.layers.map((layer, index) => (
              <li key={index}><strong>{layer.layer}:</strong> {layer.description}</li>
            ))}
          </ol>
          <p>{layeringSection.alternative.note}</p>

          {/* Professional Protocols */}
          <h2>{protocolsSection.title}</h2>
          <p>{protocolsSection.intro}</p>
          <ul>
            {protocolsSection.protocols.map((protocol, index) => (
              <li key={index}><strong>{protocol.task}:</strong> {protocol.rule}</li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <p className="mb-0"><strong>Kitchen Manager Perspective:</strong> {protocolsSection.managerPerspective}</p>
          </div>

          {/* Maintenance */}
          <h2>{maintenanceSection.title}</h2>

          <h3>{maintenanceSection.disposable.title}</h3>
          <ul>
            {maintenanceSection.disposable.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>

          <h3>{maintenanceSection.cutResistant.title}</h3>
          <ul>
            {maintenanceSection.cutResistant.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>

          <p>
            Combine with proper cleaning using{' '}
            <CTAVisibilityTracker
              ctaId="blog-kitchen-gloves-guide-review-link-5"
              position="mid_article"
              productSlug="kitchen-gloves-guide"
              merchant="internal"
            >
              <Link href={maintenanceSection.cleanerLink} className="text-blue-700 underline">non-toxic cleaners</Link>
            </CTAVisibilityTracker>{' '}
            for complete food safety in your kitchen.
          </p>

          {/* Common Mistakes */}
          <h2>{mistakesSection.title}</h2>
          <ul>
            {mistakesSection.mistakes.map((item, index) => (
              <li key={index}><strong>{item.mistake}:</strong> {item.consequence}</li>
            ))}
          </ul>

          {/* Safety System */}
          <h2>{safetySystemSection.title}</h2>
          <p>
            {safetySystemSection.intro.replace('professional kitchen safety kit', '')}
            <CTAVisibilityTracker
              ctaId="blog-kitchen-gloves-guide-bundle-link-1"
              position="mid_article"
              productSlug="kitchen-gloves-guide"
              merchant="internal"
            >
              <Link href={safetySystemSection.bundleLink} className="text-blue-700 underline">professional kitchen safety kit</Link>
            </CTAVisibilityTracker>
            , proper protection also includes:
          </p>
          <ul>
            {safetySystemSection.components.map((component, index) => (
              <li key={index}>{component}</li>
            ))}
          </ul>

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={glovesData.faq.questions} />

        {/* Related Articles */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {glovesData.relatedArticles.map((article, index) => (
              <Link key={index} href={article.href} className="block bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-900 mb-2">{article.title}</h4>
                <p className="text-slate-700 text-sm">{article.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
