import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ArrowUpRight, Image, Link, Loader2, Lock, Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const products = [
  { name: "Nova Projects One", detail: "A luminous project workspace with adaptive presentation and a silent publishing flow.", spec: "14.2″ Project Canvas" },
  { name: "Nova Projects Air", detail: "Ultra-light project storytelling for launches, portfolios, and client-ready showcases.", spec: "18 hr editing flow" },
  { name: "Nova Projects Studio", detail: "A desktop-class creative gallery distilled into a sculptural, polished web experience.", spec: "48-core visual system" },
];

const features = [
  "Four curated project sections for polished organization",
  "Saved project links with image-led previews",
  "Private editing controls for signed-in creators",
  "Responsive cards tuned for desktop and mobile review",
];

const testimonials = [
  { quote: "Nova Projects makes our portfolio feel like a product launch every time we share it.", name: "Mara Chen", role: "Creative Director, Luma" },
  { quote: "The restraint is what makes it powerful. Every project feels considered.", name: "Elias Hart", role: "Founder, Northline" },
  { quote: "We updated our entire showcase in a weekend. The workflow is astonishingly clean.", name: "Priya Raman", role: "Film Technologist" },
];

const sectionMeta = [
  { id: 1, label: "Launches", copy: "Flagship builds, campaign pages, and public releases." },
  { id: 2, label: "Interfaces", copy: "Apps, dashboards, portals, and interactive tools." },
  { id: 3, label: "Visual Systems", copy: "Brand worlds, product imagery, and cinematic assets." },
  { id: 4, label: "Experiments", copy: "Prototypes, explorations, and next-wave concepts." },
] as const;

const projectSchema = z.object({
  title: z.string().trim().min(1, "Add a project title.").max(100, "Keep the title under 100 characters."),
  projectUrl: z.string().trim().url("Add a valid project link.").max(500, "Keep the link under 500 characters."),
  imageUrl: z.string().trim().max(500, "Keep the image link under 500 characters.").optional(),
  notes: z.string().trim().max(500, "Keep notes under 500 characters.").optional(),
});

