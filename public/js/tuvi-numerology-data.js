/**
 * TỬ VI HUYỀN HỌC - BỘ DỮ LIỆU KIẾN GIẢI THẦN SỐ HỌC PYTHAGORAS TOÀN THƯ
 * Được biên soạn và tích hợp chuẩn xác theo hệ thống Cổ Học Tinh Hoa
 * Phiên bản hoàn chỉnh cho Client-side Engine 100% Offline
 */
(function(window) {
  'use strict';

  const TuViNumerologyData = {
    lifePathMeanings: {
  "1": {
    "number": 1,
    "name": "Người Tiên Phong",
    "altNames": [
      "The Leader",
      "The Pioneer",
      "Số Độc Lập"
    ],
    "keywords": [
      "Độc lập",
      "Lãnh đạo",
      "Sáng tạo",
      "Tiên phong",
      "Quyết đoán"
    ],
    "overview": {
      "short": "Đường Đời số 1 là con đường của người tiên phong, lãnh đạo và độc lập. Bạn được sinh ra để dẫn đầu, không phải để đi theo.",
      "detailed": "Đường Đời số 1 mang năng lượng của sự khởi đầu, sáng tạo và lãnh đạo. Bạn là người tiên phong - người đầu tiên bước vào những vùng đất chưa ai khám phá, người dám nghĩ dám làm những điều mới mẻ.\n\nSố 1 trong Thần Số Học tượng trưng cho Mặt Trời - nguồn sáng duy nhất, tự tỏa sáng mà không cần ai chiếu rọi. Vì vậy, người Đường Đời 1 có xu hướng tự tin, độc lập, không thích phụ thuộc vào người khác. Bạn có tầm nhìn riêng và muốn theo đuổi con đường của chính mình.\n\nThử thách lớn nhất của Đường Đời 1 là cân bằng giữa sự độc lập và khả năng hợp tác. Bạn có thể xuất sắc khi lãnh đạo, nhưng đôi khi cần học cách lắng nghe và chấp nhận ý kiến khác biệt. Sự tự tin quá mức có thể trở thành kiêu ngạo nếu không được kiểm soát.\n\nNgười Đường Đời 1 thường trải qua cuộc đời với nhiều khởi đầu mới - có thể là nhiều dự án, nhiều giai đoạn sự nghiệp, hoặc nhiều lần tái tạo bản thân. Mỗi lần như vậy, bạn lại mạnh mẽ và khôn ngoan hơn.\n\nMục đích cuộc đời bạn là để lại dấu ấn cá nhân trên thế giới - qua ý tưởng, sản phẩm, hoặc con đường mà bạn khai phá cho người khác đi theo."
    },
    "strengths": [
      "Khả năng lãnh đạo bẩm sinh, tự tin đưa ra quyết định",
      "Sáng tạo, có nhiều ý tưởng đột phá",
      "Độc lập, tự chủ, không cần dựa dẫm",
      "Quyết đoán, dám hành động khi người khác còn do dự",
      "Tinh thần tiên phong, không sợ thử nghiệm cái mới",
      "Ý chí mạnh mẽ, kiên định theo đuổi mục tiêu"
    ],
    "weaknesses": [
      "Có thể trở nên độc đoán, áp đặt quan điểm",
      "Thiếu kiên nhẫn với người chậm hơn mình",
      "Đôi khi quá tự tin, không chịu nghe góp ý",
      "Khó làm việc nhóm, thích làm theo ý mình",
      "Có xu hướng cô đơn vì quá độc lập",
      "Dễ bỏ cuộc khi mất hứng thú, chuyển sang dự án mới"
    ],
    "lifeLesson": {
      "primary": "Học cách lãnh đạo với sự khiêm tốn và bao dung",
      "secondary": "Cân bằng giữa độc lập cá nhân và hợp tác với người khác",
      "spiritual": "Hiểu rằng dẫn đầu thực sự là phục vụ và nâng đỡ người khác"
    },
    "careerFinance": {
      "overview": "Đường Đời 1 phù hợp với các vị trí lãnh đạo, sáng lập, hoặc công việc đòi hỏi sự sáng tạo và độc lập.",
      "suitableFields": [
        "CEO, Giám đốc, Quản lý cấp cao",
        "Khởi nghiệp, Startup Founder",
        "Sáng tạo nội dung, Nghệ sĩ độc lập",
        "Phát minh, Nghiên cứu đột phá",
        "Tư vấn độc lập, Freelancer",
        "Chính trị, Hoạt động xã hội"
      ],
      "financialPattern": "Tài chính thường đến từ những ý tưởng sáng tạo và khả năng lãnh đạo. Có tiềm năng giàu có lớn nếu biết kiên trì theo đuổi vision của mình."
    },
    "relationships": {
      "love": "Trong tình yêu, số 1 cần không gian cá nhân và sự tôn trọng. Họ tìm kiếm đối tác ngang hàng, không phải người phụ thuộc. Mối quan hệ lý tưởng là khi cả hai đều độc lập nhưng chọn ở bên nhau.",
      "compatibility": {
        "best": [
          3,
          5,
          7
        ],
        "good": [
          2,
          9
        ],
        "challenging": [
          1,
          8,
          4
        ]
      },
      "family": "Là trụ cột gia đình mạnh mẽ nhưng cần học cách chia sẻ trách nhiệm và lắng nghe ý kiến các thành viên khác.",
      "friendship": "Có ít bạn thân nhưng rất trung thành. Thích những người có ý tưởng và tham vọng tương tự."
    },
    "health": {
      "overview": "Số 1 liên quan đến đầu, tim và mắt. Năng lượng mạnh mẽ nhưng dễ bị kiệt sức do làm việc quá độ.",
      "concerns": [
        "Đau đầu, migraine do căng thẳng",
        "Tim mạch, huyết áp",
        "Mắt (làm việc quá nhiều)",
        "Stress, kiệt sức"
      ],
      "advice": "Cần cân bằng giữa làm việc và nghỉ ngơi. Tập thể dục đều đặn và học cách thư giãn."
    },
    "luckyElements": {
      "colors": [
        "Đỏ",
        "Vàng",
        "Cam",
        "Trắng"
      ],
      "gemstones": [
        "Hồng ngọc (Ruby)",
        "Kim cương",
        "Thạch anh vàng"
      ],
      "numbers": [
        1,
        10,
        19,
        28
      ],
      "days": [
        "Chủ nhật"
      ]
    },
    "famousExamples": [
      "Steve Jobs (24/2/1955)",
      "Martin Luther King Jr.",
      "Lady Gaga",
      "Tom Hanks"
    ],
    "lifePeriods": {
      "youth": "Thời trẻ thường độc lập sớm, có thể nổi loạn hoặc tách biệt khỏi gia đình để tìm con đường riêng.",
      "adulthood": "Giai đoạn xây dựng sự nghiệp mạnh mẽ, thường đạt được vị trí lãnh đạo hoặc tự khởi nghiệp.",
      "maturity": "Về sau, học được sự khiêm tốn và trở thành người dẫn dắt, mentor cho thế hệ sau."
    }
  },
  "2": {
    "number": 2,
    "name": "Người Hòa Giải",
    "altNames": [
      "The Diplomat",
      "The Peacemaker",
      "Số Hợp Tác"
    ],
    "keywords": [
      "Hợp tác",
      "Hòa bình",
      "Nhạy cảm",
      "Cân bằng",
      "Ngoại giao"
    ],
    "overview": {
      "short": "Đường Đời số 2 là con đường của sự hợp tác, hòa bình và cân bằng. Bạn được sinh ra để kết nối và hài hòa mọi người.",
      "detailed": "Đường Đời số 2 mang năng lượng của Mặt Trăng - dịu dàng, phản chiếu, và điều hòa. Nếu số 1 là người đứng đầu, thì số 2 là người đứng bên cạnh - không kém quan trọng, mà là thiết yếu cho sự cân bằng.\n\nNgười Đường Đời 2 sở hữu khả năng thấu cảm tuyệt vời - bạn có thể cảm nhận được cảm xúc và nhu cầu của người khác, thường trước cả khi họ tự nhận ra. Đây là năng khiếu bẩm sinh giúp bạn trở thành người hòa giải, ngoại giao xuất sắc.\n\nSố 2 tượng trưng cho sự đối xứng, cân bằng - âm và dương, ngày và đêm, nam và nữ. Vì vậy, người Đường Đời 2 có xu hướng tìm kiếm sự hài hòa trong mọi khía cạnh cuộc sống. Bạn khó chịu với xung đột và luôn cố gắng tạo ra môi trường hòa bình.\n\nThử thách lớn nhất là học cách khẳng định bản thân mà không sợ làm mất lòng người khác. Sự nhạy cảm của bạn là điểm mạnh, nhưng cũng có thể khiến bạn dễ bị tổn thương và đôi khi hy sinh quá nhiều cho người khác.\n\nMục đích cuộc đời bạn là trở thành cầu nối, người mang lại sự hài hòa và hiểu biết lẫn nhau trong thế giới thường đầy xung đột này."
    },
    "strengths": [
      "Khả năng thấu cảm, hiểu người khác sâu sắc",
      "Ngoại giao, hòa giải xung đột xuất sắc",
      "Kiên nhẫn, biết lắng nghe",
      "Hợp tác tốt, làm việc nhóm hiệu quả",
      "Tinh tế, nhạy cảm với chi tiết",
      "Trung thành, đáng tin cậy trong các mối quan hệ"
    ],
    "weaknesses": [
      "Có thể quá nhạy cảm, dễ bị tổn thương",
      "Khó nói \"không\", hy sinh quá mức cho người khác",
      "Thiếu quyết đoán, sợ đưa ra quyết định",
      "Phụ thuộc vào sự công nhận của người khác",
      "Có xu hướng tránh xung đột thay vì giải quyết",
      "Dễ bị lợi dụng vì quá tốt bụng"
    ],
    "lifeLesson": {
      "primary": "Học cách khẳng định bản thân mà vẫn giữ được sự hài hòa",
      "secondary": "Cân bằng giữa phục vụ người khác và chăm sóc bản thân",
      "spiritual": "Hiểu rằng hòa bình thực sự bắt đầu từ bên trong, không phải từ việc làm hài lòng tất cả"
    },
    "careerFinance": {
      "overview": "Đường Đời 2 phù hợp với các công việc đòi hỏi sự hợp tác, giao tiếp, và khả năng hòa giải.",
      "suitableFields": [
        "Ngoại giao, Quan hệ quốc tế",
        "Tư vấn, Trị liệu tâm lý",
        "Nhân sự, Hòa giải lao động",
        "Nghệ thuật, Âm nhạc",
        "Y tá, Chăm sóc sức khỏe",
        "Thư ký, Trợ lý điều hành"
      ],
      "financialPattern": "Tài chính thường ổn định nhờ công việc đều đặn. Không phải người thích mạo hiểm tài chính, ưu tiên sự an toàn."
    },
    "relationships": {
      "love": "Số 2 sống vì tình yêu và các mối quan hệ. Họ là người lãng mạn, chung thủy, và luôn đặt đối tác lên hàng đầu. Tuy nhiên, cần cẩn thận không đánh mất bản thân trong mối quan hệ.",
      "compatibility": {
        "best": [
          4,
          6,
          8
        ],
        "good": [
          1,
          9
        ],
        "challenging": [
          5,
          7
        ]
      },
      "family": "Là người gắn kết gia đình, luôn cố gắng duy trì hòa thuận giữa các thành viên.",
      "friendship": "Có nhiều bạn thân, là người bạn đáng tin cậy và luôn sẵn sàng lắng nghe."
    },
    "health": {
      "overview": "Số 2 liên quan đến hệ thần kinh, tiêu hóa. Dễ bị ảnh hưởng bởi cảm xúc và stress.",
      "concerns": [
        "Lo âu, trầm cảm do nhạy cảm",
        "Tiêu hóa (stress)",
        "Mất ngủ",
        "Đau lưng (gánh nặng cảm xúc)"
      ],
      "advice": "Cần môi trường hài hòa, tránh những người tiêu cực. Thực hành thiền định và các hoạt động giảm stress."
    },
    "luckyElements": {
      "colors": [
        "Trắng",
        "Xanh lá nhạt",
        "Cam nhạt",
        "Bạc"
      ],
      "gemstones": [
        "Ngọc trai",
        "Moonstone",
        "Thạch anh hồng"
      ],
      "numbers": [
        2,
        11,
        20,
        29
      ],
      "days": [
        "Thứ hai"
      ]
    },
    "famousExamples": [
      "Barack Obama",
      "Jennifer Aniston",
      "Madonna",
      "Diana, Princess of Wales"
    ],
    "lifePeriods": {
      "youth": "Thời trẻ có thể nhạy cảm, dễ bị bạn bè ảnh hưởng. Cần học cách bảo vệ bản thân.",
      "adulthood": "Giai đoạn phát triển các mối quan hệ quan trọng, tìm được đối tác và xây dựng sự nghiệp ổn định.",
      "maturity": "Về sau trở thành người hiền triết, người giữ gìn hòa bình trong gia đình và cộng đồng."
    }
  },
  "3": {
    "number": 3,
    "name": "Người Sáng Tạo",
    "altNames": [
      "The Communicator",
      "The Creative",
      "Số Biểu Đạt"
    ],
    "keywords": [
      "Sáng tạo",
      "Giao tiếp",
      "Lạc quan",
      "Nghệ thuật",
      "Vui vẻ"
    ],
    "overview": {
      "short": "Đường Đời số 3 là con đường của sự sáng tạo, biểu đạt và niềm vui. Bạn được sinh ra để mang lại ánh sáng và tiếng cười cho thế giới.",
      "detailed": "Đường Đời số 3 mang năng lượng của Sao Mộc - hành tinh của sự mở rộng, may mắn và lạc quan. Số 3 là sự kết hợp của 1 và 2, tạo nên một thực thể mới - đó là sức mạnh của sự sáng tạo.\n\nNgười Đường Đời 3 được ban tặng khả năng biểu đạt tuyệt vời - qua lời nói, viết lách, nghệ thuật, hoặc bất kỳ hình thức nào khác. Bạn có tài kể chuyện, khiến người khác bị cuốn hút bởi cách bạn truyền đạt ý tưởng.\n\nSố 3 tượng trưng cho tam giác - hình học hoàn hảo đầu tiên, cũng là biểu tượng của sự hài hòa giữa tâm trí, thể xác và tinh thần. Vì vậy, người Đường Đời 3 thường có cái nhìn toàn diện về cuộc sống.\n\nThử thách lớn nhất của số 3 là kỷ luật và tập trung. Với quá nhiều tài năng và sở thích, bạn có thể phân tán năng lượng và không hoàn thành những gì bắt đầu. Học cách kiên trì là bài học quan trọng.\n\nMục đích cuộc đời bạn là truyền cảm hứng và mang lại niềm vui cho người khác thông qua khả năng sáng tạo độc đáo của mình."
    },
    "strengths": [
      "Sáng tạo phong phú, tưởng tượng bay bổng",
      "Giao tiếp xuất sắc, có sức thu hút",
      "Lạc quan, mang lại niềm vui cho người khác",
      "Linh hoạt, thích nghi nhanh",
      "Có khiếu nghệ thuật đa dạng",
      "Hài hước, dí dỏm, dễ kết bạn"
    ],
    "weaknesses": [
      "Dễ phân tán, khó tập trung lâu",
      "Có thể hời hợt, không đi sâu vào vấn đề",
      "Đôi khi hay phóng đại, nói quá",
      "Khó chịu đựng sự nhàm chán",
      "Có xu hướng trốn tránh vấn đề nghiêm túc",
      "Dễ bị dao động cảm xúc"
    ],
    "lifeLesson": {
      "primary": "Học cách tập trung và kiên trì theo đuổi mục tiêu",
      "secondary": "Cân bằng giữa niềm vui và trách nhiệm",
      "spiritual": "Sử dụng khả năng sáng tạo để nâng cao nhận thức và truyền cảm hứng"
    },
    "careerFinance": {
      "overview": "Đường Đời 3 phù hợp với các ngành sáng tạo, truyền thông, nghệ thuật, và giải trí.",
      "suitableFields": [
        "Nghệ sĩ, Nhạc sĩ, Diễn viên",
        "Nhà văn, Nhà báo, Blogger",
        "Marketing, Quảng cáo",
        "MC, Diễn giả, Podcaster",
        "Thiết kế, Nhiếp ảnh",
        "Giáo viên nghệ thuật, Huấn luyện viên"
      ],
      "financialPattern": "Tài chính có thể không ổn định do tính chất sáng tạo. Cần học cách quản lý tiền và không tiêu xài hoang phí."
    },
    "relationships": {
      "love": "Số 3 yêu thích sự lãng mạn và vui vẻ trong tình yêu. Họ cần đối tác có thể theo kịp năng lượng và tôn trọng không gian sáng tạo của mình.",
      "compatibility": {
        "best": [
          1,
          5,
          7
        ],
        "good": [
          3,
          6,
          9
        ],
        "challenging": [
          4,
          8
        ]
      },
      "family": "Mang lại tiếng cười và sự sáng tạo cho gia đình, nhưng có thể thiếu nghiêm túc trong các vấn đề quan trọng.",
      "friendship": "Là trung tâm của nhóm bạn, người mà ai cũng muốn ở bên vì sự vui vẻ và thú vị."
    },
    "health": {
      "overview": "Số 3 liên quan đến họng, hệ thần kinh, và da. Năng lượng cao nhưng cần nghỉ ngơi đúng cách.",
      "concerns": [
        "Họng, giọng nói (nói nhiều)",
        "Hệ thần kinh (quá năng động)",
        "Da",
        "Thiếu ngủ do nhiều hoạt động"
      ],
      "advice": "Cần có lịch trình nghỉ ngơi đều đặn và không cố làm quá nhiều thứ cùng lúc."
    },
    "luckyElements": {
      "colors": [
        "Vàng",
        "Cam",
        "Hồng",
        "Tím"
      ],
      "gemstones": [
        "Thạch anh vàng",
        "Topaz",
        "Amethyst"
      ],
      "numbers": [
        3,
        12,
        21,
        30
      ],
      "days": [
        "Thứ năm"
      ]
    },
    "famousExamples": [
      "Jim Carrey",
      "John Travolta",
      "Audrey Hepburn",
      "Christina Aguilera"
    ],
    "lifePeriods": {
      "youth": "Thời trẻ nổi bật với tài năng nghệ thuật, thường là học sinh sáng tạo, vui vẻ nhưng đôi khi thiếu tập trung.",
      "adulthood": "Giai đoạn phát triển sự nghiệp sáng tạo, có thể trải qua nhiều thay đổi nghề nghiệp trước khi tìm được đam mê thực sự.",
      "maturity": "Về sau trở thành nguồn cảm hứng cho người trẻ, chia sẻ kinh nghiệm và trí tuệ qua nghệ thuật."
    }
  },
  "4": {
    "number": 4,
    "name": "Người Xây Dựng",
    "altNames": [
      "The Builder",
      "The Organizer",
      "Số Ổn Định"
    ],
    "keywords": [
      "Ổn định",
      "Chăm chỉ",
      "Thực tế",
      "Kỷ luật",
      "Trung thực"
    ],
    "overview": {
      "short": "Đường Đời số 4 là con đường của sự ổn định, xây dựng và kỷ luật. Bạn được sinh ra để tạo nền móng vững chắc cho bản thân và người khác.",
      "detailed": "Đường Đời số 4 mang năng lượng của Sao Thiên Vương và hành Thổ - sự ổn định, vững chắc và thực tế. Số 4 tượng trưng cho bốn góc vuông, bốn mùa, bốn phương - những thứ tạo nên cấu trúc của thế giới.\n\nNgười Đường Đời 4 là những người xây dựng - từ xây dựng gia đình, sự nghiệp, đến xây dựng những hệ thống và quy trình. Bạn không tìm kiếm những giải pháp nhanh chóng, mà đầu tư thời gian và công sức để tạo ra những thứ bền vững.\n\nSố 4 đại diện cho sự chăm chỉ, kỷ luật và trách nhiệm. Bạn là người đáng tin cậy, luôn hoàn thành những gì đã cam kết. Trong khi người khác mơ mộng, bạn là người biến những giấc mơ thành hiện thực qua công việc thực tế.\n\nThử thách lớn nhất của số 4 là sự cứng nhắc và khó thích nghi. Bạn có thể quá tập trung vào chi tiết mà bỏ qua bức tranh toàn cảnh, hoặc quá bảo thủ trước những thay đổi cần thiết.\n\nMục đích cuộc đời bạn là tạo ra những nền tảng vững chắc - cho gia đình, cộng đồng, hoặc xã hội - những thứ sẽ tồn tại và phục vụ nhiều thế hệ."
    },
    "strengths": [
      "Chăm chỉ, kiên nhẫn, bền bỉ",
      "Đáng tin cậy, giữ lời hứa",
      "Thực tế, logic, có tổ chức",
      "Kỷ luật, tự giác cao",
      "Có khả năng xây dựng hệ thống",
      "Trung thực, thẳng thắn"
    ],
    "weaknesses": [
      "Có thể cứng nhắc, bảo thủ",
      "Khó chấp nhận thay đổi",
      "Đôi khi quá chi tiết, bỏ qua tổng thể",
      "Có xu hướng làm việc quá sức",
      "Khó thể hiện cảm xúc",
      "Có thể nhàm chán, thiếu sáng tạo"
    ],
    "lifeLesson": {
      "primary": "Học cách linh hoạt và chấp nhận thay đổi",
      "secondary": "Cân bằng giữa công việc và cuộc sống cá nhân",
      "spiritual": "Hiểu rằng sự an toàn thực sự đến từ bên trong, không chỉ từ cấu trúc bên ngoài"
    },
    "careerFinance": {
      "overview": "Đường Đời 4 phù hợp với các công việc đòi hỏi sự chính xác, tổ chức, và xây dựng dài hạn.",
      "suitableFields": [
        "Kỹ sư, Kiến trúc sư, Xây dựng",
        "Kế toán, Tài chính, Ngân hàng",
        "Quản lý dự án, Vận hành",
        "Công chức, Hành chính",
        "Bất động sản, Đầu tư dài hạn",
        "Sản xuất, Chất lượng"
      ],
      "financialPattern": "Tài chính ổn định nhờ cách làm việc chăm chỉ và tiết kiệm. Không giàu nhanh nhưng tích lũy bền vững theo thời gian."
    },
    "relationships": {
      "love": "Số 4 tìm kiếm sự ổn định và cam kết trong tình yêu. Họ trung thành, đáng tin cậy, nhưng có thể cần học cách thể hiện tình cảm nhiều hơn.",
      "compatibility": {
        "best": [
          2,
          6,
          8
        ],
        "good": [
          4,
          7
        ],
        "challenging": [
          1,
          3,
          5
        ]
      },
      "family": "Là trụ cột vững chắc của gia đình, lo liệu chu đáo mọi mặt vật chất và an ninh.",
      "friendship": "Có ít bạn thân nhưng rất trung thành và đáng tin cậy. Là người bạn có thể dựa vào trong khó khăn."
    },
    "health": {
      "overview": "Số 4 liên quan đến xương, khớp, răng, và hệ tiêu hóa. Dễ bị các vấn đề do làm việc quá sức.",
      "concerns": [
        "Xương, khớp, đặc biệt lưng",
        "Răng",
        "Tiêu hóa (stress)",
        "Mệt mỏi mãn tính"
      ],
      "advice": "Cần nghỉ ngơi đều đặn, không làm việc quá sức. Tập thể dục nhẹ nhàng và chú ý tư thế."
    },
    "luckyElements": {
      "colors": [
        "Xanh lá",
        "Nâu",
        "Xám",
        "Xanh dương đậm"
      ],
      "gemstones": [
        "Ngọc bích (Jade)",
        "Sapphire",
        "Emerald"
      ],
      "numbers": [
        4,
        13,
        22,
        31
      ],
      "days": [
        "Thứ bảy",
        "Chủ nhật"
      ]
    },
    "famousExamples": [
      "Bill Gates",
      "Oprah Winfrey",
      "Arnold Schwarzenegger",
      "Elton John"
    ],
    "lifePeriods": {
      "youth": "Thời trẻ có thể gặp nhiều thử thách, học được giá trị của sự chăm chỉ từ sớm.",
      "adulthood": "Giai đoạn xây dựng sự nghiệp và gia đình vững chắc, thường đạt được thành công qua nỗ lực kiên trì.",
      "maturity": "Về sau hưởng thụ thành quả của những gì đã xây dựng, trở thành người cố vấn đáng tin cậy."
    }
  },
  "5": {
    "number": 5,
    "name": "Người Tự Do",
    "altNames": [
      "The Freedom Seeker",
      "The Adventurer",
      "Số Biến Đổi"
    ],
    "keywords": [
      "Tự do",
      "Phiêu lưu",
      "Thay đổi",
      "Linh hoạt",
      "Trải nghiệm"
    ],
    "overview": {
      "short": "Đường Đời số 5 là con đường của sự tự do, phiêu lưu và thay đổi. Bạn được sinh ra để trải nghiệm cuộc sống đến mức tối đa.",
      "detailed": "Đường Đời số 5 mang năng lượng của Sao Thủy - hành tinh của giao tiếp, di chuyển và thay đổi. Số 5 nằm chính giữa dãy 1-9, là điểm cân bằng và cũng là điểm xoay chuyển.\n\nNgười Đường Đời 5 khao khát tự do như không khí để thở. Bạn không thể sống trong những khuôn khổ chật hẹp, những công việc nhàm chán, hay những mối quan hệ ràng buộc. Sự phiêu lưu, thay đổi và trải nghiệm mới là những gì khiến bạn cảm thấy sống.\n\nSố 5 tượng trưng cho năm giác quan - bạn muốn trải nghiệm cuộc sống bằng tất cả các giác quan: nhìn, nghe, nếm, ngửi, chạm. Đó là lý do bạn thường yêu thích du lịch, ẩm thực, nghệ thuật, và mọi thứ kích thích giác quan.\n\nThử thách lớn nhất của số 5 là sự thiếu cam kết và tập trung. Với quá nhiều điều thú vị để khám phá, bạn có thể nhảy từ thứ này sang thứ khác mà không bao giờ đi sâu vào bất kỳ điều gì.\n\nMục đích cuộc đời bạn là trải nghiệm sự đa dạng của cuộc sống và chia sẻ những hiểu biết đó cho người khác, giúp họ mở rộng tầm nhìn."
    },
    "strengths": [
      "Linh hoạt, thích nghi nhanh với mọi hoàn cảnh",
      "Tò mò, ham học hỏi, cởi mở",
      "Đa tài, có nhiều kỹ năng đa dạng",
      "Giao tiếp tốt, hấp dẫn, có sức thu hút",
      "Dũng cảm, không sợ thử nghiệm",
      "Lạc quan, nhìn cuộc sống tích cực"
    ],
    "weaknesses": [
      "Thiếu cam kết, dễ thay đổi ý định",
      "Khó chịu với sự nhàm chán và lặp lại",
      "Có thể bốc đồng, thiếu suy nghĩ",
      "Trốn tránh trách nhiệm dài hạn",
      "Dễ bị cám dỗ, có thể sa ngã",
      "Khó duy trì các mối quan hệ lâu dài"
    ],
    "lifeLesson": {
      "primary": "Học cách cam kết mà vẫn giữ được tự do nội tâm",
      "secondary": "Tìm kiếm tự do trong kỷ luật, không phải sự hỗn loạn",
      "spiritual": "Hiểu rằng tự do thực sự là tự do khỏi các ham muốn, không phải tự do để theo đuổi chúng"
    },
    "careerFinance": {
      "overview": "Đường Đời 5 phù hợp với các công việc đòi hỏi sự linh hoạt, đa dạng, và không bị ràng buộc.",
      "suitableFields": [
        "Du lịch, Hướng dẫn viên, Phi công",
        "Sales, Marketing quốc tế",
        "Nhà báo, Phóng viên",
        "Freelancer, Tư vấn",
        "Giải trí, Sự kiện",
        "Thể thao, Huấn luyện viên"
      ],
      "financialPattern": "Tài chính không ổn định, có thể kiếm được nhiều nhưng cũng tiêu nhiều. Cần học cách tiết kiệm cho tương lai."
    },
    "relationships": {
      "love": "Số 5 cần không gian và tự do trong tình yêu. Họ sợ cam kết nhưng khi tìm được người hiểu mình, có thể rất chung thủy - theo cách của riêng họ.",
      "compatibility": {
        "best": [
          1,
          3,
          7
        ],
        "good": [
          5,
          9
        ],
        "challenging": [
          2,
          4,
          6,
          8
        ]
      },
      "family": "Có thể là phụ huynh thú vị, mang lại nhiều trải nghiệm cho con cái, nhưng đôi khi thiếu ổn định.",
      "friendship": "Có nhiều bạn từ khắp nơi, là người bạn đồng hành tuyệt vời cho những cuộc phiêu lưu."
    },
    "health": {
      "overview": "Số 5 liên quan đến hệ thần kinh, phổi, và các giác quan. Dễ gặp vấn đề do lối sống quá năng động.",
      "concerns": [
        "Hệ thần kinh (căng thẳng)",
        "Phổi, hô hấp",
        "Nghiện ngập (nếu không kiểm soát)",
        "Tai nạn do mạo hiểm"
      ],
      "advice": "Cần cân bằng giữa phiêu lưu và nghỉ ngơi. Tránh các chất kích thích và lối sống thái quá."
    },
    "luckyElements": {
      "colors": [
        "Xám",
        "Trắng",
        "Xanh lá nhạt",
        "Nhiều màu"
      ],
      "gemstones": [
        "Thạch anh trắng",
        "Aquamarine",
        "Turquoise"
      ],
      "numbers": [
        5,
        14,
        23,
        32
      ],
      "days": [
        "Thứ tư"
      ]
    },
    "famousExamples": [
      "Angelina Jolie",
      "Abraham Lincoln",
      "Vincent van Gogh",
      "Mick Jagger"
    ],
    "lifePeriods": {
      "youth": "Thời trẻ thích khám phá, có thể nổi loạn hoặc rời gia đình sớm để tìm kiếm tự do.",
      "adulthood": "Giai đoạn trải qua nhiều thay đổi nghề nghiệp, nơi ở, và mối quan hệ. Học được nhiều từ những trải nghiệm đa dạng.",
      "maturity": "Về sau có thể ổn định hơn, chia sẻ kinh nghiệm phong phú cho người khác như nhà văn, diễn giả, hoặc cố vấn."
    }
  },
  "6": {
    "number": 6,
    "name": "Người Chăm Sóc",
    "altNames": [
      "The Nurturer",
      "The Caregiver",
      "Số Trách Nhiệm"
    ],
    "keywords": [
      "Trách nhiệm",
      "Yêu thương",
      "Gia đình",
      "Hài hòa",
      "Phục vụ"
    ],
    "overview": {
      "short": "Đường Đời số 6 là con đường của tình yêu thương, trách nhiệm và chăm sóc. Bạn được sinh ra để bảo vệ và nuôi dưỡng người khác.",
      "detailed": "Đường Đời số 6 mang năng lượng của Sao Kim - hành tinh của tình yêu, vẻ đẹp và sự hài hòa. Số 6 là số của gia đình, cộng đồng, và trách nhiệm với người khác.\n\nNgười Đường Đời 6 có trái tim rộng lớn, luôn muốn chăm sóc và bảo vệ những người xung quanh. Bạn cảm thấy hạnh phúc nhất khi thấy người thân yêu của mình được an toàn và vui vẻ. Sự hi sinh cho người khác đến với bạn một cách tự nhiên.\n\nSố 6 tượng trưng cho ngôi sao David - sự hòa hợp giữa thiên đàng và trần gian, giữa tinh thần và vật chất. Vì vậy, người Đường Đời 6 có khả năng tạo ra những không gian hài hòa, đẹp đẽ - từ ngôi nhà đến các mối quan hệ.\n\nThử thách lớn nhất của số 6 là sự kiểm soát quá mức và hi sinh bản thân. Bạn có thể trở nên can thiệp quá sâu vào cuộc sống của người khác, hoặc quên chăm sóc chính mình vì quá bận lo cho người khác.\n\nMục đích cuộc đời bạn là trở thành nguồn yêu thương và sự chữa lành cho gia đình và cộng đồng, tạo ra những môi trường nơi mọi người có thể phát triển."
    },
    "strengths": [
      "Yêu thương, chăm sóc, nuôi dưỡng người khác",
      "Có trách nhiệm cao với gia đình và cộng đồng",
      "Tạo ra sự hài hòa và vẻ đẹp",
      "Đáng tin cậy, luôn sẵn sàng giúp đỡ",
      "Có khiếu thẩm mỹ, nghệ thuật",
      "Trung thành, chung thủy trong các mối quan hệ"
    ],
    "weaknesses": [
      "Có thể kiểm soát quá mức, can thiệp",
      "Hi sinh bản thân quá nhiều, quên chăm sóc mình",
      "Đôi khi lo lắng thái quá",
      "Khó nói \"không\" với yêu cầu của người khác",
      "Có xu hướng làm mọi thứ cho người khác",
      "Cảm thấy tội lỗi khi nghĩ đến bản thân"
    ],
    "lifeLesson": {
      "primary": "Học cách chăm sóc bản thân trước khi chăm sóc người khác",
      "secondary": "Cân bằng giữa trách nhiệm và tự do cá nhân",
      "spiritual": "Hiểu rằng yêu thương thực sự là cho phép người khác tự phát triển"
    },
    "careerFinance": {
      "overview": "Đường Đời 6 phù hợp với các công việc liên quan đến chăm sóc, phục vụ, và tạo ra vẻ đẹp.",
      "suitableFields": [
        "Y tế, Điều dưỡng, Chăm sóc sức khỏe",
        "Giáo dục, Nuôi dạy trẻ",
        "Tư vấn gia đình, Trị liệu",
        "Thiết kế nội thất, Nghệ thuật",
        "Nhà hàng, Khách sạn, Hospitality",
        "Công tác xã hội, Từ thiện"
      ],
      "financialPattern": "Tài chính thường đủ dùng, không phải mục tiêu chính. Có thể tiêu nhiều cho gia đình và người khác."
    },
    "relationships": {
      "love": "Số 6 là người yêu thương nhất trong các số. Họ tìm kiếm mối quan hệ cam kết, ổn định, và sẵn sàng làm mọi thứ cho người mình yêu.",
      "compatibility": {
        "best": [
          2,
          4,
          8,
          9
        ],
        "good": [
          3,
          6
        ],
        "challenging": [
          1,
          5,
          7
        ]
      },
      "family": "Là trung tâm của gia đình, người gắn kết mọi thành viên. Có thể là phụ huynh tuyệt vời nhưng cần tránh bảo bọc quá mức.",
      "friendship": "Là người bạn đáng tin cậy, luôn sẵn sàng lắng nghe và giúp đỡ. Có xu hướng trở thành \"mẹ\" của nhóm."
    },
    "health": {
      "overview": "Số 6 liên quan đến tim, ngực, và hệ miễn dịch. Dễ bị ảnh hưởng bởi stress từ lo lắng cho người khác.",
      "concerns": [
        "Tim (lo lắng)",
        "Ngực, vú",
        "Hệ miễn dịch (kiệt sức)",
        "Trầm cảm (khi không được đánh giá đúng)"
      ],
      "advice": "Cần dành thời gian cho bản thân, học cách nói \"không\" và đặt ranh giới lành mạnh."
    },
    "luckyElements": {
      "colors": [
        "Xanh dương",
        "Hồng",
        "Xanh lá",
        "Trắng"
      ],
      "gemstones": [
        "Emerald",
        "Thạch anh hồng",
        "Sapphire xanh"
      ],
      "numbers": [
        6,
        15,
        24,
        33
      ],
      "days": [
        "Thứ sáu"
      ]
    },
    "famousExamples": [
      "John Lennon",
      "Meryl Streep",
      "Goldie Hawn",
      "Michael Jackson"
    ],
    "lifePeriods": {
      "youth": "Thời trẻ thường gánh trách nhiệm gia đình sớm, có thể là con cả hoặc người chăm sóc.",
      "adulthood": "Giai đoạn xây dựng gia đình và sự nghiệp phục vụ. Hạnh phúc nhất khi người thân khỏe mạnh và vui vẻ.",
      "maturity": "Về sau trở thành nguồn hỗ trợ tinh thần cho gia đình mở rộng và cộng đồng."
    }
  },
  "7": {
    "number": 7,
    "name": "Người Tìm Kiếm",
    "altNames": [
      "The Seeker",
      "The Philosopher",
      "Số Tâm Linh"
    ],
    "keywords": [
      "Tâm linh",
      "Tri thức",
      "Nội tâm",
      "Phân tích",
      "Cô độc"
    ],
    "overview": {
      "short": "Đường Đời số 7 là con đường của sự tìm kiếm chân lý, tri thức và tâm linh. Bạn được sinh ra để khám phá những bí ẩn của cuộc sống.",
      "detailed": "Đường Đời số 7 mang năng lượng của Sao Hải Vương - hành tinh của trực giác, tâm linh và những điều huyền bí. Số 7 được xem là con số thiêng liêng trong nhiều nền văn hóa - 7 ngày trong tuần, 7 nốt nhạc, 7 màu cầu vồng.\n\nNgười Đường Đời 7 là những triết gia, nhà tư tưởng, người tìm kiếm chân lý. Bạn không hài lòng với những câu trả lời bề mặt, mà luôn muốn đào sâu vào bản chất của mọi thứ. \"Tại sao?\" là câu hỏi thường trực trong tâm trí bạn.\n\nSố 7 tượng trưng cho sự hoàn hảo về mặt tinh thần - sự kết hợp giữa 3 (thiên đàng) và 4 (trái đất). Vì vậy, người Đường Đời 7 có khả năng kết nối giữa thế giới vật chất và tâm linh một cách tự nhiên.\n\nThử thách lớn nhất của số 7 là sự cô lập và hoài nghi. Bạn có thể quá mải mê trong thế giới nội tâm mà quên kết nối với người khác, hoặc trở nên quá hoài nghi đến mức không tin vào bất kỳ điều gì.\n\nMục đích cuộc đời bạn là tìm kiếm và chia sẻ những hiểu biết sâu sắc về cuộc sống, cầu nối giữa khoa học và tâm linh, giữa lý trí và trực giác."
    },
    "strengths": [
      "Trí tuệ sâu sắc, khả năng phân tích cao",
      "Trực giác mạnh, kết nối tâm linh",
      "Độc lập, tự chủ trong tư duy",
      "Tập trung sâu, nghiên cứu kỹ lưỡng",
      "Tìm kiếm chân lý, không chấp nhận sự hời hợt",
      "Bí ẩn, thu hút bởi chiều sâu nội tâm"
    ],
    "weaknesses": [
      "Có xu hướng cô lập, xa cách người khác",
      "Quá hoài nghi, khó tin tưởng",
      "Đôi khi quá khép kín, khó chia sẻ cảm xúc",
      "Có thể trở nên bi quan, lạnh lùng",
      "Khó kết nối trong các mối quan hệ xã hội",
      "Có thể tự mãn về tri thức của mình"
    ],
    "lifeLesson": {
      "primary": "Học cách cân bằng giữa đời sống nội tâm và kết nối xã hội",
      "secondary": "Chia sẻ tri thức và trực giác của mình để giúp đỡ người khác",
      "spiritual": "Hiểu rằng chân lý cao nhất nằm ở sự đơn giản, không phải sự phức tạp"
    },
    "careerFinance": {
      "overview": "Đường Đời 7 phù hợp với các công việc đòi hỏi nghiên cứu sâu, phân tích, hoặc liên quan đến tâm linh.",
      "suitableFields": [
        "Nghiên cứu khoa học, Học thuật",
        "Triết học, Tâm linh, Tôn giáo",
        "Tâm lý học, Phân tích",
        "Công nghệ thông tin, Lập trình",
        "Y học, Dược học",
        "Điều tra, Pháp y"
      ],
      "financialPattern": "Tiền bạc không phải mục tiêu chính, nhưng thường có đủ nhờ chuyên môn cao. Không quan tâm đến vật chất."
    },
    "relationships": {
      "love": "Số 7 cần nhiều không gian riêng tư. Họ tìm kiếm đối tác có thể hiểu và tôn trọng nhu cầu cô đơn của mình, đồng thời kết nối ở mức độ trí tuệ sâu sắc.",
      "compatibility": {
        "best": [
          1,
          3,
          5
        ],
        "good": [
          4,
          7,
          9
        ],
        "challenging": [
          2,
          6,
          8
        ]
      },
      "family": "Có thể không gần gũi với gia đình theo cách truyền thống, nhưng là nguồn tri thức và hướng dẫn tâm linh.",
      "friendship": "Có rất ít bạn thân nhưng những mối quan hệ đó rất sâu sắc và có ý nghĩa."
    },
    "health": {
      "overview": "Số 7 liên quan đến hệ thần kinh, não, và các vấn đề tâm thần. Cần chú ý đến sức khỏe tinh thần.",
      "concerns": [
        "Hệ thần kinh",
        "Não (suy nghĩ quá nhiều)",
        "Lo âu, trầm cảm",
        "Mất ngủ"
      ],
      "advice": "Cần thời gian trong thiên nhiên, thiền định, và kết nối với cơ thể vật lý. Tránh cô lập quá mức."
    },
    "luckyElements": {
      "colors": [
        "Tím",
        "Xanh dương đậm",
        "Xám",
        "Trắng"
      ],
      "gemstones": [
        "Amethyst",
        "Sapphire",
        "Cat's eye"
      ],
      "numbers": [
        7,
        16,
        25,
        34
      ],
      "days": [
        "Thứ hai"
      ]
    },
    "famousExamples": [
      "Leonardo DiCaprio",
      "Julia Roberts",
      "Princess Diana",
      "Marilyn Monroe"
    ],
    "lifePeriods": {
      "youth": "Thời trẻ có thể cảm thấy khác biệt, thích ở một mình và đọc sách hơn là chơi đùa.",
      "adulthood": "Giai đoạn tìm kiếm và nghiên cứu sâu, có thể trải qua các khủng hoảng hiện sinh dẫn đến sự giác ngộ.",
      "maturity": "Về sau trở thành người hiền triết, nguồn cảm hứng tâm linh cho những người tìm kiếm."
    }
  },
  "8": {
    "number": 8,
    "name": "Người Quyền Lực",
    "altNames": [
      "The Powerhouse",
      "The Achiever",
      "Số Thành Công"
    ],
    "keywords": [
      "Quyền lực",
      "Thành công",
      "Tham vọng",
      "Tài chính",
      "Karma"
    ],
    "overview": {
      "short": "Đường Đời số 8 là con đường của quyền lực, thành công và sự cân bằng karma. Bạn được sinh ra để đạt được thành tựu lớn trong thế giới vật chất.",
      "detailed": "Đường Đời số 8 mang năng lượng của Sao Thổ - hành tinh của kỷ luật, nghiệp quả và thành tựu. Số 8 nằm ngang là biểu tượng vô cực, thể hiện sự tuần hoàn vô tận của cho và nhận, nguyên nhân và kết quả.\n\nNgười Đường Đời 8 được sinh ra với tiềm năng đạt được thành công lớn về mặt vật chất - tiền bạc, quyền lực, địa vị. Nhưng đi kèm với tiềm năng này là trách nhiệm karma lớn: bạn sẽ gặt hái đúng những gì bạn gieo trồng.\n\nSố 8 tượng trưng cho sự cân bằng - giữa vật chất và tinh thần, giữa cho và nhận. Bạn học được rằng tiền bạc và quyền lực là công cụ, không phải mục đích. Cách bạn sử dụng chúng quyết định karma của bạn.\n\nThử thách lớn nhất của số 8 là sự lạm dụng quyền lực hoặc bị quyền lực làm cho mù quáng. Bạn có thể trở nên quá tham vọng, vô cảm, hoặc đánh đổi mọi thứ để thành công.\n\nMục đích cuộc đời bạn là sử dụng khả năng kinh doanh và lãnh đạo để tạo ra sự giàu có không chỉ cho bản thân mà còn cho cộng đồng, cân bằng karma qua sự hào phóng và công bằng."
    },
    "strengths": [
      "Khả năng kinh doanh và quản lý tài chính xuất sắc",
      "Tham vọng lớn, quyết tâm cao",
      "Năng lực lãnh đạo và tổ chức",
      "Nhìn xa trông rộng, chiến lược",
      "Bền bỉ, không bỏ cuộc trước khó khăn",
      "Có khả năng đạt được thành công vật chất lớn"
    ],
    "weaknesses": [
      "Có thể trở nên tham lam, vô cảm",
      "Đặt công việc lên trên gia đình và sức khỏe",
      "Khó chấp nhận thất bại",
      "Có xu hướng kiểm soát và thống trị",
      "Đôi khi đánh giá người khác qua tiền bạc",
      "Có thể lạm dụng quyền lực"
    ],
    "lifeLesson": {
      "primary": "Học cách sử dụng quyền lực và tiền bạc một cách đạo đức",
      "secondary": "Cân bằng giữa thành công vật chất và các giá trị tinh thần",
      "spiritual": "Hiểu rằng sự giàu có thực sự là khả năng cho đi, không phải tích lũy"
    },
    "careerFinance": {
      "overview": "Đường Đời 8 có tiềm năng lớn nhất về mặt tài chính. Phù hợp với các vị trí cao cấp và kinh doanh.",
      "suitableFields": [
        "CEO, Giám đốc điều hành",
        "Đầu tư, Ngân hàng, Tài chính",
        "Bất động sản, Xây dựng",
        "Luật, Đặc biệt luật doanh nghiệp",
        "Chính trị, Lãnh đạo tổ chức",
        "Khởi nghiệp quy mô lớn"
      ],
      "financialPattern": "Tài chính thường có những đỉnh cao và vực sâu - có thể rất giàu hoặc trải qua khủng hoảng. Đây là bài học karma về tiền bạc."
    },
    "relationships": {
      "love": "Số 8 có thể khó khăn trong tình yêu vì quá tập trung vào sự nghiệp. Họ cần đối tác hiểu được tham vọng của mình và có sự nghiệp riêng.",
      "compatibility": {
        "best": [
          2,
          4,
          6
        ],
        "good": [
          8
        ],
        "challenging": [
          1,
          3,
          5,
          7
        ]
      },
      "family": "Có thể là trụ cột tài chính vững chắc nhưng đôi khi thiếu thời gian cho gia đình.",
      "friendship": "Có nhiều mối quan hệ kinh doanh, nhưng bạn thân thực sự thì ít."
    },
    "health": {
      "overview": "Số 8 liên quan đến xương, khớp, răng, và hệ tuần hoàn. Dễ bị các vấn đề do stress công việc.",
      "concerns": [
        "Xương, khớp",
        "Tim mạch (stress)",
        "Răng",
        "Căng thẳng mãn tính"
      ],
      "advice": "Cần cân bằng công việc và nghỉ ngơi. Tập thể dục đều đặn và kiểm tra sức khỏe định kỳ."
    },
    "luckyElements": {
      "colors": [
        "Đen",
        "Xám đậm",
        "Nâu",
        "Xanh dương đậm"
      ],
      "gemstones": [
        "Blue Sapphire",
        "Thạch anh khói",
        "Obsidian"
      ],
      "numbers": [
        8,
        17,
        26,
        35
      ],
      "days": [
        "Thứ bảy"
      ]
    },
    "famousExamples": [
      "Pablo Picasso",
      "Nelson Mandela",
      "Aretha Franklin",
      "Giorgio Armani"
    ],
    "lifePeriods": {
      "youth": "Thời trẻ có thể gặp khó khăn tài chính hoặc học được giá trị đồng tiền từ sớm.",
      "adulthood": "Giai đoạn xây dựng sự nghiệp và tài sản, có thể trải qua cả thành công lẫn thất bại lớn.",
      "maturity": "Về sau đạt được sự ổn định tài chính và có thể dùng nguồn lực để giúp đỡ người khác."
    }
  },
  "9": {
    "number": 9,
    "name": "Người Nhân Đạo",
    "altNames": [
      "The Humanitarian",
      "The Idealist",
      "Số Hoàn Thiện"
    ],
    "keywords": [
      "Nhân đạo",
      "Lý tưởng",
      "Bao dung",
      "Hoàn thiện",
      "Phục vụ"
    ],
    "overview": {
      "short": "Đường Đời số 9 là con đường của sự bao dung, nhân đạo và phục vụ nhân loại. Bạn được sinh ra để làm cho thế giới tốt đẹp hơn.",
      "detailed": "Đường Đời số 9 mang năng lượng của Sao Hỏa - hành tinh của sức mạnh, đam mê và lý tưởng. Số 9 là con số cao nhất trong dãy đơn, tượng trưng cho sự hoàn thiện và kết thúc của một chu kỳ.\n\nNgười Đường Đời 9 có tâm hồn rộng lớn, bao dung với tất cả mọi người bất kể chủng tộc, tôn giáo hay hoàn cảnh. Bạn nhìn thấy sự kết nối giữa tất cả con người và cảm thấy có trách nhiệm phục vụ nhân loại, không chỉ bản thân hay gia đình.\n\nSố 9 chứa đựng tất cả các số khác (1+2+3+4+5+6+7+8=36=3+6=9), vì vậy người Đường Đời 9 có thể hiểu và đồng cảm với mọi loại người. Bạn là tấm gương phản chiếu - cho phép người khác thấy chính họ qua bạn.\n\nThử thách lớn nhất của số 9 là sự thất vọng khi thế giới không đạt được lý tưởng của bạn. Bạn có thể trở nên cay đắng, tự phụ, hoặc hy sinh quá mức đến mức kiệt sức.\n\nMục đích cuộc đời bạn là sử dụng sự bao dung và tài năng của mình để phục vụ nhân loại, để lại thế giới tốt đẹp hơn khi bạn đến."
    },
    "strengths": [
      "Bao dung, nhân đạo, yêu thương nhân loại",
      "Lý tưởng cao đẹp, tầm nhìn toàn cầu",
      "Sáng tạo, có nhiều tài năng",
      "Sức thu hút charismatic",
      "Rộng lượng, sẵn sàng cho đi",
      "Trí tuệ tổng hợp từ nhiều nguồn"
    ],
    "weaknesses": [
      "Có thể trở nên lý tưởng hóa quá mức",
      "Thất vọng với sự bất toàn của thế giới",
      "Đôi khi tự phụ về sự \"giác ngộ\" của mình",
      "Khó buông bỏ quá khứ",
      "Có xu hướng hy sinh quá mức",
      "Đôi khi xa cách, khó gần trong quan hệ thân mật"
    ],
    "lifeLesson": {
      "primary": "Học cách chấp nhận sự bất toàn của thế giới mà vẫn tiếp tục phục vụ",
      "secondary": "Cân bằng giữa lý tưởng và thực tế",
      "spiritual": "Hiểu rằng phục vụ thực sự là phục vụ không mong đợi đền đáp"
    },
    "careerFinance": {
      "overview": "Đường Đời 9 phù hợp với các công việc mang lại lợi ích cho nhiều người, không chỉ cá nhân.",
      "suitableFields": [
        "Từ thiện, NGO, Công tác xã hội",
        "Y tế, Điều dưỡng công cộng",
        "Giáo dục, Đào tạo",
        "Nghệ thuật, Âm nhạc, Diễn viên",
        "Luật nhân quyền, Hoạt động xã hội",
        "Tôn giáo, Tâm linh"
      ],
      "financialPattern": "Tiền bạc đến và đi - số 9 thường cho đi nhiều hơn giữ lại. Không nên quá lo lắng về tài chính, nó sẽ đến khi cần."
    },
    "relationships": {
      "love": "Số 9 yêu thương tất cả mọi người, đôi khi khiến đối tác cảm thấy không đặc biệt. Họ cần học cách dành tình yêu cá nhân, không chỉ tình yêu phổ quát.",
      "compatibility": {
        "best": [
          1,
          2,
          6
        ],
        "good": [
          3,
          5,
          9
        ],
        "challenging": [
          4,
          7,
          8
        ]
      },
      "family": "Có thể mở rộng khái niệm gia đình ra toàn nhân loại, đôi khi khiến gia đình ruột cảm thấy bị bỏ rơi.",
      "friendship": "Có nhiều bạn từ mọi tầng lớp xã hội, là người bạn hào phóng và đáng tin cậy."
    },
    "health": {
      "overview": "Số 9 liên quan đến đầu, não, và hệ thần kinh. Dễ bị các vấn đề do gánh nặng cảm xúc.",
      "concerns": [
        "Đầu, đau đầu",
        "Hệ thần kinh",
        "Kiệt sức do cho đi quá nhiều",
        "Trầm cảm khi lý tưởng bị thất bại"
      ],
      "advice": "Cần học cách nghỉ ngơi và chăm sóc bản thân. Không thể giúp ai nếu bạn kiệt sức."
    },
    "luckyElements": {
      "colors": [
        "Đỏ",
        "Hồng",
        "Cam",
        "Vàng"
      ],
      "gemstones": [
        "Ruby",
        "Garnet",
        "Bloodstone"
      ],
      "numbers": [
        9,
        18,
        27,
        36
      ],
      "days": [
        "Thứ ba"
      ]
    },
    "famousExamples": [
      "Mahatma Gandhi",
      "Mother Teresa",
      "Bob Marley",
      "Elvis Presley"
    ],
    "lifePeriods": {
      "youth": "Thời trẻ có thể cảm thấy khác biệt, có lý tưởng cao và đôi khi thất vọng với thực tế.",
      "adulthood": "Giai đoạn tìm kiếm cách phục vụ, có thể qua nghệ thuật, hoạt động xã hội, hoặc nghề nghiệp phục vụ.",
      "maturity": "Về sau trở thành nguồn cảm hứng cho nhiều người, được nhớ đến vì những đóng góp cho nhân loại."
    }
  },
  "11": {
    "number": 11,
    "name": "Bậc Thầy Trực Giác",
    "altNames": [
      "The Master Intuitive",
      "The Spiritual Messenger",
      "Số Thầy 11"
    ],
    "keywords": [
      "Trực giác",
      "Tâm linh",
      "Cảm hứng",
      "Khai sáng",
      "Nhạy cảm"
    ],
    "isMasterNumber": true,
    "reducesTo": 2,
    "overview": {
      "short": "Số Chủ 11 là con đường của bậc thầy tâm linh, người mang thông điệp từ cõi cao hơn. Bạn được sinh ra với khả năng trực giác phi thường.",
      "detailed": "Số Chủ 11 là con số đầu tiên trong ba số chủ (11, 22, 33), mang năng lượng kép của số 2 nhưng ở mức độ cao hơn nhiều. Đây là con số của sự khai sáng, trực giác, và khả năng kết nối với những tầng thực tại cao hơn.\n\nNgười Đường Đời 11 được sinh ra với \"antenna\" tâm linh cực kỳ nhạy bén. Bạn có thể cảm nhận được những điều mà người khác không thấy - năng lượng, cảm xúc, thậm chí tương lai. Đây vừa là ơn phước vừa là gánh nặng.\n\nSố 11 tượng trưng cho hai cột trụ - cầu nối giữa thế giới vật chất và tâm linh. Bạn có nhiệm vụ mang ánh sáng từ cõi cao xuống trần gian, truyền cảm hứng và nâng cao nhận thức của người khác.\n\nThử thách của số 11 là áp lực từ sự nhạy cảm quá mức. Bạn dễ bị overwhelm bởi năng lượng xung quanh, lo âu, và đôi khi nghi ngờ khả năng của chính mình. Học cách grounding (tiếp đất) là rất quan trọng.\n\nNếu áp lực quá lớn, số 11 có thể \"hạ xuống\" sống như số 2 - vẫn tốt, nhưng không phát huy hết tiềm năng. Mục đích là học cách làm chủ năng lượng này và sử dụng nó để phục vụ."
    },
    "strengths": [
      "Trực giác phi thường, \"biết\" mà không cần lý giải",
      "Khả năng truyền cảm hứng, khai sáng người khác",
      "Sáng tạo ở mức thiên tài",
      "Kết nối tâm linh mạnh mẽ",
      "Có tầm nhìn vượt thời gian",
      "Charisma tự nhiên, thu hút người khác"
    ],
    "weaknesses": [
      "Quá nhạy cảm, dễ bị overwhelm",
      "Lo âu, căng thẳng, thần kinh",
      "Đôi khi nghi ngờ bản thân",
      "Có thể bị coi là \"khác thường\"",
      "Khó sống trong thế giới thực",
      "Dễ rơi vào ảo tưởng nếu không grounded"
    ],
    "lifeLesson": {
      "primary": "Học cách làm chủ khả năng trực giác mà không bị nó làm chủ",
      "secondary": "Cân bằng giữa thế giới tâm linh và cuộc sống thực tế",
      "spiritual": "Trở thành kênh truyền thông điệp cao hơn mà không đánh mất bản thân"
    },
    "careerFinance": {
      "overview": "Số 11 phù hợp với các công việc mang tính cảm hứng, tâm linh, hoặc sáng tạo cao.",
      "suitableFields": [
        "Tâm linh, Healing, Trị liệu năng lượng",
        "Nghệ thuật, Âm nhạc, Sáng tạo",
        "Tâm lý, Tư vấn",
        "Diễn giả, Huấn luyện viên truyền cảm hứng",
        "Nhà văn, Nhà thơ",
        "Metaphysics, Chiêm tinh"
      ],
      "financialPattern": "Tài chính không ổn định, phụ thuộc vào việc có sử dụng được khả năng đặc biệt hay không. Khi aligned, tiền đến một cách kỳ diệu."
    },
    "relationships": {
      "love": "Số 11 tìm kiếm tình yêu soulmate - kết nối ở mức linh hồn. Họ không thể ở trong mối quan hệ hời hợt.",
      "compatibility": {
        "best": [
          2,
          4,
          6,
          22
        ],
        "good": [
          7,
          9,
          11,
          33
        ],
        "challenging": [
          1,
          5,
          8
        ]
      },
      "family": "Có thể là nguồn hướng dẫn tâm linh cho gia đình, nhưng đôi khi bị hiểu lầm.",
      "friendship": "Có ít bạn thân nhưng những kết nối đó rất sâu sắc và có ý nghĩa tâm linh."
    },
    "health": {
      "overview": "Số 11 cực kỳ nhạy cảm về mặt thần kinh. Dễ bị các vấn đề liên quan đến stress và năng lượng.",
      "concerns": [
        "Lo âu, panic",
        "Hệ thần kinh",
        "Mất ngủ",
        "Nhạy cảm với năng lượng tiêu cực"
      ],
      "advice": "Cần thực hành grounding, thiền định, và bảo vệ năng lượng hàng ngày. Tránh những môi trường tiêu cực."
    },
    "luckyElements": {
      "colors": [
        "Bạc",
        "Trắng",
        "Tím nhạt"
      ],
      "gemstones": [
        "Moonstone",
        "Labradorite",
        "Clear Quartz"
      ],
      "numbers": [
        11,
        22,
        33,
        29,
        38
      ],
      "days": [
        "Thứ hai"
      ]
    },
    "famousExamples": [
      "Barack Obama",
      "Bill Clinton",
      "Prince Charles",
      "Wolfgang Amadeus Mozart"
    ],
    "lifePeriods": {
      "youth": "Thời trẻ thường cảm thấy khác biệt, có thể có trải nghiệm tâm linh từ nhỏ.",
      "adulthood": "Giai đoạn học cách làm chủ khả năng đặc biệt, có thể trải qua khủng hoảng tinh thần trước khi giác ngộ.",
      "maturity": "Về sau trở thành nguồn ánh sáng và hướng dẫn cho người khác tìm kiếm."
    }
  },
  "22": {
    "number": 22,
    "name": "Bậc Thầy Xây Dựng",
    "altNames": [
      "The Master Builder",
      "The Architect of Peace",
      "Số Thầy 22"
    ],
    "keywords": [
      "Xây dựng",
      "Vision",
      "Thực hiện",
      "Di sản",
      "Thực tế tâm linh"
    ],
    "isMasterNumber": true,
    "reducesTo": 4,
    "overview": {
      "short": "Số Chủ 22 là con đường của bậc thầy xây dựng, người biến những giấc mơ lớn thành hiện thực. Bạn có khả năng tạo ra di sản cho nhân loại.",
      "detailed": "Số Chủ 22 là con số mạnh nhất trong Thần Số Học, mang năng lượng kép của số 4 nhưng ở quy mô vũ trụ. Đây là con số của bậc thầy xây dựng - người có tầm nhìn của 11 nhưng thêm khả năng thực hiện của 4.\n\nNgười Đường Đời 22 được sinh ra với tiềm năng tạo ra những công trình vĩ đại - không chỉ tòa nhà vật lý, mà cả những hệ thống, tổ chức, phong trào có thể thay đổi thế giới. Bạn là cầu nối giữa thế giới lý tưởng và thế giới thực.\n\nSố 22 = 11 + 11, kết hợp trực giác tâm linh với khả năng xây dựng thực tế. Bạn không chỉ mơ ước - bạn có khả năng biến những ước mơ đó thành các công trình cụ thể, bền vững.\n\nThử thách của số 22 là áp lực từ tiềm năng khổng lồ. Bạn có thể cảm thấy gánh nặng quá lớn, hoặc sợ hãi trước tầm vóc của những gì mình có thể làm. Nhiều số 22 \"hạ xuống\" sống như số 4 vì không chịu được áp lực.\n\nMục đích cuộc đời bạn là xây dựng những di sản có ý nghĩa cho nhiều thế hệ - có thể là một tổ chức, một hệ thống, một phong trào, hoặc một công trình mang lại lợi ích lâu dài cho nhân loại."
    },
    "strengths": [
      "Khả năng biến vision thành hiện thực",
      "Tầm nhìn xa, quy mô lớn",
      "Thực tế nhưng không mất đi lý tưởng",
      "Năng lực tổ chức và quản lý phi thường",
      "Kiên nhẫn xây dựng từng bước",
      "Có thể tạo ra di sản cho nhân loại"
    ],
    "weaknesses": [
      "Áp lực từ tiềm năng lớn",
      "Có thể trở nên workaholic",
      "Đôi khi quá cứng nhắc",
      "Khó khăn trong việc delegate",
      "Có xu hướng kiểm soát mọi thứ",
      "Dễ bị stress khi mọi thứ không theo kế hoạch"
    ],
    "lifeLesson": {
      "primary": "Học cách sử dụng tiềm năng khổng lồ mà không bị nó đè bẹp",
      "secondary": "Xây dựng với tình yêu thương, không chỉ với tham vọng",
      "spiritual": "Hiểu rằng di sản thực sự là về tác động đến con người, không chỉ công trình"
    },
    "careerFinance": {
      "overview": "Số 22 có tiềm năng thành công lớn nhất trong tất cả các số. Phù hợp với các dự án quy mô lớn.",
      "suitableFields": [
        "Kiến trúc, Xây dựng quy mô lớn",
        "Lãnh đạo tổ chức, NGO quốc tế",
        "Chính trị, Ngoại giao",
        "Khởi nghiệp tạo tác động xã hội",
        "Phát triển bền vững",
        "Công nghệ thay đổi thế giới"
      ],
      "financialPattern": "Tiềm năng tài chính rất lớn khi làm việc đúng với sứ mệnh. Tài lộc đến từ những dự án có ý nghĩa."
    },
    "relationships": {
      "love": "Số 22 cần đối tác hiểu được tầm nhìn và hỗ trợ sứ mệnh của mình. Họ không thể ở với người thiếu tham vọng.",
      "compatibility": {
        "best": [
          4,
          6,
          8,
          33
        ],
        "good": [
          2,
          9,
          11,
          22
        ],
        "challenging": [
          3,
          5,
          7
        ]
      },
      "family": "Có thể xây dựng \"đế chế gia đình\", nhưng cần nhớ dành thời gian cho các thành viên.",
      "friendship": "Có nhiều mối quan hệ công việc, nhưng bạn thân thực sự thì ít vì ít ai theo kịp tầm nhìn."
    },
    "health": {
      "overview": "Số 22 dễ bị các vấn đề do làm việc quá sức và stress từ trách nhiệm lớn.",
      "concerns": [
        "Stress mãn tính",
        "Tim mạch",
        "Xương khớp",
        "Kiệt sức"
      ],
      "advice": "Cần học cách nghỉ ngơi và delegate. Sức khỏe là nền tảng để xây dựng mọi thứ khác."
    },
    "luckyElements": {
      "colors": [
        "Xanh dương",
        "Xám bạc",
        "Trắng",
        "Vàng đất"
      ],
      "gemstones": [
        "Coral",
        "Ruby",
        "Pearl"
      ],
      "numbers": [
        22,
        4,
        13,
        31,
        40
      ],
      "days": [
        "Thứ bảy",
        "Chủ nhật"
      ]
    },
    "famousExamples": [
      "Paul McCartney",
      "Will Smith",
      "Oprah Winfrey",
      "Sir Richard Branson"
    ],
    "lifePeriods": {
      "youth": "Thời trẻ có thể gặp nhiều khó khăn, học được giá trị của sự kiên trì và làm việc chăm chỉ.",
      "adulthood": "Giai đoạn xây dựng những công trình lớn, có thể mất nhiều thời gian nhưng kết quả đáng giá.",
      "maturity": "Về sau nhìn lại những di sản đã tạo ra và hướng dẫn thế hệ sau tiếp tục công trình."
    }
  },
  "33": {
    "number": 33,
    "name": "Bậc Thầy Chữa Lành",
    "altNames": [
      "The Master Healer",
      "The Master Teacher",
      "Số Thầy 33"
    ],
    "keywords": [
      "Chữa lành",
      "Giảng dạy",
      "Tình yêu vô điều kiện",
      "Phục vụ",
      "Nâng đỡ"
    ],
    "isMasterNumber": true,
    "reducesTo": 6,
    "overview": {
      "short": "Số Chủ 33 là con đường của bậc thầy chữa lành, người mang tình yêu vô điều kiện đến thế giới. Bạn được sinh ra để nâng đỡ và chữa lành nhân loại.",
      "detailed": "Số Chủ 33 là con số cao nhất trong ba số chủ, hiếm gặp nhất và mang sứ mệnh cao cả nhất. Đây là con số của tình yêu vô điều kiện, sự chữa lành, và khả năng nâng đỡ ý thức nhân loại.\n\nNgười Đường Đời 33 được sinh ra với trái tim vô cùng rộng lớn, yêu thương tất cả sinh linh không phân biệt. Bạn là hiện thân của năng lượng từ bi - có thể chữa lành bằng sự hiện diện, lời nói, hoặc đơn giản là bằng tình yêu thương của mình.\n\nSố 33 = 11 + 22, kết hợp trực giác tâm linh của 11 với khả năng xây dựng của 22, và thêm vào đó tình yêu thương vô điều kiện của 6 (3+3=6). Đây là sự tổng hợp hoàn hảo nhất.\n\nThử thách của số 33 là sống đúng với tiềm năng cao cả này. Rất ít người thực sự sống được ở mức năng lượng 33 - hầu hết sẽ \"hạ xuống\" sống như 6, vẫn tốt nhưng chưa phải mức cao nhất.\n\nMục đích cuộc đời bạn là trở thành nguồn chữa lành và nâng đỡ cho nhân loại - không nhất thiết phải nổi tiếng, mà bằng cách lan tỏa tình yêu vô điều kiện trong mọi hành động."
    },
    "strengths": [
      "Tình yêu vô điều kiện, chữa lành bằng sự hiện diện",
      "Khả năng giảng dạy, truyền đạt xuất sắc",
      "Từ bi, không phán xét",
      "Nâng đỡ người khác lên cao hơn",
      "Hy sinh cho sự tiến hóa của nhân loại",
      "Kết nối sâu sắc với nguồn năng lượng vũ trụ"
    ],
    "weaknesses": [
      "Gánh nặng trách nhiệm quá lớn",
      "Có thể hy sinh bản thân đến mức kiệt sức",
      "Khó sống trong thế giới thực tế",
      "Dễ bị lợi dụng vì quá tốt",
      "Đôi khi cảm thấy cô đơn vì ít ai hiểu",
      "Áp lực từ kỳ vọng cao"
    ],
    "lifeLesson": {
      "primary": "Học cách yêu thương bản thân để có thể yêu thương người khác hoàn hảo hơn",
      "secondary": "Chữa lành mà không gánh lấy nỗi đau của người khác",
      "spiritual": "Trở thành kênh của tình yêu vũ trụ, không phải nguồn của nó"
    },
    "careerFinance": {
      "overview": "Số 33 phù hợp nhất với các công việc chữa lành, giảng dạy, và phục vụ nhân loại.",
      "suitableFields": [
        "Chữa lành năng lượng, Reiki, Healing",
        "Giảng dạy tâm linh, Life Coach",
        "Y tế, Điều dưỡng, Chăm sóc",
        "Từ thiện, Nhân đạo",
        "Tư vấn, Trị liệu tâm lý",
        "Nghệ thuật chữa lành"
      ],
      "financialPattern": "Tiền bạc không phải mối quan tâm chính. Khi phục vụ đúng sứ mệnh, mọi thứ cần thiết sẽ đến."
    },
    "relationships": {
      "love": "Số 33 yêu thương tất cả mọi người, có thể khó khăn trong tình yêu cá nhân. Họ cần đối tác hiểu được sứ mệnh lớn hơn.",
      "compatibility": {
        "best": [
          6,
          9,
          11,
          22
        ],
        "good": [
          2,
          4,
          33
        ],
        "challenging": [
          1,
          5,
          7,
          8
        ]
      },
      "family": "Là nguồn yêu thương vô điều kiện cho gia đình, nhưng có thể bận rộn với sứ mệnh lớn hơn.",
      "friendship": "Được yêu mến bởi tất cả mọi người, là nguồn an ủi và chữa lành cho bạn bè."
    },
    "health": {
      "overview": "Số 33 dễ bị các vấn đề do gánh lấy năng lượng tiêu cực của người khác.",
      "concerns": [
        "Kiệt sức năng lượng",
        "Tim (quá yêu thương)",
        "Hệ miễn dịch",
        "Trầm cảm (khi không thể giúp được)"
      ],
      "advice": "Cần thực hành bảo vệ năng lượng và tự chăm sóc. Không thể chữa lành ai nếu bản thân kiệt sức."
    },
    "luckyElements": {
      "colors": [
        "Xanh lá",
        "Hồng",
        "Vàng",
        "Tím"
      ],
      "gemstones": [
        "Emerald",
        "Rose Quartz",
        "Clear Quartz"
      ],
      "numbers": [
        33,
        6,
        15,
        24,
        42
      ],
      "days": [
        "Thứ sáu"
      ]
    },
    "famousExamples": [
      "Dalai Lama",
      "Mahatma Gandhi (cũng là 9)",
      "Albert Einstein",
      "Thomas Edison"
    ],
    "lifePeriods": {
      "youth": "Thời trẻ cảm nhận được sứ mệnh lớn, có thể gặp khó khăn hòa nhập với bạn bè cùng tuổi.",
      "adulthood": "Giai đoạn tìm kiếm và thực hiện sứ mệnh chữa lành, có thể trải qua nhiều thử thách để được tôi luyện.",
      "maturity": "Về sau trở thành nguồn ánh sáng và tình yêu cho nhân loại, được nhớ đến vì những đóng góp chữa lành."
    }
  }
},
    expressionMeanings: {
  "1": {
    "number": 1,
    "name": "Người Tiên Phong",
    "altNames": [
      "The Pioneer Expression",
      "Số Biểu Đạt 1"
    ],
    "keywords": [
      "Độc lập",
      "Sáng tạo",
      "Lãnh đạo",
      "Đột phá",
      "Tự tin"
    ],
    "overview": {
      "short": "Số Biểu Đạt 1 cho thấy bạn có tài năng bẩm sinh trong việc lãnh đạo, khởi xướng và đưa ra các ý tưởng mới mẻ.",
      "detailed": "Số Biểu Đạt 1 tiết lộ rằng bạn được thiên phú những tài năng độc đáo liên quan đến sự sáng tạo và lãnh đạo. Tên của bạn mang năng lượng của người tiên phong - người đầu tiên bước vào những vùng đất mới.\n\nTài năng tự nhiên của bạn nằm ở khả năng nghĩ ra những ý tưởng mới và dẫn dắt người khác theo tầm nhìn của mình. Bạn không phù hợp với vai trò theo sau - bạn được sinh ra để dẫn đầu, để mở đường cho người khác.\n\nVới Số Biểu Đạt 1, bạn có khả năng tự tin, quyết đoán và độc lập. Bạn làm việc tốt nhất khi được tự do theo đuổi ý tưởng của riêng mình mà không bị ràng buộc bởi quy tắc cứng nhắc.\n\nTuy nhiên, bạn cần học cách hợp tác và lắng nghe người khác. Sự tự tin quá mức có thể trở thành kiêu ngạo, và sự độc lập có thể dẫn đến cô đơn nếu không được cân bằng."
    },
    "naturalTalents": [
      "Khả năng lãnh đạo và đưa ra quyết định",
      "Sáng tạo ý tưởng mới, đột phá",
      "Tự tin và quyết đoán",
      "Khởi xướng dự án và phong trào",
      "Độc lập trong tư duy và hành động",
      "Dẫn dắt người khác theo tầm nhìn"
    ],
    "bestCareers": [
      "CEO, Giám đốc, Quản lý cấp cao",
      "Khởi nghiệp, Startup Founder",
      "Nhà phát minh, Nghiên cứu đột phá",
      "Freelancer, Tư vấn độc lập",
      "Chính trị gia, Nhà hoạt động",
      "Nghệ sĩ sáng tạo độc lập"
    ],
    "developmentAreas": [
      "Học cách hợp tác và làm việc nhóm",
      "Phát triển sự kiên nhẫn với người khác",
      "Cân bằng giữa tự tin và khiêm tốn",
      "Lắng nghe ý kiến đóng góp"
    ]
  },
  "2": {
    "number": 2,
    "name": "Người Hòa Giải",
    "altNames": [
      "The Diplomat Expression",
      "Số Biểu Đạt 2"
    ],
    "keywords": [
      "Hợp tác",
      "Nhạy cảm",
      "Ngoại giao",
      "Cân bằng",
      "Hỗ trợ"
    ],
    "overview": {
      "short": "Số Biểu Đạt 2 cho thấy bạn có tài năng bẩm sinh trong việc kết nối, hòa giải và tạo sự hài hòa giữa mọi người.",
      "detailed": "Số Biểu Đạt 2 tiết lộ rằng bạn được thiên phú khả năng thấu hiểu và kết nối con người. Tên của bạn mang năng lượng của người hòa giải - người tạo cầu nối giữa các bên khác biệt.\n\nTài năng tự nhiên của bạn nằm ở sự nhạy cảm và khả năng đọc được cảm xúc của người khác. Bạn có thể làm dịu những tình huống căng thẳng và giúp mọi người tìm được tiếng nói chung.\n\nVới Số Biểu Đạt 2, bạn tỏa sáng trong vai trò hỗ trợ, tư vấn, và làm việc nhóm. Bạn không cần phải đứng ở vị trí lãnh đạo để có ảnh hưởng - sức mạnh của bạn nằm ở khả năng gắn kết.\n\nTuy nhiên, bạn cần học cách khẳng định bản thân và không đánh mất mình trong việc làm hài lòng người khác. Sự nhạy cảm là điểm mạnh nhưng cũng cần được bảo vệ."
    },
    "naturalTalents": [
      "Khả năng thấu cảm và đọc cảm xúc",
      "Hòa giải xung đột, tạo hòa bình",
      "Làm việc nhóm và hợp tác",
      "Ngoại giao và giao tiếp tinh tế",
      "Hỗ trợ và nâng đỡ người khác",
      "Tạo không gian an toàn cho mọi người"
    ],
    "bestCareers": [
      "Tư vấn, Trị liệu tâm lý",
      "Ngoại giao, Quan hệ quốc tế",
      "Nhân sự, Hòa giải lao động",
      "Y tá, Chăm sóc sức khỏe",
      "Thư ký, Trợ lý điều hành",
      "Nghệ sĩ, Nhạc sĩ"
    ],
    "developmentAreas": [
      "Học cách khẳng định bản thân",
      "Đặt ranh giới lành mạnh",
      "Phát triển sự tự tin và độc lập",
      "Không đánh mất mình vì người khác"
    ]
  },
  "3": {
    "number": 3,
    "name": "Người Biểu Đạt",
    "altNames": [
      "The Communicator Expression",
      "Số Biểu Đạt 3"
    ],
    "keywords": [
      "Sáng tạo",
      "Giao tiếp",
      "Nghệ thuật",
      "Vui vẻ",
      "Biểu đạt"
    ],
    "overview": {
      "short": "Số Biểu Đạt 3 cho thấy bạn có tài năng bẩm sinh trong việc giao tiếp, sáng tạo và mang lại niềm vui cho người khác.",
      "detailed": "Số Biểu Đạt 3 tiết lộ rằng bạn được thiên phú khả năng biểu đạt và sáng tạo phi thường. Tên của bạn mang năng lượng của nghệ sĩ - người có thể biến ý tưởng thành tác phẩm.\n\nTài năng tự nhiên của bạn nằm ở khả năng giao tiếp - qua lời nói, viết lách, nghệ thuật, hoặc bất kỳ hình thức nào. Bạn có sức hút tự nhiên và khả năng làm cho mọi thứ trở nên thú vị.\n\nVới Số Biểu Đạt 3, bạn tỏa sáng khi được thể hiện bản thân. Sân khấu, studio, hoặc bất kỳ nơi nào cho phép bạn sáng tạo đều là nơi bạn thuộc về.\n\nTuy nhiên, bạn cần học cách tập trung và kiên trì. Với quá nhiều tài năng và ý tưởng, bạn có thể phân tán năng lượng và không hoàn thành những gì bắt đầu."
    },
    "naturalTalents": [
      "Giao tiếp xuất sắc, có sức thu hút",
      "Sáng tạo nghệ thuật đa dạng",
      "Kể chuyện và truyền đạt",
      "Mang lại niềm vui và tiếng cười",
      "Tưởng tượng phong phú",
      "Kết nối con người qua nghệ thuật"
    ],
    "bestCareers": [
      "Nghệ sĩ, Nhạc sĩ, Diễn viên",
      "Nhà văn, Nhà báo, Blogger",
      "MC, Diễn giả, Podcaster",
      "Marketing, Quảng cáo",
      "Thiết kế, Nhiếp ảnh",
      "Giáo viên nghệ thuật"
    ],
    "developmentAreas": [
      "Phát triển sự kỷ luật và tập trung",
      "Hoàn thành những gì đã bắt đầu",
      "Cân bằng giữa niềm vui và trách nhiệm",
      "Không phân tán năng lượng"
    ]
  },
  "4": {
    "number": 4,
    "name": "Người Xây Dựng",
    "altNames": [
      "The Builder Expression",
      "Số Biểu Đạt 4"
    ],
    "keywords": [
      "Ổn định",
      "Thực tế",
      "Kỷ luật",
      "Tổ chức",
      "Xây dựng"
    ],
    "overview": {
      "short": "Số Biểu Đạt 4 cho thấy bạn có tài năng bẩm sinh trong việc xây dựng, tổ chức và tạo ra những nền tảng vững chắc.",
      "detailed": "Số Biểu Đạt 4 tiết lộ rằng bạn được thiên phú khả năng xây dựng và tổ chức xuất sắc. Tên của bạn mang năng lượng của kiến trúc sư - người biến bản vẽ thành công trình thực tế.\n\nTài năng tự nhiên của bạn nằm ở sự chính xác, kỷ luật và khả năng làm việc có hệ thống. Bạn là người biến những ý tưởng thành hiện thực qua công việc cẩn thận và kiên nhẫn.\n\nVới Số Biểu Đạt 4, bạn tỏa sáng trong các vai trò đòi hỏi sự đáng tin cậy và chi tiết. Người ta có thể dựa vào bạn để hoàn thành công việc đúng hạn và đúng cách.\n\nTuy nhiên, bạn cần học cách linh hoạt hơn và không quá cứng nhắc. Đôi khi sự hoàn hảo có thể trở thành kẻ thù của sự tiến bộ."
    },
    "naturalTalents": [
      "Tổ chức và quản lý hệ thống",
      "Xây dựng nền tảng vững chắc",
      "Làm việc kỷ luật và có phương pháp",
      "Chú ý đến chi tiết",
      "Đáng tin cậy và giữ lời",
      "Biến ý tưởng thành hiện thực"
    ],
    "bestCareers": [
      "Kỹ sư, Kiến trúc sư",
      "Kế toán, Tài chính",
      "Quản lý dự án, Vận hành",
      "Công chức, Hành chính",
      "Xây dựng, Bất động sản",
      "Kiểm toán, Chất lượng"
    ],
    "developmentAreas": [
      "Phát triển sự linh hoạt",
      "Học cách chấp nhận thay đổi",
      "Không quá chi tiết đến mức bỏ qua tổng thể",
      "Cân bằng công việc và cuộc sống"
    ]
  },
  "5": {
    "number": 5,
    "name": "Người Tự Do",
    "altNames": [
      "The Freedom Expression",
      "Số Biểu Đạt 5"
    ],
    "keywords": [
      "Tự do",
      "Thay đổi",
      "Phiêu lưu",
      "Linh hoạt",
      "Đa tài"
    ],
    "overview": {
      "short": "Số Biểu Đạt 5 cho thấy bạn có tài năng bẩm sinh trong việc thích nghi, giao tiếp và trải nghiệm sự đa dạng của cuộc sống.",
      "detailed": "Số Biểu Đạt 5 tiết lộ rằng bạn được thiên phú khả năng thích ứng và linh hoạt phi thường. Tên của bạn mang năng lượng của nhà thám hiểm - người luôn tìm kiếm những trải nghiệm mới.\n\nTài năng tự nhiên của bạn nằm ở khả năng nhanh chóng làm quen với mọi hoàn cảnh và giao tiếp với mọi loại người. Bạn có sự tò mò vô tận và khao khát khám phá.\n\nVới Số Biểu Đạt 5, bạn tỏa sáng trong môi trường năng động, đa dạng và không bị ràng buộc. Công việc văn phòng nhàm chán sẽ bóp nghẹt tài năng của bạn.\n\nTuy nhiên, bạn cần học cách cam kết và tập trung. Tự do không có nghĩa là thiếu trách nhiệm, và sự đa dạng không nên dẫn đến sự hời hợt."
    },
    "naturalTalents": [
      "Thích ứng nhanh với mọi hoàn cảnh",
      "Giao tiếp đa dạng, hấp dẫn",
      "Đa tài, có nhiều kỹ năng",
      "Khám phá và trải nghiệm",
      "Linh hoạt trong tư duy",
      "Truyền cảm hứng về sự tự do"
    ],
    "bestCareers": [
      "Du lịch, Hướng dẫn viên",
      "Sales, Marketing quốc tế",
      "Nhà báo, Phóng viên",
      "Freelancer, Tư vấn",
      "Sự kiện, Giải trí",
      "Đào tạo, Huấn luyện"
    ],
    "developmentAreas": [
      "Phát triển khả năng cam kết",
      "Học cách hoàn thành những gì bắt đầu",
      "Tìm tự do trong trách nhiệm",
      "Không chạy trốn khi gặp khó khăn"
    ]
  },
  "6": {
    "number": 6,
    "name": "Người Chăm Sóc",
    "altNames": [
      "The Nurturer Expression",
      "Số Biểu Đạt 6"
    ],
    "keywords": [
      "Trách nhiệm",
      "Yêu thương",
      "Gia đình",
      "Phục vụ",
      "Hài hòa"
    ],
    "overview": {
      "short": "Số Biểu Đạt 6 cho thấy bạn có tài năng bẩm sinh trong việc chăm sóc, nuôi dưỡng và tạo ra sự hài hòa cho người khác.",
      "detailed": "Số Biểu Đạt 6 tiết lộ rằng bạn được thiên phú khả năng yêu thương và chăm sóc vô điều kiện. Tên của bạn mang năng lượng của người mẹ vũ trụ - người nuôi dưỡng và bảo vệ.\n\nTài năng tự nhiên của bạn nằm ở khả năng tạo ra không gian an toàn, đẹp đẽ và hài hòa. Bạn có thể cảm nhận nhu cầu của người khác và đáp ứng một cách tự nhiên.\n\nVới Số Biểu Đạt 6, bạn tỏa sáng trong các vai trò chăm sóc, giáo dục và phục vụ. Gia đình và cộng đồng là nơi bạn thể hiện tài năng của mình.\n\nTuy nhiên, bạn cần học cách chăm sóc bản thân và không hy sinh quá mức. Sự yêu thương cần được cân bằng với sự tự trọng."
    },
    "naturalTalents": [
      "Chăm sóc và nuôi dưỡng người khác",
      "Tạo môi trường hài hòa, đẹp đẽ",
      "Trách nhiệm với gia đình và cộng đồng",
      "Khả năng thẩm mỹ tự nhiên",
      "Giảng dạy và hướng dẫn",
      "Chữa lành bằng tình yêu thương"
    ],
    "bestCareers": [
      "Y tế, Điều dưỡng",
      "Giáo dục, Nuôi dạy trẻ",
      "Tư vấn gia đình, Trị liệu",
      "Thiết kế nội thất",
      "Nhà hàng, Hospitality",
      "Công tác xã hội, Từ thiện"
    ],
    "developmentAreas": [
      "Học cách chăm sóc bản thân",
      "Đặt ranh giới lành mạnh",
      "Không kiểm soát quá mức",
      "Cho phép người khác tự lập"
    ]
  },
  "7": {
    "number": 7,
    "name": "Người Tìm Kiếm",
    "altNames": [
      "The Seeker Expression",
      "Số Biểu Đạt 7"
    ],
    "keywords": [
      "Tri thức",
      "Phân tích",
      "Tâm linh",
      "Nội tâm",
      "Nghiên cứu"
    ],
    "overview": {
      "short": "Số Biểu Đạt 7 cho thấy bạn có tài năng bẩm sinh trong việc nghiên cứu, phân tích và tìm kiếm chân lý sâu sắc.",
      "detailed": "Số Biểu Đạt 7 tiết lộ rằng bạn được thiên phú trí tuệ sâu sắc và khả năng nhìn thấy những gì người khác bỏ qua. Tên của bạn mang năng lượng của triết gia - người tìm kiếm ý nghĩa của cuộc sống.\n\nTài năng tự nhiên của bạn nằm ở khả năng phân tích, nghiên cứu và đi sâu vào bản chất của mọi vấn đề. Bạn không hài lòng với câu trả lời bề mặt.\n\nVới Số Biểu Đạt 7, bạn tỏa sáng trong các lĩnh vực đòi hỏi tư duy sâu, nghiên cứu kỹ lưỡng, hoặc kết nối tâm linh. Sự cô độc là bạn của bạn.\n\nTuy nhiên, bạn cần học cách kết nối với người khác và không quá cô lập. Trí tuệ cần được chia sẻ để có giá trị."
    },
    "naturalTalents": [
      "Phân tích sâu sắc, logic",
      "Nghiên cứu và tìm hiểu",
      "Trực giác và kết nối tâm linh",
      "Tập trung và kiên nhẫn",
      "Nhìn thấy những gì ẩn giấu",
      "Trí tuệ và hiểu biết sâu"
    ],
    "bestCareers": [
      "Nghiên cứu khoa học, Học thuật",
      "Triết học, Tâm linh",
      "Tâm lý học, Phân tích",
      "Công nghệ thông tin",
      "Y học, Dược học",
      "Điều tra, Pháp y"
    ],
    "developmentAreas": [
      "Học cách kết nối xã hội",
      "Chia sẻ tri thức với người khác",
      "Không quá hoài nghi",
      "Cân bằng giữa lý trí và cảm xúc"
    ]
  },
  "8": {
    "number": 8,
    "name": "Người Quyền Lực",
    "altNames": [
      "The Powerhouse Expression",
      "Số Biểu Đạt 8"
    ],
    "keywords": [
      "Quyền lực",
      "Thành công",
      "Tài chính",
      "Lãnh đạo",
      "Thành tựu"
    ],
    "overview": {
      "short": "Số Biểu Đạt 8 cho thấy bạn có tài năng bẩm sinh trong việc quản lý, lãnh đạo và đạt được thành công vật chất.",
      "detailed": "Số Biểu Đạt 8 tiết lộ rằng bạn được thiên phú khả năng kinh doanh và quản lý xuất sắc. Tên của bạn mang năng lượng của nhà lãnh đạo doanh nghiệp - người có thể xây dựng đế chế.\n\nTài năng tự nhiên của bạn nằm ở khả năng nhìn thấy cơ hội kinh doanh, quản lý tài chính và dẫn dắt tổ chức đến thành công. Bạn có tham vọng lớn và ý chí mạnh mẽ.\n\nVới Số Biểu Đạt 8, bạn tỏa sáng trong các vị trí quyền lực và kinh doanh. Bạn được sinh ra để đạt được thành tựu lớn trong thế giới vật chất.\n\nTuy nhiên, bạn cần học cách cân bằng giữa sự nghiệp và cuộc sống cá nhân. Quyền lực và tiền bạc là công cụ, không phải mục đích."
    },
    "naturalTalents": [
      "Quản lý tài chính và kinh doanh",
      "Lãnh đạo và tổ chức",
      "Nhìn xa trông rộng, chiến lược",
      "Quyết đoán và bền bỉ",
      "Đàm phán và thương lượng",
      "Xây dựng sự giàu có"
    ],
    "bestCareers": [
      "CEO, Giám đốc điều hành",
      "Đầu tư, Ngân hàng",
      "Bất động sản, Xây dựng",
      "Luật doanh nghiệp",
      "Chính trị, Lãnh đạo tổ chức",
      "Khởi nghiệp quy mô lớn"
    ],
    "developmentAreas": [
      "Cân bằng công việc và gia đình",
      "Sử dụng quyền lực một cách đạo đức",
      "Phát triển lòng trắc ẩn",
      "Không đặt tiền bạc lên trên mọi thứ"
    ]
  },
  "9": {
    "number": 9,
    "name": "Người Nhân Đạo",
    "altNames": [
      "The Humanitarian Expression",
      "Số Biểu Đạt 9"
    ],
    "keywords": [
      "Nhân đạo",
      "Bao dung",
      "Phục vụ",
      "Lý tưởng",
      "Sáng tạo"
    ],
    "overview": {
      "short": "Số Biểu Đạt 9 cho thấy bạn có tài năng bẩm sinh trong việc phục vụ nhân loại, sáng tạo và lan tỏa tình yêu thương.",
      "detailed": "Số Biểu Đạt 9 tiết lộ rằng bạn được thiên phú trái tim rộng lớn và tầm nhìn toàn cầu. Tên của bạn mang năng lượng của người nhân đạo - người quan tâm đến cả nhân loại.\n\nTài năng tự nhiên của bạn nằm ở khả năng thấu hiểu và yêu thương tất cả mọi người bất kể khác biệt. Bạn có thể truyền cảm hứng và nâng đỡ người khác qua nghệ thuật hoặc hành động.\n\nVới Số Biểu Đạt 9, bạn tỏa sáng trong các vai trò phục vụ, nghệ thuật hoặc hoạt động xã hội. Bạn được sinh ra để làm cho thế giới tốt đẹp hơn.\n\nTuy nhiên, bạn cần học cách chấp nhận sự bất toàn của thế giới và không trở nên cay đắng khi lý tưởng không được thực hiện."
    },
    "naturalTalents": [
      "Yêu thương và bao dung nhân loại",
      "Sáng tạo nghệ thuật đa dạng",
      "Truyền cảm hứng và nâng đỡ",
      "Tầm nhìn toàn cầu, lý tưởng cao",
      "Cho đi và phục vụ",
      "Kết nối mọi người lại với nhau"
    ],
    "bestCareers": [
      "Từ thiện, NGO",
      "Nghệ thuật, Âm nhạc, Diễn viên",
      "Y tế, Chăm sóc cộng đồng",
      "Giáo dục, Đào tạo",
      "Luật nhân quyền",
      "Tôn giáo, Tâm linh"
    ],
    "developmentAreas": [
      "Chấp nhận sự bất toàn của thế giới",
      "Không hy sinh bản thân quá mức",
      "Cân bằng giữa lý tưởng và thực tế",
      "Học cách nhận cũng như cho"
    ]
  },
  "11": {
    "number": 11,
    "name": "Bậc Thầy Trực Giác",
    "altNames": [
      "The Master Intuitive Expression",
      "Số Biểu Đạt 11"
    ],
    "keywords": [
      "Trực giác",
      "Tâm linh",
      "Cảm hứng",
      "Nhạy cảm",
      "Khai sáng"
    ],
    "isMasterNumber": true,
    "overview": {
      "short": "Số Biểu Đạt 11 cho thấy bạn có tài năng tâm linh và khả năng truyền cảm hứng phi thường.",
      "detailed": "Số Biểu Đạt 11 là con số bậc thầy, tiết lộ rằng bạn được thiên phú khả năng trực giác và kết nối tâm linh vượt trội. Tên của bạn mang năng lượng của người truyền thông điệp từ cõi cao.\n\nTài năng tự nhiên của bạn nằm ở khả năng \"biết\" những điều mà không cần logic, truyền cảm hứng cho người khác, và làm cầu nối giữa thế giới vật chất và tâm linh.\n\nVới Số Biểu Đạt 11, bạn có tiềm năng trở thành nguồn ánh sáng cho người khác. Tuy nhiên, năng lượng này cũng mang theo áp lực và sự nhạy cảm cao.\n\nBạn cần học cách grounding và bảo vệ năng lượng của mình. Nếu áp lực quá lớn, bạn có thể sống ở mức năng lượng số 2."
    },
    "naturalTalents": [
      "Trực giác phi thường",
      "Truyền cảm hứng và khai sáng",
      "Kết nối tâm linh mạnh mẽ",
      "Sáng tạo ở mức thiên tài",
      "Nhạy cảm với năng lượng",
      "Làm cầu nối giữa các thế giới"
    ],
    "bestCareers": [
      "Tâm linh, Healing",
      "Nghệ thuật, Âm nhạc sáng tạo",
      "Tư vấn, Huấn luyện",
      "Diễn giả truyền cảm hứng",
      "Nhà văn, Nhà thơ",
      "Metaphysics, Chiêm tinh"
    ],
    "developmentAreas": [
      "Grounding và bảo vệ năng lượng",
      "Quản lý sự nhạy cảm",
      "Cân bằng tâm linh và thực tế",
      "Không bị overwhelm bởi áp lực"
    ]
  },
  "22": {
    "number": 22,
    "name": "Bậc Thầy Xây Dựng",
    "altNames": [
      "The Master Builder Expression",
      "Số Biểu Đạt 22"
    ],
    "keywords": [
      "Xây dựng",
      "Vision",
      "Thực hiện",
      "Di sản",
      "Quy mô lớn"
    ],
    "isMasterNumber": true,
    "overview": {
      "short": "Số Biểu Đạt 22 cho thấy bạn có tài năng xây dựng những công trình vĩ đại để lại cho nhân loại.",
      "detailed": "Số Biểu Đạt 22 là con số bậc thầy mạnh nhất, tiết lộ rằng bạn được thiên phú khả năng biến tầm nhìn vĩ đại thành hiện thực. Tên của bạn mang năng lượng của kiến trúc sư vũ trụ.\n\nTài năng tự nhiên của bạn nằm ở khả năng nhìn xa, lập kế hoạch lớn và xây dựng những công trình có ý nghĩa lâu dài. Bạn có cả trực giác của 11 và khả năng thực thi của 4.\n\nVới Số Biểu Đạt 22, bạn có tiềm năng tạo ra di sản cho nhiều thế hệ. Tuy nhiên, áp lực từ tiềm năng này cũng rất lớn.\n\nNếu không thể sống ở mức năng lượng 22, bạn có thể hoạt động ở mức số 4 - vẫn xây dựng tốt nhưng ở quy mô nhỏ hơn."
    },
    "naturalTalents": [
      "Xây dựng quy mô lớn",
      "Biến tầm nhìn thành hiện thực",
      "Quản lý và tổ chức phi thường",
      "Tạo ra di sản lâu dài",
      "Kết hợp lý tưởng và thực tế",
      "Lãnh đạo các dự án lớn"
    ],
    "bestCareers": [
      "Kiến trúc, Xây dựng quy mô lớn",
      "Lãnh đạo tổ chức quốc tế",
      "Chính trị, Ngoại giao",
      "Khởi nghiệp tạo tác động xã hội",
      "Phát triển bền vững",
      "Công nghệ thay đổi thế giới"
    ],
    "developmentAreas": [
      "Quản lý áp lực từ tiềm năng lớn",
      "Không làm việc quá sức",
      "Học cách ủy thác",
      "Cân bằng tham vọng và sức khỏe"
    ]
  },
  "33": {
    "number": 33,
    "name": "Bậc Thầy Chữa Lành",
    "altNames": [
      "The Master Healer Expression",
      "Số Biểu Đạt 33"
    ],
    "keywords": [
      "Chữa lành",
      "Yêu thương",
      "Giảng dạy",
      "Phục vụ",
      "Nâng đỡ"
    ],
    "isMasterNumber": true,
    "overview": {
      "short": "Số Biểu Đạt 33 cho thấy bạn có tài năng chữa lành và mang tình yêu vô điều kiện đến thế giới.",
      "detailed": "Số Biểu Đạt 33 là con số bậc thầy cao nhất và hiếm nhất, tiết lộ rằng bạn được thiên phú khả năng yêu thương và chữa lành phi thường. Tên của bạn mang năng lượng của bậc thầy tâm linh.\n\nTài năng tự nhiên của bạn nằm ở khả năng yêu thương vô điều kiện, chữa lành bằng sự hiện diện, và nâng cao ý thức của nhân loại. Bạn là hiện thân của tình yêu vũ trụ.\n\nVới Số Biểu Đạt 33, bạn có tiềm năng trở thành nguồn ánh sáng và chữa lành cho nhiều người. Tuy nhiên, rất ít người sống được ở mức năng lượng này.\n\nNếu áp lực quá lớn, bạn có thể sống ở mức năng lượng số 6 - vẫn yêu thương và phục vụ nhưng ở phạm vi gia đình và cộng đồng gần."
    },
    "naturalTalents": [
      "Yêu thương vô điều kiện",
      "Chữa lành bằng sự hiện diện",
      "Giảng dạy và nâng đỡ",
      "Hy sinh cho sự tiến hóa của nhân loại",
      "Kết nối với nguồn năng lượng vũ trụ",
      "Truyền cảm hứng qua tình yêu"
    ],
    "bestCareers": [
      "Chữa lành năng lượng, Healing",
      "Giảng dạy tâm linh",
      "Y tế, Điều dưỡng",
      "Từ thiện, Nhân đạo",
      "Tư vấn, Trị liệu",
      "Nghệ thuật chữa lành"
    ],
    "developmentAreas": [
      "Yêu thương bản thân trước",
      "Không gánh lấy nỗi đau của người khác",
      "Bảo vệ năng lượng",
      "Chấp nhận giới hạn của con người"
    ]
  }
},
    soulUrgeMeanings: {
  "1": {
    "number": 1,
    "name": "Khao Khát Độc Lập",
    "altNames": [
      "Soul Urge 1",
      "Heart's Desire 1",
      "Số Linh Hồn 1"
    ],
    "keywords": [
      "Độc lập",
      "Dẫn đầu",
      "Thành tựu cá nhân",
      "Tự do",
      "Sáng tạo"
    ],
    "overview": {
      "short": "Số Linh Hồn 1 tiết lộ rằng trong thâm tâm, bạn khao khát sự độc lập, dẫn đầu và thành tựu cá nhân.",
      "detailed": "Số Linh Hồn 1 cho thấy điều mà trái tim bạn thực sự mong muốn là sự độc lập và quyền tự quyết. Đây là động lực sâu thẳm bên trong bạn, có thể không phải lúc nào cũng thể hiện ra bên ngoài.\n\nBạn khao khát được là chính mình, đi theo con đường riêng, và đạt được thành tựu bằng nỗ lực của bản thân. Sự phụ thuộc vào người khác khiến linh hồn bạn cảm thấy bị giam cầm.\n\nTrong những khoảnh khắc tĩnh lặng, bạn mơ ước được dẫn đầu, được sáng tạo điều gì đó độc đáo của riêng mình. Dù bề ngoài có thể khác, nhưng bên trong bạn là một người tiên phong.\n\nĐể linh hồn được thỏa mãn, bạn cần cho phép bản thân theo đuổi những mục tiêu cá nhân, dù đôi khi điều đó có nghĩa là đi một mình."
    },
    "deepestDesires": [
      "Được độc lập và tự do trong quyết định",
      "Đạt được thành tựu bằng chính sức mình",
      "Dẫn đầu và tiên phong trong lĩnh vực của mình",
      "Được công nhận vì sự độc đáo cá nhân",
      "Tạo ra điều gì đó mới mẻ và nguyên bản",
      "Không bị kiểm soát hay phụ thuộc vào ai"
    ],
    "innerMotivation": "Động lực sâu thẳm của bạn là khẳng định bản sắc cá nhân và chứng minh khả năng độc lập.",
    "secretFears": [
      "Sợ bị kiểm soát hoặc mất tự do",
      "Sợ phải phụ thuộc vào người khác",
      "Lo lắng về việc bị hòa tan trong đám đông",
      "Sợ thất bại khi theo đuổi mục tiêu riêng"
    ],
    "fulfillmentPath": {
      "needs": "Bạn cần không gian để theo đuổi mục tiêu cá nhân và sự công nhận cho những thành tựu độc lập.",
      "advice": "Hãy dành thời gian cho những dự án cá nhân và cho phép bản thân dẫn đầu trong một số lĩnh vực của cuộc sống.",
      "warning": "Cẩn thận không trở nên quá ích kỷ hoặc cô độc trong hành trình theo đuổi độc lập."
    },
    "inRelationships": "Trong các mối quan hệ, bạn cần đối tác tôn trọng không gian cá nhân và hỗ trợ mục tiêu độc lập của bạn. Bạn có thể gặp khó khăn khi phải thỏa hiệp quá nhiều."
  },
  "2": {
    "number": 2,
    "name": "Khao Khát Hòa Hợp",
    "altNames": [
      "Soul Urge 2",
      "Heart's Desire 2",
      "Số Linh Hồn 2"
    ],
    "keywords": [
      "Hòa hợp",
      "Tình yêu",
      "Kết nối",
      "Hợp tác",
      "An bình"
    ],
    "overview": {
      "short": "Số Linh Hồn 2 tiết lộ rằng trong thâm tâm, bạn khao khát sự hòa hợp, tình yêu và kết nối sâu sắc với người khác.",
      "detailed": "Số Linh Hồn 2 cho thấy điều mà trái tim bạn thực sự mong muốn là sự hài hòa trong các mối quan hệ và cảm giác thuộc về. Bạn khao khát được yêu thương và yêu thương lại.\n\nLinh hồn bạn tìm kiếm sự an bình, không chỉ bên ngoài mà còn bên trong. Xung đột và tranh cãi khiến bạn đau khổ sâu sắc, dù bề ngoài có thể không thể hiện.\n\nTrong thâm tâm, bạn mong muốn có những mối quan hệ thân mật, được hiểu và được chấp nhận hoàn toàn. Bạn sẵn sàng cho đi rất nhiều để duy trì sự hòa thuận.\n\nĐể linh hồn được thỏa mãn, bạn cần xây dựng những mối quan hệ có ý nghĩa và tạo ra môi trường hòa bình cho bản thân."
    },
    "deepestDesires": [
      "Được yêu thương vô điều kiện",
      "Sống trong môi trường hòa bình, không xung đột",
      "Có những mối quan hệ thân mật và sâu sắc",
      "Được hiểu và chấp nhận hoàn toàn",
      "Hỗ trợ và được hỗ trợ bởi người khác",
      "Cảm giác thuộc về và kết nối"
    ],
    "innerMotivation": "Động lực sâu thẳm của bạn là tạo ra sự hài hòa và cảm nhận tình yêu thương trong cuộc sống.",
    "secretFears": [
      "Sợ bị từ chối hoặc bỏ rơi",
      "Sợ xung đột và đối đầu",
      "Lo lắng về việc ở một mình",
      "Sợ mất đi những mối quan hệ quan trọng"
    ],
    "fulfillmentPath": {
      "needs": "Bạn cần môi trường hòa bình và các mối quan hệ yêu thương để linh hồn được nuôi dưỡng.",
      "advice": "Hãy đầu tư vào các mối quan hệ quan trọng và tạo không gian an bình cho bản thân.",
      "warning": "Cẩn thận không hy sinh quá nhiều bản thân để làm hài lòng người khác."
    },
    "inRelationships": "Trong các mối quan hệ, bạn là người cho đi và luôn tìm cách làm đối tác hạnh phúc. Bạn cần học cách nhận cũng như cho."
  },
  "3": {
    "number": 3,
    "name": "Khao Khát Biểu Đạt",
    "altNames": [
      "Soul Urge 3",
      "Heart's Desire 3",
      "Số Linh Hồn 3"
    ],
    "keywords": [
      "Biểu đạt",
      "Sáng tạo",
      "Niềm vui",
      "Giao tiếp",
      "Nghệ thuật"
    ],
    "overview": {
      "short": "Số Linh Hồn 3 tiết lộ rằng trong thâm tâm, bạn khao khát được thể hiện bản thân, sáng tạo và mang lại niềm vui.",
      "detailed": "Số Linh Hồn 3 cho thấy điều mà trái tim bạn thực sự mong muốn là được biểu đạt - qua lời nói, nghệ thuật, hoặc bất kỳ hình thức sáng tạo nào. Linh hồn bạn cần được thể hiện.\n\nBạn khao khát mang lại niềm vui cho người khác và cho chính mình. Sự buồn chán và đơn điệu khiến linh hồn bạn héo mòn. Bạn cần sự đa dạng, màu sắc và tiếng cười.\n\nTrong thâm tâm, bạn là một nghệ sĩ - dù có theo đuổi nghệ thuật hay không. Sự sáng tạo và tự do biểu đạt là những gì linh hồn bạn khao khát nhất.\n\nĐể linh hồn được thỏa mãn, bạn cần cho phép bản thân sáng tạo, vui đùa và thể hiện những gì bên trong."
    },
    "deepestDesires": [
      "Được tự do biểu đạt và sáng tạo",
      "Mang lại niềm vui và tiếng cười cho người khác",
      "Sống trong môi trường đầy màu sắc và sáng tạo",
      "Được công nhận vì tài năng nghệ thuật",
      "Trải nghiệm sự đa dạng và thú vị",
      "Kết nối với người khác qua nghệ thuật"
    ],
    "innerMotivation": "Động lực sâu thẳm của bạn là thể hiện thế giới nội tâm phong phú và chia sẻ niềm vui với mọi người.",
    "secretFears": [
      "Sợ bị kìm nén, không được biểu đạt",
      "Sợ cuộc sống nhàm chán, đơn điệu",
      "Lo lắng về việc tài năng không được công nhận",
      "Sợ sự cô đơn và im lặng"
    ],
    "fulfillmentPath": {
      "needs": "Bạn cần các đầu ra sáng tạo và môi trường cho phép bạn tự do biểu đạt.",
      "advice": "Hãy dành thời gian cho các hoạt động sáng tạo và đừng kìm nén nhu cầu vui chơi của mình.",
      "warning": "Cẩn thận không quá phân tán hoặc tránh né những vấn đề nghiêm túc bằng sự vui đùa."
    },
    "inRelationships": "Trong các mối quan hệ, bạn mang lại sự vui vẻ và sáng tạo. Bạn cần đối tác có thể theo kịp năng lượng và tôn trọng nhu cầu biểu đạt của bạn."
  },
  "4": {
    "number": 4,
    "name": "Khao Khát Ổn Định",
    "altNames": [
      "Soul Urge 4",
      "Heart's Desire 4",
      "Số Linh Hồn 4"
    ],
    "keywords": [
      "Ổn định",
      "An toàn",
      "Trật tự",
      "Xây dựng",
      "Nền tảng"
    ],
    "overview": {
      "short": "Số Linh Hồn 4 tiết lộ rằng trong thâm tâm, bạn khao khát sự ổn định, an toàn và một nền tảng vững chắc.",
      "detailed": "Số Linh Hồn 4 cho thấy điều mà trái tim bạn thực sự mong muốn là sự an toàn và ổn định. Linh hồn bạn cần cảm giác có đất dưới chân, có gốc rễ vững vàng.\n\nBạn khao khát xây dựng những điều bền vững - một ngôi nhà, một sự nghiệp, một gia đình ổn định. Sự hỗn loạn và bất ổn khiến linh hồn bạn lo lắng.\n\nTrong thâm tâm, bạn tìm kiếm trật tự và hệ thống. Dù bề ngoài có thể khác, nhưng bên trong bạn là người coi trọng sự đáng tin cậy và kiên định.\n\nĐể linh hồn được thỏa mãn, bạn cần tạo ra môi trường an toàn, có tổ chức và xây dựng những nền tảng vững chắc cho tương lai."
    },
    "deepestDesires": [
      "Sống trong môi trường an toàn và ổn định",
      "Xây dựng nền tảng vững chắc cho tương lai",
      "Có một ngôi nhà và gia đình ổn định",
      "Được tin tưởng và là người đáng tin cậy",
      "Hoàn thành mọi việc một cách có hệ thống",
      "Để lại di sản bền vững"
    ],
    "innerMotivation": "Động lực sâu thẳm của bạn là tạo ra sự an toàn và ổn định cho bản thân và những người bạn yêu thương.",
    "secretFears": [
      "Sợ sự hỗn loạn và bất ổn",
      "Sợ mất đi những gì đã xây dựng",
      "Lo lắng về tương lai không chắc chắn",
      "Sợ bị coi là không đáng tin cậy"
    ],
    "fulfillmentPath": {
      "needs": "Bạn cần môi trường có tổ chức, ổn định và kế hoạch rõ ràng cho tương lai.",
      "advice": "Hãy đầu tư vào việc xây dựng nền tảng vững chắc - nhà cửa, tiết kiệm, kỹ năng.",
      "warning": "Cẩn thận không trở nên quá cứng nhắc hoặc lo lắng thái quá về sự an toàn."
    },
    "inRelationships": "Trong các mối quan hệ, bạn tìm kiếm sự ổn định và cam kết lâu dài. Bạn là người trung thành và đáng tin cậy."
  },
  "5": {
    "number": 5,
    "name": "Khao Khát Tự Do",
    "altNames": [
      "Soul Urge 5",
      "Heart's Desire 5",
      "Số Linh Hồn 5"
    ],
    "keywords": [
      "Tự do",
      "Phiêu lưu",
      "Trải nghiệm",
      "Thay đổi",
      "Khám phá"
    ],
    "overview": {
      "short": "Số Linh Hồn 5 tiết lộ rằng trong thâm tâm, bạn khao khát tự do, phiêu lưu và trải nghiệm tất cả những gì cuộc sống mang lại.",
      "detailed": "Số Linh Hồn 5 cho thấy điều mà trái tim bạn thực sự mong muốn là tự do - tự do di chuyển, tự do lựa chọn, tự do trải nghiệm. Linh hồn bạn là của một nhà thám hiểm.\n\nBạn khao khát khám phá thế giới, thử nghiệm những điều mới, và sống trọn vẹn qua năm giác quan. Sự ràng buộc và đơn điệu khiến linh hồn bạn ngột ngạt.\n\nTrong thâm tâm, bạn không bao giờ muốn bị giam cầm - dù là về thể xác, tinh thần hay cảm xúc. Bạn cần không gian để bay.\n\nĐể linh hồn được thỏa mãn, bạn cần cho phép bản thân phiêu lưu, thay đổi và trải nghiệm sự đa dạng của cuộc sống."
    },
    "deepestDesires": [
      "Tự do đi bất cứ đâu, làm bất cứ điều gì",
      "Trải nghiệm mọi khía cạnh của cuộc sống",
      "Khám phá thế giới và những nền văn hóa khác",
      "Sống mà không bị ràng buộc",
      "Có nhiều lựa chọn và cơ hội",
      "Thay đổi và đổi mới liên tục"
    ],
    "innerMotivation": "Động lực sâu thẳm của bạn là trải nghiệm tất cả những gì cuộc sống có thể mang lại và giữ cho linh hồn được tự do.",
    "secretFears": [
      "Sợ bị ràng buộc và mất tự do",
      "Sợ cuộc sống nhàm chán, lặp lại",
      "Lo lắng về việc bỏ lỡ trải nghiệm",
      "Sợ cam kết lâu dài"
    ],
    "fulfillmentPath": {
      "needs": "Bạn cần không gian, sự đa dạng và tự do để trải nghiệm cuộc sống theo cách của riêng mình.",
      "advice": "Hãy cho phép bản thân phiêu lưu và không tự giam mình trong những khuôn khổ không cần thiết.",
      "warning": "Cẩn thận không trốn chạy mọi cam kết hoặc tìm kiếm tự do qua những cách không lành mạnh."
    },
    "inRelationships": "Trong các mối quan hệ, bạn cần đối tác hiểu và tôn trọng nhu cầu tự do của bạn. Cam kết không có nghĩa là mất tự do."
  },
  "6": {
    "number": 6,
    "name": "Khao Khát Yêu Thương",
    "altNames": [
      "Soul Urge 6",
      "Heart's Desire 6",
      "Số Linh Hồn 6"
    ],
    "keywords": [
      "Yêu thương",
      "Gia đình",
      "Chăm sóc",
      "Hài hòa",
      "Trách nhiệm"
    ],
    "overview": {
      "short": "Số Linh Hồn 6 tiết lộ rằng trong thâm tâm, bạn khao khát yêu thương, được yêu thương, và chăm sóc những người bạn quý trọng.",
      "detailed": "Số Linh Hồn 6 cho thấy điều mà trái tim bạn thực sự mong muốn là tình yêu gia đình và sự hài hòa trong những mối quan hệ gần gũi nhất. Linh hồn bạn là của một người mẹ/người cha vũ trụ.\n\nBạn khao khát được chăm sóc và bảo vệ những người bạn yêu thương. Nhìn thấy người thân hạnh phúc mang lại cho bạn niềm vui sâu sắc nhất.\n\nTrong thâm tâm, bạn muốn tạo ra một tổ ấm đẹp đẽ, hài hòa - nơi mọi người cảm thấy được yêu thương và an toàn.\n\nĐể linh hồn được thỏa mãn, bạn cần xây dựng gia đình (theo bất kỳ hình thức nào) và có cơ hội chăm sóc người khác."
    },
    "deepestDesires": [
      "Được yêu và yêu thương sâu sắc",
      "Có một gia đình hạnh phúc, hài hòa",
      "Chăm sóc và bảo vệ những người thân yêu",
      "Tạo ra môi trường đẹp đẽ, ấm áp",
      "Được cần đến và có giá trị",
      "Nhìn thấy người khác hạnh phúc"
    ],
    "innerMotivation": "Động lực sâu thẳm của bạn là yêu thương và được yêu thương, tạo ra sự hài hòa trong các mối quan hệ.",
    "secretFears": [
      "Sợ bị cô đơn hoặc không được yêu thương",
      "Sợ gia đình tan vỡ",
      "Lo lắng về việc không thể bảo vệ người thân",
      "Sợ bị từ chối khi cho đi tình yêu"
    ],
    "fulfillmentPath": {
      "needs": "Bạn cần các mối quan hệ thân mật và cơ hội để chăm sóc người khác.",
      "advice": "Hãy xây dựng những mối quan hệ gia đình chặt chẽ và cho phép bản thân yêu thương.",
      "warning": "Cẩn thận không hy sinh quá mức hoặc kiểm soát người khác vì \"tình yêu thương\"."
    },
    "inRelationships": "Trong các mối quan hệ, bạn là người cho đi nhiều nhất. Bạn cần học cách nhận lại và không đánh mất bản thân."
  },
  "7": {
    "number": 7,
    "name": "Khao Khát Hiểu Biết",
    "altNames": [
      "Soul Urge 7",
      "Heart's Desire 7",
      "Số Linh Hồn 7"
    ],
    "keywords": [
      "Hiểu biết",
      "Tâm linh",
      "Chân lý",
      "Nội tâm",
      "Trí tuệ"
    ],
    "overview": {
      "short": "Số Linh Hồn 7 tiết lộ rằng trong thâm tâm, bạn khao khát hiểu biết sâu sắc, tìm kiếm chân lý và kết nối tâm linh.",
      "detailed": "Số Linh Hồn 7 cho thấy điều mà trái tim bạn thực sự mong muốn là sự hiểu biết - không phải kiến thức bề mặt, mà là chân lý sâu sắc về cuộc sống và ý nghĩa của nó.\n\nBạn khao khát những khoảnh khắc tĩnh lặng để suy ngẫm và kết nối với nguồn năng lượng cao hơn. Sự ồn ào và hời hợt của thế giới khiến linh hồn bạn mệt mỏi.\n\nTrong thâm tâm, bạn là một nhà hiền triết, một người tìm kiếm - luôn đặt câu hỏi \"Tại sao?\" và tìm kiếm câu trả lời bên dưới bề mặt.\n\nĐể linh hồn được thỏa mãn, bạn cần thời gian cô độc, không gian để suy nghĩ, và cơ hội khám phá những chiều sâu của tâm trí và tâm linh."
    },
    "deepestDesires": [
      "Hiểu biết chân lý và ý nghĩa cuộc sống",
      "Kết nối với nguồn năng lượng tâm linh",
      "Có thời gian và không gian yên tĩnh",
      "Khám phá những bí ẩn của tâm trí",
      "Sống một cuộc đời có chiều sâu",
      "Tìm thấy sự bình an nội tâm"
    ],
    "innerMotivation": "Động lực sâu thẳm của bạn là tìm kiếm chân lý và hiểu biết về bản chất thực sự của cuộc sống.",
    "secretFears": [
      "Sợ sự hời hợt và vô nghĩa",
      "Sợ không bao giờ tìm thấy câu trả lời",
      "Lo lắng về việc bị hiểu lầm",
      "Sợ mất kết nối với nguồn tâm linh"
    ],
    "fulfillmentPath": {
      "needs": "Bạn cần sự cô độc có chất lượng, không gian cho sự suy ngẫm và nghiên cứu.",
      "advice": "Hãy dành thời gian cho thiền định, đọc sách, và khám phá các vấn đề tâm linh/triết học.",
      "warning": "Cẩn thận không cô lập bản thân quá mức hoặc trở nên quá hoài nghi."
    },
    "inRelationships": "Trong các mối quan hệ, bạn cần đối tác tôn trọng nhu cầu cô độc và có thể kết nối ở mức độ sâu sắc."
  },
  "8": {
    "number": 8,
    "name": "Khao Khát Thành Tựu",
    "altNames": [
      "Soul Urge 8",
      "Heart's Desire 8",
      "Số Linh Hồn 8"
    ],
    "keywords": [
      "Thành tựu",
      "Quyền lực",
      "Sự giàu có",
      "Thành công",
      "Tác động"
    ],
    "overview": {
      "short": "Số Linh Hồn 8 tiết lộ rằng trong thâm tâm, bạn khao khát thành tựu, quyền lực và khả năng tạo tác động lớn.",
      "detailed": "Số Linh Hồn 8 cho thấy điều mà trái tim bạn thực sự mong muốn là thành công và khả năng ảnh hưởng. Linh hồn bạn khao khát đạt được điều vĩ đại và để lại dấu ấn.\n\nBạn khao khát sự giàu có - không chỉ vì tiền bạc, mà vì quyền lực và sự tự do mà nó mang lại. Bạn muốn có khả năng thay đổi thế giới.\n\nTrong thâm tâm, bạn là một nhà lãnh đạo, một người xây dựng đế chế. Sự tầm thường khiến linh hồn bạn không hài lòng.\n\nĐể linh hồn được thỏa mãn, bạn cần theo đuổi thành tựu lớn và sử dụng quyền lực một cách có ý nghĩa."
    },
    "deepestDesires": [
      "Đạt được thành công và sự công nhận",
      "Có quyền lực và ảnh hưởng",
      "Tạo ra sự giàu có và thịnh vượng",
      "Để lại di sản đáng nhớ",
      "Có khả năng thay đổi thế giới",
      "Được tôn trọng vì thành tựu"
    ],
    "innerMotivation": "Động lực sâu thẳm của bạn là đạt được thành tựu lớn và có khả năng tạo tác động.",
    "secretFears": [
      "Sợ thất bại và sự tầm thường",
      "Sợ mất quyền lực hoặc địa vị",
      "Lo lắng về việc không được tôn trọng",
      "Sợ nghèo khó và phụ thuộc"
    ],
    "fulfillmentPath": {
      "needs": "Bạn cần cơ hội để theo đuổi thành tựu lớn và phát triển khả năng lãnh đạo.",
      "advice": "Hãy theo đuổi mục tiêu tham vọng nhưng nhớ cân bằng với các giá trị khác trong cuộc sống.",
      "warning": "Cẩn thận không để tham vọng khiến bạn đánh mất các mối quan hệ và giá trị quan trọng."
    },
    "inRelationships": "Trong các mối quan hệ, bạn cần đối tác hiểu và hỗ trợ tham vọng của bạn. Bạn có thể cần học cách không đặt công việc lên trên tình yêu."
  },
  "9": {
    "number": 9,
    "name": "Khao Khát Phục Vụ",
    "altNames": [
      "Soul Urge 9",
      "Heart's Desire 9",
      "Số Linh Hồn 9"
    ],
    "keywords": [
      "Phục vụ",
      "Nhân đạo",
      "Bao dung",
      "Hoàn thiện",
      "Cho đi"
    ],
    "overview": {
      "short": "Số Linh Hồn 9 tiết lộ rằng trong thâm tâm, bạn khao khát phục vụ nhân loại, cho đi và làm cho thế giới tốt đẹp hơn.",
      "detailed": "Số Linh Hồn 9 cho thấy điều mà trái tim bạn thực sự mong muốn là phục vụ và đóng góp cho điều lớn hơn bản thân. Linh hồn bạn là của một người nhân đạo.\n\nBạn khao khát làm cho thế giới tốt đẹp hơn, dù theo cách nhỏ hay lớn. Sống chỉ cho bản thân khiến linh hồn bạn cảm thấy trống rỗng.\n\nTrong thâm tâm, bạn yêu thương tất cả nhân loại và mong muốn xóa bỏ đau khổ. Bạn sẵn sàng cho đi mà không mong nhận lại.\n\nĐể linh hồn được thỏa mãn, bạn cần tìm cách phục vụ người khác và đóng góp cho những mục đích lớn hơn bản thân."
    },
    "deepestDesires": [
      "Làm cho thế giới tốt đẹp hơn",
      "Phục vụ và giúp đỡ người khác",
      "Sống một cuộc đời có ý nghĩa lớn",
      "Yêu thương và bao dung nhân loại",
      "Cho đi mà không mong nhận lại",
      "Để lại di sản tích cực cho thế giới"
    ],
    "innerMotivation": "Động lực sâu thẳm của bạn là phục vụ và đóng góp cho sự tiến hóa của nhân loại.",
    "secretFears": [
      "Sợ sống một cuộc đời vô nghĩa",
      "Sợ không thể giúp đỡ được ai",
      "Lo lắng về sự bất công trong thế giới",
      "Sợ sự ích kỷ và lạnh lùng"
    ],
    "fulfillmentPath": {
      "needs": "Bạn cần cơ hội để phục vụ và đóng góp cho những mục đích nhân đạo.",
      "advice": "Hãy tìm cách phục vụ - qua công việc, hoạt động tình nguyện, hoặc đơn giản là giúp đỡ người xung quanh.",
      "warning": "Cẩn thận không quên chăm sóc bản thân trong khi lo cho người khác."
    },
    "inRelationships": "Trong các mối quan hệ, bạn yêu thương sâu sắc nhưng có thể yêu cả nhân loại nhiều hơn một người. Bạn cần học cách tập trung tình yêu cá nhân."
  },
  "11": {
    "number": 11,
    "name": "Khao Khát Khai Sáng",
    "altNames": [
      "Soul Urge 11",
      "Heart's Desire 11",
      "Số Linh Hồn 11"
    ],
    "keywords": [
      "Khai sáng",
      "Trực giác",
      "Tâm linh",
      "Truyền cảm hứng",
      "Sứ mệnh"
    ],
    "isMasterNumber": true,
    "overview": {
      "short": "Số Linh Hồn 11 tiết lộ rằng trong thâm tâm, bạn khao khát khai sáng, kết nối tâm linh và truyền cảm hứng cho người khác.",
      "detailed": "Số Linh Hồn 11 cho thấy linh hồn bạn mang một sứ mệnh đặc biệt - khai sáng và nâng cao nhận thức. Bạn khao khát kết nối với những chiều không gian cao hơn.\n\nTrong thâm tâm, bạn cảm nhận được rằng mình ở đây vì một mục đích lớn hơn. Sự hời hợt của thế giới vật chất không thể thỏa mãn linh hồn bạn.\n\nĐể linh hồn được thỏa mãn, bạn cần theo đuổi con đường tâm linh và sử dụng khả năng trực giác để phục vụ người khác."
    },
    "deepestDesires": [
      "Kết nối với nguồn năng lượng cao hơn",
      "Truyền cảm hứng và khai sáng người khác",
      "Sống theo sứ mệnh tâm linh",
      "Phát triển khả năng trực giác",
      "Làm cầu nối giữa các thế giới",
      "Nâng cao nhận thức của nhân loại"
    ],
    "innerMotivation": "Động lực sâu thẳm của bạn là thực hiện sứ mệnh tâm linh và mang ánh sáng cho người khác.",
    "secretFears": [
      "Sợ không thực hiện được sứ mệnh",
      "Sợ bị hiểu lầm hoặc coi là \"khác thường\"",
      "Lo lắng về áp lực từ khả năng đặc biệt",
      "Sợ mất kết nối với nguồn tâm linh"
    ],
    "fulfillmentPath": {
      "needs": "Bạn cần con đường tâm linh rõ ràng và cơ hội sử dụng khả năng trực giác.",
      "advice": "Hãy phát triển khả năng tâm linh và tìm cách chia sẻ với người khác.",
      "warning": "Cẩn thận không bị overwhelm bởi sự nhạy cảm hoặc mất cân bằng với thế giới thực."
    },
    "inRelationships": "Trong các mối quan hệ, bạn tìm kiếm sự kết nối ở mức linh hồn. Bạn cần đối tác hiểu được chiều sâu tâm linh của bạn."
  },
  "22": {
    "number": 22,
    "name": "Khao Khát Xây Dựng Vĩ Đại",
    "altNames": [
      "Soul Urge 22",
      "Heart's Desire 22",
      "Số Linh Hồn 22"
    ],
    "keywords": [
      "Xây dựng",
      "Di sản",
      "Tầm nhìn",
      "Thực hiện",
      "Vĩ đại"
    ],
    "isMasterNumber": true,
    "overview": {
      "short": "Số Linh Hồn 22 tiết lộ rằng trong thâm tâm, bạn khao khát xây dựng những công trình vĩ đại để lại cho nhân loại.",
      "detailed": "Số Linh Hồn 22 cho thấy linh hồn bạn mang khao khát xây dựng - không phải những thứ nhỏ nhặt, mà là những công trình có thể thay đổi thế giới và tồn tại qua thế kỷ.\n\nTrong thâm tâm, bạn có tầm nhìn lớn lao và khao khát biến những tầm nhìn đó thành hiện thực cụ thể. Sự tầm thường không thể thỏa mãn linh hồn bạn.\n\nĐể linh hồn được thỏa mãn, bạn cần theo đuổi những dự án có quy mô lớn và để lại di sản ý nghĩa."
    },
    "deepestDesires": [
      "Xây dựng những công trình vĩ đại",
      "Để lại di sản cho nhiều thế hệ",
      "Biến tầm nhìn lớn thành hiện thực",
      "Tạo tác động quy mô toàn cầu",
      "Kết hợp lý tưởng với thực tế",
      "Được nhớ đến vì những đóng góp lớn"
    ],
    "innerMotivation": "Động lực sâu thẳm của bạn là xây dựng những công trình có ý nghĩa lâu dài cho nhân loại.",
    "secretFears": [
      "Sợ không thực hiện được tiềm năng",
      "Sợ để lại cuộc đời mà không có di sản",
      "Lo lắng về áp lực từ tầm nhìn lớn",
      "Sợ thất bại trong những dự án quan trọng"
    ],
    "fulfillmentPath": {
      "needs": "Bạn cần cơ hội để theo đuổi những dự án quy mô lớn và có ý nghĩa.",
      "advice": "Hãy bắt đầu xây dựng từ nền tảng vững chắc và kiên nhẫn với quá trình.",
      "warning": "Cẩn thận không bị áp lực từ tiềm năng lớn hoặc làm việc đến kiệt sức."
    },
    "inRelationships": "Trong các mối quan hệ, bạn cần đối tác hiểu và hỗ trợ tầm nhìn lớn của bạn."
  },
  "33": {
    "number": 33,
    "name": "Khao Khát Chữa Lành",
    "altNames": [
      "Soul Urge 33",
      "Heart's Desire 33",
      "Số Linh Hồn 33"
    ],
    "keywords": [
      "Chữa lành",
      "Yêu thương",
      "Phục vụ",
      "Nâng đỡ",
      "Từ bi"
    ],
    "isMasterNumber": true,
    "overview": {
      "short": "Số Linh Hồn 33 tiết lộ rằng trong thâm tâm, bạn khao khát chữa lành và mang tình yêu vô điều kiện đến thế giới.",
      "detailed": "Số Linh Hồn 33 cho thấy linh hồn bạn mang khao khát chữa lành sâu sắc nhất - chữa lành không chỉ thể xác mà cả tâm hồn và tinh thần của nhân loại.\n\nTrong thâm tâm, bạn là hiện thân của tình yêu vô điều kiện. Nhìn thấy đau khổ của người khác khiến linh hồn bạn đau đớn, và bạn khao khát xoa dịu mọi nỗi đau.\n\nĐể linh hồn được thỏa mãn, bạn cần tìm cách phục vụ và chữa lành - qua bất kỳ hình thức nào phù hợp với bạn."
    },
    "deepestDesires": [
      "Chữa lành và xoa dịu nỗi đau",
      "Mang tình yêu vô điều kiện đến thế giới",
      "Nâng đỡ và phục vụ nhân loại",
      "Sống như một nguồn ánh sáng",
      "Giảng dạy và hướng dẫn bằng tình yêu",
      "Thấy mọi người được chữa lành và hạnh phúc"
    ],
    "innerMotivation": "Động lực sâu thẳm của bạn là chữa lành và nâng cao nhận thức của nhân loại qua tình yêu thương.",
    "secretFears": [
      "Sợ không thể giúp được ai",
      "Sợ gánh lấy quá nhiều đau khổ",
      "Lo lắng về việc không sống đúng tiềm năng",
      "Sợ cạn kiệt năng lượng khi cho đi"
    ],
    "fulfillmentPath": {
      "needs": "Bạn cần cơ hội để phục vụ và chữa lành, cũng như được chăm sóc lại.",
      "advice": "Hãy tìm cách phục vụ phù hợp với năng lượng của bạn và nhớ chăm sóc bản thân.",
      "warning": "Cẩn thận không kiệt sức vì gánh lấy quá nhiều hoặc quên chăm sóc bản thân."
    },
    "inRelationships": "Trong các mối quan hệ, bạn yêu thương vô điều kiện nhưng cần đối tác có thể chăm sóc lại bạn."
  }
},
    personalityMeanings: {
  "1": {
    "number": 1,
    "name": "Hình Ảnh Người Lãnh Đạo",
    "altNames": [
      "Personality 1",
      "Outer Self 1",
      "Số Nhân Cách 1"
    ],
    "keywords": [
      "Tự tin",
      "Độc lập",
      "Mạnh mẽ",
      "Tiên phong",
      "Quyết đoán"
    ],
    "overview": {
      "short": "Số Nhân Cách 1 cho thấy bạn tạo ấn tượng đầu tiên là người tự tin, độc lập và có khả năng lãnh đạo.",
      "detailed": "Số Nhân Cách 1 tiết lộ cách thế giới nhìn nhận bạn - và đó là hình ảnh của một người lãnh đạo tự tin. Khi người khác gặp bạn lần đầu, họ thường cảm nhận được năng lượng mạnh mẽ và quyết đoán.\n\nBạn có vẻ ngoài độc lập, không cần dựa dẫm vào ai. Người ta có thể nghĩ bạn là người tiên phong, dám nghĩ dám làm, và không sợ đi một mình.\n\nHình ảnh này có thể đúng với con người thật của bạn, hoặc có thể là \"mặt nạ\" bạn đeo ra ngoài. Dù thế nào, đây là cách bạn được người khác nhận diện.\n\nHình ảnh Nhân Cách 1 thu hút những người tìm kiếm sự dẫn dắt và gạt bỏ những người không thích bị kiểm soát."
    },
    "firstImpression": {
      "positive": [
        "Tự tin, đáng tin cậy",
        "Mạnh mẽ, quyết đoán",
        "Độc lập, tự chủ",
        "Có khả năng lãnh đạo",
        "Sáng tạo, tiên phong",
        "Đáng để theo"
      ],
      "negative": [
        "Có thể bị coi là kiêu ngạo",
        "Đôi khi có vẻ lạnh lùng",
        "Có thể gây cảm giác đe dọa",
        "Bị cho là quá tự mãn",
        "Khó tiếp cận"
      ]
    },
    "howOthersSeeYou": "Người khác thấy bạn là người biết mình muốn gì và có khả năng đạt được điều đó. Họ có thể tìm đến bạn để được dẫn dắt hoặc tránh xa vì cảm thấy bị áp đảo.",
    "socialStyle": "Trong xã hội, bạn thường đứng ra dẫn dắt các cuộc trò chuyện và hoạt động. Bạn có sức thu hút tự nhiên và không thích đóng vai phụ.",
    "dressStyle": "Phong cách ăn mặc thường nổi bật, thể hiện cá tính riêng, và có xu hướng sang trọng hoặc độc đáo. Bạn thích những gì thể hiện sự khác biệt.",
    "challengesWithImage": [
      "Có thể vô tình đe dọa người khác",
      "Khó khăn khi cần tỏ ra yếu đuối hoặc cần giúp đỡ",
      "Có thể bị hiểu lầm là kiêu ngạo"
    ]
  },
  "2": {
    "number": 2,
    "name": "Hình Ảnh Người Hòa Nhã",
    "altNames": [
      "Personality 2",
      "Outer Self 2",
      "Số Nhân Cách 2"
    ],
    "keywords": [
      "Dịu dàng",
      "Hợp tác",
      "Đáng tin",
      "Nhạy cảm",
      "Hòa nhã"
    ],
    "overview": {
      "short": "Số Nhân Cách 2 cho thấy bạn tạo ấn tượng đầu tiên là người dịu dàng, dễ gần và đáng tin cậy.",
      "detailed": "Số Nhân Cách 2 tiết lộ rằng bạn tạo cho người khác cảm giác an toàn và dễ chịu. Khi gặp bạn lần đầu, người ta thường cảm thấy được lắng nghe và được tôn trọng.\n\nBạn có vẻ ngoài nhẹ nhàng, không gây áp lực. Người khác có thể thoải mái chia sẻ với bạn vì cảm thấy bạn sẽ hiểu và không phán xét.\n\nHình ảnh này thu hút những người cần sự hỗ trợ và đồng cảm. Tuy nhiên, nó cũng có thể khiến một số người coi thường hoặc lợi dụng bạn.\n\nDù con người thật của bạn có thể mạnh mẽ hơn vẻ ngoài, đây là \"mặt tiền\" mà thế giới nhìn thấy trước tiên."
    },
    "firstImpression": {
      "positive": [
        "Dịu dàng, dễ gần",
        "Đáng tin cậy, chân thành",
        "Biết lắng nghe",
        "Không gây áp lực",
        "Tử tế, hòa nhã",
        "Có sự tinh tế"
      ],
      "negative": [
        "Có thể bị coi là yếu đuối",
        "Đôi khi có vẻ thiếu quyết đoán",
        "Có thể bị lợi dụng",
        "Bị cho là quá nhạy cảm",
        "Khó để lại ấn tượng mạnh"
      ]
    },
    "howOthersSeeYou": "Người khác thấy bạn là người dễ chịu và an toàn để ở bên. Họ có thể tìm đến bạn khi cần sự đồng cảm và hỗ trợ.",
    "socialStyle": "Trong xã hội, bạn thường đóng vai người lắng nghe và hỗ trợ. Bạn không cần phải là trung tâm nhưng đóng vai trò quan trọng trong việc gắn kết mọi người.",
    "dressStyle": "Phong cách ăn mặc thường tinh tế, nhẹ nhàng, không quá nổi bật. Bạn thích những tông màu nhã nhặn và chất liệu mềm mại.",
    "challengesWithImage": [
      "Có thể bị coi thường vì vẻ ngoài hiền lành",
      "Khó khăn khi cần thể hiện quyền lực",
      "Có thể bị lợi dụng vì quá tốt bụng"
    ]
  },
  "3": {
    "number": 3,
    "name": "Hình Ảnh Người Rực Rỡ",
    "altNames": [
      "Personality 3",
      "Outer Self 3",
      "Số Nhân Cách 3"
    ],
    "keywords": [
      "Quyến rũ",
      "Vui vẻ",
      "Sáng tạo",
      "Hấp dẫn",
      "Biểu cảm"
    ],
    "overview": {
      "short": "Số Nhân Cách 3 cho thấy bạn tạo ấn tượng đầu tiên là người quyến rũ, vui vẻ và đầy sức sống.",
      "detailed": "Số Nhân Cách 3 tiết lộ rằng bạn có sức hút tự nhiên và khả năng làm bất kỳ ai cũng thoải mái. Khi gặp bạn lần đầu, người ta thường bị cuốn hút bởi năng lượng tích cực của bạn.\n\nBạn có vẻ ngoài sáng sủa, vui tươi và luôn có điều gì đó thú vị để nói. Người khác thích ở bên bạn vì bạn mang lại tiếng cười và niềm vui.\n\nHình ảnh này thu hút hầu hết mọi người, đặc biệt là những ai cần được cổ vũ hoặc giải trí. Tuy nhiên, một số người có thể không coi trọng bạn vì vẻ ngoài quá vui vẻ.\n\nDù có những lo lắng sâu xa bên trong, vẻ ngoài của bạn luôn rạng rỡ như mặt trời."
    },
    "firstImpression": {
      "positive": [
        "Quyến rũ, hấp dẫn",
        "Vui vẻ, lạc quan",
        "Sáng tạo, thú vị",
        "Có sức thu hút tự nhiên",
        "Dễ nói chuyện",
        "Mang lại năng lượng tích cực"
      ],
      "negative": [
        "Có thể bị coi là hời hợt",
        "Đôi khi có vẻ không nghiêm túc",
        "Có thể gây cảm giác phô trương",
        "Bị cho là nói nhiều",
        "Khó để được coi trọng trong vấn đề nghiêm túc"
      ]
    },
    "howOthersSeeYou": "Người khác thấy bạn là người vui vẻ và thú vị để ở bên. Họ tìm đến bạn khi cần được cổ vũ hoặc muốn giải trí.",
    "socialStyle": "Trong xã hội, bạn thường là trung tâm của sự chú ý và nguồn năng lượng của nhóm. Bạn biết cách làm cho mọi cuộc gặp gỡ trở nên vui vẻ.",
    "dressStyle": "Phong cách ăn mặc thường đầy màu sắc, sáng tạo và thể hiện cá tính. Bạn không ngại nổi bật và thể hiện phong cách riêng.",
    "challengesWithImage": [
      "Có thể khó được coi trọng trong các tình huống nghiêm túc",
      "Khó khăn khi cần thể hiện sự sâu sắc",
      "Có thể bị đánh giá thấp khả năng thực sự"
    ]
  },
  "4": {
    "number": 4,
    "name": "Hình Ảnh Người Đáng Tin",
    "altNames": [
      "Personality 4",
      "Outer Self 4",
      "Số Nhân Cách 4"
    ],
    "keywords": [
      "Đáng tin",
      "Ổn định",
      "Thực tế",
      "Chuyên nghiệp",
      "Nghiêm túc"
    ],
    "overview": {
      "short": "Số Nhân Cách 4 cho thấy bạn tạo ấn tượng đầu tiên là người đáng tin cậy, ổn định và chuyên nghiệp.",
      "detailed": "Số Nhân Cách 4 tiết lộ rằng bạn tạo cho người khác cảm giác an toàn và tin tưởng. Khi gặp bạn lần đầu, người ta thường thấy một người nghiêm túc, có trách nhiệm.\n\nBạn có vẻ ngoài ổn định, không phô trương, và có vẻ biết mình đang làm gì. Người khác có thể tin tưởng giao cho bạn những việc quan trọng.\n\nHình ảnh này thu hút những người cần sự đáng tin cậy và chuyên nghiệp. Tuy nhiên, nó cũng có thể khiến bạn bị coi là nhàm chán hoặc quá nghiêm túc.\n\nDù con người thật của bạn có thể đa dạng hơn, vẻ ngoài của bạn luôn tạo cảm giác vững chãi như đá."
    },
    "firstImpression": {
      "positive": [
        "Đáng tin cậy, trách nhiệm",
        "Ổn định, vững vàng",
        "Chuyên nghiệp, có năng lực",
        "Thực tế, không màu mè",
        "Kiên định, nhất quán",
        "Là người có thể dựa vào"
      ],
      "negative": [
        "Có thể bị coi là nhàm chán",
        "Đôi khi có vẻ quá nghiêm túc",
        "Có thể gây cảm giác cứng nhắc",
        "Bị cho là thiếu sáng tạo",
        "Khó tiếp cận ở mức cá nhân"
      ]
    },
    "howOthersSeeYou": "Người khác thấy bạn là người đáng tin cậy và có thể dựa vào. Họ tìm đến bạn khi cần sự hỗ trợ thực tế và ổn định.",
    "socialStyle": "Trong xã hội, bạn thường đóng vai người tổ chức và đảm bảo mọi thứ vận hành suôn sẻ. Bạn không cần nổi bật nhưng là trụ cột quan trọng.",
    "dressStyle": "Phong cách ăn mặc thường cổ điển, gọn gàng và chuyên nghiệp. Bạn thích những gì bền vững và không quá nổi bật.",
    "challengesWithImage": [
      "Có thể bị coi là nhàm chán hoặc thiếu sáng tạo",
      "Khó khăn khi cần thể hiện sự vui vẻ tự nhiên",
      "Có thể mất cơ hội vì vẻ ngoài quá nghiêm túc"
    ]
  },
  "5": {
    "number": 5,
    "name": "Hình Ảnh Người Năng Động",
    "altNames": [
      "Personality 5",
      "Outer Self 5",
      "Số Nhân Cách 5"
    ],
    "keywords": [
      "Năng động",
      "Hấp dẫn",
      "Linh hoạt",
      "Tự do",
      "Phiêu lưu"
    ],
    "overview": {
      "short": "Số Nhân Cách 5 cho thấy bạn tạo ấn tượng đầu tiên là người năng động, hấp dẫn và đầy sức sống.",
      "detailed": "Số Nhân Cách 5 tiết lộ rằng bạn có sức hút mạnh mẽ và năng lượng lôi cuốn. Khi gặp bạn lần đầu, người ta thường bị cuốn hút bởi sự linh hoạt và tự do của bạn.\n\nBạn có vẻ ngoài năng động, sẵn sàng cho mọi cuộc phiêu lưu. Người khác cảm thấy cuộc sống thú vị hơn khi ở bên bạn.\n\nHình ảnh này thu hút những người tìm kiếm sự thay đổi và trải nghiệm mới. Tuy nhiên, một số người có thể coi bạn là không đáng tin cậy hoặc quá bốc đồng.\n\nDù có những phần ổn định bên trong, vẻ ngoài của bạn luôn gợi lên hình ảnh của gió - tự do và không thể kiểm soát."
    },
    "firstImpression": {
      "positive": [
        "Năng động, sống động",
        "Hấp dẫn, lôi cuốn",
        "Linh hoạt, thích nghi tốt",
        "Cởi mở, dễ kết bạn",
        "Phiêu lưu, thú vị",
        "Mang lại năng lượng mới mẻ"
      ],
      "negative": [
        "Có thể bị coi là bốc đồng",
        "Đôi khi có vẻ không đáng tin",
        "Có thể gây cảm giác không ổn định",
        "Bị cho là thiếu cam kết",
        "Khó đoán, khó hiểu"
      ]
    },
    "howOthersSeeYou": "Người khác thấy bạn là người thú vị và mang lại sự tươi mới. Họ tìm đến bạn khi muốn thoát khỏi sự nhàm chán.",
    "socialStyle": "Trong xã hội, bạn thường là người mang lại không khí sôi nổi và các ý tưởng mới. Bạn dễ dàng hòa nhập với bất kỳ nhóm nào.",
    "dressStyle": "Phong cách ăn mặc thường hiện đại, đa dạng và hay thay đổi. Bạn thích thử nghiệm và không bị gò bó bởi quy tắc.",
    "challengesWithImage": [
      "Có thể khó được tin tưởng trong các cam kết lâu dài",
      "Khó khăn khi cần thể hiện sự ổn định",
      "Có thể bị đánh giá là thiếu chiều sâu"
    ]
  },
  "6": {
    "number": 6,
    "name": "Hình Ảnh Người Chăm Sóc",
    "altNames": [
      "Personality 6",
      "Outer Self 6",
      "Số Nhân Cách 6"
    ],
    "keywords": [
      "Ấm áp",
      "Đáng tin",
      "Chăm sóc",
      "Trách nhiệm",
      "Hài hòa"
    ],
    "overview": {
      "short": "Số Nhân Cách 6 cho thấy bạn tạo ấn tượng đầu tiên là người ấm áp, đáng tin cậy và có trách nhiệm.",
      "detailed": "Số Nhân Cách 6 tiết lộ rằng bạn tạo cho người khác cảm giác được chăm sóc và bảo vệ. Khi gặp bạn lần đầu, người ta thường cảm thấy an toàn và được yêu thương.\n\nBạn có vẻ ngoài ấm áp, dễ gần và sẵn sàng giúp đỡ. Người khác có thể nhìn bạn như một người bạn đáng tin cậy hoặc thậm chí như hình mẫu gia đình.\n\nHình ảnh này thu hút những người cần sự hỗ trợ và chăm sóc. Tuy nhiên, một số người có thể lợi dụng sự tốt bụng của bạn.\n\nDù có những phần khác của bạn, vẻ ngoài của bạn luôn gợi lên hình ảnh của ngọn lửa ấm áp trong ngôi nhà."
    },
    "firstImpression": {
      "positive": [
        "Ấm áp, dễ gần",
        "Đáng tin cậy, có trách nhiệm",
        "Chăm sóc, quan tâm",
        "Hài hòa, tạo không khí tốt",
        "Có thẩm mỹ tốt",
        "Là chỗ dựa đáng tin"
      ],
      "negative": [
        "Có thể bị coi là lo lắng thái quá",
        "Đôi khi có vẻ can thiệp",
        "Có thể gây cảm giác kiểm soát",
        "Bị cho là quá bao bọc",
        "Khó để được coi là độc lập"
      ]
    },
    "howOthersSeeYou": "Người khác thấy bạn là người đáng tin cậy và quan tâm. Họ tìm đến bạn khi cần lời khuyên hoặc sự hỗ trợ.",
    "socialStyle": "Trong xã hội, bạn thường đóng vai người chăm sóc và gắn kết mọi người. Bạn biết cách tạo ra môi trường ấm áp cho mọi người.",
    "dressStyle": "Phong cách ăn mặc thường trang nhã, ấm áp và có thẩm mỹ. Bạn thích những gì tạo cảm giác thoải mái và đẹp mắt.",
    "challengesWithImage": [
      "Có thể khó được coi trọng ngoài vai trò chăm sóc",
      "Khó khăn khi cần thể hiện sự độc lập",
      "Có thể bị lợi dụng vì quá tốt bụng"
    ]
  },
  "7": {
    "number": 7,
    "name": "Hình Ảnh Người Bí Ẩn",
    "altNames": [
      "Personality 7",
      "Outer Self 7",
      "Số Nhân Cách 7"
    ],
    "keywords": [
      "Bí ẩn",
      "Trí tuệ",
      "Sâu sắc",
      "Độc đáo",
      "Tinh tế"
    ],
    "overview": {
      "short": "Số Nhân Cách 7 cho thấy bạn tạo ấn tượng đầu tiên là người bí ẩn, trí tuệ và có chiều sâu.",
      "detailed": "Số Nhân Cách 7 tiết lộ rằng bạn tạo cho người khác cảm giác có điều gì đó sâu xa hơn những gì nhìn thấy. Khi gặp bạn lần đầu, người ta thường tò mò về bạn.\n\nBạn có vẻ ngoài điềm tĩnh, không dễ đọc, và có vẻ đang suy nghĩ về những điều sâu xa. Người khác có thể cảm thấy bạn biết nhiều hơn những gì bạn nói.\n\nHình ảnh này thu hút những người tìm kiếm chiều sâu và trí tuệ. Tuy nhiên, một số người có thể thấy bạn khó tiếp cận hoặc xa cách.\n\nDù có những phần ấm áp bên trong, vẻ ngoài của bạn như mặt hồ phẳng lặng - sâu thẳm và khó đoán."
    },
    "firstImpression": {
      "positive": [
        "Bí ẩn, thú vị",
        "Trí tuệ, sâu sắc",
        "Điềm tĩnh, tự chủ",
        "Độc đáo, không đám đông",
        "Tinh tế, có phong cách",
        "Đáng để khám phá"
      ],
      "negative": [
        "Có thể bị coi là lạnh lùng",
        "Đôi khi có vẻ xa cách",
        "Có thể gây cảm giác khó tiếp cận",
        "Bị cho là kiêu ngạo",
        "Khó để hiểu và gần gũi"
      ]
    },
    "howOthersSeeYou": "Người khác thấy bạn là người có chiều sâu và trí tuệ. Họ có thể tò mò về bạn nhưng cũng cảm thấy khó tiếp cận.",
    "socialStyle": "Trong xã hội, bạn thường đứng ở rìa và quan sát hơn là tham gia sôi nổi. Bạn chọn lọc kỹ những người mình kết nối.",
    "dressStyle": "Phong cách ăn mặc thường tinh tế, không theo đám đông, và có thể nghiêng về tông màu tối hoặc đơn giản nhưng sang trọng.",
    "challengesWithImage": [
      "Có thể khó kết bạn vì vẻ ngoài xa cách",
      "Khó khăn khi cần thể hiện sự ấm áp",
      "Có thể bị hiểu lầm là kiêu ngạo"
    ]
  },
  "8": {
    "number": 8,
    "name": "Hình Ảnh Người Quyền Lực",
    "altNames": [
      "Personality 8",
      "Outer Self 8",
      "Số Nhân Cách 8"
    ],
    "keywords": [
      "Quyền lực",
      "Thành công",
      "Chuyên nghiệp",
      "Mạnh mẽ",
      "Uy tín"
    ],
    "overview": {
      "short": "Số Nhân Cách 8 cho thấy bạn tạo ấn tượng đầu tiên là người có quyền lực, thành công và chuyên nghiệp.",
      "detailed": "Số Nhân Cách 8 tiết lộ rằng bạn tạo cho người khác cảm giác bạn là người có địa vị và quyền lực. Khi gặp bạn lần đầu, người ta thường cảm nhận được sự tự tin và thành công.\n\nBạn có vẻ ngoài của một người biết mình đang làm gì và có khả năng đạt được điều mình muốn. Người khác có thể nể phục hoặc cảm thấy bị đe dọa.\n\nHình ảnh này thu hút những người tìm kiếm sự dẫn dắt và cơ hội. Tuy nhiên, một số người có thể cảm thấy bị áp đảo hoặc ghen tị.\n\nDù bên trong bạn có thể khác, vẻ ngoài của bạn luôn toát lên hình ảnh của một CEO hay một nhà lãnh đạo."
    },
    "firstImpression": {
      "positive": [
        "Quyền lực, đáng nể",
        "Thành công, có địa vị",
        "Chuyên nghiệp, có năng lực",
        "Tự tin, mạnh mẽ",
        "Có tầm ảnh hưởng",
        "Đáng để hợp tác"
      ],
      "negative": [
        "Có thể bị coi là đe dọa",
        "Đôi khi có vẻ vật chất quá",
        "Có thể gây cảm giác xa cách",
        "Bị cho là thiếu cảm xúc",
        "Khó tiếp cận ở mức cá nhân"
      ]
    },
    "howOthersSeeYou": "Người khác thấy bạn là người thành công và có quyền lực. Họ có thể tìm đến bạn vì cơ hội kinh doanh hoặc nể phục từ xa.",
    "socialStyle": "Trong xã hội, bạn thường được đối xử với sự tôn trọng và đôi khi e dè. Bạn có xu hướng kết nối với những người có địa vị tương đương.",
    "dressStyle": "Phong cách ăn mặc thường sang trọng, đắt tiền và thể hiện địa vị. Bạn đầu tư vào vẻ ngoài như một phần của hình ảnh thành công.",
    "challengesWithImage": [
      "Có thể khó kết bạn thực sự vì vẻ ngoài đe dọa",
      "Khó khăn khi cần thể hiện sự yếu đuối",
      "Có thể bị ghen tị hoặc đối xử không chân thành"
    ]
  },
  "9": {
    "number": 9,
    "name": "Hình Ảnh Người Cao Quý",
    "altNames": [
      "Personality 9",
      "Outer Self 9",
      "Số Nhân Cách 9"
    ],
    "keywords": [
      "Cao quý",
      "Nhân từ",
      "Trí tuệ",
      "Bao dung",
      "Quyến rũ"
    ],
    "overview": {
      "short": "Số Nhân Cách 9 cho thấy bạn tạo ấn tượng đầu tiên là người cao quý, nhân từ và có tầm nhìn rộng lớn.",
      "detailed": "Số Nhân Cách 9 tiết lộ rằng bạn tạo cho người khác cảm giác bạn là người có tâm hồn lớn và quan tâm đến thế giới. Khi gặp bạn lần đầu, người ta thường cảm nhận được sự cao quý và bao dung.\n\nBạn có vẻ ngoài của một người đã trải nghiệm nhiều và có sự hiểu biết sâu rộng. Người khác có thể cảm thấy được nâng đỡ khi ở bên bạn.\n\nHình ảnh này thu hút mọi loại người vì sự bao dung mà bạn thể hiện. Tuy nhiên, một số người có thể cảm thấy bạn quá xa vời hoặc lý tưởng hóa.\n\nDù bên trong bạn có những mặt khác, vẻ ngoài của bạn luôn toát lên sự cao quý như một vị hiền triết."
    },
    "firstImpression": {
      "positive": [
        "Cao quý, đáng kính",
        "Nhân từ, bao dung",
        "Trí tuệ, từng trải",
        "Có sức hút đặc biệt",
        "Mang lại cảm giác an bình",
        "Là nguồn cảm hứng"
      ],
      "negative": [
        "Có thể bị coi là xa vời",
        "Đôi khi có vẻ không thực tế",
        "Có thể gây cảm giác khó với tới",
        "Bị cho là quá lý tưởng",
        "Khó để kết nối ở mức đời thường"
      ]
    },
    "howOthersSeeYou": "Người khác thấy bạn là người có tầm nhìn lớn và tâm hồn cao quý. Họ có thể tìm đến bạn để được truyền cảm hứng.",
    "socialStyle": "Trong xã hội, bạn thường được tôn trọng và có sức ảnh hưởng tự nhiên. Bạn kết nối với mọi loại người mà không phân biệt.",
    "dressStyle": "Phong cách ăn mặc thường tinh tế, có thể có yếu tố nghệ thuật hoặc văn hóa. Bạn thể hiện sự sang trọng nhưng không phô trương.",
    "challengesWithImage": [
      "Có thể khó để người khác thấy bạn là người bình thường",
      "Khó khăn khi cần thể hiện những cảm xúc \"nhỏ bé\"",
      "Có thể bị kỳ vọng quá cao"
    ]
  },
  "11": {
    "number": 11,
    "name": "Hình Ảnh Người Khai Sáng",
    "altNames": [
      "Personality 11",
      "Outer Self 11",
      "Số Nhân Cách 11"
    ],
    "keywords": [
      "Khai sáng",
      "Cảm hứng",
      "Nhạy cảm",
      "Trực giác",
      "Đặc biệt"
    ],
    "isMasterNumber": true,
    "overview": {
      "short": "Số Nhân Cách 11 cho thấy bạn tạo ấn tượng đầu tiên là người đặc biệt, truyền cảm hứng và có chiều sâu tâm linh.",
      "detailed": "Số Nhân Cách 11 tiết lộ rằng bạn tạo cho người khác cảm giác có điều gì đó đặc biệt về bạn. Khi gặp bạn lần đầu, người ta thường cảm nhận được năng lượng khác biệt - có thể là sự nhạy cảm sâu sắc hoặc ánh sáng nội tâm.\n\nBạn có vẻ ngoài của một người có kết nối với những chiều không gian cao hơn. Người khác có thể cảm thấy được truyền cảm hứng hoặc được soi sáng khi ở bên bạn.\n\nHình ảnh này thu hút những người tìm kiếm ý nghĩa và chiều sâu tâm linh. Tuy nhiên, một số người có thể cảm thấy bạn quá \"khác biệt\" hoặc khó hiểu."
    },
    "firstImpression": {
      "positive": [
        "Đặc biệt, độc đáo",
        "Truyền cảm hứng",
        "Có chiều sâu tâm linh",
        "Nhạy cảm, tinh tế",
        "Có \"ánh sáng\" đặc biệt",
        "Khiến người khác suy nghĩ"
      ],
      "negative": [
        "Có thể bị coi là \"khác thường\"",
        "Đôi khi có vẻ không thực tế",
        "Có thể gây cảm giác khó hiểu",
        "Bị cho là quá nhạy cảm",
        "Khó hòa nhập với đám đông"
      ]
    },
    "howOthersSeeYou": "Người khác thấy bạn là người đặc biệt và có chiều sâu. Họ có thể tò mò về bạn hoặc tìm đến bạn để được hướng dẫn.",
    "socialStyle": "Trong xã hội, bạn thường nổi bật vì sự khác biệt. Bạn có thể không cảm thấy hoàn toàn thuộc về bất kỳ nhóm nào.",
    "dressStyle": "Phong cách ăn mặc có thể độc đáo, nghệ thuật hoặc có yếu tố tâm linh. Bạn thể hiện sự khác biệt qua vẻ ngoài.",
    "challengesWithImage": [
      "Có thể khó hòa nhập với những nhóm \"bình thường\"",
      "Khó khăn khi cần thể hiện sự thực tế",
      "Có thể bị hiểu lầm hoặc cô lập"
    ]
  },
  "22": {
    "number": 22,
    "name": "Hình Ảnh Kiến Trúc Sư Vĩ Đại",
    "altNames": [
      "Personality 22",
      "Outer Self 22",
      "Số Nhân Cách 22"
    ],
    "keywords": [
      "Vĩ đại",
      "Quyền lực",
      "Tầm nhìn",
      "Xây dựng",
      "Ảnh hưởng"
    ],
    "isMasterNumber": true,
    "overview": {
      "short": "Số Nhân Cách 22 cho thấy bạn tạo ấn tượng đầu tiên là người có tầm nhìn vĩ đại và khả năng xây dựng những điều lớn lao.",
      "detailed": "Số Nhân Cách 22 tiết lộ rằng bạn tạo cho người khác cảm giác bạn là người có tiềm năng lớn lao. Khi gặp bạn lần đầu, người ta thường cảm nhận được năng lượng của một người có thể thay đổi thế giới.\n\nBạn có vẻ ngoài của một người có tầm nhìn xa và khả năng thực hiện. Người khác có thể cảm thấy nể phục hoặc muốn tham gia vào tầm nhìn của bạn.\n\nHình ảnh này thu hút những người có tham vọng lớn và tìm kiếm người dẫn dắt. Tuy nhiên, áp lực từ kỳ vọng có thể rất lớn."
    },
    "firstImpression": {
      "positive": [
        "Có tầm nhìn vĩ đại",
        "Mạnh mẽ, có ảnh hưởng",
        "Chuyên nghiệp, có năng lực",
        "Là người xây dựng",
        "Có khả năng thực hiện",
        "Đáng để đi theo"
      ],
      "negative": [
        "Có thể bị coi là đe dọa",
        "Đôi khi có vẻ quá tham vọng",
        "Có thể gây cảm giác áp lực",
        "Bị kỳ vọng quá cao",
        "Khó tiếp cận ở mức cá nhân"
      ]
    },
    "howOthersSeeYou": "Người khác thấy bạn là người có tiềm năng lớn lao. Họ có thể muốn hợp tác hoặc học hỏi từ bạn.",
    "socialStyle": "Trong xã hội, bạn thường được đối xử với sự tôn trọng cao. Bạn có xu hướng kết nối với những người có tầm nhìn tương tự.",
    "dressStyle": "Phong cách ăn mặc thường chuyên nghiệp, thể hiện địa vị và khả năng. Bạn đầu tư vào hình ảnh như một phần của tầm nhìn.",
    "challengesWithImage": [
      "Áp lực từ kỳ vọng rất lớn",
      "Khó để thể hiện sự yếu đuối",
      "Có thể bị cô đơn trên đỉnh cao"
    ]
  }
},
    birthdayMeanings: {
  "1": {
    "number": 1,
    "name": "Người Khởi Đầu",
    "keywords": [
      "Độc lập",
      "Sáng tạo",
      "Lãnh đạo"
    ],
    "overview": "Sinh ngày 1 mang năng lượng của sự khởi đầu và sáng tạo. Bạn có tư duy độc lập, khả năng lãnh đạo bẩm sinh và luôn muốn tiên phong trong mọi việc.",
    "talents": [
      "Khả năng khởi xướng dự án mới",
      "Tư duy độc lập, sáng tạo",
      "Quyết đoán trong hành động"
    ],
    "challenges": "Cần học cách hợp tác và lắng nghe ý kiến người khác."
  },
  "2": {
    "number": 2,
    "name": "Người Hợp Tác",
    "keywords": [
      "Hòa hợp",
      "Nhạy cảm",
      "Ngoại giao"
    ],
    "overview": "Sinh ngày 2 mang năng lượng của sự cân bằng và hợp tác. Bạn có khả năng thấu hiểu cảm xúc người khác, giỏi làm cầu nối và tạo hài hòa.",
    "talents": [
      "Khả năng ngoại giao xuất sắc",
      "Thấu cảm và lắng nghe",
      "Làm việc nhóm hiệu quả"
    ],
    "challenges": "Cần tự tin hơn và không quá phụ thuộc vào sự công nhận của người khác."
  },
  "3": {
    "number": 3,
    "name": "Người Biểu Đạt",
    "keywords": [
      "Sáng tạo",
      "Giao tiếp",
      "Lạc quan"
    ],
    "overview": "Sinh ngày 3 mang năng lượng của sự biểu đạt và sáng tạo. Bạn có khiếu nghệ thuật, khả năng giao tiếp cuốn hút và luôn mang lại niềm vui.",
    "talents": [
      "Khả năng giao tiếp xuất sắc",
      "Sáng tạo nghệ thuật",
      "Truyền cảm hứng cho người khác"
    ],
    "challenges": "Cần tập trung hơn và không phân tán năng lượng."
  },
  "4": {
    "number": 4,
    "name": "Người Xây Dựng",
    "keywords": [
      "Ổn định",
      "Thực tế",
      "Kỷ luật"
    ],
    "overview": "Sinh ngày 4 mang năng lượng của sự ổn định và xây dựng. Bạn chăm chỉ, có tổ chức và là người đáng tin cậy trong mọi việc.",
    "talents": [
      "Khả năng tổ chức và quản lý",
      "Làm việc có hệ thống",
      "Kiên nhẫn và bền bỉ"
    ],
    "challenges": "Cần linh hoạt hơn và không quá cứng nhắc."
  },
  "5": {
    "number": 5,
    "name": "Người Tự Do",
    "keywords": [
      "Thay đổi",
      "Phiêu lưu",
      "Linh hoạt"
    ],
    "overview": "Sinh ngày 5 mang năng lượng của sự tự do và thay đổi. Bạn yêu thích khám phá, thích nghi nhanh và có nhiều trải nghiệm phong phú.",
    "talents": [
      "Khả năng thích ứng cao",
      "Đa tài, đa năng",
      "Giao tiếp và thuyết phục"
    ],
    "challenges": "Cần cam kết hơn và không chạy trốn trách nhiệm."
  },
  "6": {
    "number": 6,
    "name": "Người Chăm Sóc",
    "keywords": [
      "Trách nhiệm",
      "Yêu thương",
      "Hài hòa"
    ],
    "overview": "Sinh ngày 6 mang năng lượng của tình yêu và trách nhiệm. Bạn có bản năng chăm sóc mạnh mẽ và luôn tạo ra môi trường hài hòa.",
    "talents": [
      "Khả năng chăm sóc và nuôi dưỡng",
      "Có thẩm mỹ tốt",
      "Tạo sự hài hòa gia đình"
    ],
    "challenges": "Cần chăm sóc bản thân và không hy sinh quá mức."
  },
  "7": {
    "number": 7,
    "name": "Người Tìm Kiếm",
    "keywords": [
      "Tri thức",
      "Nội tâm",
      "Phân tích"
    ],
    "overview": "Sinh ngày 7 mang năng lượng của trí tuệ và tâm linh. Bạn có tư duy sâu sắc, trực giác mạnh và luôn tìm kiếm chân lý.",
    "talents": [
      "Khả năng phân tích sâu sắc",
      "Trực giác và tâm linh",
      "Nghiên cứu và học hỏi"
    ],
    "challenges": "Cần mở lòng hơn với người khác và không quá cô lập."
  },
  "8": {
    "number": 8,
    "name": "Người Thành Đạt",
    "keywords": [
      "Quyền lực",
      "Thành công",
      "Tài chính"
    ],
    "overview": "Sinh ngày 8 mang năng lượng của quyền lực và thành công. Bạn có khả năng kinh doanh, lãnh đạo và đạt được thành tựu vật chất.",
    "talents": [
      "Khả năng quản lý tài chính",
      "Lãnh đạo và tổ chức",
      "Quyết đoán trong kinh doanh"
    ],
    "challenges": "Cần cân bằng giữa vật chất và tinh thần."
  },
  "9": {
    "number": 9,
    "name": "Người Nhân Đạo",
    "keywords": [
      "Bao dung",
      "Phục vụ",
      "Hoàn thiện"
    ],
    "overview": "Sinh ngày 9 mang năng lượng của sự bao dung và nhân đạo. Bạn có tầm nhìn rộng, yêu thương nhân loại và luôn muốn cho đi.",
    "talents": [
      "Khả năng nhìn nhận toàn cảnh",
      "Sáng tạo và nghệ thuật",
      "Phục vụ và giúp đỡ"
    ],
    "challenges": "Cần học cách nhận lại và không quá lý tưởng hóa."
  },
  "10": {
    "number": 10,
    "reducesTo": 1,
    "name": "Người Tiên Phong",
    "keywords": [
      "Độc lập",
      "Sáng tạo",
      "Hoàn chỉnh"
    ],
    "overview": "Sinh ngày 10 kết hợp năng lượng của 1 (khởi đầu) và 0 (tiềm năng vô hạn). Bạn có khả năng lãnh đạo mạnh mẽ với tầm nhìn rộng lớn.",
    "talents": [
      "Lãnh đạo với tầm nhìn xa",
      "Sáng tạo và độc lập",
      "Khả năng ảnh hưởng người khác"
    ],
    "challenges": "Cần khiêm tốn và học cách hợp tác."
  },
  "11": {
    "number": 11,
    "isMasterNumber": true,
    "name": "Người Khai Sáng",
    "keywords": [
      "Trực giác",
      "Cảm hứng",
      "Tâm linh"
    ],
    "overview": "Sinh ngày 11 là số chủ, mang năng lượng tâm linh cao. Bạn có trực giác mạnh, khả năng truyền cảm hứng và kết nối với những chiều không gian cao hơn.",
    "talents": [
      "Trực giác phi thường",
      "Truyền cảm hứng",
      "Nhạy cảm với năng lượng"
    ],
    "challenges": "Cần grounding và không bị overwhelm bởi năng lượng."
  },
  "12": {
    "number": 12,
    "reducesTo": 3,
    "name": "Người Sáng Tạo",
    "keywords": [
      "Biểu đạt",
      "Xã hội",
      "Sáng tạo"
    ],
    "overview": "Sinh ngày 12 kết hợp 1 (độc lập) và 2 (hợp tác) tạo ra 3 (biểu đạt). Bạn có khả năng giao tiếp xuất sắc và biết cách kết nối với người khác.",
    "talents": [
      "Giao tiếp và biểu đạt",
      "Sáng tạo trong xã hội",
      "Cân bằng độc lập và hợp tác"
    ],
    "challenges": "Cần tập trung và không quá phân tán."
  },
  "13": {
    "number": 13,
    "reducesTo": 4,
    "isKarmicDebt": true,
    "name": "Người Xây Dựng Qua Thử Thách",
    "keywords": [
      "Kỷ luật",
      "Kiên trì",
      "Nghiệp số"
    ],
    "overview": "Sinh ngày 13 mang nghiệp số, đòi hỏi sự chăm chỉ và kiên trì. Bạn học được giá trị của công việc và xây dựng nền tảng vững chắc qua thử thách.",
    "talents": [
      "Kiên trì vượt khó",
      "Xây dựng từ gian khó",
      "Ý chí mạnh mẽ"
    ],
    "challenges": "Cần kiên nhẫn và không bỏ cuộc khi gặp trở ngại."
  },
  "14": {
    "number": 14,
    "reducesTo": 5,
    "isKarmicDebt": true,
    "name": "Người Tự Do Qua Tiết Chế",
    "keywords": [
      "Thay đổi",
      "Tiết chế",
      "Nghiệp số"
    ],
    "overview": "Sinh ngày 14 mang nghiệp số về tự do. Bạn học cách tìm tự do thực sự thông qua sự tiết chế và cân bằng, không qua việc buông thả.",
    "talents": [
      "Thích ứng qua thử thách",
      "Học từ kinh nghiệm",
      "Tìm tự do trong kỷ luật"
    ],
    "challenges": "Cần tiết chế và tránh các cám dỗ."
  },
  "15": {
    "number": 15,
    "reducesTo": 6,
    "name": "Người Chăm Sóc Từ Tâm",
    "keywords": [
      "Yêu thương",
      "Gia đình",
      "Hài hòa"
    ],
    "overview": "Sinh ngày 15 kết hợp 1 (độc lập) và 5 (tự do) tạo ra 6 (trách nhiệm). Bạn có khả năng chăm sóc đặc biệt và tạo hài hòa trong gia đình.",
    "talents": [
      "Chăm sóc với sự tự do",
      "Có sức hút cá nhân",
      "Tạo môi trường ấm áp"
    ],
    "challenges": "Cần cân bằng giữa tự do cá nhân và trách nhiệm gia đình."
  },
  "16": {
    "number": 16,
    "reducesTo": 7,
    "isKarmicDebt": true,
    "name": "Người Tìm Kiếm Qua Khiêm Nhường",
    "keywords": [
      "Tâm linh",
      "Khiêm nhường",
      "Nghiệp số"
    ],
    "overview": "Sinh ngày 16 mang nghiệp số về ego. Bạn học sự khiêm nhường thông qua những thử thách và tìm thấy trí tuệ thực sự sau khi buông bỏ tự mãn.",
    "talents": [
      "Trí tuệ qua thử thách",
      "Khiêm nhường sau sụp đổ",
      "Kết nối tâm linh sâu"
    ],
    "challenges": "Cần chấp nhận thất bại như bài học và không để ego cản trở."
  },
  "17": {
    "number": 17,
    "reducesTo": 8,
    "name": "Người Thành Đạt Tâm Linh",
    "keywords": [
      "Thành công",
      "Trí tuệ",
      "Quyền lực"
    ],
    "overview": "Sinh ngày 17 kết hợp 1 (lãnh đạo) và 7 (trí tuệ) tạo ra 8 (thành tựu). Bạn có khả năng đạt thành công vật chất thông qua trí tuệ và tâm linh.",
    "talents": [
      "Lãnh đạo với trí tuệ",
      "Thành công có chiều sâu",
      "Kinh doanh với đạo đức"
    ],
    "challenges": "Cần cân bằng giữa thành tựu vật chất và phát triển tâm linh."
  },
  "18": {
    "number": 18,
    "reducesTo": 9,
    "name": "Người Nhân Đạo Mạnh Mẽ",
    "keywords": [
      "Phục vụ",
      "Độc lập",
      "Bao dung"
    ],
    "overview": "Sinh ngày 18 kết hợp 1 (độc lập) và 8 (quyền lực) tạo ra 9 (nhân đạo). Bạn có khả năng lãnh đạo phục vụ và tạo ảnh hưởng tích cực lớn.",
    "talents": [
      "Lãnh đạo phục vụ",
      "Tạo ảnh hưởng rộng",
      "Kinh doanh với mục đích cao"
    ],
    "challenges": "Cần cân bằng giữa tham vọng cá nhân và phục vụ cộng đồng."
  },
  "19": {
    "number": 19,
    "reducesTo": 1,
    "isKarmicDebt": true,
    "name": "Người Độc Lập Qua Phục Vụ",
    "keywords": [
      "Tự lực",
      "Phục vụ",
      "Nghiệp số"
    ],
    "overview": "Sinh ngày 19 mang nghiệp số về quyền lực. Bạn học cách độc lập thực sự thông qua việc phục vụ người khác, không qua việc kiểm soát.",
    "talents": [
      "Tự lực mạnh mẽ",
      "Lãnh đạo qua phục vụ",
      "Độc lập có trách nhiệm"
    ],
    "challenges": "Cần sử dụng quyền lực để nâng đỡ, không để kiểm soát."
  },
  "20": {
    "number": 20,
    "reducesTo": 2,
    "name": "Người Hòa Bình",
    "keywords": [
      "Hợp tác",
      "Nhạy cảm",
      "Cân bằng"
    ],
    "overview": "Sinh ngày 20 mang năng lượng 2 được khuếch đại bởi 0. Bạn có khả năng ngoại giao đặc biệt và tạo hài hòa trong mọi tình huống.",
    "talents": [
      "Ngoại giao xuất sắc",
      "Nhạy cảm với môi trường",
      "Tạo hòa bình"
    ],
    "challenges": "Cần tự tin hơn và không quá nhạy cảm với phê bình."
  },
  "21": {
    "number": 21,
    "reducesTo": 3,
    "name": "Người Biểu Đạt Xã Hội",
    "keywords": [
      "Sáng tạo",
      "Giao tiếp",
      "Thành công"
    ],
    "overview": "Sinh ngày 21 kết hợp 2 (hợp tác) và 1 (lãnh đạo) tạo ra 3 (biểu đạt). Bạn có khả năng giao tiếp xuất sắc và thành công trong lĩnh vực xã hội.",
    "talents": [
      "Giao tiếp với sức hút",
      "Sáng tạo trong xã hội",
      "Kết nối và lãnh đạo"
    ],
    "challenges": "Cần tập trung và không quá phân tán năng lượng."
  },
  "22": {
    "number": 22,
    "isMasterNumber": true,
    "name": "Bậc Thầy Xây Dựng",
    "keywords": [
      "Xây dựng",
      "Tầm nhìn",
      "Di sản"
    ],
    "overview": "Sinh ngày 22 là số chủ mạnh nhất, mang tiềm năng xây dựng những công trình vĩ đại. Bạn có thể biến tầm nhìn lớn thành hiện thực.",
    "talents": [
      "Xây dựng quy mô lớn",
      "Tầm nhìn vĩ đại",
      "Thực hiện ý tưởng lớn"
    ],
    "challenges": "Cần không bị áp lực bởi tiềm năng lớn và làm việc từng bước."
  },
  "23": {
    "number": 23,
    "reducesTo": 5,
    "name": "Người Giao Tiếp Đa Năng",
    "keywords": [
      "Giao tiếp",
      "Tự do",
      "Đa tài"
    ],
    "overview": "Sinh ngày 23 kết hợp 2 (nhạy cảm) và 3 (biểu đạt) tạo ra 5 (tự do). Bạn có khả năng giao tiếp đa dạng và thích ứng với mọi hoàn cảnh.",
    "talents": [
      "Giao tiếp linh hoạt",
      "Thích ứng nhanh",
      "Đa tài trong nhiều lĩnh vực"
    ],
    "challenges": "Cần cam kết và không quá thay đổi."
  },
  "24": {
    "number": 24,
    "reducesTo": 6,
    "name": "Người Chăm Sóc Cộng Đồng",
    "keywords": [
      "Gia đình",
      "Trách nhiệm",
      "Hài hòa"
    ],
    "overview": "Sinh ngày 24 kết hợp 2 (hợp tác) và 4 (ổn định) tạo ra 6 (trách nhiệm). Bạn có khả năng chăm sóc đặc biệt cho gia đình và cộng đồng.",
    "talents": [
      "Chăm sóc gia đình xuất sắc",
      "Tạo nền tảng ổn định",
      "Hài hòa trong quan hệ"
    ],
    "challenges": "Cần chăm sóc bản thân và không quá lo lắng cho người khác."
  },
  "25": {
    "number": 25,
    "reducesTo": 7,
    "name": "Người Tìm Kiếm Trí Tuệ",
    "keywords": [
      "Phân tích",
      "Trực giác",
      "Tâm linh"
    ],
    "overview": "Sinh ngày 25 kết hợp 2 (nhạy cảm) và 5 (khám phá) tạo ra 7 (trí tuệ). Bạn có khả năng phân tích sâu sắc và trực giác mạnh mẽ.",
    "talents": [
      "Phân tích và trực giác",
      "Khám phá tri thức",
      "Hiểu biết tâm linh"
    ],
    "challenges": "Cần kết nối với người khác và không quá cô lập."
  },
  "26": {
    "number": 26,
    "reducesTo": 8,
    "name": "Người Kinh Doanh Gia Đình",
    "keywords": [
      "Kinh doanh",
      "Gia đình",
      "Thành công"
    ],
    "overview": "Sinh ngày 26 kết hợp 2 (hợp tác) và 6 (trách nhiệm) tạo ra 8 (thành tựu). Bạn có khả năng kinh doanh gắn với giá trị gia đình.",
    "talents": [
      "Kinh doanh gia đình",
      "Quản lý có trách nhiệm",
      "Thành công bền vững"
    ],
    "challenges": "Cần cân bằng giữa công việc và gia đình."
  },
  "27": {
    "number": 27,
    "reducesTo": 9,
    "name": "Người Trí Tuệ Nhân Đạo",
    "keywords": [
      "Trí tuệ",
      "Nhân đạo",
      "Phục vụ"
    ],
    "overview": "Sinh ngày 27 kết hợp 2 (nhạy cảm) và 7 (trí tuệ) tạo ra 9 (nhân đạo). Bạn có khả năng sử dụng trí tuệ để phục vụ nhân loại.",
    "talents": [
      "Trí tuệ phục vụ",
      "Nhạy cảm với nhu cầu",
      "Giảng dạy và hướng dẫn"
    ],
    "challenges": "Cần cân bằng giữa nội tâm và hành động."
  },
  "28": {
    "number": 28,
    "reducesTo": 1,
    "name": "Người Lãnh Đạo Độc Lập",
    "keywords": [
      "Lãnh đạo",
      "Độc lập",
      "Thành tựu"
    ],
    "overview": "Sinh ngày 28 kết hợp 2 (hợp tác) và 8 (quyền lực) tạo ra 1 (lãnh đạo). Bạn có khả năng lãnh đạo độc lập với tầm nhìn kinh doanh.",
    "talents": [
      "Lãnh đạo độc lập",
      "Kinh doanh và hợp tác",
      "Quyết đoán trong hành động"
    ],
    "challenges": "Cần cân bằng giữa độc lập và hợp tác."
  },
  "29": {
    "number": 29,
    "reducesTo": 11,
    "isMasterNumber": true,
    "name": "Người Khai Sáng Nhạy Cảm",
    "keywords": [
      "Trực giác",
      "Nhạy cảm",
      "Tâm linh"
    ],
    "overview": "Sinh ngày 29 rút gọn thành 11, mang năng lượng tâm linh cao. Bạn có trực giác mạnh mẽ và khả năng truyền cảm hứng cho người khác.",
    "talents": [
      "Trực giác phi thường",
      "Nhạy cảm sâu sắc",
      "Khai sáng người khác"
    ],
    "challenges": "Cần grounding và bảo vệ năng lượng."
  },
  "30": {
    "number": 30,
    "reducesTo": 3,
    "name": "Người Biểu Đạt Tiềm Năng",
    "keywords": [
      "Sáng tạo",
      "Giao tiếp",
      "Tiềm năng"
    ],
    "overview": "Sinh ngày 30 mang năng lượng 3 với tiềm năng vô hạn của 0. Bạn có khả năng sáng tạo và giao tiếp đặc biệt.",
    "talents": [
      "Sáng tạo vô hạn",
      "Giao tiếp xuất sắc",
      "Truyền cảm hứng"
    ],
    "challenges": "Cần tập trung và phát huy hết tiềm năng."
  },
  "31": {
    "number": 31,
    "reducesTo": 4,
    "name": "Người Xây Dựng Sáng Tạo",
    "keywords": [
      "Xây dựng",
      "Sáng tạo",
      "Thực tế"
    ],
    "overview": "Sinh ngày 31 kết hợp 3 (sáng tạo) và 1 (lãnh đạo) tạo ra 4 (xây dựng). Bạn có khả năng xây dựng nền tảng vững chắc với sự sáng tạo.",
    "talents": [
      "Xây dựng sáng tạo",
      "Lãnh đạo thực tế",
      "Kiên trì và sáng tạo"
    ],
    "challenges": "Cần cân bằng giữa sáng tạo và thực tế."
  }
},
    pinnacleMeanings: {
  "1": {
    "name": "Đỉnh Cao Khởi Nghiệp",
    "keywords": [
      "độc lập",
      "sáng tạo",
      "tiên phong",
      "lãnh đạo",
      "tự tin"
    ],
    "overview": "Đây là giai đoạn bạn được thúc đẩy phát triển sự độc lập và khả năng lãnh đạo. Bạn sẽ có nhiều cơ hội để khởi xướng các dự án mới, thể hiện bản thân và đi theo con đường riêng của mình.",
    "opportunities": [
      "Cơ hội khởi nghiệp và làm chủ",
      "Phát triển ý tưởng sáng tạo độc đáo",
      "Đảm nhận vai trò lãnh đạo",
      "Xây dựng danh tiếng cá nhân",
      "Độc lập tài chính"
    ],
    "challenges": [
      "Cảm giác cô đơn khi đi đường riêng",
      "Áp lực phải tự lập hoàn toàn",
      "Đối mặt với sự phản đối từ người khác",
      "Kiểm soát tính ích kỷ và ngạo mạn",
      "Cân bằng giữa tham vọng và các mối quan hệ"
    ],
    "advice": "Hãy tin vào bản thân và dám theo đuổi tầm nhìn của mình. Đây là thời điểm để bạn đứng lên, không ngại việc đi một mình. Tuy nhiên, đừng quên rằng thành công bền vững cần có sự hỗ trợ từ người khác.",
    "bestActivities": [
      "Khởi nghiệp",
      "Sáng tạo nghệ thuật",
      "Phát triển bản thân",
      "Thể thao cá nhân",
      "Viết lách"
    ],
    "relationshipFocus": "Học cách cân bằng giữa nhu cầu cá nhân và nhu cầu của người thân. Tránh trở nên quá độc đoán trong các mối quan hệ."
  },
  "2": {
    "name": "Đỉnh Cao Hợp Tác",
    "keywords": [
      "hợp tác",
      "ngoại giao",
      "kiên nhẫn",
      "cân bằng",
      "tình yêu"
    ],
    "overview": "Giai đoạn này tập trung vào các mối quan hệ, sự hợp tác và phát triển khả năng ngoại giao. Bạn sẽ học cách làm việc với người khác, lắng nghe và tìm kiếm sự hài hòa trong mọi tình huống.",
    "opportunities": [
      "Xây dựng các mối quan hệ đối tác bền vững",
      "Phát triển kỹ năng giao tiếp và ngoại giao",
      "Tìm kiếm tình yêu đích thực",
      "Làm việc trong các lĩnh vực tư vấn, hòa giải",
      "Phát triển trực giác và nhạy cảm"
    ],
    "challenges": [
      "Thiếu tự tin, dễ bị ảnh hưởng bởi người khác",
      "Khó đưa ra quyết định độc lập",
      "Quá nhạy cảm với lời phê bình",
      "Dễ rơi vào các mối quan hệ phụ thuộc",
      "Mất cân bằng khi cho đi quá nhiều"
    ],
    "advice": "Học cách yêu thương bản thân song song với việc yêu thương người khác. Kiên nhẫn là chìa khóa - mọi thứ sẽ đến đúng thời điểm. Hãy tin vào trực giác của mình.",
    "bestActivities": [
      "Tư vấn",
      "Nghệ thuật",
      "Âm nhạc",
      "Chăm sóc sức khỏe",
      "Điều dưỡng"
    ],
    "relationshipFocus": "Đây là giai đoạn tuyệt vời cho tình yêu và hôn nhân. Học cách cho và nhận một cách cân bằng."
  },
  "3": {
    "name": "Đỉnh Cao Sáng Tạo",
    "keywords": [
      "sáng tạo",
      "biểu đạt",
      "vui vẻ",
      "xã hội",
      "truyền cảm hứng"
    ],
    "overview": "Đây là giai đoạn của sự sáng tạo, vui vẻ và tự do biểu đạt. Bạn được khuyến khích phát triển tài năng nghệ thuật, mở rộng giao tiếp xã hội và sống một cuộc sống đầy màu sắc.",
    "opportunities": [
      "Phát triển tài năng nghệ thuật và sáng tạo",
      "Mở rộng mạng lưới xã hội",
      "Thành công trong lĩnh vực giải trí, truyền thông",
      "Truyền cảm hứng cho người khác",
      "Học cách tận hưởng cuộc sống"
    ],
    "challenges": [
      "Phân tán năng lượng vào quá nhiều hoạt động",
      "Bỏ dở dự án vì thiếu kiên nhẫn",
      "Chi tiêu hoang phí",
      "Tránh né các vấn đề nghiêm túc",
      "Lời nói thiếu suy nghĩ gây tổn thương"
    ],
    "advice": "Hãy để sự sáng tạo của bạn tỏa sáng, nhưng đừng quên kỷ luật. Tập trung vào một vài dự án quan trọng thay vì làm mọi thứ. Lời nói có sức mạnh - hãy sử dụng khôn ngoan.",
    "bestActivities": [
      "Viết lách",
      "Biểu diễn",
      "Thiết kế",
      "Marketing",
      "Giảng dạy",
      "Nói chuyện trước công chúng"
    ],
    "relationshipFocus": "Các mối quan hệ trong giai đoạn này thường vui vẻ và sôi nổi. Tránh mối quan hệ hời hợt, tìm kiếm sự kết nối sâu sắc."
  },
  "4": {
    "name": "Đỉnh Cao Xây Dựng",
    "keywords": [
      "xây dựng",
      "kỷ luật",
      "nền tảng",
      "thực tế",
      "chăm chỉ"
    ],
    "overview": "Giai đoạn này yêu cầu bạn làm việc chăm chỉ để xây dựng nền tảng vững chắc cho tương lai. Đây là thời kỳ của kỷ luật, tổ chức và những nỗ lực thực tế để đạt được mục tiêu dài hạn.",
    "opportunities": [
      "Xây dựng sự nghiệp ổn định",
      "Tạo nền tảng tài chính vững chắc",
      "Phát triển kỹ năng chuyên môn",
      "Xây dựng gia đình và tổ ấm",
      "Học cách quản lý và tổ chức"
    ],
    "challenges": [
      "Công việc nặng nề, ít thời gian nghỉ ngơi",
      "Cảm giác bị giới hạn và gò bó",
      "Khó khăn tài chính trong thời gian xây dựng",
      "Căng thẳng về sức khỏe do làm việc quá sức",
      "Thiếu sự linh hoạt và sáng tạo"
    ],
    "advice": "Kiên nhẫn là chìa khóa. Công sức bạn bỏ ra bây giờ sẽ mang lại phần thưởng xứng đáng. Đừng tìm đường tắt - hãy xây dựng từng viên gạch một cách vững chắc.",
    "bestActivities": [
      "Xây dựng",
      "Kế toán",
      "Quản lý",
      "Nông nghiệp",
      "Kỹ thuật",
      "Bất động sản"
    ],
    "relationshipFocus": "Các mối quan hệ cần sự cam kết và nỗ lực. Đây là thời điểm tốt để củng cố hôn nhân hoặc xây dựng gia đình."
  },
  "5": {
    "name": "Đỉnh Cao Tự Do",
    "keywords": [
      "tự do",
      "thay đổi",
      "phiêu lưu",
      "linh hoạt",
      "đa dạng"
    ],
    "overview": "Đây là giai đoạn của sự thay đổi, tự do và những trải nghiệm mới. Cuộc sống sẽ mang đến nhiều biến động, du lịch và cơ hội mở rộng tầm nhìn. Sự linh hoạt là chìa khóa thành công.",
    "opportunities": [
      "Du lịch và khám phá thế giới",
      "Thử nghiệm những điều mới",
      "Phát triển trong lĩnh vực bán hàng, tiếp thị",
      "Mở rộng mạng lưới quan hệ quốc tế",
      "Học ngoại ngữ và kỹ năng mới"
    ],
    "challenges": [
      "Không ổn định trong công việc và cuộc sống",
      "Thiếu kỷ luật và tập trung",
      "Các mối quan hệ có thể không bền vững",
      "Nghiện ngập hoặc hành vi thái quá",
      "Quyết định vội vàng dẫn đến hối tiếc"
    ],
    "advice": "Đón nhận sự thay đổi thay vì chống lại nó. Tuy nhiên, hãy tránh sự bốc đồng và duy trì một số ổn định trong cuộc sống. Tự do đích thực đến từ sự tự chủ.",
    "bestActivities": [
      "Bán hàng",
      "Du lịch",
      "Báo chí",
      "Quảng cáo",
      "Tổ chức sự kiện",
      "Công việc tự do"
    ],
    "relationshipFocus": "Các mối quan hệ cần không gian tự do cho cả hai bên. Tránh cam kết quá sớm hoặc quá cứng nhắc."
  },
  "6": {
    "name": "Đỉnh Cao Trách Nhiệm",
    "keywords": [
      "gia đình",
      "trách nhiệm",
      "yêu thương",
      "phục vụ",
      "cộng đồng"
    ],
    "overview": "Giai đoạn này tập trung vào gia đình, trách nhiệm và phục vụ cộng đồng. Bạn sẽ được kêu gọi chăm sóc người thân, tạo ra môi trường hài hòa và đóng góp cho xã hội.",
    "opportunities": [
      "Xây dựng gia đình hạnh phúc",
      "Phát triển trong lĩnh vực chăm sóc, giáo dục",
      "Nghệ thuật trang trí và thẩm mỹ",
      "Hoạt động từ thiện và cộng đồng",
      "Tư vấn hôn nhân và gia đình"
    ],
    "challenges": [
      "Gánh nặng trách nhiệm quá lớn",
      "Hy sinh bản thân cho người khác",
      "Can thiệp quá nhiều vào cuộc sống người khác",
      "Hoàn cảnh gia đình khó khăn",
      "Căng thẳng về tài chính do nghĩa vụ gia đình"
    ],
    "advice": "Học cách yêu thương mà không kiểm soát. Chăm sóc bản thân trước khi chăm sóc người khác. Đặt ra giới hạn lành mạnh trong khi vẫn sẵn lòng giúp đỡ.",
    "bestActivities": [
      "Giáo dục",
      "Y tế",
      "Tư vấn",
      "Thiết kế nội thất",
      "Ẩm thực",
      "Làm đẹp"
    ],
    "relationshipFocus": "Đây là giai đoạn quan trọng cho hôn nhân và gia đình. Các mối quan hệ đòi hỏi sự cam kết và trách nhiệm sâu sắc."
  },
  "7": {
    "name": "Đỉnh Cao Tâm Linh",
    "keywords": [
      "trí tuệ",
      "tâm linh",
      "nội tâm",
      "phân tích",
      "cô độc"
    ],
    "overview": "Đây là giai đoạn của sự phát triển nội tâm, tìm kiếm tri thức và khám phá tâm linh. Bạn sẽ có nhu cầu tĩnh lặng, suy ngẫm và tìm kiếm ý nghĩa sâu xa của cuộc sống.",
    "opportunities": [
      "Phát triển trí tuệ và chuyên môn sâu",
      "Nghiên cứu và học thuật",
      "Khám phá tâm linh và thiền định",
      "Viết lách và xuất bản",
      "Công việc đòi hỏi phân tích sâu"
    ],
    "challenges": [
      "Cảm giác cô đơn và bị cô lập",
      "Khó khăn trong các mối quan hệ xã hội",
      "Quá phân tích dẫn đến tê liệt hành động",
      "Nghi ngờ và hoài nghi quá mức",
      "Che giấu cảm xúc và khó chia sẻ"
    ],
    "advice": "Đón nhận thời gian cô độc như cơ hội để phát triển. Tuy nhiên, đừng tự cô lập hoàn toàn. Tìm sự cân bằng giữa nội tâm và thế giới bên ngoài.",
    "bestActivities": [
      "Nghiên cứu",
      "Viết lách",
      "Công nghệ",
      "Tâm lý học",
      "Triết học",
      "Khoa học"
    ],
    "relationshipFocus": "Các mối quan hệ trong giai đoạn này cần người bạn đời hiểu và tôn trọng nhu cầu riêng tư của bạn."
  },
  "8": {
    "name": "Đỉnh Cao Quyền Lực",
    "keywords": [
      "quyền lực",
      "thành công",
      "tài chính",
      "tham vọng",
      "thành tựu"
    ],
    "overview": "Đây là giai đoạn của sự thành công vật chất, quyền lực và thành tựu lớn. Bạn có tiềm năng đạt được vị trí cao, tài chính dồi dào và sự công nhận từ xã hội.",
    "opportunities": [
      "Thăng tiến sự nghiệp nhanh chóng",
      "Thành công tài chính lớn",
      "Xây dựng doanh nghiệp hoặc tổ chức",
      "Đạt được vị trí lãnh đạo",
      "Đầu tư và bất động sản"
    ],
    "challenges": [
      "Áp lực và stress từ tham vọng cao",
      "Mất cân bằng giữa công việc và gia đình",
      "Rủi ro tài chính từ đầu tư mạo hiểm",
      "Đấu tranh quyền lực và đố kỵ",
      "Trở nên lạnh lùng và vô cảm"
    ],
    "advice": "Sử dụng quyền lực và tài sản để tạo ra điều tốt đẹp. Đừng để thành công vật chất làm mất đi các giá trị tinh thần. Karma sẽ trả lại những gì bạn gieo.",
    "bestActivities": [
      "Kinh doanh",
      "Tài chính",
      "Bất động sản",
      "Quản lý cấp cao",
      "Đầu tư",
      "Pháp luật"
    ],
    "relationshipFocus": "Các mối quan hệ cần sự cân bằng giữa tham vọng cá nhân và thời gian cho gia đình. Tìm người bạn đời có thể chia sẻ tầm nhìn."
  },
  "9": {
    "name": "Đỉnh Cao Nhân Đạo",
    "keywords": [
      "nhân đạo",
      "phục vụ",
      "hoàn thiện",
      "kết thúc",
      "cho đi"
    ],
    "overview": "Đây là giai đoạn của sự hoàn thiện, cho đi và phục vụ nhân loại. Bạn được kêu gọi mở rộng lòng từ bi, buông bỏ những gì không còn phục vụ và đóng góp cho thế giới.",
    "opportunities": [
      "Hoạt động nhân đạo và từ thiện",
      "Sáng tạo nghệ thuật có ý nghĩa",
      "Giảng dạy và truyền cảm hứng",
      "Du lịch quốc tế",
      "Công việc liên quan đến nhiều nền văn hóa"
    ],
    "challenges": [
      "Mất mát và kết thúc các chương đời",
      "Cho đi quá nhiều dẫn đến kiệt sức",
      "Thất vọng với nhân loại",
      "Khó giữ lại tài sản vật chất",
      "Cảm xúc dao động mạnh"
    ],
    "advice": "Đây là giai đoạn hoàn thành. Hãy buông bỏ những gì cần buông bỏ và tập trung vào di sản bạn muốn để lại. Cho đi với trái tim mở nhưng đừng quên chăm sóc bản thân.",
    "bestActivities": [
      "Từ thiện",
      "Nghệ thuật",
      "Y tế",
      "Tâm lý",
      "Giáo dục",
      "Hoạt động quốc tế"
    ],
    "relationshipFocus": "Các mối quan hệ trong giai đoạn này thường có tính chất tâm linh và vô điều kiện. Học cách yêu mà không sở hữu."
  },
  "11": {
    "name": "Đỉnh Cao Giác Ngộ (Master 11)",
    "keywords": [
      "giác ngộ",
      "trực giác",
      "truyền cảm hứng",
      "tầm nhìn",
      "tâm linh"
    ],
    "overview": "Đây là giai đoạn đặc biệt của sự giác ngộ tâm linh và truyền cảm hứng cho người khác. Bạn có khả năng kết nối với những tầng năng lượng cao và mang thông điệp quan trọng đến thế giới.",
    "opportunities": [
      "Phát triển khả năng trực giác đặc biệt",
      "Trở thành người truyền cảm hứng, nhà tiên tri",
      "Sáng tạo nghệ thuật mang tính tâm linh",
      "Giảng dạy và dẫn dắt về tâm linh",
      "Xuất hiện trước công chúng với thông điệp ý nghĩa"
    ],
    "challenges": [
      "Áp lực từ kỳ vọng cao của người khác",
      "Năng lượng thần kinh căng thẳng",
      "Khó sống thực tế và tiếp đất",
      "Dễ bị hiểu lầm và cô đơn",
      "Sức khỏe tinh thần nhạy cảm"
    ],
    "advice": "Bạn được ban cho món quà đặc biệt - hãy sử dụng nó để phục vụ. Tuy nhiên, cần phải tiếp đất và chăm sóc sức khỏe tinh thần. Tìm người cố vấn có kinh nghiệm trên con đường tâm linh.",
    "bestActivities": [
      "Tâm lý trị liệu",
      "Coaching",
      "Viết lách",
      "Nghệ thuật",
      "Diễn thuyết",
      "Tư vấn tâm linh"
    ],
    "relationshipFocus": "Cần người bạn đời hiểu được chiều sâu tâm hồn bạn. Các mối quan hệ thường mang tính nghiệp lực và sứ mệnh chung."
  },
  "22": {
    "name": "Đỉnh Cao Kiến Tạo (Master 22)",
    "keywords": [
      "kiến tạo",
      "tầm nhìn lớn",
      "thực hiện",
      "di sản",
      "toàn cầu"
    ],
    "overview": "Đây là giai đoạn của những thành tựu lớn lao có tầm ảnh hưởng rộng. Bạn có khả năng biến những tầm nhìn vĩ đại thành hiện thực, xây dựng những công trình để đời cho nhân loại.",
    "opportunities": [
      "Xây dựng tổ chức hoặc doanh nghiệp tầm cỡ",
      "Dự án có tầm ảnh hưởng quốc tế",
      "Phát triển hạ tầng hoặc hệ thống lớn",
      "Lãnh đạo các phong trào xã hội",
      "Để lại di sản cho thế hệ sau"
    ],
    "challenges": [
      "Áp lực cực lớn từ tầm nhìn cao",
      "Workaholic và kiệt sức",
      "Thiếu kiên nhẫn với những người không theo kịp",
      "Đối mặt với những trở ngại khổng lồ",
      "Mất cân bằng cuộc sống nghiêm trọng"
    ],
    "advice": "Bạn được giao phó sứ mệnh lớn - hãy đón nhận nó với trách nhiệm. Xây dựng đội ngũ hỗ trợ vững mạnh. Nhớ rằng thành công bền vững cần sự cân bằng.",
    "bestActivities": [
      "Xây dựng doanh nghiệp",
      "Kiến trúc",
      "Chính trị",
      "Từ thiện quốc tế",
      "Công nghệ",
      "Đầu tư tầm cỡ"
    ],
    "relationshipFocus": "Cần người bạn đời mạnh mẽ, độc lập và chia sẻ tầm nhìn. Gia đình cần được quan tâm đúng mức giữa những tham vọng lớn."
  }
},
    challengeMeanings: {
  "0": {
    "name": "Thử Thách Của Sự Lựa Chọn",
    "keywords": [
      "tự do lựa chọn",
      "tất cả hoặc không gì",
      "tiềm năng vô hạn"
    ],
    "overview": "Thử thách số 0 là thử thách hiếm và đặc biệt. Bạn có thể đối mặt với bất kỳ hoặc tất cả các thử thách cùng một lúc. Đây cũng có thể là dấu hiệu của một linh hồn già đã vượt qua nhiều thử thách trong các kiếp trước.",
    "lessonToLearn": "Học cách tự do lựa chọn con đường của mình mà không bị ràng buộc bởi các thử thách cụ thể. Bạn có tiềm năng lớn nhưng cũng có thể bị phân tán.",
    "coreIssue": "Thiếu định hướng rõ ràng hoặc cảm thấy bị choáng ngợp bởi quá nhiều lựa chọn. Đôi khi không biết đâu là thử thách thực sự của mình.",
    "growthPath": [
      "Xác định rõ mục tiêu và giá trị cốt lõi",
      "Phát triển kỷ luật tự thân",
      "Tập trung năng lượng thay vì phân tán",
      "Chấp nhận trách nhiệm cho mọi lựa chọn",
      "Tin tưởng vào trực giác hướng dẫn"
    ],
    "affirmation": "Tôi được tự do lựa chọn con đường của mình và tôi chọn sự phát triển."
  },
  "1": {
    "name": "Thử Thách Của Bản Ngã",
    "keywords": [
      "độc lập",
      "tự tin",
      "khẳng định bản thân"
    ],
    "overview": "Bạn đang đối mặt với thử thách về việc phát triển ý thức về bản thân, sự tự tin và khả năng độc lập. Có thể bạn gặp khó khăn trong việc đứng lên cho bản thân hoặc ngược lại, trở nên quá độc đoán.",
    "lessonToLearn": "Tìm sự cân bằng giữa tự tin và khiêm tốn. Học cách tin vào bản thân mà không trở nên ích kỷ hoặc ngạo mạn.",
    "coreIssue": "Thiếu tự tin, sợ nổi bật, phụ thuộc vào ý kiến người khác. Hoặc ngược lại: ích kỷ, ngạo mạn, không quan tâm đến cảm xúc người khác.",
    "growthPath": [
      "Phát triển sự tự tin thông qua hành động",
      "Học cách đưa ra quyết định độc lập",
      "Dám đứng lên cho niềm tin của mình",
      "Chấp nhận sai lầm là một phần của quá trình học",
      "Cân bằng giữa nhu cầu cá nhân và nhu cầu người khác"
    ],
    "affirmation": "Tôi tin vào bản thân và dám theo đuổi con đường riêng của mình."
  },
  "2": {
    "name": "Thử Thách Của Nhạy Cảm",
    "keywords": [
      "nhạy cảm",
      "hợp tác",
      "cảm xúc",
      "quan hệ"
    ],
    "overview": "Bạn đang học cách làm việc với người khác, quản lý cảm xúc nhạy cảm và xây dựng các mối quan hệ hài hòa. Thử thách có thể là quá nhạy cảm hoặc quá vô cảm.",
    "lessonToLearn": "Phát triển sự nhạy cảm cân bằng - đủ để kết nối với người khác nhưng không để cảm xúc chi phối cuộc sống.",
    "coreIssue": "Quá nhạy cảm với lời phê bình, dễ tổn thương, khó hợp tác. Hoặc ngược lại: vô cảm, thiếu đồng cảm, không quan tâm đến cảm xúc người khác.",
    "growthPath": [
      "Phát triển trí tuệ cảm xúc",
      "Học cách đặt ra ranh giới lành mạnh",
      "Thực hành lắng nghe và đồng cảm",
      "Tìm sự cân bằng trong các mối quan hệ",
      "Tin tưởng vào trực giác của mình"
    ],
    "affirmation": "Tôi cân bằng giữa sự nhạy cảm và sức mạnh nội tâm."
  },
  "3": {
    "name": "Thử Thách Của Biểu Đạt",
    "keywords": [
      "giao tiếp",
      "sáng tạo",
      "tự tin biểu đạt"
    ],
    "overview": "Bạn đang học cách biểu đạt bản thân một cách sáng tạo và hiệu quả. Thử thách có thể là sợ nói, thiếu tự tin biểu đạt hoặc ngược lại, nói quá nhiều mà không có chiều sâu.",
    "lessonToLearn": "Phát triển khả năng giao tiếp hiệu quả và biểu đạt sáng tạo. Nói điều đúng vào đúng thời điểm.",
    "coreIssue": "Sợ bị đánh giá khi biểu đạt ý kiến, thiếu tự tin sáng tạo. Hoặc ngược lại: nói quá nhiều, phô trương, thiếu chiều sâu trong giao tiếp.",
    "growthPath": [
      "Phát triển kỹ năng giao tiếp",
      "Tìm kênh sáng tạo phù hợp",
      "Học cách lắng nghe cũng như nói",
      "Dũng cảm chia sẻ ý tưởng",
      "Thực hành viết hoặc nói trước công chúng"
    ],
    "affirmation": "Tôi biểu đạt bản thân một cách tự tin và sáng tạo."
  },
  "4": {
    "name": "Thử Thách Của Kỷ Luật",
    "keywords": [
      "kỷ luật",
      "tổ chức",
      "làm việc chăm chỉ",
      "giới hạn"
    ],
    "overview": "Bạn đang học cách làm việc có kỷ luật, tổ chức và xây dựng nền tảng vững chắc. Thử thách có thể là lười biếng, thiếu tổ chức hoặc ngược lại, quá cứng nhắc và workaholic.",
    "lessonToLearn": "Tìm sự cân bằng giữa làm việc chăm chỉ và nghỉ ngơi. Xây dựng kỷ luật mà không trở nên cứng nhắc.",
    "coreIssue": "Thiếu kỷ luật, trì hoãn, không hoàn thành việc bắt đầu. Hoặc ngược lại: workaholic, quá cứng nhắc, thiếu linh hoạt.",
    "growthPath": [
      "Phát triển thói quen làm việc có hệ thống",
      "Học cách đặt mục tiêu thực tế",
      "Cân bằng giữa làm việc và nghỉ ngơi",
      "Chấp nhận những giới hạn cần thiết",
      "Kiên nhẫn với quá trình xây dựng"
    ],
    "affirmation": "Tôi xây dựng cuộc sống của mình từng bước một với kỷ luật và kiên nhẫn."
  },
  "5": {
    "name": "Thử Thách Của Tự Do",
    "keywords": [
      "thay đổi",
      "tự do",
      "linh hoạt",
      "trải nghiệm"
    ],
    "overview": "Bạn đang học cách đón nhận sự thay đổi và tự do một cách lành mạnh. Thử thách có thể là sợ thay đổi hoặc ngược lại, bốc đồng và thiếu ổn định.",
    "lessonToLearn": "Tìm sự cân bằng giữa tự do và trách nhiệm. Đón nhận thay đổi mà không mất đi sự ổn định cần thiết.",
    "coreIssue": "Sợ thay đổi, bám víu vào sự an toàn, tránh né rủi ro. Hoặc ngược lại: bốc đồng, không ổn định, nghiện ngập, thiếu trách nhiệm.",
    "growthPath": [
      "Học cách đón nhận thay đổi tích cực",
      "Phát triển tính linh hoạt trong suy nghĩ",
      "Cân bằng giữa phiêu lưu và ổn định",
      "Thử nghiệm những điều mới một cách có trách nhiệm",
      "Giải phóng những gì không còn phục vụ"
    ],
    "affirmation": "Tôi đón nhận thay đổi và tự do trong khi duy trì sự cân bằng."
  },
  "6": {
    "name": "Thử Thách Của Trách Nhiệm",
    "keywords": [
      "trách nhiệm",
      "gia đình",
      "hoàn hảo",
      "phục vụ"
    ],
    "overview": "Bạn đang học cách cân bằng trách nhiệm với người thân và với bản thân. Thử thách có thể là né tránh trách nhiệm hoặc ngược lại, gánh vác quá nhiều và can thiệp quá đáng.",
    "lessonToLearn": "Học cách yêu thương và chăm sóc mà không kiểm soát. Chấp nhận sự không hoàn hảo của bản thân và người khác.",
    "coreIssue": "Né tránh trách nhiệm gia đình, sợ cam kết. Hoặc ngược lại: kiểm soát quá mức, đòi hỏi sự hoàn hảo, hy sinh quá đáng.",
    "growthPath": [
      "Phát triển tình yêu không điều kiện",
      "Đặt ra ranh giới lành mạnh",
      "Chấp nhận sự không hoàn hảo",
      "Cân bằng giữa cho và nhận",
      "Học cách nói 'không' khi cần thiết"
    ],
    "affirmation": "Tôi yêu thương và chăm sóc trong sự cân bằng lành mạnh."
  },
  "7": {
    "name": "Thử Thách Của Nội Tâm",
    "keywords": [
      "nội tâm",
      "đức tin",
      "trí tuệ",
      "cô độc"
    ],
    "overview": "Bạn đang học cách phát triển đời sống nội tâm và đức tin. Thử thách có thể là chạy trốn khỏi sự tĩnh lặng hoặc ngược lại, tự cô lập và nghi ngờ mọi thứ.",
    "lessonToLearn": "Tìm sự cân bằng giữa đời sống nội tâm và thế giới bên ngoài. Phát triển đức tin và trí tuệ.",
    "coreIssue": "Sợ cô đơn, tránh né sự tĩnh lặng, sống bề mặt. Hoặc ngược lại: tự cô lập, hoài nghi, lạnh lùng, xa rời thực tế.",
    "growthPath": [
      "Phát triển thói quen thiền định hoặc suy ngẫm",
      "Học cách tin tưởng vào trực giác",
      "Cân bằng giữa phân tích và cảm nhận",
      "Kết nối với người khác ở mức độ sâu",
      "Tìm kiếm tri thức từ nhiều nguồn"
    ],
    "affirmation": "Tôi tin vào trí tuệ nội tâm và sự dẫn dắt của vũ trụ."
  },
  "8": {
    "name": "Thử Thách Của Quyền Lực",
    "keywords": [
      "quyền lực",
      "tiền bạc",
      "thành công",
      "cân bằng vật chất-tinh thần"
    ],
    "overview": "Bạn đang học cách sử dụng quyền lực và tài sản một cách khôn ngoan. Thử thách có thể là sợ thành công, hoặc ngược lại, tham lam và lạm dụng quyền lực.",
    "lessonToLearn": "Tìm sự cân bằng giữa thành công vật chất và giá trị tinh thần. Sử dụng quyền lực để phục vụ không chỉ bản thân.",
    "coreIssue": "Sợ thành công, tự phá hoại, tin rằng tiền bạc là xấu. Hoặc ngược lại: tham lam, thao túng, sử dụng quyền lực để áp bức.",
    "growthPath": [
      "Phát triển mối quan hệ lành mạnh với tiền bạc",
      "Học cách lãnh đạo với sự chính trực",
      "Cân bằng tham vọng với các giá trị khác",
      "Sử dụng thành công để giúp đỡ người khác",
      "Thực hành sự hào phóng có ý thức"
    ],
    "affirmation": "Tôi sử dụng sức mạnh và nguồn lực của mình để tạo ra điều tốt đẹp."
  }
},
    karmicDebtMeanings: {
  "13": {
    "number": 13,
    "reducesTo": 4,
    "name": "Nghiệp Lười Biếng",
    "altNames": [
      "Karmic Debt 13",
      "The Lazy Karma",
      "Nghiệp Số 13"
    ],
    "keywords": [
      "Lười biếng",
      "Né tránh",
      "Kiên trì",
      "Kỷ luật",
      "Làm việc"
    ],
    "overview": {
      "short": "Nghiệp số 13 liên quan đến việc lười biếng, né tránh trách nhiệm trong kiếp trước. Bài học là học cách làm việc chăm chỉ và kiên trì.",
      "detailed": "Nghiệp số 13 là một trong bốn số nghiệp chính trong Thần Số Học. Số này xuất hiện khi bạn cộng ngày sinh, năm sinh, hoặc các con số khác mà kết quả là 13 trước khi rút gọn thành 4.\n\nTheo Thần Số Học, số 13 mang theo nghiệp từ kiếp trước khi linh hồn đã lười biếng, né tránh công việc, hoặc để người khác gánh vác trách nhiệm của mình. Trong kiếp này, bạn được sinh ra để trả nghiệp đó bằng cách học hỏi giá trị của sự chăm chỉ và kiên trì.\n\nNgười mang nghiệp 13 thường gặp nhiều trở ngại trong công việc và cuộc sống. Những gì người khác làm dễ dàng, bạn phải nỗ lực gấp nhiều lần. Đây không phải là sự trừng phạt, mà là cơ hội để linh hồn học được bài học đã bỏ lỡ.\n\nThử thách của nghiệp 13 là sự cám dỗ bỏ cuộc khi mọi thứ trở nên khó khăn. Bạn có thể cảm thấy bất công khi thấy người khác thành công dễ dàng hơn mình. Nhưng đây chính là bài học - kiên trì dù hoàn cảnh như thế nào.\n\nTin tốt là nghiệp 13 có thể được hóa giải hoàn toàn trong đời này nếu bạn học được bài học. Khi đã vượt qua, bạn sẽ có nền tảng vững chắc mà không ai có thể lay chuyển - vì bạn đã xây dựng nó bằng mồ hôi và nước mắt của chính mình."
    },
    "pastLifeOrigin": {
      "description": "Trong kiếp trước, linh hồn có thể đã lười biếng, ỷ lại vào người khác, hoặc bỏ dở công việc giữa chừng. Có thể bạn đã là người giàu có được thừa kế và không bao giờ phải làm việc, hoặc đã lợi dụng sức lao động của người khác.",
      "examples": [
        "Quý tộc sống nhờ gia sản mà không đóng góp gì",
        "Người bỏ việc liên tục, không hoàn thành cam kết",
        "Lợi dụng sức lao động của nô lệ hoặc người làm thuê",
        "Trốn tránh trách nhiệm, đùn đẩy cho người khác"
      ]
    },
    "lifeLessons": {
      "primary": "Học giá trị của sự chăm chỉ, kiên trì và hoàn thành công việc",
      "secondary": "Xây dựng sự tự lập, không phụ thuộc vào người khác",
      "spiritual": "Hiểu rằng thành quả thực sự đến từ nỗ lực của chính mình",
      "practices": [
        "Hoàn thành mọi việc đã bắt đầu, dù nhỏ nhất",
        "Không bỏ cuộc khi gặp khó khăn",
        "Xây dựng lịch trình và kỷ luật làm việc",
        "Học cách tự chịu trách nhiệm, không đổ lỗi"
      ]
    },
    "challenges": [
      "Cảm giác mọi thứ đều khó khăn hơn người khác",
      "Hay gặp trở ngại, thất bại liên tục",
      "Cám dỗ bỏ cuộc, đổi hướng liên tục",
      "Có thể lười biếng hoặc trì hoãn",
      "Khó hoàn thành những gì đã bắt đầu",
      "Cảm giác bất công khi so sánh với người khác"
    ],
    "gifts": [
      "Khi vượt qua: Sức mạnh ý chí và kiên trì phi thường",
      "Khả năng xây dựng nền tảng vững chắc",
      "Thành công bền vững vì được xây từ nỗ lực thực sự",
      "Trở thành nguồn cảm hứng cho người khác",
      "Trân trọng thành quả vì biết giá trị của nó"
    ],
    "healingPath": {
      "awareness": "Nhận ra rằng những khó khăn là cơ hội học hỏi, không phải trừng phạt",
      "acceptance": "Chấp nhận rằng bạn cần làm việc chăm chỉ hơn người khác trong giai đoạn này",
      "action": "Cam kết hoàn thành mọi việc đã bắt đầu, từ nhỏ đến lớn",
      "integration": "Biến kỷ luật và chăm chỉ thành thói quen tự nhiên",
      "transcendence": "Khi bài học được học xong, nghiệp được hóa giải và cuộc sống trở nên dễ dàng hơn"
    },
    "careerImpact": {
      "challenges": "Sự nghiệp có thể gặp nhiều trắc trở, thất bại trước khi thành công. Cần kiên nhẫn hơn người khác.",
      "strengths": "Khi đã thành công, sẽ có nền tảng vững chắc và không ai có thể lấy đi.",
      "advice": "Tập trung vào việc xây dựng từ từ, không tìm đường tắt. Thành công của bạn sẽ đến từ sự chăm chỉ."
    },
    "relationships": {
      "patterns": "Có thể thu hút những người lợi dụng sự giúp đỡ của bạn, hoặc bạn có xu hướng phụ thuộc vào người khác.",
      "lesson": "Học cách tự lập trong mối quan hệ, cho và nhận cân bằng.",
      "advice": "Không dựa dẫm vào đối tác về mặt tài chính hoặc cảm xúc quá mức."
    },
    "affirmations": [
      "Tôi hoàn thành mọi việc mình bắt đầu",
      "Tôi chấp nhận và yêu thích công việc chăm chỉ",
      "Thành công của tôi được xây dựng từ nỗ lực thực sự",
      "Tôi kiên nhẫn và bền bỉ trên con đường của mình",
      "Mỗi thử thách là cơ hội để tôi phát triển"
    ],
    "famousExamples": [
      "Người đã vượt qua nghiệp 13 thường trở thành những người thành công phi thường nhờ sức mạnh ý chí được rèn luyện qua khó khăn."
    ]
  },
  "14": {
    "number": 14,
    "reducesTo": 5,
    "name": "Nghiệp Lạm Dụng Tự Do",
    "altNames": [
      "Karmic Debt 14",
      "The Freedom Karma",
      "Nghiệp Số 14"
    ],
    "keywords": [
      "Tự do",
      "Lạm dụng",
      "Tiết chế",
      "Cân bằng",
      "Nghiện"
    ],
    "overview": {
      "short": "Nghiệp số 14 liên quan đến việc lạm dụng tự do, đam mê quá mức trong kiếp trước. Bài học là tìm kiếm tự do trong tiết chế.",
      "detailed": "Nghiệp số 14 là nghiệp của sự lạm dụng tự do và các giác quan. Số này xuất hiện khi kết quả là 14 trước khi rút gọn thành 5 - con số của tự do và thay đổi.\n\nTheo Thần Số Học, nghiệp 14 bắt nguồn từ kiếp trước khi linh hồn đã lạm dụng tự do - có thể là nghiện ngập (rượu, ma túy, cờ bạc, tình dục), hoặc sử dụng quyền tự do để làm hại người khác. Bạn có thể đã là người phóng đãng, không quan tâm đến hậu quả của hành động mình.\n\nTrong kiếp này, người mang nghiệp 14 thường có xu hướng mạnh mẽ đối với các cám dỗ - thức ăn, rượu, tình dục, cờ bạc, mua sắm, hoặc bất kỳ hình thức thái quá nào. Đây là bài test liên tục về khả năng tiết chế.\n\nThử thách của nghiệp 14 là tìm được tự do thực sự - không phải tự do làm bất cứ điều gì bạn muốn, mà là tự do khỏi sự kiểm soát của các ham muốn. Sự tiết chế không phải là nhà tù, mà là chìa khóa để mở cửa tự do thực sự.\n\nNghiệp 14 có thể được hóa giải khi bạn học được cách cân bằng - tận hưởng cuộc sống nhưng không để nó kiểm soát bạn. Khi đó, bạn sẽ có tự do đích thực và khả năng trải nghiệm cuộc sống một cách trọn vẹn mà không bị nghiện."
    },
    "pastLifeOrigin": {
      "description": "Trong kiếp trước, linh hồn có thể đã lạm dụng tự do, sống phóng đãng, hoặc để các đam mê kiểm soát. Bạn có thể đã làm hại bản thân và người khác qua sự thiếu tiết chế.",
      "examples": [
        "Nghiện rượu, ma túy, hoặc các chất kích thích",
        "Sống phóng đãng, quan hệ tình dục bừa bãi",
        "Cờ bạc, phung phí tài sản",
        "Lợi dụng quyền tự do để áp bức người khác"
      ]
    },
    "lifeLessons": {
      "primary": "Học cách tiết chế và tìm tự do trong kỷ luật",
      "secondary": "Cân bằng giữa tận hưởng và kiểm soát",
      "spiritual": "Hiểu rằng tự do thực sự là tự do khỏi sự kiểm soát của ham muốn",
      "practices": [
        "Thực hành tiết chế trong ăn uống, chi tiêu, quan hệ",
        "Nhận diện các trigger dẫn đến hành vi thái quá",
        "Xây dựng thói quen lành mạnh thay thế nghiện ngập",
        "Học cách nói \"không\" với các cám dỗ"
      ]
    },
    "challenges": [
      "Xu hướng nghiện - có thể là chất kích thích, thức ăn, tình dục, mua sắm...",
      "Khó kiểm soát các ham muốn",
      "Dễ bị cám dỗ bởi sự tự do giả tạo",
      "Có thể trải qua những thay đổi đột ngột, không ổn định",
      "Khó cam kết lâu dài (công việc, mối quan hệ)",
      "Bốc đồng, hành động không suy nghĩ"
    ],
    "gifts": [
      "Khi vượt qua: Khả năng tận hưởng cuộc sống một cách cân bằng",
      "Tự do thực sự khỏi sự kiểm soát của ham muốn",
      "Trở thành người hướng dẫn cho những ai đang chiến đấu với nghiện ngập",
      "Sức mạnh ý chí phi thường",
      "Trải nghiệm cuộc sống đầy đủ mà không bị ràng buộc"
    ],
    "healingPath": {
      "awareness": "Nhận ra các mẫu nghiện ngập và hành vi thái quá của mình",
      "acceptance": "Chấp nhận rằng bạn có xu hướng này và cần cẩn thận hơn người khác",
      "action": "Xây dựng các ranh giới và thói quen tiết chế",
      "integration": "Biến sự tiết chế thành lối sống tự nhiên",
      "transcendence": "Đạt được tự do thực sự - có thể tận hưởng mà không bị kiểm soát"
    },
    "careerImpact": {
      "challenges": "Sự nghiệp có thể không ổn định do thay đổi liên tục hoặc các hành vi bốc đồng.",
      "strengths": "Có khả năng thích nghi cao và sáng tạo trong công việc.",
      "advice": "Chọn nghề nghiệp cho phép sự linh hoạt nhưng có cấu trúc rõ ràng."
    },
    "relationships": {
      "patterns": "Có thể thu hút những mối quan hệ không lành mạnh hoặc có xu hướng không chung thủy.",
      "lesson": "Học cách cam kết và tìm tự do trong mối quan hệ ổn định.",
      "advice": "Không nhầm lẫn giữa tự do và né tránh cam kết. Mối quan hệ tốt có thể giải phóng bạn."
    },
    "affirmations": [
      "Tôi tìm thấy tự do trong sự tiết chế",
      "Tôi kiểm soát ham muốn của mình, không để chúng kiểm soát tôi",
      "Tôi tận hưởng cuộc sống một cách cân bằng và lành mạnh",
      "Tôi cam kết với những điều quan trọng mà không mất đi bản thân",
      "Mỗi lựa chọn lành mạnh là một chiến thắng"
    ],
    "famousExamples": [
      "Nhiều người đã vượt qua nghiệp 14 trở thành những nhà tư vấn, trị liệu viên xuất sắc vì họ hiểu sâu sắc về nghiện ngập và phục hồi."
    ]
  },
  "16": {
    "number": 16,
    "reducesTo": 7,
    "name": "Nghiệp Ego",
    "altNames": [
      "Karmic Debt 16",
      "The Ego Karma",
      "Nghiệp Số 16"
    ],
    "keywords": [
      "Ego",
      "Kiêu ngạo",
      "Sụp đổ",
      "Khiêm nhường",
      "Tái sinh"
    ],
    "overview": {
      "short": "Nghiệp số 16 liên quan đến sự kiêu ngạo, lạm dụng quyền lực trong kiếp trước. Bài học là học sự khiêm nhường qua những sự sụp đổ.",
      "detailed": "Nghiệp số 16 được xem là nghiệp nặng nhất trong bốn số nghiệp, liên quan đến \"sự sụp đổ của tháp\" - biểu tượng của ego bị phá hủy. Số này xuất hiện khi kết quả là 16 trước khi rút gọn thành 7.\n\nTheo Thần Số Học, nghiệp 16 bắt nguồn từ kiếp trước khi linh hồn đã quá kiêu ngạo, tự mãn, hoặc lạm dụng quyền lực. Bạn có thể đã đặt bản thân lên trên người khác, coi thường những người \"thấp kém\" hơn, hoặc sử dụng vị trí của mình để áp bức.\n\nTrong kiếp này, người mang nghiệp 16 thường trải qua những sự sụp đổ đột ngột - trong sự nghiệp, mối quan hệ, hoặc hình ảnh bản thân. Những gì bạn xây dựng dựa trên ego sẽ bị phá hủy, buộc bạn phải xây dựng lại từ nền tảng khiêm nhường hơn.\n\nSố 16 trong Tarot tương ứng với lá \"The Tower\" - tháp bị sét đánh, biểu tượng của sự phá hủy những cấu trúc giả tạo. Đây là quá trình đau đớn nhưng cần thiết để giải phóng linh hồn khỏi nhà tù của ego.\n\nNghiệp 16 được hóa giải khi bạn học được sự khiêm nhường thực sự - không phải giả vờ khiêm tốn, mà thực sự hiểu rằng mình là một phần của tổng thể lớn hơn. Khi đó, bạn sẽ có sức mạnh tâm linh thực sự thay vì quyền lực giả tạo của ego."
    },
    "pastLifeOrigin": {
      "description": "Trong kiếp trước, linh hồn có thể đã quá kiêu ngạo, lạm dụng quyền lực, hoặc gây hại cho người khác vì sự tự mãn. Bạn có thể đã là người có vị trí cao nhưng đã sử dụng nó sai cách.",
      "examples": [
        "Lãnh đạo bạo ngược, áp bức người khác",
        "Kiêu ngạo vì vẻ đẹp, tài năng, hoặc địa vị",
        "Phản bội người yêu vì ego hoặc tự mãn",
        "Coi thường, xúc phạm những người \"thấp kém\" hơn"
      ]
    },
    "lifeLessons": {
      "primary": "Học sự khiêm nhường thông qua những sự sụp đổ và tái sinh",
      "secondary": "Xây dựng bản sắc dựa trên giá trị nội tâm, không phải thành tựu bên ngoài",
      "spiritual": "Hiểu rằng sức mạnh thực sự đến từ sự kết nối với nguồn cao hơn, không phải từ ego",
      "practices": [
        "Thực hành khiêm nhường trong mọi tình huống",
        "Chấp nhận thất bại như bài học, không phải sự sỉ nhục",
        "Xây dựng lòng tự trọng dựa trên giá trị nội tâm",
        "Phục vụ người khác mà không mong đợi sự công nhận"
      ]
    },
    "challenges": [
      "Trải qua những sự sụp đổ đột ngột trong cuộc sống",
      "Mất mát về địa vị, danh tiếng, hoặc mối quan hệ",
      "Bị phản bội hoặc bị bỏ rơi",
      "Khủng hoảng bản sắc - \"Tôi là ai nếu không có thành tựu?\"",
      "Có thể bị cô lập hoặc hiểu lầm",
      "Đau đớn khi ego bị thách thức"
    ],
    "gifts": [
      "Khi vượt qua: Sức mạnh tâm linh và trí tuệ sâu sắc",
      "Khiêm nhường thực sự và sự kết nối với nguồn cao hơn",
      "Khả năng giúp người khác vượt qua khủng hoảng bản sắc",
      "Tự do khỏi nhu cầu được công nhận",
      "Sự tái sinh thành phiên bản tốt đẹp hơn của chính mình"
    ],
    "healingPath": {
      "awareness": "Nhận ra các mẫu ego và kiêu ngạo trong cuộc sống",
      "acceptance": "Chấp nhận những sự sụp đổ như một phần của quá trình chữa lành",
      "action": "Chủ động thực hành khiêm nhường trước khi bị buộc phải",
      "integration": "Xây dựng bản sắc mới dựa trên giá trị nội tâm",
      "transcendence": "Đạt được sự khiêm nhường thực sự và sức mạnh tâm linh"
    },
    "careerImpact": {
      "challenges": "Sự nghiệp có thể trải qua những sụp đổ đột ngột, đặc biệt khi dựa vào địa vị và ego.",
      "strengths": "Sau khi tái sinh, có thể đạt được thành công bền vững hơn dựa trên giá trị thực.",
      "advice": "Xây dựng sự nghiệp dựa trên giá trị và đóng góp, không phải danh tiếng và địa vị."
    },
    "relationships": {
      "patterns": "Có thể trải qua sự phản bội hoặc mất mát trong các mối quan hệ quan trọng.",
      "lesson": "Học cách yêu thương mà không cần kiểm soát, và nhận tình yêu mà không cần chứng minh xứng đáng.",
      "advice": "Xây dựng mối quan hệ dựa trên sự kết nối thực sự, không phải hình ảnh."
    },
    "affirmations": [
      "Tôi học được sự khiêm nhường qua mọi trải nghiệm",
      "Giá trị của tôi không phụ thuộc vào thành tựu bên ngoài",
      "Tôi chào đón sự tái sinh như cơ hội phát triển",
      "Tôi kết nối với nguồn năng lượng cao hơn, không phải ego",
      "Sự sụp đổ là cánh cửa dẫn đến sự tự do"
    ],
    "famousExamples": [
      "Nhiều nhà lãnh đạo tâm linh đã trải qua nghiệp 16 - sự sụp đổ hoàn toàn trước khi tái sinh thành người hướng dẫn."
    ]
  },
  "19": {
    "number": 19,
    "reducesTo": 1,
    "name": "Nghiệp Lạm Dụng Quyền Lực",
    "altNames": [
      "Karmic Debt 19",
      "The Power Karma",
      "Nghiệp Số 19"
    ],
    "keywords": [
      "Quyền lực",
      "Lạm dụng",
      "Tự lực",
      "Độc lập",
      "Phục vụ"
    ],
    "overview": {
      "short": "Nghiệp số 19 liên quan đến việc lạm dụng quyền lực, ích kỷ trong kiếp trước. Bài học là sử dụng sức mạnh để phục vụ, không phải kiểm soát.",
      "detailed": "Nghiệp số 19 là nghiệp của việc lạm dụng quyền lực và sự ích kỷ. Số này xuất hiện khi kết quả là 19 trước khi rút gọn thành 1 - con số của lãnh đạo và độc lập.\n\nTheo Thần Số Học, nghiệp 19 bắt nguồn từ kiếp trước khi linh hồn đã lạm dụng vị trí lãnh đạo hoặc quyền lực cá nhân. Bạn có thể đã đặt lợi ích cá nhân lên trên lợi ích của người khác, sử dụng người khác như công cụ, hoặc không quan tâm đến hậu quả của hành động mình lên người khác.\n\nTrong kiếp này, người mang nghiệp 19 thường phải tự mình giải quyết mọi thứ. Sự giúp đỡ từ người khác đến khó khăn hoặc không đáng tin cậy. Đây là bài học về sự tự lực - vì trước đây bạn đã lợi dụng sự giúp đỡ của người khác.\n\nThử thách của nghiệp 19 là học cách cân bằng giữa sự độc lập và sự kết nối. Bạn cần tự lực, nhưng không được trở nên cô đơn hoặc ích kỷ. Mục tiêu là sử dụng sức mạnh cá nhân để phục vụ người khác, không phải để kiểm soát họ.\n\nNghiệp 19 được hóa giải khi bạn học cách lãnh đạo bằng sự phục vụ - khi quyền lực của bạn được sử dụng để nâng đỡ người khác thay vì đè nén họ. Khi đó, bạn sẽ nhận được sự giúp đỡ và hỗ trợ một cách tự nhiên."
    },
    "pastLifeOrigin": {
      "description": "Trong kiếp trước, linh hồn có thể đã lạm dụng quyền lực, ích kỷ, hoặc sử dụng người khác để đạt mục đích. Bạn có thể đã là người lãnh đạo nhưng không quan tâm đến lợi ích của những người theo sau.",
      "examples": [
        "Lãnh đạo độc tài, không lắng nghe người khác",
        "Sử dụng người khác như công cụ để đạt mục đích",
        "Ích kỷ, chỉ quan tâm đến bản thân",
        "Không giúp đỡ khi có khả năng giúp"
      ]
    },
    "lifeLessons": {
      "primary": "Học cách sử dụng quyền lực để phục vụ, không phải kiểm soát",
      "secondary": "Phát triển sự tự lực nhưng vẫn kết nối với người khác",
      "spiritual": "Hiểu rằng sức mạnh thực sự là nâng đỡ người khác lên",
      "practices": [
        "Giúp đỡ người khác mà không mong đợi đền đáp",
        "Lắng nghe và tôn trọng ý kiến của người khác",
        "Sử dụng vị trí của mình để tạo cơ hội cho người khác",
        "Học cách nhờ giúp đỡ khi cần, không quá tự mãn"
      ]
    },
    "challenges": [
      "Phải tự giải quyết mọi vấn đề, ít nhận được sự giúp đỡ",
      "Có thể bị phản bội bởi những người mình tin tưởng",
      "Cảm giác cô đơn dù có nhiều người xung quanh",
      "Xu hướng độc đoán hoặc kiểm soát",
      "Khó khăn trong việc ủy thác và tin tưởng người khác",
      "Có thể trở nên ích kỷ khi gặp áp lực"
    ],
    "gifts": [
      "Khi vượt qua: Khả năng lãnh đạo phục vụ xuất sắc",
      "Sự độc lập và tự tin vững vàng",
      "Khả năng tạo cơ hội và nâng đỡ người khác",
      "Nhận được sự giúp đỡ và hỗ trợ tự nhiên",
      "Trở thành nguồn cảm hứng cho những người muốn trở thành lãnh đạo tốt"
    ],
    "healingPath": {
      "awareness": "Nhận ra các mẫu ích kỷ và lạm dụng quyền lực trong cuộc sống",
      "acceptance": "Chấp nhận rằng bạn cần tự lực trong giai đoạn này",
      "action": "Chủ động giúp đỡ người khác mà không mong đền đáp",
      "integration": "Biến việc phục vụ thành phong cách lãnh đạo tự nhiên",
      "transcendence": "Đạt được sự cân bằng giữa sức mạnh cá nhân và sự kết nối"
    },
    "careerImpact": {
      "challenges": "Sự nghiệp có thể gặp khó khăn vì thiếu sự hỗ trợ hoặc bị phản bội.",
      "strengths": "Phát triển sự tự lực và khả năng lãnh đạo mạnh mẽ.",
      "advice": "Xây dựng đội ngũ dựa trên sự tôn trọng và phục vụ lẫn nhau."
    },
    "relationships": {
      "patterns": "Có thể gặp khó khăn trong việc tìm được đối tác bình đẳng hoặc bị lợi dụng.",
      "lesson": "Học cách cho và nhận trong mối quan hệ một cách cân bằng.",
      "advice": "Không kiểm soát đối tác, và không để bị kiểm soát. Tìm sự bình đẳng."
    },
    "affirmations": [
      "Tôi sử dụng sức mạnh của mình để phục vụ và nâng đỡ người khác",
      "Tôi lãnh đạo bằng sự khiêm nhường và tình yêu thương",
      "Tôi tự lực nhưng vẫn kết nối với cộng đồng",
      "Tôi cho đi mà không mong đợi nhận lại",
      "Sự giúp đỡ đến với tôi khi tôi giúp đỡ người khác"
    ],
    "famousExamples": [
      "Nhiều nhà lãnh đạo vĩ đại đã học được bài học nghiệp 19 - sử dụng quyền lực để phục vụ thay vì kiểm soát."
    ]
  }
},
    arrowMeanings: {
  "3-6-9": {
    "name": "Mũi Tên Trí Tuệ (3-6-9)",
    "type": "Trí não",
    "strength": {
      "title": "Trí Tuệ Sáng Suốt & Khả Năng Tư Duy Vượt Trội",
      "description": "Bạn sở hữu bộ óc nhạy bén, khả năng phân tích logic và tiếp thu kiến thức tuyệt vời. Bạn có trí nhớ tốt, tư duy sắc sảo và luôn khao khát học hỏi điều mới. Thích hợp cho nghiên cứu, học thuật, chiến lược và quản lý cấp cao.",
      "advice": "Tránh suy nghĩ quá nhiều dẫn đến căng thẳng hoặc xem thường những người tư duy chậm hơn mình."
    },
    "weakness": {
      "title": "Mũi Tên Trống 3-6-9 (Trí Nhớ Ngắn Hạn & Hay Quên)",
      "description": "Khi thiếu cả 3 số 3, 6, 9 trên trục trí tuệ, bạn có xu hướng hay đãng trí, trí nhớ ngắn hạn giảm sút khi gặp áp lực, khó tập trung trong thời gian dài.",
      "advice": "Hãy rèn luyện thói quen ghi chú, lập to-do list, đọc sách mỗi ngày và tập thiền để định tâm."
    }
  },
  "2-5-8": {
    "name": "Mũi Tên Cảm Xúc & Tâm Hồn (2-5-8)",
    "type": "Tâm hồn",
    "strength": {
      "title": "Cân Bằng Cảm Xúc & Trực Giác Tâm Linh Sâu Sắc",
      "description": "Bạn có trái tim ấm áp, lòng trắc ẩn, khả năng thấu cảm cảm xúc của người khác và trực giác tâm linh mạnh mẽ. Luôn biết cách dung hòa các mối quan hệ và tạo cảm giác an yên cho người xung quanh.",
      "advice": "Học cách bảo vệ ranh giới cảm xúc của bản thân, không để nỗi buồn của người khác hút cạn năng lượng của mình."
    },
    "weakness": {
      "title": "Mũi Tên Trống 2-5-8 (Dễ Tổn Thương & Nhạy Cảm Quá Mức)",
      "description": "Khi thiếu trục 2-5-8, bạn dễ rơi vào trạng thái nội tâm bất an, dễ bị tổn thương bởi lời nói của người khác, hoặc che giấu cảm xúc thật sau lớp vỏ bọc lạnh lùng.",
      "advice": "Hãy tập biểu đạt cảm xúc chân thành, viết nhật ký biết ơn và dành thời gian kết nối với thiên nhiên."
    }
  },
  "1-4-7": {
    "name": "Mũi Tên Thể Chất & Thực Tế (1-4-7)",
    "type": "Thể chất",
    "strength": {
      "title": "Thực Tế, Khéo Léo & Năng Lực Hành Động Cụ Thể",
      "description": "Bạn là người thực tế, chân chạm đất, có năng lực quản trị cuộc sống vật chất, tài chính và khéo léo trong công việc thủ công, kỹ thuật hoặc sắp xếp trật tự.",
      "advice": "Đừng quá chú trọng vật chất hay câu nệ tiểu tiết mà bỏ lỡ bức tranh tổng thể hoặc các giá trị tinh thần."
    },
    "weakness": {
      "title": "Mũi Tên Trống 1-4-7 (Thiếu Thực Tế & Hay Mơ Mộng)",
      "description": "Thiếu trục 1-4-7 khiến bạn hay bay bổng, có nhiều ý tưởng viển vông nhưng khó hiện thực hóa thành hành động cụ thể, dễ gặp rắc rối với việc quản lý tài chính thực tế.",
      "advice": "Hãy bắt đầu từ những việc nhỏ cụ thể, học cách ghi chép chi tiêu và rèn luyện thể thao hàng ngày."
    }
  },
  "1-2-3": {
    "name": "Mũi Tên Kế Hoạch (1-2-3)",
    "type": "Kế hoạch",
    "strength": {
      "title": "Lập Kế Hoạch Chu Toàn & Khả Năng Tổ Chức",
      "description": "Bạn luôn suy nghĩ trước khi hành động, có phương pháp làm việc khoa học, ngăn nắp, tỉ mỉ và luôn chuẩn bị phương án dự phòng cho mọi tình huống.",
      "advice": "Tránh cầu toàn quá mức dẫn đến chần chừ bỏ lỡ thời cơ vàng."
    },
    "weakness": {
      "title": "Mũi Tên Trống 1-2-3 (Thiếu Kế Hoạch & Hành Động Ngẫu Hứng)",
      "description": "Làm việc theo cảm hứng, thường bắt đầu mà không có kế hoạch rõ ràng, dễ bị quá tải hoặc quên hạn chót.",
      "advice": "Tập lập kế hoạch theo tuần, chia nhỏ mục tiêu lớn thành các bước khả thi mỗi ngày."
    }
  },
  "4-5-6": {
    "name": "Mũi Tên Ý Chí (4-5-6)",
    "type": "Ý chí",
    "strength": {
      "title": "Ý Chí Sắt Đá & Bản Lĩnh Vượt Khó",
      "description": "Bạn sở hữu sự kiên cường phi thường, không bao giờ đầu hàng trước nghịch cảnh. Nghị lực mạnh mẽ giúp bạn vượt qua mọi sóng gió để chạm đến thành công.",
      "advice": "Học cách linh hoạt, không nên quá cứng nhắc hoặc áp đặt ý chí của mình lên người khác."
    },
    "weakness": {
      "title": "Mũi Tên Trống 4-5-6 (Thiếu Ý Chí & Dễ Uất Ức)",
      "description": "Dễ nản lòng khi gặp rào cản, cảm thấy bất lực hoặc uất ức khi kỳ vọng không đạt được như ý muốn.",
      "advice": "Rèn luyện tính kiên nhẫn qua các thói quen hàng ngày, tập thể dục kỷ luật và học cách chấp nhận sự thật."
    }
  },
  "7-8-9": {
    "name": "Mũi Tên Hoạt Động (7-8-9)",
    "type": "Hoạt động",
    "strength": {
      "title": "Năng Động, Thích Khám Phá & Trải Nghiệm Thực Tế",
      "description": "Bạn tràn đầy năng lượng, thích đi đây đi đó, khám phá thế giới, dấn thân vào các hoạt động thể thao, du lịch hoặc công việc đòi hỏi sự dịch chuyển liên tục.",
      "advice": "Cần giữ tĩnh lặng cho tâm trí, tránh tiêu hao quá nhiều năng lượng ra bên ngoài."
    },
    "weakness": {
      "title": "Mũi Tên Trống 7-8-9 (Thụ Động & Trì Trệ)",
      "description": "Có xu hướng thụ động, ngại thay đổi vùng an toàn, thích ngồi một chỗ và chần chừ dấn thân vào trải nghiệm mới.",
      "advice": "Hãy bước ra ngoài, đi bộ ít nhất 30 phút mỗi ngày và tham gia các hoạt động tập thể."
    }
  },
  "1-5-9": {
    "name": "Mũi Tên Quyết Tâm (1-5-9)",
    "type": "Quyết tâm",
    "strength": {
      "title": "Quyết Tâm Cao Độ & Không Bỏ Cuộc",
      "description": "Một khi đã đặt ra mục tiêu, bạn sẽ theo đuổi đến cùng bằng mọi giá. Tinh thần bền bỉ và sự tập trung cao độ là chìa khóa mở ra mọi cánh cửa thành tựu.",
      "advice": "Cần phân biệt giữa kiên định đúng đắn và sự ngoan cố mù quáng khi hoàn cảnh đã thay đổi."
    },
    "weakness": {
      "title": "Mũi Tên Trống 1-5-9 (Trì Hoãn & Thiếu Quyết Đoán)",
      "description": "Thường chần chừ, khó đưa ra quyết định dứt khoát, dễ bỏ cuộc giữa chừng khi gặp khó khăn ban đầu.",
      "advice": "Áp dụng quy tắc 5 giây và chia nhỏ mục tiêu để hành động ngay không do dự."
    }
  },
  "3-5-7": {
    "name": "Mũi Tên Nhạy Bén Tâm Linh (3-5-7)",
    "type": "Tâm linh",
    "strength": {
      "title": "Trực Giác Nhạy Bén, Thấu Hiểu Triết Lý & Giác Ngộ",
      "description": "Bạn có năng khiếu tự nhiên về triết học, tâm linh, huyền học và trực giác sắc bén. Bạn thấu hiểu quy luật nhân quả và có sự đồng cảm sâu sắc với kiếp nhân sinh.",
      "advice": "Kết hợp tri thức tâm linh với thực tế đời sống để tạo ra giá trị hữu ích cho cộng đồng."
    },
    "weakness": {
      "title": "Mũi Tên Trống 3-5-7 (Hay Hoài Nghi & Bất An)",
      "description": "Có xu hướng đa nghi, khó tin tưởng người khác hoặc hoài nghi bản thân, dễ bị lo âu không có căn cứ.",
      "advice": "Học cách tin vào trực giác mách bảo, thực hành thiền định và sống chân thành cởi mở."
    }
  }
},
    personalYearMeanings: {
  "1": {
    "year": 1,
    "name": "Năm Của Sự Khởi Đầu Mới & Định Hướng Lại Tương Lai",
    "keyword": "Khởi đầu, Gieo hạt, Tự lập, Đột phá",
    "overview": "Đây là năm mở đầu cho một chu kỳ 9 năm hoàn toàn mới! Năng lượng tràn ngập sự tươi mới, dũng cảm và cơ hội bứt phá. Thời điểm vàng để bắt đầu công việc mới, dự án kinh doanh mới hoặc thay đổi lối sống.",
    "careerAdvice": "Dám thử thách những hướng đi táo bạo, tự tin đưa ra quyết định làm chủ cuộc đời.",
    "loveAdvice": "Khởi sắc những mối quan hệ mới; nếu đang độc thân, bạn sẽ tỏa ra sức hút độc lập khó cưỡng.",
    "financeAdvice": "Thích hợp để đầu tư dài hạn cho chu kỳ mới, chú ý quản lý nguồn vốn ban đầu cẩn trọng."
  },
  "2": {
    "year": 2,
    "name": "Năm Của Hợp Tác, Kết Nối & Bình An Nội Tâm",
    "keyword": "Hòa giải, Kiên nhẫn, Lắng nghe, Đối tác",
    "overview": "Sau một năm khởi xướng mạnh mẽ, năm số 2 yêu cầu sự chậm rãi, lắng nghe và hợp tác. Đây không phải lúc lao về phía trước một mình mà là xây dựng mạng lưới quan hệ và nuôi dưỡng hạt giống đã gieo.",
    "careerAdvice": "Tập trung vào làm việc nhóm, xây dựng niềm tin với đối tác và đồng nghiệp.",
    "loveAdvice": "Một năm thăng hoa của tình yêu đôi lứa, cơ hội đính hôn, kết hôn hoặc hâm nóng tình cảm.",
    "financeAdvice": "Giữ tài chính ở mức an toàn, tránh đầu tư mạo hiểm nóng vội."
  },
  "3": {
    "year": 3,
    "name": "Năm Của Sáng Tạo, Lan Tỏa & Mở Rộng Giao Tiếp",
    "keyword": "Sáng tạo, Biểu đạt, Niềm vui, Xã hội",
    "overview": "Năm bùng nổ của năng lượng sáng tạo, giao lưu xã hội và truyền cảm hứng. Bạn sẽ cảm thấy vui vẻ, tự tin chia sẻ ý tưởng và mở rộng vòng kết nối bạn bè.",
    "careerAdvice": "Tỏa sáng trong lĩnh vực marketing, truyền thông, thuyết trình hoặc sáng tạo nghệ thuật.",
    "loveAdvice": "Các buổi tiệc, chuyến du lịch và gặp gỡ mang lại nhiều niềm vui và duyên lành bất ngờ.",
    "financeAdvice": "Thu nhập có thể tăng nhanh từ nhiều nguồn, nhưng cẩn thận chi tiêu quá đà cho tiệc tùng."
  },
  "4": {
    "year": 4,
    "name": "Năm Của Củng Cố Nền Tảng, Kỷ Luật & Thực Tế",
    "keyword": "Kỷ luật, Trật tự, Lao động, Vững chắc",
    "overview": "Năm để siết chặt kỷ luật, tổ chức lại công việc, chăm sóc sức khỏe và xây dựng nền tảng vững như bàn thạch. Cần nỗ lực lao động nghiêm túc, không có đường tắt.",
    "careerAdvice": "Hoàn thiện quy trình, học thêm chứng chỉ chuyên môn, kiên trì cày ải để thu quả ngọt.",
    "loveAdvice": "Cần sự chân thành, trách nhiệm và cam kết thực tế thay vì những lời hứa hão huyền.",
    "financeAdvice": "Thực hành tiết kiệm, quản lý dòng tiền chặt chẽ, đầu tư vào tài sản hữu hình an toàn."
  },
  "5": {
    "year": 5,
    "name": "Năm Của Biến Chuyển, Tự Do & Bứt Phá Vùng An Toàn",
    "keyword": "Đổi mới, Du lịch, Cơ hội, Bất ngờ",
    "overview": "Đỉnh điểm giữa chu kỳ 9 năm! Cuộc sống của bạn sẽ có những bước ngoặt bất ngờ, nhiều chuyến đi, cơ hội mới và thôi thúc thoát khỏi những điều tù túng, nhàm chán.",
    "careerAdvice": "Sẵn sàng đón nhận thay đổi, thích nghi nhanh với công nghệ và thị trường mới.",
    "loveAdvice": "Nhiều trải nghiệm mới lạ, tuy nhiên tránh đứng núi này trông núi nọ.",
    "financeAdvice": "Cơ hội kiếm tiền nhanh nhưng cũng dễ biến động, cần giữ quỹ dự phòng linh hoạt."
  },
  "6": {
    "year": 6,
    "name": "Năm Của Gia Đình, Yêu Thương & Trách Nhiệm Xã Hội",
    "keyword": "Tổ ấm, Chăm sóc, Trách nhiệm, Hài hòa",
    "overview": "Năng lượng quay về cội nguồn, chăm lo cho cha mẹ, con cái, xây dựng hoặc sửa sang tổ ấm gia đình. Đây là năm của lòng nhân ái, vị tha và sự phụng sự.",
    "careerAdvice": "Phù hợp với các dự án vì cộng đồng, giáo dục, y tế, chăm sóc khách hàng hoặc doanh nghiệp gia đình.",
    "loveAdvice": "Thời điểm vàng để đón thêm thành viên mới, hòa giải bất hòa và gắn kết thâm sâu.",
    "financeAdvice": "Chi tiêu nhiều cho sửa sang nhà cửa, giáo dục và sức khỏe người thân."
  },
  "7": {
    "year": 7,
    "name": "Năm Của Chiêm Nghiệm, Học Hỏi & Nâng Tầm Trí Tuệ",
    "keyword": "Tĩnh lặng, Trí tuệ, Tâm linh, Nghiên cứu",
    "overview": "Một năm hướng nội sâu sắc. Vũ trụ nhắc nhở bạn dừng lại để nhìn lại chặng đường đã qua, học hỏi chuyên sâu, đọc sách, nghiên cứu hoặc khám phá thế giới tâm linh, huyền học.",
    "careerAdvice": "Tập trung nâng cao kiến thức, nâng cấp năng lực lõi thay vì mở rộng kinh doanh rầm rộ.",
    "loveAdvice": "Cần không gian riêng tư cho bản thân; chia sẻ chiều sâu tâm hồn với bạn đời.",
    "financeAdvice": "Tránh đầu cơ rủi ro cao; giữ tiền và đầu tư vào trí tuệ là khoản sinh lời cao nhất."
  },
  "8": {
    "year": 8,
    "name": "Năm Của Thành Tựu, Quyền Lực & Thu Hoạch Tài Chính",
    "keyword": "Tài chính, Thành công, Uy tín, Gặt hái",
    "overview": "Năm đỉnh cao về tiền bạc, địa vị và quyền lực! Mọi nỗ lực chăm chỉ từ các năm trước sẽ được đền đáp xứng đáng bằng danh vọng và tài chính dồi dào.",
    "careerAdvice": "Mở rộng quy mô, đàm phán hợp đồng lớn, khẳng định vị thế dẫn đầu trong ngành.",
    "loveAdvice": "Hài hòa giữa công việc bận rộn và tình cảm; cùng bạn đời định hướng tương lai giàu có.",
    "financeAdvice": "Thời cơ vàng để gia tăng tài sản, chốt lời đầu tư và mở rộng dòng tiền thông minh."
  },
  "9": {
    "year": 9,
    "name": "Năm Của Hoàn Tất, Chuyển Giao & Cho Đi Đại Lượng",
    "keyword": "Khép lại, Buông bỏ, Nhân ái, Tái sinh",
    "overview": "Năm kết thúc chu kỳ 9 năm. Thời điểm buông bỏ những điều không còn phục vụ cho sự phát triển của bạn (công việc cũ, thói quen xấu, mối quan hệ độc hại) để chuẩn bị cho chu kỳ rực rỡ tiếp theo.",
    "careerAdvice": "Hoàn tất các dự án tồn đọng, chuyển giao công việc, dọn dẹp không gian làm việc.",
    "loveAdvice": "Học cách tha thứ, buông bỏ oán hận để trái tim thanh thản đón nhận những điều tốt đẹp.",
    "financeAdvice": "Tích cực làm từ thiện, chia sẻ phúc lành và thanh toán dứt điểm các khoản nợ cũ."
  }
},

attitudeMeanings: {
  "1": { name: "Thái Độ Tiên Phong & Độc Lập", desc: "Bạn phản ứng trước cuộc sống bằng sự chủ động, tự tin và quyết đoán. Không thích dựa dẫm hay bị người khác áp đặt." },
  "2": { name: "Thái Độ Hòa Nhã & Lắng Nghe", desc: "Bạn tiếp cận vấn đề bằng sự thấu cảm, cẩn trọng và tinh thần xây dựng hòa bình. Luôn chú ý đến cảm xúc của đối phương." },
  "3": { name: "Thái Độ Lạc Quan & Hài Hước", desc: "Bạn phản ứng với thế giới bằng nguồn năng lượng tươi vui, nụ cười và sự sáng tạo, giúp xoa dịu mọi căng thẳng xung quanh." },
  "4": { name: "Thái Độ Thực Tế & Kỷ Luật", desc: "Bạn luôn tìm kiếm giải pháp có cơ sở, chi tiết rõ ràng và quy trình trật tự. Không thích sự mơ hồ hoặc liều lĩnh." },
  "5": { name: "Thái Độ Linh Hoạt & Thích Nghi", desc: "Bạn đón nhận thay đổi một cách tự nhiên, tò mò khám phá và nhanh chóng thích nghi với môi trường mới đầy biến động." },
  "6": { name: "Thái Độ Ân Cần & Trách Nhiệm", desc: "Bạn luôn hướng về sự quan tâm, bảo bọc người khác và có xu hướng gánh vác trách nhiệm bảo vệ tổ ấm, đồng nghiệp." },
  "7": { name: "Thái Độ Quan Sát & Phân Tích", desc: "Bạn kín đáo, sâu sắc và luôn dành thời gian quan sát bản chất sự việc trước khi lên tiếng hay đưa ra quyết định." },
  "8": { name: "Thái Độ Bản Lĩnh & Mục Tiêu", desc: "Bạn phản ứng bằng sự tự tin, tập trung vào kết quả thực tế, quyền lực và không bao giờ chùn bước trước nghịch cảnh." },
  "9": { name: "Thái Độ Bao Dung & Lý Tưởng", desc: "Bạn nhìn thế giới bằng con mắt từ bi, rộng lượng và luôn muốn đóng góp giá trị nhân văn cho cộng đồng." }
},

hiddenPassionMeanings: {
  "1": { name: "Khát Khao Dẫn Đầu & Làm Chủ", desc: "Động lực ngầm mãnh liệt thôi thúc bạn trở thành người đứng đầu, tạo ra sự khác biệt và tự quyết định vận mệnh cá nhân." },
  "2": { name: "Đam Mê Hòa Hợp & Tri Kỷ", desc: "Nguyện vọng sâu xa là kiến tạo những mối quan hệ chân thành, hòa bình và sự đồng điệu tâm hồn sâu sắc." },
  "3": { name: "Đam Mê Sáng Tạo & Lan Tỏa", desc: "Nguồn cảm hứng vô tận trong việc thể hiện bản thân qua ngôn từ, nghệ thuật, sân khấu và mang lại niềm vui cho muôn người." },
  "4": { name: "Đam Mê Xây Dựng & Bền Vững", desc: "Khát vọng kiến tạo những hệ thống vững chắc, trật tự và giá trị trường tồn cùng thời gian." },
  "5": { name: "Đam Mê Tự Do & Phiêu Lưu", desc: "Khát khao trải nghiệm không giới hạn, khám phá những chân trời mới và phá vỡ các rào cản gò bó." },
  "6": { name: "Đam Mê Phụng Sự & Hạnh Phúc", desc: "Động lực lớn nhất là chăm sóc, vun vén tổ ấm, nuôi dưỡng và bảo bọc những người bạn yêu thương." },
  "7": { name: "Đam Mê Chân Lý & Huyền Học", desc: "Sự thôi thúc không ngừng trong việc tìm kiếm chân lý vũ trụ, trí tuệ tâm linh và quy luật cuộc đời." },
  "8": { name: "Đam Mê Tài Chính & Quyền Uy", desc: "Khát vọng làm chủ thế giới vật chất, đạt được sự giàu có tột bậc và kiến thiết đế chế kinh doanh hùng mạnh." },
  "9": { name: "Đam Mê Nhân Đạo & Cứu Thế", desc: "Nguyện lực rộng lớn muốn cống hiến cho xã hội, làm từ thiện và nâng đỡ những số phận khó khăn." }
},

balanceMeanings: {
  "1": { name: "Lấy Lại Thăng Bằng Bằng Sự Tự Lực", desc: "Khi đối mặt khủng hoảng, hãy tin tưởng vào bản lĩnh của mình, đứng thẳng lưng và tự mình hành động dứt khoát." },
  "2": { name: "Cân Bằng Qua Sự Hòa Giải", desc: "Tránh đối đầu gay gắt; hãy tìm kiếm sự thỏa hiệp công bằng, lắng nghe và chia sẻ chân thành để giải tỏa căng thẳng." },
  "3": { name: "Cân Bằng Qua Sự Lạc Quan", desc: "Dùng nụ cười, viết lách, hội họa hoặc tâm sự với người bạn tin cậy để giải tỏa áp lực tâm lý tiêu cực." },
  "4": { name: "Cân Bằng Qua Kế Hoạch Cụ Thể", desc: "Lập danh sách việc cần làm, dọn dẹp không gian sống ngăn nắp sẽ giúp tâm trí bạn lập tức bình ổn trở lại." },
  "5": { name: "Cân Bằng Qua Sự Thay Đổi Không Gian", desc: "Đi dạo ngoài trời, du lịch ngắn ngày hoặc thay đổi góc nhìn giúp bạn thoát khỏi bế tắc tinh thần nhanh chóng." },
  "6": { name: "Cân Bằng Qua Tình Yêu Gia Đình", desc: "Trở về bên tổ ấm, nấu một bữa ăn ấm cúng hoặc chăm sóc thú cưng sẽ chữa lành những xáo trộn trong bạn." },
  "7": { name: "Cân Bằng Qua Tĩnh Lặng & Thiền Định", desc: "Rút lui về không gian yên tĩnh một mình, thiền định hoặc đọc sách giúp bạn tái tạo nguồn năng lượng thuần khiết." },
  "8": { name: "Cân Bằng Bằng Tư Duy Thực Tế", desc: "Tập trung vào giải pháp cụ thể thay vì cảm xúc ủy mị; phân định rõ những gì nằm trong tầm kiểm soát." },
  "9": { name: "Cân Bằng Bằng Lòng Tha Thứ", desc: "Buông bỏ oán giận, mở rộng lòng từ bi và tha thứ cho chính mình lẫn người khác để tâm hồn nhẹ nhõm." }
},

subconsciousSelfMeanings: {
  "1": "Cần học cách tự tin hơn khi xảy ra biến cố bất ngờ.",
  "2": "Có xu hướng dựa dẫm vào người khác trong cơn khủng hoảng; cần rèn luyện nội lực.",
  "3": "Phản ứng giàu cảm xúc nhưng đôi khi thiếu kiên định; cần sự tập trung.",
  "4": "Phản ứng thực tế, bám vào quy tắc để vượt qua giông bão an toàn.",
  "5": "Thích nghi nhanh, linh hoạt xoay chuyển tình thế trong nghịch cảnh.",
  "6": "Luôn ưu tiên bảo vệ người thân và đồng đội trước hiểm nguy.",
  "7": "Bình tĩnh rút lui để quan sát, phân tích tình huống thấu đáo trước khi hành động.",
  "8": "Nội lực mạnh mẽ, quyết đoán đứng lên làm chủ tình thế khủng hoảng.",
  "9": "Bản lĩnh toàn diện, thấu hiểu sâu sắc quy luật đời người nên luôn giữ được tâm thái an nhiên trước mọi biến cố."
},

personalMonthMeanings: {
  "1": {
    name: "Tháng Khởi Đầu & Đột Phá Mới",
    theme: "Hành Động · Tiên Phong",
    career: "Khởi động dự án mới, ký kết hợp đồng, chủ động nắm quyền chỉ đạo.",
    finance: "Thời điểm gieo mầm tài chính, tránh chần chừ do dự.",
    caution: "Tự tin nhưng không được độc đoán, lắng nghe góp ý xây dựng."
  },
  "2": {
    name: "Tháng Hợp Tác & Kiên Nhẫn",
    theme: "Ngoại Giao · Gắn Kết",
    career: "Tập trung xây dựng mối quan hệ đối tác, hòa giải mâu thuẫn nội bộ.",
    finance: "Duy trì dòng tiền ổn định, tránh vay mượn hoặc tranh chấp lợi ích.",
    caution: "Kiên nhẫn chờ thời cơ chín muồi, không nên nóng vội ép kết quả."
  },
  "3": {
    name: "Tháng Sáng Tạo & Tỏa Sáng",
    theme: "Lan Tỏa · Nghệ Thuật",
    career: "Rực rỡ trong đàm phán, marketing, thuyết trình và mở rộng tệp khách hàng.",
    finance: "Thu nhập khởi sắc, có thể chi tiêu cho quan hệ ngoại giao và nâng cấp hình ảnh.",
    caution: "Tránh phân tán năng lượng vào quá nhiều sở thích nhất thời."
  },
  "4": {
    name: "Tháng Kỷ Luật & Củng Cố Nền Tảng",
    theme: "Chi Tiết · Trật Tự",
    career: "Hoàn thiện quy trình, rà soát văn bản pháp lý, làm việc bền bỉ chính xác.",
    finance: "Kiểm soát chi phí nghiêm ngặt, tiết kiệm và ưu tiên kênh tích lũy an toàn.",
    caution: "Cẩn thận lao lực quá mức, dành thời gian nghỉ ngơi phục hồi thể lực."
  },
  "5": {
    name: "Tháng Chuyển Biến & Cơ Hội Mới",
    theme: "Tự Do · Đổi Mới",
    career: "Xuất hiện cơ hội hợp tác mới, đi công tác xa hoặc thay đổi chiến lược kinh doanh.",
    finance: "Có lộc bất ngờ từ nguồn mới; tuy nhiên cần tỉnh táo trước cám dỗ rủi ro cao.",
    caution: "Thích ứng linh hoạt nhưng giữ vững kỷ luật tài chính cá nhân."
  },
  "6": {
    name: "Tháng Gia Đạo & Trách Nhiệm Phụng Sự",
    theme: "Yêu Thương · Hài Hòa",
    career: "Gắn kết đội ngũ, tạo dựng môi trường làm việc nhân văn và uy tín vững chắc.",
    finance: "Chi tiêu cho sửa sang nhà cửa, chăm lo sức khỏe người thân và gia đình.",
    caution: "Cân bằng giữa công việc và đời sống cá nhân, tránh ôm đồm việc người khác."
  },
  "7": {
    name: "Tháng Chiêm Nghiệm & Trí Tuệ Tâm Linh",
    theme: "Tĩnh Lặng · Nghiên Cứu",
    career: "Nâng cao năng lực chuyên môn, học hỏi chuyên sâu, tái định hướng mục tiêu tương lai.",
    finance: "Giữ chặt tiền mặt, đầu tư vào tri thức là khoản đầu tư sinh lời lớn nhất.",
    caution: "Tránh tranh cãi thị phi; dành thời gian thiền định và hòa mình vào thiên nhiên."
  },
  "8": {
    name: "Tháng Gặt Hái & Quyền Lực Tài Chính",
    theme: "Thịnh Vượng · Thành Công",
    career: "Thu hoạch kết quả rực rỡ từ nỗ lực nhiều tháng qua; khẳng định vị thế dẫn đầu.",
    finance: "Dòng tiền hanh thông mạnh mẽ, cơ hội ký kết hợp đồng lớn hoặc thu hồi công nợ.",
    caution: "Lãnh đạo công tâm, giữ gìn đạo đức kinh doanh để duy trì phước đức trường tồn."
  },
  "9": {
    name: "Tháng Hoàn Tất & Chuyển Giao Chu Kỳ",
    theme: "Khép Lại · Thanh Lọc",
    career: "Nghiệm thu và đóng gói các dự án cũ, dọn dẹp các mối quan hệ không còn phù hợp.",
    finance: "Quyết toán sổ sách minh bạch, làm việc thiện, phóng sinh tích phúc.",
    caution: "Học cách buông bỏ nhẹ nhàng, sẵn sàng tâm thế đón nhận chu kỳ vận hội mới."
  }
}
  };

  window.TuViNumerologyData = TuViNumerologyData;
})(typeof window !== 'undefined' ? window : this);
