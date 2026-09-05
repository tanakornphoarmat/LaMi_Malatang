# LA-MI MALATANG - Project Context & Development History

ไฟล์นี้จัดทำขึ้นเพื่อบันทึกประวัติการพัฒนาและสิ่งที่ได้ดำเนินการไปทั้งหมดในโปรเจกต์ **LA-MI MALATANG Mock UI (v2)** จากบทสนทนาระหว่างผู้ใช้และ AI

---

## 📋 สรุปความต้องการเริ่มต้น (The Brief)
ผู้ใช้ได้ส่ง "LA-MI MALATANG — Mock UI Brief (v2)" โดยมีเป้าหมายหลักคือการอัปเกรดเว็บไซต์ Mock UI เดิมให้ดูเป็น **"เว็บไซต์ Official ของเชนร้านอาหาร"** ที่มีความน่าเชื่อถือ พรีเมียม และมีระบบจัดการที่ชัดเจน โดยอ้างอิงจาก 3 เว็บไซต์:
1. **Savory Malatang:** ความสนุกแบบ DIY, การใช้คำสั้นๆ เข้าใจง่าย, Counter ตัวเลข, Header โปร่งใส
2. **Tang Tang Mala:** โครงสร้าง One-page scroll, Gallery ภาพรวม
3. **MK Restaurant:** ระบบหน้าแยกย่อย (Menu, Branches, Promotions), ระบบค้นหาและ Filter ข้อมูล, โครงสร้าง Footer ระดับองค์กร

---

## 🛠️ ขั้นตอนที่ได้ดำเนินการทั้งหมด (What We Did)

### 1. การสำรวจและจัดเตรียม Assets
- สำรวจไฟล์ในโฟลเดอร์ `D:\mala` เพื่อดึงรูปภาพโลโก้และรูปอาหารที่มีอยู่มาใช้งาน
- ใช้ AI สร้างรูปภาพประกอบระดับมืออาชีพเพิ่มเติม (Professional Food Photography) เช่น ภาพ Hero (ชามหม่าล่า), ภาพ Sauce Bar และ ภาพ Ingredients Flatlay
- จัดโครงสร้างโฟลเดอร์ใหม่ให้อยู่ในรูปแบบที่เป็นระเบียบ:
  - `assets/images/` สำหรับรูปภาพ
  - `assets/css/` สำหรับไฟล์สไตล์
  - `assets/js/` สำหรับไฟล์สคริปต์

### 2. การสร้าง Design System & Core Scripts
- **`assets/css/styles.css`:** สร้าง Design System กลางคุมโทนสี (Chili Red, Charcoal, Gold, Off-white) และ Typography (Chonburi, Sarabun, Montserrat) พร้อม UI Components เช่น ปุ่ม (Dual CTA), Cards, Tabs, Glassmorphic overlays และ Animations
- **`assets/js/app.js`:** เขียนสคริปต์แบบ Vanilla JS ควบคุม:
  - Scroll Animations (Reveal) และ Sticky Header
  - ระบบ Mobile Menu (Hamburger)
  - ระบบ Filtering สำหรับหน้า Menu, Branches และ Promotions
  - Counter Numbers นับตัวเลขแอนิเมชัน

### 3. การปรับแต่ง UI/UX & เลย์เอาต์ตามความต้องการเฉพาะ (Custom Tweaks)
- **การถอดส่วนที่ไม่จำเป็นออก:** ถอดส่วนเครื่องคิดเลขราคา (`PRICE CALCULATOR / WONDERING HOW MUCH?`) ออกจากหน้าหลักตามคำขอของผู้ใช้
- **การปรับแต่งขั้นตอนการสั่งซื้อ (HOW TO ORDER):**
  - เอาไอคอนสัญลักษณ์เดิมออกทั้งหมด
  - นำรูปภาพจริงมาใส่เต็มกรอบการ์ดขั้นตอนการสั่ง 4 ใบ (`step1_pick.jpg`, `step2_weigh.jpg`, `step3_flavor.jpg`, `step4_enjoy.jpg`)
  - ล็อคความสูงของกรอบการ์ดเท่ากันเป๊ะที่ `320px` ด้วย `object-fit: cover` เพื่อแก้ปัญหารูปภาพทรงสูง (เช่น โปสเตอร์ *หม่าล่า2*) โดดสูงกว่ารูปอื่น
  - เพิ่มเอฟเฟกต์กระจกฝ้า (Glassmorphism) ซ้อนทับฉากหลัง วางตัวเลขอังกฤษสีทอง (`01`-`04`) และป้ายแคปซูลไทยสีแดงชิลลี่ไว้ตรงกลางกรอบ เพื่อให้ตัวหนังสือลอยเด่น ไม่จมไปกับภาพ