const authSchema = z.object({
  email: z.string().trim().email("Enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type ProjectEntry = Tables<"project_entries">;
type ProjectForm = { title: string; projectUrl: string; imageUrl: string; notes: string };
type AuthForm = { email: string; password: string };

const emptyProjectForm: ProjectForm = { title: "", projectUrl: "", imageUrl: "", notes: "" };

const initialForms = sectionMeta.reduce(
  (forms, section) => ({ ...forms, [section.id]: emptyProjectForm }),
  {} as Record<number, ProjectForm>,
);

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [entries, setEntries] = useState<ProjectEntry[]>([]);
  const [forms, setForms] = useState<Record<number, ProjectForm>>(initialForms);
  const [authForm, setAuthForm] = useState<AuthForm>({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [isLoading, setIsLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<number | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const entriesBySection = useMemo(
    () =>
      sectionMeta.reduce(
        (groups, section) => ({ ...groups, [section.id]: entries.filter((entry) => entry.section_number === section.id) }),
        {} as Record<number, ProjectEntry[]>,
      ),
    [entries],
  );

  const loadEntries = async () => {
    const { data, error } = await supabase
      .from("project_entries")
      .select("*")
      .order("section_number", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setEntries(data ?? []);
  };

  useEffect(() => {
    const initialize = async () => {
      const [{ data }] = await Promise.all([supabase.auth.getSession(), loadEntries()]);
      setSession(data.session);
      setIsLoading(false);
    };

    initialize();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const updateProjectForm = (section: number, field: keyof ProjectForm, value: string) => {
    setForms((current) => ({
      ...current,
      [section]: { ...current[section], [field]: value },
    }));
  };

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    setMessage("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) setMessage(result.error.message);
    setAuthLoading(false);
  };

  const handleEmailAuth = async () => {
    const parsed = authSchema.safeParse(authForm);
    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message ?? "Check your sign-in details.");
      return;
    }

    setAuthLoading(true);
    setMessage("");

    const { error } =
      authMode === "sign-up"
        ? await supabase.auth.signUp({ email: parsed.data.email, password: parsed.data.password })
        : await supabase.auth.signInWithPassword({ email: parsed.data.email, password: parsed.data.password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(authMode === "sign-up" ? "Check your email to confirm your account." : "Signed in. You can save projects now.");
      setAuthForm({ email: "", password: "" });
    }

    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setMessage("Signed out.");
  };

  const handleSaveProject = async (section: number) => {
    if (!session?.user) {
      setMessage("Sign in to save project sections.");
      return;
    }

    const parsed = projectSchema.safeParse(forms[section]);
    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message ?? "Check the project details.");
      return;
    }

    setSavingSection(section);
    setMessage("");

    const { error } = await supabase.from("project_entries").insert({
      user_id: session.user.id,
      section_number: section,
      title: parsed.data.title,
      project_url: parsed.data.projectUrl,
      image_url: parsed.data.imageUrl || null,
      notes: parsed.data.notes || null,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setForms((current) => ({ ...current, [section]: emptyProjectForm }));
      setMessage("Project saved.");
      await loadEntries();
    }

    setSavingSection(null);
  };

  const handleDeleteProject = async (entry: ProjectEntry) => {
    const { error } = await supabase.from("project_entries").delete().eq("id", entry.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setEntries((current) => current.filter((item) => item.id !== entry.id));
    setMessage("Project removed.");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-hero-foreground/10 bg-hero/45 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="font-display text-lg font-semibold tracking-tight text-hero-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Nova Projects
          </a>
          <div className="hidden items-center gap-8 text-sm text-hero-foreground/72 md:flex">
            <a className="transition-colors hover:text-hero-foreground" href="#projects">Projects</a>
            <a className="transition-colors hover:text-hero-foreground" href="#products">Products</a>
            <a className="transition-colors hover:text-hero-foreground" href="#features">Features</a>
            <a className="transition-colors hover:text-hero-foreground" href="#stories">Stories</a>
          </div>
          <a href="#projects" className="rounded-full bg-hero-foreground px-4 py-2 text-sm font-semibold text-hero transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Add Project
          </a>
        </div>
      </nav>

      <section id="top" className="relative flex min-h-[92vh] items-center bg-hero-cinematic px-5 pt-24 text-hero-foreground sm:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,hsl(var(--hero-foreground)/0.06)_42%,transparent_58%)] animate-sheen motion-reduce:animate-none" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 pb-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="animate-fade-up">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-hero-foreground/60">Premium project technology</p>
            <h1 className="max-w-4xl font-display text-6xl font-semibold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              Nova Projects for your next quiet leap.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-hero-foreground/72 sm:text-xl">
              A cinematic place to organize project links, image previews, and polished sections with a workflow that stays beautifully out of the way.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#projects" className="premium-button bg-hero-foreground text-hero hover:-translate-y-0.5 hover:shadow-glow">Add projects</a>
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

      <section id="projects" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div className="max-w-3xl">
              <p className="section-kicker">Project sections</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">Four live sections for links and images.</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Add project URLs, paste image links, and build a polished showcase that loads saved entries for visitors.
              </p>
            </div>
            <div className="glass-panel rounded-3xl p-5">
              {session ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm font-semibold">Signed in</p>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{session.user.email}</p>
                  </div>
                  <button type="button" onClick={handleSignOut} className="premium-button-secondary w-full">Sign out</button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Lock className="size-4" aria-hidden="true" />
                    Sign in to save projects
                  </div>
                  <button type="button" onClick={handleGoogleSignIn} disabled={authLoading} className="premium-button-primary w-full">
                    {authLoading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                    Continue with Google
                  </button>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input
                      value={authForm.email}
                      onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))}
                      className="rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                      placeholder="Email"
                      type="email"
                    />
                    <input
                      value={authForm.password}
                      onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))}
                      className="rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                      placeholder="Password"
                      type="password"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={handleEmailAuth} disabled={authLoading} className="premium-button-secondary flex-1">
                      {authMode === "sign-in" ? "Sign in" : "Create account"}
                    </button>
                    <button type="button" onClick={() => setAuthMode(authMode === "sign-in" ? "sign-up" : "sign-in")} className="premium-button-secondary flex-1">
                      {authMode === "sign-in" ? "Need account" : "Have account"}
                    </button>
                  </div>
                </div>
              )}
              {message ? <p className="mt-4 rounded-2xl bg-secondary px-4 py-3 text-sm text-muted-foreground">{message}</p> : null}
            </div>
          </div>

          {isLoading ? (
            <div className="flex min-h-48 items-center justify-center text-muted-foreground">
              <Loader2 className="mr-2 size-5 animate-spin" aria-hidden="true" /> Loading projects
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {sectionMeta.map((section) => {
                const form = forms[section.id];
                const sectionEntries = entriesBySection[section.id] ?? [];

                return (
                  <article key={section.id} className="glass-panel rounded-3xl p-5 sm:p-6">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">Section {section.id}</p>
                        <h3 className="mt-1 text-2xl font-semibold tracking-tight">{section.label}</h3>
                        <p className="mt-2 leading-7 text-muted-foreground">{section.copy}</p>
                      </div>
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-sweep text-accent-foreground">
                        <Image className="size-5" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <input
                        value={form.title}
                        onChange={(event) => updateProjectForm(section.id, "title", event.target.value)}
                        className="rounded-2xl border border-border bg-card/75 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                        placeholder="Project title"
                      />
                      <input
                        value={form.projectUrl}
                        onChange={(event) => updateProjectForm(section.id, "projectUrl", event.target.value)}
                        className="rounded-2xl border border-border bg-card/75 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                        placeholder="Project link"
                        type="url"
                      />
                      <input
                        value={form.imageUrl}
                        onChange={(event) => updateProjectForm(section.id, "imageUrl", event.target.value)}
                        className="rounded-2xl border border-border bg-card/75 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                        placeholder="Image URL"
                        type="url"
                      />
                      <textarea
                        value={form.notes}
                        onChange={(event) => updateProjectForm(section.id, "notes", event.target.value)}
                        className="min-h-24 rounded-2xl border border-border bg-card/75 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                        placeholder="Short notes"
                      />
                      <button type="button" onClick={() => handleSaveProject(section.id)} disabled={savingSection === section.id} className="premium-button-primary w-full">
                        {savingSection === section.id ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
                        Save to {section.label}
                      </button>
                    </div>

                    <div className="mt-6 grid gap-4">
                      {sectionEntries.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-border bg-secondary/45 p-6 text-sm text-muted-foreground">
                          No projects yet. Add the first image-led link for this section.
                        </div>
                      ) : (
                        sectionEntries.map((entry) => (
                          <div key={entry.id} className="overflow-hidden rounded-3xl border border-border bg-card/80">
                            <div className="aspect-[16/9] bg-product-sheen">
                              {entry.image_url ? (
                                <img src={entry.image_url} alt={`${entry.title} preview`} className="h-full w-full object-cover" loading="lazy" />
                              ) : (
                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                  <Image className="size-8" aria-hidden="true" />
                                </div>
                              )}
                            </div>
                            <div className="p-5">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h4 className="text-lg font-semibold tracking-tight">{entry.title}</h4>
                                  {entry.notes ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.notes}</p> : null}
                                </div>
                                {session?.user.id === entry.user_id ? (
                                  <button type="button" onClick={() => handleDeleteProject(entry)} className="rounded-full border border-border p-2 transition hover:bg-secondary" aria-label={`Remove ${entry.title}`}>
                                    <Trash2 className="size-4" aria-hidden="true" />
                                  </button>
                                ) : null}
                              </div>
                              <a href={entry.project_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-accent">
                                <Link className="size-4" aria-hidden="true" />
                                Open project
                                <ArrowUpRight className="size-4" aria-hidden="true" />
                              </a>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
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
          <p className="font-display text-2xl font-semibold tracking-tight">Nova Projects</p>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <a className="hover:text-foreground" href="#top">Back to top</a>
            <a className="hover:text-foreground" href="#projects">Projects</a>
            <a className="hover:text-foreground" href="#products">Products</a>
            <a className="hover:text-foreground" href="#features">Features</a>
            <span>© 2026 Nova Projects</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
