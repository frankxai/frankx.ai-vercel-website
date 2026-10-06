"""Procedural design set for the AI compute stack guide (October 2026).

Every figure is copied from content/blog/_drafts/ai-compute-stack-guide-october-2026.mdx.
Run: uv run --with pillow python build_assets.py <outdir>
Font: Bahnschrift (Windows system font), rasterized into the images.
"""
import json
import os
import sys
from datetime import datetime, timezone

from PIL import Image, ImageDraw, ImageFont

OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
S = 2
FP = "C:/Windows/Fonts/bahnschrift.ttf"

INK = (10, 12, 15)
PAPER = (243, 240, 232)
ACID = (200, 255, 58)
MUTE = (139, 146, 156)
LINE = (44, 51, 60)
CARD = (20, 25, 31)
AMBER = (255, 178, 36)

_fc = {}


def font(size, var="Bold"):
    k = (size, var)
    if k not in _fc:
        f = ImageFont.truetype(FP, int(round(size * S)))
        f.set_variation_by_name(var)
        _fc[k] = f
    return _fc[k]


class Cv:
    def __init__(self, w, h, bg=INK):
        self.w, self.h = w, h
        self.im = Image.new("RGB", (w * S, h * S), bg)
        self.d = ImageDraw.Draw(self.im)

    def rect(self, x, y, w, h, fill=None, outline=None, width=1, r=0):
        box = [x * S, y * S, (x + w) * S - 1, (y + h) * S - 1]
        if r:
            self.d.rounded_rectangle(box, radius=r * S, fill=fill, outline=outline, width=width * S)
        else:
            self.d.rectangle(box, fill=fill, outline=outline, width=width * S)

    def line(self, x1, y1, x2, y2, fill, width=1, dash=0):
        wd = int(width * S)
        if not dash:
            self.d.line([x1 * S, y1 * S, x2 * S, y2 * S], fill=fill, width=wd)
            return
        if x1 == x2:
            y = y1
            while y < y2:
                self.d.line([x1 * S, y * S, x2 * S, min(y + dash, y2) * S], fill=fill, width=wd)
                y += dash * 2
        else:
            x = x1
            while x < x2:
                self.d.line([x * S, y1 * S, min(x + dash, x2) * S, y2 * S], fill=fill, width=wd)
                x += dash * 2

    def tw(self, t, size, var="Bold", track=0):
        return font(size, var).getlength(t) / S + track * len(t)

    def text(self, x, y, t, size, fill=PAPER, var="Bold", anchor="l", track=0):
        f = font(size, var)
        w = self.tw(t, size, var, track)
        if anchor == "r":
            x -= w
        elif anchor == "m":
            x -= w / 2
        if track:
            cx = x
            for ch in t:
                self.d.text((cx * S, y * S), ch, font=f, fill=fill, anchor="ls")
                cx += f.getlength(ch) / S + track
        else:
            self.d.text((x * S, y * S), t, font=f, fill=fill, anchor="ls")
        return w

    def wrap(self, t, size, var, maxw):
        lines, cur = [], ""
        for wd in t.split():
            test = (cur + " " + wd).strip()
            if self.tw(test, size, var) <= maxw:
                cur = test
            else:
                if cur:
                    lines.append(cur)
                cur = wd
        if cur:
            lines.append(cur)
        return lines

    def para(self, x, y, t, size, fill, var, maxw, lh=1.32):
        ls = self.wrap(t, size, var, maxw)
        for i, l in enumerate(ls):
            self.text(x, y + i * size * lh, l, size, fill, var)
        return len(ls) * size * lh

    def fit(self, t, maxw, size, var="Bold Condensed"):
        while size > 10 and self.tw(t, size, var) > maxw:
            size -= 1
        return size

    def multi(self, x, y, parts, size, var="Bold Condensed"):
        for t, col in parts:
            x += self.text(x, y, t, size, col, var)
        return x

    def save(self, name, webp=False, q=90):
        im = self.im.resize((self.w, self.h), Image.LANCZOS)
        p = os.path.join(OUT, name + (".webp" if webp else ".png"))
        if webp:
            im.save(p, "WEBP", quality=q, method=6)
        else:
            im.save(p, "PNG", optimize=True)
        return p