### 4. การพัฒนาระบบสลับ 2 ภาษา ไทย/อังกฤษ (Multi-Language Engine TH/EN)
- **`assets/js/i18n.js`:** สร้างไฟล์ระบบแปลภาษาแบบ Vanilla JS รองรับการสลับภาษาแบบ Dynamic
- เพิ่มปุ่มสลับภาษา `TH | EN` ที่มุมขวาบนของ Header และใน Mobile Menu ของทุกๆ หน้า
- ผูกคุณสมบัติ `data-i18n` และ `data-i18n-ph` ครอบคลุมข้อความสำคัญทั่วทั้งเว็บไซต์
- ระบบจดจำภาษาที่เลือกอัตโนมัติด้วย `localStorage` ช่วยให้ภาษาไม่หลุดเมื่อกดสลับหน้าไปมา

### 5. การอัปเดตข้อมูลติดต่อจริง ลิงก์โซเชียลมีเดีย และแผนที่ Google Maps
- **เบอร์โทรศัพท์:** อัปเดตเบอร์ติดต่อจริงเป็น **`087-495-5835`** (สามารถกดเพื่อโทรออก `tel:0874955835` ได้ทันที)
- **ที่อยู่สาขาพัทยา:** อัปเดตเป็น **`8/111-117 Little Walk Pattaya Amphoe Bang Lamung, Thailand, Chon Buri 20150`**
- **ปุ่มนำทาง GET DIRECTIONS (Google Maps):** เชื่อมต่อลิงก์พิกัดตรง Google Maps CID แท้:
  - **สาขาพัทยา:** `https://www.google.com/maps?cid=8609748477386677717`
  - **สาขาอ่าวอุดม:** `https://www.google.com/maps?cid=16844624302920910199`
- **Facebook Page:** เชื่อมต่อลิงก์ไปยังเพจร้านแท้: `https://www.facebook.com/profile.php?id=100093087823403`
- **การเคลียร์ข้อมูลเก่า:** ถอดอีเมลเดิม และถอดลิงก์โซเชียลมีเดียที่ยังไม่มีออก (Instagram, TikTok, LINE)

### 6. การพัฒนาหน้าเว็บไซต์ทั้งหมด (HTML Pages)
- **`index.html` (Home Page):** One-page scroll รวม Hero Banner, แบรนด์สเตทเมนต์, วิธีการสั่งซื้อแบบการ์ดภาพพรีเมียม, แถบน้ำจิ้ม, ข้อมูลร้าน, รีวิวลูกค้า และช่องทางติดต่อ
- **`menu.html` (Menu Page):** หน้ารวมวัตถุดิบ 20+ รายการ พร้อมระบบค้นหา (Search) และแท็บกรองหมวดหมู่
- **`branches.html` (Branches Page):** หน้าค้นหาสาขา (Pattaya, Ao Udom) พร้อมระบบ Dropdown กรองตามพื้นที่ ข้อมูลเวลาเปิด-ปิด และปุ่มกดนำทาง GET DIRECTIONS
- **`promotions.html` (Promotions Page):** หน้ารวมข่าวสารและโปรโมชั่น พร้อมแท็บกรองประเภท (โปรโมชั่น / ข่าวสาร / กิจกรรม)

### 7. การจัดทำเอกสารและการทดสอบ
- สร้างและอัปเดตไฟล์ **`README.md`** สำหรับคู่มือโปรเจกต์
- อัปเดตไฟล์ **`context.md`** (ไฟล์นี้) เพื่อบันทึกบริบทและการทำงานทั้งหมด
### 8. การเปลี่ยนระบบรีวิว (WHAT PEOPLE SAY) เป็นภาพรีวิวจาก Google Maps จริง 10 ภาพ
- **ถอดข้อมูลข้อความรีวิวเดิม (Mock Data) ออกทั้งหมด** ตามคำขอของผู้ใช้
- **นำภาพแคปหน้าจอรีวิว Google Maps จริง 10 ภาพ** มาจัดวางในโฟลเดอร์ `assets/images/review_1.png` ถึง `review_10.png`
- **ออกแบบ Responsive Grid Layout 5 คอลัมน์ (10 รูปเรียงกันอย่างมีมิติ):**
  - แสดงผล 5 คอลัมน์ x 2 แถว บนหน้าจอ Desktop
  - ปรับการแสดงผลอัตโนมัติ 3 คอลัมน์บน Tablet และ 2 คอลัมน์บน Mobile
  - ตกแต่งการ์ดสไตล์พรีเมียม ขอบมน เงาละมุน (Shadow + Border) และมีป้ายกำกับ `⭐ Google Review` ด้านบน
  - เพิ่มเอฟเฟกต์ hover ยกตัวขึ้นพร้อมแสงเงาพรีเมียม
