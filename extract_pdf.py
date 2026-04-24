import fitz
doc = fitz.open('/Users/firas.saidani/Documents/demo-test/GHCP - Walkthrough.pdf')
for i, page in enumerate(doc):
    print(f"=== PAGE {i+1} ===")
    print(page.get_text())
