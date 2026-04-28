import { ArrowUpRight, Code2, Cpu, Download, Gamepad2, Image, Zap } from "lucide-react";
import raspberryPiPhoto from "@/assets/projects/raspberry-pi.jpg";

const projects = [
  {
    id: 1,
    name: "Raspberry Pi",
    eyebrow: "Section 1",
    description:
      "I did this Raspberry Pi and I added some creative features on it and I really enjoyed this project because we needed to use our creativity.",
    image: raspberryPiPhoto,
    alt: "Raspberry Pi project photo",
    icon: Cpu,
    action: null,
    meta: "Hardware • Creativity • Build",
  },
  {
    id: 2,
    name: "Turtle Projects",
    eyebrow: "Section 2",
    description:
      "For this project I had to program in Python to make the turtle draw letters and words and even add a cool function and even thought this project was really challenging I find it really cool.",
    icon: Code2,
    action: { label: "Download Python file", href: "/andres.py" },
    meta: "Python • Turtle • Drawing",
    code: ["import turtle", "def draw_A(t, x, y):", "    draw_line(t, x, y, BOX_WIDTH/2, BOX_HEIGHT)", "draw_word(t, message, -240, 0)"],
  },
  {
    id: 3,
    name: "Py Game",
    eyebrow: "Section 3",
    description:
      "I really enjoyed this project because I thought it was challenging our creativity and it was also fun to create the game and I enjoyed it a lot.",
    icon: Gamepad2,
    action: { label: "Download game file", href: "/my_ufc_game.py" },
    meta: "Python • Pygame • Game Design",
    code: ["import pygame, sys, random", "WIDTH, HEIGHT = 1400, 740", "pygame.display.set_caption('Ultimate UFC + BJJ Showdown')", "while running: update_game()"],
  },
  {
    id: 4,
    name: "Servo Motor",
    eyebrow: "Section 4",
    description:
      "I really enjoyed making my own 3D design to make a function with the servo motor because I think this also challenged us in technical skills and creativity and we needed to know how to use Fusion.",
    icon: Zap,
    action: null,
    meta: "Fusion • 3D Design • Servo Motion",
  },
];

const skills = [
  "Creative problem solving",
  "Python programming",
  "Hardware prototyping",
  "Game development",
  "3D design in Fusion",
  "Technical presentation",
];

const Index = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-hero-foreground/10 bg-hero/45 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="font-display text-lg font-semibold tracking-tight text-hero-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Nova Projects
          </a>
          <div className="hidden items-center gap-8 text-sm text-hero-foreground/72 md:flex">
            <a className="transition-colors hover:text-hero-foreground" href="#projects">Projects</a>
            <a className="transition-colors hover:text-hero-foreground" href="#skills">Skills</a>
            <a className="transition-colors hover:text-hero-foreground" href="#story">Story</a>
          </div>
          <a href="#projects" className="rounded-full bg-hero-foreground px-4 py-2 text-sm font-semibold text-hero transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            View work
          </a>
        </div>
      </nav>

      <section id="top" className="relative flex min-h-[92vh] items-center bg-hero-cinematic px-5 pt-24 text-hero-foreground sm:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,hsl(var(--hero-foreground)/0.06)_42%,transparent_58%)] animate-sheen motion-reduce:animate-none" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 pb-16 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="animate-fade-up">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-hero-foreground/60">Student project showcase</p>
            <h1 className="max-w-4xl font-display text-6xl font-semibold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              Nova Projects, built with creativity.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-hero-foreground/72 sm:text-xl">
              A clean portfolio for my Raspberry Pi, Python turtle, Pygame, and servo motor projects.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#projects" className="premium-button bg-hero-foreground text-hero hover:-translate-y-0.5 hover:shadow-glow">Explore projects</a>
              <a href="#story" className="premium-button border border-hero-foreground/20 bg-hero-foreground/8 text-hero-foreground backdrop-blur-xl hover:-translate-y-0.5 hover:bg-hero-foreground/12">Read story</a>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] animate-float-slow rounded-[2rem] border border-hero-foreground/14 bg-hero-foreground/8 p-3 shadow-glow backdrop-blur-xl motion-reduce:animate-none">
            <div className="absolute -inset-10 -z-10 rounded-full bg-accent-sweep opacity-30 blur-3xl" />
            <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-product-sheen shadow-soft">
              <img src={raspberryPiPhoto} alt="Raspberry Pi project preview" className="h-full w-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,hsl(var(--hero)/0.82))]" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-hero-foreground/65">Featured build</p>
                <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-hero-foreground">Raspberry Pi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="section-kicker">Project sections</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">Four projects for people to view.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Each section presents one project with a description, visual preview, or downloadable code file.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => {
              const Icon = project.icon;

              return (
                <article key={project.id} className="group overflow-hidden rounded-3xl border border-border bg-card/80 shadow-soft backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
                  <div className="relative aspect-[16/10] overflow-hidden bg-product-sheen">
                    {project.image ? (
                      <img src={project.image} alt={project.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading={project.id === 1 ? "eager" : "lazy"} />
                    ) : project.code ? (
                      <div className="flex h-full flex-col justify-center gap-3 p-6 font-mono text-sm text-foreground/76 sm:p-8">
                        {project.code.map((line) => (
                          <pre key={line} className="overflow-hidden rounded-2xl border border-border bg-card/75 px-4 py-3"><code>{line}</code></pre>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center p-8">
                        <div className="relative flex aspect-square w-48 items-center justify-center rounded-full border border-border bg-card/70 shadow-soft">
                          <div className="absolute h-28 w-28 rounded-full bg-accent-sweep opacity-70 blur-xl" />
                          <Icon className="relative size-16 text-foreground" aria-hidden="true" />
                        </div>
                      </div>
                    )}
                    <div className="absolute left-5 top-5 rounded-full border border-hero-foreground/15 bg-hero/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-hero-foreground backdrop-blur-xl">
                      {project.eyebrow}
                    </div>
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">{project.meta}</p>
                        <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">{project.name}</h3>
                      </div>
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-sweep text-accent-foreground">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                    </div>
                    <p className="text-base leading-8 text-muted-foreground">{project.description}</p>
                    {project.action ? (
                      <a href={project.action.href} download className="premium-button-secondary mt-6 inline-flex gap-2">
                        <Download className="size-4" aria-hidden="true" />
                        {project.action.label}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="skills" className="bg-foreground px-5 py-24 text-background sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-background/55">What I practiced</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">Creativity plus technical skill.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill, index) => (
              <div key={skill} className="rounded-3xl border border-background/10 bg-background/7 p-6 backdrop-blur-xl" style={{ animationDelay: `${index * 90}ms` }}>
                <div className="mb-8 flex size-11 items-center justify-center rounded-full bg-accent-sweep text-accent-foreground">
                  <Image className="size-5" aria-hidden="true" />
                </div>
                <p className="text-lg font-semibold leading-7">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="section-kicker">Portfolio story</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">A showcase of projects that challenged my ideas.</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            These projects helped me practice coding, building, designing, and solving problems in different ways. I wanted this website to make each project easy to see and understand.
          </p>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl font-semibold tracking-tight">Nova Projects</p>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <a className="hover:text-foreground" href="#top">Back to top</a>
            <a className="hover:text-foreground" href="#projects">Projects</a>
            <a className="hover:text-foreground" href="#skills">Skills</a>
            <span>© 2026 Nova Projects</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