- **ระบบ Lightbox Zoom View:** เพิ่มฟังก์ชันใน `assets/js/app.js` เมื่อคลิกที่รูปภาพรีวิวใดๆ จะมีหน้าต่างป็อบอัพขยายภาพรีวิวความละเอียดสูงแบบเต็มจอ ให้ผู้เข้าชมอ่านข้อความรีวิวได้ชัดเจน


### 9. การแก้บั๊ก JavaScript และการทดสอบระบบอัตโนมัติ (2026-09-03)
- **แก้บั๊กร้ายแรงใน `assets/js/app.js`:** บล็อก IMAGE LAZY LOADING เดิมเขียนวงเล็บปิดไม่ครบ (`IntersectionObserver` ไม่มี closing braces / `.observe()`) ส่งผลให้ไฟล์ JS ทั้งไฟล์พังตั้งแต่จุดนั้นเป็นต้นไป ทำให้ **ระบบ Lightbox ขยายภาพรีวิวใช้งานไม่ได้**
  - แก้ไขโดยห่อด้วย `if (lazyImages.length > 0)` ปิดวงเล็บให้ครบ และเพิ่ม `lazyObserver.unobserve(img)` หลังโหลดรูปเสร็จเพื่อไม่ให้ observer ทำงานซ้ำ
- **เพิ่ม Safety Fallback ให้ Scroll Reveal:** ตั้ง `setTimeout` 1 วินาที บังคับใส่คลาส `visible` ให้ทุก element ที่รอ reveal เผื่อกรณี `IntersectionObserver` ไม่ทำงาน (เช่น เปิดจาก `file://` หรือเบราว์เซอร์เก่า) ป้องกันปัญหาเนื้อหาหายทั้งหน้า
- **สร้างสคริปต์ทดสอบอัตโนมัติ `test_site.py`:** ตรวจ HTTP status ของ 5 routes, โหลด assets 11 ไฟล์ (CSS/JS/รูป) และไล่เช็กลิงก์ภายใน `src`/`href` ทั้งหมดว่าไฟล์มีอยู่จริง
  - **ผลการรันล่าสุด: 20 PASSED / 0 FAILED** — ลิงก์ภายใน 193 refs ใน 4 ไฟล์ HTML ไม่มีจุดที่พังเลย
- **สร้างสคริปต์ตรวจสอบภาษา `check_i18n.py`:** ไล่เทียบ key `data-i18n` ในไฟล์ HTML กับ `assets/js/i18n.js` และหาข้อความที่ยังไม่ได้ผูกระบบแปลภาษา
  - **ผลการรันล่าสุด:** key `data-i18n` ที่มีอยู่ **มีครบใน `i18n.js` ทุกตัว (0 missing)** แต่ยังพบข้อความที่ยังไม่ผูก `data-i18n` รวม 234 จุด (menu.html 114, promotions.html 57, index.html 31, branches.html 31)
  - ตัวอย่างที่ยังค้าง: `<title>` ทุกหน้า, counter labels (สาขา / ชนิดวัตถุดิบ / สูตรซุป / ราคาเริ่มต้น), หัวข้อ `FOLLOW LA-MI`, `READY FOR YOUR MALA?`, ปุ่ม `FIND A BRANCH` / `VIEW MENU`, ข้อความใน Footer และรายการวัตถุดิบเกือบทั้งหมดใน `menu.html`
  - หมายเหตุ: ตัวเลข 234 รวม false positive ที่ไม่ต้องแปลอยู่แล้ว (เช่น ปุ่ม `TH`/`EN`, ชื่อแบรนด์ `LA-MI MALATANG`) ของจริงที่ควรแก้ประมาณ 150-180 จุด
- **วิธีรันเว็บไซต์ในเครื่อง (Local Dev Server):**
  ```bash
  cd D:\mala
  python -m http.server 3000 --bind 127.0.0.1
  # เปิด http://127.0.0.1:3000
  python test_site.py    # รันชุดทดสอบ (ต้องเปิดเซิร์ฟเวอร์ค้างไว้ก่อน)
  python check_i18n.py   # ตรวจข้อความที่ยังไม่ได้แปล
  ```

