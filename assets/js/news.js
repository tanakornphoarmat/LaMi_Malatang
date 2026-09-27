/* ==========================================================================
   LA-MI MALATANG — News & Announcements
   --------------------------------------------------------------------------
   Add a news item: copy one block in NEWS below, put it at the top, and edit.
     date      YYYY-MM-DD (newest items show first)
     category  'news' | 'promo' | 'event'  (matches the tabs on /promotions)
     image     a served image under /assets/images/ (not _source)
     link      where the button goes; leave '' for no button
   The homepage shows the newest 3; /promotions shows them all.
   ========================================================================== */

const NEWS = [
    {
        id: 'hiring-huaiyai',
        date: '2026-09-27',
        category: 'news',
        image: '/assets/images/news/hiring_huaiyai.jpg',
        th: {
            title: 'รับสมัครพนักงาน สาขาห้วยใหญ่',
            desc: 'รับแม่ครัว ผู้ช่วยครัว และพนักงานเสิร์ฟ อย่างละ 1 คน รายได้ 10,000 บาท/เดือน (ไม่รวม OT) สมัครที่ร้านหรือโทร 098-894-9615 (คุณแพรว)',
            button: 'ดูโปสเตอร์'
        },
        en: {
            title: 'Now Hiring at Huai Yai',
            desc: 'One cook, one kitchen assistant and one server. 10,000 THB/month (excluding OT). Apply in store or call 098-894-9615 (Khun Praew).',
            button: 'View poster'
        },
        link: '/assets/images/news/hiring_huaiyai.jpg'
    },
    {
        id: 'huaiyai-opening',
        date: '2026-09-22',
        category: 'news',
        image: '/assets/images/branches/branch_huaiyai_opening.jpg',
        th: {
            title: 'เปิดสาขาห้วยใหญ่ 1 ตุลาคม 2026',
            desc: 'LA-MI MALATANG สาขาห้วยใหญ่ พัทยา ชลบุรี พร้อมเปิดให้บริการ 1 ตุลาคมนี้ หม่าล่าทั่ง DIY วัตถุดิบคุณภาพ บรรยากาศสบาย ๆ มีที่จอดรถ',
            button: 'ดูข้อมูลสาขา'
        },
        en: {
            title: 'Huai Yai Branch Opens 1 October 2026',
            desc: 'LA-MI MALATANG Huai Yai, Pattaya, Chon Buri opens on 1 October. DIY malatang, quality ingredients, a relaxed space and easy parking.',
            button: 'Branch details'
        },
        link: '/branches/huai-yai'
    }
];

(function () {
    const BADGE = {
        news: { th: 'ข่าวสาร', en: 'News' },
        promo: { th: 'โปรโมชั่น', en: 'Promotion' },
        event: { th: 'กิจกรรม', en: 'Event' }
    };

    function formatDate(iso, lang) {
        const locale = lang === 'th' ? 'th-TH-u-ca-gregory' : 'en-GB';
        return new Date(iso + 'T00:00:00').toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    }

    // Register every string with the i18n engine so the TH/EN toggle switches cards too
    NEWS.forEach(item => {
        ['th', 'en'].forEach(lang => {
            const t = translations[lang];
            t[`news_${item.id}_title`] = item[lang].title;
            t[`news_${item.id}_desc`] = item[lang].desc;
            t[`news_${item.id}_btn`] = item[lang].button;
            t[`news_${item.id}_date`] = formatDate(item.date, lang);
            t[`news_badge_${item.category}`] = BADGE[item.category][lang];
        });
    });

    function el(tag, className, key) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (key) {
            node.setAttribute('data-i18n', key);
            node.textContent = translations[currentLang][key];
        }
        return node;
    }

    function buildCard(item) {
        const card = el('div', 'promo-card news-card');
        card.dataset.category = item.category;

        const imgWrap = el('div', 'promo-card__img');
        const img = el('img');
        img.src = item.image;
        img.alt = item.th.title;
        img.loading = 'lazy';
        imgWrap.append(img, el('div', 'badge badge--primary promo-card__badge', `news_badge_${item.category}`));

        const body = el('div', 'promo-card__body');
        body.append(
            el('div', 'promo-card__date', `news_${item.id}_date`),
            el('h3', 'promo-card__title', `news_${item.id}_title`),
            el('p', 'promo-card__desc', `news_${item.id}_desc`)
        );
        if (item.link) {
            const btn = el('a', 'btn btn--secondary btn--sm', `news_${item.id}_btn`);
            btn.href = item.link;
            if (/\.(jpe?g|png|webp)$/i.test(item.link)) {
                btn.target = '_blank';
                btn.rel = 'noopener';
            }
            body.append(btn);
        }

        card.append(imgWrap, body);
        return card;
    }

    // Any element with data-news-list gets the cards (ahead of anything already in it);
    // data-news-limit caps how many
    const sorted = NEWS.slice().sort((a, b) => b.date.localeCompare(a.date));
    document.querySelectorAll('[data-news-list]').forEach(list => {
        const limit = parseInt(list.dataset.newsLimit, 10) || sorted.length;
        list.prepend(...sorted.slice(0, limit).map(buildCard));
    });
})();
