import React, { useContext, useState } from 'react';
import { Modal, Button } from 'antd';
import { BiBorderBottom } from 'react-icons/bi';
import { ThemeContext } from '../context/ThemeContext';

const destinations = [
    {
        name: "Vũng Tàu",
        image: "https://advmotorcycletours.com/wp-content/uploads/2016/10/vungtaucity.jpg",
        description: "Vũng Tàu là một thành phố ven biển nổi tiếng với bãi biển đẹp và các món hải sản.",
        tips: [
            "Thời điểm lý tưởng để tham quan là từ tháng 12 đến tháng 4.",
            "Đừng quên thưởng thức hải sản tươi sống và các món đặc sản như bánh khọt.",
            "Những địa điểm không thể bỏ qua bao gồm Tượng Chúa Ki-tô và Ngọn Hải Đăng Vũng Tàu.",
            "Nên đi vào các ngày trong tuần để tránh đông đúc vào cuối tuần.",
            "Chú ý an toàn khi tắm biển và đi tàu thuyền."
        ]
    },
    {
        name: "Đà Nẵng",
        image: "https://img.freepik.com/premium-photo/danang-dragon-bridge-vietnam_78361-10281.jpg",
        description: "Đà Nẵng nổi tiếng với bãi biển Mỹ Khê và cầu Rồng.",
        tips: [
            "Tham quan Bà Nà Hills và cầu Vàng.",
            "Thời điểm tốt nhất để đến Đà Nẵng là từ tháng 5 đến tháng 8.",
            "Thưởng thức mì quảng và bánh tráng cuốn thịt heo.",
            "Hãy đến Hội An, chỉ cách Đà Nẵng khoảng 30 phút lái xe, để khám phá phố cổ.",
            "Nên thử đi cáp treo lên Bà Nà để chiêm ngưỡng toàn cảnh thành phố."
        ]
    },
    {
        name: "Hà Nội",
        image: "https://www.vietvisiontravel.com/wp-content/uploads/2017/06/Hoan-Kiem-Lake-in-Hanoi.jpg",
        description: "Thủ đô Hà Nội mang đậm nét văn hóa lịch sử và có nhiều món ăn đặc sắc.",
        tips: [
            "Khám phá Phố Cổ và Hồ Gươm vào buổi sáng để tận hưởng không khí trong lành.",
            "Nên thử phở Hà Nội, bánh mì và các món ăn vặt đường phố.",
            "Tham quan các di tích lịch sử như Văn Miếu và Lăng Bác.",
            "Hãy mang theo ô hoặc áo mưa trong mùa mưa từ tháng 5 đến tháng 10.",
            "Tham gia các lễ hội truyền thống nếu bạn có cơ hội, như Tết Nguyên Đán hay Giỗ Tổ Hùng Vương."
        ]
    },
    {
        name: "Hội An",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Ph%E1%BB%91_c%E1%BB%95_H%E1%BB%99i_An_-_NKS.jpg/1920px-Ph%E1%BB%91_c%E1%BB%95_H%E1%BB%99i_An_-_NKS.jpg",
        description: "Hội An là một thành phố cổ với kiến trúc độc đáo và ẩm thực phong phú.",
        tips: [
            "Thời điểm tốt nhất để đến Hội An là vào mùa khô, từ tháng 2 đến tháng 8.",
            "Nên thử cao lầu, bánh bao và các món ăn từ hải sản.",
            "Đi dạo ở Phố Cổ vào buổi tối để thưởng thức đèn lồng và không khí lãng mạn.",
            "Tham gia lớp học nấu ăn để học cách chế biến các món ăn đặc sản.",
            "Hãy ghé thăm các bãi biển gần đó như An Bàng và Cửa Đại."
        ]
    },
    {
        name: "Phú Quốc",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bai-sao-phu-quoc-tuonglamphotos.jpg/1920px-Bai-sao-phu-quoc-tuonglamphotos.jpg",
        description: "Phú Quốc là hòn đảo lớn nhất Việt Nam với bãi biển tuyệt đẹp và resort sang trọng.",
        tips: [
            "Tham quan các bãi biển như Bãi Sao và Bãi Dài.",
            "Nên thử các món hải sản tươi ngon, đặc biệt là ghẹ và nhum biển.",
            "Thời điểm lý tưởng để đến Phú Quốc là từ tháng 11 đến tháng 3.",
            "Tham gia tour khám phá các hòn đảo xung quanh bằng tàu thuyền.",
            "Đừng bỏ lỡ cơ hội thăm Vườn Quốc Gia Phú Quốc để tận hưởng thiên nhiên hoang sơ."
        ]
    },
    {
        name: "Nha Trang",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Nha_Trang%2C_Kh%C3%A1nh_H%C3%B2a.png",
        description: "Nha Trang nổi tiếng với bãi biển đẹp và các hoạt động thể thao dưới nước.",
        tips: [
            "Tham quan Vinpearl Land và khu tắm bùn để trải nghiệm thư giãn.",
            "Nên thử các món ăn đặc sản như bún cá và nem nướng.",
            "Thời gian lý tưởng để đến Nha Trang là từ tháng 1 đến tháng 9.",
            "Đặt phòng khách sạn ở gần bãi biển để dễ dàng di chuyển.",
            "Tham gia các hoạt động thể thao nước như lặn biển và lướt ván."
        ]
    },
    {
        name: "Đà Lạt",
        image: "https://media-cdn-v2.laodong.vn/storage/newsportal/2024/10/5/1403792/Thanh-Pho-Da-Lat.jpg?w=800&crop=auto&scale=both",
        description: "Đà Lạt là thành phố ngàn hoa với khí hậu mát mẻ và phong cảnh thiên nhiên tuyệt đẹp.",
        tips: [
            "Nên thăm quan Hồ Xuân Hương và Thung Lũng Tình Yêu vào buổi sáng sớm.",
            "Thời điểm lý tưởng để đến Đà Lạt là từ tháng 11 đến tháng 4.",
            "Thưởng thức các món ăn như bánh căn và dâu tây.",
            "Tham gia các hoạt động như đi xe đạp leo núi và trekking.",
            "Khám phá các khu chợ đêm để tìm mua đặc sản và quà lưu niệm."
        ]
    },
    {
        name: "Sa Pa",
        image: "https://cdn.getyourguide.com/img/location/54b5541e17427.jpeg/88.jpg",
        description: "Sa Pa nổi tiếng với cảnh đẹp núi non hùng vĩ và văn hóa của các dân tộc thiểu số.",
        tips: [
            "Nên trekking đến đỉnh Fansipan và thăm các bản làng như Tả Van và Lao Chải.",
            "Thời điểm tốt nhất để đến Sa Pa là từ tháng 9 đến tháng 11.",
            "Nên thử các món ăn như thắng cố và cá hồi.",
            "Chú ý thời tiết vì có thể lạnh vào buổi tối, đặc biệt là vào mùa đông.",
            "Tham gia các hoạt động văn hóa như chợ phiên ở các bản làng."
        ]
    },
    {
        name: "Tây Ninh",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/CaoDaiMain.jpg/1280px-CaoDaiMain.jpg",
        description: "Tây Ninh nổi tiếng với núi Bà Đen và là trung tâm của đạo Cao Đài.",
        tips: [
            "Núi Bà Đen là điểm đến hấp dẫn cho những ai thích leo núi và ngắm cảnh.",
            "Đừng bỏ qua cơ hội tham quan Tòa Thánh Cao Đài, công trình kiến trúc độc đáo và trung tâm tôn giáo lớn của Tây Ninh.",
            "Thời điểm lý tưởng để tham quan Tây Ninh là từ tháng 12 đến tháng 4 khi thời tiết khô ráo và mát mẻ.",
            "Thưởng thức các món đặc sản như bánh canh Trảng Bàng và bánh tráng phơi sương.",
            "Nên đi cáp treo hoặc máng trượt lên đỉnh núi Bà Đen để tiết kiệm thời gian và có trải nghiệm thú vị."
        ]
    },
];