### 10. การจัดระเบียบโครงสร้างรูปภาพ (Image Files Reorganization) (2026-09-05)
- **เคลียร์ไฟล์รูปภาพต้นฉบับซ้ำซ้อนจาก Root Directory (`D:\mala`):** ย้ายไฟล์รูปภาพ 12 ไฟล์ที่กระจัดกระจายอยู่ที่ root (เช่น `เนื้อวัวสไลซ์.png`, `นำไปชั่ง.jpg`, `logo.png`, `473566255_...n.jpg`) เข้าไปเก็บใน `assets/images/raw_archive/` อย่างเป็นระเบียบ ทำให้หน้า Root Directory สะอาดเรียบร้อย
- **จัดหมวดหมู่ใน `assets/images/` เป็นโฟลเดอร์ย่อย:**
  - `assets/images/reviews/` — ภาพแคปรีวิว Google Maps 10 ภาพ (`review_1.png` - `review_10.png`)
  - `assets/images/steps/` — ภาพขั้นตอนการสั่งซื้อ (`step1_pick.jpg` - `step4_enjoy.jpg`)
  - `assets/images/branches/` — ภาพสาขาพัทยาและอ่าวอุดม (`branch_pattaya.jpg`, `branch_aoudom.jpg`)
  - `assets/images/menu/` — ภาพวัตถุดิบ (`beef_slice.png`, `pork_slice.png`)
  - `assets/images/raw_archive/` — สำรองไฟล์รูปภาพดั้งเดิมจาก root
- **อัปเดตเส้นทางอ้างอิงรูปภาพใน HTML & Test Script:** แก้ไข path รูปภาพทั้งหมดใน `index.html`, `menu.html`, `branches.html`, `promotions.html` และ `test_site.py` ให้อ้างอิงไปยังโฟลเดอร์ย่อยอย่างถูกต้อง
- **ผลการทดสอบ:** ลิงก์รูปภาพทั้งหมดใช้การได้ปกติ 100% (0 broken links)

### 11. การปรับปรุงราคาวัตถุดิบเป็น 45 บาท / 100 กรัม (2026-09-05)
- **อัปเดตตัวเลขราคาทั้งหมดในเว็บไซต์:** ปรับเปลี่ยนราคาจาก 35 บาท เป็น **45 บาท / 100 กรัม** ครอบคลุม:
  - Meta description และส่วน Hero Banner ใน `index.html`
  - แอนิเมชันตัวนับราคาเริ่มต้น (`counter__number`) ใน `index.html`
  - คำอธิบายหน้าเมนูและราคาทุกรายการสินค้าในการ์ดวัตถุดิบใน `menu.html`
  - ระบบคำนวณราคา (`PRICE_PER_100G`) ใน `assets/js/app.js`
- **คีย์แปลภาษา TH/EN:** ใน `assets/js/i18n.js`

### 12. การเปลี่ยนโทนสีและธีมเว็บไซต์เป็น "ฟ้า + ครีม" (Blue & Cream Theme) (2026-09-05)
- **ปรับปรุง Design System Palette ใหม่ทั้งหมดใน `assets/css/styles.css`:**
  - **Ocean & Sky Blue (สีหลัก/ปุ่ม/จุดเน้น):** เปลี่ยนจากสีแดงชิลลี่เรดดั้งเดิมเป็นโทนสีฟ้ามหาสมุทรแลนิวรอยัลบลู (`#0077B6`, `#00B4D8`, `#03045E`)
  - **Warm Cream & Linen (ฉากหลัง/การ์ด/เส้นขอบ):** ปรับฉากหลังทั้งเว็บไซต์เป็นสีครีมอุ่นนุ่มตา (`#FAF6EE`, `#F7F2E7`) และการ์ดสีครีมนุ่มนวล
  - **Slate & Deep Navy (ตัวหนังสือ/ส่วนทึบ):** ใช้สีเนวี่สเลทอมฟ้า (`#101F42`, `#334155`) แทนสีดำสนิทเดิม ให้ฟีลลิ่งพรีเมียม สบายตา และหรูหราทรงคุณค่า
  - **อัปเดตเอฟเฟกต์แสงเงา (Blue Shadows & Glows):** ปรับเปลี่ยนเงาและ Glow จากเฉดแดงเป็นฟ้าสดใส
  - **กวาดล้างและเปลี่ยนสีดำ/แดงดั้งเดิมทั้งหมด (Complete Red/Black Purge):** เปลี่ยนโค้ดสีดำสนิทดั้งเดิม (`#000000`, `#0D0D0D`, `#1A1A1A`, `#2D2D2D`) และสีแดงดั้งเดิม (`#C41E24`, `#8B0000`) ออกหมด 100% โดยเปลี่ยนเป็นสีฟ้าน้ำทะเลรอยัลเนวี่ (`#00296B`, `#003566`, `#00509D`) และสีครีมอุ่นนวลตา (`#FAF6EE`, `#FFFDF9`) ทั่วทั้งระบบ
