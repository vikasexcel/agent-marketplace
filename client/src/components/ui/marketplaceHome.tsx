import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Store, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function MarketplaceHome() {
  const [selected, setSelected] = useState<'buyer' | 'seller' | null>(null)

  const roles = [
    {
      id: 'buyer' as const,
      title: "I'm a Buyer",
      description: 'Discover, compare, and buy with your AI agent',
      icon: ShoppingBag,
      gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent dark:from-emerald-400/15 dark:via-teal-400/10',
      ring: 'ring-emerald-500/30 dark:ring-emerald-400/40',
      iconBg: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    },
    {
      id: 'seller' as const,
      title: "I'm a Seller",
      description: 'List inventory and let your agent handle offers',
      icon: Store,
      gradient: 'from-violet-500/10 via-purple-500/5 to-transparent dark:from-violet-400/15 dark:via-purple-400/10',
      ring: 'ring-violet-500/30 dark:ring-violet-400/40',
      iconBg: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
        aria-hidden
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[60vh] bg-gradient-to-b from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[50%] h-[40%] bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[50%] h-[40%] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <main className="relative flex-1 flex items-center justify-center px-6 py-6 sm:py-8">
        <div className="w-full max-w-2xl">
          {/* Badge */}
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground tracking-wide">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              AI-powered marketplace
            </span>
          </div>

          {/* Header */}
          <header className="mb-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-pretty text-foreground mb-2">
              Join the marketplace
            </h1>
            <p className="text-base text-muted-foreground font-light max-w-md mx-auto">
              Choose your role. Your private AI agent will handle the rest.
            </p>
          </header>

          {/* Role cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6">
            {roles.map((role) => {
              const Icon = role.icon
              const isSelected = selected === role.id

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelected(role.id)}
                  className={cn(
                    'group relative p-6 sm:p-7 rounded-2xl border text-left transition-all duration-300 ease-out',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isSelected
                      ? `border-2 bg-card/80 shadow-lg ${role.ring} scale-[1.02]`
                      : 'border-border hover:border-muted-foreground/40 hover:bg-muted/30 active:scale-[0.99]'
                  )}
                  aria-pressed={isSelected}
                  aria-label={`Select ${role.title}`}
                >
                  {/* Card gradient */}
                  <div
                    className={cn(
                      'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-100 transition-opacity',
                      role.gradient
                    )}
                    aria-hidden
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span
                        className={cn(
                          'inline-flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                          role.iconBg
                        )}
                        aria-hidden
                      >
                        <Icon className="size-5" />
                      </span>
                      <span
                        className={cn(
                          'size-5 shrink-0 rounded-full border-2 transition-all duration-200',
                          isSelected
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground/40 group-hover:border-muted-foreground'
                        )}
                        aria-hidden
                      />
                    </div>
                    <h2 className="text-lg sm:text-xl font-medium tracking-tight text-foreground mb-1">
                      {role.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">
                      {role.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* CTA + Login */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              disabled={!selected}
              className={cn(
                'inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                selected
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              Create account
              <ArrowRight className="size-4 opacity-70" aria-hidden />
            </button>

            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
