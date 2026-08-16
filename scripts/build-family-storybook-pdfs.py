#!/usr/bin/env python3
"""Build the two print-ready editions of David's family storybook."""

from __future__ import annotations

import io
import json
import shutil
import subprocess
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas


ROOT = Path(__file__).resolve().parents[1]
CONTENT_PATH = ROOT / "app/books/family/story-content.ts"
IMAGE_DIR = ROOT / "public/images/books/family/david"
OUTPUT_DIR = ROOT / "output/pdf"
PUBLIC_DIR = ROOT / "public/books"
PAGE_WIDTH, PAGE_HEIGHT = A4

INK = HexColor("#0D0C0A")
PAPER = HexColor("#F3E8D3")
PAPER_LIGHT = HexColor("#FBF5E9")
AMBER = HexColor("#E8A942")
AMBER_LIGHT = HexColor("#F8D98A")
STONE = HexColor("#A89E8F")
STONE_DARK = HexColor("#514A41")
WHITE = HexColor("#FFFDF8")

FONT_REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
FONT_SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"

pdfmetrics.registerFont(TTFont("StorySans", FONT_REGULAR))
pdfmetrics.registerFont(TTFont("StorySansBold", FONT_BOLD))
pdfmetrics.registerFont(TTFont("StorySerif", FONT_SERIF))
pdfmetrics.registerFont(TTFont("StorySerifBold", FONT_SERIF_BOLD))


def load_story_data() -> dict:
    """Evaluate only the trusted literal in story-content.ts and return JSON."""
    source = CONTENT_PATH.read_text(encoding="utf-8")
    declaration = source.index("export const davidStory")
    start = source.index("= {", declaration) + 2
    end = source.index("\n};\n\nexport const davidSources", start) + 2
    literal = source[start:end]
    js = """
let source = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => source += chunk);
process.stdin.on('end', () => {
  const value = Function('return (' + source + ')')();
  process.stdout.write(JSON.stringify(value));
});
"""
    result = subprocess.run(
        ["node", "-e", js],
        input=literal,
        text=True,
        capture_output=True,
        check=True,
    )
    return json.loads(result.stdout)


def wrap_text(text: str, font: str, size: float, max_width: float) -> list[str]:
    words = text.split()
    if not words:
        return [""]
    lines: list[str] = []
    line = words[0]
    for word in words[1:]:
        candidate = f"{line} {word}"
        if pdfmetrics.stringWidth(candidate, font, size) <= max_width:
            line = candidate
        else:
            lines.append(line)
            line = word
    lines.append(line)
    return lines


def draw_lines(
    canvas: Canvas,
    lines: list[str],
    x: float,
    y: float,
    font: str,
    size: float,
    leading: float,
    color=INK,
) -> float:
    canvas.setFont(font, size)
    canvas.setFillColor(color)
    for line in lines:
        canvas.drawString(x, y, line)
        y -= leading
    return y


def draw_wrapped(
    canvas: Canvas,
    text: str,
    x: float,
    y: float,
    max_width: float,
    font: str = "StorySans",
    size: float = 10,
    leading: float = 14,
    color=INK,
) -> float:
    return draw_lines(
        canvas,
        wrap_text(text, font, size, max_width),
        x,
        y,
        font,
        size,
        leading,
        color,
    )


def fitted_image(path: Path, width: int, height: int, darken: float = 1.0) -> ImageReader:
    with Image.open(path) as image:
        image = image.convert("RGB")
        image = ImageOps.fit(image, (width, height), method=Image.Resampling.LANCZOS)
        if darken != 1.0:
            image = ImageEnhance.Brightness(image).enhance(darken)
        buffer = io.BytesIO()
        image.save(buffer, format="JPEG", quality=91, optimize=True)
        buffer.seek(0)
        return ImageReader(buffer)


