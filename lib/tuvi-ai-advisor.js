/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - CỐ VẤN TỬ VI AI NAM PHÁI (VIP EXCLUSIVE)
 * Hệ thống Cố Vấn Tinh Bàn dựa trên thuật toán an sao chính tông 100%
 * ============================================================================
 */

const https = require('https');

/**
 * Trích xuất cung theo tên
 */
function findCung(chart, namePrefix) {
  if (!chart || !Array.isArray(chart.cung)) return null;
  return chart.cung.find(c => c.cungName && c.cungName.toUpperCase().includes(namePrefix.toUpperCase())) || null;
}

/**
 * Trích xuất danh sách sao thành chuỗi
 */
function getStarsText(cung) {
  if (!cung) return 'Vô Chính Diệu';
  const ct = (cung.chinhTinh || []).map(s => `${s.name}${s.dacHam ? ` (${s.dacHam})` : ''}`).join(', ') || 'Vô Chính Diệu';
  const left = (cung.phuTinhLeft || []).map(s => s.name).join(', ');
  const right = (cung.phuTinhRight || []).map(s => s.name).join(', ');
  const tuHoa = [];
  [...(cung.chinhTinh || []), ...(cung.phuTinhLeft || []), ...(cung.phuTinhRight || [])].forEach(s => {
    if (s.tuHoa) tuHoa.push(`${s.name} [${s.tuHoa}]`);
  });
  return {
    chinhTinh: ct,
    catTinh: left || 'Thanh tịnh',
    satTinh: right || 'Không có hung sát lớn',
    tuHoa: tuHoa.length > 0 ? tuHoa.join(', ') : 'Không hóa'
  };
}

/**
 * Gọi Google Gemini API nếu có API key
 */
async function callGeminiApi(apiKey, systemPrompt, userMessage) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\n--- CÂU HỎI CỦA ĐƯƠNG SỐ ---\n${userMessage}` }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
        topP: 0.9
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.candidates && json.candidates[0] && json.candidates[0].content) {
            const text = json.candidates[0].content.parts.map(p => p.text).join('\n');
            resolve(text.trim());
          } else {
            reject(new Error(json.error ? json.error.message : 'Gemini response empty'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Gemini API timeout'));
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Bộ suy luận luận giải Nam Phái nội tại (Chuyên gia bản địa đảm bảo 250 - 350 từ)
 */
function generateNativeNamPhaiAdvice(chart, question) {
  const hoTen = chart.hoTen || 'Đương số';
  const namSinh = chart.namSinh || 2002;
  const canChiNam = chart.canChiNam || 'Nhâm Ngọ';
  const napAm = chart.napAm || 'Dương Liễu Mộc';
  const cuc = (chart.cucInfo && chart.cucInfo.name) ? chart.cucInfo.name : (chart.cuc || 'Hỏa Lục Cục');

  const cungList = Array.isArray(chart.cung) ? chart.cung : [];
  const pMenh = (chart.cungMenh && cungList[chart.cungMenh.chiIndex]) || cungList[0] || { chi: 'Tỵ', cungName: 'MỆNH' };
  const pThan = (chart.cungThan && cungList[chart.cungThan.chiIndex]) || cungList[0] || pMenh;
  const pTai = findCung(chart, 'TÀI BẠCH') || pMenh;
  const pQuan = findCung(chart, 'QUAN LỘC') || pMenh;
  const pPhuThe = findCung(chart, 'PHU THÊ') || pMenh;
  const pDien = findCung(chart, 'ĐIỀN TRẠCH') || pMenh;
  const pDi = findCung(chart, 'THIÊN DI') || pMenh;

  const sMenh = getStarsText(pMenh);
  const sThan = getStarsText(pThan);
  const sTai = getStarsText(pTai);
  const sQuan = getStarsText(pQuan);
  const sPhuThe = getStarsText(pPhuThe);

  const qLower = question.toLowerCase();

  // 1. CHỦ ĐỀ TÀI LỘC & TIỀN BẠC
  if (qLower.includes('lộc') || qLower.includes('tiền') || qLower.includes('tài') || qLower.includes('đầu tư') || qLower.includes('làm giàu') || qLower.includes('kinh doanh')) {
    return `Chào bạn ${hoTen}, soi xét tinh bàn bản mệnh ${canChiNam} (${napAm}, ${cuc}), Cung Tài Bạch của bạn tọa tại ${pTai.chi} với thế đứng của [${sTai.chinhTinh}], hội tụ cát tinh [${sTai.catTinh}] và chịu tương tác từ [${sTai.satTinh}].

