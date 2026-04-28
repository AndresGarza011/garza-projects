# ultimate_mma_complete.py
import pygame, sys, random, math, time

# Initialize pygame and mixer
pygame.mixer.pre_init(44100, -16, 2, 512)
pygame.init()

# -------------------------
# CONFIG
# -------------------------
WIDTH, HEIGHT = 1400, 740
FPS = 60
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Ultimate UFC + BJJ Showdown")
clock = pygame.time.Clock()

# -------------------------
# COLORS
# -------------------------
WHITE = (255,255,255)
BLACK = (0,0,0)
RED = (220,50,50)
BLUE = (50,120,255)
YELLOW = (240,240,50)
ORANGE = (255,165,0)
GRAY = (40,40,40)
OCTAGON = (80,80,80)
ROPE = (200,200,200)
SKIN = (255,220,180)
GREEN = (50,200,50)
HIT_SPARK = (255,220,90)

# -------------------------
# KEYS
# -------------------------
KEYS = {
    # Player 1
    "p1_left": pygame.K_a, "p1_right": pygame.K_d, "p1_jump": pygame.K_w,
    "p1_punch": pygame.K_SPACE, "p1_kick": pygame.K_q,
    "p1_armbar": pygame.K_r, "p1_choke": pygame.K_f, "p1_triangle": pygame.K_g,
    "p1_escape_a": pygame.K_s, "p1_escape_b": pygame.K_e,
    # Player 2
    "p2_left": pygame.K_LEFT, "p2_right": pygame.K_RIGHT, "p2_jump": pygame.K_UP,
    "p2_punch": pygame.K_RETURN, "p2_kick": pygame.K_RSHIFT,
    "p2_armbar": pygame.K_t, "p2_choke": pygame.K_y, "p2_triangle": pygame.K_u,
    "p2_escape_a": pygame.K_DOWN, "p2_escape_b": pygame.K_PAGEDOWN
}

# -------------------------
# GAME SETTINGS
# -------------------------
GRAVITY = 1.0
JUMP_STRENGTH = 18
ATTACK_COOLDOWN = 18
ROUND_SECONDS = 90
ROUND_FRAMES = ROUND_SECONDS * FPS
STAMINA_MAX = 100
STAMINA_REGEN_IDLE = 0.28
STAMINA_COST_PUNCH = 2
STAMINA_COST_KICK = 3
STAMINA_COST_MOVE = 0.05
SUBMISSION_MAX = 100
SCREEN_SHAKE_INTENSITY = 8

# -------------------------
# SOUNDS (optional)
# -------------------------
SOUND_ENABLED = False
try:
    punch_snd = pygame.mixer.Sound("punch.wav")
    kick_snd = pygame.mixer.Sound("kick.wav")
    sub_snd = pygame.mixer.Sound("submission.wav")
    crowd_snd = pygame.mixer.Sound("crowd.wav")
    SOUND_ENABLED = True
except Exception:
    SOUND_ENABLED = False

# -------------------------
# PARTICLES & SHAKE
# -------------------------
class Particle:
    def __init__(self, pos, vel, life, color, size):
        self.pos = list(pos)
        self.vel = list(vel)
        self.life = life
        self.color = color
        self.size = size
    def update(self):
        self.pos[0] += self.vel[0]
        self.pos[1] += self.vel[1]
        self.vel[1] += 0.2
        self.life -= 1
    def draw(self, surf, offset=(0,0)):
        if self.life > 0:
            x = int(self.pos[0] + offset[0])
            y = int(self.pos[1] + offset[1])
            pygame.draw.circle(surf, self.color, (x,y), max(1, int(self.size * (self.life/30))))

particles = []
screen_shake_frames = 0
def trigger_screen_shake(frames=8):
    global screen_shake_frames
    screen_shake_frames = max(screen_shake_frames, frames)
