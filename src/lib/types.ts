export type Service = {
  id: string
  title: string
  slug: string
  short_description: string | null
  full_description: string | null
  features: string[]
  price_label: string | null
  icon: string | null
  is_featured: boolean
  is_published: boolean
  sort_order: number
}

export type PortfolioProject = {
  id: string
  title: string
  slug: string
  category: string | null
  research_field: string | null
  description: string | null
  services_provided: string[]
  year: number | null
  project_status: string | null
  featured_image_url: string | null
  additional_images: string[]
  pdf_url: string | null
  external_link: string | null
  tags: string[]
  is_featured: boolean
  visibility: 'public' | 'private'
  is_published: boolean
  sort_order: number
}

export type Review = {
  id: string
  reviewer_name: string
  profession: string | null
  research_field: string | null
  rating: number
  review_text: string
  permission_to_publish: boolean
  display_preference: 'full_name' | 'first_name' | 'initials' | 'anonymous'
  status: 'pending' | 'approved' | 'rejected' | 'hidden'
  created_at: string
}

export type Publication = {
  id: string
  title: string
  authors: string
  journal: string | null
  year: number | null
  doi: string | null
  url: string | null
  research_field: string | null
  summary: string | null
  image_url: string | null
  is_featured: boolean
  is_published: boolean
  sort_order: number
}

export type Profile = {
  id: number
  full_name: string
  professional_title: string
  biography: string
  qualifications: string[]
  specializations: string[]
  research_interests: string[]
  experience_years: number
  achievements: string[]
  photo_url: string | null
  email: string | null
  phone: string | null
  whatsapp: string | null
  linkedin_url: string | null
  twitter_url: string | null
  researchgate_url: string | null
  orcid_url: string | null
}

export type SiteSettings = {
  id: number
  site_title: string
  logo_url: string | null
  favicon_url: string | null
  contact_email: string | null
  contact_phone: string | null
  whatsapp_number: string | null
  facebook_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  instagram_url: string | null
  homepage_headline: string
  homepage_description: string
  cta_text: string
  footer_text: string
  stat_clients_served: number
  stat_projects_completed: number
  stat_publications: number
  stat_years_experience: number
  instapay_url: string | null
  whatsapp_button_enabled: boolean
  whatsapp_default_message: string
}

export type Client = {
  id: string
  auth_user_id: string | null
  full_name: string
  email: string
  phone: string | null
  research_field: string | null
  notes: string | null
  created_at: string
}

export const PROJECT_STATUSES = [
  'Consultation', 'Planning', 'Protocol', 'Literature Review', 'Data Analysis',
  'Writing', 'Revision', 'Finalization', 'Completed',
] as const

export type ProjectStatus = typeof PROJECT_STATUSES[number]

export type Project = {
  id: string
  client_id: string
  title: string
  research_field: string | null
  study_design: string | null
  service_type: string | null
  start_date: string | null
  deadline: string | null
  status: ProjectStatus
  progress_percent: number
  description: string | null
  notes: string | null
  clients?: Client
}

export type ContactRequest = {
  id: string
  name: string
  email: string
  whatsapp: string | null
  research_field: string | null
  service_required: string | null
  project_description: string | null
  preferred_contact_method: string | null
  status: 'new' | 'contacted' | 'converted' | 'archived'
  created_at: string
}

export function displayReviewerName(r: Pick<Review, 'reviewer_name' | 'display_preference'>) {
  switch (r.display_preference) {
    case 'full_name': return r.reviewer_name
    case 'first_name': return r.reviewer_name.split(' ')[0]
    case 'initials': return r.reviewer_name.split(' ').map(w => w[0]?.toUpperCase()).join('.') + '.'
    case 'anonymous': return 'Anonymous'
    default: return r.reviewer_name
  }
}