def draw_page_number(canvas: Canvas, number: int, light: bool = False) -> None:
    canvas.setFont("StorySans", 7.5)
    canvas.setFillColor(Color(1, 1, 1, 0.42) if light else Color(0.08, 0.07, 0.06, 0.42))
    canvas.drawRightString(PAGE_WIDTH - 35, 25, f"{number:02d}")


def draw_cover(canvas: Canvas, story: dict, locale: str) -> None:
    cover = fitted_image(IMAGE_DIR / "cover.webp", 1500, 2121, darken=0.82)
    canvas.drawImage(cover, 0, 0, PAGE_WIDTH, PAGE_HEIGHT, mask="auto")
    canvas.setFillColor(Color(0.03, 0.025, 0.02, 0.74))
    canvas.rect(0, 0, PAGE_WIDTH, 330, fill=1, stroke=0)
    canvas.setFillColor(AMBER_LIGHT)
    canvas.setFont("StorySansBold", 7.5)
    canvas.drawString(45, 287, story["coverKicker"].upper())

    y = 250
    title_size = 29 if locale == "en" else 27
    title_lines = wrap_text(story["title"], "StorySerifBold", title_size, PAGE_WIDTH - 90)
    y = draw_lines(canvas, title_lines, 45, y, "StorySerifBold", title_size, title_size * 1.16, WHITE)
    y -= 13
    y = draw_wrapped(
        canvas,
        story["subtitle"],
        45,
        y,
        PAGE_WIDTH - 90,
        font="StorySans",
        size=10.5,
        leading=15,
        color=HexColor("#E3DACE"),
    )
    canvas.setStrokeColor(Color(0.97, 0.75, 0.28, 0.55))
    canvas.line(45, 62, 180, 62)
    canvas.setFillColor(AMBER_LIGHT)
    canvas.setFont("StorySerif", 10)
    canvas.drawString(45, 44, story["dedication"])


def draw_intro(canvas: Canvas, story: dict, locale: str, page_number: int) -> None:
    canvas.setFillColor(INK)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    canvas.setFillColor(Color(0.91, 0.66, 0.25, 0.08))
    for radius in (180, 135, 90):
        canvas.circle(PAGE_WIDTH - 55, PAGE_HEIGHT - 80, radius, fill=1, stroke=0)
    canvas.setFillColor(AMBER_LIGHT)
    canvas.setFont("StorySansBold", 8)
    canvas.drawString(54, PAGE_HEIGHT - 90, "HOW TO READ" if locale == "en" else "SO KANNST DU LESEN")
    heading = (
        "One story. More than one depth."
        if locale == "en"
        else "Eine Geschichte. Mehr als eine Tiefe."
    )
    y = draw_wrapped(
        canvas,
        heading,
        54,
        PAGE_HEIGHT - 130,
        PAGE_WIDTH - 108,
        font="StorySerifBold",
        size=25,
        leading=32,
        color=WHITE,
    )
    y -= 25
    intro = (
        "The main pages are written for a child listening beside you. The companion pages preserve ambiguity, difficult history, and the difference between sacred text, tradition, and evidence. Neither layer cancels the other."
        if locale == "en"
        else "Die Hauptseiten sind für ein Kind geschrieben, das neben dir zuhört. Die Begleitseiten bewahren Mehrdeutigkeit, schwierige Geschichte und den Unterschied zwischen heiligem Text, Tradition und historischen Belegen. Keine Ebene macht die andere überflüssig."
    )
    y = draw_wrapped(
        canvas,
        intro,
        54,
        y,
        PAGE_WIDTH - 108,
        size=11.5,
        leading=18,
        color=HexColor("#D6CEC1"),
    )
    y -= 35
    canvas.setStrokeColor(Color(0.97, 0.75, 0.28, 0.34))
    canvas.line(54, y, PAGE_WIDTH - 54, y)
    y -= 37
    canvas.setFillColor(AMBER_LIGHT)
    canvas.setFont("StorySerif", 15)
    canvas.drawString(54, y, story["dedication"])
    y -= 31
    draw_wrapped(
        canvas,
        story["audience"],
        54,
        y,
        PAGE_WIDTH - 108,
        size=9.5,
        leading=14,
        color=STONE,
    )
    draw_page_number(canvas, page_number, light=True)