def get_shake_offset():
    global screen_shake_frames
    if screen_shake_frames > 0:
        dx = random.randint(-SCREEN_SHAKE_INTENSITY, SCREEN_SHAKE_INTENSITY)
        dy = random.randint(-SCREEN_SHAKE_INTENSITY//2, SCREEN_SHAKE_INTENSITY//2)
        screen_shake_frames -= 1
        return (dx,dy)
    return (0,0)
def spawn_hit_sparks(x,y,color=HIT_SPARK,count=10):
    for _ in range(count):
        angle = random.uniform(0, 2*math.pi)
        speed = random.uniform(2,8)
        vx = math.cos(angle)*speed
        vy = math.sin(angle)*speed*0.7 - 2
        particles.append(Particle((x,y),(vx,vy),life=random.randint(18,30),color=color,size=random.uniform(2,5)))

# -------------------------
# FIGHTER CLASS
# -------------------------
class Fighter:
    def __init__(self, x, color, player_num=1, name="Fighter"):
        self.rect = pygame.Rect(x, 380, 64, 120)
        self.color = color
        self.player_num = player_num
        self.name = name
        self.health = 100.0
        self.stamina = STAMINA_MAX
        self.vel_y = 0.0
        self.on_ground = True
        self.facing_left = False
        self.attack_timer = 0
        self.punching = False
        self.kicking = False
        self.grounded = False
        self.submitting = False
        self.submission_type = None
        self.submission_meter = 0.0
        self.escape_meter = 0.0
        self.submission_active = False
        self.hit_flash = 0
        self.combo = 0
        self.knockback_timer = 0
        # for tap detection cooldown
        self.last_escape_press_time = 0

    def move(self, left, right, jump):
        if self.grounded or self.submitting or self.knockback_timer > 0:
            return
        if left and self.stamina > 0:
            self.rect.x -= 6
            self.facing_left = True
            self.stamina -= STAMINA_COST_MOVE
        if right and self.stamina > 0:
            self.rect.x += 6
            self.facing_left = False
            self.stamina -= STAMINA_COST_MOVE
        if jump and self.on_ground and self.stamina > 0:
            self.vel_y = -JUMP_STRENGTH
            self.on_ground = False
            self.stamina -= 8
        self.rect.x = max(60, min(WIDTH-60-self.rect.width, self.rect.x))

    def apply_gravity(self):
        self.vel_y += GRAVITY
        self.rect.y += int(self.vel_y)
        if self.rect.bottom >= 520:
            self.rect.bottom = 520
            self.vel_y = 0.0
            self.on_ground = True
        if self.knockback_timer > 0:
            self.knockback_timer -= 1

    def start_attack(self, atype):
        # only on keydown and if not already attacking
        if self.attack_timer > 0 or self.stamina <= 0 or self.grounded or self.submitting:
            return False
        if atype == "punch":
            self.punching = True
            self.kicking = False
            self.attack_timer = ATTACK_COOLDOWN
            self.stamina = max(0, self.stamina - STAMINA_COST_PUNCH)
            return True
        if atype == "kick":
            self.kicking = True
            self.punching = False
            self.attack_timer = ATTACK_COOLDOWN
            self.stamina = max(0, self.stamina - STAMINA_COST_KICK)
            return True
        return False

    def start_submission(self, stype, defender):
        if self.rect.colliderect(defender.rect) and not self.submitting and not defender.submitting:
            self.submitting = True
            defender.submitting = True
            self.submission_type = stype
            self.submission_meter = 0.0
            defender.escape_meter = 0.0
            self.submission_active = True
            self.grounded = True
            defender.grounded = True
            if SOUND_ENABLED:
                try: sub_snd.play()
                except: pass
            return True
        return False

    def update_attack_timer(self):
        if self.attack_timer > 0:
            self.attack_timer -= 1
        else:
            self.punching = False
            self.kicking = False

    def apply_knockback(self, amount, dir_left):
        if dir_left:
            self.rect.x -= int(amount)
        else:
            self.rect.x += int(amount)
        self.knockback_timer = 8

    def draw(self, surf, offset=(0,0)):
        ox, oy = offset
        x = self.rect.x + ox
        y = self.rect.y + oy
        w = self.rect.width
        h = self.rect.height
        # torso
        pygame.draw.rect(surf, self.color, (x, y+30, w, h-30))
        # head
        pygame.draw.circle(surf, SKIN, (x + w//2, y+15), 15)
        # arms
        arm_len = 50 if self.punching else 26
        arm_w = 10
        y_arm = y + 60
        if self.facing_left:
            pygame.draw.line(surf, self.color, (x, y_arm), (x - arm_len, y_arm), arm_w)
            pygame.draw.line(surf, self.color, (x + w, y_arm), (x + w + 20, y_arm), arm_w)
        else:
            pygame.draw.line(surf, self.color, (x, y_arm), (x - 20, y_arm), arm_w)
            pygame.draw.line(surf, self.color, (x + w, y_arm), (x + w + arm_len, y_arm), arm_w)
        # legs
        leg_len = 48 if self.kicking else 28
        if self.facing_left:
            pygame.draw.line(surf, self.color, (x + w//2, y + h), (x + w//2 - leg_len, y + h + 30), 10)
            pygame.draw.line(surf, self.color, (x + w//2, y + h), (x + w//2 + 15, y + h + 30), 10)
        else:
            pygame.draw.line(surf, self.color, (x + w//2, y + h), (x + w//2 + leg_len, y + h + 30), 10)
            pygame.draw.line(surf, self.color, (x + w//2, y + h), (x + w//2 - 15, y + h + 30), 10)
        # hit flash overlay
        if self.hit_flash > 0:
            f = pygame.Surface((w, h))
            f.set_alpha(80)
            f.fill(WHITE)
            surf.blit(f, (x, y))
            self.hit_flash -= 1
        # submission bars (drawn relative to fighter)
        if self.submitting:
            pygame.draw.rect(surf, (10,10,10), (x, y-20, SUBMISSION_MAX, 12))
            pygame.draw.rect(surf, ORANGE, (x, y-20, int(self.submission_meter), 12))
            # defender escape meter drawn above it (if any)
            pygame.draw.rect(surf, (10,10,10), (x, y-36, SUBMISSION_MAX, 10))
            pygame.draw.rect(surf, YELLOW, (x, y-36, int(self.escape_meter), 10))

# -------------------------
# HUD & Fonts
# -------------------------
pygame.font.init()
font = pygame.font.SysFont("Arial", 32)
big_font = pygame.font.SysFont("Arial", 72)
small_font = pygame.font.SysFont("Arial", 20)

def draw_hud(p1, p2, round_frames, offset=(0,0)):
    ox, oy = offset
    screen.blit(font.render("PLAYER 1", True, WHITE), (60+ox, 10+oy))
    screen.blit(font.render("PLAYER 2", True, WHITE), (WIDTH-260+ox, 10+oy))
    # health bars
    pygame.draw.rect(screen, (20,20,20), (40+ox, 50+oy, 520, 28))
    pygame.draw.rect(screen, RED, (40+ox, 50+oy, int(5.2 * p1.health), 28))
    pygame.draw.rect(screen, (20,20,20), (WIDTH-560+ox, 50+oy, 520, 28))
    pygame.draw.rect(screen, BLUE, (WIDTH-560+ox, 50+oy, int(5.2 * p2.health), 28))
    # stamina
    pygame.draw.rect(screen, (20,20,20), (40+ox, 86+oy, 240, 18))
    pygame.draw.rect(screen, YELLOW, (40+ox, 86+oy, int(2.4 * p1.stamina), 18))
    pygame.draw.rect(screen, (20,20,20), (WIDTH-300+ox, 86+oy, 240, 18))
    pygame.draw.rect(screen, YELLOW, (WIDTH-300+ox, 86+oy, int(2.4 * p2.stamina), 18))
    # combo
    screen.blit(small_font.render(f"Combo x{p1.combo}", True, WHITE), (40+ox, 110+oy))
    screen.blit(small_font.render(f"Combo x{p2.combo}", True, WHITE), (WIDTH-300+ox, 110+oy))
    # timer
    seconds = round_frames // FPS
    timer_text = font.render(f"{seconds//60:02}:{seconds%60:02}", True, WHITE)
    screen.blit(timer_text, (WIDTH//2 - 40 + ox, 12 + oy))
    # hints
    hints = small_font.render("P1: WASD move SPACE punch Q kick  R/F/G subs   |   P2: Arrows Enter punch RShift kick T/Y/U subs   | ESC pause", True, (200,200,200))
    screen.blit(hints, (WIDTH//2 - hints.get_width()//2 + ox, HEIGHT - 28 + oy))

# -------------------------
# Submission mini-game: fixed tap/hold logic
# -------------------------
# We'll track previous key states for both escape keys and only count transitions
prev_key_state = {}  # key -> bool
last_hold_tick = {}  # key -> last tick used for hold-based increments

def was_pressed_this_frame(key, keys):
    """Return True if key was pressed this frame (edge triggered)."""
    prev = prev_key_state.get(key, False)
    now = keys[key]
    return now and not prev

def update_prev_key_state(keys):
    for k in (KEYS.values()):
        prev_key_state.setdefault(k, False)
        prev_key_state[k] = keys[k]

def run_submission(attacker, defender, keys):
    """attacker: Fighter, defender: Fighter
    - attacker meter fills automatically
    - defender must escape with taps (armbar/triangle) or controlled hold (choke)
    """
    # attacker builds submission gradually
    attacker.submission_meter = min(SUBMISSION_MAX, attacker.submission_meter + 0.55)

    # defender escape keys depend on player number
    if defender.player_num == 1:
        esc_a = KEYS["p1_escape_a"]; esc_b = KEYS["p1_escape_b"]
    else:
        esc_a = KEYS["p2_escape_a"]; esc_b = KEYS["p2_escape_b"]

    # Armbar & Triangle: count taps (edge detection)
    if attacker.submission_type == "armbar" or attacker.submission_type == "triangle":
        # only count edge transitions (no auto-hold)
        tapped = False
        if was_pressed_this_frame(esc_a, keys):
            defender.escape_meter += 3.0
            tapped = True
        if was_pressed_this_frame(esc_b, keys):
            defender.escape_meter += 3.0
            tapped = True
        if tapped:
            defender.last_escape_press_time = pygame.time.get_ticks()
    # Choke: hold but limited rate
    elif attacker.submission_type == "choke":
        # fill when holding escape_a but at a controlled rate (per 100 ms)
        hold_key = esc_a
        if keys[hold_key]:
            now = pygame.time.get_ticks()
            last = last_hold_tick.get(hold_key, 0)
            # increment once per 100 ms while held
            if now - last >= 100:
                defender.escape_meter = min(SUBMISSION_MAX, defender.escape_meter + 2.5)
                last_hold_tick[hold_key] = now
        else:
            # reset hold timer so holding again will wait full interval
            last_hold_tick[hold_key] = 0

    # clamp values
    attacker.submission_meter = min(SUBMISSION_MAX, attacker.submission_meter)
    defender.escape_meter = min(SUBMISSION_MAX, defender.escape_meter)

    # Draw small meters (also drawn in fighter.draw but repeat for clarity)
    # (drawn in fighter.draw; here we also keep for immediate feedback)
    pygame.draw.rect(screen, (10,10,10), (attacker.rect.x, attacker.rect.y - 18, SUBMISSION_MAX, 12))
    pygame.draw.rect(screen, ORANGE, (attacker.rect.x, attacker.rect.y - 18, int(attacker.submission_meter), 12))
    pygame.draw.rect(screen, (10,10,10), (defender.rect.x, defender.rect.y - 36, SUBMISSION_MAX, 12))
    pygame.draw.rect(screen, YELLOW, (defender.rect.x, defender.rect.y - 36, int(defender.escape_meter), 12))

    # Resolve outcomes
    if attacker.submission_meter >= SUBMISSION_MAX:
        # submission complete -> instant TKO
        defender.health = 0
        attacker.submitting = False; defender.submitting = False
        attacker.submission_active = False
        attacker.grounded = False; defender.grounded = False
        if SOUND_ENABLED:
            try: sub_snd.play()
            except: pass
    elif defender.escape_meter >= SUBMISSION_MAX:
        # defender escapes
        attacker.submitting = False; defender.submitting = False
        attacker.submission_active = False
        attacker.grounded = False; defender.grounded = False
        # apply stamina penalties
        attacker.stamina = max(0, attacker.stamina - 15)
        defender.stamina = max(0, defender.stamina - 8)

# -------------------------
# SPAWN PLAYERS
# -------------------------
p1 = Fighter(260, RED, player_num=1, name="Red")
p2 = Fighter(WIDTH-320, BLUE, player_num=2, name="Blue")
round_frames = ROUND_FRAMES
running = True
paused = False

# -------------------------
# MAIN LOOP
# -------------------------
while running:
    dt = 1.0
    offset = get_shake_offset()
    screen.fill(GRAY)

    # background / octagon
    pygame.draw.rect(screen, (18,18,18), (0,0,WIDTH,160))  # crowd strip
    pygame.draw.ellipse(screen, OCTAGON, (60, 320, WIDTH-120, 320))
    pygame.draw.ellipse(screen, BLACK, (60, 320, WIDTH-120, 320), 6)
    for y in range(340, 440, 24):
        pygame.draw.ellipse(screen, ROPE, (60, y, WIDTH-120, 20), 2)

    keys = pygame.key.get_pressed()
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            # pause
            if event.key == pygame.K_ESCAPE:
                paused = not paused
            # Player 1 - attacks/subs triggered on KEYDOWN (tap)
            if event.key == KEYS["p1_punch"]:
                p1.start_attack("punch")
            if event.key == KEYS["p1_kick"]:
                p1.start_attack("kick")
            if event.key == KEYS["p1_armbar"]:
                p1.start_submission("armbar", p2)
            if event.key == KEYS["p1_choke"]:
                p1.start_submission("choke", p2)
            if event.key == KEYS["p1_triangle"]:
                p1.start_submission("triangle", p2)
            # Player 2
            if event.key == KEYS["p2_punch"]:
                p2.start_attack("punch")
            if event.key == KEYS["p2_kick"]:
                p2.start_attack("kick")
            if event.key == KEYS["p2_armbar"]:
                p2.start_submission("armbar", p1)
            if event.key == KEYS["p2_choke"]:
                p2.start_submission("choke", p1)
            if event.key == KEYS["p2_triangle"]:
                p2.start_submission("triangle", p1)

    if paused:
        pause_s = big_font.render("PAUSED", True, WHITE)
        screen.blit(pause_s, (WIDTH//2 - pause_s.get_width()//2, HEIGHT//2 - pause_s.get_height()//2))
        pygame.display.update()
        # still update prev key state so tap detection resets properly when unpaused
        update_prev_key_state(keys)
        clock.tick(FPS)
        continue

    # Update fighters movement & physics
    p1.move(keys[KEYS["p1_left"]], keys[KEYS["p1_right"]], keys[KEYS["p1_jump"]])
    p2.move(keys[KEYS["p2_left"]], keys[KEYS["p2_right"]], keys[KEYS["p2_jump"]])
    p1.apply_gravity(); p2.apply_gravity()

    # Draw fighters (before hit detection to overlay HUD later)
    p1.draw(screen, offset); p2.draw(screen, offset)

    # Attack collisions + damage + effects
    # For each attacker/defender pair
    for attacker, defender in ((p1,p2),(p2,p1)):
        if attacker.punching and attacker.rect.colliderect(defender.rect):
            # simple damage formula
            dmg = 2.0 + (attacker.combo * 0.4) + random.uniform(-0.5, 1.0)
            defender.health = max(0, defender.health - dmg)
            defender.hit_flash = 6
            attacker.combo += 1
            spawn_hit_sparks(defender.rect.centerx + offset[0], defender.rect.centery + offset[1])
            trigger_screen_shake(6)
            defender.apply_knockback(8, (attacker.rect.centerx < defender.rect.centerx))
            if SOUND_ENABLED:
                try: punch_snd.play()
                except: pass
            attacker.punching = False  # single hit per press
        if attacker.kicking and attacker.rect.colliderect(defender.rect):
            dmg = 3.5 + (attacker.combo * 0.7) + random.uniform(-0.5, 1.5)
            defender.health = max(0, defender.health - dmg)
            defender.hit_flash = 8
            attacker.combo += 1
            spawn_hit_sparks(defender.rect.centerx + offset[0], defender.rect.centery + offset[1], count=14)
            trigger_screen_shake(10)
            defender.apply_knockback(12, (attacker.rect.centerx < defender.rect.centerx))
            if SOUND_ENABLED:
                try: kick_snd.play()
                except: pass
            attacker.kicking = False

    # Attack timers and combo timeout (reset combo if not hitting for a while)
    p1.update_attack_timer(); p2.update_attack_timer()

    # If not attacking/moving/submitting, regen stamina
    if not (p1.punching or p1.kicking or p1.submitting or keys[KEYS["p1_left"]] or keys[KEYS["p1_right"]]):
        p1.stamina = min(STAMINA_MAX, p1.stamina + STAMINA_REGEN_IDLE)
    if not (p2.punching or p2.kicking or p2.submitting or keys[KEYS["p2_left"]] or keys[KEYS["p2_right"]]):
        p2.stamina = min(STAMINA_MAX, p2.stamina + STAMINA_REGEN_IDLE)

    # Submissions: run mini-game if active
    # Note: run_submission uses edge detection helper which looks at prev_key_state
    if p1.submission_active:
        run_submission(p1, p2, keys)
    if p2.submission_active:
        run_submission(p2, p1, keys)

    # Update & draw particles
    for p in particles[:]:
        p.update()
        if p.life <= 0:
            particles.remove(p)
        else:
            p.draw(screen, offset)

    # Draw HUD (health/stamina/combo/timer)
    draw_hud(p1, p2, round_frames, offset)

    # Round timer and end conditions
    round_frames -= 1
    if round_frames <= 0 or p1.health <= 0 or p2.health <= 0:
        if p1.health > p2.health:
            victor = "PLAYER 1 WINS!"
        elif p2.health > p1.health:
            victor = "PLAYER 2 WINS!"
        else:
            victor = "DRAW!"
        end_surf = big_font.render(victor, True, WHITE)
        screen.blit(end_surf, (WIDTH//2 - end_surf.get_width()//2, HEIGHT//2 - end_surf.get_height()//2))
        pygame.display.update()
        pygame.time.wait(3000)
        running = False

    # update prev_key_state for edge detection (must be last in loop)
    update_prev_key_state(keys)

    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()
sys.exit()
