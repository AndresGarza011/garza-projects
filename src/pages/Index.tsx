import { useEffect, type PointerEvent } from "react";
import { ArrowUpRight, Code2, Cpu, Download, Gamepad2, Image, Zap } from "lucide-react";
import raspberryPiPhoto from "@/assets/projects/raspberry-pi.jpg";
import turtleAnimationPhoto from "@/assets/projects/turtle-animation.png";
import ufcGamePhoto from "@/assets/projects/ufc-game.png";

const projects = [
  {
    id: 1,
    name: "Raspberry Pi",
    eyebrow: "Section 1",
    description:
      "For this project, I worked with a Raspberry Pi and added my own creative features to make the build feel more personal and interesting. I really enjoyed this project because it challenged me to think beyond basic instructions, use my creativity, and make design choices that helped the project stand out.",
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
      "For this project, I used Python turtle graphics to draw letters, words, and custom shapes through code. It was challenging because I had to think carefully about movement, angles, spacing, and functions, but I found it really cool to see the turtle create something visual from the instructions I programmed.",
    image: turtleAnimationPhoto,
    alt: "Python turtle animation project screenshot",
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
      "I really enjoyed creating this game because it pushed my creativity and problem-solving skills at the same time. I had to think about how the game should look, how it should feel to play, and how the code should control the action, which made the process challenging, fun, and rewarding.",
    image: ufcGamePhoto,
    alt: "Ultimate UFC and BJJ Showdown game screenshot",
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
      "For this project, I made my own 3D design and connected it with a servo motor to create a working motion-based function. I enjoyed it because it challenged both my technical skills and creativity, and it also helped me practice using Fusion to design something that could connect to a real mechanical part.",
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
  const handleCardPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const normalizedX = x / rect.width - 0.5;
    const normalizedY = y / rect.height - 0.5;

    card.style.setProperty("--pointer-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--pointer-y", `${(y / rect.height) * 100}%`);
    card.style.setProperty("--magnet-x", `${normalizedX * 10}px`);
    card.style.setProperty("--magnet-y", `${normalizedY * 10}px`);
    card.style.setProperty("--tilt-x", `${normalizedY * -4.5}deg`);
    card.style.setProperty("--tilt-y", `${normalizedX * 4.5}deg`);
  };

  const handleCardPointerLeave = (event: PointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "30%");
    card.style.setProperty("--magnet-x", "0px");
    card.style.setProperty("--magnet-y", "0px");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  useEffect(() => {
    const animatedElements = document.querySelectorAll<HTMLElement>("[data-scroll-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    animatedElements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-hero-foreground/10 bg-hero/45 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="font-display text-lg font-semibold tracking-tight text-hero-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Garza Projects
          </a>
          <div className="hidden items-center gap-8 text-sm text-hero-foreground/72 md:flex">
            <a className="transition-colors hover:text-hero-foreground" href="#projects">Projects</a>
            <a className="transition-colors hover:text-hero-foreground" href="#skills">Skills</a>
            <a className="transition-colors hover:text-hero-foreground" href="#about">About</a>
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
              Garza Projects, built with creativity.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-hero-foreground/72 sm:text-xl">
              A clean portfolio for my Raspberry Pi, Python turtle, Pygame, and servo motor projects.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#projects" className="premium-button bg-hero-foreground text-hero hover:-translate-y-0.5 hover:shadow-glow">Explore projects</a>
              <a href="#about" className="premium-button border border-hero-foreground/20 bg-hero-foreground/8 text-hero-foreground backdrop-blur-xl hover:-translate-y-0.5 hover:bg-hero-foreground/12">About me</a>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] animate-float-slow rounded-[2rem] border border-accent/30 bg-hero-foreground/8 p-3 shadow-glow backdrop-blur-xl motion-reduce:animate-none">
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
          <div className="scroll-reveal mb-14 max-w-3xl" data-scroll-reveal>
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
                <article
                  key={project.id}
                  className="cinematic-card project-card group overflow-hidden rounded-3xl border border-border bg-card/80 shadow-soft backdrop-blur-2xl"
                  data-scroll-reveal
                  tabIndex={0}
                  aria-labelledby={`project-title-${project.id}`}
                  onPointerMove={handleCardPointerMove}
                  onPointerLeave={handleCardPointerLeave}
                >
                  <div className="project-card-media relative aspect-[16/10] overflow-hidden bg-product-sheen">
                    <div className="project-card-sheen" aria-hidden="true" />
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
                    <div className="absolute left-5 top-5 rounded-full border border-accent/30 bg-hero/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-hero-foreground backdrop-blur-xl">
                      {project.eyebrow}
                    </div>
                  </div>
                  <div className="project-card-content p-6 sm:p-7">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">{project.meta}</p>
                        <h3 id={`project-title-${project.id}`} className="mt-2 font-display text-3xl font-semibold tracking-tight">{project.name}</h3>
                      </div>
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-sweep text-accent-foreground">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                    </div>
                    <p className="min-h-32 text-base leading-8 text-muted-foreground">{project.description}</p>
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

      <section id="skills" className="scroll-reveal bg-foreground px-5 py-24 text-background sm:px-8 lg:py-32" data-scroll-reveal>
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

      <section id="about" className="scroll-reveal px-5 py-24 sm:px-8 lg:py-32" data-scroll-reveal>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="section-kicker">About me</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">Andres Garza</h2>
            <p className="mt-5 text-lg font-semibold text-muted-foreground">9th grade student</p>
          </div>
          <div className="glass-panel rounded-3xl p-7 sm:p-10">
            <p className="text-xl leading-9 text-foreground/82 sm:text-2xl sm:leading-10">
              Through these projects, I learned that creativity and determination can help us build impressive things. Whether I was coding, designing, or working with hardware, each project showed me that we are capable of accomplishing meaningful goals when we commit to them, stay focused, and approach challenges with the right mindset.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl font-semibold tracking-tight">Garza Projects</p>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <a className="hover:text-foreground" href="#top">Back to top</a>
            <a className="hover:text-foreground" href="#projects">Projects</a>
            <a className="hover:text-foreground" href="#skills">Skills</a>
            <a className="hover:text-foreground" href="#about">About</a>
            <span>© 2026 Garza Projects</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
