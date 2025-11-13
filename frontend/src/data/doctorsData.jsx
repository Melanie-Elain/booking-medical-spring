// const doctorsData = [
//     {
//       id: 1,
//       name: "BS. Nguyễn Văn An",
//       specialty: ["Nội tổng quát"],
//       address:"250 Nguyễn Xí, Phường 13, Bình Thạnh, TP.HCM",
//       workplace: "Bệnh viện Đại học Y Dược TP.HCM",
//       image: "/images/doctor/1.webp",
//       experienceYear: 22,
//       schedules: {
//         "Th 2, 03-11": [
//           "17:30 - 17:35",
//           "17:35 - 17:40",
//           "17:40 - 17:45",
//           "18:00 - 18:05",
//           "18:05 - 18:10",
//           "18:10 - 18:15",
//           "18:30 - 18:35",
//           "18:35 - 18:40",
//           "18:40 - 18:45",
//           "18:50 - 18:55",
//         ],
//         "Th 3, 04-11": ["17:30 - 17:35", "17:35 - 17:40", "17:40 - 17:45"],
//         "Th 4, 05-11": ["17:45 - 17:50", "17:50 - 17:55", "17:55 - 18:00"],
//         "Th 5, 06-11": ["18:00 - 18:05", "18:05 - 18:10", "18:10 - 18:15"],
//         "Th 6, 04-11": ["17:30 - 17:35", "17:35 - 17:40", "17:40 - 17:45"],
//         "Th 7, 05-11": ["17:45 - 17:50", "17:50 - 17:55", "17:55 - 18:00"],
//         "Th CN, 06-11": ["18:00 - 18:05", "18:05 - 18:10", "18:10 - 18:15"],
//         "Th 2, 04-11": ["17:30 - 17:35", "17:35 - 17:40", "17:40 - 17:45"],
//         "Th 3, 04-11": ["17:30 - 17:35", "17:35 - 17:40", "17:40 - 17:45"],
//         "Th 4, 05-11": ["17:45 - 17:50", "17:50 - 17:55", "17:55 - 18:00"],
//         "Th 5, 06-11": ["18:00 - 18:05", "18:05 - 18:10", "18:10 - 18:15"],
//         "Th 6, 04-11": ["17:30 - 17:35", "17:35 - 17:40", "17:40 - 17:45"],
//         "Th 7, 05-11": ["17:45 - 17:50", "17:50 - 17:55", "17:55 - 18:00"],
//         "Th CN, 06-11": ["18:00 - 18:05", "18:05 - 18:10", "18:10 - 18:15"],
//       },
//       description:
//         "Bác sĩ Chuyên khoa II Lê Thị Minh Hồng hiện đang là Phó Giám đốc Bệnh viện Nhi Đồng 2. Bác sĩ trực tiếp khám bệnh theo yêu cầu chất lượng cao tại Bệnh Viện Nhi Đồng 2 và phòng khám Nhi khoa (250 Nguyễn Xí, Phường 13, Bình Thạnh, TP.HCM).",
//       trainingProcess:
//         ["Tốt nghiệp Đại học Y khoa Phạm Ngọc Thạch (TTĐT & BDCBYT).","2001: Tốt nghiệp Chuyên Khoa 1 tại Đại học Y Dược TP.HCM.","Tốt nghiệp Chuyên Khoa 2 tại Đại học Y Khoa Phạm Ngọc Thạch."],
//       experience:
//         ["1995 - nay: Bệnh viện Chợ Rẫy",

//         "2013 - nay: Trưởng khoa ngoại niệu tiêu hóa Bệnh viện Chợ Rẫy.",
        