def draw_story_page(
    canvas: Canvas,
    page: dict,
    image_path: Path,
    story_number: int,
    pdf_page_number: int,
) -> None:
    canvas.setFillColor(INK)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    image_height = 333
    image = fitted_image(image_path, 1500, 840, darken=0.92)
    canvas.drawImage(image, 0, PAGE_HEIGHT - image_height, PAGE_WIDTH, image_height, mask="auto")
    canvas.setFillColor(Color(0.05, 0.045, 0.035, 0.76))
    canvas.rect(0, PAGE_HEIGHT - image_height - 28, PAGE_WIDTH, 72, fill=1, stroke=0)

    x = 47
    max_width = PAGE_WIDTH - 94
    y = PAGE_HEIGHT - image_height - 5
    canvas.setFont("StorySansBold", 7.5)
    canvas.setFillColor(AMBER_LIGHT)
    canvas.drawString(x, y, f"{story_number:02d}  {page['eyebrow'].upper()}")
    y -= 31
    title_lines = wrap_text(page["title"], "StorySerifBold", 21, max_width)
    y = draw_lines(canvas, title_lines, x, y, "StorySerifBold", 21, 26, WHITE)
    y -= 16

    body_size = 9.25
    leading = 13.5
    for paragraph in page["paragraphs"]:
        lines = wrap_text(paragraph, "StorySans", body_size, max_width)
        y = draw_lines(canvas, lines, x, y, "StorySans", body_size, leading, HexColor("#DED7CC"))
        y -= 7

    draw_page_number(canvas, pdf_page_number, light=True)


def draw_deeper_page(
    canvas: Canvas,
    page: dict,
    image_path: Path,
    story_number: int,
    pdf_page_number: int,
    label: str,
) -> None:
    canvas.setFillColor(PAPER_LIGHT)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    canvas.setFillColor(PAPER)
    canvas.rect(0, PAGE_HEIGHT - 238, PAGE_WIDTH, 238, fill=1, stroke=0)
    image = fitted_image(image_path, 1120, 520, darken=0.84)
    canvas.drawImage(image, 46, PAGE_HEIGHT - 205, PAGE_WIDTH - 92, 150, mask="auto")
    canvas.setFillColor(Color(0.03, 0.025, 0.02, 0.46))
    canvas.rect(46, PAGE_HEIGHT - 205, PAGE_WIDTH - 92, 150, fill=1, stroke=0)
    canvas.setFont("StorySansBold", 8)
    canvas.setFillColor(AMBER_LIGHT)
    canvas.drawString(65, PAGE_HEIGHT - 91, f"{label.upper()}  ·  {story_number:02d}")
    canvas.setFont("StorySerifBold", 17)
    canvas.setFillColor(WHITE)
    quote_lines = wrap_text(page["title"], "StorySerifBold", 17, PAGE_WIDTH - 130)
    draw_lines(canvas, quote_lines, 65, PAGE_HEIGHT - 123, "StorySerifBold", 17, 22, WHITE)

    x = 54
    max_width = PAGE_WIDTH - 108
    y = PAGE_HEIGHT - 285
    canvas.setFillColor(AMBER)
    canvas.setFont("StorySansBold", 8)
    canvas.drawString(x, y, page["eyebrow"].upper())
    y -= 39
    title_lines = wrap_text(page["deeperTitle"], "StorySerifBold", 24, max_width)
    y = draw_lines(canvas, title_lines, x, y, "StorySerifBold", 24, 30, INK)
    y -= 24
    for paragraph in page["deeper"]:
        y = draw_wrapped(
            canvas,
            paragraph,
            x,
            y,
            max_width,
            size=11,
            leading=17,
            color=STONE_DARK,
        )
        y -= 14
    canvas.setStrokeColor(Color(0.91, 0.66, 0.25, 0.45))
    canvas.line(x, 72, x + 80, 72)
    canvas.setFont("StorySans", 7.5)
    canvas.setFillColor(STONE_DARK)
    canvas.drawString(x, 54, label)
    draw_page_number(canvas, pdf_page_number)