Về cơ hội tiền tài và tháng phát lộc trong năm Bính Ngọ 2026: Dòng tiền của bạn mang đặc tính "tụ tán hữu thời", nguồn thu lớn nhất không đến từ may rủi chớp nhoáng mà phát tiết mạnh mẽ từ uy tín cá nhân, năng lực điều phối và các mối quan hệ chiến lược. Trong năm 2026, trục Lưu Thái Tuế kích hoạt cung Tài Lộc rực rỡ nhất vào các tháng giữa và cuối năm âm lịch (đặc biệt là tháng 4, tháng 8 và tháng 11 âm lịch). Đây là thời điểm cát tinh hội chiếu mở ra cơ hội ký kết hợp đồng, thu hồi công nợ hoặc có khoản bổng lộc xứng đáng với công sức bạn đã gieo trồng.

Tuy nhiên, do ảnh hưởng từ các phụ tinh [${sTai.satTinh}], bạn cần cẩn trọng đề phòng việc cả nể chi tiêu hoặc cho vay mượn thiếu cam kết rõ ràng vào đầu năm (tháng Giêng và tháng 5 âm lịch). Lời khuyên Cải Mệnh của tiền nhân: Hãy luôn trích 20% lợi nhuận tái tích lũy vào tài sản an toàn hoặc làm việc thiện nguyện để dưỡng khí cung Tài, giúp phúc sinh lộc vượng bền vững trọn đời.`;
  }

  // 2. CHỦ ĐỀ CÔNG DANH & NGHỀ NGHIỆP (LÀM CHỦ HAY LÀM THUÊ)
  if (qLower.includes('chủ') || qLower.includes('nghề') || qLower.includes('việc') || qLower.includes('công việc') || qLower.includes('sự nghiệp') || qLower.includes('chuyên môn') || qLower.includes('thăng tiến')) {
    return `Chào bạn ${hoTen}, đối với câu hỏi về định hướng nghề nghiệp, cổ thư Tử Vi Nam Phái luôn phối hợp chặt chẽ giữa Cung Mệnh (${pMenh.chi} - [${sMenh.chinhTinh}]) và Cung Quan Lộc (${pQuan.chi} - [${sQuan.chinhTinh}]).

Bản mệnh của bạn mang khí chất quang minh, lòng tự tôn cao và không thích sự gò bó rập khuôn. Với tổ hợp tinh đẩu hiện tại, bạn là mẫu người "Tiền chuyên môn - Hậu làm chủ". Giai đoạn khởi nghiệp hoặc bước đầu xây dựng sự nghiệp, bạn nên tập trung trau dồi chuyên môn sâu sắc, khẳng định vị thế cá nhân và xây dựng mạng lưới quan hệ vững chắc. Từ sau tuổi 30, khi Thân cư ${chart.thanCu || 'vị'} phát huy trọn vẹn sức mạnh của [${sThan.chinhTinh}], thiên thời sẽ mở đường để bạn đứng ra làm chủ, vận hành doanh nghiệp riêng hoặc nắm giữ các vị trí lãnh đạo then chốt.

Lời khuyên hành động thực tế: Bạn rất hợp với các lĩnh vực đòi hỏi tầm nhìn chiến lược, quản trị nhân sự, thương mại dịch vụ hoặc tư vấn chuyển giao. Đừng quá nóng vội nhảy việc trong lúc thị trường biến động; hãy biến chuyên môn cốt lõi thành thương hiệu cá nhân không thể thay thế. Khi đạo tâm và chuyên môn đủ dày, tài vận công danh ắt tự tìm đến.`;
  }

  // 3. CHỦ ĐỀ HÔN NHÂN & TÌNH DUYÊN
  if (qLower.includes('vợ') || qLower.includes('chồng') || qLower.includes('duyên') || qLower.includes('tình cảm') || qLower.includes('kết hôn') || qLower.includes('yêu') || qLower.includes('phu thê')) {
    return `Chào bạn ${hoTen}, chuyện trăm năm gia đạo trên lá số của bạn được soi chiếu trực tiếp qua Cung Phu Thê tại ${pPhuThe.chi} (tọa thủ [${sPhuThe.chinhTinh}], hội [${sPhuThe.catTinh}], sát tinh [${sPhuThe.satTinh}]).