//         "2022 - nay: Phó giám đốc Bệnh viện Chợ Rẫy"]
//     },
//     {
//       id: 2,
//       name: "BS. Trần Thị Bích Ngọc",
//       specialty: ["Da liễu"],
//       address:"250 Nguyễn Xí, Phường 13, Bình Thạnh, TP.HCM",
//       workplace: "Bệnh viện Đại học Y Dược TP.HCM",
//       image: "/images/doctor/2.webp",
//       experienceYear: 15,
//       schedules: {
//         "Th 2, 03-11": [
//           "17:30 - 17:35",
//           "17:35 - 17:40",
//           "17:40 - 17:45",
//           "18:00 - 18:05",
//           "18:05 - 18:10",
//           "18:10 - 18:15",
//           "18:30 - 18:35",
//           "18:35 - 18:40",
//           "18:40 - 18:45",
//           "18:50 - 18:55",
//         ],
//         "Th 3, 04-11": ["17:30 - 17:35", "17:35 - 17:40", "17:40 - 17:45"],
//         "Th 4, 05-11": ["17:45 - 17:50", "17:50 - 17:55", "17:55 - 18:00"],
//         "Th 5, 06-11": ["18:00 - 18:05", "18:05 - 18:10", "18:10 - 18:15"],
//         "Th 6, 04-11": ["17:30 - 17:35", "17:35 - 17:40", "17:40 - 17:45"],
//         "Th 7, 05-11": ["17:45 - 17:50", "17:50 - 17:55", "17:55 - 18:00"],
//         "Th CN, 06-11": ["18:00 - 18:05", "18:05 - 18:10", "18:10 - 18:15"],
//         "Th 2, 04-11": ["17:30 - 17:35", "17:35 - 17:40", "17:40 - 17:45"],
//         "Th 3, 04-11": ["17:30 - 17:35", "17:35 - 17:40", "17:40 - 17:45"],
//         "Th 4, 05-11": ["17:45 - 17:50", "17:50 - 17:55", "17:55 - 18:00"],
//         "Th 5, 06-11": ["18:00 - 18:05", "18:05 - 18:10", "18:10 - 18:15"],
//         "Th 6, 04-11": ["17:30 - 17:35", "17:35 - 17:40", "17:40 - 17:45"],
//         "Th 7, 05-11": ["17:45 - 17:50", "17:50 - 17:55", "17:55 - 18:00"],
//         "Th CN, 06-11": ["18:00 - 18:05", "18:05 - 18:10", "18:10 - 18:15"],
//       },
      
//       description:
//         "Bác sĩ Trần Thị Bích Ngọc có hơn 15 năm kinh nghiệm trong lĩnh vực da liễu, từng tu nghiệp tại Hàn Quốc. Bác sĩ đặc biệt có chuyên môn cao trong điều trị mụn, nám, sẹo rỗ và trẻ hóa da bằng công nghệ laser hiện đại.",
//       trainingProcess:
//         ["Tốt nghiệp Đại học Y khoa Phạm Ngọc Thạch (TTĐT & BDCBYT).","2001: Tốt nghiệp Chuyên Khoa 1 tại Đại học Y Dược TP.HCM.","Tốt nghiệp Chuyên Khoa 2 tại Đại học Y Khoa Phạm Ngọc Thạch."],
//       experience:
//         ["1995 - nay: Bệnh viện Chợ Rẫy",

//         "2013 - nay: Trưởng khoa ngoại niệu tiêu hóa Bệnh viện Chợ Rẫy.",
        
//         "2022 - nay: Phó giám đốc Bệnh viện Chợ Rẫy"]
//     },
//     {
//       id: 3,
//       name: "TS.BS Đào Bùi Quý Quyền", 
//       specialty: ["Nội thận", "Tiết niệu"],
//       address: "201B Nguyễn Chí Thanh, Quận 5, TP.HCM",
//       workplace: "Bệnh viện Chợ Rẫy",
//       image: "/images/doctor/3.webp",
//       experienceYear: 28,
//       schedules: {
//         "Th 2, 03-11": ["17:00 - 17:15", "17:15 - 17:30"],
//         "Th 4, 05-11": ["18:00 - 18:15", "18:15 - 18:30"],
//         "Th 6, 04-11": ["16:00 - 16:15", "16:15 - 16:30"],
//       },
//       description:
//         "Tiến sĩ Bùi Quý Quyền hiện là Trưởng khoa Nội thận - Tiết niệu tại Bệnh viện Chợ Rẫy, nổi tiếng với kỹ thuật phẫu thuật nội soi tiên tiến.",
//       trainingProcess: [
//         "Tốt nghiệp Đại học Y Dược TP.HCM.",
//         "Hoàn thành Tiến sĩ chuyên ngành Ngoại Thận tại Nhật Bản.",
//       ],
//       experience: [
//         "1997 - nay: Khoa Ngoại Thận - Tiết Niệu, Bệnh viện Chợ Rẫy.",
//         "2010 - nay: Trưởng khoa Nội thận - Tiết Niệu.",
//       ],
//     },
  
//     {
//       id: 4,
//       name: "ThS.BS Nguyễn Văn Tiến",
//       specialty: ["Da liễu"],
//       address: "47 Trần Hưng Đạo, Quận 1, TP.HCM",
//       workplace: "Phòng khám Da liễu tư nhân",
//       image: "/images/doctor/4.webp",
//       experienceYear: 15,
//       schedules: {
//         "Th 2, 03-11": ["19:00 - 19:10", "19:10 - 19:20", "19:20 - 19:30"],
//         "Th 7, 05-11": ["09:00 - 09:10", "09:10 - 09:20"],
//         "Th CN, 06-11": ["10:00 - 10:10", "10:10 - 10:20"],
//       },
//       description:
//         "Thạc sĩ Bác sĩ Tiến chuyên điều trị mụn, nám, và các bệnh da liễu thẩm mỹ bằng công nghệ laser tiên tiến.",
//       trainingProcess: [
//         "Tốt nghiệp Thạc sĩ Da liễu, Đại học Y Dược TP.HCM.",
//         "Chứng chỉ Laser và Thẩm mỹ da tại Hàn Quốc.",
//       ],
//       experience: [
//         "2008 - 2015: Bác sĩ Da liễu, Bệnh viện Da Liễu TP.HCM.",
//         "2015 - nay: Phụ trách chuyên môn, Phòng khám Da liễu tư nhân.",
//       ],
//     },
  
