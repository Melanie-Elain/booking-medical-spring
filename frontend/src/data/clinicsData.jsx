const clinicsData = [
    {
      id: 1,
      name: "Shine Clinic By TS.BS Trần Ngọc Ánh since 1987",
      specialty: ["Nhi Khoa", "Sản Phụ Khoa"],
      address: "06 Trương Quyền, P.6, Q.3, TP.HCM",
      image: "/images/clinic/1.webp",
      imageIntro: ["/images/clinic/profile/1.webp","/images/clinic/profile/2.webp","/images/clinic/profile/3.webp"],
      description: "Shine Clinic là tâm huyết của Tiến sĩ – Bác sĩ Trần Ngọc Ánh nhằm thành lập cơ sở điều trị da thẩm mỹ chuyên sâu, đúc kết kinh nghiệm gần 40 năm điều trị cho hàng triệu bệnh nhân. Phối hợp với các công nghệ độc quyền, chính hãng từ tất cả các nơi trên thế giới như: Mỹ, Đức, Pháp, Ý, Hàn Quốc…Nơi đây còn vinh hạnh là phòng khám laser chuẩn châu Âu đầu tiên tại Việt Nam.",

    },
    {
      id: 2,
      name: "SIM Medical Center Tân Phú",
      specialty: ["Nhi Khoa", "Sản Phụ Khoa"],
      address: "Tòa nhà Richstar 2 - RS5, 239-241 Hòa Bình, P. Hiệp Tân, Q. Tân Phú, TP.HCM",
      image: "/images/clinic/2.webp",
      imageIntro: ["/images/clinic/profile/1.webp","/images/clinic/profile/2.webp","/images/clinic/profile/3.webp"],
      description: "Shine Clinic là tâm huyết của Tiến sĩ – Bác sĩ Trần Ngọc Ánh nhằm thành lập cơ sở điều trị da thẩm mỹ chuyên sâu, đúc kết kinh nghiệm gần 40 năm điều trị cho hàng triệu bệnh nhân. Phối hợp với các công nghệ độc quyền, chính hãng từ tất cả các nơi trên thế giới như: Mỹ, Đức, Pháp, Ý, Hàn Quốc…Nơi đây còn vinh hạnh là phòng khám laser chuẩn châu Âu đầu tiên tại Việt Nam.",

    },
    {
      id: 3,
      name: "Phòng khám Nhi Mỹ Mỹ",
      specialty: ["Nhi Khoa", "Sản Phụ Khoa"],
      address: "105/10 Nguyễn Thị Tú, P. Bình Hưng Hòa B, Q. Bình Tân, TP.HCM",
      image: "/images/clinic/3.webp",
      imageIntro: ["/images/clinic/profile/1.webp","/images/clinic/profile/2.webp","/images/clinic/profile/3.webp"],
      description: "Shine Clinic là tâm huyết của Tiến sĩ – Bác sĩ Trần Ngọc Ánh nhằm thành lập cơ sở điều trị da thẩm mỹ chuyên sâu, đúc kết kinh nghiệm gần 40 năm điều trị cho hàng triệu bệnh nhân. Phối hợp với các công nghệ độc quyền, chính hãng từ tất cả các nơi trên thế giới như: Mỹ, Đức, Pháp, Ý, Hàn Quốc…Nơi đây còn vinh hạnh là phòng khám laser chuẩn châu Âu đầu tiên tại Việt Nam.",

    },
    {
      id: 4,
      name: "Phòng khám Nhi Đồng 315 Quận 10",
      specialty: ["Nhi Khoa", "Sản Phụ Khoa"],
      address: "307 Tô Hiến Thành, P.13, Q.10, TP.HCM",
      image: "/images/clinic/4.webp",
      imageIntro: ["/images/clinic/profile/1.webp","/images/clinic/profile/2.webp","/images/clinic/profile/3.webp"],
      description: "Shine Clinic là tâm huyết của Tiến sĩ – Bác sĩ Trần Ngọc Ánh nhằm thành lập cơ sở điều trị da thẩm mỹ chuyên sâu, đúc kết kinh nghiệm gần 40 năm điều trị cho hàng triệu bệnh nhân. Phối hợp với các công nghệ độc quyền, chính hãng từ tất cả các nơi trên thế giới như: Mỹ, Đức, Pháp, Ý, Hàn Quốc…Nơi đây còn vinh hạnh là phòng khám laser chuẩn châu Âu đầu tiên tại Việt Nam.",

    },
    {
      id: 5,
      name: "Phòng khám Đa khoa An Tâm",
      specialty: ["Nhi Khoa", "Sản Phụ Khoa"],
      address: "25 Lê Văn Việt, P. Hiệp Phú, TP. Thủ Đức",
      image: "/images/clinic/5.webp",
      imageIntro: ["/images/clinic/profile/1.webp","/images/clinic/profile/2.webp","/images/clinic/profile/3.webp"],
      description: "Shine Clinic là tâm huyết của Tiến sĩ – Bác sĩ Trần Ngọc Ánh nhằm thành lập cơ sở điều trị da thẩm mỹ chuyên sâu, đúc kết kinh nghiệm gần 40 năm điều trị cho hàng triệu bệnh nhân. Phối hợp với các công nghệ độc quyền, chính hãng từ tất cả các nơi trên thế giới như: Mỹ, Đức, Pháp, Ý, Hàn Quốc…Nơi đây còn vinh hạnh là phòng khám laser chuẩn châu Âu đầu tiên tại Việt Nam.",

    },
    {
    id: 6,
    name: "Phòng khám Nhi Mỹ Mỹ",
    specialty: ["Nhi Khoa", "Sản Phụ Khoa"],
    address: "105/10 Nguyễn Thị Tú, P. Bình Hưng Hòa B, Q. Bình Tân, TP.HCM",
    image: "/images/clinic/6.webp",
    imageIntro: ["/images/clinic/profile/1.webp","/images/clinic/profile/2.webp","/images/clinic/profile/3.webp"],
    description: "Shine Clinic là tâm huyết của Tiến sĩ – Bác sĩ Trần Ngọc Ánh nhằm thành lập cơ sở điều trị da thẩm mỹ chuyên sâu, đúc kết kinh nghiệm gần 40 năm điều trị cho hàng triệu bệnh nhân. Phối hợp với các công nghệ độc quyền, chính hãng từ tất cả các nơi trên thế giới như: Mỹ, Đức, Pháp, Ý, Hàn Quốc…Nơi đây còn vinh hạnh là phòng khám laser chuẩn châu Âu đầu tiên tại Việt Nam.",

    },
    {
    id: 7,
    name: "Phòng khám Nhi Đồng 315 Quận 10",
    specialty: ["Nhi Khoa", "Sản Phụ Khoa"],
    address: "307 Tô Hiến Thành, P.13, Q.10, TP.HCM",
    image: "/images/clinic/7.webp",
    imageIntro: ["/images/clinic/profile/1.webp","/images/clinic/profile/2.webp","/images/clinic/profile/3.webp"],
    description: "Shine Clinic là tâm huyết của Tiến sĩ – Bác sĩ Trần Ngọc Ánh nhằm thành lập cơ sở điều trị da thẩm mỹ chuyên sâu, đúc kết kinh nghiệm gần 40 năm điều trị cho hàng triệu bệnh nhân. Phối hợp với các công nghệ độc quyền, chính hãng từ tất cả các nơi trên thế giới như: Mỹ, Đức, Pháp, Ý, Hàn Quốc…Nơi đây còn vinh hạnh là phòng khám laser chuẩn châu Âu đầu tiên tại Việt Nam.",

    },
    {
    id: 8,
    name: "Phòng khám Đa khoa An Tâm",
    specialty: ["Nhi Khoa", "Sản Phụ Khoa"],
    address: "25 Lê Văn Việt, P. Hiệp Phú, TP. Thủ Đức",
    image: "/images/clinic/3.webp",
    imageIntro: ["/images/clinic/profile/1.webp","/images/clinic/profile/2.webp","/images/clinic/profile/3.webp"],
    description: "Shine Clinic là tâm huyết của Tiến sĩ – Bác sĩ Trần Ngọc Ánh nhằm thành lập cơ sở điều trị da thẩm mỹ chuyên sâu, đúc kết kinh nghiệm gần 40 năm điều trị cho hàng triệu bệnh nhân. Phối hợp với các công nghệ độc quyền, chính hãng từ tất cả các nơi trên thế giới như: Mỹ, Đức, Pháp, Ý, Hàn Quốc…Nơi đây còn vinh hạnh là phòng khám laser chuẩn châu Âu đầu tiên tại Việt Nam.",

    },
  ];

export default clinicsData;
