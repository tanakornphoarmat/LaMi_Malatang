import os
import re

html_dir = r"D:\mala"

for filename in os.listdir(html_dir):
    if not filename.endswith('.html'): continue
    filepath = os.path.join(html_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    links_match = re.search(r'<div class="nav__menu">(.*?)</div>', content, re.DOTALL)
    if not links_match:
        links = re.findall(r'<a[^>]+class="[^"]*nav__link[^"]*"[^>]*>.*?</a>', content, re.DOTALL)
        if not links:
            continue
    else:
        links_html = links_match.group(1).strip()
        links = re.findall(r'<a.*?</a>', links_html, re.DOTALL)
    
    if len(links) >= 7:
        left_links = links[0:3] 
        right_links = links[3:7] 
    else:
        left_links = links[:len(links)//2]
        right_links = links[len(links)//2:]

    left_html = "\n                ".join(left_links)
    right_html = "\n                ".join(right_links)

    new_header_inner = f'''<div class="header__inner">
            <div class="header__left">
                <nav class="nav">
                    {left_html}
                </nav>
            </div>
            
            <a href="index.html" class="header__logo">
                <img src="assets/images/logo.png" alt="LA-MI MALATANG">
                <div class="header__logo-text">LA-MI<small>MALATANG</small></div>
            </a>
            
            <div class="header__right">
                <nav class="nav">
                    {right_html}
                </nav>
                <!-- <div class="header__cta">
                    <a href="branches.html" class="btn btn--primary btn--sm" style="padding: 6px 14px; font-size: 0.75rem;">สาขา</a>
                </div> -->
            </div>
            
            <div class="nav__toggle" id="navToggle">'''
            
    pattern = re.compile(r'<div class="header__inner">.*?<div class="nav__toggle" id="navToggle">', re.DOTALL)
    new_content = pattern.sub(new_header_inner, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {filename}")
