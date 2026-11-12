/**
 * TỬ VI HUYỀN HỌC - BỘ TÍNH TOÁN & HIỂN THỊ THẦN SỐ HỌC PYTHAGORAS
 * Phỏng theo hệ thống Cổ Học Tinh Hoa - 100% Client-side Offline Engine
 */
(function(window) {
  'use strict';

  // Pythagorean alphabet value table
  const PYTHAGOREAN_VALUES = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
  };

  const VOWELS = ['a', 'e', 'i', 'o', 'u'];

  // Normalize Vietnamese diacritics to clean English ASCII
  function normalizeVietnamese(text) {
    if (!text) return '';
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .toLowerCase();
  }

  // Check if character 'y' acts as a vowel
  function isYVowel(nameLower, index) {
    const char = nameLower[index];
    if (char !== 'y') return false;
    // Y at end of word/name is a vowel
    if (index === nameLower.length - 1 || nameLower[index + 1] === ' ') return true;
    // Y followed by a consonant is a vowel
    const next = nameLower[index + 1];
    if (next && !VOWELS.includes(next) && next !== 'y' && next !== ' ') return true;
    // Y at start followed by a vowel is a consonant (e.g. Yen)
    if ((index === 0 || nameLower[index - 1] === ' ') && VOWELS.includes(next)) return false;
    return true;
  }

  function isVowelChar(nameLower, index) {
    const char = nameLower[index];
    if (VOWELS.includes(char)) return true;
    if (char === 'y') return isYVowel(nameLower, index);
    return false;
  }

  // Reduce number to single digit or Master Number (11, 22, 33)
  function reduceNumber(num, keepMaster = true) {
    const masterNumbers = [11, 22, 33];
    while (num > 9) {
      if (keepMaster && masterNumbers.includes(num)) {
        return num;
      }
      num = String(num).split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
    }
    return num;
  }

  class NumerologyEngine {
    constructor(fullName, birthDateStr) {
      this.rawName = (fullName || '').trim();
      this.normName = normalizeVietnamese(this.rawName);
      this.birthDateStr = birthDateStr || ''; // YYYY-MM-DD
      this.parseDate();
    }

    parseDate() {
      const parts = this.birthDateStr.split('-').map(Number);
      if (parts.length === 3) {
        this.year = parts[0];
        this.month = parts[1];
        this.day = parts[2];
      } else {
        const now = new Date();
        this.year = now.getFullYear();
        this.month = now.getMonth() + 1;
        this.day = now.getDate();
      }
    }

    // 1. Số Chủ Đạo / Đường Đời (Life Path)
    getLifePath() {
      const d = reduceNumber(this.day, true);
      const m = reduceNumber(this.month, true);
      const yDigitsSum = String(this.year).split('').reduce((s, digit) => s + parseInt(digit, 10), 0);
      const y = reduceNumber(yDigitsSum, true);
      const total = d + m + y;
      const val = reduceNumber(total, true);
      return {
        value: val,
        breakdown: `${this.day}/${this.month}/${this.year} → ${d} + ${m} + ${y} = ${total} → ${val}`
      };
    }

    // 2. Số Sứ Mệnh / Biểu Đạt (Expression)
    getExpression() {
      let sum = 0;
      for (let i = 0; i < this.normName.length; i++) {
        const c = this.normName[i];
        if (PYTHAGOREAN_VALUES[c]) {
          sum += PYTHAGOREAN_VALUES[c];
        }
      }
      const val = reduceNumber(sum, true);
      return { value: val, total: sum };
    }

    // 3. Số Linh Hồn (Soul Urge) - Nguyên âm
    getSoulUrge() {
      let sum = 0;
      for (let i = 0; i < this.normName.length; i++) {
        const c = this.normName[i];
        if (PYTHAGOREAN_VALUES[c] && isVowelChar(this.normName, i)) {
          sum += PYTHAGOREAN_VALUES[c];
        }
      }
      const val = reduceNumber(sum, true);
      return { value: val, total: sum };
    }

    // 4. Số Nhân Cách (Personality) - Phụ âm
    getPersonality() {
      let sum = 0;
      for (let i = 0; i < this.normName.length; i++) {
        const c = this.normName[i];
        if (PYTHAGOREAN_VALUES[c] && !isVowelChar(this.normName, i)) {
          sum += PYTHAGOREAN_VALUES[c];
        }
      }
      const val = reduceNumber(sum, true);
      return { value: val, total: sum };
    }

    // 5. Số Ngày Sinh (Birthday Number)
    getBirthdayNumber() {
      return {
        value: reduceNumber(this.day, true),
        raw: this.day
      };
    }

    // 6. Số Trưởng Thành (Maturity Number = Life Path + Expression)
    getMaturity(lpVal, expVal) {
      const total = lpVal + expVal;
      return {
        value: reduceNumber(total, true),
        total
      };
    }

    // 7. Số Thái Độ (Attitude = Day + Month)
    getAttitude() {
      const total = this.day + this.month;
      return {
        value: reduceNumber(total, false),
        total
      };
    }

    // 8. Kim Tự Tháp 4 Đỉnh Cao (4 Pinnacles) & 4 Thách Thức (4 Challenges)
    getPinnaclesAndChallenges(lpVal) {
      const d = reduceNumber(this.day, false);
      const m = reduceNumber(this.month, false);
      const ySum = String(this.year).split('').reduce((s, digit) => s + parseInt(digit, 10), 0);
      const y = reduceNumber(ySum, false);

      // Điểm mốc tuổi
      const firstPeakAge = 36 - (lpVal === 11 ? 2 : lpVal === 22 ? 4 : lpVal === 33 ? 6 : lpVal);
      const age1 = Math.max(20, Math.min(35, firstPeakAge));
      const age2 = age1 + 9;
      const age3 = age2 + 9;
      const age4 = age3 + 9;

      const p1 = reduceNumber(m + d, true);
      const p2 = reduceNumber(d + y, true);
      const p3 = reduceNumber(p1 + p2, true);
      const p4 = reduceNumber(m + y, true);

      const c1 = Math.abs(m - d);
      const c2 = Math.abs(d - y);
      const c3 = Math.abs(c1 - c2);
      const c4 = Math.abs(m - y);

      return {
        pinnacles: [
          { index: 1, value: p1, age: age1, period: `Đến ${age1} tuổi` },
          { index: 2, value: p2, age: age2, period: `${age1 + 1} - ${age2} tuổi` },
          { index: 3, value: p3, age: age3, period: `${age2 + 1} - ${age3} tuổi` },
          { index: 4, value: p4, age: age4, period: `Từ ${age3 + 1} tuổi trở đi` }
        ],
        challenges: [
          { index: 1, value: c1 },
          { index: 2, value: c2 },
          { index: 3, value: c3 },
          { index: 4, value: c4 }
        ]
      };
    }

    // 9. Vận hạn Năm Cá Nhân (Personal Year)
    getPersonalYear(targetYear) {
      const year = targetYear || new Date().getFullYear();
      const ySum = String(year).split('').reduce((s, digit) => s + parseInt(digit, 10), 0);
      const total = this.day + this.month + ySum;
      return {
        year,
        value: reduceNumber(total, false)
      };
    }

    // 10. Biểu đồ 3x3 & Nhận diện Mũi tên
    getBirthGrid() {
      const grid = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
      const dateStr = `${this.day}${this.month}${this.year}`;
      for (const ch of dateStr) {
        const num = parseInt(ch, 10);
        if (num >= 1 && num <= 9) {
          grid[num]++;
        }
      }

      // 8 Mũi tên sức mạnh & mũi tên trống
      const arrows = [
        { code: '3-6-9', name: 'Trí tuệ', cells: [3, 6, 9] },
        { code: '2-5-8', name: 'Cảm xúc', cells: [2, 5, 8] },
        { code: '1-4-7', name: 'Thực tế', cells: [1, 4, 7] },
        { code: '1-2-3', name: 'Kế hoạch', cells: [1, 2, 3] },
        { code: '4-5-6', name: 'Ý chí', cells: [4, 5, 6] },
        { code: '7-8-9', name: 'Hoạt động', cells: [7, 8, 9] },
        { code: '1-5-9', name: 'Quyết tâm', cells: [1, 5, 9] },
        { code: '3-5-7', name: 'Nhạy bén tâm linh', cells: [3, 5, 7] }
      ];

      const strengthArrows = [];
      const emptyArrows = [];

      arrows.forEach(arr => {
        const hasAll = arr.cells.every(c => grid[c] > 0);
        const hasNone = arr.cells.every(c => grid[c] === 0);
        if (hasAll) strengthArrows.push(arr);
        if (hasNone) emptyArrows.push(arr);
      });

      return { grid, strengthArrows, emptyArrows };
    }

    // 11. Nợ nghiệp & Bài học nghiệp
    getKarmicAnalysis(lpVal, expObj) {
      const karmicNumbers = [13, 14, 16, 19];
      const debts = [];

      // Check day of birth
      if (karmicNumbers.includes(this.day)) {
        debts.push({ number: this.day, source: 'Ngày sinh' });
      }

      // Check expression sum
      if (karmicNumbers.includes(expObj.total)) {
        debts.push({ number: expObj.total, source: 'Tên (Số Sứ Mệnh)' });
      }

      // Missing numbers in name (Karmic Lessons)
      const letterCounts = {};
      for (const ch of this.normName) {
        const v = PYTHAGOREAN_VALUES[ch];
        if (v) letterCounts[v] = (letterCounts[v] || 0) + 1;
      }
      const missingNumbers = [];
      for (let i = 1; i <= 9; i++) {
        if (!letterCounts[i]) missingNumbers.push(i);
      }

      return {
        debts,
        hasDebt: debts.length > 0,
        missingNumbers
      };
    }

    // Full calculation bundle
    calculateAll() {
      const lp = this.getLifePath();
      const exp = this.getExpression();
      const soul = this.getSoulUrge();
      const per = this.getPersonality();
      const bday = this.getBirthdayNumber();
      const mat = this.getMaturity(lp.value, exp.value);
      const att = this.getAttitude();
      const cycles = this.getPinnaclesAndChallenges(lp.value);
      const py2026 = this.getPersonalYear(2026);
      const py2027 = this.getPersonalYear(2027);
      const grid = this.getBirthGrid();
      const karmic = this.getKarmicAnalysis(lp.value, exp);

      return {
        fullName: this.rawName,
        birthDate: this.birthDateStr,
        day: this.day,
        month: this.month,
        year: this.year,
        core: {
          lifePath: lp,
          expression: exp,
          soulUrge: soul,
          personality: per,
          birthday: bday,
          maturity: mat,
          attitude: att
        },
        cycles,
        personalYears: {
          y2026: py2026,
          y2027: py2027
        },
        grid,
        karmic
      };
    }
  }

  // DOM Renderer and Page Controller for than-so-hoc.html
  function initNumerologyApp() {
    const form = document.getElementById('tuviNumerologyForm');
    if (!form) return;

    const inputName = document.getElementById('numFullName');
    const inputDate = document.getElementById('numBirthDate');
    const resultContainer = document.getElementById('numerologyResultContainer');

    // Auto-fill from URL params (?name=...&dob=...)
    const params = new URLSearchParams(window.location.search);
    const paramName = params.get('name') || params.get('hoTen');
    const paramDob = params.get('dob') || params.get('ngaySinh');

    if (paramName && inputName) inputName.value = decodeURIComponent(paramName);
    if (paramDob && inputDate) inputDate.value = paramDob;

    if (paramName && paramDob) {
      renderNumerologyResult(paramName, paramDob);
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = inputName.value.trim();
      const dob = inputDate.value.trim();

      if (!name) {
        alert('Vui lòng nhập họ và tên của bạn.');
        inputName.focus();
        return;
      }
      if (!dob) {
        alert('Vui lòng chọn ngày tháng năm sinh Dương lịch.');
        inputDate.focus();
        return;
      }

      // Update URL without reload
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('name', name);
      newUrl.searchParams.set('dob', dob);
      window.history.pushState({}, '', newUrl);

      renderNumerologyResult(name, dob);

      // Track analytics
      if (window.TuViTracker && typeof window.TuViTracker.track === 'function') {
        window.TuViTracker.track('than_so_hoc_tra_cuu', {
          fullName: name,
          birthDate: dob
        });
      }
    });
  }

  function renderNumerologyResult(fullName, birthDate) {
    const container = document.getElementById('numerologyResultContainer');
    if (!container) return;

    const engine = new NumerologyEngine(fullName, birthDate);
    const res = engine.calculateAll();
    const data = window.TuViNumerologyData || {};

    const lpData = (data.lifePathMeanings && data.lifePathMeanings[res.core.lifePath.value]) || {
      name: `Số Chủ Đạo ${res.core.lifePath.value}`,
      overview: { short: 'Năng lượng mạnh mẽ và độc đáo.' },
      keywords: ['Tiềm năng', 'Năng lượng', 'Sứ mệnh'],
      strengths: ['Tự tin', 'Sáng tạo'],
      weaknesses: ['Cần rèn luyện tính kiên nhẫn'],
      careerFinance: { overview: 'Phù hợp với công việc độc lập và sáng tạo.', suitableFields: [] },
      relationships: { love: 'Cần sự thấu hiểu và tôn trọng.' },
      health: { overview: 'Cần chú ý giữ gìn sức khỏe tinh thần và thể chất.' }
    };

    const expData = (data.expressionMeanings && data.expressionMeanings[res.core.expression.value]) || {};
    const soulData = (data.soulUrgeMeanings && data.soulUrgeMeanings[res.core.soulUrge.value]) || {};
    const perData = (data.personalityMeanings && data.personalityMeanings[res.core.personality.value]) || {};
    const py26Data = (data.personalYearMeanings && data.personalYearMeanings[res.personalYears.y2026.value]) || {};
    const py27Data = (data.personalYearMeanings && data.personalYearMeanings[res.personalYears.y2027.value]) || {};

    // 3x3 Grid HTML
    const gridCells = [
      { num: 3, label: '3', count: res.grid.grid[3] },
      { num: 6, label: '6', count: res.grid.grid[6] },
      { num: 9, label: '9', count: res.grid.grid[9] },
      { num: 2, label: '2', count: res.grid.grid[2] },
      { num: 5, label: '5', count: res.grid.grid[5] },
      { num: 8, label: '8', count: res.grid.grid[8] },
      { num: 1, label: '1', count: res.grid.grid[1] },
      { num: 4, label: '4', count: res.grid.grid[4] },
      { num: 7, label: '7', count: res.grid.grid[7] }
    ];

    let gridHtml = '';
    gridCells.forEach(cell => {
      const activeClass = cell.count > 0 ? 'active' : 'empty';
      const repeatDigits = cell.count > 0 ? String(cell.num).repeat(cell.count) : '-';
      gridHtml += `
        <div class="grid-cell ${activeClass}">
          <span class="cell-digit">${repeatDigits}</span>
          <span class="cell-label">Số ${cell.num} (${cell.count} lần)</span>
        </div>
      `;
    });

    // Strength arrows HTML
    let strengthArrowsHtml = '';
    if (res.grid.strengthArrows.length > 0) {
      strengthArrowsHtml = res.grid.strengthArrows.map(arr => {
        const info = (data.arrowMeanings && data.arrowMeanings[arr.code]) || {};
        return `
          <div class="arrow-card strength">
            <div class="arrow-badge green">✓ ${arr.name} (${arr.code})</div>
            <h4>${info.strength ? info.strength.title : arr.name}</h4>
            <p>${info.strength ? info.strength.description : 'Sức mạnh đặc biệt giúp bạn gặt hái thành công.'}</p>
            <div class="arrow-tip"><strong>Lời khuyên:</strong> ${info.strength ? info.strength.advice : 'Phát huy thế mạnh bẩm sinh này.'}</div>
          </div>
        `;
      }).join('');
    } else {
      strengthArrowsHtml = `<p class="muted-note">Biểu đồ của bạn không có mũi tên sức mạnh 3 số liên hoàn. Điều này giúp năng lượng của bạn phân bổ đều đặn và linh hoạt thích nghi với hoàn cảnh.</p>`;
    }

    // Empty arrows HTML
    let emptyArrowsHtml = '';
    if (res.grid.emptyArrows.length > 0) {
      emptyArrowsHtml = res.grid.emptyArrows.map(arr => {
        const info = (data.arrowMeanings && data.arrowMeanings[arr.code]) || {};
        return `
          <div class="arrow-card weakness">
            <div class="arrow-badge amber">⚠ Trống Trục ${arr.name} (${arr.code})</div>
            <h4>${info.weakness ? info.weakness.title : `Thiếu trục ${arr.name}`}</h4>
            <p>${info.weakness ? info.weakness.description : 'Cần rèn luyện để bổ khuyết năng lượng còn thiếu.'}</p>
            <div class="arrow-tip"><strong>Phương pháp khắc phục:</strong> ${info.weakness ? info.weakness.advice : 'Thực hành đều đặn mỗi ngày.'}</div>
          </div>
        `;
      }).join('');
    } else {
      emptyArrowsHtml = `<p class="muted-note">Tuyệt vời! Bạn không bị khuyết bất kỳ trục 3 số nào. Bản đồ số học của bạn rất cân bằng và vững vàng.</p>`;
    }

    // Pinnacles HTML
    const pinnaclesHtml = res.cycles.pinnacles.map(p => {
      const pinInfo = (data.pinnacleMeanings && data.pinnacleMeanings[p.value]) || {};
      return `
        <div class="pinnacle-card">
          <div class="pinnacle-header">
            <span class="p-num-badge">Đỉnh ${p.index}: Số ${p.value}</span>
            <span class="p-age-badge">${p.period}</span>
          </div>
          <h4>${pinInfo.name || `Giai Đoạn Đỉnh Cao Số ${p.value}`}</h4>
          <p class="p-overview">${pinInfo.overview || 'Thời kỳ phát triển vượt bậc và gặt hái thành tựu.'}</p>
          <div class="p-advice"><strong>Lời khuyên đỉnh cao:</strong> ${pinInfo.advice || 'Nắm bắt thời cơ và hành động quyết liệt.'}</div>
        </div>
      `;
    }).join('');

    // Karmic HTML
    let karmicHtml = '';
    if (res.karmic.hasDebt) {
      karmicHtml = res.karmic.debts.map(d => {
        const kInfo = (data.karmicDebtMeanings && data.karmicDebtMeanings[d.number]) || {};
        return `
          <div class="karmic-card">
            <div class="karmic-badge">Nợ Nghiệp ${d.number} (${d.source})</div>
            <h4>${kInfo.name || `Nghiệp Số ${d.number}`}</h4>
            <p>${kInfo.overview ? kInfo.overview.short : 'Bài học cuộc đời cần chuyển hóa qua sự nỗ lực và tu dưỡng.'}</p>
            <p><strong>Cách hóa giải:</strong> ${kInfo.lifeLessons ? kInfo.lifeLessons.primary : 'Lao động chăm chỉ, chính trực và không né tránh trách nhiệm.'}</p>
          </div>
        `;
      }).join('');
    } else {
      karmicHtml = `<div class="karmic-card clean"><p>✨ Bạn không mang nợ nghiệp chính (13, 14, 16, 19). Đây là dấu hiệu của sự tự do tinh thần và thuận lợi trong việc kiến tạo tương lai!</p></div>`;
    }

    const html = `
      <div class="num-report-wrapper">
        <!-- Hero Header -->
        <div class="num-hero-card">
          <div class="num-seal-tag">✦ THẦN SỐ HỌC PYTHAGORAS TOÀN THƯ ✦</div>
          <h2 class="num-user-title">${res.fullName.toUpperCase()}</h2>
          <div class="num-meta-sub">
            <span>📅 Ngày sinh Dương lịch: <strong>${res.day}/${res.month}/${res.year}</strong></span>
            <span>⚡ Tần số rung động cá nhân</span>
          </div>

          <!-- Giant Life Path Badge -->
          <div class="num-lifepath-hero">
            <div class="num-circle-halo">
              <span class="num-giant-digit">${res.core.lifePath.value}</span>
            </div>
            <div class="num-lifepath-desc">
              <div class="num-lp-subtitle">CON SỐ CHỦ ĐẠO (LIFE PATH NUMBER)</div>
              <h3 class="num-lp-name">${lpData.name || `Số Chủ Đạo ${res.core.lifePath.value}`}</h3>
              <p class="num-lp-short">${lpData.overview ? lpData.overview.short : ''}</p>
              <div class="num-keywords">
                ${(lpData.keywords || []).map(k => `<span class="kw-tag">#${k}</span>`).join(' ')}
              </div>
            </div>
          </div>
        </div>

        <!-- 6 Core Numbers Grid -->
        <div class="num-section-block">
          <h3 class="section-title-royal">✦ BỘ 6 CHỈ SỐ CỐT LÕI CỦA BẢN MỆNH ✦</h3>
          <div class="core-numbers-grid">
            <div class="core-card">
              <div class="core-num">${res.core.lifePath.value}</div>
              <div class="core-info">
                <h4>Số Chủ Đạo (Đường Đời)</h4>
                <p>Mục đích sống, con đường tiến hóa và sứ mệnh lớn nhất của linh hồn.</p>
              </div>
            </div>

            <div class="core-card">
              <div class="core-num">${res.core.expression.value}</div>
              <div class="core-info">
                <h4>Số Sứ Mệnh (Biểu Đạt)</h4>
                <p>${expData.name ? expData.name : 'Tài năng thiên bẩm'}: Khả năng bẩm sinh biểu đạt qua họ tên.</p>
              </div>
            </div>

            <div class="core-card">
              <div class="core-num">${res.core.soulUrge.value}</div>
              <div class="core-info">
                <h4>Số Linh Hồn (Khao Khát Nội Tâm)</h4>
                <p>${soulData.name ? soulData.name : 'Động lực sâu kín'}: Điều trái tim bạn thực sự khao khát nhất.</p>
              </div>
            </div>

            <div class="core-card">
              <div class="core-num">${res.core.personality.value}</div>
              <div class="core-info">
                <h4>Số Nhân Cách (Ấn Tượng Ngoài)</h4>
                <p>${perData.name ? perData.name : 'Hình ảnh giao tiếp'}: Cách xã hội nhìn nhận và ấn tượng về bạn.</p>
              </div>
            </div>

            <div class="core-card">
              <div class="core-num">${res.core.birthday.value}</div>
              <div class="core-info">
                <h4>Số Ngày Sinh (${res.core.birthday.raw})</h4>
                <p>Năng khiếu đặc biệt và món quà vũ trụ ban tặng khi chào đời.</p>
              </div>
            </div>

            <div class="core-card">
              <div class="core-num">${res.core.maturity.value}</div>
              <div class="core-info">
                <h4>Số Trưởng Thành (Sau Tuổi 35)</h4>
                <p>Thành tựu và sức mạnh chín muồi nửa sau cuộc đời.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 3x3 Birth Grid & Arrows -->
        <div class="num-section-block">
          <h3 class="section-title-royal">✦ BIỂU ĐỒ NGÀY SINH 3x3 & CÁC MŨI TÊN NĂNG LƯỢNG ✦</h3>
          <div class="grid-analysis-container">
            <div class="grid-box-wrapper">
              <div class="lo-shu-grid">
                ${gridHtml}
              </div>
              <div class="grid-legend">
                <span><span class="dot active"></span> Có trong ngày sinh</span>
                <span><span class="dot empty"></span> Ô số trống</span>
              </div>
            </div>

            <div class="arrows-analysis-col">
              <h4>Mũi Tên Sức Mạnh (Sở Hữu):</h4>
              <div class="arrows-list">
                ${strengthArrowsHtml}
              </div>

              <h4 style="margin-top: 1.25rem;">Trục Cần Rèn Luyện (Mũi Tên Trống):</h4>
              <div class="arrows-list">
                ${emptyArrowsHtml}
              </div>
            </div>
          </div>
        </div>

        <!-- 4 Pinnacles Pyramid -->
        <div class="num-section-block">
          <h3 class="section-title-royal">✦ KIM TỰ THÁP 4 ĐỈNH CAO CUỘC ĐỜI (PINNACLES) ✦</h3>
          <p class="section-intro">Mỗi con người đều trải qua 4 giai đoạn đỉnh cao kéo dài 9 năm hoặc 27 năm. Đây là thời cơ vàng để bứt phá sự nghiệp và tài lộc:</p>
          <div class="pinnacles-grid">
            ${pinnaclesHtml}
          </div>
        </div>

        <!-- Personal Year 2026 & 2027 -->
        <div class="num-section-block">
          <h3 class="section-title-royal">✦ DỰ BÁO VẬN HẠN NĂM CÁ NHÂN 2026 & 2027 ✦</h3>
          <div class="personal-years-wrapper">
            <div class="py-card current-year">
              <div class="py-badge">NĂM HIỆN TẠI 2026</div>
              <div class="py-number">Năm Cá Nhân Số ${res.personalYears.y2026.value}</div>
              <h4>${py26Data.name || `Năm số ${res.personalYears.y2026.value}`}</h4>
              <p><strong>Từ khóa:</strong> ${py26Data.keyword || 'Hành động, chuyển hóa'}</p>
              <p>${py26Data.overview || 'Thời kỳ tập trung vào mục tiêu và chuyển hóa năng lượng.'}</p>
              <div class="py-subgrid">
                <div><strong>💼 Sự nghiệp:</strong> ${py26Data.careerAdvice || 'Kiên trì theo đuổi con đường đã chọn.'}</div>
                <div><strong>💰 Tài chính:</strong> ${py26Data.financeAdvice || 'Quản lý vốn an toàn, tránh nóng vội.'}</div>
                <div><strong>❤️ Tình duyên:</strong> ${py26Data.loveAdvice || 'Thấu cảm và lắng nghe bạn đời.'}</div>
              </div>
            </div>

            <div class="py-card next-year">
              <div class="py-badge highlight">NĂM TỚI 2027 (ĐINH MÙI)</div>
              <div class="py-number">Năm Cá Nhân Số ${res.personalYears.y2027.value}</div>
              <h4>${py27Data.name || `Năm số ${res.personalYears.y2027.value}`}</h4>
              <p><strong>Từ khóa:</strong> ${py27Data.keyword || 'Bứt phá, chuẩn bị'}</p>
              <p>${py27Data.overview || 'Chuẩn bị cho những cơ hội mới của năm Đinh Mùi 2027.'}</p>
              <div class="py-subgrid">
                <div><strong>💼 Sự nghiệp:</strong> ${py27Data.careerAdvice || 'Nắm bắt các cơ hội hợp tác và phát triển.'}</div>
                <div><strong>💰 Tài chính:</strong> ${py27Data.financeAdvice || 'Tích lũy tài sản vững bền.'}</div>
                <div><strong>❤️ Tình duyên:</strong> ${py27Data.loveAdvice || 'Bình yên và hạnh phúc gia đạo.'}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Deep Life Path Interpretations -->
        <div class="num-section-block">
          <h3 class="section-title-royal">✦ BẢN ĐỒ LUẬN GIẢI TOÀN DIỆN CHO SỐ CHỦ ĐẠO ${res.core.lifePath.value} ✦</h3>
          <div class="interpretation-tabs">
            <div class="inter-card">
              <h4>🌟 Điểm Mạnh Thiên Phú</h4>
              <ul>
                ${(lpData.strengths || []).map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>

            <div class="inter-card">
              <h4>⚠️ Thử Thách & Điểm Cần Chuyển Hóa</h4>
              <ul>
                ${(lpData.weaknesses || []).map(w => `<li>${w}</li>`).join('')}
              </ul>
            </div>

            <div class="inter-card">
              <h4>💼 Nghề Nghiệp & Vận Trình Tài Chính</h4>
              <p>${lpData.careerFinance ? lpData.careerFinance.overview : ''}</p>
              <div class="suitable-jobs">
                <strong>Lĩnh vực tối ưu:</strong>
                ${((lpData.careerFinance && lpData.careerFinance.suitableFields) || []).map(f => `<span class="job-pill">${f}</span>`).join(' ')}
              </div>
            </div>

            <div class="inter-card">
              <h4>❤️ Tình Duyên & Mối Quan Hệ</h4>
              <p>${lpData.relationships ? lpData.relationships.love : ''}</p>
            </div>

            <div class="inter-card">
              <h4>🧘 Sức Khỏe & Thể Lực</h4>
              <p>${lpData.health ? lpData.health.overview : ''}</p>
              <p><em>Lời khuyên: ${lpData.health ? lpData.health.advice : ''}</em></p>
            </div>
          </div>
        </div>

        <!-- Karmic Debt Section -->
        <div class="num-section-block">
          <h3 class="section-title-royal">✦ PHÂN TÍCH NỢ NGHIỆP & BÀI HỌC LINH HỒN ✦</h3>
          <div class="karmic-list">
            ${karmicHtml}
          </div>
        </div>

        <!-- PREMIUM VIP REPORT CARD (VIETQR SEPAY 39K) -->
        <div class="num-vip-paywall-box">
          <div class="vip-badge-ribbon">👑 ĐẶC QUYỀN HỘI VIÊN CAO CẤP</div>
          <h2 class="vip-paywall-title">BÁO CÁO THẦN SỐ HỌC PYTHAGORAS VIP 2026 – 2027</h2>
          <p class="vip-paywall-desc">
            Khai phá trọn vẹn 15+ chỉ số rung động chuyên sâu, bản đồ 4 đỉnh cao kim tự tháp theo từng độ tuổi và dự báo chi tiết vận trình 12 tháng năm 2026 - 2027 giúp định hướng sự nghiệp, gia đạo và tài lộc.
          </p>
          <div class="vip-price-wrap">
            <span class="vip-old-price">129.000 đ</span>
            <span class="vip-current-price">39.000 đ</span>
          </div>
          <div class="vip-features-checklist">
            <div class="vip-feature-item"><span class="chk">✓</span> Phân tích 15+ chỉ số: Linh hồn, Nhân cách, Thái độ, Đam mê tiềm ẩn</div>
            <div class="vip-feature-item"><span class="chk">✓</span> Giải mã Kim Tự Tháp 4 đỉnh cao &amp; 4 thử thách định mệnh</div>
            <div class="vip-feature-item"><span class="chk">✓</span> Dự báo vận trình 12 tháng năm 2026 &amp; 2027 (Năm cá nhân ${res.personalYear2026})</div>
            <div class="vip-feature-item"><span class="chk">✓</span> Hướng phát triển sự nghiệp &amp; phong thủy màu sắc hợp tần số</div>
            <div class="vip-feature-item"><span class="chk">✓</span> Xuất file Báo Cáo VIP PDF A4 trang trọng lưu giữ trọn đời</div>
          </div>
          <button type="button" class="btn-paywall-vietqr" onclick="if(window.TuViMonetize){ TuViMonetize.openVipModal('Gói Thần Số Học VIP (39k)', 39000); } else { window.location.href='/#bang-gia-dich-vu'; }">
            ⚡ MỞ KHÓA BÁO CÁO VIP NGAY (39.000đ) ➔
          </button>
          <p class="vip-guarantee-note">Quét mã VietQR tự động qua SePay · Kích hoạt tức thì sau 3 giây · Hoàn tiền 100% nếu có sự cố</p>
        </div>

        <!-- Seamless Action Cross-link Card -->
        <div class="cross-link-card">
          <div class="cross-link-content">
            <div class="cross-icon">📜</div>
            <div>
              <h3>KẾT HỢP TỬ VI ĐẨU SỐ TOÀN THƯ</h3>
              <p>Thần Số Học Pythagoras khai mở tần số sóng rung động của Họ Tên & Ngày Sinh. Hãy kết hợp ngay với <strong>Lá Số Tử Vi 12 Cung</strong> để xem chi tiết Cung Tài Bạch, Quan Lộc, Phu Thê và Vận Hạn từng năm!</p>
            </div>
          </div>
          <div class="cross-link-buttons">
            <a href="/?name=${encodeURIComponent(res.fullName)}&dob=${res.birthDate}#lap-la-so" class="btn-royal-action">
              ✦ Lập Lá Số Tử Vi Ngay Cho ${res.fullName} ➔
            </a>
            <a href="/hop-tuoi?name1=${encodeURIComponent(res.fullName)}&dob1=${res.birthDate}" class="btn-secondary-action">
              ❤️ Xem Hợp Tuổi Tình Duyên & Làm Ăn
            </a>
            <button onclick="window.print()" class="btn-secondary-action">
              🖨️ In Báo Cáo
            </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    const yOffset = -85;
    const y = container.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  // Export to global
  window.TuViNumerology = {
    Engine: NumerologyEngine,
    init: initNumerologyApp,
    renderResult: renderNumerologyResult
  };

  // Auto init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNumerologyApp);
  } else {
    initNumerologyApp();
  }
})(typeof window !== 'undefined' ? window : this);
