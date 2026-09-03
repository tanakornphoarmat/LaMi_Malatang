import re

with open('assets/js/i18n.js', 'r', encoding='utf-8') as f:
    js_text = f.read()

html_files = ['index.html', 'menu.html', 'branches.html', 'promotions.html']

print("=== CHECKING MISSING DATA-I18N ATTRIBUTES ===")

for h in html_files:
    with open(h, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"\n--- FILE: {h} ---")
    
    # Find data-i18n keys
    keys_in_html = re.findall(r'data-i18n=["\']([^"\']+)["\']', content)
    for k in set(keys_in_html):
        if f"{k}:" not in js_text:
            print(f"  [MISSING IN JS]: {k}")
            
    # Find text inside tags that might not have data-i18n
    tags = re.findall(r'<([a-zA-Z0-9]+)([^>]*)>([^<]+)</\1>', content)
    for tagname, attrs, text in tags:
        text_str = text.strip()
        if len(text_str) > 1 and 'data-i18n' not in attrs:
            if not re.match(r'^[0-9\s\.\+\-%\$\u20bf\u0e3f\:\,\🧭📍📞💬🔥🥢🌶️⭐\&\;\©]+$', text_str):
                try:
                    print(f"  [MISSING DATA-I18N] <{tagname} {attrs.strip()}>: {text_str}")
                except Exception:
                    pass

print("\n=== AUDIT COMPLETED ===")
