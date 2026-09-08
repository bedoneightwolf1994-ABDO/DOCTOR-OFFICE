import { FlaskConical, Dna, BookOpen, GraduationCap, Microscope, FileText } from 'lucide-react'

// Decorative, low-opacity floating science/academia icons used behind the
// hero section — purely visual, communicates "scientific research & writing"
// and adds a subtle sense of motion to the homepage. Ignored by screen
// readers (aria-hidden) since it carries no information.
export default function ScienceBackdrop() {
  const icons = [
    { Icon: FlaskConical, className: 'top-10 left-[6%] w-10 h-10 animate-float-slow', delay: '0s' },
    { Icon: Dna, className: 'top-1/3 left-[15%] w-14 h-14 animate-float', delay: '0.5s' },
    { Icon: BookOpen, className: 'top-16 right-[10%] w-12 h-12 animate-float-slower', delay: '1s' },
    { Icon: GraduationCap, className: 'bottom-16 right-[18%] w-10 h-10 animate-float-slow', delay: '1.5s' },
    { Icon: Microscope, className: 'bottom-10 left-[25%] w-11 h-11 animate-float', delay: '0.8s' },
    { Icon: FileText, className: 'top-1/2 right-[6%] w-9 h-9 animate-float-slower', delay: '0.3s' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {icons.map(({ Icon, className }, i) => (
        <Icon key={i} className={`absolute text-teal-400/10 ${className}`} strokeWidth={1.2} />
      ))}
      {/* subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />
    </div>
  )
}
