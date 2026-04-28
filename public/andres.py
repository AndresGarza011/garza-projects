import turtle
t= turtle.Turtle()

def square(t):
    t.fd(100)
    t.lt(90)
    t.fd(100)
    t.lt(90)
    t.fd(100)
    t.lt(90)
    t.fd(100)
    t.lt(90)



import turtle
import colorsys

BOX_WIDTH = 30
BOX_HEIGHT = 50
SPACING = 10

def draw_line(t, x, y, dx, dy):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.goto(x + dx, y + dy)
    t.penup()

def draw_A(t, x, y):
    draw_line(t, x, y, BOX_WIDTH/2, BOX_HEIGHT)
    draw_line(t, x + BOX_WIDTH, y, -BOX_WIDTH/2, BOX_HEIGHT)
    draw_line(t, x + BOX_WIDTH/4, y + BOX_HEIGHT/2, BOX_WIDTH/2, 0)

def draw_B(t, x, y):
    draw_line(t, x, y, 0, BOX_HEIGHT)  
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH*0.6, 0)  
    draw_line(t, x + BOX_WIDTH*0.6, y + BOX_HEIGHT, 0, -BOX_HEIGHT/2)  
    draw_line(t, x + BOX_WIDTH*0.6, y + BOX_HEIGHT/2, -BOX_WIDTH*0.6, 0)  
    draw_line(t, x + BOX_WIDTH*0.6, y + BOX_HEIGHT/2, 0, -BOX_HEIGHT/2)
    draw_line(t, x + BOX_WIDTH*0.6, y, -BOX_WIDTH*0.6, 0)

def draw_C(t, x, y):
    draw_line(t, x + BOX_WIDTH, y + BOX_HEIGHT, -BOX_WIDTH, 0)
    draw_line(t, x, y + BOX_HEIGHT, 0, -BOX_HEIGHT)
    draw_line(t, x, y, BOX_WIDTH, 0)

def draw_D(t, x, y):
    draw_line(t, x, y, 0, BOX_HEIGHT)
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH/2, -BOX_HEIGHT/4)
    draw_line(t, x + BOX_WIDTH/2, y + 3*BOX_HEIGHT/4, 0, -BOX_HEIGHT/2)
    draw_line(t, x, y, BOX_WIDTH/2, BOX_HEIGHT/4)

def draw_E(t, x, y):
    draw_line(t, x + BOX_WIDTH, y + BOX_HEIGHT, -BOX_WIDTH, 0)
    draw_line(t, x, y + BOX_HEIGHT, 0, -BOX_HEIGHT)
    draw_line(t, x, y + BOX_HEIGHT/2, BOX_WIDTH*0.7, 0)
    draw_line(t, x, y, BOX_WIDTH, 0)

def draw_F(t, x, y):
    draw_line(t, x, y, 0, BOX_HEIGHT)
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH, 0)
    draw_line(t, x, y + BOX_HEIGHT/2, BOX_WIDTH*0.7, 0)

def draw_G(t, x, y):
    draw_line(t, x + BOX_WIDTH, y + BOX_HEIGHT, -BOX_WIDTH, 0)
    draw_line(t, x, y + BOX_HEIGHT, 0, -BOX_HEIGHT)
    draw_line(t, x, y, BOX_WIDTH, 0)
    draw_line(t, x + BOX_WIDTH/2, y + BOX_HEIGHT/2, BOX_WIDTH/2, 0)

def draw_H(t, x, y):
    draw_line(t, x, y, 0, BOX_HEIGHT)
    draw_line(t, x + BOX_WIDTH, y, 0, BOX_HEIGHT)
    draw_line(t, x, y + BOX_HEIGHT/2, BOX_WIDTH, 0)

def draw_I(t, x, y):
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH, 0)
    draw_line(t, x + BOX_WIDTH/2, y, 0, BOX_HEIGHT)
    draw_line(t, x, y, BOX_WIDTH, 0)