Về thời điểm và đặc tính người bạn đời: Người phối ngẫu tiền định của bạn là người có học thức, trọng danh dự, tính cách chu đáo nhưng nội tâm đôi khi khá cá tính và có quan điểm riêng rất kiên định. Trong tiền vận, nhân duyên của bạn dễ gặp cảnh trắc trở, yêu xa hoặc trải qua hiểu lầm thử thách lòng kiên nhẫn. Giai đoạn tình cảm đạt độ chín muồi và hòa hợp sâu sắc nhất là khi cả hai đã có sự nghiệp ổn định (thường từ 27 tuổi trở đi). Năm 2026 – 2027 là chu kỳ vượng khí đào hoa cát lành, rất thuận lợi để tính chuyện trăm năm hoặc hâm nóng tình cảm vợ chồng.

Phép Hóa Giải & Dưỡng Duyên của cụ Nguyễn Phát Lộc: Hôn nhân bền vững cốt ở hai chữ "Bao Dung". Hãy học cách lắng nghe nhiều hơn phán xét, nhường nhịn nhau trong lời ăn tiếng nói hàng ngày. Đồng vợ đồng chồng cùng hướng tâm làm việc thiện, chăm sóc song thân hai bên sẽ chuyển hóa triệt để mọi hung sát tinh ngầm, giúp mái ấm luôn an vui, thịnh vượng.`;
  }

  // 4. CHỦ ĐỀ VẬN HẠN NĂM 2026 (BÍNH NGỌ) & NĂM NAY
  if (qLower.includes('2026') || qLower.includes('năm nay') || qLower.includes('năm tới') || qLower.includes('vận hạn') || qLower.includes('thời cơ') || qLower.includes('thay đổi')) {
    return `Chào bạn ${hoTen}, năm Bính Ngọ 2026 là năm có tính bước ngoặt mạnh mẽ đối với bản mệnh ${napAm} (${canChiNam}). Thiên can Bính (Hỏa) tương tác trực tiếp vào cung vị lưu niên, tạo nên sự chuyển dịch lớn về công việc lẫn tâm thức.

Vận trình năm nay của bạn có 3 điểm sáng then chốt: Thứ nhất, sự nghiệp có cơ hội mở rộng không gian phát triển, dễ được người trên cất nhắc hoặc tìm ra hướng đi mới mẻ hơn. Thứ hai, tài chính hanh thông vào nửa cuối năm, bù đắp cho những hao tổn của chu kỳ 2 năm 2024 - 2025 vừa qua. Thứ ba, tư duy và trực giác của bạn trở nên nhạy bén khác thường, giúp bạn đưa ra nhiều quyết định mang tính chiến lược dài hạn.

Những điều cần lưu tâm: Đề phòng thị phi khẩu thiệt hoặc áp lực công việc gia tăng vào tháng 5 và tháng 7 âm lịch. Không nên mạo hiểm đầu cơ vào các dự án mờ ám không minh bạch pháp lý. Giữ tâm thái vững vàng, chủ động lập kế hoạch tài chính rõ ràng và tích cực tu dưỡng tâm tính, bạn chắc chắn sẽ gặt hái thành tựu rực rỡ trong năm Bính Ngọ này.`;
  }

  // 5. CÂU HỎI TỔNG QUÁT KHÁC
  return `Chào bạn ${hoTen}, thấu suốt câu hỏi của bạn dưới góc nhìn Tử Vi Đẩu Số Nam Phái, tinh bàn của bạn sở hữu bố cục vững chãi với Mệnh tọa ${pMenh.chi} ([${sMenh.chinhTinh}]) và Thân cư ${chart.thanCu || 'Tài Bạch'} ([${sThan.chinhTinh}]).

Bản chất số mệnh là sự kết hợp giữa Thiên Thời, Địa Lợi và Nhân Hòa. Tổ hợp các sao hiện tại cho thấy bạn là người có nội lực dồi dào, khả năng thích ứng cao trước nghịch cảnh và luôn ấp ủ những khát vọng lớn lao. Mọi khó khăn hay trắc trở bạn gặp phải trong cuộc sống thực chất là những bài học tôi luyện bản lĩnh để bạn gánh vác sứ mệnh to lớn hơn ở hậu vận. Càng về sau, cát tinh càng phát huy uy lực mạnh mẽ giúp bạn tích lũy tài sản và khẳng định vị thế vững chắc trong xã hội.