SAVED = []


def done(cv, name, webp=False, q=90):
    p = cv.save(name, webp, q)
    SAVED.append(p)
    print(os.path.basename(p), os.path.getsize(p) // 1024, "KB", cv.w, "x", cv.h)


def eyebrow(cv, x, y, t, col=ACID, size=22):
    cv.text(x, y, t.upper(), size, col, "Bold", track=3)


def footer(cv, y, note=None, left=70, right=None):
    cv.text(left, y, "FRANKX  ·  AI COMPUTE GUIDE  ·  OCTOBER 2026", 18, MUTE, "SemiBold", track=2)
    if note:
        cv.text((right or cv.w - 70), y, note, 18, MUTE, "SemiBold", anchor="r", track=1)


# ---------------------------------------------------------------- A memory ladder
def memory_ladder():
    cv = Cv(1600, 1150)
    m = 80
    eyebrow(cv, m, 100, "Memory by stage  ·  one node")
    cv.multi(m, 215, [("64 GB", ACID), (" is the floor.", PAPER)], 128)
    cv.text(m, 268, "What one always-on node needs as the stack grows. Bars run from my low to my high estimate.", 28, MUTE, "Regular")
    x0, scale = m, 1440 / 200
    gx = lambda g: x0 + g * scale
    for g, lab in ((64, "64 GB"), (128, "128 GB"), (192, "192 GB")):
        cv.line(gx(g), 352, gx(g), 760, LINE, 2, dash=8)
        cv.text(gx(g), 340, lab, 22, MUTE, "Bold", anchor="m", track=2)
    rows = [
        ("1", "20 agent sessions, 10 browsers, 2 builds, gateway, monitoring", 49, 59, "49–59 GB", "Fits 64 GB", ACID),
        ("2", "Six workspaces, 2 Windows VMs, Langfuse, 1M RAG chunks, 30B MoE model", 106.2, 128.2, "106.2–128.2 GB", "Fits 128 GB at the low end only", AMBER),
        ("3", "Add a 15-user Odoo, 3M RAG chunks and a 70B dense model", 145.6, 176.6, "145.6–176.6 GB", "Needs 192 GB", ACID),
    ]
    y = 385
    for num, label, lo, hi, val, verdict, col in rows:
        lw = cv.tw(label, 28, "SemiBold")
        cv.rect(m + 30, y + 2, lw + 22, 34, fill=INK)
        cv.text(m, y + 26, num, 30, col, "Bold Condensed")
        cv.text(m + 40, y + 26, label, 28, PAPER, "SemiBold")
        vw = cv.tw(val, 42, "Bold Condensed")
        cv.rect(gx(lo) - 16 - vw - 8, y + 48, vw + 16, 46, fill=INK)
        cv.rect(gx(lo), y + 44, gx(hi) - gx(lo), 46, fill=col)
        cv.text(gx(lo) - 16, y + 82, val, 42, PAPER, "Bold Condensed", anchor="r")
        vdw = cv.tw(verdict, 26, "SemiBold")
        cv.rect(1520 - vdw - 10, y + 56, vdw + 20, 36, fill=INK)
        cv.text(1520, y + 80, verdict, 26, col, "SemiBold", anchor="r")
        y += 126
    cv.text(m, y + 26, "4", 30, ACID, "Bold Condensed")
    cv.text(m + 40, y + 26, "Add image, video and fine-tune jobs on a GPU node", 28, PAPER, "SemiBold")
    cv.rect(m, y + 44, 1440, 66, fill=CARD, outline=LINE, width=2, r=10)
    cv.text(m + 24, y + 87, "Largest queued job needs 26 GB of VRAM, which points to a 32 GB card.", 30, ACID, "SemiBold")
    by = y + 148
    cv.rect(m, by, 1440, 84, fill=CARD, r=10)
    cv.rect(m, by, 8, 84, fill=ACID)
    cv.text(m + 30, by + 53, "Or split:", 34, ACID, "Bold Condensed")
    cv.text(m + 150, by + 53, "agent node 77.2–97.2 GB (128 GB class) and model node 41–43 GB (64 GB class)", 32, PAPER, "SemiBold")
    cv.text(m, by + 126, "Basis: estimates from one 30-minute laptop profile, plus documented figures for Langfuse and RAG vectors. Measure your own for a week.", 22, MUTE, "Regular")
    footer(cv, 1112, left=m, right=1520)
    done(cv, "memory-ladder", webp=True, q=88)


# ---------------------------------------------------------------- B scorecard
def scorecard():
    m = 70
    ax, bx, cw = 330, 760, 380
    rows = [
        ("Network", "2.5GbE", "Dual 10GbE"),
        ("Expansion", "OCuLink (PCIe 4.0 x4) on the EVO-X3", "PCIe slot, x16 physical, x4 Gen4 electrical"),
        ("Power supply", "External adapter on the EVO-X2", "320 W internal PSU"),
        ("Noise under load", "41 to 43 dBA, partly second-hand", "About 43 dBA at 1 m, performance mode"),
        ("Power draw", "8 to 14 W idle|147 to 160 W load|(70B Q6_K model)", "9 to 12 W idle|About 120 W|under AI inference"),
        ("Price, EUR", "3,499.99 EVO-X3|3,999 EVO-X2", "3,999 promo|4,999 regular"),
    ]
    probe = Cv(10, 10)

    def lines(txt):
        out = []
        for seg in txt.split("|"):
            out += probe.wrap(seg, 32, "SemiBold", cw)
        return out

    heights = [max(len(lines(a)), len(lines(b))) * 40 + 44 for _, a, b in rows]
    top = 630
    end = top + sum(heights)
    H = end + 330
    cv = Cv(1200, H)
    eyebrow(cv, m, 100, "GMKtec vs Minisforum  ·  128 GB class")
    cv.text(m, 240, "Same chip.", 150, PAPER, "Bold Condensed")
    cv.text(m, 385, "Different box.", 150, ACID, "Bold Condensed")
    cv.text(m, 450, "Ryzen AI Max+ 395, 128 GB LPDDR5X, 256 GB/s theoretical bandwidth in both.", 28, MUTE, "Regular")
    cv.text(ax, 560, "GMKtec", 56, PAPER, "Bold Condensed")
    cv.text(ax, 592, "EVO-X2 and EVO-X3", 24, MUTE, "SemiBold")
    cv.text(bx, 560, "Minisforum", 56, PAPER, "Bold Condensed")
    cv.text(bx, 592, "MS-S1 MAX", 24, MUTE, "SemiBold")
    y = top
    for (lab, a, b), h in zip(rows, heights):
        cv.line(m, y, cv.w - m, y, LINE, 2)
        cv.text(m, y + 46, lab.upper(), 19, MUTE, "Bold", track=2)
        for i, l in enumerate(lines(a)):
            cv.text(ax, y + 46 + i * 40, l, 32, PAPER, "SemiBold")
        for i, l in enumerate(lines(b)):
            cv.text(bx, y + 46 + i * 40, l, 32, PAPER, "SemiBold")
        y += h
    cv.line(m, y, cv.w - m, y, LINE, 2)
    cv.rect(m, y + 40, cv.w - 2 * m, 110, fill=CARD, r=12)
    cv.rect(m, y + 40, 8, 110, fill=ACID)
    cv.para(m + 32, y + 84, "No winner on silicon. Decide on ports, cooling, serviceability and the day's price.", 32, ACID, "SemiBold", cv.w - 2 * m - 60, 1.25)
    cv.para(m, y + 200, "Prices read 5 October 2026 from different sellers and tax bases. Noise and power figures are ServeTheHome's; GMKtec's noise number is partly second-hand.", 21, MUTE, "Regular", cv.w - 2 * m)
    footer(cv, cv.h - 40)
    done(cv, "machine-scorecard", webp=True, q=88)

# ---------------------------------------------------------------- C buy order
def buy_order():
    cv = Cv(1200, 1760)
    m = 70
    eyebrow(cv, m, 100, "Buy order")
    cv.text(m, 240, "What I would buy,", 120, PAPER, "Bold Condensed")
    cv.text(m, 360, "in this order.", 120, ACID, "Bold Condensed")
    steps = [
        ("Measure for a week", "Peak committed RAM, live agent sessions and the largest process group."),
        ("128 GB agent node", "If peak demand sits above about 51 GB, which is 80% of 64 GB."),
        ("64 GB model and RAG node", "When the local model, Langfuse and RAG push the first node past 100 GB."),
        ("Rent GPU hours first", "Buy a 32 GB card only when a weekly job needs more than 24 GB of VRAM."),
        ("Hold the 192 GB machine", "Until a single model above about 100 GB earns its place."),
    ]
    y = 470
    for i, (t, b) in enumerate(steps, 1):
        cv.line(m, y, cv.w - m, y, LINE, 2)
        cv.text(m, y + 150, str(i), 170, ACID if i == 1 else PAPER, "Bold Condensed")
        cv.text(270, y + 78, t, 58, PAPER, "Bold Condensed")
        cv.para(270, y + 122, b, 29, MUTE, "Regular", 860, 1.3)
        y += 205
    cv.line(m, y, cv.w - m, y, LINE, 2)
    cv.para(m, y + 62, "Pick the vendor last. Same chip, so ports, cooling, serviceability and the day's price decide.", 30, ACID, "SemiBold", cv.w - 2 * m, 1.3)
    footer(cv, cv.h - 40)
    done(cv, "buy-order", webp=True, q=88)


# ---------------------------------------------------------------- D video cost
def video_cost():
    cv = Cv(1200, 1400)
    m = 70
    eyebrow(cv, m, 100, "AI video  ·  API list prices, USD")
    cv.text(m, 230, "Price per generated", 112, PAPER, "Bold Condensed")
    cv.multi(m, 340, [("minute", ACID), (" of video.", PAPER)], 112)
    cv.text(m, 395, "Per-second prices read 5 October 2026, multiplied by 60.", 28, MUTE, "Regular")
    data = [
        ("Veo 3.1 Standard, 720p or 1080p", "USD 0.40 per second", 24.00),
        ("Veo 3.1 Fast, 720p", "USD 0.10 per second", 6.00),
        ("Grok Imagine video 1.5", "USD 0.080 per second", 4.80),
        ("Veo 3.1 Lite, 720p", "USD 0.05 per second", 3.00),
        ("Grok Imagine video 1.5 lite", "USD 0.020 per second", 1.20),
    ]
    y, maxw = 450, 720
    for name, per, v in data:
        cv.text(m, y + 30, name, 30, PAPER, "SemiBold")
        cv.text(cv.w - m, y + 30, per, 24, MUTE, "SemiBold", anchor="r")
        w = max(8, v / 24 * maxw)
        cv.rect(m, y + 50, w, 44, fill=ACID if v != 6.0 else AMBER)
        cv.text(m + w + 18, y + 88, f"USD {v:.2f}", 46, PAPER, "Bold Condensed")
        y += 124
    cv.rect(m, y + 10, cv.w - 2 * m, 150, fill=CARD, r=12)
    cv.rect(m, y + 10, 8, 150, fill=AMBER)
    cv.para(m + 32, y + 56, "A finished minute costs more. At an assumed 2.5 takes per kept clip, Veo 3.1 Fast lands near USD 15 per finished minute. The retake rate is my assumption, not a measurement.", 27, PAPER, "SemiBold", cv.w - 2 * m - 64, 1.28)
    cv.text(m, y + 214, "Audio, 9:16 support and clip-length caps were not verified for these prices.", 21, MUTE, "Regular")
    footer(cv, cv.h - 40)
    done(cv, "video-cost", webp=True, q=88)


# ---------------------------------------------------------------- E hero + OG
def hero(w, h, name, webp):
    cv = Cv(w, h)
    u = h / 900.0
    ox = (w - 1600 * u) / 2
    X = lambda v: ox + v * u
    Y = lambda v: v * u
    eyebrow(cv, X(90), Y(105), "AI architecture  ·  October 2026", size=int(26 * u))
    for i, t in enumerate(("The AI", "compute", "stack guide")):
        cv.text(X(90), Y(290 + i * 196), t, int(188 * u), ACID if i == 2 else PAPER, "Bold Condensed")
    cv.para(X(90), Y(805), "Memory, machines, GPUs and video cost, with sources and gaps stated.", int(32 * u), MUTE, "Regular", 780 * u, 1.3)
    bx, by = X(1030), 0
    cv.text(bx, Y(215), "MEMORY CLASSES IN THE GUIDE", int(20 * u), MUTE, "Bold", track=2)
    for i, g in enumerate((64, 128, 192)):
        bw = g / 192 * 500 * u
        yy = Y(250 + i * 150)
        cv.rect(bx, yy, bw, 112 * u, fill=ACID if i == 1 else PAPER)
        nw = cv.text(bx + 24 * u, yy + 90 * u, str(g), int(104 * u), INK, "Bold Condensed")
        cv.text(bx + 24 * u + nw + 10 * u, yy + 90 * u, "GB", int(36 * u), INK, "Bold Condensed")
    cv.text(bx, Y(740), "One node. Then two. Then a GPU,", int(26 * u), MUTE, "SemiBold")
    cv.text(bx, Y(776), "only when a job names its VRAM.", int(26 * u), MUTE, "SemiBold")
    cv.text(X(1510), Y(105), "FRANKX", int(22 * u), PAPER, "Bold", anchor="r", track=4)
    done(cv, name, webp=webp, q=86)


# ---------------------------------------------------------------- F thumbnail
def thumbnail():
    cv = Cv(1280, 720)
    eyebrow(cv, 80, 120, "AI compute guide  ·  Oct 2026", size=30)
    s = cv.fit("64 or 128?", 1120, 330)
    cv.text(70, 470, "64 or ", s, PAPER, "Bold Condensed")
    w = cv.tw("64 or ", s, "Bold Condensed")
    cv.text(70 + w, 470, "128?", s, ACID, "Bold Condensed")
    cv.rect(80, 506, 1120, 14, fill=ACID)
    cv.text(80, 600, "GB of RAM for always-on AI agents", 56, PAPER, "SemiBold")
    cv.text(80, 668, "FRANKX", 26, MUTE, "Bold", track=4)
    done(cv, "thumbnail", webp=False)


# ---------------------------------------------------------------- G social
def axis_strip(cv, x, y, w, lo, hi, col=ACID):
    sc = w / 192
    cv.rect(x, y, w, 6, fill=LINE)
    cv.rect(x + lo * sc, y - 14, (hi - lo) * sc, 34, fill=col)
    cv.line(x + 64 * sc, y - 28, x + 64 * sc, y + 34, PAPER, 3)
    cv.text(x + 64 * sc, y - 40, "64 GB", 22, PAPER, "Bold", anchor="m", track=2)
    cv.text(x, y + 62, "0", 22, MUTE, "Bold")
    cv.text(x + w, y + 62, "192 GB", 22, MUTE, "Bold", anchor="r", track=1)


def social_landscape():
    cv = Cv(1200, 675)
    eyebrow(cv, 80, 100, "AI compute guide  ·  Oct 2026")
    cv.text(80, 290, "64 GB is", 190, PAPER, "Bold Condensed")
    cv.text(80, 450, "the floor.", 190, ACID, "Bold Condensed")
    axis_strip(cv, 80, 540, 1040, 49, 59)
    cv.text(80, 640, "49 to 59 GB for 20 agent sessions and their helpers. My estimate.", 26, MUTE, "SemiBold")
    done(cv, "social-landscape", webp=False)


def social_square():
    cv = Cv(1080, 1080)
    eyebrow(cv, 80, 130, "AI compute guide  ·  Oct 2026")
    cv.text(80, 420, "Measure.", 250, PAPER, "Bold Condensed")
    cv.text(80, 650, "Then buy.", 250, ACID, "Bold Condensed")
    cv.para(80, 770, "Start with a week of your own workload data. Then pick a node.", 40, MUTE, "Regular", 860, 1.3)
    footer(cv, 1020, left=80, right=1000)
    done(cv, "social-square", webp=False)


def story_cover():
    cv = Cv(1080, 1920)
    eyebrow(cv, 80, 360, "AI compute guide  ·  Oct 2026")
    for i, (t, c) in enumerate((("Measure.", PAPER), ("Split.", PAPER), ("Then scale.", ACID))):
        fs = cv.fit("Then scale.", 900, 270)
        cv.text(80, 700 + i * (fs + 6), t, fs, c, "Bold Condensed")
    cv.para(80, 1520, "A buying guide for always-on agents, with sources and gaps stated.", 40, MUTE, "Regular", 860, 1.3)
    done(cv, "story-cover", webp=False)


def slide_frame(cv, n, last=False):
    cv.text(80, 100, "AI COMPUTE GUIDE", 20, MUTE, "Bold", track=3)
    cv.text(cv.w - 80, 100, f"{n:02d} / 06", 20, MUTE, "Bold", anchor="r", track=3)
    cv.line(80, 124, cv.w - 80, 124, LINE, 2)
    cv.text(80, cv.h - 60, "FRANKX  ·  OCT 2026", 18, MUTE, "SemiBold", track=2)
    if not last:
        cv.text(cv.w - 80 - 24, cv.h - 56, "SWIPE", 18, ACID, "Bold", anchor="r", track=3)
        ax = cv.w - 80 + 4
        cv.line(ax - 4, cv.h - 66, ax + 14, cv.h - 56, ACID, 3)
        cv.line(ax + 14, cv.h - 56, ax - 4, cv.h - 46, ACID, 3)


def carousel():
    # 1 hook
    cv = Cv(1080, 1350)
    slide_frame(cv, 1)
    for i, (t, c) in enumerate((("Do 20", PAPER), ("agents", PAPER), ("need", PAPER), ("128 GB?", ACID))):
        cv.text(80, 340 + i * 215, t, 250, c, "Bold Condensed")
    cv.text(80, 1230, "My answer, with the numbers.", 40, MUTE, "Regular")
    done(cv, "carousel-01")
    # 2 floor
    cv = Cv(1080, 1350)
    slide_frame(cv, 2)
    cv.text(80, 300, "64 GB is", 160, PAPER, "Bold Condensed")
    cv.text(80, 440, "the floor.", 160, PAPER, "Bold Condensed")
    cv.text(80, 730, "49–59", 330, ACID, "Bold Condensed")
    cv.text(80, 820, "GB", 90, ACID, "Bold Condensed")
    cv.para(80, 900, "20 agent sessions, 10 headless browsers, 2 builds, a gateway and monitoring. My estimate from one laptop profile.", 34, PAPER, "Regular", 920, 1.3)
    axis_strip(cv, 80, 1140, 920, 49, 59)
    done(cv, "carousel-02")
    # 3 split
    cv = Cv(1080, 1350)
    slide_frame(cv, 3)
    cv.text(80, 290, "Split when", 160, PAPER, "Bold Condensed")
    cv.text(80, 430, "it grows.", 160, ACID, "Bold Condensed")
    for i, (lab, val, cls) in enumerate((("Agent node", "77.2–97.2 GB", "128 GB class"), ("Model and RAG node", "41–43 GB", "64 GB class"))):
        y = 520 + i * 330
        cv.rect(80, y, 920, 290, fill=CARD, r=16)
        cv.rect(80, y, 10, 290, fill=ACID if i == 0 else PAPER)
        cv.text(120, y + 56, lab.upper(), 22, MUTE, "Bold", track=3)
        cv.text(120, y + 190, val, 150, PAPER, "Bold Condensed")
        cv.text(120, y + 254, cls, 40, ACID if i == 0 else PAPER, "SemiBold")
    cv.para(80, 1210, "Scenario: six workspaces, Windows VMs, Langfuse, a 30B MoE model. Estimates.", 28, MUTE, "Regular", 920, 1.3)
    done(cv, "carousel-03")
    # 4 machines
    cv = Cv(1080, 1350)
    slide_frame(cv, 4)
    for i, t in enumerate(("Same chip.", "Pick on", "ports.")):
        cv.text(80, 290 + i * 150, t, 160, ACID if i == 2 else PAPER, "Bold Condensed")
    for i, (a, b) in enumerate((("GMKtec EVO-X3", "OCuLink"), ("Minisforum MS-S1 MAX", "Dual 10GbE"))):
        y = 720 + i * 170
        cv.rect(80, y, 920, 140, fill=CARD, r=14)
        cv.text(112, y + 58, a.upper(), 20, MUTE, "Bold", track=2)
        cv.text(112, y + 118, b, 62, PAPER, "Bold Condensed")
    cv.para(80, 1100, "128 GB sits near EUR 4,000 at promo. The MS-S1 MAX regular price is EUR 4,999.", 28, MUTE, "Regular", 920, 1.3)
    done(cv, "carousel-04")
    # 5 buy order
    cv = Cv(1080, 1350)
    slide_frame(cv, 5)
    cv.text(80, 290, "Buy order.", 170, ACID, "Bold Condensed")
    items = ("Measure for a week", "128 GB agent node", "64 GB model node, if needed", "Rent GPU hours first", "Hold the 192 GB machine")
    for i, t in enumerate(items):
        y = 400 + i * 150
        cv.line(80, y, 1000, y, LINE, 2)
        cv.text(80, y + 100, str(i + 1), 100, ACID if i == 0 else PAPER, "Bold Condensed")
        cv.text(200, y + 96, t, 58, PAPER, "Bold Condensed")
    done(cv, "carousel-05")
    # 6 unverified
    cv = Cv(1080, 1350)
    slide_frame(cv, 6, last=True)
    for i, t in enumerate(("What I", "could not", "verify.")):
        cv.text(80, 290 + i * 150, t, 160, ACID if i == 2 else PAPER, "Bold Condensed")
    items = ("Warranty and RMA terms", "Live TikTok and Meta rules", "EU street prices for GPUs", "Measured video retake rate")
    for i, t in enumerate(items):
        y = 780 + i * 90
        cv.rect(80, y - 34, 18, 18, fill=AMBER)
        cv.text(122, y, t, 44, PAPER, "SemiBold")
    cv.text(80, 1200, "Full guide on frankx.ai", 46, ACID, "Bold Condensed")
    done(cv, "carousel-06")


# ---------------------------------------------------------------- run + provenance
memory_ladder()
scorecard()
buy_order()
video_cost()
hero(1600, 900, "hero", True)
hero(1200, 630, "og", False)
thumbnail()
social_landscape()
social_square()
story_cover()
carousel()

ledger = "C:/Users/frank/starlight/logs/image-generation-ledger.jsonl"
now = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
FINAL = len(sys.argv) > 3 and sys.argv[2] == "final"
DEST = sys.argv[3] if FINAL else ""
import hashlib
for p in SAVED if FINAL else []:
    base = os.path.basename(p)
    side_name = base + ".vis.provenance.json"
    prompt = "Procedural layout, no generative model. Text and numbers set in code from content/blog/_drafts/ai-compute-stack-guide-october-2026.mdx via src/build_assets.py."
    rec = {
        "image": base,
        "prompt": prompt,
        "negative_prompt": "",
        "model": "none (Pillow raster render)",
        "provider": "local script src/build_assets.py",
        "seed": None,
        "settings": {"supersample": S, "font": "Bahnschrift (Windows system font)"},
        "agent": {"coding_agent": "claude", "session_ref": "22f28a9a"},
        "evaluation": "viewed at full size; every figure checked against the post",
        "rights_status": "generated-owned",
        "generated_at": now,
    }
    with open(os.path.join(OUT, side_name), "w", encoding="utf-8") as f:
        json.dump(rec, f, indent=2)
    sha = hashlib.sha256(open(p, "rb").read()).hexdigest()
    line = {"timestamp": now, "kind": "procedural-render", "image_path": DEST.rstrip("/\\") + "/" + base, "sidecar_path": DEST.rstrip("/\\") + "/" + side_name, "sha256": sha, "prompt": prompt, "provider": rec["provider"], "model": None, "seed": None, "agent_session": "claude-code-session_01MhgzKbs8hKD3oryP5waesZ", "tested_source": None}
    with open(ledger, "a", encoding="utf-8") as f:
        f.write(json.dumps(line) + "\n")
print("ok", len(SAVED), "images")