def draw_section_header(canvas: Canvas, kicker: str, title: str, page_number: int) -> float:
    canvas.setFillColor(PAPER_LIGHT)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    canvas.setFont("StorySansBold", 8)
    canvas.setFillColor(AMBER)
    canvas.drawString(52, PAGE_HEIGHT - 70, kicker.upper())
    title_lines = wrap_text(title, "StorySerifBold", 27, PAGE_WIDTH - 104)
    y = draw_lines(
        canvas,
        title_lines,
        52,
        PAGE_HEIGHT - 108,
        "StorySerifBold",
        27,
        34,
        INK,
    )
    draw_page_number(canvas, page_number)
    return y - 28


def draw_lenses(canvas: Canvas, story: dict, locale: str, page_number: int) -> None:
    y = draw_section_header(
        canvas,
        "After the story" if locale == "en" else "Nach der Geschichte",
        story["ui"]["readingLenses"],
        page_number,
    )
    card_width = PAGE_WIDTH - 104
    for index, lens in enumerate(story["lenses"], start=1):
        card_height = 150
        canvas.setFillColor(PAPER)
        canvas.roundRect(52, y - card_height, card_width, card_height, 14, fill=1, stroke=0)
        canvas.setFillColor(AMBER)
        canvas.setFont("StorySansBold", 8)
        canvas.drawString(72, y - 29, f"0{index}")
        canvas.setFillColor(INK)
        canvas.setFont("StorySerifBold", 17)
        canvas.drawString(72, y - 59, lens["title"])
        draw_wrapped(
            canvas,
            lens["text"],
            72,
            y - 88,
            card_width - 40,
            size=9.5,
            leading=14,
            color=STONE_DARK,
        )
        y -= card_height + 14


def draw_timeline(canvas: Canvas, story: dict, locale: str, page_number: int) -> None:
    y = draw_section_header(
        canvas,
        "Context" if locale == "en" else "Hintergrund",
        story["ui"]["timeline"],
        page_number,
    )
    x = 82
    canvas.setStrokeColor(Color(0.91, 0.66, 0.25, 0.55))
    canvas.setLineWidth(1.5)
    canvas.line(x, y - 8, x, 135)
    for item in story["timeline"]:
        canvas.setFillColor(AMBER)
        canvas.circle(x, y - 5, 4, fill=1, stroke=0)
        canvas.setFont("StorySansBold", 8.5)
        canvas.setFillColor(AMBER)
        canvas.drawString(x + 24, y, item["date"].upper())
        y = draw_wrapped(
            canvas,
            item["event"],
            x + 24,
            y - 23,
            PAGE_WIDTH - x - 78,
            size=10.5,
            leading=15,
            color=STONE_DARK,
        )
        y -= 31
    draw_wrapped(
        canvas,
        story["sourceIntro"],
        52,
        92,
        PAGE_WIDTH - 104,
        size=8.5,
        leading=13,
        color=STONE_DARK,
    )


def draw_questions(canvas: Canvas, story: dict, locale: str, page_number: int) -> None:
    y = draw_section_header(
        canvas,
        "Read together" if locale == "en" else "Gemeinsam weiterlesen",
        story["ui"]["conversation"],
        page_number,
    )
    for index, question in enumerate(story["conversation"], start=1):
        canvas.setFillColor(AMBER)
        canvas.setFont("StorySansBold", 8)
        canvas.drawString(54, y, f"{index:02d}")
        lines = wrap_text(question, "StorySerif", 12.5, PAGE_WIDTH - 145)
        y = draw_lines(canvas, lines, 93, y, "StorySerif", 12.5, 18, INK)
        y -= 23


