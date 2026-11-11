const fs = require('fs');

let code = fs.readFileSync('js/tuvi-luan-giai.js', 'utf8');

const injection = `
  // ============================================================================
  // 6. TẦNG MIỄN PHÍ: BẢN ĐỒ TÍNH CÁCH NGẦM & NGHIỆM LÝ VẬN TRÌNH ĐÃ QUA
  // ============================================================================

  function generateFreePsychologicalTeaserHtml(laSo) {
    if (!laSo || !laSo.cung) return '';

    const pMenh = laSo.cung[laSo.cungMenh.chiIndex];
    const pThan = laSo.cung[laSo.cungThan.chiIndex];
    const pTai = laSo.cung.find(p => p.cungName.includes('TÀI BẠCH')) || laSo.cung[1];
    const pQuan = laSo.cung.find(p => p.cungName.includes('QUAN LỘC')) || laSo.cung[9];
    const pPhuThe = laSo.cung.find(p => p.cungName.includes('PHU THÊ')) || laSo.cung[3];
    const pDi = laSo.cung.find(p => p.cungName.includes('THIÊN DI')) || laSo.cung[11];

    const ctMenh = (pMenh.chinhTinh || []).map(s => s.name + (s.dacHam ? ' (' + s.dacHam + ')' : '')).join(', ') || 'Vô Chính Diệu';
    const ctThan = (pThan.chinhTinh || []).map(s => s.name + (s.dacHam ? ' (' + s.dacHam + ')' : '')).join(', ') || 'Vô Chính Diệu';
    const thanCuName = (laSo.thanCu || 'tài bạch').toUpperCase();

    // 1. Góc khuất nội tâm & Điểm yếu chí mạng
    let gockhuatText = '';
    if (ctMenh.includes('Thái Dương')) {
      gockhuatText = \`Mệnh tọa thủ <strong>Thái Dương</strong> tại cung \${pMenh.chi}, bản chất là ngọn lửa quang minh, hào sảng, trọng danh dự và luôn có xu hướng gánh vác trách nhiệm cho người khác. Tuy nhiên, Thân cư <strong>\${thanCuName}</strong> (tọa thủ <strong>\${ctThan}</strong>) lại khiến nội tâm đương số có sự giằng xé sâu sắc: Bên ngoài tỏ ra kiên định, bản lĩnh, nói cười xởi lởi nhưng khi màn đêm buông xuống là lúc những trăn trở về tiền tài, sự nghiệp và vị thế tương lai bủa vây dồn dập. Đương số rất ghét cảm giác mang ơn hay phụ thuộc, thà cắn răng chịu thiệt còn hơn hạ mình cầu cạnh. Điểm yếu chí mạng là <em>cả nể, dễ mủi lòng trước lời hứa của người thân cận</em>, dẫn đến việc nhiều lần làm ơn mắc oán hoặc gánh thiệt thòi thay cho người khác.\`;
    } else if (ctMenh.includes('Tử Vi') || ctMenh.includes('Thiên Phủ')) {
      gockhuatText = \`Mệnh ngự <strong>\${ctMenh}</strong> — bậc Đế Vương, Lệnh Tinh nắm giữ uy quyền và lòng tự tôn cực cao. Tuy nhiên, Thân cư <strong>\${thanCuName}</strong> tạo nên một góc khuất cô đơn tột cùng: Không ai hiểu hết những toan tính và áp lực trên vai đương số. Bên ngoài luôn giữ hình tượng chỉn chu, thành đạt nhưng bên trong là sự thận trọng quá mức, đôi khi khó mở lòng chia sẻ thật sự với bất kỳ ai. Điểm yếu chí mạng là <em>sợ cảm giác thất bại, cái tôi lớn đôi khi bỏ lỡ thời cơ đổi vận nhanh chóng</em>.\`;
    } else if (ctMenh.includes('Vũ Khúc') || ctMenh.includes('Thất Sát')) {
      gockhuatText = \`Mệnh tọa thủ <strong>\${ctMenh}</strong> mang khí chất gang thép, quyết liệt, hành động sắc bén và đầu óc kinh tài thực tế. Góc khuất nội tâm là cảm giác cô quả, ít khi biểu lộ sự yếu mềm nên người ngoài dễ nhìn nhận đương số là lạnh lùng, khó gần. Điểm yếu chí mạng là <em>tính nóng nảy bộc phát ngầm, khó thỏa hiệp</em>, khi niềm tin bị phản bội sẽ lập tức đoạn tuyệt dứt khoát không để đường lui.\`;
    } else if (ctMenh.includes('Thiên Cơ') || ctMenh.includes('Thiên Đồng') || ctMenh.includes('Thái Âm')) {
      gockhuatText = \`Mệnh tọa thủ <strong>\${ctMenh}</strong> tại cung \${pMenh.chi}, tương tác với Thân cư <strong>\${thanCuName}</strong> (\${ctThan}) tạo nên mẫu người có trực giác nhạy bén, thông minh và giàu lòng trắc ẩn. Góc khuất là nội tâm suy nghĩ quá nhiều, tâm trạng biến đổi theo hoàn cảnh bên ngoài. Điểm yếu chí mạng là <em>hay do dự ở thời khắc quyết định</em>, suy nghĩ bao quát nhưng đôi khi thiếu tính quyết đoán dứt khoát, dễ bỏ lỡ vận may lớn.\`;
    } else {
      gockhuatText = \`Mệnh tọa thủ <strong>\${ctMenh}</strong> tại cung \${pMenh.chi}, tương tác cùng Thân cư <strong>\${thanCuName}</strong> (\${ctThan}) tạo nên mẫu người độc lập, tự lực cánh sinh từ sớm. Đương số có lòng tự trọng cao, không thích nhờ vả người khác. Điểm yếu chí mạng là <em>dễ bị chi phối bởi cảm xúc nội tâm dồn nén</em>, một khi đã mất niềm tin vào ai đó thì vĩnh viễn không thể khôi phục lại tình cảm như thuở ban đầu.\`;
    }

    // Quét sát tinh tại Mệnh & Thân & Tài
    const satTinhList = [];
    [pMenh, pThan, pTai].forEach(p => {
      (p.phuTinhRight || []).forEach(s => {
        if (['Kình dương', 'Đà la', 'Hỏa tinh', 'Linh tinh', 'Địa không', 'Địa kiếp', 'Thiên hình', 'Hóa kỵ'].includes(s.name)) {
          satTinhList.push(\`<strong>\${s.name}</strong> (cung \${p.cungName.replace('<THÂN>', '')})\`);
        }
      });
    });
    if (satTinhList.length > 0) {
      gockhuatText += \`<br><span style="display:inline-block; margin-top:6px; font-size:0.88rem; color:#A3281F;">⚠ <em>Cảnh báo nghiệp lực tinh đẩu:</em> Sự hiện diện của \${[...new Set(satTinhList)].slice(0, 3).join(', ')} nhắc nhở bạn cần đặc biệt cẩn trọng trước các cạm bẫy hùn hạp tài chính và thói quen cả nể dĩ hòa vi quý.</span>\`;
    }

    // 2. Nghiệm lý biến cố 2 năm gần đây (2024 - 2025)
    const bienCoText = \`
      Năm <strong>Giáp Thìn 2024</strong> và <strong>Ất Tỵ 2025</strong> vừa qua là giai đoạn chuyển giao đầy chao đảo trong chu kỳ vận hạn của bạn. Trục Lưu Thái Tuế và Lưu Kình Đà liên tục kích hoạt vào bản cung và tam hợp chiếu:<br>
      • <strong>Về Tài chính &amp; Công danh:</strong> Đương số chắc chắn đã trải qua ít nhất một phen hao hụt tiền bạc ngoài dự tính, công việc gặp điểm nghẽn hoặc phải gánh vác các khoản chi tiêu lớn bất khả kháng. Nhiều dự định ấp ủ tưởng chừng nắm chắc lại bị đình trệ vào phút chót.<br>
      • <strong>Về Tâm lý &amp; Mối quan hệ:</strong> Xuất hiện sự rạn nứt hoặc xa cách trong các mối quan hệ thân cận. Có những thời điểm đương số cảm thấy cô độc tuyệt đối, nỗ lực hy sinh cho người khác nhưng nhận lại sự thờ ơ hoặc thiếu thấu hiểu.<br>
      <div style="margin-top:8px; padding:8px 12px; background:rgba(163,40,31,0.06); border-left:3px solid #A3281F; border-radius:4px; font-style:italic;">
        “Cụ Nguyễn Phát Lộc đúc kết: Đây không phải là sự xui xẻo ngẫu nhiên, mà là vũ trụ đang 'thanh lọc mặt bằng' tâm thức, giúp bạn nhận diện rõ kẻ giả người thật trước khi bước vào chu kỳ đón nhận đại vận tài lộc mới 2026 – 2027.”
      </div>
    \`;

    // 3. Điểm sáng Cát Tinh cứu giải
    const catTinhItems = [];
    [pMenh, pThan, pTai, pQuan, pDi].forEach(p => {
      (p.phuTinhLeft || []).forEach(s => {
        if (['Hóa Khoa', 'Hóa Lộc', 'Hóa Quyền', 'Thiên khôi', 'Thiên việt', 'Tả phù', 'Hữu bật', 'Ân quang', 'Thiên quý', 'Giải thần', 'Long đức', 'Nguyệt đức', 'Thiên đức', 'Phúc đức', 'Thanh long', 'Lộc tồn'].includes(s.name) || s.tuHoa) {
          catTinhItems.push(\`<strong>\${s.name}\${s.tuHoa ? ' [' + s.tuHoa + ']' : ''}</strong> (\${p.cungName.replace('<THÂN>', '')})\`);
        }
      });
      (p.chinhTinh || []).forEach(s => {
        if (s.tuHoa) {
          catTinhItems.push(\`<strong>\${s.name} [\${s.tuHoa}]</strong> (\${p.cungName.replace('<THÂN>', '')})\`);
        }
      });
    });
    const uniqueCatTinh = [...new Set(catTinhItems)].slice(0, 4);

    const catTinhText = \`
      Dù đi qua nhiều khúc quanh gian nan, lá số của bạn sở hữu <strong>bộ ba quý tinh phò trợ cực mạnh</strong>: \${uniqueCatTinh.length > 0 ? uniqueCatTinh.join(', ') : 'Hội tụ Tứ Đức &amp; Khoa Quyền Lộc'}.<br>
      Đây là bố cục <em>"Tiền bần hậu phú — Đại khí vãn thành"</em>. Càng trải qua thử thách thì bản lĩnh và giá trị của bạn càng nhân lên gấp bội. Bước sang năm <strong>2026 (Bính Ngọ)</strong>, thiên vận bắt đầu mở ra chiếc chìa khóa lật ngược tình thế, đặc biệt là cơ hội tài chính đột phá vào nửa cuối năm nếu bạn biết cách kích hoạt đúng phong thủy tinh đẩu và hóa giải triệt để các sát tinh ngầm.
    \`;

    return \`
      <div class="free-psychological-dossier" style="margin-bottom: 2rem; background: #FDFBF7; border: 1.5px solid var(--seal, #A3281F); border-radius: 8px; padding: 1.4rem; box-shadow: 0 4px 15px rgba(27,23,20,0.06);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:1rem; border-bottom:1px dashed var(--line, #CFC2A6); padding-bottom:0.75rem;">
          <span style="background:var(--seal, #A3281F); color:#fff; font-size:0.78rem; font-weight:700; padding:3px 10px; border-radius:4px; text-transform:uppercase; letter-spacing:0.5px;">Miễn Phí</span>
          <h3 style="font-family:'Noto Serif', serif; font-size:1.15rem; color:var(--seal, #A3281F); margin:0; font-weight:700;">
            ✦ BẢN ĐỒ TÍNH CÁCH NGẦM &amp; NGHIỆM LÝ VẬN TRÌNH ĐÃ QUA
          </h3>
        </div>
        <p style="font-size:0.88rem; color:var(--text-muted, #5E5446); margin-bottom:1.2rem; font-style:italic;">
          Biện giải tâm lý học thực chứng tổng hợp từ tổ hợp Chính Tinh, Tứ Hóa &amp; Lục Sát Tinh tọa thủ tại Mệnh, Thân, Tài, Quan của đương số <strong>\${laSo.hoTen || 'Đương Số'}</strong>:
        </p>

        <!-- Mục 1 -->
        <div class="dossier-card" style="background:#fff; border:1px solid var(--line, #CFC2A6); border-radius:6px; padding:1rem 1.1rem; margin-bottom:1rem;">
          <h4 style="font-size:0.98rem; font-weight:700; color:var(--ink, #1B1714); margin:0 0 0.5rem; display:flex; align-items:center; gap:6px;">
            <span style="color:var(--seal, #A3281F);">1.</span> Góc Khuất Nội Tâm &amp; Điểm Yếu Chí Mạng
          </h4>
          <div style="font-size:0.9rem; line-height:1.68; color:var(--text, #2A231C);">
            \${gockhuatText}
          </div>
        </div>

        <!-- Mục 2 -->
        <div class="dossier-card" style="background:#fff; border:1px solid var(--line, #CFC2A6); border-radius:6px; padding:1rem 1.1rem; margin-bottom:1rem;">
          <h4 style="font-size:0.98rem; font-weight:700; color:var(--ink, #1B1714); margin:0 0 0.5rem; display:flex; align-items:center; gap:6px;">
            <span style="color:var(--seal, #A3281F);">2.</span> Nghiệm Lý Biến Cố 2 Năm Gần Đây (2024 – 2025)
          </h4>
          <div style="font-size:0.9rem; line-height:1.68; color:var(--text, #2A231C);">
            \${bienCoText}
          </div>
        </div>

        <!-- Mục 3 -->
        <div class="dossier-card" style="background:#fff; border:1px solid var(--line, #CFC2A6); border-radius:6px; padding:1rem 1.1rem;">
          <h4 style="font-size:0.98rem; font-weight:700; color:var(--ink, #1B1714); margin:0 0 0.5rem; display:flex; align-items:center; gap:6px;">
            <span style="color:var(--seal, #A3281F);">3.</span> Điểm Sáng Cát Tinh Cứu Giải &amp; Lối Thoát Thịnh Vượng
          </h4>
          <div style="font-size:0.9rem; line-height:1.68; color:var(--text, #2A231C);">
            \${catTinhText}
          </div>
        </div>

        <div style="text-align:center; margin-top:1.2rem; padding:0.8rem; background:rgba(176,138,62,0.08); border-radius:6px;">
          <p style="margin:0 0 0.5rem; font-size:0.88rem; color:var(--text, #2A231C); font-weight:600;">
            👇 Dưới đây là luận giải chi tiết từng Cung Vị &amp; Thời Khắc Vàng chuyển mình trong Đại Vận 2026 – 2027:
          </p>
        </div>
      </div>
    \`;
  }

  // ============================================================================
  // 7. CLIFFHANGER TEASER GENERATOR (CHO 10 CUNG CHƯA MỞ KHÓA)
  // ============================================================================

  function generatePalaceCliffhangerTeaser(cung, laSo) {
    const cungName = cung.cungName.replace('<THÂN>', '').trim();
    const chinhTinhNames = (cung.chinhTinh || []).map(s => s.name + (s.dacHam ? ' ' + s.dacHam : '')).join(', ') || 'Vô Chính Diệu';
    
    const satTinhNames = (cung.phuTinhRight || []).map(s => s.name).slice(0, 3).join(', ');
    const catTinhNames = (cung.phuTinhLeft || []).map(s => s.name).slice(0, 3).join(', ');

    let bullets = [];

    switch (cungName) {
      case 'TÀI BẠCH':
        bullets = [
          \`Bí pháp kích hoạt nguồn tiền đại cát từ <strong>[\${chinhTinhNames}]</strong> trong năm Bính Ngọ 2026.\`,
          \`Tháng âm lịch trong năm 2026 – 2027 cần đề phòng hao tài lớn nhất do tác động của <strong>[\${satTinhNames || 'Địa Không, Tiểu Hao'}]</strong>.\`,
          \`Định hướng phân bổ dòng vốn: Lá số của bạn hợp đầu tư Bất Động Sản, Chứng Khoán hay kinh doanh dịch vụ?\`,
          \`Toàn văn phương pháp Cải Mệnh &amp; Tích Phúc Tụ Tài kinh điển của cụ Nguyễn Phát Lộc cho Cung Tài Bạch.\`
        ];
        break;
      case 'QUAN LỘC':
        bullets = [
          \`Ngành nghề &amp; lĩnh vực đại vận giúp bạn đột phá công danh với thế đứng của <strong>[\${chinhTinhNames}]</strong>.\`,
          \`Thời điểm vàng chuyển việc, thăng chức hoặc mở rộng quy mô kinh doanh trong 2 năm 2026 – 2027.\`,
          \`Bí quyết chế ngự tiểu nhân ganh ghét và kích hoạt quý nhân nâng đỡ trên con đường thăng tiến.\`
        ];
        break;
      case 'PHU THÊ':
        bullets = [
          \`Chân dung, tính cách &amp; nghề nghiệp của người bạn đời tiền định qua bộ sao <strong>[\${chinhTinhNames}]</strong>.\`,
          \`Thời điểm kết hôn hoặc giai đoạn thử thách hôn nhân cần hóa giải để gia đạo hòa thuận bền lâu.\`,
          \`Phương pháp hóa giải triệt để ảnh hưởng của <strong>[\${satTinhNames || 'Sát Tinh ngầm / Không Vong'}]</strong> để giữ trọn lửa ấm gia đình.\`
        ];
        break;
      case 'ĐIỀN TRẠCH':
        bullets = [
          \`Quy mô và thời điểm tích lũy bất động sản lớn nhất trong đời theo thế đứng của <strong>[\${chinhTinhNames}]</strong>.\`,
          \`Năm nào trong đại vận là thời điểm vàng để mua bán nhà đất không lo tranh chấp, sinh lời tối đa?\`,
          \`Bí quyết phong thủy nhà ở kích hoạt cung Tài Lộc tương sinh với bản mệnh.\`
        ];
        break;
      case 'THIÊN DI':
        bullets = [
          \`Vận số xuất ngoại, đi xa lập nghiệp: Cơ hội thăng tiến và đắc thời đắc vị ngoài xã hội.\`,
          \`Phương vị xuất hành đại cát và các tháng cần cẩn trọng an toàn giao thông năm 2026.\`,
          \`Cách biến môi trường xã hội bên ngoài thành bàn đạp làm giàu nhanh chóng.\`
        ];
        break;
      case 'PHÚC ĐỨC':
        bullets = [
          \`Mức độ thụ hưởng phúc ấm tổ tiên và chiều sâu nội tâm theo bộ sao <strong>[\${chinhTinhNames}]</strong>.\`,
          \`Nguồn năng lượng tâm linh và nghiệp lực dòng họ tác động đến hậu vận như thế nào?\`,
          \`Phương pháp tu dưỡng tâm tính &amp; tích lũy âm đức giúp tiêu trừ vận hạn lớn.\`
        ];
        break;
      case 'TỬ TỨC':
        bullets = [
          \`Số lượng, giới tính và đường công danh hiển đạt của con cái sau này theo <strong>[\${chinhTinhNames}]</strong>.\`,
          \`Tính cách con cái và phương pháp giáo dục phù hợp để con thành tài, hiếu thuận.\`,
          \`Hóa giải các hung tinh chiếu cung con cái để gia đạo bình an.\`
        ];
        break;
      case 'TẬT ÁCH':
        bullets = [
          \`Bản đồ sức khỏe: Các cơ quan tạng phủ dễ suy yếu cần chú ý bảo dưỡng theo ngũ hành bản mệnh.\`,
          \`Năm hạn và tháng âm lịch cần đề phòng tai nạn, bệnh tật bất ngờ trong đại vận.\`,
          \`Pháp hóa giải huyết quang và cách ăn uống dưỡng sinh khoa học của cụ Nguyễn Phát Lộc.\`
        ];
        break;
      default:
        bullets = [
          \`Toàn bộ ma trận Tam Phương Tứ Chính hội chiếu tương tác vào Cung <strong>\${cungName}</strong>.\`,
          \`Dự báo cơ hội bứt phá và rủi ro tiềm ẩn trong chu kỳ 2 năm tới (2026 – 2027).\`,
          \`Lời khuyên Cải Mệnh &amp; Hóa Giải sát tinh chi tiết từ các bậc tiền bối Tử Vi Lý Số.\`
        ];
    }

    return {
      cungName,
      chinhTinhNames,
      bullets
    };
  }
`;

// Insert injection right before "  // 6. XUẤT RA TOÀN BỘ API"
const targetStr = "  // 6. XUẤT RA TOÀN BỘ API";
if (code.includes(targetStr)) {
  code = code.replace(targetStr, injection + "\n" + targetStr);
} else {
  console.error("Target string not found!");
  process.exit(1);
}

// Update export block
const exportOld = "global.TuViLuanGiaiEngine = {\n    generatePalaceDeepAnalysis: generatePalaceDeepAnalysis,";
const exportNew = "global.TuViLuanGiaiEngine = {\n    generatePalaceDeepAnalysis: generatePalaceDeepAnalysis,\n    generateFreePsychologicalTeaserHtml: generateFreePsychologicalTeaserHtml,\n    generatePalaceCliffhangerTeaser: generatePalaceCliffhangerTeaser,";

code = code.replace(exportOld, exportNew);

fs.writeFileSync('js/tuvi-luan-giai.js', code, 'utf8');
fs.writeFileSync('public/js/tuvi-luan-giai.js', code, 'utf8');
console.log('Successfully updated js/tuvi-luan-giai.js and public/js/tuvi-luan-giai.js!');

