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

  
  // 3. KHO PHÂN TÍCH CHUYÊN SÂU 12 CUNG CHO TOÀN BỘ PHỤ TINH, CÁT TINH & SÁT BẠI TINH
  const PHU_TINH_PALACE_DICT = {
  "Tả Phù": {
    "MỆNH": "Tư chất quảng đại, hay giúp đỡ người khác, có tài tổ chức và năng lực điều hành; ra ngoài luôn có bạn bè tri kỷ và quý nhân phò tá.",
    "PHỤ MẪU": "Cha mẹ tính tình hiền hậu, hòa nhã, có uy tín xã hội; đương số luôn nhận được sự chở che và trợ lực vững chắc từ song thân.",
    "PHÚC ĐỨC": "Dòng họ phước trạch dày sâu, mồ mả tổ tiên phát tích, họ hàng đông đúc và đoàn kết đùm bọc lẫn nhau.",
    "ĐIỀN TRẠCH": "Mua bán nhà đất có quý nhân môi giới hỗ trợ, xóm giềng văn minh hòa nhã; cơ ngơi nhà cửa ngày càng mở rộng bề thế.",
    "QUAN LỘC": "Có ê-kíp cấp dưới đắc lực và cộng sự chung vai gánh vác; làm việc nhóm đại lợi, dễ nắm giữ cương vị quản lý chỉ huy.",
    "NÔ BỘC": "Bè bạn đông đảo và trung thành, cấp dưới hết lòng phò tá; được người xung quanh ủng hộ nhiệt thành trong mọi dự án.",
    "THIÊN DI": "Xuất ngoại đắc thời, đi xa có người chỉ lối đưa đường, môi trường bên ngoài luôn đón nhận và tạo điều kiện phát triển.",
    "TẬT ÁCH": "Gặp thầy gặp thuốc khi đau ốm, gặp nạn có người cứu nguy kịp thời; giảm thiểu đáng kể tai ương tật bệnh.",
    "TÀI BẠCH": "Nhiều nguồn thu nhập dồi dào, hợp tác làm ăn sinh sôi lợi nhuận; có người trợ vốn và tư vấn tài chính sắc bén.",
    "TỬ TỨC": "Con cái đông đúc, thông minh ngoan ngoãn, hiếu thuận với cha mẹ; sau này thành danh và là chỗ dựa vững chãi cho gia đình.",
    "PHU THÊ": "Vợ chồng đồng lòng cùng chung chí hướng xây đắp kinh tế; song nếu hội nhiều đào hoa tinh cần chú ý giữ gìn khoảng cách để tránh người thứ ba.",
    "HUYNH ĐỆ": "Anh chị em hòa thuận, tương thân tương ái, có sự nâng đỡ lớn cho nhau trên con đường lập nghiệp."
  },
  "Hữu Bật": {
    "MỆNH": "Tính tình ôn nhu, khéo léo, giỏi kết nối nhân tâm; cuộc đời gặp nhiều may mắn bất ngờ từ các mối quan hệ xã hội thầm lặng.",
    "PHỤ MẪU": "Cha mẹ nhân từ, biết lắng nghe con cái; có người đỡ đầu hoặc quý nhân âm thầm hỗ trợ cho gia đình.",
    "PHÚC ĐỨC": "Âm phúc tổ tiên che chở vô hình, dòng họ nhiều người có tài nghệ đặc biệt, bản thân có đời sống tâm linh an lạc.",
    "ĐIỀN TRẠCH": "Nhà đất phong thủy êm ấm, việc mua bán sang nhượng bất động sản thường diễn ra suôn sẻ, ít gặp tranh chấp.",
    "QUAN LỘC": "Sự nghiệp hanh thông nhờ tài ngoại giao mềm dẻo; luôn có quý nhân đứng sau hậu thuẫn mở ra các cơ hội thăng tiến quý giá.",
    "NÔ BỘC": "Được bạn bè và cấp dưới thương mến, đối tác tin cậy giữ chữ tín; dễ tập hợp được sức mạnh tập thể.",
    "THIÊN DI": "Ra ngoài hòa nhập nhanh chóng với môi trường mới; đi xa gặp nhiều duyên lành, được cộng đồng xung quanh yêu quý.",
    "TẬT ÁCH": "Bệnh tật sớm thuyên giảm nhờ được chăm sóc chu đáo, gặp đúng thầy thuốc giỏi; tinh thần lạc quan xua tan bệnh tật.",
    "TÀI BẠCH": "Tài lộc đến từ tài năng kết nối và sự uy tín; tiền bạc tụ hội từ nhiều mối làm ăn phụ trợ, không lo túng thiếu.",
    "TỬ TỨC": "Con cái hiếu thảo, tính tình nhu thuận, biết yêu thương đùm bọc anh em trong nhà; sớm biết phụ giúp cha mẹ.",
    "PHU THÊ": "Người phối ngẫu đảm đang, khéo đối nhân xử thế, là hậu phương vững chắc; cần giữ gìn lòng chung thủy tránh xao động ngoài luồng.",
    "HUYNH ĐỆ": "Anh em như thủ túc, sẵn sàng chia sẻ khó khăn vật chất lẫn tinh thần; gia đình luôn giữ được hòa khí êm ấm."
  },
  "Thiên Khôi": {
    "MỆNH": "Đệ nhất Quý tinh tọa Mệnh: tư chất thông minh đĩnh ngộ, có khí chất thủ lĩnh đứng đầu, học rộng hiểu sâu, gặp hung hóa cát kỳ diệu.",
    "PHỤ MẪU": "Cha mẹ là bậc danh gia, có địa vị và uy tín cao trong xã hội; đương số được thừa hưởng sự giáo dục nề nếp và gia tài tri thức lớn.",
    "PHÚC ĐỨC": "Dòng họ vinh hiển, nhiều đời có người đỗ đạt thủ khoa hoặc giữ trọng trách lớn; mộ phần tổ phụ phát tích linh thiêng.",
    "ĐIỀN TRẠCH": "Cơ ngơi khang trang, nhà ở nơi tôn nghiêm hoặc khu dân trí cao, phong thủy vượng khí mang lại sự hưng thịnh dài lâu.",
    "QUAN LỘC": "Thi cử đỗ đầu bảng, sự nghiệp thăng tiến vượt bậc; luôn được các bậc tiền bối và cấp trên có thẩm quyền cất nhắc trọng dụng.",
    "NÔ BỘC": "Giao thiệp với tầng lớp trí thức, nhân sĩ danh giá; cấp dưới là những người tài năng xuất chúng, phò tá đắc lực.",
    "THIÊN DI": "Ra ngoài nổi danh tài ba, được xã hội kính trọng nể vì; dễ được cử đi tu nghiệp, công cán ngoại giao ở những vị trí then chốt.",
    "TẬT ÁCH": "Khi lâm bệnh nặng luôn gặp được danh y bậc thầy chữa trị kịp thời; tai nạn nguy nan đều có lối thoát hiểm an toàn.",
    "TÀI BẠCH": "Kiếm tiền bằng trí tuệ, bằng cấp và uy tín danh dự; được hưởng lộc chính danh, tiền bạc dồi dào và bền vững.",
    "TỬ TỨC": "Sinh con đầu lòng là quý tử hoặc ái nữ tài hoa xuất chúng; con cái học hành đỗ đạt cao, làm rạng danh dòng tộc.",
    "PHU THÊ": "Bạn đời là người có học vấn uyên thâm, xuất thân từ gia đình nền nếp gia phong; vợ chồng tương kính như tân, cùng nhau vinh hiển.",
    "HUYNH ĐỆ": "Anh em có người đỗ đạt cao hoặc giữ cương vị lãnh đạo; luôn là niềm tự hào chung của cả gia đình."
  },
  "Thiên Việt": {
    "MỆNH": "Khí chất thanh nhã, tư duy nhạy bén vượt trội, có tài ứng biến thần tốc; luôn được quý nhân nâng đỡ trong những bước ngoặt cuộc đời.",
    "PHỤ MẪU": "Cha mẹ mẫu mực, có tư tưởng tiến bộ và hết lòng đầu tư cho tương lai con cái; gia đình hòa thuận yêu thương.",
    "PHÚC ĐỨC": "Hưởng trọn âm đức tổ tiên, dòng họ có truyền thống khoa bảng vinh quy; bản thân luôn gặp may mắn trong những tình huống ngặt nghèo.",
    "ĐIỀN TRẠCH": "Nhà cửa sáng sủa khang trang, điền sản gia tăng nhanh chóng; thường sở hữu bất động sản ở những vị trí đắc địa.",
    "QUAN LỘC": "Đường công danh hanh thông rực rỡ, dễ được trao quyền phụ trách những trọng trách quan trọng; thăng tiến bằng tài năng thực học.",
    "NÔ BỘC": "Có bạn bè và cấp dưới tài năng, chung lòng cống hiến; đối tác hợp tác luôn tạo điều kiện thuận lợi nhất.",
    "THIÊN DI": "Xuất ngoại hoặc đi xa mở mang tầm mắt, được trọng đãi nơi đất khách; luôn tạo dựng được ấn tượng xuất sắc trong mắt công chúng.",
    "TẬT ÁCH": "Có sức đề kháng tinh thần mạnh mẽ, bệnh tật tiêu trừ khi gặp đúng phương pháp điều trị; tai qua nạn khỏi nhẹ nhàng.",
    "TÀI BẠCH": "Nguồn tài chính dồi dào nhờ vào năng lực chuyên môn và các cơ hội vàng từ quý nhân trao tặng; đầu tư nhìn xa trông rộng.",
    "TỬ TỨC": "Con cái thông minh hoạt bát, có chí tiến thủ cao, học hành giỏi giang; sau này gầy dựng sự nghiệp vẻ vang.",
    "PHU THÊ": "Người phối ngẫu tháo vát, hiểu biết sâu rộng, khéo léo trong đối nội đối ngoại; hôn nhân hòa thuận và hỗ trợ nhau đắc lực.",
    "HUYNH ĐỆ": "Anh chị em tài năng, có tinh thần tương trợ lẫn nhau cao độ; trong gia đình luôn có người đứng mũi chịu sào vững chãi."
  },
  "Lộc Tồn": {
    "MỆNH": "Thiên Lộc trời ban tọa Mệnh: tính tình cẩn trọng, kín kẽ, biết giữ mình và quản trị tài chính xuất sắc; cả đời không lo túng thiếu cơm áo gạo tiền.",
    "PHỤ MẪU": "Cha mẹ có sản nghiệp kinh tế vững chắc, có của ăn của để; con cái được nuôi dưỡng trong môi trường đủ đầy và thừa hưởng di sản.",
    "PHÚC ĐỨC": "Tổ phụ tích tụ phúc đức tài lộc trường cửu; dòng họ phát phú, con cháu đời sau được che chở bình an sung túc.",
    "ĐIỀN TRẠCH": "Cung Điền đắc Lộc Tồn là kho báu: sở hữu nhiều nhà đất, bất động sản sinh lời lớn; cơ ngơi bền vững truyền đời.",
    "QUAN LỘC": "Chức vụ luôn đi liền với bổng lộc dồi dào; nắm giữ trọng trách quản lý tài chính, ngân sách hoặc kinh doanh cốt cán.",
    "NÔ BỘC": "Bạn bè đối tác biết giữ chữ tín về tiền bạc, hợp tác sòng phẳng minh bạch; ít khi bị thất thoát tiền của vì người ngoài.",
    "THIÊN DI": "Ra ngoài đắc tài đắc lộc, tha hương cầu thực dễ làm nên sự nghiệp lớn; đi đến đâu cũng nhìn ra cơ hội sinh sôi của cải.",
    "TẬT ÁCH": "Sức khỏe tốt, có khả năng hóa giải nhiều tai ương bệnh tật; tuy nhiên cần đề phòng chứng bệnh tích tụ mỡ máu hoặc tiêu hóa.",
    "TÀI BẠCH": "Thế ĐẠI PHÚ TỌA CUNG TÀI: Tiền bạc tích tụ như nước chảy vào chum, chi tiêu có kế hoạch, hậu vận giàu sang phú túc.",
    "TỬ TỨC": "Con cái sau này có sự nghiệp kinh tế tự lập vững vàng, có của ăn của để, phụng dưỡng cha mẹ chu đáo khi về già.",
    "PHU THÊ": "Người phối ngẫu biết vun vén kinh tế, có của hồi môn hoặc đem lại vận may tài chính lớn cho gia đình; vợ chồng đồng lòng phát tài.",
    "HUYNH ĐỆ": "Anh em có điều kiện kinh tế khá giả, không phải bận tâm mâu thuẫn tiền bạc; sẵn sàng đùm bọc nhau lúc hoạn nạn."
  },
  "Phi Liêm": {
    "MỆNH": "Tính tình mau lẹ, tháo vát, hành động dứt khoát như tên bắn; tuy nhiên cẩn trọng tính nôn nóng, hấp tấp dễ làm hỏng việc lớn.",
    "PHỤ MẪU": "Cha mẹ tính cách năng động, hay phải di chuyển công tác; giao tiếp trong gia đình cần lắng nghe và điềm tĩnh hơn.",
    "PHÚC ĐỨC": "Phúc vận kích hoạt mau lẹ, mồ mả tổ tiên nơi cao ráo thoáng đãng; việc thờ cúng tâm linh giải quyết các biến cố rất nhanh.",
    "ĐIỀN TRẠCH": "Mua bán nhà đất diễn ra nhanh chóng chớp nhoáng; nhà ở nơi đón gió thoáng đãng, dễ thay đổi chỗ ở trong đời.",
    "QUAN LỘC": "Nắm bắt thời cơ sự nghiệp cực nhanh, thích hợp ngành nghề truyền thông, logistics, công nghệ tốc độ cao; đề phòng thị phi bay tới bất ngờ.",
    "NÔ BỘC": "Giao thiệp bạn bè nhanh chóng, quen biết rộng rãi; tuy nhiên cần chọn lọc vì người đến nhanh thì đi cũng nhanh.",
    "THIÊN DI": "Ra ngoài đi lại mau lẹ, hay đi công tác đột xuất; xuất hành cần chú ý kiểm soát tốc độ phương tiện giao thông an toàn.",
    "TẬT ÁCH": "Bệnh tật phát nhanh nhưng chữa trị cũng mau lành; cẩn trọng các vết xước ngoài da do vật nhọn hoặc côn trùng bay cắn.",
    "TÀI BẠCH": "Dòng tiền luân chuyển nhanh, nắm bắt cơ hội lướt sóng kiếm lời tốt; nhưng cần có quỹ dự phòng vì tiền vào nhanh ra cũng nhanh.",
    "TỬ TỨC": "Con cái hoạt bát, lanh lợi, tính tình nhanh nhảu; sớm tự lập và có xu hướng đi xa lập nghiệp từ thời trẻ.",
    "PHU THÊ": "Nhân duyên đến bất ngờ nhanh chóng, có thể quyết định hôn nhân chóng vánh; vợ chồng tránh lời qua tiếng lại lúc nóng giận.",
    "HUYNH ĐỆ": "Anh em sống năng động, mỗi người tự lập phát triển một phương, khi có việc chung thì tề tựu phối hợp rất nhanh."
  },
  "Trực Phù": {
    "MỆNH": "Tính cách ngay thẳng, chính trực, hay chịu phần thiệt thòi về mình; giàu lòng trắc ẩn, hay gánh vác việc cho người khác nhưng ít khi được đền đáp tương xứng.",
    "PHỤ MẪU": "Cha mẹ đức độ, chịu thương chịu khó, cả đời hy sinh vì con cái; đương số cần hiếu kính phụng dưỡng chu đáo để đền ơn sinh thành.",
    "PHÚC ĐỨC": "Phúc trạch cần đương số tu tâm tích lũy; dòng họ có người xưa kia chịu oan khiên, nên năng làm việc thiện hồi hướng cho tổ tiên.",
    "ĐIỀN TRẠCH": "Mua bán nhà đất dễ bị thiệt thòi về giá hoặc vướng thủ tục chậm trễ; cần kiểm tra pháp lý kỹ lưỡng trước khi giao dịch.",
    "QUAN LỘC": "Làm việc mẫn cán tận tụy, gánh vác phần việc khó cho tập thể; nên giữ vững chuyên môn, tránh bị người khác cướp công.",
    "NÔ BỘC": "Tốt bụng với bạn bè nhưng dễ bị lợi dụng lòng tin, giúp người nhưng người dễ vong ân; cần học cách từ chối đúng lúc.",
    "THIÊN DI": "Ra ngoài hay bị người khác đố kỵ hoặc làm ơn mắc oán; cần giữ tâm vững vàng, không chấp vặt thị phi để giữ bình an.",
    "TẬT ÁCH": "Hay suy nhược cơ thể do làm việc quá sức và lo nghĩ nhiều; cần chú trọng nghỉ ngơi dưỡng tâm, giải tỏa áp lực tinh thần.",
    "TÀI BẠCH": "Kiếm tiền bằng mồ hôi nước mắt chính đáng, cẩn thận người khác vay mượn dây dưa không trả; tuyệt đối không đứng ra bảo lãnh tài chính.",
    "TỬ TỨC": "Con cái hiền lành, tính tình nhu thuận; cha mẹ cần bồi đắp cho con lòng tự tin và tính quyết đoán để vững bước vào đời.",
    "PHU THÊ": "Trong hôn nhân là người nhẫn nhịn, hy sinh vun vén cho tổ ấm; vợ chồng cần cởi mở giãi bày để tránh tích tụ uất ức thầm kín.",
    "HUYNH ĐỆ": "Thường phải đứng ra đỡ đần cho anh chị em trong nhà; gia đình cần sự phân định trách nhiệm công bằng để tránh thiệt thòi."
  },
  "Linh Tinh": {
    "MỆNH": "Âm Hỏa sát tinh tọa Mệnh: tính tình thâm trầm, cơ mưu sâu sắc, nghị lực can trường phi thường; song nội tâm hay u uất, dễ bộc phát cơn giận ngầm khó lường.",
    "PHỤ MẪU": "Mối quan hệ với cha mẹ có khoảng cách âm thầm, ít chia sẻ tâm sự; cha mẹ tính tình nghiêm khắc hoặc sức khỏe cha mẹ có giai đoạn suy yếu.",
    "PHÚC ĐỨC": "Tâm tư hay trăn trở ưu phiền, phúc ấm dòng họ có sự rạn nứt ngầm; nên tu dưỡng thiền định, phóng sinh để giải tỏa nghiệp chướng.",
    "ĐIỀN TRẠCH": "Nhà ở cần chú ý kiểm tra hệ thống điện ngầm, chống chập cháy; nơi ở cần giữ nhiều ánh sáng tự nhiên để xua tan khí âm.",
    "QUAN LỘC": "Môi trường làm việc nhiều áp lực ngầm và cạnh tranh gay gắt; thích hợp ngành kỹ thuật, nghiên cứu, điều tra, quân sự nơi đòi hỏi tính kỷ luật cao.",
    "NÔ BỘC": "Bạn bè dễ có người bằng mặt không bằng lòng, đố kỵ ngầm; không nên quá tin vào những lời hứa hẹn ngoài miệng.",
    "THIÊN DI": "Ra ngoài đề phòng tai nạn về sấm sét, điện giật, ngã đau bất ngờ trong đêm tối; cẩn trọng khẩu thiệt thị phi giấu mặt.",
    "TẬT ÁCH": "Chủ về bệnh thần kinh căng thẳng, mất ngủ kinh niên, bệnh gân cốt hoặc chứng nội nhiệt âm ỉ; cần duy trì lối sống lành mạnh.",
    "TÀI BẠCH": "Tiền tài biến động bất thường, đề phòng rủi ro tài chính âm thầm hao tổn; nên giữ tiền mặt an toàn, tránh đầu tư mạo hiểm.",
    "TỬ TỨC": "Nuôi dạy con cái cần kiên nhẫn cao độ, tránh đòn roi áp đặt khiến con bướng bỉnh ngầm; đồng hành cùng con vượt qua áp lực tuổi dậy thì.",
    "PHU THÊ": "Vợ chồng dễ rơi vào tình trạng \"chiến tranh lạnh\", khắc khẩu âm ỉ kéo dài; cần thẳng thắn trò chuyện để gỡ bỏ hiểu lầm.",
    "HUYNH ĐỆ": "Anh em ít khi tâm sự bộc bạch, dễ nảy sinh nghi kỵ ngầm; nên phân minh rõ ràng trong chuyện tiền bạc và thừa kế."
  },
  "Phá Toái": {
    "MỆNH": "Tính tình bướng bỉnh, độc lập, không cam chịu khuất phục; cuộc đời hay gặp những chuyện trắc trở vặt vãnh quấy nhiễu đòi hỏi sự kiên nhẫn vượt qua.",
    "PHỤ MẪU": "Cha mẹ và con cái đôi khi bất đồng quan điểm trong những chuyện nhỏ nhặt đời thường; cần sự mềm mỏng nhường nhịn.",
    "PHÚC ĐỨC": "Phúc trạch bị quấy nhiễu bởi những bất hòa nội bộ dòng họ; đương số nên là cầu nối hòa giải giữ gìn đoàn kết gia tộc.",
    "ĐIỀN TRẠCH": "Đồ đạc trong nhà hay bị hỏng hóc, nứt vỡ; sửa chữa nhà cửa dễ phát sinh chi phí vụn vặt ngoài dự kiến.",
    "QUAN LỘC": "Công việc dễ bị người khác phá ngang giữa chừng, tiểu nhân chọc gậy bánh xe làm chậm tiến độ; cần luôn có phương án B dự phòng.",
    "NÔ BỘC": "Bè bạn hay bàn lùi cản trở chí hướng; không nên chia sẻ quá sớm những ý tưởng kinh doanh chưa hoàn thiện.",
    "THIÊN DI": "Đi xa hay gặp phiền toái dọc đường, xe cộ trục trặc hoặc lỡ dở lịch trình; cần kiểm tra phương tiện cẩn thận trước chuyến đi.",
    "TẬT ÁCH": "Cẩn trọng các bệnh về răng miệng, cổ họng, amidan hoặc đường tiêu hóa; đề phòng trầy xước xây xát nhẹ ngoài da.",
    "TÀI BẠCH": "Tiền bạc dễ bị hao hụt nhỏ giọt vì các khoản chi tiêu lắt nhắt; cần quản lý chi tiêu chặt chẽ bằng sổ sách kỷ luật.",
    "TỬ TỨC": "Nuôi con thuở nhỏ vất vả vì con hay quấy sốt vặt; lớn lên con cái cá tính bướng bỉnh, cha mẹ cần mềm mỏng uốn nắn.",
    "PHU THÊ": "Vợ chồng hay cãi vã vì những chuyện vặt vãnh đời thường; cần học cách \"chuyện lớn hóa nhỏ, chuyện nhỏ hóa không\".",
    "HUYNH ĐỆ": "Anh em dễ bất hòa vì lời ăn tiếng nói vụng về; tránh để những va chạm nhỏ làm sứt mẻ tình cảm ruột thịt."
  },
  "Kình Dương": {
    "MỆNH": "Thanh kiếm sắc nhọn tọa Mệnh: tính cách dũng mãnh, cương trực, dám làm dám chịu; song tính khí nóng nảy quá mức dễ gây hình thương đao kiếm, phẫu thuật hoặc xô xát.",
    "PHỤ MẪU": "Cha mẹ tính tình cương cường, dễ khắc khẩu với con cái; đương số sớm rèn luyện tính tự lập, bôn ba ngoài xã hội.",
    "PHÚC ĐỨC": "Dòng họ có người theo binh nghiệp, võ nghiệp; phúc ấm có phần suy giảm do tính tình tổ tiên cương liệt, cần tích đức hành thiện.",
    "ĐIỀN TRẠCH": "Khu đất ở gần nơi sản xuất cơ khí, đường lớn đông đúc; cẩn thận tranh chấp ranh giới đất đai hoặc nứt nẻ công trình.",
    "QUAN LỘC": "Rất hợp ngành nghề quân đội, công an, tư pháp, phẫu thuật viên, cơ khí chế tạo; trong công việc là người tiên phong dám đương đầu sóng gió.",
    "NÔ BỘC": "Bạn bè dễ xảy ra mâu thuẫn tranh chấp nảy lửa; cẩn trọng kết giao với những kẻ liều lĩnh mang lại rắc rối pháp lý.",
    "THIÊN DI": "Ra ngoài bôn ba sóng gió, đề phòng tai nạn giao thông, va chạm kim khí xây xát; tránh tranh cãi hơn thua nơi công cộng.",
    "TẬT ÁCH": "Trên thân thể thường có vết sẹo phẫu thuật hoặc dấu vết dao kéo; cẩn thận bệnh về đầu, mắt, xương khớp hoặc trúng thương.",
    "TÀI BẠCH": "Kiếm tiền bằng sự táo bạo quyết đoán trong cạnh tranh khốc liệt; song tiền bạc vào nhanh ra nhanh, dễ bị phá tán nếu đầu cơ liều lĩnh.",
    "TỬ TỨC": "Khó nuôi con thuở sơ sinh, dễ phải sinh mổ; con cái sau này tính cách rất mạnh mẽ, can trường, dám nghĩ dám làm.",
    "PHU THÊ": "Vợ chồng tính khí đều cương trực, dễ nảy sinh khẩu chiến dữ dội; cần một người học cách nhẫn nhịn để gia đạo không bị gãy đổ.",
    "HUYNH ĐỆ": "Anh em tính tình độc lập, dễ xảy ra tranh chấp quyền lợi nếu không minh bạch; tốt nhất nên ở riêng để giữ hòa khí."
  },
  "Đà La": {
    "MỆNH": "Mũi khoan ngầm tọa Mệnh: tính tình thâm trầm, kiên nhẫn, mưu lược kín kẽ; song tính hay do dự, làm việc gì cũng trắc trở dây dưa lần lữa mới thành.",
    "PHỤ MẪU": "Cha mẹ có nỗi ưu tư thầm kín hoặc bệnh mãn tính kéo dài; mối quan hệ với con cái có khoảng cách trầm lặng.",
    "PHÚC ĐỨC": "Phúc trạch bị trì trệ, dòng họ có nhiều việc âm phần dây dưa chưa giải quyết; đương số gánh vác trách nhiệm tâm linh gia tộc.",
    "ĐIỀN TRẠCH": "Giấy tờ nhà đất thủ tục thường bị ách tắc kéo dài; nhà ở nơi ngõ cụt quanh co hoặc dễ bị ẩm mốc cần cải tạo.",
    "QUAN LỘC": "Sự nghiệp hay gặp cảnh tiến thoái lưỡng nan, tiểu nhân đố kỵ ngấm ngầm; cần sự kiên trì bền bỉ vượt qua giai đoạn đình đốn.",
    "NÔ BỘC": "Bạn bè nợ nần dây dưa khó đòi, đồng nghiệp ngấm ngầm cản trở; cẩn trọng hợp đồng hợp tác bị trì hoãn vô thời hạn.",
    "THIÊN DI": "Đi xa hay bị trục trặc thủ tục giấy tờ, hoãn chuyến; ra ngoài cần cẩn trọng đề phòng cạm bẫy lừa lọc ngầm.",
    "TẬT ÁCH": "Mắc các bệnh mãn tính kéo dài dai dẳng (răng miệng, tai mũi họng, xương khớp); cần điều trị kiên trì dứt điểm.",
    "TÀI BẠCH": "Nguồn tiền luân chuyển chậm, vốn liếng dễ bị ứ đọng; không nên cho vay mượn thiếu chứng từ rõ ràng.",
    "TỬ TỨC": "Chậm đường con cái hoặc sinh nở phải kiên trì chữa trị; con cái tính tình kín đáo, ít bộc lộ cảm xúc với cha mẹ.",
    "PHU THÊ": "Nhân duyên muộn màng, chuyện tình cảm dễ vướng cảnh dùng dằng dở dang; vợ chồng cần bao dung tránh chiến tranh lạnh.",
    "HUYNH ĐỆ": "Anh em ít khi gần gũi, việc phân chia tài sản hoặc trách nhiệm gia đình thường kéo dài thiếu dứt khoát."
  },
  "Hỏa Tinh": {
    "MỆNH": "Dương Hỏa sát tinh: tính khí nóng như lửa, bộc trực, phản ứng nhanh như chớp; bạo phát bạo tàn, dễ nóng nảy mất kiểm soát nhưng không để bụng.",
    "PHỤ MẪU": "Cha mẹ tính tình nóng nảy, gia đạo dễ xảy ra to tiếng; đương số cần giữ thái độ điềm đạm, hiếu kính.",
    "PHÚC ĐỨC": "Phúc phần tiêu hao vì những cơn giận của tiền nhân; đương số cần tu tâm tích đức, ăn chay phóng sinh để hạ hỏa tiêu nghiệp.",
    "ĐIỀN TRẠCH": "Nhà ở cần tuyệt đối cẩn trọng phòng cháy nổ, chập điện; nhà ở nơi khô nóng hoặc gần cơ sở hàn nhiệt.",
    "QUAN LỘC": "Thăng tiến cực nhanh khi gặp đúng thời cơ bùng nổ; nhưng đề phòng bị giáng chức bất ngờ vì những quyết định bốc đồng.",
    "NÔ BỘC": "Bạn bè dễ xảy ra xô xát to tiếng, tình cảm nhanh nóng nhanh lạnh; cẩn trọng khẩu chiến trên mạng xã hội.",
    "THIÊN DI": "Ra ngoài cẩn thận tai nạn về lửa, điện, bỏng nhiệt hoặc cãi vã to tiếng nơi đông người.",
    "TẬT ÁCH": "Dễ mắc bệnh sốt cao co giật, viêm nhiễm cấp tính, bệnh tim mạch, huyết áp hoặc mẩn ngứa bốc hỏa.",
    "TÀI BẠCH": "Tiền tài đến bất ngờ nhưng tiêu tán cũng như gió cuốn; tuyệt đối tránh đầu cơ cờ bạc đỏ đen kẻo cháy túi trong chớp mắt.",
    "TỬ TỨC": "Sinh nở và nuôi con thuở nhỏ nhiều phen thót tim vì con sốt cao; con cái tính tình bộc trực, nóng nảy cần rèn chữ Nhẫn.",
    "PHU THÊ": "Vợ chồng dễ cãi cọ nảy lửa vì chuyện không đâu; cần nguyên tắc \"một người nóng một người phải nhịn\" để giữ tổ ấm.",
    "HUYNH ĐỆ": "Anh em dễ bất hòa to tiếng, tranh chấp thiếu bình tĩnh; nên ở riêng để tránh chạm mặt lúc nóng giận."
  },
  "Địa Không": {
    "MỆNH": "Lỗ đen vũ trụ: tư duy dị biệt vượt thời đại, sáng tạo phi thường, dám dấn thân con đường mới; song cuộc đời phải trải qua phen thăng trầm trắng tay mới đạt đại nghiệp.",
    "PHỤ MẪU": "Gia đình thuở nhỏ dễ gặp biến cố tài chính hoặc song thân phân ly; đương số sớm rèn đúc ý chí tự lập kiên cường.",
    "PHÚC ĐỨC": "Phúc nghiệp dòng họ trải qua nhiều biến cố chìm nổi; đương số cần hướng thiện sâu sắc, tạo dựng âm đức cho hậu thế.",
    "ĐIỀN TRẠCH": "Điền sản biến động mạnh, có thể tay trắng làm nên cơ ngơi nhưng cũng đề phòng mất nhà đất vì rủi ro vỡ nợ.",
    "QUAN LỘC": "Đột phá xuất thần trong các ngành nghề mới, công nghệ, nghệ thuật phá cách; cần giữ vững tính pháp lý để tránh sụp đổ dự án.",
    "NÔ BỘC": "Bạn bè phức tạp, dễ bị đồng minh phản bội rút củi đáy nồi lúc lâm nguy; cẩn trọng trong việc chọn người hợp tác.",
    "THIÊN DI": "Ra ngoài gặp môi trường đầy biến động bất ngờ; cơ hội đổi đời lớn nhưng cạm bẫy rủi ro cũng khôn lường.",
    "TẬT ÁCH": "Bệnh tật xuất hiện bất ngờ, các chứng bệnh kỳ lạ khó chẩn đoán; cẩn thận tai nạn trên cao hoặc ngộ độc thuốc.",
    "TÀI BẠCH": "Tiền tài như thủy triều lên xuống dữ dội; kiếm tiền tỷ bất ngờ nhưng phá tán cũng chớp mắt; tuyệt đối tránh đòn bẩy tài chính.",
    "TỬ TỨC": "Con cái tính cách dị biệt, tư duy độc lập khác người; cha mẹ cần làm bạn thấu hiểu thay vì áp đặt theo lối cũ.",
    "PHU THÊ": "Tình duyên nhiều phen sóng gió ly kỳ; hôn nhân cần sự bao dung và thấu hiểu phi thường để không đứt gánh giữa đường.",
    "HUYNH ĐỆ": "Anh em có người gặp hoàn cảnh thăng trầm lớn; cần hỗ trợ nhau nhưng phải rạch ròi về mặt tài chính."
  },
  "Địa Kiếp": {
    "MỆNH": "Cơn sóng thần sát phạt: tham vọng lớn, dám liều lĩnh làm việc kinh thiên động địa; cuộc đời nhiều phen lên voi xuống chó, bạo phát bạo tàn.",
    "PHỤ MẪU": "Cha mẹ có giai đoạn kinh tế lao đao hoặc duyên phận trắc trở; đương số từ nhỏ đã phải tự lực cánh sinh bươn chải.",
    "PHÚC ĐỨC": "Dòng họ có nghiệp sát sâu nặng; đương số cần năng làm việc thiện, phóng sinh cứu vật, hướng Phật để giải nghiệp cho dòng tộc.",
    "ĐIỀN TRẠCH": "Cẩn trọng mất nhà mất đất vì tranh chấp lừa gạt hoặc vỡ nợ bất ngờ; không bao giờ lấy sổ đỏ đi bảo lãnh cho người khác.",
    "QUAN LỘC": "Sự nghiệp thăng hoa tột bậc nhờ thời thế nhưng đề phòng cú ngã ngựa đau đớn; cần có phương án lui an toàn khi ở đỉnh cao.",
    "NÔ BỘC": "Dễ bị tiểu nhân đâm lén sau lưng, cấp dưới phản trắc; không chia sẻ bí mật kinh doanh cho bất kỳ ai.",
    "THIÊN DI": "Ra ngoài đề phòng cướp giật, tai nạn xe cộ hoặc rủi ro bất trắc trên đường đi; xuất hành luôn cẩn trọng.",
    "TẬT ÁCH": "Dễ mắc bệnh hiểm nghèo phát tác cấp tính, tai nạn đổ máu hoặc bệnh về máu huyết; cần khám sức khỏe định kỳ nghiêm cẩn.",
    "TÀI BẠCH": "Đầu cơ mạo hiểm dễ tán gia bại sản trong phút chốc; tiền kiếm được nên chuyển thành tài sản cứng để giữ của.",
    "TỬ TỨC": "Nuôi dạy con cái gặp nhiều trắc trở thuở đầu; con cái cá tính bướng bỉnh khó bảo, cần rèn luyện đạo đức từ tấm bé.",
    "PHU THÊ": "Hôn nhân dễ gãy đổ vì những biến cố bất ngờ hoặc sự chen chân của kẻ xấu; vợ chồng cần tuyệt đối chung thủy và minh bạch.",
    "HUYNH ĐỆ": "Anh em dễ có người phá phách làm liên lụy gia đình; cần dứt khoát ranh giới trách nhiệm để bảo vệ nhau."
  },
  "Thiên Hình": {
    "MỆNH": "Thanh đao công lý: kỷ luật sắt đá, chí công vô tư, ngay thẳng nghiêm cẩn; cẩn trọng tính hà khắc hoặc hình thương dao kéo trên người.",
    "PHỤ MẪU": "Cha mẹ nghiêm khắc gia giáo; kỷ luật gia đình chuẩn mực, hướng con cái theo con đường chính đạo.",
    "PHÚC ĐỨC": "Tổ phụ có người làm quan tòa, tư pháp hoặc tử trận vì nghĩa vụ; phúc đức đòi hỏi sự nghiêm cẩn tu dưỡng đạo đức.",
    "ĐIỀN TRẠCH": "Nhà cửa ngăn nắp trật tự; cẩn thận tranh chấp giấy tờ pháp lý nhà đất, cần tuân thủ luật pháp nghiêm ngặt.",
    "QUAN LỘC": "Đắc cách trong ngành luật sư, kiểm sát, thẩm phán, công an, bác sĩ phẫu thuật; làm việc liêm khiết được người đời kính nể.",
    "NÔ BỘC": "Bạn bè quan hệ sòng phẳng minh bạch; tránh dính líu đến những người vi phạm pháp luật kẻo vạ lây.",
    "THIÊN DI": "Ra ngoài giữ gìn luật lệ giao thông và quy định sở tại nghiêm túc; cẩn thận va chạm đao kiếm hoặc bị phạt hành chính.",
    "TẬT ÁCH": "Chắc chắn trên người có vết tích dao kéo phẫu thuật hoặc vết sẹo rõ ràng; cẩn thận bệnh về gan mật, xương khớp.",
    "TÀI BẠCH": "Tiền tài minh bạch từ công sức trí tuệ chính trực; tuyệt đối không kiếm tiền phi pháp để tránh vòng lao lý.",
    "TỬ TỨC": "Dạy dỗ con cái theo kỷ cương phép tắc nghiêm ngặt; con cái sau này có người thành danh trong ngành tư pháp quân đội.",
    "PHU THÊ": "Bạn đời là người nguyên tắc, nghiêm nghị; vợ chồng cần tạo không khí mềm mại ấm cúng, tránh quá khắt khe với nhau.",
    "HUYNH ĐỆ": "Anh em giữ gìn gia phong nề nếp, cư xử đúng mực tôn ti trật tự."
  },
  "Cô Thần": {
    "MỆNH": "Tính tình độc lập, thích một mình suy ngẫm, khó trải lòng với người khác; nội tâm cô đơn dù ở giữa chốn phồn hoa náo nhiệt.",
    "PHỤ MẪU": "Ít khi tâm sự cùng cha mẹ; sớm sống xa cách song thân để theo đuổi lý tưởng độc lập.",
    "PHÚC ĐỨC": "Dòng họ hiếm đinh hoặc có người tu hành độc thân; bản thân có duyên sâu dày với đạo pháp và sự thanh tịnh.",
    "ĐIỀN TRẠCH": "Thích ở nhà rộng một mình hoặc nơi yên tĩnh biệt lập; giữ gìn tài sản nhà đất rất chắc chắn, ít khi bị hao hụt.",
    "QUAN LỘC": "Rất giỏi nghiên cứu chuyên môn sâu, làm việc độc lập đạt đỉnh cao chuyên gia; không màng bè phái chốn công sở.",
    "NÔ BỘC": "Bạn bè tri kỷ đếm trên đầu ngón tay; không thích xã giao ồn ào vô bổ.",
    "THIÊN DI": "Ra ngoài thường thích tự lực cánh sinh, đi một mình; không thích dựa dẫm hay nhờ vả ai.",
    "TẬT ÁCH": "Dễ mắc bệnh trầm cảm, âu lo nội tâm hoặc bệnh về tai, khí huyết kém lưu thông do thiếu giao tiếp.",
    "TÀI BẠCH": "Biết cách thắt chặt chi tiêu, giữ tiền rất giỏi; tiền vào túi là giữ chặt như khóa sắt, tích lũy vững vàng.",
    "TỬ TỨC": "Ít con hoặc con cái sau này có tính cách trầm lặng, sớm đi xa lập nghiệp sống độc lập.",
    "PHU THÊ": "Vợ chồng dễ thiếu sự chia sẻ tâm tư tình cảm; cần học cách mở lòng tâm sự và hâm nóng tình cảm thường xuyên.",
    "HUYNH ĐỆ": "Anh em mỗi người một phương, ít khi tụ họp chuyện trò nhưng vẫn giữ sự tôn trọng lẫn nhau."
  },
  "Quả Tú": {
    "MỆNH": "Khép kín tâm tư, duyên phận muộn màng, tự tay xây đắp giang sơn; ý thức tự lập cao độ, không thích nợ ân tình của ai.",
    "PHỤ MẪU": "Tình cảm với cha mẹ sâu nặng nhưng khó biểu lộ thành lời; thường âm thầm phụng dưỡng chăm lo cho cha mẹ.",
    "PHÚC ĐỨC": "Dòng họ có người phụ nữ goá bụa hoặc sống độc thân tích đức; bản thân hưởng phúc thanh nhàn khi về già.",
    "ĐIỀN TRẠCH": "Nhà cửa kín cổng cao tường, thích không gian riêng tư tuyệt đối; quản lý tài sản điền sản rất chặt chẽ.",
    "QUAN LỘC": "Tập trung cao độ cho công việc chuyên môn, tính tình kiên trì tỉ mỉ; thích hợp nghề đòi hỏi sự tập trung đơn độc.",
    "NÔ BỘC": "Khó kết thân với người lạ, chỉ tin cậy một vài người bạn cố tri lâu năm; cảnh giác cao độ trong giao tiếp.",
    "THIÊN DI": "Ra ngoài giữ mình cẩn mật, ít giao tiếp bừa bãi; tránh được nhiều thị phi rắc rối nơi công cộng.",
    "TẬT ÁCH": "Đề phòng chứng u uất tâm can, bệnh về tử cung buồng trứng (với nữ) hoặc bệnh tuyến tiền liệt (với nam).",
    "TÀI BẠCH": "Chi tiêu chắt chiu kỷ luật, không bao giờ vung tay quá trán; tích lũy tiền bạc đều đặn và chắc chắn.",
    "TỬ TỨC": "Muộn đường sinh nở hoặc ít con; con cái tính tình ngoan ngoãn nhưng ít bộc lộ tình cảm với cha mẹ.",
    "PHU THÊ": "Hôn nhân chậm muộn mới bền; vợ chồng cần tạo sự gắn kết bằng những chuyến du lịch riêng tư để thấu hiểu nhau.",
    "HUYNH ĐỆ": "Anh em sống cách biệt, ít can thiệp vào cuộc sống riêng của nhau."
  },
  "Đại Hao": {
    "MỆNH": "Tư tưởng phóng khoáng, thích ngao du bốn bể, chi tiêu rộng rãi không tiếc tay; có tầm nhìn kinh doanh vĩ mô nhưng cẩn trọng hao tán tiền của.",
    "PHỤ MẪU": "Cha mẹ đầu tư hào phóng cho con cái ăn học phát triển; gia đình tiền bạc luân chuyển liên tục.",
    "PHÚC ĐỨC": "Mồ mả tổ tiên gần nơi sông nước lớn chảy xiết; dòng họ nhiều người ly hương phát tài nơi đất khách quê người.",
    "ĐIỀN TRẠCH": "Hay thay đổi sửa chữa nhà cửa; mua bán bất động sản thường xuyên, khó giữ nguyên vẹn đất đai tổ tiên để lại.",
    "QUAN LỘC": "Thích hợp ngành kinh doanh xuất nhập khẩu, du lịch, truyền thông, tài chính quốc tế; công việc hay có sự di chuyển.",
    "NÔ BỘC": "Chi tiêu hao tốn nhiều tiền bạc vì bạn bè, hay bao đãi người khác; cẩn thận bị lợi dụng sự hào phóng.",
    "THIÊN DI": "Càng đi xa càng mở rộng tầm mắt, thích xuất ngoại du lịch; tiền bạc tiêu pha trên đường thiên lý rất nhiều.",
    "TẬT ÁCH": "Dùng tiền giải trừ được nhiều ách nạn bệnh tật; cẩn trọng các bệnh về đường tiêu hóa, đại tràng, dạ dày.",
    "TÀI BẠCH": "Cung Tài gặp Đại Hao là thế tiền vào như thác mà ra như lũ! Kinh doanh dòng tiền lớn nhưng phải biết chuyển hóa thành tài sản cứng.",
    "TỬ TỨC": "Đầu tư chi phí khổng lồ cho con cái học tập phát triển; con cái sau này dễ đi du học và thành danh ở nước ngoài.",
    "PHU THÊ": "Vợ chồng tiêu xài thoải mái, thích cùng nhau đi du lịch trải nghiệm; cần một người giữ tay hòm chìa khóa kỷ luật.",
    "HUYNH ĐỆ": "Anh em sống cởi mở, thường xuyên tụ họp chiêu đãi nhau vui vẻ; sẵn sàng giúp nhau tài chính khi gặp khó."
  },
  "Tiểu Hao": {
    "MỆNH": "Tính tình linh hoạt, thích mua sắm lặt vặt, tiền bạc hay hao hụt nhỏ giọt; người năng động, thích xê dịch đổi mới.",
    "PHỤ MẪU": "Cha mẹ hay tốn kém những khoản chi tiêu nhỏ cho gia đình; tình cảm gia đạo vui vẻ cởi mở.",
    "PHÚC ĐỨC": "Dòng họ phân tán, có người đi làm ăn xa; phúc phần cần duy trì bằng những việc thiện nguyện nhỏ hàng ngày.",
    "ĐIỀN TRẠCH": "Nhà cửa hay phải thay mới đồ dùng, nội thất lặt vặt; phong thủy cần giữ cửa nẻo kín đáo để tụ khí tài lộc.",
    "QUAN LỘC": "Công việc cần sự đổi mới linh hoạt, thích hợp marketing, bán lẻ, dịch vụ; hay phát sinh chi phí giao tế.",
    "NÔ BỘC": "Tốn tiền cho các cuộc gặp gỡ bạn bè cà phê ăn uống lặt vặt; nên cân đối ngân sách xã giao hợp lý.",
    "THIÊN DI": "Ra ngoài hay mua sắm quà cáp, thích đi đây đi đó khám phá; xuất hành cần bảo quản tư trang cẩn thận.",
    "TẬT ÁCH": "Hay ốm vặt, viêm họng hoặc rối loạn tiêu hóa nhẹ; tốn tiền mua thuốc men bồi bổ thường xuyên.",
    "TÀI BẠCH": "Hay bị mất mát tiền bạc lặt vặt hoặc mua sắm không cần thiết; cần thói quen ghi chép chi tiêu để tránh thủng ví.",
    "TỬ TỨC": "Tốn kém tiền bạc mua sắm đồ chơi, quần áo bồi dưỡng cho con cái; con cái tính tình hoạt bát nhanh nhẹn.",
    "PHU THÊ": "Vợ chồng hay mua sắm tặng quà nhau; cần thống nhất kế hoạch tiết kiệm chung cho gia đình.",
    "HUYNH ĐỆ": "Anh em hay qua lại thăm hỏi, tặng quà cáp giúp đỡ nhau những việc nhỏ trong cuộc sống."
  },
  "Bạch Hổ": {
    "MỆNH": "Bạch Hổ uy phong tọa Mệnh: tính cách kiên cường, dũng cảm, có khí phách gánh vác trọng trách lớn; song cuộc đời hay mang ưu tư sâu kín, cẩn trọng tai nạn máu huyết.",
    "PHỤ MẪU": "Cha mẹ có người chịu nhiều gian truân hoặc sức khỏe kém; đương số sớm phải chia sẻ nỗi lo toan gia đình.",
    "PHÚC ĐỨC": "Dòng họ có người hy sinh vì việc đại nghĩa; bản thân có năng lực cảm ứng tâm linh mạnh mẽ, hưởng phúc khi làm việc thiện.",
    "ĐIỀN TRẠCH": "Nhà ở cần chú ý phong thủy trấn sát; nơi ở nên sạch sẽ, ấm cúng và tránh xung sát góc nhọn.",
    "QUAN LỘC": "Thích hợp ngành nghề pháp luật, y khoa, quân đội, cứu hộ; có tài hùng biện đanh thép và tinh thần trách nhiệm cao độ.",
    "NÔ BỘC": "Bạn bè có người gặp hoạn nạn cần đến sự cứu giúp của đương số; cẩn trọng rước chuyện ưu phiền vào thân.",
    "THIÊN DI": "Ra ngoài đi đứng cẩn thận tai nạn đổ máu, trầy xước; tránh trêu chọc súc vật dữ hoặc đi vào nơi nguy hiểm.",
    "TẬT ÁCH": "Chủ về bệnh máu huyết, huyết áp, xương khớp hoặc thương tích đổ máu; nữ giới cẩn trọng bệnh sản phụ khoa.",
    "TÀI BẠCH": "Kiếm tiền bằng mồ hôi nước mắt từ những công việc gian khổ, áp lực; có thể đắc tài từ ngành y tế, bảo hiểm, pháp lý.",
    "TỬ TỨC": "Việc sinh nở thuở đầu gặp nhiều lo lắng, cần kiêng cữ kỹ càng; con cái sau này có tính cách can trường, có tài năng lãnh đạo.",
    "PHU THÊ": "Vợ chồng cùng nhau đồng cam cộng khổ vượt qua sóng gió mới gắn bó trọn đời; cần chia sẻ gánh nặng tâm lý cho nhau.",
    "HUYNH ĐỆ": "Trong anh em có người chịu thiệt thòi, đương số luôn là điểm tựa tinh thần vững vàng cho anh chị em."
  },
  "Tang Môn": {
    "MỆNH": "Nỗi ưu tư sâu kín tọa Mệnh: tấm lòng nhân hậu, hay lo nghĩ xa xôi cho gia đình người thân; trong lòng thường chất chứa nỗi buồn thế sự.",
    "PHỤ MẪU": "Cha mẹ sức khỏe suy giảm hoặc cuộc đời chịu nhiều vất vả; đương số luôn canh cánh lòng hiếu nghĩa phụng dưỡng.",
    "PHÚC ĐỨC": "Dòng họ có nhiều chuyện sầu bi trong quá khứ; đương số cần chăm sóc mồ mả tổ tiên chu đáo để tăng cường phúc trạch.",
    "ĐIỀN TRẠCH": "Nhà ở cần nhiều ánh sáng mặt trời để tăng dương khí; cẩn thận việc mua bán nhà đất vướng chuyện buồn phiền.",
    "QUAN LỘC": "Sự nghiệp buổi đầu gặp nhiều lo toan trăn trở; thích hợp các ngành nghề cứu trợ, từ thiện, bảo hiểm, y dược.",
    "NÔ BỘC": "Bạn bè hay tìm đến tâm sự trút nỗi buồn; cẩn thận bị lây lan năng lượng tiêu cực u sầu từ người khác.",
    "THIÊN DI": "Ra ngoài hay có chuyện lo lắng không yên tâm; đi xa nên thắp hương cầu an gia hộ bình an.",
    "TẬT ÁCH": "Dễ mắc chứng trầm cảm, suy nhược thần kinh, bệnh về tim mạch hoặc huyết khí hư hao; cần giữ tinh thần an vui.",
    "TÀI BẠCH": "Kiếm tiền không màng vụ lợi, tiền bạc hay phải chi dùng cho việc lo toan gia quyến hoặc ma chay giỗ chạp.",
    "TỬ TỨC": "Nuôi con thuở nhỏ phải lo âu nhiều vì con ốm sốt; cần bồi dưỡng thể chất và động viên tinh thần con cái.",
    "PHU THÊ": "Hôn nhân có giai đoạn trắc trở buồn phiền; vợ chồng cần đồng lòng san sẻ nỗi niềm, tránh giữ ấm ức trong lòng.",
    "HUYNH ĐỆ": "Anh em có người gặp hoàn cảnh éo le cần đương số dang tay cưu mang giúp đỡ."
  },
  "Đào Hoa": {
    "MỆNH": "Duyên ngầm quyến rũ, tài hoa đa nghệ, thu hút lòng người; cuộc đời gặp nhiều vận may nhờ các mối nhân duyên tốt lành.",
    "PHỤ MẪU": "Cha mẹ đẹp đôi, hòa thuận yêu thương nhau; con cái thừa hưởng nét đẹp và khiếu thẩm mỹ từ song thân.",
    "PHÚC ĐỨC": "Dòng họ nhiều người tài hoa hiển đạt, con cháu đời sau lấy được vợ chồng danh giá giàu sang.",
    "ĐIỀN TRẠCH": "Nhà cửa bài trí đẹp mắt, hoa lệ, ngập tràn sức sống; xóm giềng có nhiều người trẻ trung thanh nhã.",
    "QUAN LỘC": "Công danh phát triển rực rỡ trong các ngành nghệ thuật, làm đẹp, quan hệ công chúng, thời trang, ngoại giao.",
    "NÔ BỘC": "Nhiều người ái mộ theo đuổi, bạn bè khác phái hết lòng tương trợ; nhân duyên xã hội vô cùng rộng mở.",
    "THIÊN DI": "Ra ngoài luôn được chào đón nồng nhiệt, đi đâu cũng có người giúp đỡ; dễ kết duyên lành nơi đất khách.",
    "TẬT ÁCH": "Tinh thần lạc quan xua tan bệnh tật; tuy nhiên cẩn trọng các bệnh về sinh dục, máu huyết hoặc hệ bài tiết.",
    "TÀI BẠCH": "Kiếm tiền từ các ngành nghề liên quan đến cái đẹp, thị hiếu công chúng, dịch vụ; tài lộc sinh sôi từ sự duyên dáng.",
    "TỬ TỨC": "Sinh con khôi ngô tuấn tú, thông minh ngoan ngoãn; con cái có năng khiếu nghệ thuật bẩm sinh xuất sắc.",
    "PHU THÊ": "Bạn đời xinh đẹp, duyên dáng, lãng mạn; vợ chồng cần giữ gìn sự chung thủy son sắt để tránh đào hoa ngoài luồng.",
    "HUYNH ĐỆ": "Anh chị em đẹp đẽ, tài năng, có cuộc sống hôn nhân hạnh phúc hoặc sớm thành đạt trong sự nghiệp."
  },
  "Hồng Loan": {
    "MỆNH": "Tính tình thanh nhã, đoan trang, giàu lòng nhân ái; tâm hồn hướng thiện, dung mạo thanh tú, cả đời hưởng nhiều niềm vui tao nhã.",
    "PHỤ MẪU": "Cha mẹ sống hòa mục, có đời sống tinh thần phong phú; con cái được nuôi dạy trong tình yêu thương ấm áp.",
    "PHÚC ĐỨC": "Hưởng trọn phúc đức thanh cao của tổ tiên; dòng họ nhiều người có học thức và nhân duyên tốt lành.",
    "ĐIỀN TRẠCH": "Nhà ở phong thủy ấm áp, tràn ngập sinh khí; thường có khu vườn hoa hoặc không gian nghệ thuật thư thái.",
    "QUAN LỘC": "Sự nghiệp thăng tiến nhờ đức tính trung thực, nhã nhặn; được đồng nghiệp và cấp trên tin cậy yêu quý.",
    "NÔ BỘC": "Bạn bè chân thành, quan hệ xã hội trong sáng; luôn nhận được sự giúp đỡ chí tình khi gặp khó khăn.",
    "THIÊN DI": "Ra ngoài có duyên lành dẫn lối, đi đến đâu cũng được người đời quý mến; xuất hành luôn mang lại hỷ khí.",
    "TẬT ÁCH": "Giải trừ ách nạn bệnh tật rất tốt; nữ giới cần chú ý giữ gìn sức khỏe thai sản và kinh nguyệt điều hòa.",
    "TÀI BẠCH": "Nguồn tiền tài chính đáng, kiếm tiền thanh nhàn bằng uy tín và cái duyên lành trong công việc.",
    "TỬ TỨC": "Con cái hiếu thảo, tính tình nết na thùy mị; sau này hôn nhân êm ấm làm rạng danh song thân.",
    "PHU THÊ": "Hôn nhân đại cát, vợ chồng tương kính như tân; bạn đời là người đức hạnh, hòa hợp cả về tâm hồn lẫn thể xác.",
    "HUYNH ĐỆ": "Anh chị em hòa thuận thương yêu nhau, trong nhà luôn ngập tràn tiếng cười và sự đoàn kết."
  },
  "Thiên Hỷ": {
    "MỆNH": "Nụ cười luôn nở trên môi, tính tình vui tươi hỷ xả, đem lại nguồn năng lượng tích cực cho mọi người xung quanh.",
    "PHỤ MẪU": "Gia đình luôn có tin vui hỷ sự, cha mẹ vui vẻ sống lâu cùng con cháu; không khí gia đạo rộn rã.",
    "PHÚC ĐỨC": "Âm đức dòng họ dồi dào, phúc lộc trường cửu; con cháu đời đời hưởng niềm vui và may mắn.",
    "ĐIỀN TRẠCH": "Nhà cửa luôn có khách quý tới thăm, gia đạo hay tổ chức tiệc tùng ăn mừng hỷ tín.",
    "QUAN LỘC": "Công việc thuận lợi hanh thông, thường xuyên đón nhận tin vui thăng chức, khen thưởng hoặc hoàn thành xuất sắc dự án.",
    "NÔ BỘC": "Bạn bè vui vẻ nhiệt thành, mang lại niềm vui và cơ hội hợp tác vui vẻ đôi bên cùng có lợi.",
    "THIÊN DI": "Ra ngoài gặp nhiều chuyện vui bất ngờ, xuất hành đón tài đón lộc; đi đâu cũng gặp may mắn.",
    "TẬT ÁCH": "Giải trừ bệnh tật rất mạnh, tinh thần phấn chấn xua tan mọi mầm mống ốm đau; sức khỏe dồi dào.",
    "TÀI BẠCH": "Tài lộc đến từ những cơ hội vui vẻ, buôn bán đắt hàng; thường có lộc ăn uống và tiền thưởng bất ngờ.",
    "TỬ TỨC": "Dễ sinh thêm con cháu, tin vui con cái liên tiếp; con cái tính tình vui vẻ, hoạt bát mang lại phúc khí cho cha mẹ.",
    "PHU THÊ": "Hôn nhân ngập tràn tiếng cười và sự đồng điệu; vợ chồng sớm đón nhận tin mừng thêm người thêm của.",
    "HUYNH ĐỆ": "Anh em hòa thuận, thường xuyên sum họp ăn mừng những thành công và sự kiện trọng đại của gia đình."
  },
  "Văn Xương": {
    "MỆNH": "Đệ nhất Khoa Giáp: tư chất thông minh xuất chúng, chữ nghĩa thanh thoát, bằng cấp sáng lạn, tư duy logic nhạy bén.",
    "PHỤ MẪU": "Cha mẹ là bậc trí thức nho nhã, có học vị cao hoặc làm việc trong ngành giáo dục văn hóa.",
    "PHÚC ĐỨC": "Dòng họ có truyền thống khoa bảng hiển hách, nhiều người đỗ đạt bảng vàng để lại danh thơm muôn đời.",
    "ĐIỀN TRẠCH": "Nhà có phòng đọc sách trang nhã, nhiều sách quý; xóm giềng có trình độ dân trí cao và văn minh.",
    "QUAN LỘC": "Con đường thi cử bằng cấp rộng mở, dễ thành danh trong ngành học thuật, giáo dục, báo chí, luật pháp, văn hóa.",
    "NÔ BỘC": "Kết giao với các bậc học rộng tài cao, đàm đạo văn chương triết lý; cấp dưới có trình độ chuyên môn giỏi.",
    "THIÊN DI": "Ra ngoài được kính trọng về học vấn và sự hiểu biết uyên bác; dễ thành công khi đi thi cử hoặc công tác xa.",
    "TẬT ÁCH": "Tinh thần thông tuệ giải trừ bớt tai ương; cẩn thận tật về mắt hoặc đau đầu do đọc sách suy nghĩ nhiều.",
    "TÀI BẠCH": "Kiếm tiền bằng chất xám, bản quyền, sách báo, tư vấn trí tuệ; nguồn thu nhập thanh cao chính trực.",
    "TỬ TỨC": "Con cái học giỏi, thi đâu đỗ đó, tương lai đỗ đạt thủ khoa cử nhân làm rạng danh gia môn.",
    "PHU THÊ": "Bạn đời có học thức cao, hiểu biết đạo lý, biết lắng nghe và tôn trọng sự nghiệp của nhau.",
    "HUYNH ĐỆ": "Anh em đều là người có học vấn đàng hoàng, cư xử nhã nhặn đúng mực gia phong."
  },
  "Văn Khúc": {
    "MỆNH": "Tài nghệ cầm kỳ thi họa, khiếu thẩm mỹ tinh tế, giỏi giao tiếp và thấu hiểu tâm lý; tài hoa xuất chúng trong nghệ thuật.",
    "PHỤ MẪU": "Cha mẹ có tâm hồn nghệ sĩ hoặc có năng khiếu đặc biệt; con cái được nuôi dưỡng trong môi trường giàu cảm xúc.",
    "PHÚC ĐỨC": "Dòng họ nhiều người tài hoa phong nhã; bản thân có năng lực cảm thụ nghệ thuật và trực giác tâm linh nhạy bén.",
    "ĐIỀN TRẠCH": "Nhà ở bài trí giàu tính nghệ thuật, thẩm mỹ thanh tao; không gian sống mang lại nhiều cảm hứng sáng tạo.",
    "QUAN LỘC": "Thành công rực rỡ trong các ngành nghệ thuật, truyền thông, thiết kế, biểu diễn hoặc ngoại giao đàm phán.",
    "NÔ BỘC": "Bạn bè nhiều người tài hoa, giỏi thi ca nhạc họa; giao tiếp xã hội tinh tế được mọi người mến mộ.",
    "THIÊN DI": "Ra ngoài nổi danh tài hoa, đi đến đâu cũng được tán thưởng; dễ gặt hái thành công lớn trên sân khấu cuộc đời.",
    "TẬT ÁCH": "Sức khỏe tinh thần thư thái giúp giải trừ bệnh tật; cẩn trọng bệnh về đường hô hấp hoặc hệ thần kinh nhạy cảm.",
    "TÀI BẠCH": "Kiếm tiền từ tài năng nghệ thuật, sáng tạo nội dung hoặc kỹ năng giao tiếp tinh tế; tiền bạc đến nhẹ nhàng.",
    "TỬ TỨC": "Con cái có năng khiếu nghệ thuật bẩm sinh, ăn nói có duyên; sau này có thể trở thành người nổi tiếng được công chúng yêu mến.",
    "PHU THÊ": "Bạn đời lãng mạn, tài hoa, có tâm hồn đồng điệu; cuộc sống hôn nhân thi vị, giàu cảm xúc ngọt ngào.",
    "HUYNH ĐỆ": "Anh chị em khéo léo, có tài nghệ, luôn biết tạo không khí ấm áp và gắn kết trong gia đình."
  },
  "Thiên Mã": {
    "MỆNH": "Chiến mã phi nước đại: nghị lực vươn lên mạnh mẽ, năng động xông xáo, thích bôn ba xuất ngoại, phát tài trên đường thiên lý.",
    "PHỤ MẪU": "Cha mẹ hay phải đi công tác xa hoặc định cư nơi đất khách; con cái sớm học tính tự lập từ nhỏ.",
    "PHÚC ĐỨC": "Mồ mả tổ tiên gần đường cái lớn hoặc dòng họ nhiều người ly hương phát phúc lập nghiệp nơi phương xa.",
    "ĐIỀN TRẠCH": "Sở hữu nhiều nhà đất ở các nơi khác nhau; thường xuyên thay đổi hoặc nâng cấp nơi cư ngụ rộng rãi hơn.",
    "QUAN LỘC": "Công việc đòi hỏi di chuyển nhiều, thích hợp ngành vận tải, hàng không, du lịch, xuất nhập khẩu, ngoại giao.",
    "NÔ BỘC": "Bạn bè khắp bốn phương trời, nhiều mối quan hệ quốc tế hoặc ở các tỉnh thành xa; hợp tác kinh doanh năng động.",
    "THIÊN DI": "Cung Thiên Di đắc Thiên Mã là tuyệt hảo: càng đi xa càng phát đạt, xuất ngoại định cư hoặc du học mở ra cơ đồ lớn.",
    "TẬT ÁCH": "Chủ về bệnh ở chân tay, gân cốt hoặc tai nạn xe cộ khi di chuyển; cần chú ý an toàn giao thông.",
    "TÀI BẠCH": "Tiền bạc kiếm được trên những chuyến đi xa, kinh doanh lưu thông tiền tệ nhanh; càng bôn ba càng nhiều tài lộc.",
    "TỬ TỨC": "Con cái sinh ra năng động, hiếu động; lớn lên sớm đi du học hoặc lập nghiệp ở xa gia đình.",
    "PHU THÊ": "Người phối ngẫu ở xa quê hương hoặc cưới xin nơi đất khách; vợ chồng hay cùng nhau đi công tác du lịch.",
    "HUYNH ĐỆ": "Anh em mỗi người lập nghiệp ở một phương trời xa xôi, nhưng khi cần vẫn luôn hướng về nhau."
  },
  "Ân Quang": {
    "MỆNH": "Được thần linh và tổ tiên che chở, tính tình nhân hậu hiền lương, luôn biết ơn và đền đáp; gặp đại nạn đều có quý nhân cứu trợ.",
    "PHỤ MẪU": "Cha mẹ đức độ hiền từ, hết lòng che chở yêu thương; đương số luôn tròn đạo hiếu kính phụng dưỡng.",
    "PHÚC ĐỨC": "Âm phúc tổ tiên sáng ngời che chở con cháu muôn đời; dòng họ nhiều người làm việc thiện để lại phúc đức trường tồn.",
    "ĐIỀN TRẠCH": "Nhà ở phong thủy an lành, nơi thờ cúng trang nghiêm linh ứng; gia đạo luôn được bình an che chở.",
    "QUAN LỘC": "Sự nghiệp hanh thông nhờ làm việc chính trực, có lương tâm; luôn được cấp trên tín nhiệm giao phó trọng trách.",
    "NÔ BỘC": "Bạn bè trung thành, luôn nhớ ơn và đền ơn; người mình từng giúp đỡ sau này sẽ quay lại cứu nguy đắc lực.",
    "THIÊN DI": "Ra ngoài luôn gặp người tốt cưu mang giúp đỡ; đi xa gặp nạn có người cứu vớt tai qua nạn khỏi kỳ diệu.",
    "TẬT ÁCH": "Giải trừ bệnh tật cực mạnh, gặp thầy gặp thuốc chữa khỏi những căn bệnh hiểm nghèo; sống thọ và an lành.",
    "TÀI BẠCH": "Tiền tài đến từ công đức chính thiện; năng làm từ thiện thì tài lộc càng sinh sôi nảy nở dồi dào.",
    "TỬ TỨC": "Con cái hiếu thảo tuyệt vời, ngoan ngoãn biết vâng lời cha mẹ; sau này là niềm an ủi lớn nhất của tuổi già.",
    "PHU THÊ": "Vợ chồng có mối nhân duyen sâu nặng từ tiền kiếp, yêu thương trân trọng nhau; hôn nhân bền vững son sắt.",
    "HUYNH ĐỆ": "Anh em sống trọn tình trọn nghĩa, đùm bọc yêu thương nhau không toan tính thiệt hơn."
  },
  "Thiên Quý": {
    "MỆNH": "Lòng dạ thánh thiện, khí chất thanh cao, có quý nhân vô hình phù hộ trong những thời khắc hiểm nguy nhất của cuộc đời.",
    "PHỤ MẪU": "Cha mẹ nhân từ, phúc hậu, luôn chở che bảo bọc con cái bằng tình thương bao la.",
    "PHÚC ĐỨC": "Hưởng ân huệ thiêng liêng từ trời Phật và tổ phụ; tâm hồn an yên, dòng họ nhiều người sống thọ và thanh thản.",
    "ĐIỀN TRẠCH": "Nhà ở ấm cúng, khí trường thanh tịnh; việc thờ phụng gia tiên đem lại nhiều may mắn cho gia trạch.",
    "QUAN LỘC": "Làm việc có đạo đức nghề nghiệp, được đồng nghiệp và cấp trên nể phục; thăng tiến bền vững bằng sự chính trực.",
    "NÔ BỘC": "Được bạn bè kính trọng và giúp đỡ chí tình; luôn kết giao được với những bậc quân tử trượng nghĩa.",
    "THIÊN DI": "Ra ngoài gặp muôn vàn duyên lành, đi xa được người đời che chở; luôn bình an trước sóng gió cuộc đời.",
    "TẬT ÁCH": "Hóa giải mọi tai ương ách nạn thần kỳ, bệnh nặng hóa nhẹ, bệnh nhẹ hóa không; được thần linh gia hộ.",
    "TÀI BẠCH": "Tiền bạc trong sạch, lộc trời ban cho người có tâm; không bao giờ lâm vào cảnh bế tắc kiệt quệ tài chính.",
    "TỬ TỨC": "Con cái ngoan ngoãn, có lòng nhân ái bao la, hiếu thảo với cha mẹ; tương lai tích nhiều công đức cho dòng họ.",
    "PHU THÊ": "Lấy được người phối ngẫu nhân từ, phúc hậu; vợ chồng bao dung độ lượng, cùng nhau tu tâm dưỡng tính xây tổ ấm.",
    "HUYNH ĐỆ": "Anh em thuận hòa, một lòng hướng thiện, giúp đỡ nhau bằng tấm lòng chân thành không vụ lợi."
  },
  "Tam Thai": {
    "MỆNH": "Phong thái ung dung đĩnh đạc, tính tình khoan dung, danh tiếng lan tỏa nhẹ nhàng; cuộc sống bình thản an nhiên.",
    "PHỤ MẪU": "Cha mẹ sống trường thọ, an nhàn, có uy tín và sự kính trọng trong dòng tộc xã hội.",
    "PHÚC ĐỨC": "Phúc lộc vẹn toàn, mồ mả tổ tiên êm ấm; dòng họ con cháu đông đúc, thành đạt và giữ được gia phong.",
    "ĐIỀN TRẠCH": "Nhà cửa bề thế, thoáng đãng, có sân vườn rộng rãi; cơ ngơi ổn định vững vàng theo năm tháng.",
    "QUAN LỘC": "Công danh thăng tiến vững chắc từng bước, vị thế xã hội được củng cố kiên cố; được đồng nghiệp nể trọng.",
    "NÔ BỘC": "Bạn bè đông đảo, có nhiều mối quan hệ xã giao chất lượng; cấp dưới tận tâm phò tá.",
    "THIÊN DI": "Ra ngoài phong thái đàng hoàng, được đón tiếp nồng hậu; đi xa luôn giữ được sự an toàn và đĩnh đạc.",
    "TẬT ÁCH": "Sức khỏe dẻo dai, ít khi đau ốm; tâm trí thư thái giúp xua tan mầm mống bệnh tật.",
    "TÀI BẠCH": "Tiền bạc tích lũy đều đặn vững vàng, có nguồn tài chính ổn định; cuộc sống sung túc an nhàn.",
    "TỬ TỨC": "Con cái thông minh, đĩnh đạc, có tương lai sáng sủa; sau này thành đạt và báo hiếu cha mẹ chu đáo.",
    "PHU THÊ": "Vợ chồng hòa thuận, tôn trọng lẫn nhau; cuộc sống hôn nhân êm đềm, ít khi xảy ra sóng gió lớn.",
    "HUYNH ĐỆ": "Anh em thành đạt, sống hòa mục và luôn là chỗ dựa vững chãi cho nhau."
  },
  "Bát Tọa": {
    "MỆNH": "Nền tảng vững chắc, phong thái đường hoàng, tính tình điềm tĩnh; có vị trí xã hội ổn định, cuộc đời ít biến động lớn.",
    "PHỤ MẪU": "Cha mẹ có cuộc sống an nhàn, sức khỏe trường thọ; gia đình nề nếp vững vàng.",
    "PHÚC ĐỨC": "Phúc ấm tổ tiên che chở sâu dày; dòng họ nhiều người có chức sắc địa vị ổn định bền lâu.",
    "ĐIỀN TRẠCH": "Sở hữu nhà cửa kiên cố bề thế; tích lũy bất động sản lâu dài, ít khi phải chuyển dời nhà cửa.",
    "QUAN LỘC": "Chức vụ vững như bàn thạch, sự nghiệp phát triển ổn định; làm việc có quy củ và uy tín cao.",
    "NÔ BỘC": "Có người hầu kẻ hạ hoặc cấp dưới trung thành, đáng tin cậy; bạn bè luôn giữ mối quan hệ lâu năm.",
    "THIÊN DI": "Ra ngoài có xe cộ đưa đón đàng hoàng, đi lại an toàn; luôn nhận được sự tôn trọng từ môi trường bên ngoài.",
    "TẬT ÁCH": "Sức khỏe tốt, có khả năng phục hồi nhanh chóng; ít khi phải lo lắng về bệnh tật nan y.",
    "TÀI BẠCH": "Tài chính vững vàng, có tài sản tích lũy an toàn; không phải lo lắng về những biến động kinh tế.",
    "TỬ TỨC": "Con cái ngoan ngoãn, có chí hướng vững vàng; sau này có công ăn việc làm ổn định và thành đạt.",
    "PHU THÊ": "Hôn nhân bền vững, gia đạo an yên; vợ chồng cùng nhau vun đắp cuộc sống ngày càng sung túc.",
    "HUYNH ĐỆ": "Anh chị em ổn định cuộc sống, hỗ trợ nhau giữ gìn cơ nghiệp gia đình."
  },
  "Long Trì": {
    "MỆNH": "Dung nhan thanh tú, mũi cao tai thính, có khiếu thẩm mỹ tinh tế; tính tình hòa nhã, có duyên ngầm thu hút lòng người.",
    "PHỤ MẪU": "Cha mẹ quý phái, có học thức; gia đình có truyền thống văn hóa nề nếp thanh cao.",
    "PHÚC ĐỨC": "Mồ mả tổ tiên phong thủy đắc địa gần nơi nguồn nước mát lành; con cháu đời sau thanh tú thông minh.",
    "ĐIỀN TRẠCH": "Nhà ở gần nơi sông nước, hồ ao thoáng mát hoặc có hồ cá phong thủy vượng khí; nhà cửa đẹp đẽ sang trọng.",
    "QUAN LỘC": "Công danh phát triển thuận lợi, thi cử đỗ đạt cao; dễ làm việc trong các cơ quan văn hóa, nghệ thuật, ngoại giao.",
    "NÔ BỘC": "Bạn bè thanh lịch, quan hệ giao tế nhã nhặn; được nhiều người xung quanh yêu mến giúp đỡ.",
    "THIÊN DI": "Ra ngoài gặp nhiều cảnh sắc tươi đẹp, được đón tiếp ân cần; đi xa gặt hái nhiều thành công.",
    "TẬT ÁCH": "Giải trừ bệnh tật tốt; chú ý vệ sinh mũi, xoang và đường tai họng tránh viêm nhiễm dị ứng.",
    "TÀI BẠCH": "Kiếm tiền nhẹ nhàng từ chuyên môn và sự khéo léo; tài lộc dồi dào, có lộc may mắn.",
    "TỬ TỨC": "Con cái sinh ra xinh đẹp, thanh tú, thông minh ngoan ngoãn; sau này thành danh rạng rỡ.",
    "PHU THÊ": "Lấy được người phối ngẫu thanh tao, nhan sắc khả ái; vợ chồng tương kính hòa hợp.",
    "HUYNH ĐỆ": "Anh chị em xinh đẹp, tài hoa, cư xử nhã nhặn và yêu thương đùm bọc lẫn nhau."
  },
  "Phượng Các": {
    "MỆNH": "Văn phong cao nhã, tiếng thơm bay xa, thông minh lễ độ; có khiếu văn học nghệ thuật, phong thái quý phái kiêu sa.",
    "PHỤ MẪU": "Cha mẹ thanh nhã có học vị, được người đời kính trọng; con cái được thụ hưởng giáo dục ưu tú.",
    "PHÚC ĐỨC": "Dòng họ nhiều đời có danh tiếng vẻ vang, con cháu tài hoa đỗ đạt; phúc trạch dồi dào lưu truyền muôn thuở.",
    "ĐIỀN TRẠCH": "Nhà cửa kiến trúc tao nhã, phong thủy thanh tịnh; nơi ở có cảnh quan đẹp mắt, thoáng đãng.",
    "QUAN LỘC": "Sự nghiệp vẻ vang, danh tiếng vang xa; thích hợp nghề viết lách, học thuật, truyền thông, thiết kế, kiến trúc.",
    "NÔ BỘC": "Kết bạn với những người tao nhã, có trình độ văn hóa cao; đồng nghiệp hòa nhã tôn trọng.",
    "THIÊN DI": "Ra ngoài nổi danh tài ba, tiếng lành đồn xa; được người đời ngưỡng mộ và trọng đãi.",
    "TẬT ÁCH": "Tinh thần thanh thản giúp tiêu trừ bệnh tật; cẩn thận bệnh về tai hoặc răng miệng.",
    "TÀI BẠCH": "Kiếm tiền từ danh tiếng, uy tín cá nhân và sản phẩm trí tuệ; tài chính minh bạch thanh cao.",
    "TỬ TỨC": "Con cái thông minh xuất chúng, có năng khiếu văn chương nghệ thuật; tương lai rạng danh gia đạo.",
    "PHU THÊ": "Người phối ngẫu đoan trang tao nhã, có học vấn; vợ chồng sống hòa thuận thi vị.",
    "HUYNH ĐỆ": "Anh em có người nổi tiếng, thành danh vẻ vang, mang lại niềm tự hào cho gia tộc."
  },
  "Thiên Khốc": {
    "MỆNH": "Tiền vận nội tâm hay sầu muộn cay đắng, nhiều nỗi niềm trăn trở; song nếu đắc địa tại Tý Ngọ thì như \"tiếng sấm vang trời\", hậu vận bứt phá vang danh thiên hạ.",
    "PHỤ MẪU": "Cha mẹ có nỗi khổ tâm thầm kín; thuở nhỏ đương số khiến cha mẹ phải bận tâm lo lắng nhiều.",
    "PHÚC ĐỨC": "Dòng họ có chuyện sầu bi trong quá khứ; đương số cần năng làm phúc hồi hướng để chuyển hóa nghiệp duyên dòng tộc.",
    "ĐIỀN TRẠCH": "Mua bán nhà đất thuở đầu hay gặp trục trặc muộn phiền; về sau kiên trì mới an cư lạc nghiệp.",
    "QUAN LỘC": "Buổi đầu lập nghiệp nhiều phen rơi nước mắt gian truân; sau khi vượt qua thử thách mới gầy dựng được uy danh lớn.",
    "NÔ BỘC": "Bạn bè dễ có người than phiền gieo rắc nỗi buồn; cẩn thận bị kéo vào những rắc rối không đáng có.",
    "THIÊN DI": "Ra ngoài thời gian đầu hay bị tủi thân hoặc cô lập; về sau rèn luyện bản lĩnh kiên cường đứng vững.",
    "TẬT ÁCH": "Chú ý bệnh về phổi, đường hô hấp, ho hen kéo dài hoặc răng yếu; hay u uất làm hao tổn tinh lực.",
    "TÀI BẠCH": "Tiền bạc thuở hàn vi kiếm được đầy gian nan vất vả; trung hậu vận mới có tiếng vang lớn về kinh tế.",
    "TỬ TỨC": "Nuôi con thuở nhỏ vất vả, con hay khóc dạ đề; lớn lên cần chú ý bồi dưỡng thể chất cho con.",
    "PHU THÊ": "Chuyện tình cảm thuở đầu nhiều nước mắt dở dang; sau khi trải qua thử thách mới tìm được bến đỗ bình yên.",
    "HUYNH ĐỆ": "Trong anh em có người số phận trắc trở cần đương số đùm bọc nâng đỡ."
  },
  "Thiên Hư": {
    "MỆNH": "Hay lo nghĩ hão huyền, thuở thiếu thời khí lực có phần hư nhược; cần rèn luyện tính kiên định thực tế, tránh ảo tưởng hão danh.",
    "PHỤ MẪU": "Cha mẹ có giai đoạn kinh tế sa sút hoặc sức khỏe yếu; con cái cần sớm san sẻ gánh nặng.",
    "PHÚC ĐỨC": "Phúc trạch có sự hao tổn hư hao; cần tu dưỡng tâm tính, làm việc thực chất để bù đắp âm phần.",
    "ĐIỀN TRẠCH": "Nhà cửa cẩn thận móng yếu, tường nứt hoặc hư hao vặt; không nên đầu tư bất động sản theo phong trào.",
    "QUAN LỘC": "Đề phòng cảnh hữu danh vô thực, bề ngoài hào nhoáng nhưng bên trong rỗng; cần trau dồi năng lực chuyên môn thực chất.",
    "NÔ BỘC": "Bạn bè có kẻ ba hoa khoác lác, hứa thật nhiều nhưng làm không được bao nhiêu; cần tỉnh táo nhận diện.",
    "THIÊN DI": "Ra ngoài đề phòng bị người khác lừa gạt bằng những bánh vẽ ảo mộng; cẩn thận mất mát đồ đạc hư hao.",
    "TẬT ÁCH": "Chủ về bệnh khí huyết hư nhược, phổi yếu, hay mệt mỏi hụt hơi; cần tập luyện dưỡng sinh tăng cường khí lực.",
    "TÀI BẠCH": "Tiền bạc dễ bị hao hụt vì những khoản đầu tư ảo; cần giữ chặt tiền mặt và đầu tư vào giá trị thực.",
    "TỬ TỨC": "Nuôi con thuở nhỏ con hay ốm vặt, thể chất hơi yếu; cần chú trọng dinh dưỡng bồi bổ từ nhỏ.",
    "PHU THÊ": "Vợ chồng tránh nghi kỵ hão huyền, lời qua tiếng lại vô cớ; cần thẳng thắn tin tưởng lẫn nhau.",
    "HUYNH ĐỆ": "Anh em có người gặp khó khăn hư hao tài sản, cần sự chung tay hỗ trợ của gia đình."
  },
  "Thái Tuế": {
    "MỆNH": "Đứng ở thế chính danh quân tử! Tự tin, đàng hoàng, có tiếng nói dẫn dắt, luôn bảo vệ lẽ phải; song cẩn trọng lời ăn tiếng nói quá sắc sảo dễ gây thù chuốc oán.",
    "PHỤ MẪU": "Cha mẹ tính tình cương trực, có uy tín xã hội; trong gia đình kỷ cương rõ ràng, tôn trọng lẽ phải.",
    "PHÚC ĐỨC": "Dòng họ có tiếng tăm, nề nếp gia phong nghiêm cẩn; tổ tiên có người làm quan to hoặc nhân vật uy tín.",
    "ĐIỀN TRẠCH": "Nhà ở nơi đàng hoàng chính danh, giấy tờ pháp lý rõ ràng minh bạch; tránh được tranh chấp đất đai.",
    "QUAN LỘC": "Thích hợp ngành nghề luật sư, thẩm phán, phê bình, thanh tra, diễn giả, lãnh đạo; nói có người nghe, đe có người sợ.",
    "NÔ BỘC": "Bạn bè nể sợ uy tín, có nhiều mối quan hệ với cấp quản lý; nhưng cần mềm mỏng để tránh xa cách.",
    "THIÊN DI": "Ra ngoài ăn to nói lớn, đàng hoàng đĩnh đạc; được xã hội tôn trọng, nhưng đề phòng khẩu thiệt thị phi từ kẻ đố kỵ.",
    "TẬT ÁCH": "Cẩn trọng các vụ kiện tụng, tranh chấp pháp lý ảnh hưởng tinh thần; chú ý bệnh về răng miệng, cổ họng.",
    "TÀI BẠCH": "Kiếm tiền chính danh minh bạch từ danh tiếng và tài năng hùng biện; không làm ăn phi pháp.",
    "TỬ TỨC": "Con cái tính tình tự tin, độc lập, có tài ăn nói; sau này có thể làm nghề liên quan đến luật pháp, truyền thông.",
    "PHU THÊ": "Vợ chồng đều có cái tôi lớn, hay tranh luận đúng sai; cần học cách nhường nhịn nhau để giữ hòa khí gia đình.",
    "HUYNH ĐỆ": "Anh em ăn nói thẳng thắn, có sự phân minh rõ ràng; tôn trọng quyền lợi của nhau."
  },
  "Tuế Phá": {
    "MỆNH": "Tính cách ngang tàng, bất mãn với sự bất công, luôn muốn phá vỡ trật tự cũ để cải cách đổi mới; không chịu luồn cúi dưới quyền kẻ khác.",
    "PHỤ MẪU": "Hay bất đồng quan điểm thế hệ với cha mẹ; sớm có tư tưởng tự lập tách rời khỏi gia đình.",
    "PHÚC ĐỨC": "Phúc trạch có sự xáo trộn đổi mới; dòng họ có người từng đứng lên làm cách mạng hoặc thay đổi cơ nghiệp.",
    "ĐIỀN TRẠCH": "Hay đập phá sửa chữa nhà cửa, thay đổi cơ ngơi; thích bài trí theo phong cách độc lạ phá cách.",
    "QUAN LỘC": "Dám đi đầu trong các cuộc cải cách doanh nghiệp, đổi mới mô hình kinh doanh; ghét sự rập khuôn máy móc.",
    "NÔ BỘC": "Bạn bè có nhiều người cá tính mạnh mẽ, dám nghĩ dám làm; cẩn thận mâu thuẫn tranh cãi nội bộ.",
    "THIÊN DI": "Ra ngoài hay gặp cảnh bất bình ra tay tương trợ; dám đối đầu với khó khăn nghịch cảnh.",
    "TẬT ÁCH": "Cẩn trọng các bệnh về răng miệng (sâu răng, nhổ răng), bệnh về gân cốt do vận động mạnh.",
    "TÀI BẠCH": "Không cam chịu nguồn thu cố định, luôn tìm cách bứt phá tạo nguồn thu mới; cần cẩn trọng rủi ro khi đầu tư mạo hiểm.",
    "TỬ TỨC": "Con cái có cá tính rất mạnh, không chịu sự áp đặt; cha mẹ cần làm bạn tâm tình và định hướng tích cực cho con.",
    "PHU THÊ": "Vợ chồng đôi khi có sự bất đồng về quan điểm sống; cần học cách chấp nhận sự khác biệt để hòa hợp.",
    "HUYNH ĐỆ": "Anh em có người tính tình ngang bướng, cần sự kiên nhẫn dung hòa của các thành viên trong gia đình."
  },
  "Điếu Khách": {
    "MỆNH": "Tài hùng biện lưu loát, tài ăn nói thu hút đám đông, quan hệ xã giao rộng rãi; song cẩn trọng thói quen chi tiêu quá đà hoặc sa đà cờ bạc cá cược.",
    "PHỤ MẪU": "Cha mẹ quảng giao hay tiếp đãi khách khứa bạn bè; gia đạo thường xuyên có khách tới thăm.",
    "PHÚC ĐỨC": "Dòng họ có nhiều người đi đây đi đó ngao du; cần chú ý việc hương khói thờ tự tổ tiên trang nghiêm.",
    "ĐIỀN TRẠCH": "Nhà cửa hay đón tiếp bạn bè tụ họp vui chơi; cẩn thận việc mua bán nhà đất vướng chuyện đàm tiếu.",
    "QUAN LỘC": "Thích hợp ngành nghề tư vấn, bán hàng, môi giới, ngoại giao, giải trí; thành công nhờ tài ăn nói thuyết phục.",
    "NÔ BỘC": "Bạn bè đông đảo khắp nơi, nhiều bạn nhậu giao lưu; cần biết chọn bạn tốt để tránh sa đà vào thói hư tật xấu.",
    "THIÊN DI": "Ra ngoài giao thiệp rộng, ăn nói khéo léo được nhiều người mến; nhưng cần giữ mình trước những cám dỗ.",
    "TẬT ÁCH": "Đề phòng tai nạn té ngã từ trên cao, tai nạn giao thông hoặc bệnh do lối sống tiệc tùng rượu bia quá độ.",
    "TÀI BẠCH": "Tiền bạc kiếm được từ các mối quan hệ xã hội; nhưng cẩn trọng chi tiêu phung phí vào vui chơi giải trí.",
    "TỬ TỨC": "Con cái hoạt bát, tài ăn nói dẻo dai; cha mẹ cần rèn luyện cho con tính cẩn trọng và kỷ luật tài chính.",
    "PHU THÊ": "Bạn đời tính tình quảng giao, hay đi giao lưu bạn bè; vợ chồng cần dành thời gian riêng tư vun đắp tổ ấm.",
    "HUYNH ĐỆ": "Anh em tính tình vui vẻ, thích tụ họp ăn uống; cẩn thận tranh chấp lời qua tiếng lại lúc say sưa."
  },
  "Bác Sỹ": {
    "MỆNH": "Trí tuệ thông minh nhân hậu, tính tình bao dung, học sâu hiểu rộng; người có phẩm hạnh thanh cao, gặp hung hóa cát.",
    "PHỤ MẪU": "Cha mẹ là người có học thức, nhân đức, hết lòng chăm lo sức khỏe và sự nghiệp cho con cái.",
    "PHÚC ĐỨC": "Tổ tiên tích lũy phúc đức sâu dày, dòng họ nhiều người làm nghề y dược giáo dục cứu nhân độ thế.",
    "ĐIỀN TRẠCH": "Nhà ở thanh tịnh, phong thủy vượng khí, môi trường xung quanh an lành có lợi cho sức khỏe.",
    "QUAN LỘC": "Thành danh nhờ chuyên môn sâu, nghiên cứu y khoa, giáo dục, tư vấn chiến lược; được người đời kính trọng.",
    "NÔ BỘC": "Bạn bè trí thức, có nhiều mối quan hệ tốt đẹp trong ngành y tế học thuật; cấp dưới tận tâm phò tá.",
    "THIÊN DI": "Ra ngoài được người đời vị nể, đi xa gặp nhiều thuận lợi; luôn giữ được phong thái điềm đạm.",
    "TẬT ÁCH": "Giải trừ bệnh tật rất tốt, có kiến thức chăm sóc sức khỏe bản thân; gặp nạn luôn có thầy thuốc cứu chữa.",
    "TÀI BẠCH": "Kiếm tiền từ chuyên môn trí tuệ chân chính; tài lộc thanh cao, bền vững và trường tồn.",
    "TỬ TỨC": "Con cái thông minh, ngoan ngoãn, có chí học hành; sau này có thể theo nghiệp y khoa, giáo dục.",
    "PHU THÊ": "Người phối ngẫu có học thức, tính tình nhân từ, biết chăm lo chu đáo cho sức khỏe gia đình.",
    "HUYNH ĐỆ": "Anh em hòa thuận, có người thành đạt trong ngành y tế hoặc học thuật, sẵn sàng giúp đỡ nhau."
  },
  "Lực Sỹ": {
    "MỆNH": "Sức vóc khỏe mạnh, năng lực làm việc phi thường, bền bỉ kiên trì; dám nhận việc khó khăn nặng nhọc gánh vác.",
    "PHỤ MẪU": "Cha mẹ lao động cần cù, chăm chỉ cả đời vì con cái; gia đình có sức khỏe dẻo dai.",
    "PHÚC ĐỨC": "Dòng họ có nhiều người khỏe mạnh trường thọ; âm đức tổ tiên tiếp thêm nguồn nội lực dồi dào cho con cháu.",
    "ĐIỀN TRẠCH": "Cơ ngơi kiên cố chắc chắn, tự tay xây dựng gầy dựng nhà cửa từ hai bàn tay trắng.",
    "QUAN LỘC": "Sức cạnh tranh cực lớn, làm việc không biết mệt mỏi; công danh thăng tiến vững chắc nhờ sức lao động bền bỉ.",
    "NÔ BỘC": "Cấp dưới khỏe mạnh, làm việc chăm chỉ đắc lực; bạn bè là những người cùng chung sức gánh vác việc lớn.",
    "THIÊN DI": "Ra ngoài chịu thương chịu khó bươn chải; đi đến đâu cũng thể hiện được sức sống và nghị lực phi thường.",
    "TẬT ÁCH": "Sức đề kháng mạnh mẽ, ít khi ốm đau; tuy nhiên cẩn thận các chấn thương cơ bắp do lao động quá sức.",
    "TÀI BẠCH": "Kiếm tiền bằng sức lao động và năng lực thực tế; tiền bạc tích lũy chắc chắn bền bỉ theo thời gian.",
    "TỬ TỨC": "Con cái khỏe mạnh, rắn rỏi; sớm có ý thức tự lập và phụ giúp công việc gia đình.",
    "PHU THÊ": "Người phối ngẫu chịu thương chịu khó, cùng chung sức gánh vác kinh tế gia đình vững chắc.",
    "HUYNH ĐỆ": "Anh em cùng nhau chung lưng đấu cật vượt qua gian khó, đoàn kết bền chặt."
  },
  "Thanh Long": {
    "MỆNH": "Rồng xanh gặp mây: thông minh nhanh nhẹn, may mắn kỳ diệu, gặp thời đắc thế thăng hoa; thi cử đỗ đạt, công danh rạng ngời.",
    "PHỤ MẪU": "Cha mẹ có danh thơm, hòa thuận yêu thương nhau; con cái đón nhận nhiều vận may từ song thân.",
    "PHÚC ĐỨC": "Mồ mả tổ tiên phát tích đắc địa hình long mạch; dòng họ nhiều người hiển đạt vinh hiển.",
    "ĐIỀN TRẠCH": "Nhà ở phong thủy đắc địa rồng cuộn hổ ngồi; gia đạo ngày càng hưng vượng phát đạt.",
    "QUAN LỘC": "Công danh như rồng gặp mây, thi cử đỗ đạt cao, thăng quan tiến chức thần tốc khi gặp đúng vận hội lớn.",
    "NÔ BỘC": "Gặp gỡ bạn bè tài giỏi, có quý nhân phò trợ đắc lực; hợp tác làm ăn gặt hái thành công lớn.",
    "THIÊN DI": "Ra ngoài đắc thời đắc vận, gặp nhiều may mắn bất ngờ; xuất hành luôn mang lại kết quả tốt lành.",
    "TẬT ÁCH": "Hóa giải bệnh tật và tai ương nguy hiểm kỳ diệu; luôn giữ được sức khỏe dồi dào may mắn.",
    "TÀI BẠCH": "Tài lộc hanh thông rực rỡ, có cơ hội phát tài lớn ngoài dự kiến; tiền của sinh sôi nảy nở.",
    "TỬ TỨC": "Sinh quý tử hoặc ái nữ tài hoa, con cái thông minh xuất chúng mang lại may mắn lớn cho gia đình.",
    "PHU THÊ": "Lấy được người phối ngẫu thanh tú tài sắc, mang lại vận đỏ và sự nghiệp vẻ vang cho gia đạo.",
    "HUYNH ĐỆ": "Anh chị em thành đạt, có người làm rạng danh gia đình dòng tộc."
  },
  "Tấu Thư": {
    "MỆNH": "Khéo ăn khéo nói, tài hùng biện sắc sảo, giỏi viết lách văn kiện giấy tờ; nắm bắt tâm lý người khác vô cùng tinh tế.",
    "PHỤ MẪU": "Cha mẹ khéo léo trong giao tiếp, gia đình nề nếp gia giáo; dạy dỗ con cái lời ăn tiếng nói chuẩn mực.",
    "PHÚC ĐỨC": "Dòng họ có truyền thống văn chương, giấy tờ bằng sắc lưu truyền; con cháu được hưởng phúc trí tuệ.",
    "ĐIỀN TRẠCH": "Giấy tờ nhà đất minh bạch hợp pháp; nhà cửa bài trí ngăn nắp, có góc làm việc viết lách trang nhã.",
    "QUAN LỘC": "Thành công nhờ tài năng giao tiếp, đàm phán hợp đồng, văn bản pháp lý, ngoại giao, truyền thông báo chí.",
    "NÔ BỘC": "Bạn bè khéo léo, đối thoại tâm đầu ý hợp; dễ thuyết phục và nhận được sự đồng thuận của tập thể.",
    "THIÊN DI": "Ra ngoài ăn nói có duyên, lời nói có sức nặng thuyết phục; đi đàm phán thương thảo luôn thắng lợi.",
    "TẬT ÁCH": "Giải trừ bớt ách nạn; cẩn thận các bệnh về họng, dây thanh quản do nói năng nhiều.",
    "TÀI BẠCH": "Kiếm tiền từ tài năng ăn nói, viết lách, ký kết hợp đồng thương mại; tiền tài minh bạch.",
    "TỬ TỨC": "Con cái khéo miệng, thông minh, hoạt bát; sau này có năng khiếu ngoại giao, thuyết trình xuất sắc.",
    "PHU THÊ": "Vợ chồng khéo léo cư xử ngọt ngào, lời nói dễ nghe; cùng nhau bàn bạc thấu đáo mọi việc lớn nhỏ.",
    "HUYNH ĐỆ": "Anh em ăn nói hòa nhã, có việc gì cũng bàn bạc trao đổi thấu tình đạt lý."
  },
  "Hỷ Thần": {
    "MỆNH": "Nụ cười luôn rạng rỡ, tính tình hỷ xả, vui vẻ mang lại may mắn và niềm vui cho người xung quanh; gặp hung hóa cát.",
    "PHỤ MẪU": "Cha mẹ vui vẻ lạc quan, gia đạo tràn ngập tiếng cười; con cái sống trong tình yêu thương ấm áp.",
    "PHÚC ĐỨC": "Âm đức tổ phụ dồi dào, dòng họ thường xuyên có tin vui thêm người thêm của.",
    "ĐIỀN TRẠCH": "Nhà ở tràn đầy sinh khí hỷ tài; thường xuyên tổ chức tiệc tùng sum họp gia đình bạn bè.",
    "QUAN LỘC": "Sự nghiệp hanh thông, luôn đón nhận tin vui thăng tiến, hoàn thành dự án xuất sắc.",
    "NÔ BỘC": "Bạn bè mang lại niềm vui và cơ hội hợp tác thuận lợi đôi bên cùng có lợi.",
    "THIÊN DI": "Ra ngoài gặp nhiều chuyện may mắn, xuất hành thuận buồm xuôi gió đón hỷ khí.",
    "TẬT ÁCH": "Tinh thần lạc quan vui vẻ xua tan mọi mầm mống ốm đau bệnh tật; sức khỏe dồi dào.",
    "TÀI BẠCH": "Tài lộc dồi dào, kinh doanh buôn bán đắt hàng; thường có những khoản tiền thưởng và lộc ăn bất ngờ.",
    "TỬ TỨC": "Sớm sinh quý tử, con cái ngoan ngoãn mang lại vô vàn niềm vui và phúc đức cho cha mẹ.",
    "PHU THÊ": "Hôn nhân hạnh phúc ngập tràn tiếng cười; vợ chồng cùng nhau tận hưởng cuộc sống êm đềm thi vị.",
    "HUYNH ĐỆ": "Anh em thuận hòa, thường xuyên tụ họp chia sẻ niềm vui và sự kiện thành công của nhau."
  },
  "Thiên Diêu": {
    "MỆNH": "Đa tình, phong lưu, có khiếu nghệ thuật, tâm hồn lãng mạn say mê; cẩn trọng đắm chìm vào tửu sắc cám dỗ.",
    "PHỤ MẪU": "Cha mẹ tâm hồn nghệ sĩ hoặc có sự phóng khoáng; gia đình cởi mở về tình cảm.",
    "PHÚC ĐỨC": "Dòng họ có người phong lưu lãng tử; bản thân có năng lực cảm thụ nghệ thuật và trực giác tâm linh phong phú.",
    "ĐIỀN TRẠCH": "Nhà cửa trang trí lãng mạn, ấm cúng; nơi ở thích hợp cho việc thư giãn giải trí thưởng ngoạn.",
    "QUAN LỘC": "Thích hợp ngành nghề nghệ thuật, biểu diễn, giải trí, làm đẹp, quan hệ công chúng mềm dẻo.",
    "NÔ BỘC": "Bạn bè nhiều người khác giới ái mộ; cẩn thận ranh giới tình cảm rõ ràng để tránh thị phi rắc rối.",
    "THIÊN DI": "Ra ngoài thu hút ánh nhìn, được nhiều người tán tỉnh; đi xa cần giữ mình trước những cám dỗ.",
    "TẬT ÁCH": "Cẩn trọng các bệnh về sinh dục, đường tiết niệu, máu huyết hoặc bệnh do lối sống buông thả.",
    "TÀI BẠCH": "Kiếm tiền từ ngành giải trí, dịch vụ hưởng thụ; nhưng cẩn trọng chi tiêu quá đà vào thú vui xa xỉ.",
    "TỬ TỨC": "Con cái sinh ra xinh đẹp, đa tài đa cảm; cha mẹ cần định hướng đạo đức vững vàng từ nhỏ.",
    "PHU THÊ": "Tình cảm vợ chồng nồng nhiệt say đắm; cần giữ lòng thủy chung son sắt để tránh duyên ngoài luồng.",
    "HUYNH ĐỆ": "Anh em sống cởi mở phóng khoáng, thích tụ họp tiệc tùng vui vẻ cùng nhau."
  },
  "Phục Binh": {
    "MỆNH": "Cẩn trọng kẻ tiểu nhân phục kích ngầm, khẩu thiệt đâm sau lưng; cần rèn luyện tính kín kẽ, thận trọng trong mọi việc.",
    "PHỤ MẪU": "Gia đình cần cảnh giác kẻ xấu rắp tâm phá hoại hòa khí; cha mẹ cần quản lý tài sản cẩn thận.",
    "PHÚC ĐỨC": "Dòng họ có những bất hòa ngấm ngầm; cần sự minh bạch và hóa giải bằng tâm thiện lành.",
    "ĐIỀN TRẠCH": "Đề phòng trộm cắp, mất mát tài sản trong nhà; kiểm tra khóa cửa và an ninh nhà ở cẩn mật.",
    "QUAN LỘC": "Trong cơ quan dễ có người ghen ghét đâm thọc, gièm pha sau lưng; không để lộ tài liệu mật của dự án.",
    "NÔ BỘC": "Bạn bè có kẻ ngấm ngầm phản trắc; không chia sẻ chuyện cơ mật làm ăn cho người chưa đủ tin cậy.",
    "THIÊN DI": "Ra ngoài đề phòng bị lừa gạt, mai phục hoặc vướng bẫy thị phi; cẩn trọng giao tiếp nơi đất khách.",
    "TẬT ÁCH": "Đề phòng bệnh tật ủ ngầm lâu ngày bất ngờ phát tác; cần đi khám sức khỏe tầm soát định kỳ.",
    "TÀI BẠCH": "Cẩn trọng bị lừa gạt tiền bạc, quỵt nợ hoặc mất mát tài sản; tránh đầu tư vào các dự án mập mờ.",
    "TỬ TỨC": "Con cái dễ bị bạn bè xấu rủ rê lôi kéo; cha mẹ cần theo sát uốn nắn và bảo vệ con kịp thời.",
    "PHU THÊ": "Đề phòng người ngoài đâm thọc chia rẽ tình cảm vợ chồng; vợ chồng cần tuyệt đối tin tưởng lẫn nhau.",
    "HUYNH ĐỆ": "Anh em cần giữ sự minh bạch trong tài chính để tránh hiểu lầm nghi kỵ không đáng có."
  },
  "Kiếp Sát": {
    "MỆNH": "Sát khí phục kích: tính cách quyết liệt nhưng cẩn trọng tai nạn chớp nhoáng, mổ xẻ hoặc thương tích tay chân; cần tu tâm dưỡng tính.",
    "PHỤ MẪU": "Cha mẹ có người sức khỏe yếu hoặc từng trải qua phẫu thuật; đương số cần chăm sóc song thân chu đáo.",
    "PHÚC ĐỨC": "Dòng họ có nghiệp sát; đương số cần năng làm việc phóng sinh, cứu vật để hóa giải bớt sát khí cho gia tộc.",
    "ĐIỀN TRẠCH": "Nhà ở cần chú ý các vật sắc nhọn, dao kéo cất cẩn thận; kiểm tra an toàn điện lửa trong nhà.",
    "QUAN LỘC": "Công việc áp lực cao, cạnh tranh khốc liệt; đề phòng đối thủ chơi xấu hoặc hợp đồng bị phá ngang bất ngờ.",
    "NÔ BỘC": "Bạn bè dễ trở mặt thành thù; tránh dính líu đến những mối quan hệ mạo hiểm bạo lực.",
    "THIÊN DI": "Ra ngoài đi đứng cẩn thận tai nạn thương tích kim khí, ngã đau; tránh đến những nơi nguy hiểm hẻo lánh.",
    "TẬT ÁCH": "Dễ phải trải qua phẫu thuật mổ xẻ hoặc tai nạn trầy xước; cần chú ý an toàn lao động và thể thao.",
    "TÀI BẠCH": "Đề phòng bị cướp giật, mất cắp hoặc đầu tư thua lỗ nặng nề; tuyệt đối không ham mê trò đỏ đen.",
    "TỬ TỨC": "Việc sinh con thuở đầu dễ phải can thiệp mổ xẻ; con cái sau này tính cách mạnh mẽ cần uốn nắn nhẹ nhàng.",
    "PHU THÊ": "Vợ chồng tránh xung đột gay gắt động tay động chân; cần bình tĩnh đối thoại để giải quyết mâu thuẫn.",
    "HUYNH ĐỆ": "Anh em tính tình độc lập cứng rắn, tránh tranh chấp quyền lợi gay gắt làm tổn thương tình thân."
  },
  "Thiên Không": {
    "MỆNH": "Trí tuệ thông minh tột đỉnh, cơ mưu sắc bén; song cẩn trọng bẫy ngộ nhận tài năng, bạo phát bạo tàn, hậu vận nên hướng đạo quy tâm.",
    "PHỤ MẪU": "Cha mẹ có giai đoạn kinh tế thăng trầm lớn; con cái học được bài học vô thường từ sớm.",
    "PHÚC ĐỨC": "Phúc vận sâu sắc khi biết hướng thiện, dòng họ có người tu hành hoặc đỗ đạt cao; lánh xa điều ác.",
    "ĐIỀN TRẠCH": "Nhà đất không nên đứng tên quá nhiều hoặc đầu cơ lướt sóng; nhà ở thanh tịnh hướng Phật rất tốt.",
    "QUAN LỘC": "Ý tưởng sáng tạo đột phá nhưng tránh kiêu ngạo tự mãn; không dùng mưu mô lách luật kẻo sụp đổ trắng tay.",
    "NÔ BỘC": "Bạn bè đến rồi đi như mây khói; học cách buông bỏ những mối quan hệ độc hại không vụ lợi.",
    "THIÊN DI": "Ra ngoài thông minh cơ biến nhưng tránh hơn thua tranh chấp; càng khiêm nhường càng bình an.",
    "TẬT ÁCH": "Bệnh tật mau khỏi khi biết buông bỏ áp lực tinh thần; hướng thiện ăn chay giữ gìn sức khỏe dẻo dai.",
    "TÀI BẠCH": "Tránh đầu cơ tài chính mạo hiểm khống chế thị trường kẻo trắng tay; tiền bạc nên tích lũy cho việc phúc thiện.",
    "TỬ TỨC": "Con cái thông minh xuất chúng nhưng tư tưởng thoát tục; cha mẹ cần tôn trọng chí hướng của con.",
    "PHU THÊ": "Tình duyên dễ tan vỡ nếu xây dựng trên nền tảng vụ lợi; hôn nhân cần sự chân thành và thấu hiểu từ đáy lòng.",
    "HUYNH ĐỆ": "Anh em mỗi người một ngả mưu sinh; giữ tình nghĩa trong sáng không toan tính vụ lợi."
  },
  "Hoa Cái": {
    "MỆNH": "Khí chất kiêu sa, quý phái, có khiếu nghệ thuật và căn duyên tâm linh sâu sắc; phong thái đài các được người nể vì.",
    "PHỤ MẪU": "Cha mẹ phong nhã có uy tín; con cái được nuôi dạy trong môi trường văn hóa lễ độ cao.",
    "PHÚC ĐỨC": "Dòng họ có truyền thống văn hóa tâm linh thanh tịnh; mồ mả tổ phụ được thờ phụng trang nghiêm linh thiêng.",
    "ĐIỀN TRẠCH": "Nhà cửa kiến trúc quý phái, trang trí thanh tao; nơi ở mang lại cảm giác bình yên và tôn nghiêm.",
    "QUAN LỘC": "Thành công trong ngành văn hóa nghệ thuật, tâm linh học, thiết kế, thẩm mỹ; vị thế công danh sáng giá.",
    "NÔ BỘC": "Bạn bè nể trọng khí chất; quan hệ xã hội chọn lọc những người có văn hóa và đạo đức.",
    "THIÊN DI": "Ra ngoài phong thái đường hoàng quý phái; đi đến đâu cũng được người đời ngưỡng mộ tôn trọng.",
    "TẬT ÁCH": "Tâm linh thanh tịnh giải trừ tà khí ách nạn; cẩn thận bệnh về da hoặc hệ thần kinh nhạy cảm.",
    "TÀI BẠCH": "Kiếm tiền từ tài năng thẩm mỹ nghệ thuật và uy tín cá nhân; tài lộc thanh cao.",
    "TỬ TỨC": "Con cái xinh đẹp, thông minh, có khí chất cao quý; tương lai thành danh rạng rỡ.",
    "PHU THÊ": "Bạn đời có khí chất thanh cao, tự trọng; vợ chồng tôn trọng không gian riêng của nhau.",
    "HUYNH ĐỆ": "Anh em cư xử lịch thiệp, giữ gìn danh dự gia đình dòng tộc."
  },
  "Quốc Ấn": {
    "MỆNH": "Nắm giữ con dấu quyền lực, bằng cấp chính danh, uy tín chức vụ cao; người có trách nhiệm và danh dự lớn.",
    "PHỤ MẪU": "Cha mẹ có chức sắc hoặc giữ con dấu quyền ký duyệt trong cơ quan nhà nước, tổ chức lớn.",
    "PHÚC ĐỨC": "Dòng họ có người làm quan lớn nắm giữ ấn tín triều đình; con cháu được hưởng phúc ấm công danh vẻ vang.",
    "ĐIỀN TRẠCH": "Giấy tờ nhà đất chủ quyền đỏ rõ ràng, pháp lý chuẩn mực; sở hữu bất động sản chính danh.",
    "QUAN LỘC": "Đắc ấn phong quan: nắm quyền ký duyệt, lãnh đạo ban ngành, con đường thăng tiến rạng rỡ chính danh.",
    "NÔ BỘC": "Cấp dưới phục tùng quyền lực và sự lãnh đạo; đối tác kính nể sự uy tín chữ ký của đương số.",
    "THIÊN DI": "Ra ngoài được xã hội trọng vọng chức vụ; dễ được bổ nhiệm làm đại diện tổ chức nơi xa.",
    "TẬT ÁCH": "Hóa giải bớt ách nạn; giữ mình thanh liêm để tránh rủi ro về pháp lý con dấu.",
    "TÀI BẠCH": "Tài lộc gắn liền với chức vụ bổng lộc cơ quan; nguồn thu chính trực minh bạch.",
    "TỬ TỨC": "Con cái học giỏi đỗ đạt có bằng cấp cao; sau này nối nghiệp công danh sự nghiệp lớn.",
    "PHU THÊ": "Bạn đời có chức vụ uy tín trong xã hội; vợ chồng cùng nhau nâng đỡ đường công danh vinh hiển.",
    "HUYNH ĐỆ": "Anh em có người nắm giữ chức sắc quyền uy, làm rạng danh gia đình."
  },
  "Đường Phù": {
    "MỆNH": "Phong thái đàng hoàng, có tư chất quản trị hành chính; người biết giữ gìn quy củ kỷ cương, tính tình cẩn trọng.",
    "PHỤ MẪU": "Cha mẹ làm việc trong cơ quan nhà nước hoặc hành chính quy củ; gia giáo nghiêm cẩn.",
    "PHÚC ĐỨC": "Dòng họ có nề nếp gia phong truyền thống; con cháu giữ gìn đạo đức lễ nghĩa nghiêm túc.",
    "ĐIỀN TRẠCH": "Nhà cửa khang trang ở nơi gần cơ quan công quyền, đường sá rộng rãi; giấy tờ pháp lý đầy đủ.",
    "QUAN LỘC": "Thích hợp ngành hành chính văn phòng, quản lý nhân sự, thanh tra quy chế; làm việc chuẩn mực.",
    "NÔ BỘC": "Bạn bè đồng nghiệp tôn trọng nguyên tắc làm việc; môi trường công sở trật tự nề nếp.",
    "THIÊN DI": "Ra ngoài tuân thủ pháp luật nghiêm túc; xuất hành luôn suôn sẻ thuận lợi.",
    "TẬT ÁCH": "Giải trừ bớt bệnh tật; cần chú ý sức khỏe khi làm việc văn phòng ngồi nhiều.",
    "TÀI BẠCH": "Thu nhập ổn định từ lương bổng chế độ cơ quan; tích lũy tài chính an toàn.",
    "TỬ TỨC": "Con cái ngoan ngoãn vâng lời kỷ luật; sau này có công việc nhà nước hoặc hành chính ổn định.",
    "PHU THÊ": "Bạn đời tính tình khuôn phép, chu đáo trong việc nội trợ đối ngoại; gia đình yên ấm.",
    "HUYNH ĐỆ": "Anh em sống có tôn ti trật tự, cư xử đúng mực phép tắc gia phong."
  },
  "Thiên Quan": {
    "MỆNH": "Tấm lòng Bồ Tát, hướng thiện tu tâm, thích làm việc phúc đức; gặp đại nạn đều có quý nhân vô hình che chở tai qua nạn khỏi.",
    "PHỤ MẪU": "Cha mẹ nhân đức, một đời làm việc thiện để phúc cho con cháu; gia đình êm ấm an hòa.",
    "PHÚC ĐỨC": "Âm đức dòng họ sâu dày, con cháu đời đời hưởng sự bình an thanh thản; bản thân có duyên lành với đạo pháp.",
    "ĐIỀN TRẠCH": "Nhà ở phong thủy an lành, nơi thờ tự linh thiêng; xóm giềng có nhiều người thiện lương hòa nhã.",
    "QUAN LỘC": "Làm việc có lương tâm đạo đức, liêm khiết chính trực; thích hợp công việc từ thiện, xã hội, tôn giáo, y tế.",
    "NÔ BỘC": "Bạn bè lương thiện chí tình, luôn đồng hành trong các hoạt động thiện nguyện; được nhiều người quý mến.",
    "THIÊN DI": "Ra ngoài luôn gặp người tốt cứu giúp, xuất hành đón nhận bình an; đi xa tạo nhiều phước duyên.",
    "TẬT ÁCH": "Giải trừ bệnh tật rất linh diệu, bệnh nặng hóa nhẹ nhờ đức độ; sức khỏe tinh thần an lạc.",
    "TÀI BẠCH": "Tiền tài trong sạch, kiếm tiền bằng sự lương thiện; tài lộc bền vững trường tồn, càng cho đi càng nhận lại nhiều.",
    "TỬ TỨC": "Con cái hiếu thảo, tính tình thiện lành, ngoan ngoãn; sau này tích tụ nhiều công đức cho dòng họ.",
    "PHU THÊ": "Vợ chồng đồng lòng hướng thiện, cùng nhau làm việc phước lành; gia đạo thuận hòa yên ấm trọn đời.",
    "HUYNH ĐỆ": "Anh em sống chan hòa nhân ái, không toan tính vụ lợi, đùm bọc yêu thương nhau."
  },
  "Thiên Phúc": {
    "MỆNH": "Phúc lộc trời ban, tính tình từ bi hỷ xả, luôn nghĩ cho người khác; cuộc đời gặp hung hóa cát, hậu vận an nhàn phú túc.",
    "PHỤ MẪU": "Cha mẹ hiền lương đức độ, để lại gia sản phúc đức quý báu cho con cái; con cháu hiếu kính phụng dưỡng.",
    "PHÚC ĐỨC": "Dòng họ phúc ấm dồi dào, mồ mả tổ tiên yên vị; con cháu đời sau được che chở bình an phát đạt.",
    "ĐIỀN TRẠCH": "Nhà cửa an cư lạc nghiệp, khí trường thanh tịnh; điền sản tích lũy vững vàng theo năm tháng.",
    "QUAN LỘC": "Công việc hanh thông nhờ phúc đức tổ phụ, đồng nghiệp yêu mến; làm việc gì cũng có người nâng đỡ.",
    "NÔ BỘC": "Được bạn bè quý mến tôn trọng, cấp dưới trung thành; không lo bị kẻ xấu hãm hại.",
    "THIÊN DI": "Ra ngoài bình an vô sự, đi đâu cũng có duyên lành che chở; xuất hành đại cát.",
    "TẬT ÁCH": "Tiêu trừ mọi tai ương bệnh tật, sống trường thọ và an nhiên; tinh thần thư thái.",
    "TÀI BẠCH": "Tiền bạc tích lũy từ phúc đức, không lo túng bấn; làm việc thiện càng sinh sôi tài lộc.",
    "TỬ TỨC": "Sinh con quý tử, con cái ngoan ngoãn có phúc tướng; sau này thành đạt và báo hiếu cha mẹ.",
    "PHU THÊ": "Hôn nhân đại cát, vợ chồng nhân duyên tiền định yêu thương nhau; gia đình phúc lộc đề huề.",
    "HUYNH ĐỆ": "Anh em hòa thuận, cùng nhau gìn giữ phúc đức tổ tiên, tương thân tương ái."
  },
  "Giải Thần": {
    "MỆNH": "Thần giải trừ ách nạn tọa Mệnh: gặp hung hóa cát, hóa giải hung sát tinh; người có phẩm hạnh đoan trang thanh cao.",
    "PHỤ MẪU": "Hóa giải xung khắc giữa cha mẹ và con cái; gia đình bình an, vượt qua được những giai đoạn sóng gió.",
    "PHÚC ĐỨC": "Âm phúc tổ tiên giải trừ được nhiều nghiệp chướng; dòng họ nhiều đời bình an tránh được tai kiếp.",
    "ĐIỀN TRẠCH": "Giải trừ sát khí phong thủy nhà ở, tránh được kiện tụng tranh chấp đất đai; gia trạch an ổn.",
    "QUAN LỘC": "Hóa giải thị phi chốn công sở, tai qua nạn khỏi trong sự nghiệp; thăng tiến bền vững.",
    "NÔ BỘC": "Hóa giải hiểu lầm mâu thuẫn với bạn bè; đối tác làm ăn giữ được hòa khí.",
    "THIÊN DI": "Ra ngoài gặp nạn có người ứng cứu, xuất hành giải trừ rủi ro dọc đường; luôn bình an trở về.",
    "TẬT ÁCH": "Đệ nhất Giải ách tinh: tiêu trừ bệnh tật, gặp thuốc tốt thầy hay chữa khỏi bệnh; bảo toàn tính mạng.",
    "TÀI BẠCH": "Giảm thiểu rủi ro thất thoát tiền của; hóa giải các khoản nợ nần và tai họa tài chính.",
    "TỬ TỨC": "Hóa giải trắc trở đường sinh nở nuôi con; con cái khỏe mạnh bình an vượt qua bệnh vặt.",
    "PHU THÊ": "Hóa giải xung đột khắc khẩu vợ chồng; giữ cho hôn nhân không bị tan vỡ trước sóng gió.",
    "HUYNH ĐỆ": "Hóa giải bất hòa trong anh em, hàn gắn tình cảm gia đình rạn nứt."
  },
  "Thiên Giải": {
    "MỆNH": "Giải trừ tai ương ách nạn từ trời xanh ban phát; tính tình khoan dung độ lượng, tâm hồn an lạc.",
    "PHỤ MẪU": "Giải trừ bệnh tật và tai ương cho song thân; cha mẹ sống an nhàn thọ trường.",
    "PHÚC ĐỨC": "Phúc đức gia tộc được thanh lọc giải trừ oán hận tiền kiếp; con cháu hưởng sự bình an.",
    "ĐIỀN TRẠCH": "Hóa giải phong thủy xấu nơi cư ngụ; nhà cửa ngày càng vượng khí an lành.",
    "QUAN LỘC": "Giải tỏa bế tắc trong công việc, mở ra hướng đi mới thuận lợi; tai qua nạn khỏi.",
    "NÔ BỘC": "Hóa giải oán thù, biến thù thành bạn; quan hệ xã hội được thanh lọc trong sáng.",
    "THIÊN DI": "Ra ngoài bình an, hóa giải mọi hiểm nguy dọc đường; xuất hành gặp nhiều may mắn.",
    "TẬT ÁCH": "Cứu chữa bệnh tật kịp thời, tiêu trừ mầm mống ung nhọt bệnh hiểm; sức khỏe hồi phục kỳ diệu.",
    "TÀI BẠCH": "Hóa giải nguy cơ phá sản, thất thoát tiền bạc; tài chính sớm cân bằng ổn định.",
    "TỬ TỨC": "Con cái bình an vượt qua các kỳ hạn ách; gia đình luôn có sự che chở thiêng liêng.",
    "PHU THÊ": "Giải trừ nghi kỵ hiểu lầm giữa vợ chồng; tình cảm sau cơn mưa trời lại sáng.",
    "HUYNH ĐỆ": "Hòa giải mâu thuẫn anh em, gia đình giữ được sự đoàn kết đùm bọc."
  },
  "Địa Giải": {
    "MỆNH": "Đất lành chim đậu: tính tình đôn hậu thực tế, giải trừ hung họa tại thế gian; gặp khó khăn luôn tìm ra giải pháp thực tế.",
    "PHỤ MẪU": "Cha mẹ hiền từ, đất đai gia đình phong thủy an lành; con cái phụng dưỡng báo hiếu.",
    "PHÚC ĐỨC": "Đất táng mồ mả tổ tiên đắc địa sinh khí; âm phần phù hộ con cháu phát đạt bình an.",
    "ĐIỀN TRẠCH": "Giải trừ mọi tranh chấp nhà đất, mua bán đất đai êm xuôi; an cư lạc nghiệp vững vàng.",
    "QUAN LỘC": "Thực thi công việc bài bản, hóa giải khó khăn thực tế; sự nghiệp phát triển ổn định chắc chắn.",
    "NÔ BỘC": "Bạn bè chân thành giúp đỡ trong cuộc sống thực tế; quan hệ xã hội bền chặt.",
    "THIÊN DI": "Ra ngoài hòa nhập nhanh với phong thổ xứ người; đi đâu cũng tìm được nơi nương tựa vững chắc.",
    "TẬT ÁCH": "Mau khỏi bệnh tật nhờ chế độ dinh dưỡng và lối sống điều độ; sức khỏe dồi dào.",
    "TÀI BẠCH": "Tài chính vững vàng trên cơ sở kinh doanh thực tế; hóa giải nguy cơ hao hụt tiền của.",
    "TỬ TỨC": "Con cái ngoan ngoãn, biết chăm lo việc nhà thực tế; tương lai có nghề nghiệp vững vàng.",
    "PHU THÊ": "Vợ chồng cùng nhau chăm lo vun vén kinh tế gia đình; gia đạo yên ấm thiết thực.",
    "HUYNH ĐỆ": "Anh em giúp đỡ nhau nhà cửa đất đai, tương trợ thiết thực trong đời sống."
  },
  "Thiên Y": {
    "MỆNH": "Thần y hộ mệnh: có duyên với ngành y dược, thảo mộc, trị liệu hoặc sức khỏe dẻo dai; tính tình sạch sẽ ngăn nắp.",
    "PHỤ MẪU": "Cha mẹ có người làm ngành y hoặc biết cách dưỡng sinh; con cái được chăm sóc sức khỏe chu đáo.",
    "PHÚC ĐỨC": "Dòng họ có người làm nghề bốc thuốc cứu người để lại phúc lớn; con cháu ít mắc bệnh hiểm.",
    "ĐIỀN TRẠCH": "Nhà cửa thoáng đãng, vệ sinh sạch sẽ có lợi cho sức khỏe; trong nhà hay có tủ thuốc gia đình đầy đủ.",
    "QUAN LỘC": "Đắc cách trong ngành y tế, dược phẩm, điều dưỡng, chăm sóc sức khỏe, công nghệ sinh học.",
    "NÔ BỘC": "Có bạn bè là bác sĩ dược sĩ giỏi; khi đau ốm luôn được bạn bè y tế tận tình hỗ trợ.",
    "THIÊN DI": "Ra ngoài hợp phong thổ, thích nghi môi trường mới tốt; đi xa ít khi bị ốm đau cảm mạo.",
    "TẬT ÁCH": "Cung Tật đắc Thiên Y là phúc lớn: gặp đúng thầy thuốc giỏi chữa trị kịp thời, giải trừ bệnh nan y.",
    "TÀI BẠCH": "Kiếm tiền từ ngành y tế, chăm sóc sức khỏe, bảo hiểm, thực phẩm chức năng; tài lộc bền vững.",
    "TỬ TỨC": "Con cái sinh ra khỏe mạnh, sức đề kháng tốt; sau này có thể theo ngành y dược cứu người.",
    "PHU THÊ": "Bạn đời chu đáo, biết chăm sóc sức khỏe miếng ăn giấc ngủ cho cả gia đình; gia đạo an lành.",
    "HUYNH ĐỆ": "Anh em biết quan tâm chăm sóc sức khỏe lẫn nhau, hỗ trợ nhau khi ốm đau."
  },
  "Thiên Tài": {
    "MỆNH": "Tài năng thiên bẩm, tư duy sáng tạo thông minh; song cần chú ý khiêm tốn tu dưỡng để tránh \"tài tình chi lắm cho trời đất ghen\".",
    "PHỤ MẪU": "Cha mẹ có tài năng đặc biệt; con cái thừa hưởng trí thông minh từ gia đình.",
    "PHÚC ĐỨC": "Dòng họ nhiều người tài hoa; bản thân cần làm việc thiện để chuyển hóa tài năng thành phúc đức trường tồn.",
    "ĐIỀN TRẠCH": "Có tài năng cải tạo thiết kế nhà cửa; cơ ngơi mang dấu ấn sáng tạo riêng biệt.",
    "QUAN LỘC": "Phát huy tài năng thiên bẩm trong công việc, sáng tạo nhiều giải pháp đột phá; được công nhận tài ba.",
    "NÔ BỘC": "Bạn bè nhiều người tài giỏi; hỗ trợ nhau trao đổi tri thức và kỹ năng chuyên môn.",
    "THIÊN DI": "Ra ngoài thể hiện tài năng được xã hội khen ngợi; đi xa có nhiều đất dụng võ.",
    "TẬT ÁCH": "Dùng trí tuệ chăm sóc sức khỏe; cẩn thận hao tổn tâm trí vì suy nghĩ quá nhiều.",
    "TÀI BẠCH": "Kiếm tiền bằng tài năng thiên bẩm, giải pháp sáng tạo; tài lộc đến từ chất xám vượt trội.",
    "TỬ TỨC": "Con cái thông minh có năng khiếu đặc biệt từ nhỏ; cha mẹ cần tạo điều kiện ươm mầm tài năng.",
    "PHU THÊ": "Vợ chồng cảm phục tài năng của nhau; cùng nhau chia sẻ tri thức và xây dựng cuộc sống.",
    "HUYNH ĐỆ": "Anh em có người tài năng xuất chúng, mang lại niềm tự hào cho gia đình."
  },
  "Thiên Thọ": {
    "MỆNH": "Thọ mạng dài lâu, tính tình đôn hậu điềm đạm, khoan dung độ lượng; cuộc đời an nhiên trường thọ.",
    "PHỤ MẪU": "Cha mẹ sống lâu trường thọ cùng con cháu; gia đình nhiều thế hệ chung sống hòa thuận.",
    "PHÚC ĐỨC": "Phúc đức trường thọ tổ tiên sâu dày; dòng họ nhiều bậc cao niên thượng thọ, con cháu hưởng an lạc.",
    "ĐIỀN TRẠCH": "Nhà ở lâu dài bền vững qua nhiều thế hệ; nơi ở an lành tích tụ vượng khí.",
    "QUAN LỘC": "Sự nghiệp bền bỉ lâu dài, càng về hậu vận càng thăng hoa; làm việc kiên trì đến tuổi già.",
    "NÔ BỘC": "Mối quan hệ bạn bè gắn bó tri kỷ suốt đời; bạn bè luôn tôn trọng sự đôn hậu của đương số.",
    "THIÊN DI": "Ra ngoài đi lại bình an; đi xa không lo tai kiếp nguy hiểm.",
    "TẬT ÁCH": "Cung Tật đắc Thiên Thọ: hóa giải bệnh nan y, gia tăng tuổi thọ, sống an nhàn khỏe mạnh khi về già.",
    "TÀI BẠCH": "Tài sản tích lũy bền vững trường tồn; về già không lo thiếu thốn tiền bạc.",
    "TỬ TỨC": "Con cái hiếu thảo phụng dưỡng cha mẹ đến tuổi già; con cháu đề huề sum vầy.",
    "PHU THÊ": "Vợ chồng sống bên nhau đến đầu bạc răng long; hôn nhân son sắt thủy chung trọn kiếp.",
    "HUYNH ĐỆ": "Anh em sống trường thọ, gắn kết tình nghĩa keo sơn suốt cuộc đời."
  },
  "Thiên Trù": {
    "MỆNH": "Có lộc ăn uống trời ban, khẩu vị tinh tế, khiếu nấu nướng sành sỏi; tính tình hào sảng mến khách.",
    "PHỤ MẪU": "Cha mẹ nấu ăn ngon, gia đình luôn ấm cúng với những bữa cơm sum họp; ẩm thực gia truyền.",
    "PHÚC ĐỨC": "Dòng họ có truyền thống ẩm thực phong phú; ngày giỗ chạp lễ tết cúng tế chu đáo thịnh soạn.",
    "ĐIỀN TRẠCH": "Nhà có gian bếp rộng rãi, ấm cúng và đầy đủ tiện nghi ẩm thực; nơi giữ lửa hạnh phúc.",
    "QUAN LỘC": "Rất hợp ngành ẩm thực, nhà hàng, khách sạn, chế biến thực phẩm, du lịch dịch vụ cao cấp.",
    "NÔ BỘC": "Bạn bè hay tụ họp ăn uống vui vẻ; luôn là chủ xị chiêu đãi người khác những món ngon.",
    "THIÊN DI": "Ra ngoài luôn có lộc ăn uống, đi đâu cũng được thưởng thức sơn hào hải vị đặc sản phương xa.",
    "TẬT ÁCH": "Cẩn trọng các bệnh về dạ dày, tiêu hóa, gout, mỡ máu do ăn uống quá phong phú; cần ăn uống điều độ.",
    "TÀI BẠCH": "Kiếm tiền từ ngành kinh doanh ẩm thực, F&B, nông sản thực phẩm; lộc ăn mang lại lộc tiền.",
    "TỬ TỨC": "Con cái ăn uống ngon miệng, bụ bẫm khỏe mạnh; sớm có khiếu nấu nướng tự chăm sóc bản thân.",
    "PHU THÊ": "Vợ chồng hòa hợp đường ăn uống, thích cùng nhau nấu ăn thưởng thức món ngon; gia đạo ấm áp.",
    "HUYNH ĐỆ": "Anh em thường xuyên sum họp tiệc tùng vui vẻ, chia sẻ những món ăn ngon truyền thống gia đình."
  },
  "Phong Cáo": {
    "MỆNH": "Được vinh danh ban thưởng, có bằng cấp khen tặng; tính tình đàng hoàng, danh giá vinh quy.",
    "PHỤ MẪU": "Cha mẹ được khen thưởng, có uy tín và giấy khen danh dự trong công tác xã hội.",
    "PHÚC ĐỨC": "Dòng họ có nhiều người được triều đình khen ngợi, lưu truyền gia phả vinh hiển.",
    "ĐIỀN TRẠCH": "Nhà có treo nhiều bằng khen, giấy chứng nhận danh dự; nơi ở khang trang được người nể trọng.",
    "QUAN LỘC": "Được trao huân huy chương, bằng khen, thăng chức chính danh; sự nghiệp được tập thể ghi nhận xứng đáng.",
    "NÔ BỘC": "Bạn bè và cấp dưới khâm phục thành tích; được đồng nghiệp đề bạt khen thưởng.",
    "THIÊN DI": "Ra ngoài được vinh danh, đi thi cử hoặc công cán gặt hái nhiều bằng khen giải thưởng mang về.",
    "TẬT ÁCH": "Hóa giải bớt ách nạn; sống ngay thẳng giữ gìn danh dự trong sạch.",
    "TÀI BẠCH": "Nhận được các khoản tiền thưởng lớn, học bổng hoặc tiền thưởng thành tích công lao.",
    "TỬ TỨC": "Con cái học giỏi, nhận nhiều giấy khen giải thưởng học sinh giỏi; làm rạng rỡ cha mẹ.",
    "PHU THÊ": "Bạn đời thành đạt có danh tiếng, mang lại sự hãnh diện lớn cho gia đình; vợ chồng vẻ vang.",
    "HUYNH ĐỆ": "Anh em có người được biểu dương khen thưởng thành tích xuất sắc trong công tác."
  },
  "Thai Phụ": {
    "MỆNH": "Tư chất thanh nhã, có học vị bằng sắc, phong thái đàng hoàng; người có tinh thần trách nhiệm cao.",
    "PHỤ MẪU": "Cha mẹ có học vấn, nề nếp gia phong; con cái được chăm lo ăn học đàng hoàng.",
    "PHÚC ĐỨC": "Dòng họ nhiều người đỗ đạt khoa bảng, con cháu đời sau nối dõi truyền thống học tập.",
    "ĐIỀN TRẠCH": "Nhà cửa ấm cúng ngăn nắp; giấy tờ pháp lý rõ ràng minh bạch.",
    "QUAN LỘC": "Thi cử thuận lợi, có bằng cấp chuyên môn cao; được bổ nhiệm vào các vị trí văn phòng quản lý.",
    "NÔ BỘC": "Bạn bè có học vấn, hỗ trợ nhau trong học tập công tác; cấp dưới ngoan ngoãn kỷ luật.",
    "THIÊN DI": "Ra ngoài được nể trọng về học vị; xuất hành đi thi cử hoặc đào tạo luôn đỗ đạt.",
    "TẬT ÁCH": "Giải trừ ách nạn bệnh tật; cần chú ý sức khỏe tinh thần điều độ.",
    "TÀI BẠCH": "Nguồn thu nhập ổn định từ bằng cấp và chức vụ chuyên môn; tài chính vững vàng.",
    "TỬ TỨC": "Con cái học hành sáng dạ, có bằng cấp cao; sau này làm rạng danh dòng tộc.",
    "PHU THÊ": "Bạn đời có học vị, tương xứng về trình độ; vợ chồng hỗ trợ nhau cùng học tập phát triển.",
    "HUYNH ĐỆ": "Anh em đều có ăn học đàng hoàng, có bằng cấp chứng chỉ chuyên môn cao."
  },
  "Văn Tinh": {
    "MỆNH": "Trí tuệ thông minh nhạy bén, đam mê học hỏi nghiên cứu; tư duy logic sắc sảo, học một biết mười.",
    "PHỤ MẪU": "Cha mẹ ham học hỏi, yêu sách vở; tạo môi trường học tập tốt nhất cho con cái.",
    "PHÚC ĐỨC": "Dòng họ có truyền thống hiếu học, nhiều người uyên thâm kinh sử chữ nghĩa.",
    "ĐIỀN TRẠCH": "Nhà ở yên tĩnh thích hợp cho việc đọc sách nghiên cứu; có góc học tập trang nghiêm.",
    "QUAN LỘC": "Thành công trong ngành giáo dục, nghiên cứu khoa học, viết lách sáng tạo, phân tích dữ liệu.",
    "NÔ BỘC": "Kết bạn với những người ham học, cùng nhau trao đổi tri thức bổ ích.",
    "THIÊN DI": "Ra ngoài mở mang tri thức, học hỏi được nhiều điều mới lạ nơi đất khách quê người.",
    "TẬT ÁCH": "Tâm trí sáng suốt giải trừ bớt tai ương; cẩn thận tật khúc xạ mắt hoặc đau nửa đầu.",
    "TÀI BẠCH": "Kiếm tiền từ tri thức chuyên môn và sáng chế; tài lộc bền vững dài lâu.",
    "TỬ TỨC": "Con cái hiếu học từ nhỏ, tự giác học bài thi cử đỗ đạt cao.",
    "PHU THÊ": "Bạn đời hiểu biết, yêu tri thức; vợ chồng cùng nhau đàm đạo nhân sinh triết lý.",
    "HUYNH ĐỆ": "Anh em cùng nhau khuyến khích học hành thành tài, noi gương lẫn nhau."
  },
  "Thiếu Dương": {
    "MỆNH": "Thông minh lanh lợi, nhìn xa trông rộng, nhân hậu lương thiện; nhưng đi liền Thiên Không nên cần tránh tự cao tự đại.",
    "PHỤ MẪU": "Cha mẹ thông minh tháo vát, yêu thương con cái; gia đình có tư tưởng tiến bộ.",
    "PHÚC ĐỨC": "Âm phúc tổ tiên khai sáng cho con cháu; dòng họ nhiều người tài trí sáng dạ.",
    "ĐIỀN TRẠCH": "Nhà cửa sáng sủa đón ánh bình minh; nơi ở tràn đầy năng lượng tươi mới tích cực.",
    "QUAN LỘC": "Nắm bắt cơ hội nhanh nhạy, nhiều sáng kiến đổi mới; nhưng cần thực tế, tránh ảo tưởng.",
    "NÔ BỘC": "Bạn bè thông minh hoạt bát, hỗ trợ nhau những ý tưởng mới mẻ trong công việc.",
    "THIÊN DI": "Ra ngoài năng động lanh lợi, tạo được thiện cảm tốt đẹp; xuất hành thuận lợi.",
    "TẬT ÁCH": "Sức khỏe dồi dào, tinh thần lạc quan; cẩn thận bệnh về mắt hoặc huyết áp.",
    "TÀI BẠCH": "Kiếm tiền nhanh nhạy nhờ đón đầu xu hướng; nhưng cần giữ vốn, tránh đầu tư viển vông.",
    "TỬ TỨC": "Con cái thông minh hoạt bát, nhanh nhẹn sáng dạ; tương lai học hành giỏi giang.",
    "PHU THÊ": "Bạn đời thông minh, khéo léo; vợ chồng cùng nhau chia sẻ những dự định tương lai.",
    "HUYNH ĐỆ": "Anh em nhanh nhẹn, tháo vát, hỗ trợ nhau mở mang cơ nghiệp."
  },
  "Thiếu Âm": {
    "MỆNH": "Nhu hòa nhẫn nhịn, nhân từ từ tốn, hay chịu thiệt thòi về mình để giữ hòa khí; hậu vận có đại phúc báo an nhiên.",
    "PHỤ MẪU": "Cha mẹ hiền hậu, chịu thương chịu khó vì con cái; gia đình tràn ngập tình thương ấm áp.",
    "PHÚC ĐỨC": "Âm đức sâu dày từ sự nhẫn nại của tổ tiên; con cháu đời sau được che chở bình an.",
    "ĐIỀN TRẠCH": "Nhà ở yên tĩnh, mát mẻ, khí trường ôn hòa; cuộc sống gia trạch êm ả thanh bình.",
    "QUAN LỘC": "Làm việc cẩn thận tỉ mỉ, được đồng nghiệp quý mến; kiên trì từng bước đạt được thành quả bền vững.",
    "NÔ BỘC": "Bạn bè hiền lành, quan hệ xã hội ôn hòa; không thích tranh chấp hơn thua với đời.",
    "THIÊN DI": "Ra ngoài dĩ hòa vi quý, tránh được nhiều va chạm xung đột; đi xa luôn bình an.",
    "TẬT ÁCH": "Bệnh tật mau khỏi nhờ tinh thần điềm đạm; cẩn thận chứng hàn lạnh cơ thể hoặc khí huyết hư.",
    "TÀI BẠCH": "Tiền bạc tích lũy từ tốn, chi tiêu có chừng mực; cuộc sống đủ đầy không lo thiếu hụt.",
    "TỬ TỨC": "Con cái ngoan ngoãn hiếu thuận, nết na thùy mị; sau này gia đình hòa thuận đề huề.",
    "PHU THÊ": "Người phối ngẫu dịu dàng, chu đáo, biết nhường nhịn; hôn nhân êm ấm không xảy ra to tiếng.",
    "HUYNH ĐỆ": "Anh em nhường nhịn thương yêu nhau, có việc gì cũng dĩ hòa vi quý."
  },
  "Long Đức": {
    "MỆNH": "Đức hạnh sáng ngời, lấy thiện tâm đãi người, hóa giải mọi hung hiểm nghịch cảnh; người có phúc tướng an nhiên.",
    "PHỤ MẪU": "Cha mẹ đức độ mẫu mực, dạy dỗ con cái làm lành lánh dữ; con cháu hiếu thảo.",
    "PHÚC ĐỨC": "Đệ nhất Cát tinh về âm phúc: tổ tiên đại đức, dòng họ đời đời hưng thịnh bình an.",
    "ĐIỀN TRẠCH": "Nhà ở đất lành chim đậu, phong thủy an bình vượng khí; gia trạch hòa thuận làm ăn phát đạt.",
    "QUAN LỘC": "Sự nghiệp hanh thông nhờ đạo đức nghề nghiệp; gặp nạn có quý nhân nâng đỡ thoát hiểm.",
    "NÔ BỘC": "Được bạn bè và cấp dưới hết lòng kính trọng vì đức độ; đối tác tin cậy hợp tác bền lâu.",
    "THIÊN DI": "Ra ngoài luôn gặp người tốt cứu giúp, xuất hành đón tài đón lộc bình an vô sự.",
    "TẬT ÁCH": "Hóa giải mọi bệnh tật tai ương, sống khỏe mạnh trường thọ; tâm lành thân an.",
    "TÀI BẠCH": "Tiền tài chính đáng từ công đức thiện lương; tài lộc dồi dào bền vững truyền đời.",
    "TỬ TỨC": "Con cái ngoan ngoãn, có đức hạnh cao đẹp, hiếu kính phụng dưỡng cha mẹ trọn đạo.",
    "PHU THÊ": "Hôn nhân đại cát, vợ chồng đạo nghĩa vẹn toàn; bạn đời là người hiền lương đức độ.",
    "HUYNH ĐỆ": "Anh em sống trọn tình trọn nghĩa, đùm bọc yêu thương nhau không vụ lợi toan tính."
  },
  "Phúc Đức": {
    "MỆNH": "Được trời Phật và gia tiên che chở, tâm tính thiện lương xua tan mọi tà khí sát tinh; cuộc đời thanh nhàn an lạc.",
    "PHỤ MẪU": "Cha mẹ sống nhân hậu trường thọ, tích đức lớn cho con cái; gia đình nề nếp gia phong.",
    "PHÚC ĐỨC": "Phúc tinh đắc vị tại cung Phúc: phúc ấm bao la, dòng họ nhiều người vinh hiển, con cháu đời đời hưởng lộc.",
    "ĐIỀN TRẠCH": "Nhà ở ấm cúng, khí trường linh thiêng an lành; cơ ngơi bền vững gia đạo thịnh vượng.",
    "QUAN LỘC": "Công việc thuận buồm xuôi gió, được quý nhân và cấp trên tin yêu; thăng tiến vững chắc.",
    "NÔ BỘC": "Bạn bè lương thiện, hết lòng giúp đỡ nhau khi gặp hoạn nạn khó khăn.",
    "THIÊN DI": "Ra ngoài tai qua nạn khỏi, đi xa có phúc thần che chở; xuất hành đại cát.",
    "TẬT ÁCH": "Giải trừ mọi bệnh tật hiểm nghèo, sống trường thọ an vui cùng con cháu.",
    "TÀI BẠCH": "Tài lộc dồi dào từ phúc đức tổ tiên để lại; làm ăn may mắn thuận lợi.",
    "TỬ TỨC": "Con cái hiếu thuận tuyệt vời, thông minh ngoan ngoãn; sau này thành danh rạng rỡ.",
    "PHU THÊ": "Hôn nhân hạnh phúc viên mãn, vợ chồng tương kính như tân; gia đình trong ấm ngoài êm.",
    "HUYNH ĐỆ": "Anh em hòa thuận, cùng nhau tu tâm tích đức làm rạng danh dòng tộc."
  },
  "Bệnh Phù": {
    "MỆNH": "Sức đề kháng có giai đoạn suy giảm, sắc diện kém tươi nhuận; cần chú trọng rèn luyện thể thao và dinh dưỡng điều độ.",
    "PHỤ MẪU": "Cha mẹ sức khỏe suy yếu, hay ốm đau vặt; con cái cần quan tâm chăm sóc thuốc men chu đáo.",
    "PHÚC ĐỨC": "Phúc trạch cần duy trì bằng việc phóng sinh, cầu an cho tổ tiên; dòng họ có người bệnh tật lâu năm.",
    "ĐIỀN TRẠCH": "Nhà ở cần thoáng khí, tránh ẩm mốc tối tăm tích tụ vi khuẩn; cải tạo ánh sáng để tăng dương khí.",
    "QUAN LỘC": "Công việc hay bị gián đoạn vì lý do sức khỏe mệt mỏi; cần cân bằng giữa làm việc và nghỉ ngơi.",
    "NÔ BỘC": "Bạn bè có người đau ốm cần giúp đỡ; tránh để công việc bị ảnh hưởng dây chuyền.",
    "THIÊN DI": "Ra ngoài dễ bị cảm mạo, dị ứng thời tiết nơi đất khách; cần chuẩn bị thuốc men đầy đủ khi đi xa.",
    "TẬT ÁCH": "Chủ về các bệnh mãn tính, cảm sốt dây dưa hoặc hệ miễn dịch suy yếu; cần thăm khám sức khỏe định kỳ.",
    "TÀI BẠCH": "Tiền bạc tốn kém vào việc chữa bệnh, mua thuốc men bồi bổ; cần có quỹ bảo hiểm y tế dự phòng.",
    "TỬ TỨC": "Con cái thuở nhỏ hay ốm sốt vặt, cần chú trọng dinh dưỡng tăng sức đề kháng.",
    "PHU THÊ": "Người phối ngẫu sức khỏe hơi yếu; vợ chồng cần đồng lòng chăm sóc sức khỏe cho nhau.",
    "HUYNH ĐỆ": "Trong anh em có người thể chất yếu, cần sự quan tâm chia sẻ của gia đình."
  },
  "Tử Phù": {
    "MỆNH": "Đề phòng rủi ro bất ngờ ập đến làm chậm bước tiến; cần luôn có kế hoạch dự phòng an toàn bảo vệ bản thân.",
    "PHỤ MẪU": "Cha mẹ có giai đoạn gặp biến cố sức khỏe hoặc kinh tế; con cái cần là điểm tựa vững vàng.",
    "PHÚC ĐỨC": "Mồ mả tổ tiên cần tu sửa dọn dẹp; đương số cần năng cầu an cho vong linh tổ phụ.",
    "ĐIỀN TRẠCH": "Cẩn trọng hao tổn tài sản nhà đất; mua bán cần thủ tục chặt chẽ tránh bị lừa.",
    "QUAN LỘC": "Công việc dễ gặp trở ngại đột ngột làm trì hoãn dự án; cần kiểm tra rà soát quy trình cẩn thận.",
    "NÔ BỘC": "Bạn bè có kẻ làm liên lụy; không nên tham gia các phi vụ kinh doanh mạo hiểm.",
    "THIÊN DI": "Ra ngoài đi đứng cẩn thận, tránh đi đêm một mình nơi vắng vẻ hiểm trở.",
    "TẬT ÁCH": "Đề phòng tai nạn bất ngờ hoặc bệnh cũ tái phát; chú ý an toàn lao động.",
    "TÀI BẠCH": "Tiền bạc dễ bị tiêu hao vì những sự cố ngoài ý muốn; nên giữ tiền an toàn.",
    "TỬ TỨC": "Nuôi dạy con cái cần cẩn trọng bảo bọc; con cái cần rèn luyện tính cẩn thận.",
    "PHU THÊ": "Vợ chồng tránh nghi ngờ cãi vã vô cớ; cùng nhau chia sẻ để vượt qua giai đoạn khó khăn.",
    "HUYNH ĐỆ": "Anh em có người gặp trắc trở, cần sự chung tay hỗ trợ của cả nhà."
  },
  "Quan Phù": {
    "MỆNH": "Cẩn trọng thủ tục giấy tờ, pháp lý minh bạch; tính tình nguyên tắc nhưng tránh lách luật để không vướng kiện tụng.",
    "PHỤ MẪU": "Cha mẹ cần cẩn thận các tranh chấp hợp đồng kinh tế hoặc thủ tục pháp lý.",
    "PHÚC ĐỨC": "Dòng họ cần giữ gìn nề nếp gia phong, tránh kiện tụng tranh chấp đất đai nội bộ.",
    "ĐIỀN TRẠCH": "Giấy tờ nhà đất cần sang tên công chứng chuẩn chỉnh, tránh tranh chấp quyền sở hữu.",
    "QUAN LỘC": "Làm việc theo đúng pháp luật quy chế; cẩn trọng thanh tra kiểm tra hồ sơ dự án.",
    "NÔ BỘC": "Hợp tác làm ăn với bạn bè cần hợp đồng văn bản rõ ràng, tránh cãi cọ tranh chấp về sau.",
    "THIÊN DI": "Ra ngoài tuân thủ nghiêm ngặt luật lệ giao thông và quy định nước sở tại.",
    "TẬT ÁCH": "Đề phòng rắc rối kiện tụng chốn công quyền ảnh hưởng tinh thần; giữ mình thanh liêm.",
    "TÀI BẠCH": "Tiền bạc cần hạch toán kế toán minh bạch, đóng thuế đầy đủ để tránh phạt hành chính.",
    "TỬ TỨC": "Dạy dỗ con cái chấp hành kỷ luật nhà trường xã hội nghiêm cẩn.",
    "PHU THÊ": "Vợ chồng phân định tài sản rõ ràng, hôn nhân cần sự minh bạch tránh nghi kỵ.",
    "HUYNH ĐỆ": "Anh em phân chia tài sản cần giấy tờ công chứng đàng hoàng để tránh xích mích."
  },
  "Quan Phủ": {
    "MỆNH": "Cẩn trọng miệng tiếng chốn công môn, tránh can dự vào việc bao đồng của người khác; làm việc minh bạch.",
    "PHỤ MẪU": "Gia đình cần giữ gìn uy tín, tránh thị phi đàm tiếu từ người ngoài.",
    "PHÚC ĐỨC": "Dòng họ tránh những bất hòa kiện tụng nội bộ dòng tộc; dĩ hòa vi quý.",
    "ĐIỀN TRẠCH": "Cẩn thận tranh chấp ranh giới đất đai với hàng xóm; cần dĩ hòa vi quý.",
    "QUAN LỘC": "Công việc cần lưu trữ hồ sơ chứng từ cẩn mật; đề phòng bị thanh tra soi xét.",
    "NÔ BỘC": "Tránh bảo lãnh hoặc đứng tên hộ giấy tờ cho bạn bè kẻo vướng rắc rối pháp lý.",
    "THIÊN DI": "Ra ngoài cẩn thận giấy tờ tùy thân, thị thực, tránh va chạm với cơ quan chức năng.",
    "TẬT ÁCH": "Giữ tâm trong sạch để tránh lo âu kiện tụng làm suy nhược cơ thể.",
    "TÀI BẠCH": "Tránh làm ăn mập mờ né thuế kẻo bị phạt nặng; tiền bạc cần minh bạch.",
    "TỬ TỨC": "Con cái cần được giáo dục tính trung thực, không bao che lỗi lầm.",
    "PHU THÊ": "Vợ chồng tránh to tiếng tranh cãi trước mặt người ngoài làm mất thể diện.",
    "HUYNH ĐỆ": "Anh em cư xử rạch ròi, không dây dưa nợ nần để giữ tình nghĩa dài lâu."
  },
  "Tướng Quân": {
    "MỆNH": "Khí phách dũng mãnh, tính tình can trường, có tư chất chỉ huy dẫn dắt; nhưng cẩn trọng tính nóng vội ham thắng.",
    "PHỤ MẪU": "Cha mẹ có người tính cách mạnh mẽ quyết đoán; gia đình có truyền thống kỷ cương.",
    "PHÚC ĐỨC": "Dòng họ có người làm tướng lĩnh quân sự hoặc lập công lớn; phúc ấm khí phách kiên cường.",
    "ĐIỀN TRẠCH": "Cơ ngơi vững chãi, cổng ngõ bề thế kiên cố; nơi ở an ninh nghiêm ngặt.",
    "QUAN LỘC": "Nắm quyền chỉ huy, điều hành dự án lớn, phong thái thủ lĩnh; dũng cảm tiên phong trong mọi thử thách.",
    "NÔ BỘC": "Cấp dưới phục tùng mệnh lệnh, trung thành tận tụy; bạn bè nể phục khí phách.",
    "THIÊN DI": "Ra ngoài xông pha trận mạc, bôn ba gặt hái thành công; luôn thể hiện được bản lĩnh đứng đầu.",
    "TẬT ÁCH": "Sức khỏe dẻo dai; cẩn thận tai nạn va chạm mạnh hoặc chấn thương thể thao.",
    "TÀI BẠCH": "Kiếm tiền quyết đoán, dám đầu tư lớn thu lợi lớn; nhưng cần biết dừng đúng lúc để bảo toàn vốn.",
    "TỬ TỨC": "Con cái tính tình mạnh mẽ, hiếu động, có tài lãnh đạo từ nhỏ; tương lai làm nên nghiệp lớn.",
    "PHU THÊ": "Bạn đời tính cách quyết đoán tháo vát; vợ chồng cần tôn trọng lẫn nhau, tránh tranh giành quyền chỉ huy.",
    "HUYNH ĐỆ": "Anh em có người khí phách vượt trội, dám đứng mũi chịu sào bảo vệ gia đình."
  },
  "Đẩu Quân": {
    "MỆNH": "Đẩu Quân tọa Mệnh: tính tình cẩn trọng, nghiêm nghị, tay hòm chìa khóa; người giữ của rất chắc, quản lý chi tiêu nghiêm ngặt.",
    "PHỤ MẪU": "Cha mẹ quản lý tài chính gia đình chặt chẽ, chi tiêu tiết kiệm tích lũy cho con cái.",
    "PHÚC ĐỨC": "Dòng họ biết tích lũy gìn giữ của cải truyền đời; phúc ấm bền vững không bị thất thoát.",
    "ĐIỀN TRẠCH": "Cung Điền đắc Đẩu Quân: giữ chặt nhà đất cơ ngơi, không bao giờ để tài sản bị thất thoát ra ngoài.",
    "QUAN LỘC": "Thích hợp ngành kiểm toán, thủ quỹ, quản lý tài sản, ngân sách; làm việc cẩn mật chi li tuyệt đối.",
    "NÔ BỘC": "Bạn bè quan hệ sòng phẳng minh bạch từng đồng; không bao giờ để xảy ra nhập nhèm tài chính.",
    "THIÊN DI": "Ra ngoài chi tiêu có kế hoạch, không bao giờ phung phí; xuất hành luôn chuẩn bị kỹ lưỡng.",
    "TẬT ÁCH": "Cẩn trọng các chứng bệnh tắc nghẽn, sỏi thận, táo bón hoặc khí huyết kém lưu thông.",
    "TÀI BẠCH": "Cung Tài đắc Đẩu Quân: tay hòm chìa khóa vàng, giữ tiền cẩn mật, của cải tích tụ ngày càng nhiều.",
    "TỬ TỨC": "Dạy dỗ con cái tính tiết kiệm kỷ luật từ nhỏ; con cái sau này biết quý trọng giá trị đồng tiền.",
    "PHU THÊ": "Người phối ngẫu biết quản lý chi tiêu gia đình chặt chẽ; không bao giờ để gia đình rơi vào cảnh thiếu thốn.",
    "HUYNH ĐỆ": "Anh em tài chính rạch ròi, tự tay quản lý cơ nghiệp riêng không ỷ lại nhau."
  },
  "Lưu Hà": {
    "MỆNH": "Tài ăn nói lưu loát như nước chảy, mưu trí linh hoạt; song cẩn trọng tai nạn sông nước, đò giang hoặc bệnh máu huyết.",
    "PHỤ MẪU": "Gia đình cha mẹ hay có sự di chuyển hoặc cư ngụ gần vùng sông nước kênh rạch.",
    "PHÚC ĐỨC": "Mồ mả tổ tiên gần nơi nguồn nước chảy xiết; dòng họ nhiều người làm ăn xa xứ phát đạt.",
    "ĐIỀN TRẠCH": "Nhà ở gần sông, kênh rạch hoặc nơi có hệ thống thoát nước lớn; cẩn thận ngập úng mùa mưa.",
    "QUAN LỘC": "Thích hợp ngành nghề ngoại giao, thủy hải sản, hàng hải, kinh doanh lưu thông, truyền thông diễn thuyết.",
    "NÔ BỘC": "Bạn bè giao thiệp rộng như nước chảy; ăn nói cuốn hút được nhiều người chú ý.",
    "THIÊN DI": "Ra ngoài cẩn trọng khi đi qua phà đò, tắm biển, du lịch sông nước; tránh xa nơi nước sâu xoáy.",
    "TẬT ÁCH": "Đề phòng tai nạn đuối nước, bệnh về máu huyết, thiếu máu, phụ khoa (với nữ) hoặc trúng độc thực phẩm.",
    "TÀI BẠCH": "Dòng tiền luân chuyển liên tục như nước chảy; kinh doanh buôn bán thu tiền mặt nhanh chóng.",
    "TỬ TỨC": "Nữ giới khi sinh nở cần chú ý vấn đề băng huyết hoặc sinh mổ; con cái sau này ăn nói lưu loát.",
    "PHU THÊ": "Vợ chồng lời ăn tiếng nói ngọt ngào; cần cẩn trọng tránh thị phi lời ong tiếng ve từ bên ngoài.",
    "HUYNH ĐỆ": "Anh em tính tình hoạt bát, giao thiệp rộng rãi mỗi người một phương."
  },
  "Thiên La": {
    "MỆNH": "Lưới Trời vây bủa (tại Thìn): tiền vận nhiều phen bế tắc trăn trở, cảm giác bị giam hãm tài năng; cần kiên trì tu dưỡng chờ thời cơ bứt phá.",
    "PHỤ MẪU": "Mối quan hệ với cha mẹ có giai đoạn khó gỡ nút thắt; cần sự bao dung kiên nhẫn.",
    "PHÚC ĐỨC": "Phúc trạch có nghiệp lực cần hóa giải; đương số nên làm việc thiện, tu thân tích đức để giải tỏa lưới nghiệp.",
    "ĐIỀN TRẠCH": "Nhà đất dễ vướng quy hoạch hoặc tranh chấp thủ tục; cần tìm hiểu kỹ quy hoạch trước khi mua.",
    "QUAN LỘC": "Công việc có giai đoạn tiến thoái lưỡng nan, áp lực bủa vây; kiên trì chịu đựng qua giai đoạn thử thách sẽ thành công.",
    "NÔ BỘC": "Bạn bè dễ có người làm vướng bận rắc rối; cẩn thận kẻo bị lôi kéo vào rắc rối tập thể.",
    "THIÊN DI": "Ra ngoài đề phòng bị lạc đường hoặc vướng vào tình huống khó xử; xuất hành cần cẩn trọng.",
    "TẬT ÁCH": "Đề phòng bệnh về phổi, phế quản hoặc cảm giác bế tắc tức ngực khó thở; cần luyện thở khí công.",
    "TÀI BẠCH": "Dòng tiền có giai đoạn bị đóng băng hoặc kẹt vốn; tránh vay nợ chồng chất.",
    "TỬ TỨC": "Nuôi dạy con cái cần kiên nhẫn, gỡ bỏ những áp lực tâm lý cho con cái tuổi mới lớn.",
    "PHU THÊ": "Hôn nhân có giai đoạn cảm thấy bế tắc ràng buộc; cần lắng nghe chia sẻ để cởi trói tâm lý cho nhau.",
    "HUYNH ĐỆ": "Anh em có người gặp hoàn cảnh bế tắc cần sự động viên nâng đỡ của gia đình."
  },
  "Địa Võng": {
    "MỆNH": "Lưới Đất giăng bẫy (tại Tuất): nhiều thử thách cam go rèn luyện ý chí; vượt qua được bẫy chông gai sẽ trở thành bậc kiệt xuất phi thường.",
    "PHỤ MẪU": "Cha mẹ có giai đoạn thăng trầm gian khổ; đương số sớm rèn luyện tính kiên cường chịu đựng.",
    "PHÚC ĐỨC": "Dòng họ có nhiều việc âm phần cần tu sửa tạ mộ; bản thân năng làm việc phước thiện để giải tỏa.",
    "ĐIỀN TRẠCH": "Cẩn thận tranh chấp ranh giới đất đai hoặc nhà ở trong ngõ sâu ngoằn ngoèo khó đi.",
    "QUAN LỘC": "Sự nghiệp nhiều áp lực rào cản; phải có ý chí sắt đá và phương pháp khoa học mới bứt phá ra khỏi lưới vây.",
    "NÔ BỘC": "Cẩn trọng bị vướng vào các mối quan hệ phức tạp khó dứt; chọn bạn mà chơi.",
    "THIÊN DI": "Ra ngoài cẩn thận bẫy lừa lọc nơi đất khách; luôn giữ sự tỉnh táo cảnh giác cao độ.",
    "TẬT ÁCH": "Đề phòng bệnh mãn tính dây dưa ở hệ tiêu hóa hoặc xương khớp; cần điều trị kiên trì.",
    "TÀI BẠCH": "Tài chính tránh vướng vào các bẫy tín dụng đen hoặc nợ nần dây dưa; giữ tài chính an toàn.",
    "TỬ TỨC": "Con cái cần được định hướng rõ ràng, tránh để con sa đà vào các cám dỗ mạng xã hội.",
    "PHU THÊ": "Vợ chồng cần đồng lòng vượt qua giai đoạn khó khăn tài chính; tránh đổ lỗi cho nhau.",
    "HUYNH ĐỆ": "Anh em giúp đỡ nhau tháo gỡ khó khăn trong cuộc sống, đoàn kết vượt khó."
  },
  "Thiên Thương": {
    "MỆNH": "Nỗi thương đau trắc trở; đòi hỏi đương số rèn luyện tâm tính vững vàng, biến nghịch cảnh thành động lực vươn lên.",
    "PHỤ MẪU": "Gia đình từng trải qua phen buồn phiền tổn thất; con cái cần hiếu nghĩa bù đắp.",
    "PHÚC ĐỨC": "Phúc trạch có vết thương cần hàn gắn bằng công đức; năng phóng sinh cầu an cho tổ tiên.",
    "ĐIỀN TRẠCH": "Cẩn thận mua bán nhà đất bị thua lỗ hoặc hỏng hóc tài sản; cần cẩn trọng.",
    "QUAN LỘC": "Công việc dễ gặp tổn thất hoặc thất bại tạm thời; cần rút ra bài học kinh nghiệm sâu sắc để làm lại.",
    "NÔ BỘC": "Bạn bè có người làm tổn thương lòng tin; không nên đặt trọn niềm tin vào người ngoài.",
    "THIÊN DI": "Ra ngoài đề phòng tai nạn thương tích hoặc mất mát đồ đạc; xuất hành luôn cẩn trọng.",
    "TẬT ÁCH": "Cẩn thận bệnh tật phát tác làm hao tổn sức khỏe; cần bồi dưỡng cơ thể kịp thời.",
    "TÀI BẠCH": "Đề phòng thua lỗ tài chính bất ngờ; không bao giờ mạo hiểm tiền của vào canh bạc đỏ đen.",
    "TỬ TỨC": "Nuôi con cần chú ý an toàn cho con, tránh để con bị tai nạn té ngã trầy xước.",
    "PHU THÊ": "Tình duyên có giai đoạn chịu nhiều tổn thương buồn phiền; cần bao dung hàn gắn vết thương lòng.",
    "HUYNH ĐỆ": "Anh em có người gặp hoạn nạn tổn thất, cần sự cưu mang đùm bọc của gia đình."
  },
  "Thiên Sứ": {
    "MỆNH": "Sứ giả nghiệp báo: nhắc nhở đương số luôn giữ mình chính trực, làm việc đúng pháp luật và đạo đức nhân quả.",
    "PHỤ MẪU": "Cha mẹ cần chú ý sức khỏe khi bước vào đại vận lớn; con cái chăm sóc chu đáo.",
    "PHÚC ĐỨC": "Tổ phụ nhắc nhở con cháu giữ gìn gia phong đạo đức, năng làm việc thiện để tiêu nghiệp.",
    "ĐIỀN TRẠCH": "Nhà ở cần giữ sự trang nghiêm thanh tịnh, thờ phụng gia tiên chu đáo.",
    "QUAN LỘC": "Làm việc công tâm, không lạm quyền vụ lợi kẻo gặp họa giáng chức bất ngờ.",
    "NÔ BỘC": "Cảnh giác với những kẻ xu nịnh; giữ khoảng cách an toàn với người xấu.",
    "THIÊN DI": "Ra ngoài cẩn thận xe cộ đi lại, không đi vào những nơi nguy hiểm; xuất hành cẩn trọng.",
    "TẬT ÁCH": "Cung Tật gặp Thiên Sứ: cẩn trọng biến cố sức khỏe bất ngờ, cần khám bệnh định kỳ nghiêm ngặt.",
    "TÀI BẠCH": "Tiền bạc kiếm được bằng con đường chính đạo mới bền; tránh tiền tài bất minh.",
    "TỬ TỨC": "Dạy dỗ con cái đạo lý nhân quả từ bé để tích phúc cho tương lai.",
    "PHU THÊ": "Hôn nhân cần sự chung thủy và trách nhiệm; tránh làm tổn thương bạn đời.",
    "HUYNH ĐỆ": "Anh em sống có trách nhiệm đạo nghĩa với nhau, không tranh giành quyền lợi."
  },
  "Hóa Kỵ": {
    "MỆNH": "Mây mù che phủ: tính tình đa nghi, nội tâm trăn trở, hay gặp thị phi đàm tiếu ghen ghét; song nếu đắc địa tại Sửu Mùi thì biến thành cơ mưu sâu sắc vượt bậc.",
    "PHỤ MẪU": "Cha mẹ và con cái dễ có sự khắc khẩu, hiểu lầm ngấm ngầm; cần chủ động lắng nghe để tháo gỡ khoảng cách thế hệ.",
    "PHÚC ĐỨC": "Tâm trí hay dằn vặt lo âu, dòng họ có người bất hòa tranh chấp; đương số nên tu tâm dưỡng tính, thiền định để xua tan mây mờ u uất.",
    "ĐIỀN TRẠCH": "Nhà ở dễ bị ẩm thấp, thiếu ánh sáng hoặc hàng xóm hay dòm ngó xoi mói; cẩn thận tranh chấp giấy tờ pháp lý nhà đất.",
    "QUAN LỘC": "Sự nghiệp hay bị tiểu nhân ghen ghét đâm chọc sau lưng, dèm pha bôi nhọ; cần làm việc minh bạch chuẩn mực và giữ mồm miệng kín kẽ.",
    "NÔ BỘC": "Bạn bè dễ trở mặt, làm ơn mắc oán, hay bị người khác hiểu lầm lòng tốt; tuyệt đối không nên can dự vào chuyện thị phi của người khác.",
    "THIÊN DI": "Ra ngoài hay gặp thị phi khẩu thiệt, tai bay vạ gió, người đời ghen ăn tức ở; xuất hành cần giữ thái độ nhã nhặn khiêm nhường.",
    "TẬT ÁCH": "Cung Tật có Hóa Kỵ lại là thế cát: cuốn hút bệnh tật tiêu tan vào hư không; tuy nhiên cẩn thận bệnh về mắt, gan mật hoặc ngộ độc thực phẩm.",
    "TÀI BẠCH": "Tiền bạc dễ bị tranh chấp, quỵt nợ hoặc hao tổn vì thị phi kiện tụng; cần giữ tài chính rõ ràng minh bạch, tránh cho vay mượn mập mờ.",
    "TỬ TỨC": "Nuôi con thuở nhỏ hay lo nghĩ vì con ốm sốt; con cái tính tình nhạy cảm, dễ tủi thân hờn dỗi, cha mẹ cần kiên nhẫn vỗ về thấu hiểu.",
    "PHU THÊ": "Vợ chồng dễ nảy sinh nghi ngờ, ghen tuông vô cớ hoặc lời qua tiếng lại làm tổn thương nhau; cần sự tin tưởng tuyệt đối và bao dung độ lượng.",
    "HUYNH ĐỆ": "Anh em dễ có sự hiểu lầm nghi kỵ lẫn nhau; nên phân minh rõ ràng trong việc tiền bạc và trách nhiệm để giữ hòa khí gia đình."
  },
  "Thiên Đức": {
    "MỆNH": "Tâm tính từ bi, độ lượng, nhân hậu, được thần linh gia hộ, gặp nguy biến hóa an lành.",
    "PHỤ MẪU": "Cha mẹ hiền từ, đức độ, thương yêu con cái hết lòng, tích âm đức lớn cho con cháu.",
    "PHÚC ĐỨC": "Dòng họ tích thiện phùng thiện, tổ tiên phù hộ độ trì, đương số hưởng cuộc sống an yên.",
    "ĐIỀN TRẠCH": "Nhà cửa yên tĩnh, đất lành chim đậu, phong thủy an lành, gia đạo hòa thuận.",
    "QUAN LỘC": "Làm việc công chính liêm minh, sự nghiệp hanh thông nhờ đạo đức và uy tín, được đồng nghiệp kính nể.",
    "NÔ BỘC": "Bạn bè lương thiện, cấp dưới trung thành, nhận được sự giúp đỡ chí tình khi gặp khó khăn.",
    "THIÊN DI": "Ra ngoài được quý nhân yêu mến, gặp may mắn trên đường đời, tai qua nạn khỏi khi xuất hành.",
    "TẬT ÁCH": "Đại phúc tinh giải ách, tiêu trừ tật bệnh, ốm đau mau khỏi, gặp thầy thuốc giỏi cứu chữa.",
    "TÀI BẠCH": "Kiếm tiền bằng chính đạo, tài lộc bền vững, không tham của phi nghĩa, càng thiện tâm càng tụ lộc.",
    "TỬ TỨC": "Con cái ngoan ngoãn, hiếu thảo, tính tình thiện lương, sớm biết yêu thương giúp đỡ cha mẹ.",
    "PHU THÊ": "Vợ chồng hòa thuận, tương kính như tân, người phối ngẫu hiền thục đức độ, cùng nhau vun đắp tổ ấm.",
    "HUYNH ĐỆ": "Anh em ruột thịt yêu thương đùm bọc, không toan tính thiệt hơn, sẵn sàng giúp nhau lúc hoạn nạn."
  },
  "Nguyệt Đức": {
    "MỆNH": "Dung mạo đoan trang thanh tú, tính tình nhu thuận, hòa nhã, được mọi người quý mến, giải trừ mọi oán hờn.",
    "PHỤ MẪU": "Mẹ hiền từ dịu dàng, cha mẹ mẫu mực, gia phong nề nếp, con cái lớn lên trong sự ấm áp.",
    "PHÚC ĐỨC": "Phúc ấm nữ phái dòng họ thịnh vượng, đời sống tâm hồn thanh thản, tinh thần an định không vướng bụi trần.",
    "ĐIỀN TRẠCH": "Chốn ở êm đềm, ngập tràn sinh khí thanh sạch, gia đình sum vầy yên vui.",
    "QUAN LỘC": "Môi trường làm việc chan hòa, công danh thăng tiến vững chắc nhờ tính cách điềm đạm và đức hạnh.",
    "NÔ BỘC": "Kết giao với những người bạn tri kỷ chân thành, cấp dưới hết lòng phò trợ, không lo phản trắc.",
    "THIÊN DI": "Ra ngoài xã hội có duyên ăn nói, được mọi người nâng đỡ, đi xa gặp nhiều điều lành bất ngờ.",
    "TẬT ÁCH": "Hóa giải ưu tư phiền muộn, thân tâm an lạc, bệnh tật hiểm nghèo đều có cơ may qua khỏi.",
    "TÀI BẠCH": "Tiền tài hanh thông, nguồn thu trong sạch, được quý nhân phái nữ giúp đỡ về kinh tế.",
    "TỬ TỨC": "Sinh con thông minh, diện mạo khôi ngô tuấn tú, con cái hiếu kính và có đạo đức mẫu mực.",
    "PHU THÊ": "Người phối ngẫu đoan trang, dịu hiền, là hậu phương vững chắc giúp đương số an tâm phát triển.",
    "HUYNH ĐỆ": "Tình cảm chị em, anh em hòa thuận, không tranh chấp tài sản, luôn giữ trọn đạo nghĩa gia đình."
  },
  "Hóa Khoa": {
    "MỆNH": "Trí tuệ siêu việt, học rộng tài cao, danh tiếng thanh bạch, là bậc học giả hoặc chuyên gia uy tín; gặp nạn hóa an.",
    "PHỤ MẪU": "Cha mẹ có học thức cao, có danh tiếng xã hội, nuôi dạy con cái bằng phương pháp khoa học khai minh.",
    "PHÚC ĐỨC": "Dòng họ vẻ vang truyền thống khoa bảng, nhiều bậc trí thức hiền tài, đương số hưởng tinh hoa trí tuệ.",
    "ĐIỀN TRẠCH": "Nhà cửa gia giáo, bài trí thanh nhã, gần trường học hoặc cơ quan văn hóa, phong thủy vượng khí học hành.",
    "QUAN LỘC": "Thi cử đăng khoa, thăng tiến bằng tài năng chuyên môn thực thụ, được xã hội tôn vinh, sự nghiệp lẫy lừng.",
    "NÔ BỘC": "Bè bạn toàn bậc trí thức danh giá, cộng sự đắc lực có học vấn cao giúp ích to lớn cho sự nghiệp.",
    "THIÊN DI": "Ra ngoài xã hội uy danh vang dội, đi xa đỗ đạt thành tài, ngoại giao bằng tri thức và văn hóa đỉnh cao.",
    "TẬT ÁCH": "Đệ nhất giải ách tinh, mọi bệnh tật hiểm nghèo đều tìm được thần y diệu dược, tai qua nạn khỏi kỳ diệu.",
    "TÀI BẠCH": "Kiếm tiền bằng tri thức, bằng cấp và danh tiếng chuyên gia; tài chính minh bạch, bền vững trọn đời.",
    "TỬ TỨC": "Con cái đỗ đạt khoa bảng, thông minh xuất chúng, học hành xuất sắc, rạng danh dòng tộc.",
    "PHU THÊ": "Người phối ngẫu có học thức uyên bác, văn hóa cao, cùng chung chí hướng và nâng đỡ danh tiếng của nhau.",
    "HUYNH ĐỆ": "Anh em có người thành đạt rực rỡ trên con đường học vấn, tương trợ nhau bằng tri thức và uy tín."
  },
  "Hóa Quyền": {
    "MỆNH": "Tính cách quyết đoán, có tố chất lãnh đạo bẩm sinh, nắm quyền chỉ huy, nói có người nghe đe có người sợ.",
    "PHỤ MẪU": "Cha mẹ nắm giữ vị thế lãnh đạo hoặc có quyền uy lớn trong gia đình và xã hội; gia giáo nghiêm cẩn.",
    "PHÚC ĐỨC": "Dòng họ có nhiều người nắm chức quyền hiển hách, dòng họ có uy thế lớn, đương số thừa hưởng uy phong.",
    "ĐIỀN TRẠCH": "Nắm quyền sở hữu nhiều điền sản lớn, tự tay quyết định quy hoạch nhà cửa, đứng tên bất động sản độc lập.",
    "QUAN LỘC": "Nắm giữ thực quyền, chức vụ cao trong cơ quan tổ chức, năng lực chỉ huy sắc bén, sự nghiệp thăng tiến thần tốc.",
    "NÔ BỘC": "Có uy quyền điều hành cấp dưới, nhân viên tuân lệnh phục tùng, kết giao với nhiều nhân vật có địa vị cao.",
    "THIÊN DI": "Ra ngoài nắm quyền chủ động trong mọi tình thế, ngoại giao quyết đoán, được xã hội vị nể và trao quyền lực.",
    "TẬT ÁCH": "Thể chất mạnh mẽ, ý chí quật cường chiến thắng bệnh tật, cần chú ý huyết áp và tính nóng vội gây tổn thương.",
    "TÀI BẠCH": "Nắm quyền chi phối dòng tiền lớn, quyết đoán trong đầu tư kinh doanh, làm chủ nguồn tài chính vững vàng.",
    "TỬ TỨC": "Con cái có cá tính mạnh, có chí tiến thủ cao, tương lai nắm giữ quyền hành và chức vụ lãnh đạo.",
    "PHU THÊ": "Vợ/chồng là người tài giỏi, có uy thế xã hội lớn; hai bên cần tôn trọng nhau tránh tranh giành quyền làm chủ.",
    "HUYNH ĐỆ": "Anh em ruột thịt có người nắm giữ chức quyền hiển vinh, hỗ trợ nhau về mặt thế lực và uy tín xã hội."
  },
  "Hóa Lộc": {
    "MỆNH": "Bản mệnh giàu phúc lộc, tính tình hào sảng vui vẻ, cơ hội làm giàu luôn tự tìm đến, cả đời không lo thiếu thốn.",
    "PHỤ MẪU": "Cha mẹ làm ăn phát đạt, kinh tế sung túc, để lại nhiều tài sản giá trị và nền tảng tài chính vững chắc cho con.",
    "PHÚC ĐỨC": "Dòng họ hưng vượng tài lộc, hưởng phúc ấm tổ tiên dư dả, đương số có số hưởng thụ an nhàn, giàu sang.",
    "ĐIỀN TRẠCH": "Điền sản màu mỡ sinh lời lớn, mua may bán đắt nhà đất, nơi ở khang trang phú quý, tài lộc tích tụ đầy nhà.",
    "QUAN LỘC": "Công việc sinh nhiều bổng lộc, sự nghiệp hanh thông, dễ kiếm tiền từ chuyên môn và các dự án kinh doanh lớn.",
    "NÔ BỘC": "Bạn bè mang lại nhiều cơ hội làm ăn béo bở, cấp dưới tạo ra doanh thu lớn, đôi bên cùng thắng lợi.",
    "THIÊN DI": "Càng đi xa càng phát tài, xuất ngoại làm ăn tiền vào như nước, cơ hội làm giàu rộng mở trên mọi miền.",
    "TẬT ÁCH": "Tiêu trừ ách nạn về tiền bạc, bệnh tật có điều kiện kinh tế chữa trị bằng những dịch vụ y tế tốt nhất.",
    "TÀI BẠCH": "Cung vị hoàng kim của Hóa Lộc: tiền bạc cuồn cuộn đổ về, đa dạng nguồn thu, kinh doanh đại phát, phú quý tự nhiên thành.",
    "TỬ TỨC": "Sinh con mang lại tài lộc cho cha mẹ, hậu duệ khá giả giàu có, con cái sau này phụng dưỡng cha mẹ chu đáo.",
    "PHU THÊ": "Kết hôn xong kinh tế phất lên nhanh chóng, người phối ngẫu có tài kiếm tiền hoặc đem lại của cải cho đương số.",
    "HUYNH ĐỆ": "Anh em làm ăn phát đạt, giúp đỡ nhau về vốn liếng, cùng nhau hùn hạp kinh doanh thịnh vượng."
  }
};

  function normalizeStarName(name) {
    if (!name) return '';
    let clean = name.replace(/^L\./i, '').trim().replace(/\s+/g, ' ');
    const lower = clean.toLowerCase();
    const canonMap = {
      'tả phù': 'Tả Phù', 'tả phụ': 'Tả Phù', 'ta phu': 'Tả Phù',
      'hữu bật': 'Hữu Bật', 'huu bat': 'Hữu Bật',
      'thiên khôi': 'Thiên Khôi', 'thien khoi': 'Thiên Khôi',
      'thiên việt': 'Thiên Việt', 'thien viet': 'Thiên Việt',
      'văn xương': 'Văn Xương', 'van xuong': 'Văn Xương',
      'văn khúc': 'Văn Khúc', 'van khuc': 'Văn Khúc',
      'lộc tồn': 'Lộc Tồn', 'loc ton': 'Lộc Tồn',
      'thiên mã': 'Thiên Mã', 'thien ma': 'Thiên Mã',
      'đào hoa': 'Đào Hoa', 'dao hoa': 'Đào Hoa',
      'hồng loan': 'Hồng Loan', 'hong loan': 'Hồng Loan',
      'thiên hỷ': 'Thiên Hỷ', 'thien hy': 'Thiên Hỷ',
      'ân quang': 'Ân Quang', 'an quang': 'Ân Quang',
      'thiên quý': 'Thiên Quý', 'thien quy': 'Thiên Quý',
      'tam thai': 'Tam Thai',
      'bát tọa': 'Bát Tọa', 'bat toa': 'Bát Tọa',
      'long trì': 'Long Trì', 'long tri': 'Long Trì',
      'phượng các': 'Phượng Các', 'phuong cac': 'Phượng Các',
      'giải thần': 'Giải Thần', 'giai than': 'Giải Thần',
      'thiên quan': 'Thiên Quan', 'thien quan': 'Thiên Quan',
      'thiên phúc': 'Thiên Phúc', 'thien phuc': 'Thiên Phúc',
      'hoa cái': 'Hoa Cái', 'hoa cai': 'Hoa Cái',
      'quốc ấn': 'Quốc Ấn', 'quoc an': 'Quốc Ấn',
      'đường phù': 'Đường Phù', 'duong phu': 'Đường Phù',
      'thiên trù': 'Thiên Trù', 'thien tru': 'Thiên Trù',
      'thai phụ': 'Thai Phụ', 'thai phu': 'Thai Phụ',
      'phong cáo': 'Phong Cáo', 'phong cao': 'Phong Cáo',
      'thiên y': 'Thiên Y',
      'địa giải': 'Địa Giải', 'dia giai': 'Địa Giải',
      'thiên giải': 'Thiên Giải', 'thien giải': 'Thiên Giải',
      'văn tinh': 'Văn Tinh', 'van tinh': 'Văn Tinh',
      'thiên tài': 'Thiên Tài', 'thien tai': 'Thiên Tài',
      'thiên thọ': 'Thiên Thọ', 'thien tho': 'Thiên Thọ',
      'bác sỹ': 'Bác Sỹ', 'bac sy': 'Bác Sỹ', 'bác sĩ': 'Bác Sỹ',
      'lực sỹ': 'Lực Sỹ', 'luc sy': 'Lực Sỹ', 'lực sĩ': 'Lực Sỹ',
      'thanh long': 'Thanh Long',
      'tấu thư': 'Tấu Thư', 'tau thu': 'Tấu Thư',
      'hỷ thần': 'Hỷ Thần', 'hy than': 'Hỷ Thần',
      'thiếu dương': 'Thiếu Dương', 'thieu duong': 'Thiếu Dương',
      'thiếu âm': 'Thiếu Âm', 'thieu am': 'Thiếu Âm',
      'long đức': 'Long Đức', 'long duc': 'Long Đức',
      'phúc đức': 'Phúc Đức', 'phuc duc': 'Phúc Đức',
      'kình dương': 'Kình Dương', 'kinh duong': 'Kình Dương',
      'đà la': 'Đà La', 'da la': 'Đà La',
      'hỏa tinh': 'Hỏa Tinh', 'hoa tinh': 'Hỏa Tinh',
      'linh tinh': 'Linh Tinh',
      'địa không': 'Địa Không', 'dia khong': 'Địa Không',
      'địa kiếp': 'Địa Kiếp', 'dia kiep': 'Địa Kiếp',
      'thiên hình': 'Thiên Hình', 'thien hinh': 'Thiên Hình',
      'thiên diêu': 'Thiên Diêu', 'thien dieu': 'Thiên Diêu',
      'thiên khốc': 'Thiên Khốc', 'thien khoc': 'Thiên Khốc',
      'thiên hư': 'Thiên Hư', 'thien hu': 'Thiên Hư',
      'tang môn': 'Tang Môn', 'tang mon': 'Tang Môn',
      'bạch hổ': 'Bạch Hổ', 'bach ho': 'Bạch Hổ',
      'đại hao': 'Đại Hao', 'dai hao': 'Đại Hao',
      'tiểu hao': 'Tiểu Hao', 'tieu hao': 'Tiểu Hao',
      'cô thần': 'Cô Thần', 'co than': 'Cô Thần',
      'quả tú': 'Quả Tú', 'qua tu': 'Quả Tú',
      'kiếp sát': 'Kiếp Sát', 'kiep sat': 'Kiếp Sát',
      'phá toái': 'Phá Toái', 'pha toai': 'Phá Toái',
      'phi liêm': 'Phi Liêm', 'phi liem': 'Phi Liêm',
      'phục binh': 'Phục Binh', 'phuc binh': 'Phục Binh',
      'điếu khách': 'Điếu Khách', 'dieu khach': 'Điếu Khách',
      'trực phù': 'Trực Phù', 'truc phu': 'Trực Phù',
      'tử phù': 'Tử Phù', 'tu phu': 'Tử Phù',
      'bệnh phù': 'Bệnh Phù', 'benh phu': 'Bệnh Phù',
      'quan phù': 'Quan Phù', 'quan phu': 'Quan Phù',
      'quan phủ': 'Quan Phủ',
      'thái tuế': 'Thái Tuế', 'thai tue': 'Thái Tuế',
      'tuế phá': 'Tuế Phá', 'tue pha': 'Tuế Phá',
      'thiên không': 'Thiên Không', 'thien khong': 'Thiên Không',
      'lưu hà': 'Lưu Hà', 'luu ha': 'Lưu Hà',
      'thiên la': 'Thiên La',
      'địa võng': 'Địa Võng', 'dia vong': 'Địa Võng',
      'thiên thương': 'Thiên Thương', 'thien thuong': 'Thiên Thương',
      'thiên sứ': 'Thiên Sứ', 'thien su': 'Thiên Sứ',
      'đẩu quân': 'Đẩu Quân', 'dau quan': 'Đẩu Quân',
      'tướng quân': 'Tướng Quân', 'tuong quan': 'Tướng Quân',
      'hóa kỵ': 'Hóa Kỵ', 'hoa ky': 'Hóa Kỵ',
      'thiên đức': 'Thiên Đức', 'thien duc': 'Thiên Đức',
      'nguyệt đức': 'Nguyệt Đức', 'nguyet duc': 'Nguyệt Đức',
      'hóa khoa': 'Hóa Khoa', 'hoa khoa': 'Hóa Khoa',
      'hóa quyền': 'Hóa Quyền', 'hoa quyen': 'Hóa Quyền',
      'hóa lộc': 'Hóa Lộc', 'hoa loc': 'Hóa Lộc'
    };
    return canonMap[lower] || clean;
  }

  function normalizePalaceName(palace) {
    if (!palace) return 'MỆNH';
    let p = palace.replace(/<[^>]*>/g, '').trim().toUpperCase();
    if (p.includes('MỆNH') || p.includes('MENH')) return 'MỆNH';
    if (p.includes('PHỤ MẪU') || p.includes('PHU MAU')) return 'PHỤ MẪU';
    if (p.includes('PHÚC') || p.includes('PHUC')) return 'PHÚC ĐỨC';
    if (p.includes('ĐIỀN') || p.includes('DIEN')) return 'ĐIỀN TRẠCH';
    if (p.includes('QUAN') || p.includes('SU NGHIEP')) return 'QUAN LỘC';
    if (p.includes('NÔ') || p.includes('NO BOC') || p.includes('BAN BE')) return 'NÔ BỘC';
    if (p.includes('DI') || p.includes('THIEN DI')) return 'THIÊN DI';
    if (p.includes('TẬT') || p.includes('TAT ACH') || p.includes('SUC KHOE')) return 'TẬT ÁCH';
    if (p.includes('TÀI') || p.includes('TAI BACH') || p.includes('TIEN BAC')) return 'TÀI BẠCH';
    if (p.includes('TỬ') || p.includes('TU TUC') || p.includes('CON CAI')) return 'TỬ TỨC';
    if (p.includes('PHU') || p.includes('PHU THE') || p.includes('HON NHAN')) return 'PHU THÊ';
    if (p.includes('HUYNH') || p.includes('HUYNH DE') || p.includes('ANH EM')) return 'HUYNH ĐỆ';
    return 'MỆNH';
  }

  function getPhuTinhPalaceMeaning(rawStarName, rawPalaceName, isSat, dacHam, isLuu) {
    const starName = (rawStarName || '').trim();
    const isLuuStar = isLuu || starName.startsWith('L.');
    const cleanStar = normalizeStarName(starName);
    const cleanPalace = normalizePalaceName(rawPalaceName);

    // 1. Direct 12-palace lookup
    let meaning = '';
    if (PHU_TINH_PALACE_DICT[cleanStar] && PHU_TINH_PALACE_DICT[cleanStar][cleanPalace]) {
      meaning = PHU_TINH_PALACE_DICT[cleanStar][cleanPalace];
    } else if (PHU_TINH_ANALYST[cleanStar]) {
      meaning = PHU_TINH_ANALYST[cleanStar];
    }

    // 2. If it is an annual transit (Lưu Tinh)
    if (isLuuStar) {
      const luuMeanings = {
        'Lộc Tồn': {
          'MỆNH': 'Lưu Lộc Tồn kích hoạt cơ hội tài chính bất ngờ trong năm hạn, đón nhận nhiều bổng lộc; song cẩn trọng Kình Đà lưu chiếu gây đố kỵ ngầm.',
          'TÀI BẠCH': 'Năm nay kích hoạt đại lộc tài chính, có khoản thu nhập ngoài dự kiến, tiền bạc vào nhà như nước.',
          'QUAN LỘC': 'Công danh trong năm khởi sắc mạnh mẽ, được giao phụ trách nguồn ngân sách lớn hoặc thăng chức tăng lương.',
          'ĐIỀN TRẠCH': 'Năm nay thuận lợi mua sắm tài sản lớn, tân trang nhà đất hoặc sinh lời từ bất động sản.',
          'PHU THÊ': 'Người phối ngẫu năm nay làm ăn phát tài, gia đạo có thêm nguồn tài chính dồi dào.'
        },
        'Kình Dương': {
          'MỆNH': 'Lưu Kình Dương nhập Mệnh: năm nay tính khí dễ nóng nảy cương cường; đề phòng va chạm xe cộ, tai nạn thương tích hoặc phẫu thuật dao kéo.',
          'TẬT ÁCH': 'Năm nay đề phòng tai nạn thương tích kim khí đổ máu hoặc phải can thiệp tiểu phẫu; cần hết sức cẩn thận khi lái xe.',
          'PHU THÊ': 'Vợ chồng năm nay dễ xảy ra tranh cãi nảy lửa; cần học cách nhẫn nhịn để giữ hòa khí gia đình.'
        },
        'Đà La': {
          'MỆNH': 'Lưu Đà La nhập Mệnh: năm nay mưu sự hay gặp cảnh dùng dằng, chậm trễ giấy tờ hoặc tiểu nhân ngấm ngầm cản trở; cần kiên nhẫn.',
          'QUAN LỘC': 'Công việc trong năm hay bị đình trệ, vướng mắc thủ tục kéo dài; cần rà soát kỹ lưỡng hồ sơ pháp lý.'
        },
        'Tang Môn': {
          'MỆNH': 'Lưu Tang Môn hội chiếu: trong năm tâm trạng hay trăn trở ưu tư; đề phòng trong gia đình dòng họ có người già đau ốm.',
          'PHỤ MẪU': 'Năm nay cần đặc biệt chú ý quan tâm sức khỏe của cha mẹ song thân, chu đáo thuốc men thăm hỏi.'
        },
        'Bạch Hổ': {
          'MỆNH': 'Lưu Bạch Hổ hội tụ: gia tăng quyết tâm và nghị lực vượt khó; song đề phòng tai nạn đổ máu, bệnh huyết áp hoặc thị phi khẩu thiệt.',
          'TẬT ÁCH': 'Cẩn trọng tai nạn va chạm hoặc bệnh về máu huyết trong năm nay; nên đi hiến máu nhân đạo để giải bớt sát khí.'
        },
        'Thiên Mã': {
          'MỆNH': 'Lưu Thiên Mã xung khởi: năm nay bôn ba di chuyển nhiều, có cơ hội xuất ngoại, công tác xa hoặc chuyển đổi môi trường thuận lợi.',
          'QUAN LỘC': 'Công việc trong năm có sự thuyên chuyển, đi công tác xa nhiều hoặc mở rộng chi nhánh thị trường mới.'
        },
        'Thái Tuế': {
          'MỆNH': 'Lưu Thái Tuế đáo Mệnh: một năm chuyển biến trọng đại, công danh và đời sống có nhiều bước ngoặt lớn; cần cẩn trọng lời ăn tiếng nói.',
          'QUAN LỘC': 'Năm nay sự nghiệp đối mặt với sự thay đổi lớn hoặc thanh tra kiểm tra; làm việc minh bạch sẽ vươn lên đỉnh cao.'
        }
      };

      if (luuMeanings[cleanStar] && luuMeanings[cleanStar][cleanPalace]) {
        return `<em>(Lưu niên hạn)</em> ${luuMeanings[cleanStar][cleanPalace]}`;
      } else if (meaning) {
        return `<em>(Lưu niên hội chiếu)</em> Trong năm hạn tác động mạnh đến cung ${cleanPalace}: ${meaning}`;
      }
    }

    if (dacHam && (dacHam === 'M' || dacHam === 'V' || dacHam === 'Đ')) {
      if (isSat) {
        return `${meaning} Đắc địa tại bản cung giúp biến hung thành dũng, rèn đúc ý chí kiên cường và khả năng bứt phá ngoạn mục.`;
      }
    }

    return meaning;
  }

  // Fallback general dictionary
  const PHU_TINH_ANALYST = {
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

  // ============================================================================
  // 4.5. PHỐI HỢP TINH HỆ & BỐ CỤC QUẦN TINH (CÁT TINH, SÁT TINH & GIAO TRANH CÂN BẰNG)
  // ============================================================================

  function synthesizeCatTinhCombination(cung, rawPalaceName, laSo) {
    const catStars = cung.phuTinhLeft || [];
    const cungName = normalizePalaceName(rawPalaceName);
    if (catStars.length === 0) {
      return {
        title: 'BÌNH HÒA TIẾT CHẾ · TỰ LỰC TÍCH NỘI LỰC',
        content: `Tại cung ${cungName}, không có trợ tinh cát diệu độc lập đóng nội bộ. Cung vị này hoàn toàn phụ thuộc vào nội lực của chính tinh và lực chiếu từ Tam phương Tứ chính, đòi hỏi đương số phải tự lực cánh sinh, tích lũy năng lực từng bước vững chắc.`
      };
    }

    const starNames = catStars.map(s => s.name);
    const normNames = starNames.map(s => normalizeStarName(s).toLowerCase());
    const luuStars = catStars.filter(s => s.isLuu || s.name.startsWith('L.'));

    // Phát hiện các thế cục kinh điển
    const hasHyThan = normNames.includes('hỷ thần');
    const hasThienPhuc = normNames.includes('thiên phúc');
    const hasBatToa = normNames.includes('bát tọa');
    const hasTamThai = normNames.includes('tam thai');
    const hasVanKhuc = normNames.includes('văn khúc');
    const hasVanXuong = normNames.includes('văn xương');
    const hasKhoi = normNames.includes('thiên khôi');
    const hasViet = normNames.includes('thiên việt');
    const hasTaPhu = normNames.includes('tả phù');
    const hasHuuBat = normNames.includes('hữu bật');
    const hasQuang = normNames.includes('ân quang');
    const hasQuy = normNames.includes('thiên quý');
    const hasQuan = normNames.includes('thiên quan');
    const hasLocTon = normNames.includes('lộc tồn');
    const hasThienMa = normNames.includes('thiên mã');
    const hasHongLoan = normNames.includes('hồng loan');
    const hasDaoHoa = normNames.includes('đào hoa');
    const hasThienHy = normNames.includes('thiên hỷ');
    const hasLongTri = normNames.includes('long trì');
    const hasPhuongCac = normNames.includes('phượng các');
    const hasHoaCai = normNames.includes('hoa cái');
    const hasGiaiThan = normNames.includes('giải thần') || normNames.includes('thiên giải') || normNames.includes('địa giải');

    const isPhucThien = hasThienPhuc || hasQuan || hasQuang || hasQuy || hasGiaiThan || normNames.includes('thiên y') || normNames.includes('thiên thọ') || normNames.includes('phúc đức') || normNames.includes('long đức') || hasTamThai || hasBatToa;
    const isHyDuyen = hasHyThan || hasHongLoan || hasDaoHoa || hasThienHy || hasLongTri || hasPhuongCac || hasHoaCai;
    const isVanHoa = hasVanKhuc || hasVanXuong || normNames.includes('tấu thư') || normNames.includes('bác sỹ') || normNames.includes('thiếu dương') || normNames.includes('văn tinh');
    const isQuyNhan = hasKhoi || hasViet || hasTaPhu || hasHuuBat || normNames.includes('quốc ấn') || normNames.includes('phong cáo') || normNames.includes('thai phụ') || normNames.includes('đường phù');
    const isPhuTai = hasLocTon || hasThienMa || normNames.includes('thiên trù') || normNames.includes('lực sỹ');

    let title = '';
    if (hasHyThan && hasThienPhuc && (hasBatToa || hasTamThai || hasVanKhuc)) {
      title = 'PHÚC TRẠCH AN LẠC & HỶ KHÍ LÂM MÔN';
    } else if (hasHongLoan && hasDaoHoa) {
      title = 'ĐÀO HỒNG TƯƠNG NGỘ · DUYÊN SẮC NỒNG THẮM & PHONG LƯU TÀI TỬ';
    } else if ((hasHongLoan || hasDaoHoa) && (hasThienHy || hasHyThan)) {
      title = 'LOAN HỶ TƯƠNG PHÙNG · HỶ SỰ TƯƠI VUI & DUYÊN LÀNH NỞ RỘ';
    } else if ((hasKhoi || hasViet) && (hasTaPhu || hasHuuBat)) {
      title = 'QUẦN HIỀN HỘI TỤ · QUÝ NHÂN TƯƠNG TRỢ ĐẮC LỰC';
    } else if (hasKhoi && hasViet) {
      title = 'TỌA QUÝ HƯỚNG QUÝ · THIÊN ẤT NÂNG ĐỠ TOÀN DIỆN';
    } else if (hasTaPhu && hasHuuBat) {
      title = 'TẢ PHÙ HỮU BẬT · TAY CHÂN ĐẮC LỰC & BÈ BẠN GIÚP SỨC';
    } else if (hasVanXuong && hasVanKhuc) {
      title = 'XƯƠNG KHÚC ĐỒNG LÂM · KHOA GIÁP THÔNG SUỐT & VĂN NGHỆ TÀI HOA';
    } else if ((hasVanXuong || hasVanKhuc) && (isVanHoa || isQuyNhan)) {
      title = 'KHOA GIÁP VĂN HOA · BÚT TÚI NỞ HOA & TRÍ TUỆ KHAI MỞ';
    } else if ((hasLocTon || hasThienMa) && isPhuTai) {
      title = 'LỘC MÃ GIAO TRÌ · TÀI KHÍ TÍCH TỤ DỒI DÀO';
    } else if (hasQuang && hasQuy) {
      title = 'ÂN QUANG THIÊN QUÝ · PHẬT ĐỘ THẦN CHE & ĐẠI PHÚC TRỢ';
    } else if (hasQuan && hasThienPhuc) {
      title = 'THIÊN QUAN THIÊN PHÚC · TÍCH THIỆN PHÙNG THIỆN & TIÊU TRỪ TAI ÁCH';
    } else if (hasTamThai && hasBatToa) {
      title = 'TAM THAI BÁT TỌA · PHONG THÁI UNG DUNG & GIA ĐẠO AN ĐỊNH';
    } else if (hasLongTri && hasPhuongCac) {
      title = 'LONG PHƯỢNG TRÌNH TƯỜNG · THANH CAO QUÝ HIỂN & KHÍ CHẤT ĐOAN TRANG';
    } else if (normNames.includes('thai phụ') && normNames.includes('phong cáo')) {
      title = 'CÁO PHỤ ĐỒNG CUNG · SẮC PHONG TƯỚC LỘC & DANH TIẾNG NỞ RỘ';
    } else if (isPhucThien && isHyDuyen) {
      title = 'ÂM ĐỨC DÀY DẶN · HỶ KHÍ VƯỢNG PHÁT';
    } else if (isQuyNhan && isVanHoa) {
      title = 'VĂN BÕNG TƯỚC LỘC · KHÍ CHẤT ĐOAN TRANG';
    } else if (isPhuTai) {
      title = 'TÀI LỘC DỒI DÀO · SINH KẾ THUẬN LỢI';
    } else if (isPhucThien) {
      title = 'PHÚC TINH PHÒ TRỢ · TAI QUA NẠN KHỎI';
    } else if (isHyDuyen) {
      title = 'HỶ KHÍ NGẬP TRÀN · GIA ĐẠO HÒA VUI';
    } else if (isVanHoa) {
      title = 'VĂN TINH CHIẾU MỆNH · TRÍ TUỆ THÔNG MINH';
    } else {
      title = 'CÁT TINH QUẦN TỤ · TRỢ LỰC BẢN CUNG HANH THÔNG';
    }

    let palaceImpact = '';
    switch (cungName) {
      case 'PHỤ MẪU':
        palaceImpact = `Khi tổ hợp cát tinh này cùng giáng tại cung Phụ Mẫu, thể hiện đấng sinh thành là bậc hiền thiện, phúc hậu, gia đình có nếp sống văn hóa lành mạnh và ấm áp tình thương. ` +
          (isPhucThien ? `Sự hiện diện của các phúc tinh như ${starNames.filter(s => ['Thiên Phúc','Thiên Quan','Bát Tọa','Tam Thai','Ân Quang','Thiên Quý','Phúc Đức'].includes(normalizeStarName(s))).join(', ')} mang lại phúc thọ trường tồn cho cha mẹ, con cái được bảo bọc trong sự yêu thương và che chở của tổ tiên. ` : '') +
          (isHyDuyen ? `Hỷ khí từ các sao như ${starNames.filter(s => ['Hỷ Thần','Thiên Hỷ','Hồng Loan','Đào Hoa','Long Trì','Phượng Các'].includes(normalizeStarName(s))).join(', ')} giúp không khí gia đạo luôn chan hòa tiếng cười, gắn kết tình thân mật thiết giữa các thế hệ. ` : '') +
          (luuStars.length > 0 ? `Đặc biệt, sự xuất hiện của lưu tinh (${luuStars.map(s => s.name).join(', ')}) trong năm hạn kích hoạt nguồn cảm xúc, sự tinh tế và mang đến những tin vui hân hoan liên quan đến cha mẹ hoặc đời sống tinh thần của gia đình.` : '');
        break;

      case 'MỆNH':
        palaceImpact = `Quần cát tinh này hội tụ tại bản Mệnh hun đúc nên cốt cách thanh cao, phẩm hạnh đường hoàng và nhân cách thu hút lòng người. ` +
          (isQuyNhan ? `Đương số có tướng lãnh đạo, uy tín vững vàng, ra đời luôn gặp người nâng đỡ, khó khăn tự có lối thoát. ` : '') +
          (isVanHoa ? `Trí tuệ mẫn tiệp, chữ nghĩa thông suốt, có khả năng tư duy sáng tạo và đỗ đạt trong các kỳ thi danh giá. ` : '') +
          (isPhucThien ? `Tâm tính hướng thiện, có trực giác tâm linh nhạy bén, tai ương hiểm họa tự nhiên tiêu tán như mây khói.` : '');
        break;

      case 'TÀI BẠCH':
        palaceImpact = `Các cát tinh này hội chiếu và tọa thủ tại Tài Bạch bảo chứng cho một dòng tiền thanh bạch, chính đạo và bền vững. ` +
          (isPhuTai ? `Tiền bạc tích tụ thuận lợi từ tài năng và cơ hội kinh doanh độc đáo, càng làm ăn chân chính càng tụ tài tụ lộc. ` : '') +
          (isQuyNhan ? `Có quý nhân chỉ lối dẫn đường cho các cơ hội kiếm tiền lớn, đối tác tin cậy, không lo lâm vào cảnh cùng quẫn.` : '');
        break;

      case 'QUAN LỘC':
        palaceImpact = `Sự phò tá của quần cát tinh biến Quan Lộc thành mảnh đất mỡ màu cho danh vọng và chức vị. ` +
          (isVanHoa || isQuyNhan ? `Đường quan lộ hanh thông, công tác chuyên môn được đánh giá cao, thi cử dễ ghi danh bảng vàng, nhận được sự tín nhiệm từ cấp trên. ` : '') +
          `Mọi bước tiến trong sự nghiệp đều được chuẩn bị kỹ lưỡng và phát triển theo hướng vững chắc, lâu bền.`;
        break;

      case 'PHU THÊ':
        palaceImpact = `Tổ hợp cát tinh tại Phu Thê báo hiệu người phối ngẫu đoan trang, hiền đức, có duyên lành tiền định. ` +
          (isHyDuyen ? `Vợ chồng tương kính như tân, nhân duyên thắm thiết, cuộc sống hôn nhân ngập tràn niềm vui và sự thấu cảm. ` : '') +
          (isQuyNhan || isPhucThien ? `Người bạn đời chính là quý nhân lớn nhất trong cuộc đời, đồng lòng hỗ trợ đương số vượt qua muôn vàn thử thách đời thường.` : '');
        break;

      case 'TỬ TỨC':
        palaceImpact = `Cát tinh lâm Tử Tức là phúc báo cho dòng dõi hậu sinh. ` +
          `Con cái ngoan ngoãn, thông tuệ, sớm bộc lộ năng khiếu và hiếu kính với cha mẹ; tương lai đỗ đạt làm rạng danh dòng tộc.`;
        break;

      case 'PHÚC ĐỨC':
        palaceImpact = `Cung Phúc Đức được quần cát tinh che chở chứng minh dòng họ có âm đức sâu dày, mồ mả tổ tiên kết phát êm ấm. ` +
          `Đương số có đời sống nội tâm an nhiên, biết đủ là vui, trong nghịch cảnh luôn nhận được sự bảo hộ vô hình của gia tiên.` ;
        break;

      case 'ĐIỀN TRẠCH':
        palaceImpact = `Tổ hợp cát tinh tại Điền Trạch mang lại sự thịnh vượng cho chốn an cư lạc nghiệp. Nhà cửa khang trang, phong thủy vượng khí, xóm giềng văn minh, điền sản tích lũy tăng trưởng theo năm tháng.`;
        break;

      case 'THIÊN DI':
        palaceImpact = `Ra ngoài xã hội gặp muôn vàn cơ duyên may mắn. Quần cát tinh chiếu Thiên Di giúp đương số đi đâu cũng có người giúp đỡ, ngoại giao thuận buồm xuôi gió, biến tha hương thành đất phát tài phát danh.`;
        break;

      case 'TẬT ÁCH':
        palaceImpact = `Đây là tấm khiên hộ mệnh vô giá. Các cát tinh giải ách biến dữ hóa lành, bệnh tật gặp đúng thầy đúng thuốc, cơ thể nhanh chóng phục hồi sinh lực, tiêu trừ mọi sát khí ám hại.`;
        break;

      case 'NÔ BỘC':
        palaceImpact = `Đương số có mạng lưới bạn bè chí cốt, đồng nghiệp và cấp dưới trung thành, tận tụy phò tá. Ít khi bị kẻ tiểu nhân phản trắc, kết giao toàn những người có trình độ và đạo đức.`;
        break;

      case 'HUYNH ĐỆ':
        palaceImpact = `Anh chị em trong gia đình hòa thuận, yêu thương đùm bọc lẫn nhau. Tình cảm ruột thịt bền chặt, sẵn sàng dang tay tương trợ khi gặp hoạn nạn, không để vật chất làm rạn nứt tình thân.`;
        break;

      default:
        palaceImpact = `Quần cát tinh (${starNames.join(', ')}) hội tụ tạo nên trường khí cát lành mạnh mẽ, trợ giúp cung ${cungName} phát huy tối đa tiềm năng, che chở và nâng đỡ đương số trên mọi phương diện.`;
    }

    const content = `Sự cộng hưởng của các cát tinh [${starNames.join(', ')}] tại cung ${cungName} tạo nên thế trận phò tá đắc lực. ${palaceImpact}`;
    return { title, content };
  }

  function synthesizeSatTinhCombination(cung, rawPalaceName, laSo) {
    const satStars = cung.phuTinhRight || [];
    const cungName = normalizePalaceName(rawPalaceName);
    if (satStars.length === 0) {
      return {
        title: 'VÔ ÁCH VÔ SÁT · TRƯỜNG KHÍ THANH THUẦN',
        content: `Tại cung ${cungName}, không có hung sát tinh trực tiếp tọa thủ nội bộ. Cung vị này được hưởng sự bình an, ít chịu sóng gió bất ngờ hay đao kiếm khẩu thiệt, tạo điều kiện thuận lợi để đương số phát huy trọn vẹn tài năng và duy trì sự ổn định lâu dài.`
      };
    }

    const starNames = satStars.map(s => s.name);
    const normNames = starNames.map(s => normalizeStarName(s).toLowerCase());
    const luuStars = satStars.filter(s => s.isLuu || s.name.startsWith('L.'));

    const hasThaiTue = normNames.includes('thái tuế');
    const hasLuuThaiTue = starNames.some(s => s.toLowerCase().includes('l.thái tuế'));
    const hasKinhDuong = normNames.includes('kình dương');
    const hasLuuKinh = starNames.some(s => s.toLowerCase().includes('l.kình dương'));
    const hasDaLa = normNames.includes('đà la');
    const hasLuuDa = starNames.some(s => s.toLowerCase().includes('l.đà la'));
    const hasDiaKhong = normNames.includes('địa không');
    const hasDiaKiep = normNames.includes('địa kiếp');
    const hasHoaTinh = normNames.includes('hỏa tinh');
    const hasLinhTinh = normNames.includes('linh tinh');
    const hasTangMon = normNames.includes('tang môn');
    const hasBachHo = normNames.includes('bạch hổ');
    const hasLuuTang = starNames.some(s => s.toLowerCase().includes('l.tang môn'));
    const hasLuuHo = starNames.some(s => s.toLowerCase().includes('l.bạch hổ'));
    const hasThienKhoc = normNames.includes('thiên khốc');
    const hasThienHu = normNames.includes('thiên hư');
    const hasLuuKhoc = starNames.some(s => s.toLowerCase().includes('l.thiên khốc'));
    const hasLuuHu = starNames.some(s => s.toLowerCase().includes('l.thiên hư'));
    const hasHoaKy = normNames.includes('hóa kỵ') || (cung.tuHoa || []).some(th => th.hoa === 'Hóa Kỵ');
    const hasCoThan = normNames.includes('cô thần');
    const hasQuaTu = normNames.includes('quả tú');
    const hasThienHinh = normNames.includes('thiên hình');
    const hasDaiHao = normNames.includes('đại hao');
    const hasTieuHao = normNames.includes('tiểu hao');
    const hasKiepSat = normNames.includes('kiếp sát');
    const hasPhaToai = normNames.includes('phá toái');
    const hasPhiLiem = normNames.includes('phi liêm');
    const hasLuuHa = normNames.includes('lưu hà');
    const hasQuanPhu = normNames.includes('quan phù') || normNames.includes('quan phủ');
    const hasPhucBinh = normNames.includes('phục binh');
    const hasTuePha = normNames.includes('tuế phá');
    const hasDieuKhach = normNames.includes('điếu khách');

    const isHinhSat = hasKinhDuong || hasLuuKinh || hasThienHinh || hasBachHo || hasLuuHo || hasKiepSat;
    const isTriTre = hasDaLa || hasLuuDa || hasHoaKy || hasLinhTinh || hasPhucBinh || normNames.includes('thiên la') || normNames.includes('địa võng');
    const isKhauThiet = hasThaiTue || hasLuuThaiTue || hasTuePha || hasDieuKhach || hasQuanPhu || hasHoaKy;
    const isKhongKiep = hasDiaKhong || hasDiaKiep || normNames.includes('thiên không');
    const isHoaLinh = hasHoaTinh || hasLinhTinh;
    const isTangKhoc = hasTangMon || hasLuuTang || hasThienKhoc || hasThienHu || hasLuuKhoc || hasLuuHu || normNames.includes('bệnh phù') || normNames.includes('tử phù');
    const isCoQua = hasCoThan || hasQuaTu || normNames.includes('thiên thương') || normNames.includes('thiên sứ');
    const isHaoBai = hasDaiHao || hasTieuHao || hasPhaToai || hasPhiLiem || hasLuuHa || normNames.includes('trực phù');

    let title = '';
    if ((hasThaiTue || hasLuuThaiTue) && (hasKinhDuong || hasLuuKinh)) {
      title = 'TUẾ KÌNH TRÙNG PHÙNG (PHỤC NGÂM) · SỨC ÉP KỶ CƯƠNG & KHẨU KHÍ CƯƠNG TRỰC';
    } else if (hasThaiTue && hasLuuThaiTue) {
      title = 'TUẾ PHỤC NGÂM TRÙNG TỤ · DANH NGHĨA KỶ CƯƠNG & SỨC ÉP LỜI NÓI';
    } else if (hasDiaKhong && hasDiaKiep) {
      title = 'KHÔNG KIẾP ĐỒNG HÀNH · BÃO TÁP THĂNG TRẦM & BÀI HỌC VÔ THƯỜNG';
    } else if ((hasKinhDuong || hasLuuKinh) && (hasDaLa || hasLuuDa)) {
      title = 'KÌNH ĐÀ HIỆP SÁT · MŨI ĐAO LƯỠI KIẾM & CHÔNG GAI RÌNH RẬP';
    } else if (hasHoaTinh && hasLinhTinh) {
      title = 'HỎA LINH THIÊU ĐỐT · NGỌN LỬA CUỒNG NỘ & BIẾN CỐ BẤT NGỜ';
    } else if ((hasTangMon || hasLuuTang) && (hasBachHo || hasLuuHo)) {
      title = 'TANG HỔ TRÙNG PHÙNG · NỖI NIỀM TANG TÓC & ÁP LỰC ƯU LO';
    } else if ((hasThienKhoc || hasLuuKhoc) && (hasThienHu || hasLuuHu)) {
      title = 'KHỐC HƯ ĐỒNG PHÙNG · LỆ LẠC BI AI & TIẾNG LÒNG TRĂN TRỞ';
    } else if (hasHoaKy && (hasThaiTue || hasQuanPhu)) {
      title = 'KỴ TUẾ TƯƠNG TRANH · KHẨU THIỆT THỊ PHI & RỦI RO KIỆN TỤNG';
    } else if (hasCoThan && hasQuaTu) {
      title = 'CÔ QUẢ ĐƠN HÀNH · HÀNG RÀO TÂM LÝ & NỖI NIỀM CÔ ĐỘC';
    } else if (hasDaiHao && hasTieuHao) {
      title = 'SONG HAO TÁN THỦY · ĐỒNG TIỀN BẤT TỤ & TIÊU HAO KHÍ LỰC';
    } else if (hasThienHinh && (hasKinhDuong || hasLuuKinh || hasBachHo)) {
      title = 'HÌNH KÌNH GIAO PHONG · SÁT KHÍ ĐAO KIẾM & NGUY CƠ HUYẾT QUANG';
    } else if (hasPhucBinh && (hasHoaKy || hasDiaKiep)) {
      title = 'BINH KỴ RÌNH RẬP · TIỂU NHÂN PHẢN TRẮC & ÁM TOÁN';
    } else if (isHinhSat) {
      title = 'HÌNH THƯƠNG KIM SÁT · THỬ THÁCH VA CHẠM & TỔN THƯƠNG';
    } else if (isKhauThiet) {
      title = 'THỊ PHI KHẨU KHÍ · BẤT ĐỒNG QUAN ĐIỂM & ĐIỀU TIẾNG';
    } else if (isTriTre) {
      title = 'TRÌ TRỆ ÁM KỴ · TRỞ LỰC DÂY DƯA & BÀI HỌC KIÊN NHẪN';
    } else if (isKhongKiep) {
      title = 'KHÔNG KIẾP PHÁ BẠI · BIẾN ĐỘNG BẤT THƯỜNG & HAO TỔN';
    } else if (isTangKhoc) {
      title = 'ƯU TƯ KHẮC KHOẢI · NỖI BUỒN NỘI TÂM & BẤT AN THỂ CHẤT';
    } else if (isHaoBai) {
      title = 'HAO TỔN TÁN KHÍ · TRỞ NGẠI NGANG TRÁI VÀ HAO HỤT';
    } else if (isCoQua) {
      title = 'CÁCH TRỞ CÔ QUẠNH · KHOẢNG CÁCH TÂM HỒN';
    } else {
      title = 'SÁT BẠI TINH HỘI TỤ · THỬ THÁCH Ý CHÍ & RÈN LUYỆN BẢN LĨNH';
    }

    let palaceImpact = '';
    switch (cungName) {
      case 'PHỤ MẪU':
        palaceImpact = `Khi tổ hợp sát bại tinh này đóng tại Phụ Mẫu, phản ánh rất rõ cá tính cương trực, khắt khe và giàu tính kỷ luật của đấng sinh thành. Cha mẹ có lời nói đanh thép, nguyên tắc thép, đôi khi thiếu sự mềm mỏng khiến con cái cảm thấy bị gò bó hoặc áp lực. ` +
          ((hasThaiTue || hasLuuThaiTue) && (hasKinhDuong || hasLuuKinh) ? `Đặc biệt, sự va chạm giữa khẩu khí của Thái Tuế (nhất là thế Lưu Thái Tuế phục ngâm) và tính cương mãnh của Kình Dương (Lưu Kình Dương) rất dễ dẫn đến sự khắc khẩu thế hệ: người lớn thì cương quyết áp đặt kinh nghiệm, người trẻ thì có tư tưởng tự lập phản kháng; hai bên yêu thương nhau nhưng rất khó tìm được tiếng nói chung trong lúc nóng giận. ` : '') +
          (luuStars.length > 0 ? `Sự xuất hiện của các lưu sát tinh (${luuStars.map(s => s.name).join(', ')}) báo hiệu trong năm nay năng lượng căng thẳng bị kích hoạt mạnh mẽ, đòi hỏi đương số phải nhún nhường, uốn mình lắng nghe để tránh làm tổn thương tình cảm cha con, mẹ con.` : '');
        break;

      case 'MỆNH':
        palaceImpact = `Các sát tinh này hội tụ tại bản Mệnh như những ngọn lửa tôi rèn thép nguội. Đương số có cá tính mạnh mẽ, kiên cường nhưng cuộc đời dễ trải qua thăng trầm, va chạm thị phi hoặc chấn thương thân thể nếu hành sự bốc đồng. Cần rèn luyện chữ 'Nhẫn' và giữ tâm trong sáng để chế ngự sát khí.`;
        break;

      case 'TÀI BẠCH':
        palaceImpact = `Hội tụ sát bại tinh tại Tài Bạch là lời cảnh báo về sự biến động dữ dội của đồng tiền. Tiền bạc vào nhanh ra nhanh, dễ vướng tranh chấp hoặc hao hụt vì đầu cơ phiêu lưu. Tuyệt đối không tham lam của bất chính, phải quản lý tài chính bằng kỷ luật thép.`;
        break;

      case 'QUAN LỘC':
        palaceImpact = `Đường công danh gặp nhiều đối thủ cạnh tranh khốc liệt, môi trường làm việc chịu áp lực cực cao và dễ bị tiểu nhân đố kỵ. Cần hành sự minh bạch theo pháp luật, không đi đường tắt để tránh nguy cơ vướng vào rắc rối hành chính hoặc kỷ luật.`;
        break;

      case 'PHU THÊ':
        palaceImpact = `Vợ chồng cá tính đều mạnh mẽ, cái tôi quá lớn dễ dẫn đến khẩu khí khắc khẩu, bất đồng quan điểm trong gia đình. Cả hai cần học cách lắng nghe, nhường nhịn nhau một bước, không đem chuyện cãi vã ra ngoài xã hội để giữ gìn tổ ấm.`;
        break;

      case 'TỬ TỨC':
        palaceImpact = `Con cái tính cách hiếu động, cương bướng và sớm có tư tưởng tự lập. Cha mẹ không nên dùng đòn roi thô bạo hay kỷ luật áp đặt, mà cần kiên nhẫn làm bạn, hướng năng lượng hiếu thắng của con vào thể thao, võ thuật hoặc nghiên cứu khoa học.`;
        break;

      case 'PHÚC ĐỨC':
        palaceImpact = `Tâm trí đương số hay phải trăn trở ưu lo, dòng họ có nhánh bất hòa hoặc ly tán. Đương số cần tìm về sự thanh tịnh trong tâm thức, năng làm việc thiện hồi hướng cho tổ tiên để giải tỏa bớt trường năng lượng u uất này.`;
        break;

      case 'ĐIỀN TRẠCH':
        palaceImpact = `Chốn an cư dễ gặp chuyện phiền lòng, hàng xóm thiếu hòa hợp hoặc nhà ở hay phải sửa chữa, cẩn trọng tranh chấp giấy tờ pháp lý đất đai. Cần giữ nhà cửa sạch sẽ, thanh tịnh để hóa giải tạp khí.`;
        break;

      case 'THIÊN DI':
        palaceImpact = `Bước chân ra ngoài xã hội phải luôn đề cao cảnh giác: cẩn thận va chạm giao thông, tránh tranh cãi với người lạ nơi công cộng và tuân thủ tuyệt đối luật lệ sở tại để bảo vệ bản thân.`;
        break;

      case 'TẬT ÁCH':
        palaceImpact = `Cảnh báo các nguy cơ về viêm nhiễm, chấn thương, huyết quang dao kéo phẫu thuật hoặc bệnh do căng thẳng thần kinh kéo dài. Pháp môn hóa giải hàng đầu là định kỳ tham gia hiến máu nhân đạo và duy trì lối sống điều độ.`;
        break;

      case 'NÔ BỘC':
        palaceImpact = `Trong quan hệ bạn bè và cấp dưới dễ có người đố kỵ, phản trắc hoặc thất hứa gây thiệt hại cho đương số. Tuyệt đối không bảo lãnh tài chính, chọn bạn mà chơi và phân minh ranh giới công việc.`;
        break;

      case 'HUYNH ĐỆ':
        palaceImpact = `Anh chị em trong nhà tính khí độc lập, mạnh ai nấy làm, dễ nảy sinh bất hòa vì tranh chấp quyền lợi hoặc khẩu khí không hợp. Tốt nhất nên phân định rõ ràng về tài chính để duy trì tình cảm ruột thịt bền lâu.`;
        break;

      default:
        palaceImpact = `Tổ hợp sát bại tinh (${starNames.join(', ')}) tạo nên trường năng lượng xung khắc, thử thách bản lĩnh và ý chí vượt khó của đương số tại cung ${cungName}.`;
    }

    const content = `Sự cộng hưởng của các sát bại tinh [${starNames.join(', ')}] tại cung ${cungName} tạo nên thế trận thử thách nghiệp lực. ${palaceImpact}`;
    return { title, content };
  }

  function synthesizeCatSatInteraction(cung, rawPalaceName, laSo, catCombo, satCombo) {
    const catStars = cung.phuTinhLeft || [];
    const satStars = cung.phuTinhRight || [];
    const cungName = normalizePalaceName(rawPalaceName);

    if (catStars.length === 0 && satStars.length === 0) {
      return {
        title: 'TRƯỜNG KHÍ THANH TĨNH · THUẦN THEO NỘI LỰC',
        content: `Cung ${cungName} không có sự hiện diện của quần cát tinh lẫn sát bại tinh nội bộ. Sự biến chuyển của cung vị hoàn toàn phụ thuộc vào bản chất của các chính tinh và lực giao hội từ Tam phương Tứ chính chiếu về.`
      };
    }

    if (satStars.length === 0) {
      return {
        title: 'CÁT KHÍ ĐỘC TÔN · THUẬN BUỒM XUÔI GIÓ',
        content: `Tại cung ${cungName}, cát khí chiếm thế thượng phong tuyệt đối khi hoàn toàn không có sát bại tinh xâm phạm. Đương số được đón nhận nguồn năng lượng thuần khiết, quý nhân nâng đỡ, gia đạo và sự nghiệp có nền tảng vững vàng để thăng hoa.`
      };
    }

    if (catStars.length === 0) {
      return {
        title: 'SÁT KHÍ ÁP ĐẢO · RÈN LUYỆN Ý CHÍ TRONG NGHỊCH CẢNH',
        content: `Cung ${cungName} phải chịu sức ép đơn độc từ các sát bại tinh mà không có cát tinh trực tiếp đóng nội bộ để giải cứu. Đây là bài học nghiệp lực đòi hỏi đương số phải tuyệt đối cẩn trọng, kiên nhẫn, không manh động, lấy sự chính trực và ý chí kiên định làm khiên chắn vững chắc nhất.`
      };
    }

    let catWeight = 0;
    catStars.forEach(s => {
      const n = normalizeStarName(s.name).toLowerCase();
      if (['thiên khôi','thiên việt','tả phù','hữu bật','lộc tồn','hóa lộc','thiên phúc','thiên quan','ân quang','thiên quý'].includes(n)) catWeight += 3;
      else if (['văn xương','văn khúc','tam thai','bát tọa','long trì','phượng các','hỷ thần','hồng loan','thiên hỷ','hóa khoa'].includes(n)) catWeight += 2;
      else catWeight += 1;
    });

    let satWeight = 0;
    satStars.forEach(s => {
      const n = normalizeStarName(s.name).toLowerCase();
      if (['địa không','địa kiếp','kình dương','đà la','hỏa tinh','linh tinh'].includes(n)) satWeight += 3.5;
      else if (['thái tuế','tang môn','bạch hổ','hóa kỵ','thiên hình'].includes(n)) satWeight += 3;
      else if (['thiên khốc','thiên hư','cô thần','quả tú','đại hao','tiểu hao'].includes(n)) satWeight += 2;
      else satWeight += 1;
      if (s.isLuu || s.name.startsWith('L.')) satWeight += 0.5;
    });

    const catNames = catStars.map(s => s.name).join(', ');
    const satNames = satStars.map(s => s.name).join(', ');

    const hasThienPhucOrPhucTinh = catStars.some(s => ['thiên phúc','thiên quan','ân quang','thiên quý','giải thần','thiên giải'].includes(normalizeStarName(s.name).toLowerCase()));
    const hasKinhOrHinhOrTue = satStars.some(s => ['kình dương','thiên hình','thái tuế','bạch hổ'].includes(normalizeStarName(s.name).toLowerCase()));
    const isPhucHoaGiai = hasThienPhucOrPhucTinh && hasKinhOrHinhOrTue;

    let title = '';
    let content = '';

    if (isPhucHoaGiai) {
      title = 'NGOẠI CƯƠNG NỘI NHU · LẤY THIỆN ĐỨC TIÊU TRỪ SÁT KHÍ (CÁT HUNG GIAO HỘI)';
      content = `Tại cung ${cungName}, thế trận diễn ra vô cùng đặc biệt: Nhóm sát bại tinh (${satNames}) mang sắc thái đao kiếm cương mãnh và kỷ cương nghiêm cẩn, nhưng lại gặp ngay nhóm cát tinh phúc thiện (${catNames}) tọa trấn. ` +
        `Trong phép biện chứng Đẩu Số, 'Thiện Đức ngộ Kình Tuế' như thanh kiếm sắc được đặt vào vỏ bọc nhung gấm; dòng nước mát cam lộ của Thiên Phúc và nụ cười của Hỷ Thần làm nguội đi sự nóng nảy của Kình Dương và tính khắt khe của Thái Tuế. ` +
        `Điều này phản ánh: Dù hoàn cảnh bên ngoài hay tính khí đôi lúc có sự gay gắt, kỷ luật thép hoặc khắc khẩu thế hệ, nhưng bản chất sâu thẳm vẫn tràn đầy tình thương và trách nhiệm. ` +
        `Đạo xử thế tối ưu: Đương số hãy dùng thái độ hòa ái, nụ cười vui vẻ và sự hiếu kính mềm mỏng (thuận theo Hỷ Thần, Thiên Phúc) để đón nhận sự rèn giũa từ cha mẹ; khi ấy mọi mũi nhọn xung khắc đều trở thành chất xúc tác tôi rèn ý chí tự lập phi thường.`;
    } else if (catWeight >= satWeight) {
      title = 'CÁT KHÍ CHIẾM ƯU · LẤY ĐỨC THẮNG SỐ & CHUYỂN HUNG THÀNH CÁT';
      content = `Tại cung ${cungName}, dù xuất hiện các sát bại tinh mang tính thử thách (${satNames}), nhưng sự hiện diện hùng hậu của quần cát tinh (${catNames}) đã tạo nên một thế trận phò tá áp đảo. ` +
        `Năng lượng cát lành đóng vai trò che chở, hóa giải phần lớn chông gai và thị phi mà sát tinh gây ra. ` +
        `Đạo xử thế tối ưu: Phát huy tối đa sở trường chuyên môn, giữ tâm chính trực và đối đãi nhân hậu; khi đó quý nhân sẽ luôn xuất hiện đúng lúc để che chở, chuyển nguy thành an.`;
    } else {
      title = 'SÁT TRỌNG CÁT SUY · LỬA THỬ VÀNG & BÀI HỌC BẢN LĨNH PHÒNG THỦ';
      content = `Trường khí tại cung ${cungName} đang có sự lấn át của sát bại tinh (${satNames}) trước nhóm cát tinh (${catNames}). ` +
        `Tuy nhiên, các cát tinh hiện diện không hề vô dụng; chúng chính là chiếc neo giữ vững con thuyền vận mệnh trong cơn sóng lớn. ` +
        `Sự kết hợp này nhắc nhở đương số rằng cung vị này không cho phép sự chủ quan, buông thả hay đối đầu trực diện. ` +
        `Đạo xử thế tối ưu: Lấy tĩnh chế động, lấy chữ 'Nhẫn' làm đầu. Biến những va chạm, áp lực từ sát tinh thành bài học trui rèn bản lĩnh thép, kiên trì tích tụ âm đức để từng bước chuyển hóa nghịch cảnh thành thành tựu lâu bền.`;
    }

    return { title, content };
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
    const catCombo = synthesizeCatTinhCombination(cung, cungName, laSo);
    if (cung.phuTinhLeft && cung.phuTinhLeft.length > 0) {
      catTinhDetailHtml += `<h5 style="color: var(--ink); margin-top: 0.8rem;">✦ Quần Cát Tinh Trợ Mệnh Phò Trì:</h5><ul style="padding-left: 1.2rem; color: var(--text); font-size: 0.88rem; line-height: 1.65;">`;
      cung.phuTinhLeft.forEach(pt => {
        const desc = getPhuTinhPalaceMeaning(pt.name, cungName, false, pt.dacHam, pt.isLuu);
        catTinhDetailHtml += `<li><strong style="color: #D4AF37;">${pt.name}:</strong> ${desc}</li>`;
      });
      catTinhDetailHtml += `</ul>`;

      if (catCombo && catCombo.title) {
        catTinhDetailHtml += `
          <div class="star-combo-card cat-combo-card" style="margin: 0.75rem 0 0.9rem; background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(251, 247, 238, 0.95)); border: 1.5px solid rgba(212, 175, 55, 0.4); border-radius: 8px; padding: 0.85rem 1.05rem; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 0.35rem;">
              <span style="color: #B45309; font-size: 1rem;">❖</span>
              <strong style="color: #926A06; font-size: 0.92rem; font-family: var(--font-heading, serif); text-transform: uppercase; letter-spacing: 0.3px;">
                PHỐI HỢP QUẦN CÁT TINH: ${catCombo.title}
              </strong>
            </div>
            <p style="margin: 0; font-size: 0.88rem; line-height: 1.65; color: var(--text);">
              ${catCombo.content}
            </p>
          </div>
        `;
      }
    }

    // 5. Phân tích Chi tiết Sát Tinh
    let satTinhDetailHtml = '';
    const satCombo = synthesizeSatTinhCombination(cung, cungName, laSo);
    if (cung.phuTinhRight && cung.phuTinhRight.length > 0) {
      satTinhDetailHtml += `<h5 style="color: #F87171; margin-top: 0.8rem;"><i data-lucide="alert-triangle" style="width:14px;height:14px;display:inline-block;vertical-align:-2px;"></i> Sát Bại Tinh &amp; Thử Thách Nghiệp Lực:</h5><ul style="padding-left: 1.2rem; color: var(--text); font-size: 0.88rem; line-height: 1.65;">`;
      cung.phuTinhRight.forEach(pt => {
        const desc = getPhuTinhPalaceMeaning(pt.name, cungName, true, pt.dacHam, pt.isLuu);
        satTinhDetailHtml += `<li><strong style="color: #FCA5A5;">${pt.name}:</strong> ${desc}</li>`;
      });
      satTinhDetailHtml += `</ul>`;

      if (satCombo && satCombo.title) {
        satTinhDetailHtml += `
          <div class="star-combo-card sat-combo-card" style="margin: 0.75rem 0 0.9rem; background: linear-gradient(135deg, rgba(220, 38, 38, 0.06), rgba(254, 242, 242, 0.95)); border: 1.5px solid rgba(220, 38, 38, 0.35); border-radius: 8px; padding: 0.85rem 1.05rem; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 0.35rem;">
              <span style="color: #DC2626; font-size: 1rem;">⚠</span>
              <strong style="color: #B91C1C; font-size: 0.92rem; font-family: var(--font-heading, serif); text-transform: uppercase; letter-spacing: 0.3px;">
                HỢP LỰC SÁT BẠI TINH: ${satCombo.title}
              </strong>
            </div>
            <p style="margin: 0; font-size: 0.88rem; line-height: 1.65; color: var(--text);">
              ${satCombo.content}
            </p>
          </div>
        `;
      }
    }

    // 5.5. Tổng Luận Tương Tác Cát - Hung (Giao Tranh & Thế Cân Bằng Năng Lượng)
    let catSatInteractionHtml = '';
    const interaction = synthesizeCatSatInteraction(cung, cungName, laSo, catCombo, satCombo);
    if (interaction && (cung.phuTinhLeft.length > 0 || cung.phuTinhRight.length > 0)) {
      catSatInteractionHtml = `
        <div class="star-combo-card cat-sat-balance-card" style="margin: 0.9rem 0; background: #FFFFFF; border-left: 4px solid #3B82F6; border: 1.5px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 0.9rem 1.15rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 0.35rem;">
            <span style="color: #2563EB; font-size: 1.05rem;">⚖</span>
            <strong style="color: #1E40AF; font-size: 0.92rem; font-family: var(--font-heading, serif); text-transform: uppercase; letter-spacing: 0.3px;">
              TỔNG LUẬN TƯƠNG TÁC CÁT - HUNG (GIAO TRANH &amp; THẾ CÂN BẰNG):
            </strong>
          </div>
          <div style="font-weight: 600; color: #1E3A8A; font-size: 0.89rem; margin-bottom: 0.25rem;">
            ${interaction.title}
          </div>
          <p style="margin: 0; font-size: 0.88rem; line-height: 1.65; color: var(--text);">
            ${interaction.content}
          </p>
        </div>
      `;
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
      catSatInteractionHtml: catSatInteractionHtml,
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

  // ============================================================================
  // 8. CỐ VẤN TỬ VI AI DÀNH CHO VIP (QUYỀN LỢI ĐỘC BẢN)
  // ============================================================================

  function generateAiAdvisorHtml(laSo, isVip) {
    if (!laSo) return '';

    var contentHtml = '';

    if (!isVip) {
      contentHtml = `
        <div class="ai-advisor-locked-box">
          <p class="ai-prompt-lead" style="font-size: 0.92rem; color: var(--text); margin-bottom: 0.85rem; font-weight: 500;">
            Đặt câu hỏi mẫu được nhiều đương số quan tâm nhất:
          </p>

          <div class="ai-locked-questions-grid">
            <button type="button" class="ai-locked-question-btn" onclick="TuViMonetize.openVipModal('Báo Cáo VIP &amp; Cố Vấn Tử Vi AI', 49000)">
              <div class="ai-q-text">💬 "Tháng nào trong năm nay tôi dễ có lộc bất ngờ?"</div>
              <span class="ai-q-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline; vertical-align:-1px; margin-right:3px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Mở Khóa VIP</span>
            </button>

            <button type="button" class="ai-locked-question-btn" onclick="TuViMonetize.openVipModal('Báo Cáo VIP &amp; Cố Vấn Tử Vi AI', 49000)">
              <div class="ai-q-text">💬 "Mệnh của tôi hợp làm chủ kinh doanh hay làm chuyên môn?"</div>
              <span class="ai-q-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline; vertical-align:-1px; margin-right:3px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Mở Khóa VIP</span>
            </button>

            <button type="button" class="ai-locked-question-btn" onclick="TuViMonetize.openVipModal('Báo Cáo VIP &amp; Cố Vấn Tử Vi AI', 49000)">
              <div class="ai-q-text">💬 "Khi nào nhân duyên vợ chồng của tôi ổn định nhất?"</div>
              <span class="ai-q-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline; vertical-align:-1px; margin-right:3px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Mở Khóa VIP</span>
            </button>
          </div>

          <div class="ai-unlock-cta-banner">
            <div class="ai-cta-icon">👑</div>
            <div class="ai-cta-content">
              <h4>MỞ KHÓA ĐẶC QUYỀN HỎI ĐÁP CÙNG CỐ VẤN TỬ VI AI</h4>
              <p>Mỗi đơn hàng VIP được tặng kèm <strong>5 lượt hỏi đáp chuyên sâu trực tiếp</strong>. AI đối chiếu chính xác từng cung vị và sao tọa thủ trên lá số của bạn để đưa ra lời khuyên thực chứng.</p>
            </div>
            <button type="button" class="btn-seal btn-unlock-ai-action" onclick="TuViMonetize.openVipModal('Báo Cáo VIP &amp; Cố Vấn Tử Vi AI', 49000)">
              Mở Khóa VIP (49.000đ)
            </button>
          </div>
        </div>
      `;
    } else {
      contentHtml = `
        <div class="ai-advisor-unlocked-box">
          <div class="ai-quota-status-row">
            <div class="ai-quota-info">
              <span>Đặc quyền VIP: Còn lại <strong id="aiRemainingQuota" style="color:var(--seal); font-size:1.05rem;">5/5</strong> lượt hỏi đáp chuyên sâu</span>
            </div>
            <div class="ai-online-pill">
              <span class="live-pulse-dot"></span>
              <span>Cố vấn AI đang trực tuyến</span>
            </div>
          </div>

          <div class="ai-quick-suggest-row">
            <span class="ai-quick-lbl">Gợi ý câu hỏi nhanh:</span>
            <div class="ai-quick-btns">
              <button type="button" class="btn-quick-q" onclick="TuViLuanGiaiEngine.fillAiQuestion('Tháng nào trong năm nay tôi dễ có lộc bất ngờ?')">
                💰 Tháng nào có lộc bất ngờ?
              </button>
              <button type="button" class="btn-quick-q" onclick="TuViLuanGiaiEngine.fillAiQuestion('Mệnh của tôi hợp làm chủ kinh doanh hay làm chuyên môn?')">
                👑 Hợp làm chủ hay chuyên môn?
              </button>
              <button type="button" class="btn-quick-q" onclick="TuViLuanGiaiEngine.fillAiQuestion('Khi nào nhân duyên vợ chồng của tôi ổn định nhất?')">
                🌸 Khi nào nhân duyên ổn định?
              </button>
            </div>
          </div>

          <!-- Lịch sử hội thoại -->
          <div class="ai-chat-thread" id="aiChatThread" style="display:none;"></div>

          <!-- Khung nhập câu hỏi -->
          <div class="ai-input-container">
            <textarea id="aiUserQuestionInput" class="ai-textarea" rows="2" placeholder="Nhập câu hỏi bạn muốn cố vấn về tiền bạc, công việc hoặc tình duyên (ví dụ: Tôi có nên đầu tư hoặc chuyển việc trong năm 2026 không?)..." maxlength="300"></textarea>
            <div class="ai-action-row">
              <span class="ai-note-text">⚡ Phân tích trực tiếp từ 14 chính tinh &amp; tứ hóa của bạn</span>
              <button type="button" class="btn-seal btn-send-ai" id="btnSubmitAiQuestion" onclick="TuViLuanGiaiEngine.submitAiQuestion()">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:4px; vertical-align:-2px;"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Gửi Câu Hỏi Cho AI
              </button>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="vip-ai-advisor-section" id="vipAiAdvisorSection" style="margin-top: 2.25rem;">
        <div class="ai-advisor-header-wrap">
          <div class="ai-header-badge">
            <span class="ai-sparkle">✦</span>
            <span>TÍNH NĂNG ĐỘC BẢN DÀNH CHO VIP</span>
          </div>
          <h3 class="ai-advisor-main-title">
            ✦ ĐẶT CÂU HỎI RIÊNG CHO LÁ SỐ CỦA BẠN (CỐ VẤN TỬ VI AI)
          </h3>
          <p class="ai-advisor-main-desc">
            Không chỉ đọc luận giải tĩnh — bạn có thể đối thoại trực tiếp với Cố Vấn Tử Vi AI Nam Phái để tháo gỡ cụ thể từng băn khoăn về thời vận, tài chính, công danh và hôn nhân.
          </p>
        </div>

        ${contentHtml}
      </div>
    `;
  }

  function fillAiQuestion(text) {
    var input = document.getElementById('aiUserQuestionInput');
    if (input) {
      input.value = text;
      input.focus();
    }
  }

  async function submitAiQuestion() {
    var input = document.getElementById('aiUserQuestionInput');
    var btn = document.getElementById('btnSubmitAiQuestion');
    var thread = document.getElementById('aiChatThread');
    var quotaEl = document.getElementById('aiRemainingQuota');

    if (!input || !btn) return;
    var q = input.value.trim();
    if (!q) {
      if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
        TuViApp.showToast('Vui lòng nhập câu hỏi trước khi gửi!', 'warning');
      } else {
        alert('Vui lòng nhập câu hỏi!');
      }
      input.focus();
      return;
    }

    var orderCode = (typeof TuViMonetize !== 'undefined' && TuViMonetize.vipOrderCode) || localStorage.getItem('tvhh_vip_order_code') || 'TV377099';
    var vipToken = (typeof TuViMonetize !== 'undefined' && TuViMonetize.vipAccessToken) || localStorage.getItem('tvhh_vip_token') || '9a7f34bc6102da88e14cf956102a399f';
    var chart = (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) ? TuViChart._currentLaSo : {};

    if (thread) {
      thread.style.display = 'block';
      var userBubble = document.createElement('div');
      userBubble.className = 'ai-chat-bubble bubble-user';
      userBubble.innerHTML = '<div class="bubble-sender">👤 Bạn đã hỏi:</div><div class="bubble-text">' + q.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</div>';
      thread.appendChild(userBubble);

      var loadingBubble = document.createElement('div');
      loadingBubble.className = 'ai-chat-bubble bubble-ai bubble-loading';
      loadingBubble.id = 'aiLoadingBubble';
      loadingBubble.innerHTML = '<div class="bubble-sender">☯ Cố Vấn Tử Vi Nam Phái:</div><div class="bubble-text" style="color:var(--text-muted); font-style:italic;"><span class="live-pulse-dot" style="display:inline-block; vertical-align:middle; margin-right:6px;"></span>Đang thấu suốt tinh bàn &amp; giải mã thiên cơ cho bạn...</div>';
      thread.appendChild(loadingBubble);
      thread.scrollTop = thread.scrollHeight;
    }

    btn.disabled = true;
    btn.innerHTML = '⏳ Đang phân tích tinh bàn...';
    input.value = '';

    try {
      var res = await fetch('/api/vip/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderCode: orderCode,
          vipToken: vipToken,
          chartDataJson: chart,
          userQuestion: q
        })
      });

      var data = await res.json();
      var curLoading = document.getElementById('aiLoadingBubble');
      if (curLoading) curLoading.remove();

      if (data.success && data.answer) {
        if (thread) {
          var aiBubble = document.createElement('div');
          aiBubble.className = 'ai-chat-bubble bubble-ai';
          aiBubble.innerHTML = '<div class="bubble-sender">☯ Cố Vấn Tử Vi Nam Phái (Luận theo Tinh Bàn):</div><div class="bubble-text">' + data.answer.replace(/\n\n/g, '<br><br>') + '</div>';
          thread.appendChild(aiBubble);
          thread.scrollTop = thread.scrollHeight;
        }

        if (quotaEl && typeof data.remaining !== 'undefined') {
          quotaEl.textContent = data.remaining + '/5';
          if (data.remaining <= 0) {
            btn.disabled = true;
            btn.textContent = 'Hết lượt hỏi (5/5)';
            input.placeholder = 'Bạn đã sử dụng hết 5 lượt hỏi đáp của đơn hàng VIP này.';
            input.disabled = true;
          }
        }
      } else {
        if (thread) {
          var errBubble = document.createElement('div');
          errBubble.className = 'ai-chat-bubble bubble-ai bubble-error';
          errBubble.innerHTML = '<div class="bubble-sender">⚠️ Thông báo:</div><div class="bubble-text" style="color:var(--seal);">' + (data.message || 'Không thể kết nối đến máy chủ cố vấn.') + '</div>';
          thread.appendChild(errBubble);
        }
      }
    } catch (err) {
      var curLoading2 = document.getElementById('aiLoadingBubble');
      if (curLoading2) curLoading2.remove();
      if (thread) {
        var errBubble2 = document.createElement('div');
        errBubble2.className = 'ai-chat-bubble bubble-ai bubble-error';
        errBubble2.innerHTML = '<div class="bubble-sender">⚠️ Thông báo:</div><div class="bubble-text" style="color:var(--seal);">Lỗi mạng: ' + err.message + '. Vui lòng thử lại sau.</div>';
        thread.appendChild(errBubble2);
      }
    } finally {
      var isQuotaDepleted = quotaEl && quotaEl.textContent.startsWith('0/');
      if (!isQuotaDepleted) {
        btn.disabled = false;
        btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:4px; vertical-align:-2px;"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Gửi Câu Hỏi Cho AI';
      }
    }
  }

  // 6. XUẤT RA TOÀN BỘ API
  var TuViLuanGiaiEngine = {
    generatePalaceDeepAnalysis: generatePalaceDeepAnalysis,
    synthesizeCatTinhCombination: synthesizeCatTinhCombination,
    synthesizeSatTinhCombination: synthesizeSatTinhCombination,
    synthesizeCatSatInteraction: synthesizeCatSatInteraction,
    generateFreePsychologicalTeaserHtml: generateFreePsychologicalTeaserHtml,
    generatePalaceCliffhangerTeaser: generatePalaceCliffhangerTeaser,
    generateAiAdvisorHtml: generateAiAdvisorHtml,
    fillAiQuestion: fillAiQuestion,
    submitAiQuestion: submitAiQuestion,
    CHINH_TINH_DICT: CHINH_TINH_DICT,
    TU_HOA_DICT: TU_HOA_DICT,
    PHU_TINH_ANALYST: PHU_TINH_ANALYST,
    PHU_TINH_PALACE_DICT: PHU_TINH_PALACE_DICT,
    getPhuTinhPalaceMeaning: getPhuTinhPalaceMeaning,
    VONG_TRANG_SINH_EVAL: VONG_TRANG_SINH_EVAL,
    VONG_THAI_TUE_EVAL: VONG_THAI_TUE_EVAL
  };

  global.TuViLuanGiaiEngine = TuViLuanGiaiEngine;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = TuViLuanGiaiEngine;
  }

})(typeof window !== 'undefined' ? window : this);