SOURCES = [
    (("1 Samuel 17", "1. Samuel 17"), "https://www.sefaria.org/I_Samuel.17"),
    (("2 Samuel 12", "2. Samuel 12"), "https://www.sefaria.org/II_Samuel.12?lang=en"),
    (("Psalm 23", "Psalm 23"), "https://www.sefaria.org/Psalms.23"),
    (("BibleProject - Psalms", "BibleProject - Psalmen"), "https://bibleproject.com/guides/book-of-psalms/"),
    (("Qur'an 38:18-26", "Koran 38:18-26"), "https://quran.com/sad/18"),
    (("Qur'an 34:10-11", "Koran 34:10-11"), "https://quran.com/saba/10-11"),
    (("Museum of the Bible - Tel Dan Stele", "Museum of the Bible - Tel-Dan-Stele"), "https://www.museumofthebible.org/exhibits/teldanstelemotb"),
    (("University of Warsaw - the name David", "Universität Warschau - der Name David"), "https://repozytorium.uw.edu.pl/server/api/core/bitstreams/1de5eaea-08d9-4ae9-985e-0d5a14cb4633/content"),
]


def draw_sources(canvas: Canvas, story: dict, locale: str, page_number: int) -> None:
    y = draw_section_header(
        canvas,
        "Source trail" if locale == "en" else "Spuren zu den Quellen",
        story["ui"]["sources"],
        page_number,
    )
    y = draw_wrapped(
        canvas,
        story["sourceIntro"],
        52,
        y,
        PAGE_WIDTH - 104,
        size=9.5,
        leading=14,
        color=STONE_DARK,
    )
    y -= 22
    for index, (labels, url) in enumerate(SOURCES, start=1):
        label = labels[0] if locale == "en" else labels[1]
        canvas.setFillColor(AMBER)
        canvas.setFont("StorySansBold", 8)
        canvas.drawString(54, y, f"{index:02d}")
        canvas.setFillColor(INK)
        canvas.setFont("StorySansBold", 9.2)
        canvas.drawString(90, y, label)
        width = pdfmetrics.stringWidth(label, "StorySansBold", 9.2)
        canvas.linkURL(url, (90, y - 3, 90 + width, y + 11), relative=0)
        y -= 22
        hostname = url.split("/")[2].removeprefix("www.")
        canvas.setFillColor(STONE_DARK)
        canvas.setFont("StorySans", 7.5)
        canvas.drawString(90, y, hostname)
        y -= 28


def draw_five_stones(canvas: Canvas, locale: str, page_number: int) -> None:
    title = "Five stones for an ordinary morning" if locale == "en" else "Fünf Steine für einen gewöhnlichen Morgen"
    y = draw_section_header(
        canvas,
        "Carry it onward" if locale == "en" else "Nimm es mit",
        title,
        page_number,
    )
    labels = (
        ["Listen", "Practice", "Protect", "Keep faith", "Return to truth"]
        if locale == "en"
        else ["Zuhören", "Üben", "Schützen", "Treue halten", "Zur Wahrheit zurückkehren"]
    )
    positions = [(135, y - 75), (290, y - 50), (445, y - 75), (210, y - 210), (375, y - 210)]
    for index, ((x, center_y), label) in enumerate(zip(positions, labels), start=1):
        canvas.setFillColor(HexColor("#C6B798"))
        canvas.ellipse(x - 52, center_y - 34, x + 52, center_y + 34, fill=1, stroke=0)
        canvas.setFillColor(Color(1, 1, 1, 0.30))
        canvas.ellipse(x - 33, center_y + 10, x + 24, center_y + 24, fill=1, stroke=0)
        canvas.setFillColor(INK)
        canvas.setFont("StorySansBold", 7.5)
        canvas.drawCentredString(x, center_y + 2, f"0{index}")
        lines = wrap_text(label, "StorySansBold", 8, 104)
        draw_lines(canvas, lines, x - 52, center_y - 52, "StorySansBold", 8, 11, STONE_DARK)
    closing = (
        "A name is a seed, not a cage."
        if locale == "en"
        else "Ein Name ist ein Samenkorn, kein Käfig."
    )
    canvas.setFont("StorySerif", 17)
    canvas.setFillColor(AMBER)
    canvas.drawCentredString(PAGE_WIDTH / 2, 105, closing)


