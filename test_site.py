import urllib.request
import re
import os

base_url = 'http://localhost:3000'
pages = ['/', '/index.html', '/menu.html', '/branches.html', '/promotions.html']
assets = [
    '/assets/css/styles.css',
    '/assets/js/i18n.js',
    '/assets/js/app.js',
    '/assets/images/logo.png',
    '/assets/images/hero_mala_bowl.jpg',
    '/assets/images/steps/step1_pick.jpg',
    '/assets/images/steps/step2_weigh.jpg',
    '/assets/images/steps/step3_flavor.jpg',
    '/assets/images/steps/step4_enjoy.jpg',
    '/assets/images/reviews/review_1.png',
    '/assets/images/reviews/review_10.png'
]

print("=== STARTING AUTOMATED TEST SUITE FOR LA-MI MALATANG ===\n")

passed = 0
failed = 0

# 1. Test Page HTTP Responses
print("--- 1. Testing HTML Page Routes ---")
for p in pages:
    url = base_url + p
    try:
        req = urllib.request.urlopen(url)
        status = req.getcode()
        if status == 200:
            print(f"  [PASS] {p} -> HTTP 200 OK")
            passed += 1
        else:
            print(f"  [FAIL] {p} -> HTTP {status}")
            failed += 1
    except Exception as e:
        print(f"  [FAIL] {p} -> Error: {e}")
        failed += 1

# 2. Test Asset HTTP Responses
print("\n--- 2. Testing Asset Requests (CSS / JS / Images) ---")
for a in assets:
    url = base_url + a
    try:
        req = urllib.request.urlopen(url)
        status = req.getcode()
        size = len(req.read())
        if status == 200 and size > 0:
            print(f"  [PASS] {a} -> HTTP 200 OK ({size:,} bytes)")
            passed += 1
        else:
            print(f"  [FAIL] {a} -> HTTP {status} (size: {size})")
            failed += 1
    except Exception as e:
        print(f"  [FAIL] {a} -> Error: {e}")
        failed += 1

# 3. Check for broken internal links in HTML files
print("\n--- 3. Testing HTML Internal Links & References ---")
html_files = ['index.html', 'menu.html', 'branches.html', 'promotions.html']
for h in html_files:
    path = os.path.join('D:/mala', h)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # find src and href attributes
        refs = re.findall(r'(?:src|href)=["\']([^"\']+)["\']', content)
        broken = []
        for r in refs:
            if r.startswith('http') or r.startswith('#') or r.startswith('tel:'):
                continue
            clean_r = r.split('#')[0]
            if not clean_r:
                continue
            ref_path = os.path.normpath(os.path.join('D:/mala', clean_r))
            if not os.path.exists(ref_path):
                broken.append(r)
        
        if len(broken) == 0:
            print(f"  [PASS] {h} -> All internal file links exist ({len(refs)} refs checked)")
            passed += 1
        else:
            print(f"  [FAIL] {h} -> Broken links found: {broken}")
            failed += 1

print(f"\n=== FINAL TEST RESULTS: {passed} PASSED, {failed} FAILED ===")