def draw_J(t, x, y):
    draw_line(t, x + BOX_WIDTH/2, y, 0, BOX_HEIGHT)
    draw_line(t, x + BOX_WIDTH/2, y, -BOX_WIDTH/2, 0)
    draw_line(t, x, y, 0, BOX_HEIGHT/4)

def draw_K(t, x, y):
    draw_line(t, x, y, 0, BOX_HEIGHT)
    draw_line(t, x, y + BOX_HEIGHT/2, BOX_WIDTH, BOX_HEIGHT/2)
    draw_line(t, x, y + BOX_HEIGHT/2, BOX_WIDTH, -BOX_HEIGHT/2)

def draw_L(t, x, y):
    draw_line(t, x, y, 0, BOX_HEIGHT)
    draw_line(t, x, y, BOX_WIDTH, 0)

def draw_M(t, x, y):
    draw_line(t, x, y, 0, BOX_HEIGHT)
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH/2, -BOX_HEIGHT)
    draw_line(t, x + BOX_WIDTH/2, y, BOX_WIDTH/2, BOX_HEIGHT)
    draw_line(t, x + BOX_WIDTH, y, 0, BOX_HEIGHT)

def draw_N(t, x, y):
    draw_line(t, x, y, 0, BOX_HEIGHT)
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH, -BOX_HEIGHT)
    draw_line(t, x + BOX_WIDTH, y, 0, BOX_HEIGHT)

def draw_O(t, x, y):
    draw_line(t, x, y, BOX_WIDTH, 0)
    draw_line(t, x + BOX_WIDTH, y, 0, BOX_HEIGHT)
    draw_line(t, x + BOX_WIDTH, y + BOX_HEIGHT, -BOX_WIDTH, 0)
    draw_line(t, x, y + BOX_HEIGHT, 0, -BOX_HEIGHT)

def draw_P(t, x, y):
    draw_line(t, x, y, 0, BOX_HEIGHT)
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH, 0)
    draw_line(t, x + BOX_WIDTH, y + BOX_HEIGHT, 0, -BOX_HEIGHT/2)
    draw_line(t, x + BOX_WIDTH, y + BOX_HEIGHT/2, -BOX_WIDTH, 0)

def draw_Q(t, x, y):
    draw_O(t, x, y)
    draw_line(t, x + BOX_WIDTH/2, y, BOX_WIDTH/2, BOX_HEIGHT/2)

def draw_R(t, x, y):
    draw_P(t, x, y)
    draw_line(t, x, y + BOX_HEIGHT/2, BOX_WIDTH, -BOX_HEIGHT/2)

def draw_S(t, x, y):
    draw_line(t, x + BOX_WIDTH, y + BOX_HEIGHT, -BOX_WIDTH, 0)
    draw_line(t, x, y + BOX_HEIGHT, 0, -BOX_HEIGHT/2)
    draw_line(t, x, y + BOX_HEIGHT/2, BOX_WIDTH, 0)
    draw_line(t, x + BOX_WIDTH, y + BOX_HEIGHT/2, 0, -BOX_HEIGHT/2)
    draw_line(t, x + BOX_WIDTH, y, -BOX_WIDTH, 0)

def draw_T(t, x, y):
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH, 0)
    draw_line(t, x + BOX_WIDTH/2, y, 0, BOX_HEIGHT)

def draw_U(t, x, y):
    draw_line(t, x, y + BOX_HEIGHT, 0, -BOX_HEIGHT)
    draw_line(t, x, y, BOX_WIDTH, 0)
    draw_line(t, x + BOX_WIDTH, y, 0, BOX_HEIGHT)

def draw_V(t, x, y):
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH/2, -BOX_HEIGHT)
    draw_line(t, x + BOX_WIDTH/2, y, BOX_WIDTH/2, BOX_HEIGHT)

def draw_W(t, x, y):
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH/4, -BOX_HEIGHT)
    draw_line(t, x + BOX_WIDTH/4, y, BOX_WIDTH/4, BOX_HEIGHT)
    draw_line(t, x + BOX_WIDTH/2, y + BOX_HEIGHT, BOX_WIDTH/4, -BOX_HEIGHT)
    draw_line(t, x + 3*BOX_WIDTH/4, y, BOX_WIDTH/4, BOX_HEIGHT)

