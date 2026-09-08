import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SectionHeading, StarRating, SampleBadge, EmptyState } from '@/components/ui'
import type { Service, PortfolioProject, Review, Publication } from '@/lib/types'
import { displayReviewerName } from '@/lib/types'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import ReviewsMarquee from '@/components/ReviewsMarquee'
import ScienceBackdrop from '@/components/ScienceBackdrop'

export const revalidate = 0

export default async function HomePage() {
  const supabase = createClient()

  const [{ data: settings }, { data: profile }, { data: services }, { data: portfolio }, { data: reviews }, { data: marqueeReviews }] =
    await Promise.all([
      supabase.from('site_settings').select('*').single(),
      supabase.from('profile').select('*').single(),
      supabase.from('services').select('*').eq('is_published', true).order('sort_order').limit(6),
      supabase.from('portfolio_projects').select('*').eq('is_published', true).eq('visibility', 'public').order('sort_order').limit(3),
      supabase.from('reviews').select('*').eq('status', 'approved').order('created_at', { ascending: false }).limit(3),
      supabase.from('reviews').select('*').eq('status', 'approved').order('rating', { ascending: false }).limit(10),
    ])

  const allReviewsRes = await supabase.from('reviews').select('rating').eq('status', 'approved')
  const allRatings = (allReviewsRes.data || []).map(r => r.rating)
  const avgRating = allRatings.length ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1) : null

  return (
    <>
      {/* REVIEWS TICKER */}
      <ReviewsMarquee reviews={(marqueeReviews as Review[]) || []} />

      {/* HERO */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        <ScienceBackdrop />
        <div className="relative container-page py-24 md:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <p className="text-teal-400 font-semibold uppercase tracking-wider text-sm mb-4">Scientific Research &amp; Academic Consultancy</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">{settings?.homepage_headline}</h1>
            <p className="mt-6 text-gray-300 text-lg max-w-xl">{settings?.homepage_description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">{settings?.cta_text || 'Book a Consultation'} <ArrowRight size={18} /></Link>
              <Link href="/portfolio" className="btn-secondary !text-white !border-white/40 hover:!bg-white hover:!text-navy-950">View Portfolio</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            {[
              { label: 'Clients Served', value: settings?.stat_clients_served },
              { label: 'Projects Completed', value: settings?.stat_projects_completed },
              { label: 'Publications', value: settings?.stat_publications },
              { label: 'Years Experience', value: settings?.stat_years_experience },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-lg p-6 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
                <p className="text-3xl font-bold text-teal-400">{s.value ?? 0}</p>
                <p className="text-sm text-gray-300 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section container-page">
        <SectionHeading eyebrow="What I Offer" title="Research Services" description="Comprehensive support across the full research lifecycle." />
        {services && services.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {(services as Service[]).map(s => (
              <div key={s.id} className="card card-hover p-6">
                {s.title.startsWith('[SAMPLE]') && <SampleBadge />}
                <h3 className="font-serif text-xl font-bold text-navy-950 mt-2">{s.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{s.short_description}</p>
                {s.price_label && <p className="text-teal-600 font-semibold text-sm mt-3">{s.price_label}</p>}
              </div>
            ))}
          </div>
        ) : <EmptyState text="No services published yet. Add services from Admin > Services." />}
        <div className="mt-8"><Link href="/services" className="text-teal-600 font-medium inline-flex items-center gap-1">View all services <ArrowRight size={16} /></Link></div>
      </section>

      {/* ABOUT SNIPPET */}
      {profile && (
        <section className="relative bg-gray-50 section overflow-hidden">
          <div className="container-page grid lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-1">
              {profile.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photo_url} alt={profile.full_name} className="rounded-lg w-full aspect-square object-cover" />
              ) : (
                <div className="rounded-lg w-full aspect-square bg-navy-900 flex items-center justify-center text-white font-serif text-4xl">
                  {profile.full_name?.split(' ').map((w: string) => w[0]).join('')}
                </div>
              )}
            </div>
            <div className="lg:col-span-2">
              <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-2">About</p>
              <h2 className="font-serif text-3xl font-bold text-navy-950">{profile.full_name}</h2>
              <p className="text-gray-500 mb-4">{profile.professional_title}</p>
              <p className="text-gray-600 leading-relaxed line-clamp-4">{profile.biography}</p>
              <Link href="/about" className="text-teal-600 font-medium inline-flex items-center gap-1 mt-4">Read full bio <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* PORTFOLIO PREVIEW */}
      <section className="section container-page">
        <SectionHeading eyebrow="Recent Work" title="Portfolio Highlights" />
        {portfolio && portfolio.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {(portfolio as PortfolioProject[]).map(p => (
              <Link key={p.id} href={`/portfolio/${p.slug}`} className="card card-hover overflow-hidden group">
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {p.featured_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.featured_image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>}
                </div>
                <div className="p-5">
                  {p.title.startsWith('[SAMPLE]') && <SampleBadge />}
                  <h3 className="font-serif font-bold text-navy-950 mt-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{p.category} · {p.year}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : <EmptyState text="No public portfolio items yet. Add one from Admin > Portfolio." />}
      </section>

      {/* REVIEWS PREVIEW */}
      <section className="bg-navy-950 text-white section">
        <div className="container-page">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-12">
            <div>
              <p className="text-teal-400 text-sm font-semibold uppercase tracking-wider mb-2">Testimonials</p>
              <h2 className="font-serif text-3xl font-bold">Client Reviews</h2>
            </div>
            {avgRating && (
              <div className="flex items-center gap-3">
                <StarRating rating={Math.round(Number(avgRating))} />
                <span className="text-gray-300 text-sm">{avgRating} average · {allRatings.length} reviews</span>
              </div>
            )}
          </div>
          {reviews && reviews.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {(reviews as Review[]).map(r => (
                <div key={r.id} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                  <StarRating rating={r.rating} />
                  <p className="mt-4 text-gray-200 text-sm leading-relaxed">"{r.review_text}"</p>
                  <p className="mt-4 font-medium text-teal-400 text-sm">{displayReviewerName(r)}</p>
                  <p className="text-gray-400 text-xs">{r.profession}</p>
                </div>
              ))}
            </div>
          ) : <p className="text-gray-400">No approved reviews yet.</p>}
        </div>
      </section>

      {/* CTA */}
      <section className="section container-page text-center">
        <h2 className="font-serif text-3xl font-bold text-navy-950">Ready to start your research project?</h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">Get in touch for a free initial consultation about your study.</p>
        <Link href="/contact" className="btn-primary mt-6"><CheckCircle2 size={18} /> {settings?.cta_text || 'Book a Consultation'}</Link>
      </section>
    </>
  )
}