function TravelDestinations() {
    const [visible, setVisible] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const { isDarkTheme } = useContext(ThemeContext);

    const showModal = (destination) => {
        setSelectedDestination(destination);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        setSelectedDestination(null);
    };

    const sortedDestinations = destinations.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div style={{ ...styles.container, backgroundImage: !isDarkTheme ? 'url(images/1.jpg)' : 'url(images/1_2.jpg)', }}>
            <h1 style={{ ...styles.title, color: isDarkTheme ? '#F9F1AA' : '#195F98' }}>Mẹo du lịch tại một số địa điểm</h1>
            <div style={styles.cardContainer}>
                {sortedDestinations.map((destination, index) => (
                    <div key={index} style={{ ...styles.card, backgroundImage: !isDarkTheme ? 'url(images/1.jpg)' : 'url(images/1_2.jpg)', }} onClick={() => showModal(destination)}>
                        <img src={destination.image} alt={destination.name} style={styles.cardImage} />
                        <h3 style={{ ...styles.cardTitle, color: isDarkTheme ? '#F9F1AA' : '#195F98' }} onClick={() => showModal(destination)}>{destination.name}</h3>
                        <p style={{ ...styles.cardDescription, color: isDarkTheme ? '#fff' : '#111' }}>{destination.description}</p>
                    </div>
                ))}
            </div>
            <Modal
                title={selectedDestination?.name}
                open={visible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Đóng
                    </Button>
                ]}
            >
                <h4>Mô tả:</h4>
                <p>{selectedDestination?.description}</p>
                <h4>Các mẹo du lịch:</h4>
                <ul>
                    {selectedDestination?.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#800080',
    },
    title: {
        fontSize: '32px',
        fontWeight: '650',
        marginBottom: '30px',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '20px',
    },
    card: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '15px',
        width: '30%',
        textAlign: 'center',
        cursor: 'pointer',
        transition: '0.3s',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
    cardTitle: {
        fontSize: '24px',
        fontWeight: '650',
        marginTop: '15px',
        color: '#800080',
        fontWeight: 'bold'
    },
    cardDescription: {
        fontSize: '14px',
        color: '#333',
        marginTop: '5px',
        fontWeight: 'bold'
    },
};

export default TravelDestinations;
