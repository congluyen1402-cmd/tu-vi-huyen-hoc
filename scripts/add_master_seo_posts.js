const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '..', 'data', 'posts.json');
let posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

// Bài viết 1: Thần Số Học kết hợp Tử Vi (Độc bản - Không đụng hàng)
const post1 = {
  id: "post-than-so-hoc-doi-chieu-tu-vi",
  slug: "y-nghia-9-con-so-chu-dao-pythagoras-doi-chieu-cung-menh-tu-vi",
  title: "Ý Nghĩa 9 Con Số Chủ Đạo Pythagoras & Cách Đối Chiếu Cung Mệnh Tử Vi: Bí Mật Định Mệnh & Khải Vận Thành Công",
  description: "Giải mã chi tiết 9 con số chủ đạo và con số Vua (11, 22) trong Thần Số Học Pythagoras, kết hợp đối chiếu Cung Mệnh Tử Vi để khám phá trọn vẹn sứ mệnh và bí quyết khải vận bứt phá.",
  keywords: "thần số học pythagoras, con số chủ đạo, số đường đời, thần số học và tử vi, 9 con số chủ đạo, số chủ đạo 11 22, giải mã bản thân, tra cứu thần số học",
  category: "Thần Số Học",
  publishedAt: "2026-11-13",
  updatedAt: "2026-11-13T09:00:00+07:00",
  readTime: "9 phút",
  views: 1890,
  image: "/img/og-image.jpg",
  author: "Đại Sư Nam Phái & Chuyên Gia Pythagoras",
  contentHtml: `
    <p>Trong kho tàng huyền học nhân loại, nếu <strong>Tử Vi Đẩu Số Nam Phái</strong> được ví như bức tranh thiên văn chi tiết mô tả bàn cờ số phận qua 12 cung chức, thì <strong>Thần Số Học Pythagoras</strong> lại là chiếc chìa khóa giải mã sóng rung tần số năng lượng cốt lõi của từng linh hồn. Khi kết hợp hai bộ môn này, bạn sẽ nhận được một góc nhìn đa chiều vô cùng sâu sắc: <em>Không chỉ biết mình gặp vận gì, mà còn hiểu rõ nội lực bản thân mạnh ở đâu để làm chủ số mệnh</em>.</p>

    <h2>1. Con Số Chủ Đạo Pythagoras Là Gì? Chiếc La Bàn Tần Số Năng Lượng</h2>
    <p>Theo nhà toán học và triết gia cổ đại Pythagoras, vạn vật trong vũ trụ đều cấu thành từ các rung động số học từ 1 đến 9, cùng hai con số bậc thầy (Master Numbers) là <strong>11 và 22/4</strong>. <strong>Con Số Chủ Đạo (Life Path Number)</strong> được tính bằng tổng các chữ số trong ngày tháng năm sinh dương lịch, rút gọn về một chữ số (trừ 11 và 22).</p>
    
    <div class="article-callout">
      <div class="article-callout-title">✦ CÔNG THỨC TÍNH NHANH CON SỐ CHỦ ĐẠO</div>
      <p>Ví dụ bạn sinh ngày <strong>14/02/1995</strong>:<br>
      • Ngày: 1 + 4 = 5<br>
      • Tháng: 0 + 2 = 2<br>
      • Năm: 1 + 9 + 9 + 5 = 24 $\rightarrow$ 2 + 4 = 6<br>
      • Tổng: 5 + 2 + 6 = <strong>13</strong> $\rightarrow$ 1 + 3 = <strong>Số Chủ Đạo 4</strong> (Năng lượng cẩn trọng, thực tế, xây dựng nền tảng vững chắc).</p>
    </div>

    <h2>2. Bảng Đối Chiếu Độc Quyền: 9 Con Số Chủ Đạo &amp; Bộ Sao Cung Mệnh Tử Vi</h2>
    <p>Điểm độc đáo tại <strong>Xem Tử Vi Huyền Học</strong> là chúng tôi đã nghiên cứu sự tương đồng mật thiết giữa rung cảm thần số học phương Tây và hệ thống 14 Chính Tinh Tử Vi Nam Phái phương Đông:</p>

    <div class="infographic-wrapper">
      <div class="infographic-inner-frame">
        <div class="infographic-title">✦ MA TRẬN ĐỐI CHIẾU THẦN SỐ HỌC PYTHAGORAS &amp; CHÍNH TINH TỬ VI ✦</div>
        <div class="infographic-grid-4">
          <!-- Số 1 & 2 -->
          <div class="infographic-card">
            <div class="infographic-card-header crimson">SỐ 1 &amp; SỐ 2</div>
            <div class="infographic-card-body">
              <div class="infographic-card-item">
                <span class="infographic-item-tag crimson">● Số 1 (Lãnh Đạo):</span>
                <span class="infographic-item-desc">Tương ứng <em>Tử Vi, Thái Dương</em>. Bản lĩnh tiên phong, tự chủ, quyết đoán, không chịu khuất phục.</span>
              </div>
              <div class="infographic-card-item">
                <span class="infographic-item-tag navy">● Số 2 (Hòa Giải):</span>
                <span class="infographic-item-desc">Tương ứng <em>Thái Âm, Thiên Đồng</em>. Trực giác nhạy bén, hòa nhã, lắng nghe, kết nối tình cảm xuất sắc.</span>
              </div>
              <div class="infographic-card-badge">Năng Lượng Khởi Sinh</div>
            </div>
          </div>

          <!-- Số 3 & 4 -->
          <div class="infographic-card">
            <div class="infographic-card-header gold">SỐ 3 &amp; SỐ 4</div>
            <div class="infographic-card-body">
              <div class="infographic-card-item">
                <span class="infographic-item-tag gold">● Số 3 (Truyền Cảm Hứng):</span>
                <span class="infographic-item-desc">Tương ứng <em>Thiên Cơ, Văn Xương</em>. Trí tuệ sáng láng, hoạt ngôn, tư duy sáng tạo nghệ thuật bay bổng.</span>
              </div>
              <div class="infographic-card-item">
                <span class="infographic-item-tag emerald">● Số 4 (Quy Chuẩn - Vững Chãi):</span>
                <span class="infographic-item-desc">Tương ứng <em>Thiên Phủ, Vũ Khúc</em>. Quản trị tài chính sắc sảo, kỷ luật, thực tế, làm việc có kế hoạch.</span>
              </div>
              <div class="infographic-card-badge">Trí Tuệ &amp; Nền Móng</div>
            </div>
          </div>

          <!-- Số 5 & 6 -->
          <div class="infographic-card">
            <div class="infographic-card-header rose">SỐ 5 &amp; SỐ 6</div>
            <div class="infographic-card-body">
              <div class="infographic-card-item">
                <span class="infographic-item-tag rose">● Số 5 (Tự Do - Đổi Mới):</span>
                <span class="infographic-item-desc">Tương ứng <em>Tham Lang, Thiên Mã</em>. Thích phiêu lưu, thích ứng siêu tốc, đa tài, ghét sự gò bó rập khuôn.</span>
              </div>
              <div class="infographic-card-item">
                <span class="infographic-item-tag amber">● Số 6 (Yêu Thương - Gia Đình):</span>
                <span class="infographic-item-desc">Tương ứng <em>Cự Môn đắc địa, Thiên Lương</em>. Trách nhiệm cao, bao dung, giàu lòng trắc ẩn, chăm sóc gia đạo.</span>
              </div>
              <div class="infographic-card-badge">Cảm Xúc &amp; Sáng Tạo</div>
            </div>
          </div>

          <!-- Số 7, 8, 9 & Master -->
          <div class="infographic-card">
            <div class="infographic-card-header navy">SỐ 7, 8, 9 &amp; 11/22</div>
            <div class="infographic-card-body">
              <div class="infographic-card-item">
                <span class="infographic-item-tag navy">● Số 7 (Chiêm Nghiệm):</span>
                <span class="infographic-item-desc">Tương ứng <em>Phá Quân, Thiên Không</em>. Trải qua bài học rèn luyện để đắc đạo, triết học và chân lý.</span>
              </div>
              <div class="infographic-card-item">
                <span class="infographic-item-tag gold">● Số 8 &amp; 9 (Thành Đạt &amp; Phụng Sự):</span>
                <span class="infographic-item-desc">Tương ứng <em>Hóa Lộc, Hóa Quyền</em>. Độc lập tài chính, lý tưởng cống hiến cho cộng đồng.</span>
              </div>
              <div class="infographic-card-item">
                <span class="infographic-item-tag danger">● Số Master 11/22:</span>
                <span class="infographic-item-desc">Tương ứng <em>Tử Phủ Vũ Tướng đắc địa</em>. Tiềm năng vĩ đại định hình thời thế.</span>
              </div>
              <div class="infographic-card-badge">Thành Tựu Đỉnh Cao</div>
            </div>
          </div>
        </div>
        <div class="infographic-footer-source">Đồ hình Đối Chiếu Khoa Học Huyền Học - Bản quyền thuộc xemtuvihuyenhoc.com</div>
      </div>
      <div class="infographic-caption">Hình 1: Ma trận đối chiếu tần số 9 Con Số Chủ Đạo Pythagoras và 14 Chính Tinh Tử Vi Nam Phái.</div>
    </div>

    <h2>3. Giải Mã Ý Nghĩa Chi Tiết Từng Con Số Chủ Đạo</h2>

    <h3>Số Chủ Đạo 1: Người Khởi Xướng &amp; Dẫn Đầu Độc Lập</h3>
    <p>Người mang số 1 sở hữu ý chí sắt đá, lòng kiên định và khát vọng vươn lên đỉnh cao. Bạn không thích đi sau lưng người khác mà luôn muốn tạo dựng lối đi riêng. Trong Tử Vi, người số 1 có cung Mệnh thường mang năng lượng của sao Tử Vi hoặc Thất Sát miếu địa: dám nghĩ, dám làm và chấp nhận thử thách.</p>

    <h3>Số Chủ Đạo 2: Bậc Thầy Ngoại Giao &amp; Hòa Hợp Tình Cảm</h3>
    <p>Người số 2 mang năng lượng mềm mại của nước, tương đồng với sao Thái Âm. Bạn có đôi tai biết lắng nghe, sự thấu cảm tuyệt vời và khả năng giải quyết mâu thuẫn một cách êm đẹp. Trong công việc, bạn là cánh tay đắc lực, đối tác trung thành mà ai cũng muốn đồng hành.</p>

    <h3>Số Chủ Đạo 3: Ngọn Lửa Sáng Tạo &amp; Truyền Cảm Hứng</h3>
    <p>Sở hữu trí tuệ sắc bén của Thiên Cơ và tính nghệ sĩ của Văn Khúc, người số 3 luôn là tâm điểm của sự chú ý. Bạn có khiếu hài hước, ngôn từ lưu loát và khả năng biến những ý tưởng trừu tượng thành hiện thực một cách sinh động.</p>

    <h3>Số Chủ Đạo 4: Nhà Xây Dựng Thực Tế &amp; Kỷ Luật Thép</h3>
    <p>Nếu bạn mang số 4, bạn là người coi trọng sự rõ ràng, minh bạch và an toàn tài chính. Giống như sao Thiên Phủ (kho tiền trời ban), bạn xây dựng sự nghiệp từng viên gạch một, cẩn trọng trong từng bước đi và có năng lực quản trị tài sản vô cùng vững chãi.</p>

    <h3>Số Chủ Đạo 5: Cánh Chim Tự Do &amp; Thích Ứng Mọi Biến Cố</h3>
    <p>Người số 5 không chịu nổi sự buồn tẻ lặp lại. Bạn yêu thích du lịch, khám phá công nghệ mới và luôn tiên phong trong các xu hướng mới. Năng lượng này tương đồng với sao Tham Lang và Thiên Mã: càng đi xa càng phát tài, càng đổi mới càng thành công.</p>

    <h3>Số Chủ Đạo 6: Trái Tim Bao Dung &amp; Trách Nhiệm Gia Đình</h3>
    <p>Số 6 là con số của tình mẫu tử và mái ấm gia đình. Bạn luôn hy sinh vì người khác, có khiếu thẩm mỹ và phong cách sống ấm áp. Tuy nhiên, người số 6 cần học cách yêu thương bản thân trước khi lo lắng cho thiên hạ kẻo dễ rơi vào trạng thái kiệt sức.</p>

    <h3>Số Chủ Đạo 7: Bậc Trí Giả &amp; Khát Khao Chân Lý</h3>
    <p>Người mang số 7 thường phải trải qua những bài học thử thách sâu sắc về tình cảm hoặc tài chính trong tiền vận. Nhưng chính những va vấp đó tôi luyện nên một trí tuệ siêu việt, khả năng tự học phi thường và trực giác tâm linh thấu suốt cuộc đời.</p>

    <h3>Số Chủ Đạo 8: Bản Lĩnh Tài Chính &amp; Khát Vọng Quyền Lực</h3>
    <p>Con số 8 tượng trưng cho vòng lặp vô cực và sự trù phú vật chất. Giống như Vũ Khúc Hóa Lộc trong Tử Vi, bạn có trực giác kinh doanh bẩm sinh, khả năng xoay chuyển dòng tiền và năng lực lãnh đạo doanh nghiệp quy mô lớn.</p>

    <h3>Số Chủ Đạo 9: Ngọn Đuốc Nhân Đạo &amp; Tinh Thần Phụng Sự</h3>
    <p>Người số 9 mang hoài bão lớn lao vì cộng đồng. Bạn sống hào sảng, trọng danh dự hơn tiền bạc và luôn sẵn lòng giúp đỡ những hoàn cảnh khó khăn. Trong Tử Vi, đây là mẫu người của Thái Dương miếu địa quang minh chính đại.</p>

    <h3>Con Số Bậc Thầy 11 &amp; 22/4: Tiềm Năng Khai Phá Thời Đại</h3>
    <p>Chỉ khoảng 3-5% dân số mang con số 11 hoặc 22. Bạn mang trong mình sứ mệnh dẫn dắt tinh thần hoặc kiến tạo các công trình để đời cho xã hội. Áp lực đi kèm rất lớn, nhưng nếu kiên trì tu dưỡng, thành tựu của bạn sẽ vượt xa người thường.</p>

    <h2>4. Kim Tự Tháp 4 Đỉnh Cao Cuộc Đời: Đón Đầu Vận Hội</h2>
    <p>Trong Thần Số Học, cuộc đời mỗi người được chia thành 4 giai đoạn chín muồi tương ứng với <strong>4 đỉnh cao Kim Tự Tháp</strong>. Mỗi đỉnh cao đại diện cho một con số bài học và thời cơ:</p>
    <ul>
      <li><strong>Đỉnh cao thứ 1 (Khoảng 27–35 tuổi):</strong> Giai đoạn định hình bản ngã và lựa chọn hướng đi sự nghiệp.</li>
      <li><strong>Đỉnh cao thứ 2 (9 năm tiếp theo):</strong> Giai đoạn củng cố vị thế, thành gia lập thất và tích lũy vốn liếng.</li>
      <li><strong>Đỉnh cao thứ 3 (9 năm tiếp theo):</strong> Thời kỳ bứt phá rực rỡ nhất về tài chính và công danh xã hội.</li>
      <li><strong>Đỉnh cao thứ 4 (Tuổi trung niên trở đi):</strong> Giai đoạn viên mãn, truyền dạy tri thức và cống hiến cho cộng đồng.</li>
    </ul>

    <h2>5. Lời Kết: Khởi Tâm Tu Dưỡng Cải Biến Số Mệnh</h2>
    <p>Dù con số chủ đạo của bạn là bao nhiêu hay lá số Tử Vi đóng ở cung vị nào, hãy luôn khắc ghi lời dạy bất hủ của tiền nhân: <em>"Tâm còn chưa thiện, phong thủy vô ích. Bất hiếu cha mẹ, thờ cúng vô ích."</em> Thấu hiểu bản thân qua Thần Số Học và Tử Vi là để biết điểm dừng mà phòng tránh rủi ro, biết thế mạnh mà phát huy tối đa, từ đó xây dựng một cuộc đời an lạc và thành công rực rỡ.</p>
  `
};