def draw_X(t, x, y):
    draw_line(t, x, y, BOX_WIDTH, BOX_HEIGHT)
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH, -BOX_HEIGHT)

def draw_Y(t, x, y):
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH/2, -BOX_HEIGHT/2)
    draw_line(t, x + BOX_WIDTH, y + BOX_HEIGHT, -BOX_WIDTH/2, -BOX_HEIGHT/2)
    draw_line(t, x + BOX_WIDTH/2, y, 0, BOX_HEIGHT/2)

def draw_Z(t, x, y):
    draw_line(t, x, y + BOX_HEIGHT, BOX_WIDTH, 0)
    draw_line(t, x + BOX_WIDTH, y + BOX_HEIGHT, -BOX_WIDTH, -BOX_HEIGHT)
    draw_line(t, x, y, BOX_WIDTH, 0)

def write_word_auto(t, word, start_x=-300, start_y=0):
    x = start_x
    for char in word.upper():
        if char == "A": draw_A(t, x, start_y)
        elif char == "B": draw_B(t, x, start_y)
        elif char == "C": draw_C(t, x, start_y)
        elif char == "D": draw_D(t, x, start_y)
        elif char == "E": draw_E(t, x, start_y)
        elif char == "F": draw_F(t, x, start_y)
        elif char == "G": draw_G(t, x, start_y)
        elif char == "H": draw_H(t, x, start_y)
        elif char == "I": draw_I(t, x, start_y)
        elif char == "J": draw_J(t, x, start_y)
        elif char == "K": draw_K(t, x, start_y)
        elif char == "L": draw_L(t, x, start_y)
        elif char == "M": draw_M(t, x, start_y)
        elif char == "N": draw_N(t, x, start_y)
        elif char == "O": draw_O(t, x, start_y)
        elif char == "P": draw_P(t, x, start_y)
        elif char == "Q": draw_Q(t, x, start_y)
        elif char == "R": draw_R(t, x, start_y)
        elif char == "S": draw_S(t, x, start_y)
        elif char == "T": draw_T(t, x, start_y)
        elif char == "U": draw_U(t, x, start_y)
        elif char == "V": draw_V(t, x, start_y)
        elif char == "W": draw_W(t, x, start_y)
        elif char == "X": draw_X(t, x, start_y)
        elif char == "Y": draw_Y(t, x, start_y)
        elif char == "Z": draw_Z(t, x, start_y)
        elif char == " ": pass
        x += BOX_WIDTH + SPACING

import turtle
import colorsys

screen = turtle.Screen()
screen.bgcolor("white")
screen.title("Turtle Cool Animations")

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

def start_rainbow():
    t.clear()
    t.penup()
    t.goto(0, 0)
    t.pendown()
    screen.tracer(0)
    n = 70
    h = 0
    for i in range(360):
        c = colorsys.hsv_to_rgb(h, 1, 0.8)
        h += 1 / n
        if h > 1: h -= 1
        t.pencolor(c)
        t.forward(1)
        t.left(1)
        for j in range(2):
            t.left(2)
            t.circle(100)
        screen.update()
    screen.tracer(1)

def start_flower():
    t.clear()
    t.penup()
    t.goto(0, 0)
    t.pendown()
    t.pensize(2)
    screen.tracer(0)
    h = 0
    for i in range(250):
        c = colorsys.hsv_to_rgb(h, 1, 1)
        h += 0.005
        if h > 1: h -= 1
        t.pencolor(c)
        t.fillcolor(c)
        t.begin_fill()
        t.forward(i)
        t.left(100)
        t.circle(30)
        for j in range(2):
            t.right(109)
        t.end_fill()
        screen.update()
    screen.tracer(1)

def start_star():
    t.clear()
    t.penup()
    t.goto(0, 0)
    t.pendown()
    screen.tracer(0)
    colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
    for i in range(72):
        t.pencolor(colors[i % len(colors)])
        t.forward(i * 5)
        t.right(144)
        t.right(5)
        screen.update()
    screen.tracer(1)