def draw_colophon(canvas: Canvas, story: dict, locale: str, page_number: int) -> None:
    canvas.setFillColor(INK)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    canvas.setFillColor(Color(0.91, 0.66, 0.25, 0.10))
    canvas.circle(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 + 45, 175, fill=1, stroke=0)
    closing = (
        "The story ends here. The song does not."
        if locale == "en"
        else "Die Geschichte endet hier. Das Lied nicht."
    )
    y = draw_wrapped(
        canvas,
        closing,
        58,
        PAGE_HEIGHT - 190,
        PAGE_WIDTH - 116,
        font="StorySerifBold",
        size=27,
        leading=35,
        color=WHITE,
    )
    y -= 35
    canvas.setFont("StorySerif", 15)
    canvas.setFillColor(AMBER_LIGHT)
    canvas.drawString(58, y, story["dedication"])
    y -= 55
    draw_wrapped(
        canvas,
        story["colophon"],
        58,
        y,
        PAGE_WIDTH - 116,
        size=8.5,
        leading=13,
        color=STONE,
    )
    canvas.setFont("StorySansBold", 8)
    canvas.setFillColor(STONE)
    canvas.drawString(58, 65, "FRANKX.AI / BOOKS / FAMILY")
    draw_page_number(canvas, page_number, light=True)


def build_pdf(locale: str, story: dict, output_path: Path) -> None:
    canvas = Canvas(str(output_path), pagesize=A4, pageCompression=1)
    canvas.setTitle(story["title"])
    canvas.setAuthor("FrankX")
    canvas.setSubject(story["subtitle"])
    canvas.setCreator("FrankX Family Library")

    draw_cover(canvas, story, locale)
    canvas.showPage()
    draw_intro(canvas, story, locale, 2)
    canvas.showPage()

    image_names = [
        "01-name.webp",
        "01-name.webp",
        "02-hills.webp",
        "03-music.webp",
        "04-valley.webp",
        "05-friendship.webp",
        "06-lamb.webp",
        "07-songs.webp",
        "08-shard.webp",
        "09-five-stones.webp",
    ]
    for index, (page, image_name) in enumerate(zip(story["pages"], image_names), start=1):
        draw_story_page(canvas, page, IMAGE_DIR / image_name, index, index + 2)
        canvas.showPage()

    deeper_label = "For bigger readers" if locale == "en" else "Für größere Leser"
    for index, (page, image_name) in enumerate(zip(story["pages"], image_names), start=1):
        draw_deeper_page(canvas, page, IMAGE_DIR / image_name, index, index + 12, deeper_label)
        canvas.showPage()

    draw_lenses(canvas, story, locale, 23)
    canvas.showPage()
    draw_timeline(canvas, story, locale, 24)
    canvas.showPage()
    draw_questions(canvas, story, locale, 25)
    canvas.showPage()
    draw_sources(canvas, story, locale, 26)
    canvas.showPage()
    draw_five_stones(canvas, locale, 27)
    canvas.showPage()
    draw_colophon(canvas, story, locale, 28)
    canvas.save()


def main() -> None:
    stories = load_story_data()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    targets = {
        "en": "david-and-the-song-inside-his-name.pdf",
        "de": "david-und-das-lied-in-seinem-namen.pdf",
    }
    for locale, filename in targets.items():
        output = OUTPUT_DIR / filename
        build_pdf(locale, stories[locale], output)
        shutil.copy2(output, PUBLIC_DIR / filename)
        print(f"built {output.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