Đạo Trị Mệnh khuyên bạn: Khi đứng trước ngã rẽ cuộc đời, hãy lấy chữ "Chính Đạo" làm kim chỉ nam. Làm việc gì cũng cần chuẩn bị chu toàn, kiên định với mục tiêu nhưng mềm mỏng trong ứng xử nhân sinh. Bạn đang nắm trong tay vận mệnh của chính mình, hãy tự tin tiến bước để hiện thực hóa những tiềm năng tuyệt vời mà thiên bẩm đã trao ban.`;
}

/**
 * Hàm xuất bản cố vấn AI chính thức
 */
async function generateTuViAiAdvice(chart, question) {
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (geminiApiKey && geminiApiKey.trim()) {
    try {
      const hoTen = chart.hoTen || 'Đương số';
      const namSinh = chart.namSinh || 2002;
      const canChiNam = chart.canChiNam || 'Nhâm Ngọ';
      const napAm = chart.napAm || 'Dương Liễu Mộc';
      const cuc = (chart.cucInfo && chart.cucInfo.name) ? chart.cucInfo.name : (chart.cuc || 'Hỏa Lục Cục');

      const pMenh = chart.cungMenh ? chart.cung[chart.cungMenh.chiIndex] : chart.cung[0];
      const pThan = chart.cungThan ? chart.cung[chart.cungThan.chiIndex] : chart.cung[0];
      const pTai = findCung(chart, 'TÀI BẠCH') || pMenh;
      const pQuan = findCung(chart, 'QUAN LỘC') || pMenh;
      const pPhuThe = findCung(chart, 'PHU THÊ') || pMenh;

      const systemPrompt = `
Bạn là Cố Vấn Tử Vi Đẩu Số Nam Phái Việt Nam bậc thầy (phái Trung Châu & cụ Nguyễn Phát Lộc).
Dữ liệu lá số đã được an sao chuẩn xác 100%:
- Đương số: ${hoTen}, sinh năm ${canChiNam} (${namSinh}), Nạp âm: ${napAm}, Cục: ${cuc}.
- Cung Mệnh (${pMenh.chi}): ${JSON.stringify(getStarsText(pMenh))}
- Cung Thân (cư ${chart.thanCu || 'Mệnh'} tại ${pThan.chi}): ${JSON.stringify(getStarsText(pThan))}
- Cung Tài Bạch (${pTai.chi}): ${JSON.stringify(getStarsText(pTai))}
- Cung Quan Lộc (${pQuan.chi}): ${JSON.stringify(getStarsText(pQuan))}
- Cung Phu Thê (${pPhuThe.chi}): ${JSON.stringify(getStarsText(pPhuThe))}
- Năm xem hạn: 2026 (Bính Ngọ).

NGUYÊN TẮC BẮT BUỘC:
1. Dựa ĐÚNG vào các sao tọa thủ và hội chiếu trong dữ liệu trên để trả lời câu hỏi. Tuyệt đối KHÔNG tự tính lại ngày giờ hay tự chế sao.
2. Giọng văn: Uyên thâm, ấm áp, sâu sắc, thực tế, mang tính định hướng hành động (Cải Mệnh & Tu Dưỡng).
3. Độ dài chuẩn xác: đúng 250 - 350 từ, chia làm 3 đoạn văn mạch lạc, không dùng gạch đầu dòng hay ký tự markdown rườm rà.
      `.trim();

      const aiText = await callGeminiApi(geminiApiKey.trim(), systemPrompt, question);
      if (aiText && aiText.length > 100) {
        return aiText;
      }
    } catch (err) {
      console.warn('Lỗi gọi Gemini API (chuyển sang bộ suy luận Nam Phái nội tại):', err.message);
    }
  }

  // Fallback: Trình suy luận Nam Phái chuyên sâu bảo đảm 100% không phụ thuộc internet
  return generateNativeNamPhaiAdvice(chart, question);
}

module.exports = {
  generateTuViAiAdvice
};