//     {
//       id: 5,
//       name: "BS.CKI Lê Đình Công",
//       specialty: ["Tim mạch"],
//       address: "345 Nguyễn Trãi, Quận 5, TP.HCM",
//       workplace: "Bệnh viện Nhân dân 115",
//       image: "/images/doctor/5.webp",
//       experienceYear: 18,
//       schedules: {
//         "Th 2, 03-11": ["07:00 - 07:30", "07:30 - 08:00"],
//         "Th 4, 05-11": ["08:00 - 08:30", "08:30 - 09:00"],
//       },
//       description:
//         "Bác sĩ Chuyên khoa I Lê Đình Công là chuyên gia về siêu âm tim và điều trị các bệnh lý rối loạn nhịp tim. Bác sĩ có kinh nghiệm lâu năm tại Bệnh viện Nhân dân 115.",
//       trainingProcess: [
//         "Tốt nghiệp Bác sĩ Đa khoa, Đại học Y Dược TP.HCM.",
//         "Hoàn thành Chuyên khoa I Tim mạch.",
//       ],
//       experience: [
//         "2005 - nay: Khoa Nội Tim mạch, Bệnh viện Nhân dân 115.",
//         "2015 - nay: Phó trưởng khoa Nội Tim mạch.",
//       ],
//     },
  
//     {
//       id: 6,
//       name: "TS.BS Phan Văn Tài",
//       specialty: ["Ngoại chấn thương", "Cột sống"],
//       address: "123 Hồng Bàng, Quận 5, TP.HCM",
//       workplace: "Bệnh viện Chấn thương Chỉnh hình",
//       image: "/images/doctor/6.webp",
//       experienceYear: 25,
//       schedules: {
//         "Th 3, 04-11": ["14:00 - 14:30", "14:30 - 15:00"],
//         "Th 5, 06-11": ["15:00 - 15:30", "15:30 - 16:00"],
//         "Th 7, 05-11": ["08:00 - 08:30", "08:30 - 09:00"],
//       },
//       description:
//         "Tiến sĩ Bác sĩ Tài là một trong những phẫu thuật viên hàng đầu về chấn thương và các bệnh lý phức tạp về cột sống tại TP.HCM.",
//       trainingProcess: [
//         "Tốt nghiệp Tiến sĩ Y khoa chuyên ngành Ngoại, Học viện Quân Y.",
//         "Đào tạo phẫu thuật cột sống tại Singapore.",
//       ],
//       experience: [
//         "1998 - 2010: Bệnh viện Quân Y 175.",
//         "2010 - nay: Khoa Ngoại Chấn thương, Bệnh viện Chấn thương Chỉnh hình.",
//       ],
//     },
    
//     {
//       id: 7,
//       name: "BS.CKII Nguyễn Thu Hà",
//       specialty: ["Răng hàm mặt"],
//       address: "88 Lý Thường Kiệt, Quận 10, TP.HCM",
//       workplace: "Phòng khám Nha khoa Tâm Đức",
//       image: "/images/doctor/7.webp",
//       experienceYear: 12,
//       schedules: {
//         "Th 2, 03-11": ["18:00 - 18:20", "18:20 - 18:40"],
//         "Th 4, 05-11": ["18:40 - 19:00", "19:00 - 19:20"],
//         "Th 6, 04-11": ["19:20 - 19:40", "19:40 - 20:00"],
//         "Th 7, 05-11": ["08:00 - 08:20", "08:20 - 08:40"],
//       },
//       description:
//         "Bác sĩ chuyên khoa II Nguyễn Thu Hà có kinh nghiệm chuyên sâu về nắn chỉnh nha và nha khoa thẩm mỹ.",
//       trainingProcess: [
//         "Tốt nghiệp Đại học Y Dược TP.HCM.",
//         "Hoàn thành Chuyên khoa II Răng hàm mặt.",
//       ],
//       experience: [
//         "2011 - 2018: Bệnh viện Răng Hàm Mặt Trung Ương.",
//         "2018 - nay: Bác sĩ chính, Phòng khám Nha khoa Tâm Đức.",
//       ],
//     },
//   ];

//   export default doctorsData;
  