- **ครอบคลุมทุกหน้าและทุกองค์ประกอบทั่วทั้งเว็บไซต์:**
  - `index.html`: Hero banner overlay, Badges (`🩵 MALA DIY`), Step Cards capsules, Counters (`45฿`), Review cards, Footers
  - `menu.html`: Category active tabs, Search bar glows, Meat placeholders (`.bg-meat` sky-blue cream gradient), Ingredient card prices
  - `branches.html`: Branch cards, Location icons, CTA buttons
  - `promotions.html`: Promotion badges, Promo placeholders (`.bg-gradient-dark` -> royal navy blue gradient)

### 13. ระบบการสลับภาษาแบบสมบูรณ์ 100% ทั่วทั้งเว็บไซต์ (Complete 100% i18n Language Engine) (2026-09-05)
- **ผูกคุณสมบัติ `data-i18n` และ `data-i18n-ph` ครอบคลุมข้อความทั้งหมด 100%:**
  - เมนู Navigation Bar ด้านบนและ Mobile Menu ทั้งหมด (`HOME` -> `หน้าแรก`, `MENU` -> `เมนูอาหาร`, `HOW TO ORDER` -> `วิธีสั่งซื้อ`, `BRANCHES` -> `ค้นหาสาขา`, `PROMOTIONS` -> `โปรโมชั่น`, `ABOUT` -> `เกี่ยวกับเรา`, `CONTACT` -> `ติดต่อเรา`)
  - หัวข้อหน้า (`<title>`), โลโก้แบรนด์, สโลแกน Footer, ลิงก์แผนผังเว็บไซต์ (Sitemap)
  - ป้ายชื่อและคำอธิบายโปรโมชั่นทุกรายการใน `promotions.html`
  - ป้ายชื่อสาขา ข้อมูลเวลาเปิด-ปิด และตัวเลือก Dropdown ค้นหาสาขาใน `branches.html`
  - หมายเหตุเครื่องคำนวณราคา ช่องค้นหาวัตถุดิบ และป้ายแท็บหมวดหมู่ใน `menu.html`
- **ระบบสลับชื่อวัตถุดิบอัตโนมัติ (CSS Language Rule):** เพิ่มกฎ `html[lang="en"] .ingredient-card__name` เพื่อสลับการแสดงผลชื่อวัตถุดิบภาษาไทยและภาษาอังกฤษทันทีที่กดสลับภาษา `TH | EN`
- **ขยายพจนานุกรมแปลภาษาใน `assets/js/i18n.js`:** เพิ่มคีย์ภาษาไทยและภาษาอังกฤษครบทุกข้อความบนเว็บไซต์

---

## ⚠️ สิ่งที่ยังค้างอยู่ (Known Issues / TODO)
1. **`README.md` ยังไม่มีอยู่จริง** — เอกสารข้อ 7 ระบุว่าสร้างแล้ว แต่ไฟล์ไม่มีในโฟลเดอร์ ต้องสร้างใหม่
2. **ขนาดรูปยังไม่ได้ optimize** — `logo.png` 2.1 MB และ `hero_mala_bowl.jpg` 962 KB ใหญ่เกินไปสำหรับเว็บ ควรบีบอัด/แปลงเป็น WebP
3. **การแก้โค้ดและการจัดไฟล์ยังไม่ได้ commit** เข้า git

---

## 🎯 สรุปสถานะปัจจุบัน (Current Status)
**ใช้งานได้สมบูรณ์ (Functional & Organized)** — เว็บไซต์ Mock UI ครบทุกฟังก์ชันตามบรีฟ ทั้งดีไซน์พรีเมียม ข้อมูลติดต่อจริง ลิงก์แผนที่นำทาง ระบบสลับภาษา TH/EN ส่วนรีวิวภาพจริงจาก Google Maps 10 ภาพพร้อม Lightbox และโครงสร้างโฟลเดอร์รูปภาพที่จัดระเบียบอย่างสะอาดเรียบร้อย

ผ่านชุดทดสอบอัตโนมัติ **20/20** ไม่มีลิงก์พัง
