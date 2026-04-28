const products = [
  { name: "Nova One", detail: "A luminous daily computer with adaptive performance and a silent thermal architecture.", spec: "14.2″ Liquid Canvas" },
  { name: "Nova Air", detail: "Ultra-light intelligence for work, travel, and creation without compromise.", spec: "18 hr battery" },
  { name: "Nova Studio", detail: "A desktop-class creative engine distilled into a sculptural aluminum form.", spec: "48-core neural system" },
];

const features = [
  "Aerospace-grade unibody enclosure",
  "On-device intelligence with private processing",
  "Color-true display calibrated at the pixel level",
  "Seamless handoff across the Nova ecosystem",
];

const testimonials = [
  { quote: "Nova feels less like hardware and more like a quiet extension of how our team thinks.", name: "Mara Chen", role: "Creative Director, Luma" },
  { quote: "The restraint is what makes it powerful. Every interaction feels considered.", name: "Elias Hart", role: "Founder, Northline" },
  { quote: "We switched our studio in a weekend. The performance ceiling is astonishing.", name: "Priya Raman", role: "Film Technologist" },
];

const Index = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-hero-foreground/10 bg-hero/45 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="font-display text-lg font-semibold tracking-tight text-hero-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Nova
          </a>
          <div className="hidden items-center gap-8 text-sm text-hero-foreground/72 md:flex">
            <a className="transition-colors hover:text-hero-foreground" href="#products">Products</a>
            <a className="transition-colors hover:text-hero-foreground" href="#features">Features</a>
            <a className="transition-colors hover:text-hero-foreground" href="#stories">Stories</a>
          </div>
          <a href="#products" className="rounded-full bg-hero-foreground px-4 py-2 text-sm font-semibold text-hero transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Explore
          </a>
        </div>
      </nav>

      <section id="top" className="relative flex min-h-[92vh] items-center bg-hero-cinematic px-5 pt-24 text-hero-foreground sm:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,hsl(var(--hero-foreground)/0.06)_42%,transparent_58%)] animate-sheen motion-reduce:animate-none" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 pb-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="animate-fade-up">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-hero-foreground/60">Premium technology by Nova</p>
            <h1 className="max-w-4xl font-display text-6xl font-semibold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              Designed for the next quiet leap.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-hero-foreground/72 sm:text-xl">
              Nova creates cinematic personal technology with focused performance, exquisite materials, and intelligence that stays beautifully out of the way.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#products" className="premium-button bg-hero-foreground text-hero hover:-translate-y-0.5 hover:shadow-glow">Shop Nova</a>
              <a href="#film" className="premium-button border border-hero-foreground/20 bg-hero-foreground/8 text-hero-foreground backdrop-blur-xl hover:-translate-y-0.5 hover:bg-hero-foreground/12">Watch film</a>
            </div>
          </div>

          <div id="film" className="relative mx-auto aspect-[4/5] w-full max-w-[560px] animate-float-slow rounded-[2rem] border border-hero-foreground/14 bg-hero-foreground/8 p-3 shadow-glow backdrop-blur-xl motion-reduce:animate-none">
            <div className="absolute -inset-10 -z-10 rounded-full bg-accent-sweep opacity-30 blur-3xl" />
            <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-product-sheen shadow-soft">
              <div className="absolute inset-x-10 top-8 h-3 rounded-full bg-foreground/10" />
              <div className="absolute inset-x-8 bottom-8 top-16 rounded-[1.25rem] border border-foreground/10 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--nova-blue)/0.42),transparent_28%),linear-gradient(180deg,hsl(var(--card)),hsl(var(--secondary)))]" />
              <div className="absolute bottom-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full border border-foreground/10 bg-card/55 shadow-glow backdrop-blur-2xl" />
              <div className="absolute bottom-28 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-accent-sweep" />
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="section-kicker">Flagship line</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">Three forms. One unmistakable standard.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.name} className="group glass-panel rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
                <div className="mb-8 aspect-[1.15] overflow-hidden rounded-2xl bg-product-sheen p-5">
                  <div className="h-full rounded-[1.25rem] border border-foreground/10 bg-card/65 shadow-soft transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">{product.spec}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{product.name}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{product.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-foreground px-5 py-24 text-background sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-background/55">Standout features</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">Power that never needs to announce itself.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div key={feature} className="rounded-3xl border border-background/10 bg-background/7 p-6 backdrop-blur-xl" style={{ animationDelay: `${index * 90}ms` }}>
                <div className="mb-8 h-10 w-10 rounded-full bg-accent-sweep" />
                <p className="text-lg font-semibold leading-7">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="section-kicker">Trusted by exacting teams</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="glass-panel rounded-3xl p-7">
                <blockquote className="text-xl font-medium leading-8 tracking-tight">“{item.quote}”</blockquote>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl font-semibold tracking-tight">Nova</p>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <a className="hover:text-foreground" href="#top">Back to top</a>
            <a className="hover:text-foreground" href="#products">Products</a>
            <a className="hover:text-foreground" href="#features">Features</a>
            <span>© 2026 Nova Technologies</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
