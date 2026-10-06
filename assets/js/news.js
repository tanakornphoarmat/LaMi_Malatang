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
        id: 'new-customer',
        date: '2026-10-06',
        category: 'promo',
        image: '/assets/images/promo/huaiyai_now_open.jpg',
        th: {
            title: 'โปรโมชั่นต้อนรับลูกค้าใหม่',
            desc: 'ฉลองเปิดสาขาห้วยใหญ่ รับส่วนลด 10% สำหรับลูกค้า 100 คนแรกเท่านั้น พร้อมบัตรสะสมแต้มแลกรางวัล',
            button: 'ดูรายละเอียด'
        },
        en: {
            title: 'New Customer Welcome',
            desc: 'Celebrating our Huai Yai opening: 10% off for the first 100 customers, plus a stamp card that earns rewards.',
            button: 'See details'
        },
        link: '/promotions/new-customer'
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