// Bài viết 2: Hôn Nhân & Bát Tự Hợp Tuổi (Độc bản - Giải quyết nỗi đau người dùng)
const post2 = {
  id: "post-bat-tu-tuong-xung-phu-the",
  slug: "bat-tu-tuong-xung-cung-phu-the-xau-hoa-giai-hon-nhan",
  title: "Bát Tự Tương Xung & Cung Phu Thê Xấu: Lời Đồn \"Biệt Ly\" Hay Phép Thử Tu Dưỡng Cải Biến Hôn Nhân?",
  description: "Bóc tách sự thật khi vợ chồng phạm tứ hành xung, cung Tuyệt Mệnh, Cô Thần Quả Tú. Hướng dẫn 4 phương pháp Bát Tự cổ truyền và phong thủy phòng ngủ hóa giải rạn nứt gia đạo.",
  keywords: "bát tự tương xung, hợp tuổi vợ chồng, hóa giải tuyệt mệnh, cung phu thê xấu, xem tuổi kết hôn, tử vi hôn nhân, phong thủy phòng ngủ vợ chồng, cô thần quả tú",
  category: "Hôn nhân & Gia đạo",
  publishedAt: "2026-11-13",
  updatedAt: "2026-11-13T09:00:00+07:00",
  readTime: "8 phút",
  views: 2150,
  image: "/img/sample-report-3.jpg",
  author: "Đại Sư Nam Phái & Ban Cố Vấn Gia Đạo",
  contentHtml: `
    <p><em>"Hai đứa không hợp tuổi, lấy nhau về là đứt gánh giữa đường!"</em> — Đây có lẽ là câu phán xét tàn nhẫn nhất khiến biết bao cặp đôi yêu nhau tha thiết phải ngậm ngùi chia tay trong nước mắt, hoặc bước vào cuộc sống hôn nhân với tâm lý hoang mang, nơm nớp lo sợ tai họa ập đến.</p>
    <p>Nhưng dưới góc nhìn của <strong>Tử Vi Đẩu Số Nam Phái và Bát Tự Khải Vận</strong>, chân lý hoàn toàn không đơn giản như những lời đồn đoán mê tín. Bài viết này sẽ bóc trần bản chất của "hợp - xung" và cung cấp giải pháp hóa giải tận gốc theo nguyên lý cổ truyền.</p>

    <h2>1. Bóc Trần 3 Sai Lầm Tai Hại Khi Xem Tuổi Hôn Nhân</h2>
    <p>Rất nhiều người hiện nay đi xem bói chỉ căn cứ vào một vài yếu tố bề nổi sơ sài mà vội vàng kết luận số phận một cuộc hôn nhân:</p>
    <ul>
      <li><strong>Sai lầm 1: Chỉ nhìn vào Địa Chi (Tứ Hành Xung):</strong> Thấy Tý - Ngọ - Mão - Dậu hay Dần - Thân - Tỵ - Hợi là phán "chắc chắn xung khắc". Trong thực tế, Địa Chi chỉ đại diện cho 1/8 năng lượng của Bát Tự (Năm, Tháng, Ngày, Giờ). Nhiều cặp đôi khắc tuổi năm sinh nhưng lại tương sinh ngày sinh, giờ sinh thì sống với nhau cả đời hạnh phúc viên mãn.</li>
      <li><strong>Sai lầm 2: Dọa dẫm về cung Tuyệt Mệnh, Biệt Ly:</strong> Trong Bát Trạch Lữ Tài, cung Tuyệt Mệnh xảy ra khi cung Phi của hai người kết hợp không thuận. Nhưng cổ nhân luôn dạy: <em>"Nhất Mệnh, Nhì Vận, Tam Phong Thủy, Tứ Tích Âm Đức, Ngũ Độc Thư"</em>. Cung Phi chỉ là một yếu tố phong thủy hoàn toàn có thể điều chỉnh được bằng hướng nhà, hướng bếp và cách bố trí phòng ngủ.</li>
      <li><strong>Sai lầm 3: Quên mất Cung Mệnh &amp; Cung Phu Thê trên lá số Tử Vi:</strong> Một người có cung Phu Thê đẹp, gặp sao Thiên Đồng, Hóa Lộc thì lấy ai cũng được yêu chiều; ngược lại người có cung Phu Thê phạm Tuần Triệt, Hóa Kỵ mà không biết tu sửa bản thân thì lấy người "hợp tuổi" mười mươi vẫn cãi vã ly hôn như thường.</li>
    </ul>

    <div class="infographic-wrapper">
      <div class="infographic-inner-frame">
        <div class="infographic-title">✦ SƠ ĐỒ 4 TẦNG SOI CHIẾU HÔN NHÂN &amp; PHƯƠNG PHÁP HÓA GIẢI ✦</div>
        <div class="infographic-grid-2">
          <!-- Cột 1: Soi Chiếu Rủi Ro -->
          <div class="infographic-card">
            <div class="infographic-card-header crimson">⚠️ NHỮNG BẤT HÒA CẦN NHẬN DIỆN</div>
            <div class="infographic-card-body">
              <div class="infographic-card-item">
                <span class="infographic-item-tag crimson">1. Bản Mệnh Ngũ Hành Tương Khắc:</span>
                <span class="infographic-item-desc">Chồng mệnh Hỏa vợ mệnh Kim; hoặc Chồng mệnh Thủy vợ mệnh Hỏa: Dễ bất đồng trong quan điểm sống hàng ngày.</span>
              </div>
              <div class="infographic-card-item">
                <span class="infographic-item-tag danger">2. Cung Phu Thê Gặp Hóa Kỵ / Sát Tinh:</span>
                <span class="infographic-item-desc">Cự Môn Hóa Kỵ chủ thị phi; Kình Dương Đà La chủ xung đột nóng nảy; Cô Quả chủ cảm giác xa cách, cô đơn.</span>
              </div>
              <div class="infographic-card-item">
                <span class="infographic-item-tag rose">3. Vận Hạn Năm Chiếu Vào Phu Thê:</span>
                <span class="infographic-item-desc">Năm gặp Lưu Tang Môn, Lưu Hổ hoặc Hóa Kỵ chiếu: Cần đề phòng người thứ ba và áp lực kinh tế bên ngoài.</span>
              </div>
              <div class="infographic-card-badge" style="background:#FFF1F0; border-color:#FECACA; color:#A3281F;">Nhận Diện Để Phòng Ngừa</div>
            </div>
          </div>

          <!-- Cột 2: Giải Pháp Cải Mệnh -->
          <div class="infographic-card">
            <div class="infographic-card-header emerald">🌿 PHƯƠNG PHÁP HÓA GIẢI CỔ TRUYỀN</div>
            <div class="infographic-card-body">
              <div class="infographic-card-item">
                <span class="infographic-item-tag emerald">1. Dùng Con Cái Làm Cầu Nối Sinh Khí:</span>
                <span class="infographic-item-desc">Chọn năm sinh con mang ngũ hành trung gian (Ví dụ: Chồng Hỏa khắc Vợ Kim $\rightarrow$ Sinh con mệnh Thổ: Hỏa sinh Thổ, Thổ sinh Kim hóa giải trọn vẹn).</span>
              </div>
              <div class="infographic-card-item">
                <span class="infographic-item-tag gold">2. Phong Thủy Phòng Ngủ &amp; Hướng Bếp:</span>
                <span class="infographic-item-desc">Bếp quay về hướng Diên Niên hoặc Sinh Khí để giữ ấm gia đạo; phòng ngủ tránh gương chiếu giường, tránh xà ngang đè đầu.</span>
              </div>
              <div class="infographic-card-item">
                <span class="infographic-item-tag navy">3. Tu Dưỡng "Nhẫn &amp; Lắng Nghe":</span>
                <span class="infographic-item-desc">Khi một người là ngọn lửa thì người kia phải là dòng nước mát. Tôn trọng không gian riêng và bao dung cho khiếm khuyết của bạn đời.</span>
              </div>
              <div class="infographic-card-badge" style="background:#ECFDF5; border-color:#A7F3D0; color:#047857;">Hóa Nguy Thành An</div>
            </div>
          </div>
        </div>
        <div class="infographic-footer-source">Học Thuyết Bát Tự Hôn Nhân - Thực hiện bởi Viện Nghiên Cứu Xem Tử Vi Huyền Học</div>
      </div>
      <div class="infographic-caption">Hình 2: Ma trận nhận diện nguy cơ xung khắc và 3 phương pháp cổ truyền hóa giải hôn nhân bền vững.</div>
    </div>

    <h2>2. Khi Cung Phu Thê Có "Cô Thần - Quả Tú" Hay "Tuần Triệt": Đừng Vội Hoảng Loạn!</h2>
    <p>Rất nhiều người khi thấy trong Cung Phu Thê của mình có <strong>Cô Thần, Quả Tú</strong> thì than khóc nghĩ rằng mình sẽ ế suốt đời hoặc phải chịu cảnh góa bụa cô độc. Đây là một sự hiểu lầm vô cùng tai hại:</p>
    <ul>
      <li><strong>Cô Thần - Quả Tú thực chất là gì?</strong> Đây là hai ngôi sao chủ về sự độc lập, cá tính mạnh mẽ và tiêu chuẩn chọn bạn đời rất cao. Người có Cô Quả không dễ rung động trước những lời tán tỉnh trăng hoa, họ cần một người tri kỷ thực sự thấu hiểu tâm hồn mình.</li>
      <li><strong>Giải pháp cưới muộn (Muộn duyên đắc lộc):</strong> Nếu kết hôn trước 26 tuổi khi cái tôi còn quá lớn, người có Cô Quả rất dễ thất vọng vì hôn nhân không như mơ ước. Nhưng từ tuổi 28 - 30 trở đi, khi tâm tính đã trầm tĩnh, chín chắn, cuộc hôn nhân của họ lại vô cùng bền chặt, sắt son.</li>
      <li><strong>Tuần Triệt đóng Cung Phu Thê:</strong> Triệt Không có tác dụng mạnh ở tiền vận (trước 30 tuổi), sau 30 tuổi năng lượng cản trở giảm dần đến 80%. Tuần Không bao bọc nhẹ nhàng nhưng dài lâu. Chỉ cần vợ chồng học cách nhường nhịn, cùng nhau chia sẻ việc nhà thì Tuần Triệt lại trở thành chiếc rào chắn ngăn cản người ngoài can thiệp vào gia đình.</li>
    </ul>

    <h2>3. 4 Tuyệt Chiêu Phong Thủy Thực Tiễn Hóa Giải Xung Khắc Vợ Chồng</h2>
    <ol>
      <li><strong>Nguyên tắc chọn năm sinh con "Cầu nối Ngũ Hành":</strong> Đây là bí quyết mạnh nhất trong thuật số cổ truyền. Ví dụ: Chồng mệnh Mộc, Vợ mệnh Thổ (Mộc khắc Thổ). Nếu sinh con mang mệnh Hỏa: Mộc sinh Hỏa, Hỏa sinh Thổ $\rightarrow$ Đứa con trở thành cầu nối năng lượng yêu thương, hóa giải hoàn toàn thế xung khắc của cha mẹ.</li>
      <li><strong>Điều chỉnh phong thủy phòng ngủ:</strong>
        <ul>
          <li>Tuyệt đối không để gương soi chiếu thẳng vào giường ngủ (gây ảo giác bất an và tạo cơ hội cho kẻ thứ ba).</li>
          <li>Đầu giường phải kê sát tường vững chãi, không kê dưới cửa sổ hoặc dưới dầm xà ngang.</li>
          <li>Sử dụng ánh sáng vàng ấm áp, bài trí một cặp quả cầu thạch anh hồng hoặc đôi uyên ương bằng gỗ đào ở góc Tây Nam phòng ngủ.</li>
        </ul>
      </li>
      <li><strong>Lễ tơ hồng / Làm lại tiệc cưới nhỏ giản dị:</strong> Cổ nhân có mẹo "bán duyên" hoặc "đón dâu hai lần" đối với các cặp đôi phạm cung Tuyệt Mệnh để tượng trưng cho việc đã hoàn thành một chu kỳ sóng gió, từ đó mở ra trang mới thuận buồm xuôi gió.</li>
      <li><strong>Đồng lòng tích đức hành thiện:</strong> Hai vợ chồng cùng nhau trích tiền làm việc thiện, phóng sinh, hiếu kính cha mẹ hai bên nội ngoại công bằng. Năng lượng phúc đức chính là chiếc khiên bảo vệ vững chắc nhất trước mọi sóng gió cuộc đời.</li>
    </ol>

    <h2>5. Lời Kết</h2>
    <p>Hôn nhân bền vững không phải là tìm được một người hợp tuổi 100% trên giấy tờ, mà là tìm được một người sẵn sàng cùng bạn lắng nghe, sửa đổi và hoàn thiện chính mình mỗi ngày. Hiểu rõ sự tương tác Bát Tự và Cung Phu Thê là để biết cách thương nhau cho đúng, cùng nhau chèo lái con thuyền gia đình cập bến bờ hạnh phúc.</p>
  `
};

// Đưa 2 bài viết mới lên đầu danh sách nếu chưa có
posts = posts.filter(p => p.slug !== post1.slug && p.slug !== post2.slug);
posts.unshift(post2);
posts.unshift(post1);

fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf8');
console.log('✅ Added 2 master SEO posts to data/posts.json! Total posts:', posts.length);

