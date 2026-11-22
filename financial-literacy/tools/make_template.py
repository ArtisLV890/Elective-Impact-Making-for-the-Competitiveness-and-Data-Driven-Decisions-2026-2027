"""Create the Word report template (styles, header/footer) used for all reports.

Run from the repository root:  python3 financial-literacy/tools/make_template.py
Output: financial-literacy/templates/report-template.docx  (also usable directly in Word)
"""
import subprocess
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor, Cm

OUT = "financial-literacy/templates/report-template.docx"
INK = RGBColor(0x1F, 0x2A, 0x37)
SEC = RGBColor(0x5B, 0x64, 0x70)
ACC = RGBColor(0x2A, 0x78, 0xD6)
FONT = "Calibri"

subprocess.run(f'mkdir -p financial-literacy/templates && pandoc -o "{OUT}" --print-default-data-file reference.docx', shell=True, check=True)
doc = Document(OUT)
_styles = {st.name.lower(): st for st in doc.styles}


class _S:
    def __getitem__(self, k):
        return _styles[k.lower()]

    def __iter__(self):
        return iter(doc.styles)


S = _S()


def font(style, size=None, bold=None, color=None, italic=None, name=FONT):
    f = style.font
    f.name = name
    rpr = style.element.get_or_add_rPr()
    rfonts = rpr.find(qn("w:rFonts"))
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        rpr.append(rfonts)
    for a in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
        rfonts.set(qn(a), name)
    for a in ("w:asciiTheme", "w:hAnsiTheme", "w:cstheme", "w:eastAsiaTheme"):
        if rfonts.get(qn(a)) is not None:
            del rfonts.attrib[qn(a)]
    if size: f.size = Pt(size)
    if bold is not None: f.bold = bold
    if italic is not None: f.italic = italic
    if color is not None: f.color.rgb = color


def spacing(style, before=0, after=6, line=1.15):
    pf = style.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    pf.line_spacing = line


def border(style, side="bottom", color="2A78D6", sz=8, space=4):
    ppr = style.element.get_or_add_pPr()
    pbdr = ppr.find(qn("w:pBdr"))
    if pbdr is None:
        pbdr = OxmlElement("w:pBdr")
        ppr.append(pbdr)
    el = OxmlElement(f"w:{side}")
    el.set(qn("w:val"), "single"); el.set(qn("w:sz"), str(sz)); el.set(qn("w:space"), str(space)); el.set(qn("w:color"), color)
    pbdr.append(el)


def shade(style, fill="EEF4FC"):
    ppr = style.element.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear"); shd.set(qn("w:color"), "auto"); shd.set(qn("w:fill"), fill)
    ppr.append(shd)


# Body
for name in ("Normal", "Body Text", "First Paragraph", "Compact"):
    if name.lower() in _styles:
        font(S[name], 10.5, color=INK)
        spacing(S[name], 0, 6 if name != "Compact" else 2, 1.15)
# Title block
font(S["Title"], 24, True, INK); spacing(S["Title"], 0, 4, 1.0); S["Title"].paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
border(S["Title"], "bottom", "2A78D6", 18, 6)
font(S["Subtitle"], 13, False, SEC); spacing(S["Subtitle"], 6, 4); S["Subtitle"].paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
for n in ("Author", "Date"):
    font(S[n], 10, False, SEC); spacing(S[n], 0, 2); S[n].paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
font(S["Abstract"], 10.5, False, INK, italic=False); shade(S["Abstract"], "EEF4FC")
# Headings
font(S["Heading 1"], 16, True, INK); spacing(S["Heading 1"], 18, 6, 1.0); border(S["Heading 1"], "bottom", "D5DBE1", 6, 4)
S["Heading 1"].paragraph_format.keep_with_next = True
font(S["Heading 2"], 13, True, ACC); spacing(S["Heading 2"], 12, 4, 1.0); S["Heading 2"].paragraph_format.keep_with_next = True
font(S["Heading 3"], 11, True, INK); spacing(S["Heading 3"], 8, 2, 1.0); S["Heading 3"].paragraph_format.keep_with_next = True
# Key-finding callout = Markdown blockquote (pandoc "Block Text")
bt = S["Block Text"]
font(bt, 10.5, False, INK, italic=False); shade(bt, "EEF4FC"); border(bt, "left", "2A78D6", 24, 8)
bt.paragraph_format.left_indent = Cm(0.3); bt.paragraph_format.right_indent = Cm(0.3); spacing(bt, 6, 6)
# Captions and tables
for n in ("Caption", "Image Caption", "Table Caption"):
    if n.lower() in _styles:
        font(S[n], 9, False, SEC, italic=True); spacing(S[n], 2, 10)
# Links
if "hyperlink" in _styles:
    S["Hyperlink"].font.color.rgb = ACC

# Page setup, header, footer with page number
sec = doc.sections[0]
sec.page_height, sec.page_width = Cm(29.7), Cm(21.0)
sec.left_margin = sec.right_margin = Cm(2.2)
sec.top_margin, sec.bottom_margin = Cm(2.0), Cm(2.0)
hp = sec.header.paragraphs[0]
hp.text = "Financial literacy in Latvia  |  Impact case"
hp.runs[0].font.size = Pt(8); hp.runs[0].font.color.rgb = SEC; hp.runs[0].font.name = FONT
fp = sec.footer.paragraphs[0]
fp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
r = fp.add_run()
for t, v in (("begin", None), (None, "PAGE"), ("end", None)):
    if t:
        el = OxmlElement("w:fldChar"); el.set(qn("w:fldCharType"), t); r._r.append(el)
    else:
        el = OxmlElement("w:instrText"); el.set(qn("xml:space"), "preserve"); el.text = v; r._r.append(el)
r.font.size = Pt(8); r.font.color.rgb = SEC

# Table style used by pandoc ("Table"): header row shading + light grid
tbl = S["Table"]
tpr = tbl.element.find(qn("w:tblPr"))
if tpr is None:
    tpr = OxmlElement("w:tblPr"); tbl.element.append(tpr)
borders = OxmlElement("w:tblBorders")
for side in ("top", "bottom", "insideH"):
    e = OxmlElement(f"w:{side}"); e.set(qn("w:val"), "single"); e.set(qn("w:sz"), "4"); e.set(qn("w:color"), "D5DBE1"); borders.append(e)
tpr.append(borders)
font(tbl, 9.5, color=INK)

doc.save(OUT)
print("saved", OUT)
