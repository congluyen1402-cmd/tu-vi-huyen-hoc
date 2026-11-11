/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - HỆ THỐNG BIỆN GIẢI CHUYÊN SÂU 12 CUNG & VẬN HẠN
 * TỔNG HỢP TINH HOA TỪ 3 ĐẠI DANH TÁC:
 *   1. "Tử Vi Tổng Hợp" - Cụ Nguyễn Phát Lộc (Triết lý Cải Số, Tu Thân, Hóa Giải)
 *   2. "Tử Vi Đẩu Số Vận Mệnh Học" - Tiên sinh Lệnh Đông Lai (Biện chứng Tinh Đẩu & Tứ Hóa)
 *   3. "Tử Vi Thực Hành / Tử Vi Chính Biện" - Tủ Sách Tử Vi Lý Số (Cân bằng Ngũ Hành Sinh Khắc)
 * ============================================================================
 */

(function (global) {
  'use strict';

  // 1. KHO TRI THỨC VỀ 14 CHÍNH TINH (Đặc tính, khí chất, ảnh hưởng theo Cung)
  const CHINH_TINH_DICT = {
    'Tử Vi': {
      element: 'Thổ',
      title: 'Đế Tòa Tinh Quân · Vạn Tinh Chi Chủ',
      nature: 'Chủ về tôn quý, uy quyền, tài năng quản trị, lòng tự tôn cao, có tư chất thủ lĩnh và phong thái đường hoàng.',
      inPalaces: {
        'MỆNH': 'Mệnh có Tử Vi là bậc có chí khí kinh bang tế thế, tự trọng tự tôn, không cam chịu dưới quyền kẻ khác. Cần có Tả Hữu, Khôi Việt phò tá mới thành đại nghiệp; nếu độc tọa cô quân dễ thành độc đoán, cô độc trên đỉnh vinh quang.',
        'PHỤ MẪU': 'Cha mẹ có danh giá, có địa vị trong xã hội hoặc đức độ che chở con cái, gia phong nề nếp nghiêm cẩn.',
        'PHÚC ĐỨC': 'Dòng dõi quý hiển, tổ tiên tích đức dày sâu, bản thân được hưởng phúc ấm cao dày, tâm tính thanh cao.',
        'ĐIỀN TRẠCH': 'Cơ ngơi điền sản tráng lệ, nhà cửa bề thế ở nơi tôn nghiêm hoặc khu vực trung tâm thịnh vượng, tích lũy đất đai bền vững.',
        'QUAN LỘC': 'Nắm quyền bính, thích hợp làm lãnh đạo, quản lý cấp cao, công danh rực rỡ, được người dưới kính nể.',
        'NÔ BỘC': 'Giao thiệp với những nhân vật có quyền thế, chức trọng; song cần khiêm nhường để tránh bị lấn át.',
        'THIÊN DI': 'Ra ngoài được quý nhân trọng vọng, môi trường xã hội mở rộng, đắc thời đắc vị khi đi xa.',
        'TẬT ÁCH': 'Tử Vi thuộc Thổ, chủ tỳ vị, tiêu hóa; thường có bệnh về dạ dày hoặc khí huyết nhưng luôn có phúc thần che chở tai qua nạn khỏi.',
        'TÀI BẠCH': 'Nguồn tiền tài vững chắc như núi, kiếm tiền bằng danh vọng và uy tín, nguồn tài chính minh bạch.',
        'TỬ TỨC': 'Con cái thông minh, tuấn tú, sau này thành danh hiển đạt, có chí lớn nhưng tính cách kiêu hãnh.',
        'PHU THÊ': 'Người phối ngẫu có xuất thân danh giá, khí chất tôn quý, tài giỏi; vợ chồng cần tôn trọng lẫn nhau để tránh cái tôi va chạm.',
        'HUYNH ĐỆ': 'Anh em có người xuất chúng, có danh vọng, gia đình hòa mục nhưng mỗi người đều có chính kiến kiên định.'
      }
    },
    'Thiên Cơ': {
      element: 'Mộc',
      title: 'Thiện Tinh · Trí Tuệ Mưu Lược Tinh',
      nature: 'Chủ về trí tuệ mẫn tiệp, cơ mưu quyền biến, óc quan sát sắc sảo, năng khiếu kỹ thuật, học rộng hiểu nhiều.',
      inPalaces: {
        'MỆNH': 'Mệnh Thiên Cơ là người túc trí đa mưu, tư duy nhanh nhạy, giỏi xoay xở và thích ứng thời cuộc. Thích hợp nghiên cứu, chiến lược, công nghệ, huyền học.',
        'PHÚC ĐỨC': 'Tâm trí luôn hoạt động, có duyên với đạo giáo, triết học và huyền học. Dòng họ có nhiều người hiếu học, đỗ đạt tài hoa.',
        'PHU THÊ': 'Người phối ngẫu nhanh nhẹn, khéo léo, thông minh; tình cảm vợ chồng thiên về sự đồng điệu trí tuệ và tinh thần.',
        'QUAN LỘC': 'Thích hợp ngành nghề tham mưu, lập trình, cố vấn chiến lược, nghiên cứu khoa học hoặc tài chính linh hoạt.'
      }
    },
    'Thái Dương': {
      element: 'Hỏa',
      title: 'Nhật Tinh · Chí Tôn Hào Quang',
      nature: 'Chủ về danh vọng, quang minh chính đại, hào sảng bác ái, nhiệt huyết vô bờ; tính chất "phát xạ" hào quang, dốc sức phụng sự tha nhân.',
      inPalaces: {
        'MỆNH': 'Thái Dương Miếu Vượng tại Dần, Mão, Thìn, Tỵ, Ngọ là cách "Nhật lệ trung thiên" rực rỡ vô cùng. Con người khẳng khái, nghĩa hiệp, nói lời giữ lấy lời, khí phách ngút trời. Danh tiếng đi trước, tiền tài theo sau. Nhược điểm là tính nóng vội, cả nể, hay lo việc bao đồng.',
        'QUAN LỘC': 'Sự nghiệp thăng tiến vang dội, có uy danh ngoài xã hội, dễ làm việc công ích, truyền thông, quản lý nhà nước hoặc dẫn dắt cộng đồng.',
        'TÀI BẠCH': 'Chi tiêu phóng khoáng, kiếm tiền đàng hoàng minh bạch, thích dùng tiền làm đại sự hoặc giúp đỡ người khác.'
      }
    },
    'Vũ Khúc': {
      element: 'Kim',
      title: 'Tài Tinh Cô Độc · Thực Lực Cương Nghị',
      nature: 'Chủ về tài lộc, sự quyết đoán, tính cách cương nghị, dám nghĩ dám làm, thực tế, nhưng mang tính cô quả độc lập.',
      inPalaces: {
        'MỆNH': 'Người mang Vũ Khúc tính tình kiên định như sắt đá, đầu óc kinh tài xuất chúng, không ngại gian khổ. Nhược điểm là lạnh lùng, ít biểu lộ cảm xúc.',
        'TÀI BẠCH': 'Tài tinh cư Tài vị là đắc cách tuyệt đối! Nắm giữ tiền bạc chặt chẽ, giỏi đầu tư, tích lũy tài sản đồ sộ.',
        'HUYNH ĐỆ': 'Anh em tự lập, ít tâm sự thân thiết; nếu gặp Hóa Kỵ ắt nảy sinh phân tranh về tiền bạc hoặc anh em sống xa cách.'
      }
    },
    'Thiên Đồng': {
      element: 'Thủy',
      title: 'Phúc Tinh · Hoan Hỷ An Nhiên',
      nature: 'Chủ về phúc thọ, tâm tính hiền hòa, yêu chuộng hòa bình, có khiếu nghệ thuật, ham học hỏi nhưng dễ an phận, thiếu tính quyết liệt.',
      inPalaces: {
        'MỆNH': 'Mặt hoa da phấn, tính tình dễ gần, từ bi bác ái. Được quý nhân trợ lực, đời sống tinh thần phong phú.',
        'PHU THÊ': 'Người bạn đời nhân hậu, tính tình vui tươi như trẻ thơ; nếu gặp cát tinh thì gia đình ấm êm; nếu gặp Triệt Không thì tiền vận trắc trở duyên nợ, muộn màng mới bền.',
        'PHÚC ĐỨC': 'Được hưởng phúc trời ban, thân tâm an lạc, ít khi vướng bận ưu phiền thế tục.'
      }
    },
    'Liêm Trinh': {
      element: 'Hỏa',
      title: 'Tù Tinh · Đào Hoa Cương Liệt',
      nature: 'Chủ về kỷ luật, nguyên tắc thép, tự tôn tột bực, năng lực hành chính và tính cách quyết liệt; vừa là sao Thứ Đào Hoa vừa có sát khí tiềm ẩn.',
      inPalaces: {
        'MỆNH': 'Cá tính mạnh mẽ, có tài chính trị, ghét sự giả tạo, quyết đoán sắc bén nhưng hay nghi kỵ và nội tâm mâu thuẫn.',
        'TẬT ÁCH': 'Chủ về bệnh huyết áp, tim mạch, mắt hoặc các chứng viêm nhiễm huyết dịch; gặp sát tinh Kình Dương dễ đụng chạm dao kéo mổ xẻ.'
      }
    },
    'Thiên Phủ': {
      element: 'Thổ',
      title: 'Lệnh Tinh · Nam Đẩu Đệ Nhất Kho Tàng',
      nature: 'Chủ về kho tàng tài lộc, sự cẩn trọng, bao dung, quản lý ngân khố, phong thái điềm đạm, tài sản tích lũy vững như bàn thạch.',
      inPalaces: {
        'ĐIỀN TRẠCH': 'Kho lộc đóng đúng cung nhà đất: sản nghiệp điền sản mênh mông, nhà cửa bề thế, kho tàng đầy ắp bạc vàng.',
        'TÀI BẠCH': 'Bậc thầy quản lý tài chính, không bao giờ rơi vào cảnh túng thiếu, tiền bạc tích lũy theo cấp số nhân.'
      }
    },
    'Thái Âm': {
      element: 'Thủy',
      title: 'Nguyệt Tinh · Tài Phú Thanh Lương',
      nature: 'Chủ về tài phú, điền sản, mẹ và vợ, sự nhu hòa, trực giác sắc sảo, thẩm mỹ tinh tế, chiều sâu nội tâm.',
      inPalaces: {
        'QUAN LỘC': 'Thái Âm Miếu tại Dậu ví như trăng rằm mùa thu soi bóng sông ngân. Sự nghiệp chu toàn, mềm dẻo, thành công trong lĩnh vực tài chính, kế hoạch, văn hóa, thẩm mỹ.',
        'MỆNH': 'Người phong nhã, thanh tú, giàu lòng trắc ẩn, tính tình trầm tĩnh, nội tâm sâu sắc.'
      }
    },
    'Tham Lang': {
      element: 'Thủy - Mộc',
      title: 'Dục Vọng Chi Thần · Đào Hoa Tài Nghệ',
      nature: 'Chủ về tham vọng vươn lên, giao thiệp rộng lớn, tài nghệ phong phú, sự nhạy bén thương trường và ham muốn trải nghiệm cuộc sống.',
      inPalaces: {
        'NÔ BỘC': 'Bằng hữu rộng khắp bốn phương, quen biết đủ mọi tầng lớp xã hội; cần đề phòng bạn bè lôi kéo vào chốn ăn chơi hoặc lợi dụng tiền bạc.',
        'MỆNH': 'Đa tài đa nghệ, giỏi thích nghi, có sức hút mãnh liệt với người khác phái, khát vọng làm giàu mãnh liệt.'
      }
    },
    'Cự Môn': {
      element: 'Thủy',
      title: 'Ám Tinh · Hóa Khí Khẩu Thiệt Chi Tinh',
      nature: 'Chủ về ngôn ngữ, biện luận, phản biện, nghiên cứu sâu sắc; đắc địa là "Thạch trung ẩn ngọc", hãm địa dễ sinh khẩu thiệt thị phi.',
      inPalaces: {
        'THIÊN DI': 'Ra ngoài ăn nói lưu loát, tài ngoại giao xuất sắc; đắc địa hội Lộc Tồn ắt kiếm tiền nơi đất khách quê người cực thịnh, song cần tránh buôn chuyện thị phi.',
        'QUAN LỘC': 'Thích hợp các ngành nghề dùng lời nói và trí óc: luật sư, ngoại giao, giảng dạy, tư vấn, phân tích dữ liệu.'
      }
    },
    'Thiên Tướng': {
      element: 'Thủy',
      title: 'Ấn Tinh · Trượng Phu Dũng Cảm',
      nature: 'Chủ về lòng nhân ái, sự trung thành, công lý, bảo bọc che chở, phong thái đàng hoàng, cứu khổ cứu nạn.',
      inPalaces: {
        'TẬT ÁCH': 'Thiên Tướng là phúc thiện tinh đóng Tật Ách có năng lực cứu giải kỳ diệu, biến hung thành cát, gặp nạn có thầy thuốc giỏi cứu chữa.',
        'MỆNH': 'Mẫu người quân tử, trọng danh dự và uy tín, luôn sẵn lòng đứng ra bảo bọc giúp đỡ kẻ yếu thế.'
      }
    },
    'Thiên Lương': {
      element: 'Mộc',
      title: 'Ấm Tinh · Thanh Cao Thọ Tinh',
      nature: 'Chủ về đạo đức, phúc thọ, che chở, thanh cao liêm chính, có duyên với y dược, giáo dục, tâm linh và quản lý giám sát.',
      inPalaces: {
        'TÀI BẠCH': 'Cách "Thanh quan thụ tài" — kiếm tiền bằng tri thức chuyên môn và uy tín đạo đức; hậu vận tiền tài cực kỳ vững bền, hưởng lộc trường cửu.',
        'MỆNH': 'Tướng mạo đoan chính, tính tình đôn hậu, lời nói có trọng lượng, thích giúp đời, có căn duyên tu tập.'
      }
    },
    'Thất Sát': {
      element: 'Kim - Hỏa',
      title: 'Tướng Tinh Quyền Uy · Sát Phạt Chi Thần',
      nature: 'Chủ về uy dũng, dũng cảm vô song, tính cách độc lập kiên cường, hành động mau lẹ, khí phách ngang tàng nhưng cô độc.',
      inPalaces: {
        'TỬ TỨC': 'Con cái tính cách rất mạnh mẽ, tự lập từ sớm, có chí lớn nhưng khó dạy bảo bằng sự áp đặt. Cần kiên nhẫn bồi dưỡng.',
        'MỆNH': 'Bậc anh hùng thời loạn, quyết liệt dấn thân, không ngại gian nguy, tự tay mở lối gầy dựng cơ đồ.'
      }
    },
    'Phá Quân': {
      element: 'Thủy',
      title: 'Hao Tinh Dũng Mãnh · Tiên Phong Cách Tân',
      nature: 'Chủ về sự phá vỡ cái cũ để lập cái mới, tính cách quyết liệt, bôn ba, dám nghĩ dám làm, không chịu trói buộc trong khuôn mẫu.',
      inPalaces: {
        'PHỤ MẪU': 'Cha mẹ tự lập, bôn ba gầy dựng cơ đồ từ gian khó; tính cách nghiêm khắc, đương số và cha mẹ sớm có khoảng cách để tự lập.',
        'MỆNH': 'Cuộc đời nhiều thăng trầm biến động, nhưng mỗi lần sụp đổ lại là một bước nhảy vọt tái sinh mạnh mẽ hơn.'
      }
    }
  };

  // 2. KHO TRI THỨC VỀ TỨ HÓA (Lộc - Quyền - Khoa - Kỵ)
  const TU_HOA_DICT = {
    'Hóa Lộc': {
      nature: 'Hóa khí của Mùa Xuân, vạn vật sinh sôi. Chủ về tiền tài, duyên lành, cơ hội hanh thông, sự màu mỡ, mềm mại và trù phú.',
      eval: function (starName, cungName) {
        return `🌟 <strong>HÓA LỘC tọa thủ cùng ${starName} tại cung ${cungName}:</strong> Kích hoạt tối đa nguồn năng lượng tài lộc và cơ duyên may mắn. Tiền bạc chảy về tự nhiên từ các mối quan hệ và năng lực chuyên môn vượt trội.`;
      }
    },
    'Hóa Quyền': {
      nature: 'Hóa khí của Mùa Hạ, lửa cháy rực rỡ. Chủ về quyền bính, ý chí kiên cường, sự khống chế, củng cố vị thế và năng lực chỉ huy.',
      eval: function (starName, cungName) {
        return `⚡ <strong>HÓA QUYỀN hội tụ cùng ${starName} tại cung ${cungName}:</strong> Trao cho đương số uy quyền, tiếng nói quyết định và khả năng xoay chuyển đại cuộc. Nắm giữ vai trò chủ chốt, không chịu khuất phục trước trở lực.`;
      }
    },
    'Hóa Khoa': {
      nature: 'Hóa khí của Mùa Thu, gió mát trăng thanh. Đệ nhất Văn tinh và là Thần Hộ Mệnh tối cao trong Đẩu Số, chủ về danh tiếng, trí tuệ, thi cử đỗ đạt và giải cứu tai ương.',
      eval: function (starName, cungName) {
        return `📜 <strong>HÓA KHOA giáng lâm cùng ${starName} tại cung ${cungName}:</strong> Chiếu rọi ánh hào quang của học vấn và danh giá. Quan trọng hơn, Hóa Khoa là ngọn đuốc xua tan bóng tối sát tinh, gặp nguy biến hóa an lành.`;
      }
    },
    'Hóa Kỵ': {
      nature: 'Hóa khí của Mùa Đông, tàng ẩn lạnh giá. Chủ về trở ngại, thị phi, đố kỵ, sự trăn trở nội tâm, nghiệp lực thử thách ý chí con người.',
      eval: function (starName, cungName) {
        return `⚠️ <strong>HÓA KỴ giáng xuống cùng ${starName} tại cung ${cungName}:</strong> Điểm nghẽn nghiệp lực cần tu tập! Cảnh báo nguy cơ hiểu lầm, tranh chấp lợi ích hoặc thị phi đàm tiếu. Đây chính là thao trường thử thách để rèn giũa bản lĩnh và đức tính nhẫn nại.`;
      }
    }
  };

  // 3. KHO PHÂN TÍCH CHI TIẾT TỪNG PHỤ TINH, SÁT TINH & THẦN SÁT
  const PHU_TINH_ANALYST = {
    // CÁT TINH
    'Tả Phù': 'Có bề tôi trung thành, bạn bè đồng nghiệp hết lòng phò tá, tăng thêm sức mạnh tổ chức.',
    'Hữu Bật': 'Có quý nhân âm thầm giúp đỡ, kết nối các mối quan hệ xã hội thuận buồm xuôi gió.',
    'Thiên Khôi': 'Tọa Quý hướng Quý, gặp được bậc tiền bối, cấp trên có thẩm quyền nâng đỡ tận tình.',
    'Thiên Việt': 'Khôi Việt xuất chúng, dễ nổi danh trong tập thể, luôn có lối thoát hiểm kỳ diệu khi khó khăn.',
    'Văn Xương': 'Tài hoa văn chương, chữ nghĩa thanh thoát, bằng cấp sáng lạn, tư duy nhạy bén.',
    'Văn Khúc': 'Tài nghệ cầm kỳ thi họa, khiếu thẩm mỹ tinh tế, giỏi giao tiếp và nắm bắt tâm lý người khác.',
    'Lộc Tồn': 'Thiên lộc trời ban, của cải tích lũy vững vàng, có của ăn của để; song đi liền Kình Đà kẹp hai bên.',
    'Thiên Mã': 'Nghị lực vươn lên mạnh mẽ, năng động, thích bôn ba xuất ngoại, phát tài trên đường thiên lý.',
    'Đào Hoa': 'Duyên ngầm quyến rũ, nhiều người theo đuổi, tâm hồn trẻ trung, thành công nhờ nhân duyên.',
    'Hồng Loan': 'Duyên phận tốt đẹp, cuộc đời có nhiều niềm vui tao nhã, vợ chồng tương kính như tân.',
    'Thiên Hỷ': 'Niềm vui rạng rỡ, hỷ tín liên miên, tính tình vui tươi xua tan u ám.',
    'Ân Quang': 'Được thần linh và tổ tiên che chở, tính tình nhân hậu, luôn biết ơn và đền đáp.',
    'Thiên Quý': 'Lòng dạ thánh thiện, có quý nhân vô hình phù hộ những lúc ngặt nghèo nhất.',
    'Tam Thai': 'Phong thái ung dung đĩnh đạc, danh tiếng lan tỏa nhẹ nhàng, cuộc sống an nhiên.',
    'Bát Tọa': 'Nền tảng vững chắc, có người hầu kẻ hạ, vị trí xã hội ổn định.',
    'Long Trì': 'Nhan sắc thanh tú, nhà cửa phong thủy đắc địa, tai thính mũi nhạy.',
    'Phượng Các': 'Văn phong cao nhã, tiếng thơm bay xa, thông minh lễ độ.',
    'Hoa Cái': 'Khí chất kiêu sa, có khiếu nghệ thuật tâm linh, phong cách quý phái.',
    'Quốc Ấn': 'Nắm giữ con dấu, quyền ký duyệt, văn bằng chứng nhận uy tín trong chức vụ.',
    'Thiên Phúc': 'Phúc đức tổ phụ, tính tình hiền lành, tai ương tiêu trừ.',
    'Thiên Quan': 'Tấm lòng bồ tát, hay làm việc phúc thiện, giảm trừ tà khí sát tinh.',

    // HUNG SÁT BẠI TINH
    'Kình Dương': 'Thanh kiếm sắc nhọn: tính tình cương liệt, táo bạo nhưng dễ gây hình thương đao kiếm, phẫu thuật, va chạm xung đột.',
    'Đà La': 'Mũi khoan ngầm: sự trắc trở dây dưa, âm mưu đố kỵ ngầm, bệnh mãn tính khó dứt điểm.',
    'Địa Không': 'Lỗ đen vũ trụ: bạo phát bạo tàn, ảo mộng vô thường, phá tan tiền tài nếu tham lam; song khai mở tư duy dị biệt vượt thời đại.',
    'Địa Kiếp': 'Cơn sóng thần: biến động khôn lường, tai ách bất ngờ, thị trường sụp đổ hoặc tiểu nhân đâm lén sau lưng.',
    'Hỏa Tinh': 'Ngọn lửa cuồng nộ: nóng nảy bốc đồng, biến cố phát sinh chớp nhoáng, hỏa hoạn bỏng rát.',
    'Linh Tinh': 'Tiếng sét trong đêm: ưu sầu lo lắng ngầm, thù dai, thần kinh căng thẳng hoặc bệnh tật về gân cốt.',
    'Thiên Hình': 'Thanh đao công lý: nghiêm khắc kỷ luật, cẩn trọng pháp luật kiện tụng hoặc vết tích thương tật trên người.',
    'Bạch Hổ': 'Hổ trắng uy phong: nghị lực phi thường gánh vác trách nhiệm; song chủ về máu huyết, tai nạn, ưu tư.',
    'Tang Môn': 'Nỗi sầu muộn: trong lòng hay lo nghĩ xa xôi, tang tóc ưu phiền trong dòng họ.',
    'Cô Thần': 'Sự cô độc, khó trải lòng với người khác, thích một mình suy ngẫm.',
    'Quả Tú': 'Khép kín tâm tư, duyên phận muộn màng, tự tay xây đắp giang sơn.',
    'Đại Hao': 'Đại lộ tiêu tài: tiền của luân chuyển rất lớn, đầu tư mạo hiểm hoặc chi tiêu hào phóng không tiếc tay.',
    'Tiểu Hao': 'Hao tán nhỏ giọt: hay mất mát vặt, mua sắm lặt vặt tốn kém.',
    'Thiên Khốc': 'Tiếng khóc oan khiên: nội tâm nhiều trăn trở cay đắng thuở thiếu thời.',
    'Thiên Hư': 'Hư danh hao tổn: sức khỏe yếu về phổi, khí hư, hay lo âu hão huyền.',
    'Kiếp Sát': 'Sát khí phục kích: đề phòng thương tích tay chân, mất cắp hoặc tiểu nhân mưu toan.',
    'Phục Binh': 'Kẻ mai phục sau lưng: cẩn trọng khẩu thiệt đâm thọc, lừa gạt hợp đồng.',
    'Điếu Khách': 'Thích ngao du nói chuyện, cẩn trọng cờ bạc cá cược hoặc chi tiêu quá đà.'
  };

  // 4. KHO PHÂN TÍCH VÒNG TRÀNG SINH & THÁI TUẾ
  const VONG_TRANG_SINH_EVAL = {
    'Trường sinh': 'Sinh khí dồi dào, khởi đầu thuận lợi, sức sống mãnh liệt như mầm cây đón mưa xuân.',
    'Mộc dục': 'Thời kỳ tắm gội, biến đổi nhân cách, nhiều rung động đào hoa, cần giữ mình thanh tịnh.',
    'Quan đới': 'Đội mũ thắt lưng, bước vào giai đoạn rèn luyện học hỏi quy củ nghiêm cẩn.',
    'Lâm quan': 'Bước lên đỉnh đài, trưởng thành vững chãi, tự tay gầy dựng sự nghiệp vẻ vang.',
    'Đế vượng': 'Đỉnh cao cực thịnh của năng lượng! Uy quyền danh vọng tột bực, cần chuẩn bị phương án giữ mình.',
    'Suy': 'Năng lượng chuyển sang thoái trào, nên điềm tĩnh thủ thế, tránh bành trướng liều lĩnh.',
    'Bệnh': 'Khí lực suy giảm, cần bồi bổ thân tâm, tránh lao lực quá độ.',
    'Tử': 'Trạng thái lắng đọng, vạn sự quy về tĩnh lặng để chuẩn bị cho chu kỳ mới.',
    'Mộ': 'Kho tàng tích lũy, chôn giấu của cải, tính cách kín đáo, hậu thuẫn vững chắc.',
    'Tuyệt': 'Tận cùng của bế tắc nhưng chính là mầm mống của biến hóa dị kỳ, "cùng tắc biến, biến tắc thông".',
    'Thai': 'Ấp ủ mầm mống mới, tràn đầy hy vọng và những ý tưởng sáng tạo độc đáo.',
    'Dưỡng': 'Nuôi dưỡng bồi đắp, tích lũy công đức và nội lực từng ngày một cách kiên nhẫn.'
  };

  const VONG_THAI_TUE_EVAL = {
    'Thái tuế': 'Đứng ở thế chính danh quân tử! Tự tin, đàng hoàng, có tiếng nói dẫn dắt, luôn bảo vệ lẽ phải.',
    'Thiếu dương': 'Thông minh lanh lợi, nhìn xa trông rộng, nhưng đi liền Thiên Không nên cần tránh tự cao.',
    'Tang môn': 'Gánh vác trách nhiệm nặng nề của gia đình, trong lòng hay chất chứa nỗi âu lo thế sự.',
    'Thiếu âm': 'Nhu hòa nhẫn nhịn, chịu thiệt thòi về mình để giữ hòa khí, hậu vận có phúc báo.',
    'Quan phù': 'Cẩn trọng thủ tục giấy tờ, pháp lý minh bạch, không lách luật để tránh kiện tụng.',
    'Tử phù': 'Đề phòng rủi ro bất ngờ ập đến, cần có phương án dự phòng bảo vệ thành quả.',
    'Tuế phá': 'Tâm thế bất mãn, luôn muốn phá vỡ trật tự cũ để đổi mới, tính cách ngang tàng cách mạng.',
    'Long đức': 'Đức hạnh sáng ngời, hóa giải mọi hung hiểm, lấy thiện tâm đãi người thì vạn sự an lành.',
    'Bạch hổ': 'Khí phách dũng mãnh kiên cường, dám chịu đựng gian khổ để hoàn thành sứ mệnh.',
    'Phúc đức': 'Được thần linh và gia tiên che chở, tâm tính thiện lương xua tan mọi tà khí.',
    'Điếu khách': 'Tài hùng biện lưu loát, quan hệ xã giao rộng rãi nhưng cần tránh sa đà hưởng lạc.',
    'Trực phù': 'Chân thật chất phác, sẵn sàng nhận phần việc khó nhọc mà không một lời oán thán.'
  };

  // 4.5. BẢNG BIỆN GIẢI CHUYÊN BIỆT TỪNG CHÍNH TINH TRÊN TỪNG CUNG VỊ
  function getPalaceStarMeaning(starName, palaceName, dacHam) {
    if (CHINH_TINH_DICT[starName] && CHINH_TINH_DICT[starName].inPalaces && CHINH_TINH_DICT[starName].inPalaces[palaceName]) {
      return CHINH_TINH_DICT[starName].inPalaces[palaceName];
    }
    const info = CHINH_TINH_DICT[starName] || {};
    const nature = info.nature || '';
    const element = info.element || '';
    const brightness = (dacHam === 'M' || dacHam === 'V' || dacHam === 'Đ') ? 'sáng sủa đắc cách' : 'hãm địa mờ tối';

    const palaceThemes = {
      'MỆNH': `Định hình tư chất ${nature.toLowerCase()} Đương số có khí chất ${element} rõ rệt, ý chí vươn lên mãnh liệt. Khi ở thế ${brightness}, càng dễ bộc lộ tài năng xuất chúng và gầy dựng cơ đồ vang danh bốn bể.`,
      'PHỤ MẪU': `Chủ về cha mẹ có khí chất cương cường hoặc uy phong; duyên phận giữa cha mẹ và con cái có sự độc lập, tự chủ. Đương số cần lấy chữ Hiếu hòa ái làm đầu để hóa giải những bất đồng khoảng cách thế hệ.`,
      'PHÚC ĐỨC': `Tác động sâu sắc đến tư tưởng và phúc trạch dòng họ. Tâm tính hướng thiện, thích chiêm nghiệm triết lý sống sâu sắc; dòng họ có nhiều người tài hoa, có danh thơm để lại cho con cháu muôn đời.`,
      'ĐIỀN TRẠCH': `Ảnh hưởng đến phong thủy nhà cửa và điền sản. Nơi cư ngụ mang năng lượng ${element}, thích hợp không gian rộng thoáng, có tích lũy tài sản nhà đất vững chắc khi về trung hậu vận.`,
      'QUAN LỘC': `Định hướng con đường sự nghiệp và phương thức hành sự. Thích hợp các lĩnh vực phát huy tính chất ${nature.toLowerCase()} Công danh có bước đột phá mạnh mẽ khi gặp đúng thời vận.`,
      'NÔ BỘC': `Chi phối mối quan hệ bằng hữu, cấp dưới và đối tác. Giao thiệp rộng rãi, kết giao nhiều tầng lớp; cần sự phân minh minh bạch để duy trì tình cảm bạn bè bền vững.`,
      'THIÊN DI': `Phản ánh môi trường đối ngoại khi ra ngoài xã hội. Đi xa lập nghiệp hoặc xuất ngoại có nhiều cơ hội mở mang tầm mắt, được quý nhân nâng đỡ khi hành sự đường hoàng minh bạch.`,
      'TẬT ÁCH': `Chủ về tạng phủ và sức khỏe. Cần lưu tâm các bệnh thuộc hành ${element}, chú trọng dưỡng sinh, giữ tâm an định, thường xuyên hiến máu nhân đạo để giải trừ tai ương tật ách.`,
      'TÀI BẠCH': `Thể hiện cung cách kiếm tiền và dòng chảy tài chính. Tiền tài tích tụ nhờ năng lực thực tế, kiếm tiền bằng chính đạo và tri thức chuyên môn sâu sắc, hậu vận điền sản vững bền.`,
      'TỬ TỨC': `Phản ánh tính cách và đường con cái. Con cái thông minh, cá tính độc lập, có chí hướng tự lập từ sớm; cha mẹ nên đồng hành chia sẻ hơn là áp đặt roi vọt phong kiến.`,
      'PHU THÊ': `Phản ánh duyên nợ lứa đôi và gia đạo. Người bạn đời có cá tính và năng lực; vợ chồng lấy sự tương kính, nhường nhịn làm gốc để giữ gìn mái ấm trăm năm vẹn tròn.`,
      'HUYNH ĐỆ': `Tình cảm anh em ruột thịt trong gia đình. Mỗi người một chí hướng lập nghiệp, nên độc lập kinh tế, hỗ trợ nhau bằng nghĩa tình chân thành, tránh tranh chấp tiền nong.`
    };

    return palaceThemes[palaceName] || nature;
  }

  // 4.6. BẢN ĐỒ NHỊ HỢP CỔ TRUYỀN
  const NHI_HOP_MAP = {
    0: 1, 1: 0,     // Tý - Sửu
    2: 11, 11: 2,   // Dần - Hợi
    3: 10, 10: 3,   // Mão - Tuất
    4: 9, 9: 4,     // Thìn - Dậu
    5: 8, 8: 5,     // Tỵ - Thân
    6: 7, 7: 6      // Ngọ - Mùi
  };

  // 4.7. BỘ MÁY PHÁT HIỆN ĐẠI CÁCH CỤC TAM PHƯƠNG TỨ CHÍNH (LỆNH ĐÔNG LAI & NGUYỄN PHÁT LỘC)
  function detectTamPhuongPatterns(cungIdx, laSo) {
    if (!laSo || !laSo.cung) return null;

    const banCung = laSo.cung[cungIdx];
    const doiCung = laSo.cung[(cungIdx + 6) % 12];
    const tamHop1 = laSo.cung[(cungIdx + 4) % 12];
    const tamHop2 = laSo.cung[(cungIdx + 8) % 12];
    const nhiHopIdx = NHI_HOP_MAP[cungIdx];
    const nhiHop = laSo.cung[nhiHopIdx];

    const fourPalaces = [
      { p: banCung, role: 'Tọa thủ bản cung', chi: banCung.chi, name: banCung.cungName },
      { p: doiCung, role: 'Xung chiếu (Đối cung)', chi: doiCung.chi, name: doiCung.cungName },
      { p: tamHop1, role: 'Tam hợp hợp chiếu 1', chi: tamHop1.chi, name: tamHop1.cungName },
      { p: tamHop2, role: 'Tam hợp hợp chiếu 2', chi: tamHop2.chi, name: tamHop2.cungName }
    ];

    const allMainStars = [];
    const allTuHoa = [];
    const allCatTinh = [];
    const allSatTinh = [];

    fourPalaces.forEach(item => {
      (item.p.chinhTinh || []).forEach(ct => allMainStars.push({ name: ct.name, dacHam: ct.dacHam, element: ct.element, role: item.role, chi: item.chi }));
      (item.p.tuHoa || []).forEach(th => allTuHoa.push({ hoa: th.hoa, star: th.star, role: item.role, chi: item.chi }));
      (item.p.phuTinhLeft || []).forEach(pt => allCatTinh.push({ name: pt.name, role: item.role, chi: item.chi }));
      (item.p.phuTinhRight || []).forEach(st => allSatTinh.push({ name: st.name, role: item.role, chi: item.chi }));
    });

    const starNames = allMainStars.map(s => s.name);
    const patterns = [];

    // 1. Check Song Lộc Triều Viên
    const hasLocTon = allCatTinh.some(s => s.name === 'Lộc tồn');
    const hasHoaLoc = allTuHoa.some(s => s.hoa === 'Hóa Lộc');
    if (hasLocTon && hasHoaLoc) {
      patterns.push({
        name: 'Song Lộc Triều Viên (Lộc Tồn kiêm Hóa Lộc hội tụ)',
        type: 'Đại Cát Cách · Phú Quý Bất Tận',
        desc: 'Cung vị được cả Thiên Lộc (Lộc Tồn trời ban) và Hóa Lộc (nhân duyên sinh tài) đồng thời triều củng. Chủ về tài khí hưng vượng hanh thông, nguồn thu dồi dào từ nhiều phương diện, danh lợi song thu bền vững.'
      });
    } else if (hasHoaLoc) {
      patterns.push({
        name: 'Hóa Lộc Triều Củng',
        type: 'Cát Cách',
        desc: 'Hóa Lộc chủ mùa xuân sinh sôi, mang đến cơ hội tài chính bất ngờ và nhân duyên hòa hảo.'
      });
    } else if (hasLocTon) {
      patterns.push({
        name: 'Lộc Tồn Tọa Củng',
        type: 'Cát Cách',
        desc: 'Được hưởng lộc thiên khố, tích lũy tiền của kiên cố qua năm tháng.'
      });
    }

    // 2. Check Nhật Nguyệt Tịnh Minh
    const hasNhat = starNames.includes('Thái Dương');
    const hasNguyet = starNames.includes('Thái Âm');
    if (hasNhat && hasNguyet) {
      patterns.push({
        name: 'Nhật Nguyệt Tịnh Minh / Nhật Nguyệt Giao Huy',
        type: 'Chí Tôn Văn Tinh Cát Cách',
        desc: 'Vầng nhật (Thái Dương) và ánh nguyệt (Thái Âm) cùng tỏa rạng hội chiếu. Chủ về tư chất thông tuệ xuất chúng, tầm nhìn vĩ mô, danh tiếng lẫy lừng, tấm lòng quang minh chính đại.'
      });
    }

    // 3. Check Tử Phủ Vũ Tướng
    const hasTuVi = starNames.includes('Tử Vi');
    const hasThienPhu = starNames.includes('Thiên Phủ');
    const hasVuKhuc = starNames.includes('Vũ Khúc');
    const hasThienTuong = starNames.includes('Thiên Tướng');
    if (hasTuVi && hasThienPhu) {
      patterns.push({
        name: 'Tử Phủ Đồng Cung / Triều Viên',
        type: 'Đế Vương Cát Cách',
        desc: 'Đế Tinh và Thiên Kho hội tụ ngàn năm có một! Chủ về tài sản điền sản tích lũy đồ sộ, địa vị xã hội uy nghiêm như thái sơn.'
      });
    } else if ((hasTuVi || hasThienPhu) && (hasVuKhuc || hasThienTuong)) {
      patterns.push({
        name: 'Phủ Tướng Triều Viên / Quân Thần Khánh Hội',
        type: 'Đại Cát Cách',
        desc: 'Tư chất lãnh đạo uyên bác, có năng lực quản lý tổ chức lớn, phúc thọ song toàn.'
      });
    }

    // 4. Check Cơ Nguyệt Đồng Lương
    const hasCo = starNames.includes('Thiên Cơ');
    const hasDong = starNames.includes('Thiên Đồng');
    const hasLuong = starNames.includes('Thiên Lương');
    if (hasLuong && hasNguyet && hasNhat) {
      patterns.push({
        name: 'Nhật Nguyệt Tịnh Minh hội tụ Ấm Tinh Thiên Lương',
        type: 'Thanh Quý Đạo Đức Cách',
        desc: 'Hội tụ cả danh vọng, trí tuệ thanh nhã và đạo đức trung hậu. Sự nghiệp thăng tiến dựa trên tài năng thực chất và uy tín vững bền.'
      });
    }

    // 5. Check Sát Phá Tham
    const hasSat = starNames.includes('Thất Sát');
    const hasPha = starNames.includes('Phá Quân');
    const hasTham = starNames.includes('Tham Lang');
    if (hasSat && hasPha && hasTham) {
      patterns.push({
        name: 'Sát Phá Tham Toàn Cục Hội Chiếu',
        type: 'Cương Liệt Khai Phá Cách',
        desc: 'Tính cách dũng mãnh, quyết liệt, dám nghĩ dám làm, sẵn sàng bứt phá nghịch cảnh để tạo dựng cơ đồ mới.'
      });
    }

    // 6. Check Cự Nhật
    const hasCu = starNames.includes('Cự Môn');
    if (hasCu && hasNhat) {
      patterns.push({
        name: 'Cự Nhật Tương Ánh (Thạch Trung Ẩn Ngọc)',
        type: 'Quý Cách Ngoại Giao',
        desc: 'Hào quang Thái Dương xua tan ám khí Cự Môn. Rất giỏi ngoại giao, ngôn ngữ, biện luận, danh tiếng vang xa bốn bể.'
      });
    }

    // 7. Check Không Kiếp
    const hasKhong = allSatTinh.some(s => s.name === 'Địa Không');
    const hasKiep = allSatTinh.some(s => s.name === 'Địa Kiếp');
    if (hasKhong && hasKiep) {
      patterns.push({
        name: 'Không Kiếp Hội Chiếu (Sát Tinh Đệ Nhất)',
        type: 'Nghiệp Lực Sát Tinh Cần Hóa Giải',
        desc: 'Địa Không và Địa Kiếp cùng dội lửa vào tam phương tứ chính. Cảnh báo cuộc đời có biến động bất ngờ, bạo phát bạo tàn nếu tham lam; cần lấy sự thanh liêm và đức độ làm lá chắn.'
      });
    }

    return {
      patterns: patterns,
      banCung: banCung,
      doiCung: doiCung,
      tamHop1: tamHop1,
      tamHop2: tamHop2,
      nhiHop: nhiHop,
      allMainStars: allMainStars,
      allTuHoa: allTuHoa,
      allCatTinh: allCatTinh,
      allSatTinh: allSatTinh
    };
  }

  // 5. CÔNG THỨC ĐỘNG TẠO BÀI BIỆN GIẢI CHUYÊN SÂU TỪNG CUNG
  function generatePalaceDeepAnalysis(cung, laSo) {
    const chi = cung.chi;
    const can = cung.can;
    const cungName = cung.cungName.replace('<THÂN>', '');
    const isThan = cung.cungName.includes('<THÂN>');
    const banMenh = laSo.napAm || 'Dương Liễu Mộc';
    const cuc = laSo.cucInfo ? laSo.cucInfo.name : 'Hỏa lục cục';

    // 1. Phân tích Khí Tượng & Cách Cục
    let tieuDe = '';
    let cachCucHtml = '';

    const tpData = detectTamPhuongPatterns(cung.chiIndex, laSo);
    let tamPhuongHtml = '';
    if (tpData) {
      let patternsHtml = '';
      if (tpData.patterns && tpData.patterns.length > 0) {
        patternsHtml = `
          <div class="tam-phuong-patterns" style="margin: 0.8rem 0; padding: 0.85rem 1rem; background: #FFFFFF; border: 1px solid var(--line); border-radius: 8px;">
            <strong style="color: var(--ink); font-size: 0.92rem;"><i data-lucide="sparkles" style="width:14px;height:14px;display:inline-block;vertical-align:-2px;"></i> Đại Cách Cục Hội Tụ (Tam Phương Tứ Chính):</strong>
            <ul style="padding-left: 1.2rem; margin-top: 0.4rem; color: var(--text); font-size: 0.88rem; line-height: 1.65;">
              ${tpData.patterns.map(pt => `<li><span style="color: #D4AF37; font-weight: 600;">[${pt.type}] ${pt.name}:</span> ${pt.desc}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      tamPhuongHtml = `
        <div class="tam-phuong-tu-chinh-matrix" style="background: #FFFFFF; padding: 0.85rem 1rem; border-radius: 8px; margin: 0.8rem 0; border: 1px solid var(--line);">
          <strong style="color: var(--ink); font-size: 0.92rem;"><i data-lucide="compass" style="width:14px;height:14px;display:inline-block;vertical-align:-2px;"></i> Tương Tác Tam Phương Tứ Chính (Theo Tiên Sinh Lệnh Đông Lai):</strong>
          <div style="font-size: 0.86rem; color: var(--text); line-height: 1.65; margin-top: 0.4rem;">
            • <strong>Bản cung (${tpData.banCung.chi}):</strong> ${tpData.banCung.chinhTinh.map(s => s.name + '(' + s.dacHam + ')').join(', ') || 'Vô Chính Diệu'} <em>(Tọa thủ)</em><br>
            • <strong>Đối cung xung chiếu (${tpData.doiCung.chi} - ${tpData.doiCung.cungName}):</strong> ${tpData.doiCung.chinhTinh.map(s => s.name + '(' + s.dacHam + ')').join(', ') || 'Vô Chính Diệu'}<br>
            • <strong>Tam hợp hợp chiếu 1 (${tpData.tamHop1.chi} - ${tpData.tamHop1.cungName}):</strong> ${tpData.tamHop1.chinhTinh.map(s => s.name + '(' + s.dacHam + ')').join(', ') || 'Vô Chính Diệu'}<br>
            • <strong>Tam hợp hợp chiếu 2 (${tpData.tamHop2.chi} - ${tpData.tamHop2.cungName}):</strong> ${tpData.tamHop2.chinhTinh.map(s => s.name + '(' + s.dacHam + ')').join(', ') || 'Vô Chính Diệu'}<br>
            • <strong>Nhị hợp tương trợ (${tpData.nhiHop ? tpData.nhiHop.chi + ' - ' + tpData.nhiHop.cungName : ''}):</strong> ${tpData.nhiHop ? (tpData.nhiHop.chinhTinh.map(s => s.name + '(' + s.dacHam + ')').join(', ') || 'Vô Chính Diệu') : 'None'}
          </div>
          ${patternsHtml}
        </div>
      `;
    }

    if (cung.chinhTinh.length === 0) {
      tieuDe = `Vô Chính Diệu · Càn Khôn Đảo Chuyển, Tận Mượn Ngoại Lực`;
      cachCucHtml = `Cung ${cungName} tọa tại ${chi} thuộc thế <strong>VÔ CHÍNH DIỆU</strong>. Trong kinh văn Đẩu Số, cung Vô Chính Diệu như căn nhà không có chủ tọa trấn, tính chất mềm dẻo, dễ bị tác động bởi môi trường xung quanh nhưng lại có năng lực hấp thu trọn vẹn tinh hoa từ các cung Tam phương Tứ chính chiếu về. Đương số cần lấy chính tinh cung xung chiếu làm trọng tâm định hướng.`;
    } else {
      const names = cung.chinhTinh.map(c => `${c.name} (${c.dacHam})`).join(' phối chiếu cùng ');
      tieuDe = `${cung.chinhTinh[0].name} Tọa Cung ${chi} · ${cung.chinhTinh[0].dacHam === 'M' ? 'Miếu Vượng Huy Hoàng' : (cung.chinhTinh[0].dacHam === 'V' ? 'Vượng Khí Đắc Thời' : 'Đắc Địa Phát Tiết')}`;
      cachCucHtml = `Cung ${cungName} tại vị trí phương vị <strong>${chi} (${can})</strong> được ngự trị bởi <strong>${names}</strong>. Đây là hạt nhân chỉ huy toàn bộ trường khí của cung vị này, quyết định căn cơ phúc họa và chiều hướng vận mệnh của đương số.`;
    }

    // 2. Phân tích Từng Chính Tinh
    let chinhTinhDetailHtml = '';
    if (cung.chinhTinh.length > 0) {
      cung.chinhTinh.forEach(ct => {
        const info = CHINH_TINH_DICT[ct.name] || {};
        const palaceSpecific = getPalaceStarMeaning(ct.name, cungName, ct.dacHam);
        chinhTinhDetailHtml += `
          <div class="star-analysis-item">
            <h5 style="color: var(--ink); margin: 0.5rem 0 0.2rem;">★ ${ct.name} (${ct.dacHam}) — Hành ${ct.element} [${info.title || 'Tinh Quân'}]</h5>
            <p style="color: var(--text); font-size: 0.88rem; line-height: 1.65; margin-bottom: 0.5rem;">
              ${info.nature ? `<em>Bản chất tinh đẩu:</em> ${info.nature}<br>` : ''}
              <strong>Luận về cung ${cungName}:</strong> ${palaceSpecific}
            </p>
          </div>
        `;
      });
    }

    // 3. Phân tích Tứ Hóa
    let tuHoaDetailHtml = '';
    if (cung.tuHoa && cung.tuHoa.length > 0) {
      cung.tuHoa.forEach(th => {
        const thInfo = TU_HOA_DICT[th.hoa];
        if (thInfo) {
          tuHoaDetailHtml += `
            <div class="tu-hoa-eval-item" style="background: #FFFFFF; border-left: 3px solid #D4AF37; padding: 0.65rem 0.9rem; margin: 0.5rem 0; border-radius: 6px; border: 1px solid var(--line);">
              ${thInfo.eval(th.star, cungName)}
            </div>
          `;
        }
      });
    }

    // 4. Phân tích Chi tiết Cát Tinh
    let catTinhDetailHtml = '';
    if (cung.phuTinhLeft && cung.phuTinhLeft.length > 0) {
      catTinhDetailHtml += `<h5 style="color: var(--ink); margin-top: 0.8rem;">✦ Quần Cát Tinh Trợ Mệnh Phò Trì:</h5><ul style="padding-left: 1.2rem; color: var(--text); font-size: 0.88rem; line-height: 1.65;">`;
      cung.phuTinhLeft.forEach(pt => {
        const desc = PHU_TINH_ANALYST[pt.name] || 'Gia tăng may mắn, hỗ trợ bản cung phát triển thuận lợi.';
        catTinhDetailHtml += `<li><strong style="color: #D4AF37;">${pt.name}:</strong> ${desc}</li>`;
      });
      catTinhDetailHtml += `</ul>`;
    }

    // 5. Phân tích Chi tiết Sát Tinh
    let satTinhDetailHtml = '';
    if (cung.phuTinhRight && cung.phuTinhRight.length > 0) {
      satTinhDetailHtml += `<h5 style="color: #F87171; margin-top: 0.8rem;"><i data-lucide="alert-triangle" style="width:14px;height:14px;display:inline-block;vertical-align:-2px;"></i> Sát Bại Tinh &amp; Thử Thách Nghiệp Lực:</h5><ul style="padding-left: 1.2rem; color: var(--text); font-size: 0.88rem; line-height: 1.65;">`;
      cung.phuTinhRight.forEach(pt => {
        const desc = PHU_TINH_ANALYST[pt.name] || 'Mang theo chông gai, đòi hỏi ý chí kiên định vượt qua.';
        satTinhDetailHtml += `<li><strong style="color: #FCA5A5;">${pt.name}:</strong> ${desc}</li>`;
      });
      satTinhDetailHtml += `</ul>`;
    }

    // 6. Phân tích Vòng Tràng Sinh & Thái Tuế
    let vongKhiHtml = '';
    const tsDesc = VONG_TRANG_SINH_EVAL[cung.trangSinh] || '';
    const ttStar = (cung.phuTinhRight || []).concat(cung.phuTinhLeft || []).find(s => VONG_THAI_TUE_EVAL[s.name]);
    const ttDesc = ttStar ? VONG_THAI_TUE_EVAL[ttStar.name] : '';

    if (cung.trangSinh || ttStar) {
      vongKhiHtml = `
        <div class="vong-khi-block" style="background: #FFFFFF; padding: 0.8rem 1rem; border-radius: 8px; margin: 0.8rem 0; border: 1px solid var(--line);">
          <strong style="color: var(--ink);"><i data-lucide="activity" style="width:14px;height:14px;display:inline-block;vertical-align:-2px;"></i> Khí Vận Vòng Tràng Sinh &amp; Thái Tuế:</strong>
          <p style="color: var(--text); font-size: 0.86rem; margin: 0.35rem 0 0; line-height: 1.6;">
            ${cung.trangSinh ? `• <strong>Tràng Sinh [${cung.trangSinh}]:</strong> ${tsDesc}<br>` : ''}
            ${ttStar ? `• <strong>Thế trận [${ttStar.name}]:</strong> ${ttDesc}` : ''}
          </p>
        </div>
      `;
    }

    // 7. Tuần Không / Triệt Không Án Ngữ
    let khongVongHtml = '';
    const isTuan = (laSo.tuan || []).includes(cung.chiIndex);
    const isTriet = (laSo.triet || []).includes(cung.chiIndex);
    if (isTuan || isTriet) {
      khongVongHtml = `
        <div style="background: #FFFFFF; border-left: 3px solid #C8362D; padding: 0.8rem 1rem; margin: 0.8rem 0; border-radius: 8px; border: 1px solid var(--line);">
          <strong style="color: var(--ink);"><i data-lucide="shield-alert" style="width:14px;height:14px;display:inline-block;vertical-align:-2px;"></i> Ảnh Hưởng Của Không Vong:</strong>
          <p style="color: var(--text); font-size: 0.86rem; margin: 0.3rem 0 0; line-height: 1.6;">
            ${isTriet ? `• <strong>TRIỆT KHÔNG ÁN NGỮ:</strong> Như bức tường thép ngăn chặn hung khí nhưng cũng làm chậm bước tiến tiền vận. Gặp Triệt thì mưu sự trước 30 tuổi hay gặp trắc trở, phải bền gan vững chí mới thành tựu; đồng thời Triệt làm đảo ngược tính chất hung/cát của các sao trong cung.<br>` : ''}
            ${isTuan ? `• <strong>TUẦN KHÔNG BAO BỌC:</strong> Dải mây mờ che phủ, làm giảm bớt tính sát phạt của hung tinh, bảo vệ sự bình yên nhưng đòi hỏi tiến bước chậm mà chắc, không được nôn nóng đốt cháy giai đoạn.` : ''}
          </p>
        </div>
      `;
    }

    // 8. Phương pháp Cải Số & Tu Thân Tinh Hoa (Theo Cụ Nguyễn Phát Lộc)
    const mainStarNames = (cung.chinhTinh || []).map(s => s.name);
    const satStarNames = (cung.phuTinhRight || []).map(s => s.name);
    const catStarNames = (cung.phuTinhLeft || []).map(s => s.name);
    const hasHoaKy = (cung.tuHoa || []).some(th => th.hoa === 'Hóa Kỵ');
    const hasHoaLoc = (cung.tuHoa || []).some(th => th.hoa === 'Hóa Lộc');

    let starSpecificAdvice = '';
    if (mainStarNames.includes('Thái Dương')) {
      starSpecificAdvice += 'Thái Dương cần dưỡng khí bằng sự khiêm tốn, tránh phô trương tài năng khiến tiểu nhân đố kỵ; phát huy năng lực phụng sự công ích để tích tụ đại phúc. ';
    }
    if (mainStarNames.includes('Thất Sát') || mainStarNames.includes('Phá Quân') || mainStarNames.includes('Tham Lang')) {
      starSpecificAdvice += 'Khí thế Sát - Phá - Tham dũng mãnh, quyết liệt nhưng dễ bốc đồng gãy đổ; cần rèn luyện tính kiên nhẫn sâu dày, học cách lắng nghe và không bao giờ ra quyết định lớn khi tâm trí còn xao động. ';
    }
    if (mainStarNames.includes('Thiên Lương') || mainStarNames.includes('Thiên Đồng')) {
      starSpecificAdvice += 'Phúc tinh ngự trị nên lấy đức nhân hậu, bao dung làm kim chỉ nam; năng làm việc thiện, không tranh hơn thua với đời thì phúc trạch tự khắc bền lâu. ';
    }
    if (mainStarNames.includes('Tử Vi') || mainStarNames.includes('Thiên Phủ')) {
      starSpecificAdvice += 'Đế Tinh và Thiên Kho đòi hỏi khí độ bao dung độ lượng, trọng đãi hiền tài, hành sự đường hoàng không toan tính nhỏ nhen, lấy chữ Tín làm đầu. ';
    }
    if (mainStarNames.includes('Vũ Khúc') || mainStarNames.includes('Liêm Trinh')) {
      starSpecificAdvice += 'Tài tinh và Kỷ luật tinh nhắc nhở giữ kỷ cương thép, quản lý tài chính minh bạch nhưng tránh khắc nghiệt lạnh lùng với người thân tín. ';
    }
    if (mainStarNames.includes('Cự Môn')) {
      starSpecificAdvice += 'Khẩu thiệt chi tinh cần ghi khắc lời người xưa: "Họa tòng khẩu xuất"; uốn lưỡi trước khi nói, dùng tài hùng biện vào việc ích nước lợi dân. ';
    }
    if (satStarNames.includes('Địa Không') || satStarNames.includes('Địa Kiếp')) {
      starSpecificAdvice += 'Không Kiếp mang tính vô thường, bạo phát bạo tàn; cải mệnh tuyệt đối bằng việc không tham lam trục lợi bất chính, coi nhẹ được mất thế gian để tâm trí không bị cuốn vào vòng xoáy hư ảo. ';
    }
    if (satStarNames.includes('Kình Dương') || satStarNames.includes('Thiên Hình')) {
      starSpecificAdvice += 'Kình Hình mang sát khí đao kiếm; nên thường xuyên hiến máu nhân đạo, cẩn trọng khi lái xe hoặc vận động mạnh để chủ động hóa giải họa huyết quang. ';
    }
    if (hasHoaKy) {
      starSpecificAdvice += 'Hóa Kỵ là bài học nhẫn nhịn và tiêu trừ nghiệp lực; khi bị hiểu lầm hoặc gièm pha, hãy lấy sự im lặng và hành động chân chính để hóa giải, không đôi co thị phi. ';
    }

    let caiSoHtml = '';
    switch (cungName) {
      case 'MỆNH':
        caiSoHtml = `Cung Mệnh là gốc rễ của vạn sự, là nhân cách và chí hướng đời người. ${starSpecificAdvice} Cụ Nguyễn Phát Lộc đúc kết: <em>"Biết số để sửa số, biết mình để sửa mình"</em>. Tự soi lại sở đoản để khắc chế, phát huy sở trường để phụng sự đời. Giữ tâm chính trực, nuôi dưỡng ý chí kiên định, bền bỉ qua nghịch cảnh thì không có số mệnh nào ngăn nổi bước chân thành công.`;
        break;
      case 'TÀI BẠCH':
        caiSoHtml = `Cung Tài Bạch là huyết mạch kinh tế và phong cách sinh kế đời người. ${starSpecificAdvice} Pháp môn cải số đệ nhất của Cụ Nguyễn Phát Lộc là <strong>"LÀM GIÀU BẰNG CHÍNH ĐẠO"</strong>. Tuyệt đối không dấn thân vào cờ bạc, lừa đảo, tiền ảo hoặc các phi vụ đầu cơ phi pháp. Mỗi khi gặt hái được một khoản tài lộc lớn, hãy chủ động trích từ 5% - 10% để làm việc phúc thiện, phóng sinh, giúp đỡ người tàn tật bần hàn. Hành động này chuyển hóa năng lượng vật chất thành âm đức, giữ cho kho tiền luôn bền vững muôn đời.`;
        break;
      case 'PHU THÊ':
        caiSoHtml = `Cung Phu Thê là đạo phối ngẫu âm dương, nền tảng của gia đạo trường tồn. ${starSpecificAdvice} ${isTriet ? 'Gặp Triệt Không án ngữ, tiền vận tình duyên dễ có trắc trở; phương pháp hóa giải tốt nhất là <strong>kết hôn muộn (sau 27-28 tuổi)</strong> để Triệt Không thoái vị. ' : ''} Vợ chồng lấy chữ "Kính" và chữ "Nhẫn" làm đầu. Tôn trọng sự khác biệt của đối phương, chia sẻ việc nhà và không mang cái tôi áp đặt thì gia đình mãi êm ấm như thuở ban sơ.`;
        break;
      case 'ĐIỀN TRẠCH':
        caiSoHtml = `Cung Điền Trạch chủ về chốn an cư lạc nghiệp và nguồn tích lũy địa ốc. ${starSpecificAdvice} Để duy trì và phát triển kho tàng điền sản này, đương số cần tuân thủ đạo đức trong giao dịch bất động sản: không ép giá người bần hàn, không gian lận pháp lý. Khi xây dựng nơi ở, cần chú trọng thiết kế phong thủy đón gió đón nắng thanh sạch, lập bàn thờ gia tiên trang nghiêm để tụ tích long mạch sinh khí.`;
        break;
      case 'QUAN LỘC':
        caiSoHtml = `Cung Quan Lộc biểu thị con đường công danh, sự nghiệp và vị thế xã hội. ${starSpecificAdvice} Muốn sự nghiệp vững như bàn thạch, mọi hợp đồng kinh doanh phải ký kết minh bạch, giấy trắng mực đen rõ ràng, không lách luật trốn thuế. Khi đạt được địa vị cao phải luôn giữ thái độ khiêm nhường, gần gũi nhân viên và đối tác, không tạo cơ hội cho kẻ tiểu nhân đố kỵ hãm hại.`;
        break;
      case 'TẬT ÁCH':
        caiSoHtml = `Cung Tật Ách phản ánh sức khỏe thân thể và những tiềm ẩn rủi ro nghiệp lực. ${starSpecificAdvice} Pháp hóa giải huyết quang kinh điển của cụ Nguyễn Phát Lộc là <strong>ĐỊNH KỲ THAM GIA HIẾN MÁU NHÂN ĐẠO</strong> (mỗi năm 1 - 2 lần). Đây là cách "chủ động đổ máu" để cứu người, biến cái hạn đao kéo phẫu thuật thành đại phúc đức. Đồng thời, giữ lối sống khoa học, ngủ trước 23h để dưỡng tạng phủ, hạn chế rượu bia và thức ăn cay nóng.`;
        break;
      case 'PHÚC ĐỨC':
        caiSoHtml = `Cung Phúc Đức là cội nguồn tâm linh, dòng chảy âm đức của tổ tiên và đời sống tinh thần cá nhân. ${starSpecificAdvice} Hãy thường xuyên chăm lo mồ mả tổ tiên, hồi hướng công đức cho dòng họ. Dành thời gian nghiên cứu kinh sách cổ học, triết học Đông phương hoặc thiền định để an định tâm trí. Tâm càng thanh tịnh không màng danh lợi tầm thường thì trí tuệ Bát Nhã càng khai mở rực rỡ.`;
        break;
      case 'PHỤ MẪU':
        caiSoHtml = `Cung Phụ Mẫu tượng trưng cho nguồn cội sinh thành và ân đức dưỡng dục. ${starSpecificAdvice} Cụ Nguyễn Phát Lộc đúc kết: <em>"Bách thiện hiếu vi tiên"</em> (Trăm nết thiện thì chữ Hiếu đứng đầu). Đối với cha mẹ, hãy dùng thái độ hòa ái, lắng nghe và thấu hiểu khoảng cách thế hệ. Nếu tính khí có phần xung khắc, nên sớm tự lập thân, sống độc lập nhưng thường xuyên vấn an phụng dưỡng; đó chính là chìa khóa mở ra bình an và phúc lộc cho cả dòng tộc.`;
        break;
      case 'TỬ TỨC':
        caiSoHtml = `Cung Tử Tức phản ánh hậu duệ, con cái và sự nối dõi tông đường. ${starSpecificAdvice} Khi dạy dỗ con cái, tuyệt đối không dùng đòn roi bạo lực hay áp đặt tư tưởng phong kiến. Hãy làm bạn với con, lắng nghe tâm tư của con, hướng con vào các môi trường rèn luyện tính tự lập và kỷ luật quân đội hoặc thể thao lành mạnh. Hành thiện tích đức cho con cháu từ hôm nay.`;
        break;
      case 'NÔ BỘC':
        caiSoHtml = `Cung Nô Bộc chủ về bạn bè, cấp dưới, cộng sự và các mối quan hệ xã giao. ${starSpecificAdvice} Tuyệt đối thực hiện nguyên tắc <strong>"Bằng hữu tương kính, tài chính phân minh"</strong>. Không đứng ra bảo lãnh nợ, không cho vay mượn vượt quá khả năng chấp nhận mất mát, không rủ rê bè bạn vào các thú vui trụy lạc tiêu hao sinh lực.`;
        break;
      case 'THIÊN DI':
        caiSoHtml = `Cung Thiên Di biểu thị môi trường bên ngoài, sự xuất hành và ngoại giao xã hội. ${starSpecificAdvice} Đi xa lập nghiệp rất có lợi lộc nhưng phải ghi nhớ câu châm ngôn: <em>"Họa tòng khẩu xuất, bệnh tòng khẩu nhập"</em>. Uốn lưỡi bảy lần trước khi nói, tránh tranh cãi hơn thua với người ngoài xã hội. Đi xa luôn chú ý an toàn giao thông, tuân thủ pháp luật sở tại.`;
        break;
      case 'HUYNH ĐỆ':
        caiSoHtml = `Cung Huynh Đệ chủ về tình cảm, sự tương trợ giữa anh chị em ruột thịt. ${starSpecificAdvice} Anh em trong nhà nên độc lập về kinh tế và nơi ở. Tiền bạc phân minh, giúp đỡ nhau bằng sự chân thành chứ không mập mờ vay mượn để tránh sứt mẻ tình máu mủ ruột thịt. "Huynh đệ như thủ túc", giữ sự hòa ái làm trọng.`;
        break;
      default:
        caiSoHtml = `Giữ tâm thiện lương, hành sự cẩn trọng, tích cực tu tâm dưỡng tính để bồi đắp phúc khí lâu dài.`;
    }

    return {
      tieuDe: tieuDe,
      cachCucHtml: cachCucHtml,
      tamPhuongHtml: tamPhuongHtml,
      chinhTinhDetailHtml: chinhTinhDetailHtml,
      tuHoaDetailHtml: tuHoaDetailHtml,
      catTinhDetailHtml: catTinhDetailHtml,
      satTinhDetailHtml: satTinhDetailHtml,
      vongKhiHtml: vongKhiHtml,
      khongVongHtml: khongVongHtml,
      caiSoHtml: caiSoHtml
    };
  }


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
      gockhuatText = `Mệnh tọa thủ <strong>Thái Dương</strong> tại cung ${pMenh.chi}, bản chất là ngọn lửa quang minh, hào sảng, trọng danh dự và luôn có xu hướng gánh vác trách nhiệm cho người khác. Tuy nhiên, Thân cư <strong>${thanCuName}</strong> (tọa thủ <strong>${ctThan}</strong>) lại khiến nội tâm đương số có sự giằng xé sâu sắc: Bên ngoài tỏ ra kiên định, bản lĩnh, nói cười xởi lởi nhưng khi màn đêm buông xuống là lúc những trăn trở về tiền tài, sự nghiệp và vị thế tương lai bủa vây dồn dập. Đương số rất ghét cảm giác mang ơn hay phụ thuộc, thà cắn răng chịu thiệt còn hơn hạ mình cầu cạnh. Điểm yếu chí mạng là <em>cả nể, dễ mủi lòng trước lời hứa của người thân cận</em>, dẫn đến việc nhiều lần làm ơn mắc oán hoặc gánh thiệt thòi thay cho người khác.`;
    } else if (ctMenh.includes('Tử Vi') || ctMenh.includes('Thiên Phủ')) {
      gockhuatText = `Mệnh ngự <strong>${ctMenh}</strong> — bậc Đế Vương, Lệnh Tinh nắm giữ uy quyền và lòng tự tôn cực cao. Tuy nhiên, Thân cư <strong>${thanCuName}</strong> tạo nên một góc khuất cô đơn tột cùng: Không ai hiểu hết những toan tính và áp lực trên vai đương số. Bên ngoài luôn giữ hình tượng chỉn chu, thành đạt nhưng bên trong là sự thận trọng quá mức, đôi khi khó mở lòng chia sẻ thật sự với bất kỳ ai. Điểm yếu chí mạng là <em>sợ cảm giác thất bại, cái tôi lớn đôi khi bỏ lỡ thời cơ đổi vận nhanh chóng</em>.`;
    } else if (ctMenh.includes('Vũ Khúc') || ctMenh.includes('Thất Sát')) {
      gockhuatText = `Mệnh tọa thủ <strong>${ctMenh}</strong> mang khí chất gang thép, quyết liệt, hành động sắc bén và đầu óc kinh tài thực tế. Góc khuất nội tâm là cảm giác cô quả, ít khi biểu lộ sự yếu mềm nên người ngoài dễ nhìn nhận đương số là lạnh lùng, khó gần. Điểm yếu chí mạng là <em>tính nóng nảy bộc phát ngầm, khó thỏa hiệp</em>, khi niềm tin bị phản bội sẽ lập tức đoạn tuyệt dứt khoát không để đường lui.`;
    } else if (ctMenh.includes('Thiên Cơ') || ctMenh.includes('Thiên Đồng') || ctMenh.includes('Thái Âm')) {
      gockhuatText = `Mệnh tọa thủ <strong>${ctMenh}</strong> tại cung ${pMenh.chi}, tương tác với Thân cư <strong>${thanCuName}</strong> (${ctThan}) tạo nên mẫu người có trực giác nhạy bén, thông minh và giàu lòng trắc ẩn. Góc khuất là nội tâm suy nghĩ quá nhiều, tâm trạng biến đổi theo hoàn cảnh bên ngoài. Điểm yếu chí mạng là <em>hay do dự ở thời khắc quyết định</em>, suy nghĩ bao quát nhưng đôi khi thiếu tính quyết đoán dứt khoát, dễ bỏ lỡ vận may lớn.`;
    } else {
      gockhuatText = `Mệnh tọa thủ <strong>${ctMenh}</strong> tại cung ${pMenh.chi}, tương tác cùng Thân cư <strong>${thanCuName}</strong> (${ctThan}) tạo nên mẫu người độc lập, tự lực cánh sinh từ sớm. Đương số có lòng tự trọng cao, không thích nhờ vả người khác. Điểm yếu chí mạng là <em>dễ bị chi phối bởi cảm xúc nội tâm dồn nén</em>, một khi đã mất niềm tin vào ai đó thì vĩnh viễn không thể khôi phục lại tình cảm như thuở ban đầu.`;
    }

    // Quét sát tinh tại Mệnh & Thân & Tài
    const satTinhList = [];
    [pMenh, pThan, pTai].forEach(p => {
      (p.phuTinhRight || []).forEach(s => {
        if (['Kình dương', 'Đà la', 'Hỏa tinh', 'Linh tinh', 'Địa không', 'Địa kiếp', 'Thiên hình', 'Hóa kỵ'].includes(s.name)) {
          satTinhList.push(`<strong>${s.name}</strong> (cung ${p.cungName.replace('<THÂN>', '')})`);
        }
      });
    });
    if (satTinhList.length > 0) {
      gockhuatText += `<br><span style="display:inline-block; margin-top:6px; font-size:0.88rem; color:#A3281F;">⚠ <em>Cảnh báo nghiệp lực tinh đẩu:</em> Sự hiện diện của ${[...new Set(satTinhList)].slice(0, 3).join(', ')} nhắc nhở bạn cần đặc biệt cẩn trọng trước các cạm bẫy hùn hạp tài chính và thói quen cả nể dĩ hòa vi quý.</span>`;
    }

    // 2. Nghiệm lý biến cố 2 năm gần đây (2024 - 2025)
    const bienCoText = `
      Năm <strong>Giáp Thìn 2024</strong> và <strong>Ất Tỵ 2025</strong> vừa qua là giai đoạn chuyển giao đầy chao đảo trong chu kỳ vận hạn của bạn. Trục Lưu Thái Tuế và Lưu Kình Đà liên tục kích hoạt vào bản cung và tam hợp chiếu:<br>
      • <strong>Về Tài chính &amp; Công danh:</strong> Đương số chắc chắn đã trải qua ít nhất một phen hao hụt tiền bạc ngoài dự tính, công việc gặp điểm nghẽn hoặc phải gánh vác các khoản chi tiêu lớn bất khả kháng. Nhiều dự định ấp ủ tưởng chừng nắm chắc lại bị đình trệ vào phút chót.<br>
      • <strong>Về Tâm lý &amp; Mối quan hệ:</strong> Xuất hiện sự rạn nứt hoặc xa cách trong các mối quan hệ thân cận. Có những thời điểm đương số cảm thấy cô độc tuyệt đối, nỗ lực hy sinh cho người khác nhưng nhận lại sự thờ ơ hoặc thiếu thấu hiểu.<br>
      <div style="margin-top:8px; padding:8px 12px; background:rgba(163,40,31,0.06); border-left:3px solid #A3281F; border-radius:4px; font-style:italic;">
        “Cụ Nguyễn Phát Lộc đúc kết: Đây không phải là sự xui xẻo ngẫu nhiên, mà là vũ trụ đang 'thanh lọc mặt bằng' tâm thức, giúp bạn nhận diện rõ kẻ giả người thật trước khi bước vào chu kỳ đón nhận đại vận tài lộc mới 2026 – 2027.”
      </div>
    `;

    // 3. Điểm sáng Cát Tinh cứu giải
    const catTinhItems = [];
    [pMenh, pThan, pTai, pQuan, pDi].forEach(p => {
      (p.phuTinhLeft || []).forEach(s => {
        if (['Hóa Khoa', 'Hóa Lộc', 'Hóa Quyền', 'Thiên khôi', 'Thiên việt', 'Tả phù', 'Hữu bật', 'Ân quang', 'Thiên quý', 'Giải thần', 'Long đức', 'Nguyệt đức', 'Thiên đức', 'Phúc đức', 'Thanh long', 'Lộc tồn'].includes(s.name) || s.tuHoa) {
          catTinhItems.push(`<strong>${s.name}${s.tuHoa ? ' [' + s.tuHoa + ']' : ''}</strong> (${p.cungName.replace('<THÂN>', '')})`);
        }
      });
      (p.chinhTinh || []).forEach(s => {
        if (s.tuHoa) {
          catTinhItems.push(`<strong>${s.name} [${s.tuHoa}]</strong> (${p.cungName.replace('<THÂN>', '')})`);
        }
      });
    });
    const uniqueCatTinh = [...new Set(catTinhItems)].slice(0, 4);

    const catTinhText = `
      Dù đi qua nhiều khúc quanh gian nan, lá số của bạn sở hữu <strong>bộ ba quý tinh phò trợ cực mạnh</strong>: ${uniqueCatTinh.length > 0 ? uniqueCatTinh.join(', ') : 'Hội tụ Tứ Đức &amp; Khoa Quyền Lộc'}.<br>
      Đây là bố cục <em>"Tiền bần hậu phú — Đại khí vãn thành"</em>. Càng trải qua thử thách thì bản lĩnh và giá trị của bạn càng nhân lên gấp bội. Bước sang năm <strong>2026 (Bính Ngọ)</strong>, thiên vận bắt đầu mở ra chiếc chìa khóa lật ngược tình thế, đặc biệt là cơ hội tài chính đột phá vào nửa cuối năm nếu bạn biết cách kích hoạt đúng phong thủy tinh đẩu và hóa giải triệt để các sát tinh ngầm.
    `;

    return `
      <div class="free-psychological-dossier" style="margin-bottom: 2rem; background: #FDFBF7; border: 1.5px solid var(--seal, #A3281F); border-radius: 8px; padding: 1.4rem; box-shadow: 0 4px 15px rgba(27,23,20,0.06);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:1rem; border-bottom:1px dashed var(--line, #CFC2A6); padding-bottom:0.75rem;">
          <span style="background:var(--seal, #A3281F); color:#fff; font-size:0.78rem; font-weight:700; padding:3px 10px; border-radius:4px; text-transform:uppercase; letter-spacing:0.5px;">Miễn Phí</span>
          <h3 style="font-family:'Noto Serif', serif; font-size:1.15rem; color:var(--seal, #A3281F); margin:0; font-weight:700;">
            ✦ BẢN ĐỒ TÍNH CÁCH NGẦM &amp; NGHIỆM LÝ VẬN TRÌNH ĐÃ QUA
          </h3>
        </div>
        <p style="font-size:0.88rem; color:var(--text-muted, #5E5446); margin-bottom:1.2rem; font-style:italic;">
          Biện giải tâm lý học thực chứng tổng hợp từ tổ hợp Chính Tinh, Tứ Hóa &amp; Lục Sát Tinh tọa thủ tại Mệnh, Thân, Tài, Quan của đương số <strong>${laSo.hoTen || 'Đương Số'}</strong>:
        </p>

        <!-- Mục 1 -->
        <div class="dossier-card" style="background:#fff; border:1px solid var(--line, #CFC2A6); border-radius:6px; padding:1rem 1.1rem; margin-bottom:1rem;">
          <h4 style="font-size:0.98rem; font-weight:700; color:var(--ink, #1B1714); margin:0 0 0.5rem; display:flex; align-items:center; gap:6px;">
            <span style="color:var(--seal, #A3281F);">1.</span> Góc Khuất Nội Tâm &amp; Điểm Yếu Chí Mạng
          </h4>
          <div style="font-size:0.9rem; line-height:1.68; color:var(--text, #2A231C);">
            ${gockhuatText}
          </div>
        </div>

        <!-- Mục 2 -->
        <div class="dossier-card" style="background:#fff; border:1px solid var(--line, #CFC2A6); border-radius:6px; padding:1rem 1.1rem; margin-bottom:1rem;">
          <h4 style="font-size:0.98rem; font-weight:700; color:var(--ink, #1B1714); margin:0 0 0.5rem; display:flex; align-items:center; gap:6px;">
            <span style="color:var(--seal, #A3281F);">2.</span> Nghiệm Lý Biến Cố 2 Năm Gần Đây (2024 – 2025)
          </h4>
          <div style="font-size:0.9rem; line-height:1.68; color:var(--text, #2A231C);">
            ${bienCoText}
          </div>
        </div>

        <!-- Mục 3 -->
        <div class="dossier-card" style="background:#fff; border:1px solid var(--line, #CFC2A6); border-radius:6px; padding:1rem 1.1rem;">
          <h4 style="font-size:0.98rem; font-weight:700; color:var(--ink, #1B1714); margin:0 0 0.5rem; display:flex; align-items:center; gap:6px;">
            <span style="color:var(--seal, #A3281F);">3.</span> Điểm Sáng Cát Tinh Cứu Giải &amp; Lối Thoát Thịnh Vượng
          </h4>
          <div style="font-size:0.9rem; line-height:1.68; color:var(--text, #2A231C);">
            ${catTinhText}
          </div>
        </div>

        <div style="text-align:center; margin-top:1.2rem; padding:0.8rem; background:rgba(176,138,62,0.08); border-radius:6px;">
          <p style="margin:0 0 0.5rem; font-size:0.88rem; color:var(--text, #2A231C); font-weight:600;">
            👇 Dưới đây là luận giải chi tiết từng Cung Vị &amp; Thời Khắc Vàng chuyển mình trong Đại Vận 2026 – 2027:
          </p>
        </div>
      </div>
    `;
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
          `Bí pháp kích hoạt nguồn tiền đại cát từ <strong>[${chinhTinhNames}]</strong> trong năm Bính Ngọ 2026.`,
          `Tháng âm lịch trong năm 2026 – 2027 cần đề phòng hao tài lớn nhất do tác động của <strong>[${satTinhNames || 'Địa Không, Tiểu Hao'}]</strong>.`,
          `Định hướng phân bổ dòng vốn: Lá số của bạn hợp đầu tư Bất Động Sản, Chứng Khoán hay kinh doanh dịch vụ?`,
          `Toàn văn phương pháp Cải Mệnh &amp; Tích Phúc Tụ Tài kinh điển của cụ Nguyễn Phát Lộc cho Cung Tài Bạch.`
        ];
        break;
      case 'QUAN LỘC':
        bullets = [
          `Ngành nghề &amp; lĩnh vực đại vận giúp bạn đột phá công danh với thế đứng của <strong>[${chinhTinhNames}]</strong>.`,
          `Thời điểm vàng chuyển việc, thăng chức hoặc mở rộng quy mô kinh doanh trong 2 năm 2026 – 2027.`,
          `Bí quyết chế ngự tiểu nhân ganh ghét và kích hoạt quý nhân nâng đỡ trên con đường thăng tiến.`
        ];
        break;
      case 'PHU THÊ':
        bullets = [
          `Chân dung, tính cách &amp; nghề nghiệp của người bạn đời tiền định qua bộ sao <strong>[${chinhTinhNames}]</strong>.`,
          `Thời điểm kết hôn hoặc giai đoạn thử thách hôn nhân cần hóa giải để gia đạo hòa thuận bền lâu.`,
          `Phương pháp hóa giải triệt để ảnh hưởng của <strong>[${satTinhNames || 'Sát Tinh ngầm / Không Vong'}]</strong> để giữ trọn lửa ấm gia đình.`
        ];
        break;
      case 'ĐIỀN TRẠCH':
        bullets = [
          `Quy mô và thời điểm tích lũy bất động sản lớn nhất trong đời theo thế đứng của <strong>[${chinhTinhNames}]</strong>.`,
          `Năm nào trong đại vận là thời điểm vàng để mua bán nhà đất không lo tranh chấp, sinh lời tối đa?`,
          `Bí quyết phong thủy nhà ở kích hoạt cung Tài Lộc tương sinh với bản mệnh.`
        ];
        break;
      case 'THIÊN DI':
        bullets = [
          `Vận số xuất ngoại, đi xa lập nghiệp: Cơ hội thăng tiến và đắc thời đắc vị ngoài xã hội.`,
          `Phương vị xuất hành đại cát và các tháng cần cẩn trọng an toàn giao thông năm 2026.`,
          `Cách biến môi trường xã hội bên ngoài thành bàn đạp làm giàu nhanh chóng.`
        ];
        break;
      case 'PHÚC ĐỨC':
        bullets = [
          `Mức độ thụ hưởng phúc ấm tổ tiên và chiều sâu nội tâm theo bộ sao <strong>[${chinhTinhNames}]</strong>.`,
          `Nguồn năng lượng tâm linh và nghiệp lực dòng họ tác động đến hậu vận như thế nào?`,
          `Phương pháp tu dưỡng tâm tính &amp; tích lũy âm đức giúp tiêu trừ vận hạn lớn.`
        ];
        break;
      case 'TỬ TỨC':
        bullets = [
          `Số lượng, giới tính và đường công danh hiển đạt của con cái sau này theo <strong>[${chinhTinhNames}]</strong>.`,
          `Tính cách con cái và phương pháp giáo dục phù hợp để con thành tài, hiếu thuận.`,
          `Hóa giải các hung tinh chiếu cung con cái để gia đạo bình an.`
        ];
        break;
      case 'TẬT ÁCH':
        bullets = [
          `Bản đồ sức khỏe: Các cơ quan tạng phủ dễ suy yếu cần chú ý bảo dưỡng theo ngũ hành bản mệnh.`,
          `Năm hạn và tháng âm lịch cần đề phòng tai nạn, bệnh tật bất ngờ trong đại vận.`,
          `Pháp hóa giải huyết quang và cách ăn uống dưỡng sinh khoa học của cụ Nguyễn Phát Lộc.`
        ];
        break;
      default:
        bullets = [
          `Toàn bộ ma trận Tam Phương Tứ Chính hội chiếu tương tác vào Cung <strong>${cungName}</strong>.`,
          `Dự báo cơ hội bứt phá và rủi ro tiềm ẩn trong chu kỳ 2 năm tới (2026 – 2027).`,
          `Lời khuyên Cải Mệnh &amp; Hóa Giải sát tinh chi tiết từ các bậc tiền bối Tử Vi Lý Số.`
        ];
    }

    return {
      cungName,
      chinhTinhNames,
      bullets
    };
  }

  // 6. XUẤT RA TOÀN BỘ API
  var TuViLuanGiaiEngine = {
    generatePalaceDeepAnalysis: generatePalaceDeepAnalysis,
    generateFreePsychologicalTeaserHtml: generateFreePsychologicalTeaserHtml,
    generatePalaceCliffhangerTeaser: generatePalaceCliffhangerTeaser,
    CHINH_TINH_DICT: CHINH_TINH_DICT,
    TU_HOA_DICT: TU_HOA_DICT,
    PHU_TINH_ANALYST: PHU_TINH_ANALYST,
    VONG_TRANG_SINH_EVAL: VONG_TRANG_SINH_EVAL,
    VONG_THAI_TUE_EVAL: VONG_THAI_TUE_EVAL
  };

  global.TuViLuanGiaiEngine = TuViLuanGiaiEngine;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = TuViLuanGiaiEngine;
  }

})(typeof window !== 'undefined' ? window : this);
