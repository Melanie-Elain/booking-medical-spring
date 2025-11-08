const hospitalsData = [
    {
        id: 1,
        name: "Bệnh viện Ung Bướu TPHCM",
        slogan: "Trao trọn niềm tin - Trao trọn trái tim",
        specialty: ["Da liễu","Ngoại khoa","Nội khoa","Tiêu hóa","Thần kinh","Tim mạch","Ung bướu","Xương khớp"],
        address: "47 Nguyễn Huy Lượng, Phường Bình Thạnh, TP. Hồ Chí Minh",
        image: "/images/hospital/1.webp",
        imageIntro: ["/images/hospital/profile/1.png","/images/hospital/profile/2.webp","/images/hospital/profile/3.webp","/images/hospital/profile/4.webp","/images/hospital/profile/5.webp"],
        description: "Bệnh viện Lê Văn Thịnh được xây dựng vào năm 2008 với quy mô ban đầu chỉ 60 giường bệnh, thực hiện nghĩa vụ khám, chữa bệnh cho nhân dân trên địa bàn sau 10 năm xây dựng và trưởng thành, Bệnh viện đã có sự “lột xác“ nhanh chóng. Phát triển toàn diện về quy mô, cơ sở hạ tầng nguồn nhân lực và chất lượng khám chữa bệnh. Nhiều kỹ thuật y khoa phức tạp đã được thực hiện ngay tại Bệnh Viện giúp người dân tiết kiện chi phí khám chữa bệnh và giảm tải áp lực cho các bệnh viện tuyến trên.",
        phone: "0285432 7888",
        schedule: [
          { day: "Thứ 2 - Thứ 6", time: "7h30 - 16h30" },
          { day: "Thứ 7 - CN", time: "7h30 - 11h30" },
        ],
        banner: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/blog/benh-vien-ung-buou.webp",


      },
      {
        id: 2,
        name: "Bệnh viện Quân Y 175",
        slogan: "Trao trọn niềm tin - Trao trọn trái tim",
        specialty: ["Ngoại khoa"],
        address: "Số 786 Nguyễn Kiệm, Phường Hạnh Thông, TP. Hồ Chí Minh",
        image: "/images/hospital/2.webp",
        imageIntro: ["/images/hospital/profile/1.png","/images/hospital/profile/2.webp","/images/hospital/profile/3.webp","/images/hospital/profile/4.webp","/images/hospital/profile/5.webp"],
        description: "Bệnh viện Lê Văn Thịnh được xây dựng vào năm 2008 với quy mô ban đầu chỉ 60 giường bệnh, thực hiện nghĩa vụ khám, chữa bệnh cho nhân dân trên địa bàn sau 10 năm xây dựng và trưởng thành, Bệnh viện đã có sự “lột xác“ nhanh chóng. Phát triển toàn diện về quy mô, cơ sở hạ tầng nguồn nhân lực và chất lượng khám chữa bệnh. Nhiều kỹ thuật y khoa phức tạp đã được thực hiện ngay tại Bệnh Viện giúp người dân tiết kiện chi phí khám chữa bệnh và giảm tải áp lực cho các bệnh viện tuyến trên.",
        phone: "0285432 7888",
        schedule: [
          { day: "Thứ 2 - Thứ 6", time: "7h30 - 16h30" },
          { day: "Thứ 7 - CN", time: "7h30 - 11h30" },
        ],
        banner: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/blog/benh-vien-ung-buou.webp",
        
      },
      {
        id: 3,
        name: "Bệnh viện Ung Bướu TPHCM",
        slogan: "Trao trọn niềm tin - Trao trọn trái tim",
        specialty: ["Ung Bướu"],
        address: "47 Nguyễn Huy Lượng, Phường Bình Thạnh, TP. Hồ Chí Minh",
        image: "/images/hospital/3.webp",
        imageIntro: ["/images/hospital/profile/1.png","/images/hospital/profile/2.webp","/images/hospital/profile/3.webp","/images/hospital/profile/4.webp","/images/hospital/profile/5.webp"],
        description: "Bệnh viện Lê Văn Thịnh được xây dựng vào năm 2008 với quy mô ban đầu chỉ 60 giường bệnh, thực hiện nghĩa vụ khám, chữa bệnh cho nhân dân trên địa bàn sau 10 năm xây dựng và trưởng thành, Bệnh viện đã có sự “lột xác“ nhanh chóng. Phát triển toàn diện về quy mô, cơ sở hạ tầng nguồn nhân lực và chất lượng khám chữa bệnh. Nhiều kỹ thuật y khoa phức tạp đã được thực hiện ngay tại Bệnh Viện giúp người dân tiết kiện chi phí khám chữa bệnh và giảm tải áp lực cho các bệnh viện tuyến trên.",
        phone: "0285432 7888",
        schedule: [
          { day: "Thứ 2 - Thứ 6", time: "7h30 - 16h30" },
          { day: "Thứ 7 - CN", time: "7h30 - 11h30" },
        ],
        banner: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/blog/benh-vien-ung-buou.webp",
        
      },
      {
        id: 4,
        name: "Bệnh viện Quân Y 175",
        slogan: "Trao trọn niềm tin - Trao trọn trái tim",
        specialty: ["Ngoại khoa"],
        address: "Số 786 Nguyễn Kiệm, Phường Hạnh Thông, TP. Hồ Chí Minh",
        image: "/images/hospital/4.webp",
        imageIntro: ["/images/hospital/profile/1.png","/images/hospital/profile/2.webp","/images/hospital/profile/3.webp","/images/hospital/profile/4.webp","/images/hospital/profile/5.webp"],
        description: "Bệnh viện Lê Văn Thịnh được xây dựng vào năm 2008 với quy mô ban đầu chỉ 60 giường bệnh, thực hiện nghĩa vụ khám, chữa bệnh cho nhân dân trên địa bàn sau 10 năm xây dựng và trưởng thành, Bệnh viện đã có sự “lột xác“ nhanh chóng. Phát triển toàn diện về quy mô, cơ sở hạ tầng nguồn nhân lực và chất lượng khám chữa bệnh. Nhiều kỹ thuật y khoa phức tạp đã được thực hiện ngay tại Bệnh Viện giúp người dân tiết kiện chi phí khám chữa bệnh và giảm tải áp lực cho các bệnh viện tuyến trên.",
        phone: "0285432 7888",
        schedule: [
          { day: "Thứ 2 - Thứ 6", time: "7h30 - 16h30" },
          { day: "Thứ 7 - CN", time: "7h30 - 11h30" },
        ],
        banner: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/blog/benh-vien-ung-buou.webp",
      },
      {
        id: 5,
        name: "Bệnh viện Ung Bướu TPHCM",
        slogan: "Trao trọn niềm tin - Trao trọn trái tim",
        specialty: ["Ung Bướu"],
        address: "47 Nguyễn Huy Lượng, Phường Bình Thạnh, TP. Hồ Chí Minh",
        image: "/images/hospital/5.webp",
        imageIntro: ["/images/hospital/profile/1.png","/images/hospital/profile/2.webp","/images/hospital/profile/3.webp","/images/hospital/profile/4.webp","/images/hospital/profile/5.webp"],
        description: "Bệnh viện Lê Văn Thịnh được xây dựng vào năm 2008 với quy mô ban đầu chỉ 60 giường bệnh, thực hiện nghĩa vụ khám, chữa bệnh cho nhân dân trên địa bàn sau 10 năm xây dựng và trưởng thành, Bệnh viện đã có sự “lột xác“ nhanh chóng. Phát triển toàn diện về quy mô, cơ sở hạ tầng nguồn nhân lực và chất lượng khám chữa bệnh. Nhiều kỹ thuật y khoa phức tạp đã được thực hiện ngay tại Bệnh Viện giúp người dân tiết kiện chi phí khám chữa bệnh và giảm tải áp lực cho các bệnh viện tuyến trên.",
        phone: "0285432 7888",
        schedule: [
          { day: "Thứ 2 - Thứ 6", time: "7h30 - 16h30" },
          { day: "Thứ 7 - CN", time: "7h30 - 11h30" },
        ],
        banner: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/blog/benh-vien-ung-buou.webp",
      },
      {
        id: 6,
        name: "Bệnh viện Quân Y 175",
        slogan: "Trao trọn niềm tin - Trao trọn trái tim",
        specialty: ["Ngoại khoa"],
        address: "Số 786 Nguyễn Kiệm, Phường Hạnh Thông, TP. Hồ Chí Minh",
        image: "/images/hospital/6.webp",
        imageIntro: ["/images/hospital/profile/1.png","/images/hospital/profile/2.webp","/images/hospital/profile/3.webp","/images/hospital/profile/4.webp","/images/hospital/profile/5.webp"],
        description: "Bệnh viện Lê Văn Thịnh được xây dựng vào năm 2008 với quy mô ban đầu chỉ 60 giường bệnh, thực hiện nghĩa vụ khám, chữa bệnh cho nhân dân trên địa bàn sau 10 năm xây dựng và trưởng thành, Bệnh viện đã có sự “lột xác“ nhanh chóng. Phát triển toàn diện về quy mô, cơ sở hạ tầng nguồn nhân lực và chất lượng khám chữa bệnh. Nhiều kỹ thuật y khoa phức tạp đã được thực hiện ngay tại Bệnh Viện giúp người dân tiết kiện chi phí khám chữa bệnh và giảm tải áp lực cho các bệnh viện tuyến trên.",
        phone: "0285432 7888",
        schedule: [
          { day: "Thứ 2 - Thứ 6", time: "7h30 - 16h30" },
          { day: "Thứ 7 - CN", time: "7h30 - 11h30" },
        ],
        banner: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/blog/benh-vien-ung-buou.webp",
      },
];

export default hospitalsData;