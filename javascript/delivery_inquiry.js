// localStorage에서 주문과 상태 코드 가져오기
const orders = JSON.parse(localStorage.getItem('orders')) || [];
const minorCodes = JSON.parse(localStorage.getItem('minorCodes')) || [];




// 임의의 주문 데이터 설정
// const orders = [
//     { orderId: "9876543211234", userId: "johnDoe", totalOrderAmount: "30000", deliveryAddress: "서울시 강북구 미아로 456", orderDate: "2024-09-30", orderStatus: "ordr01" },
//     { orderId: "1234567894321", userId: "janeDoe", totalOrderAmount: "60000", deliveryAddress: "서울시 마포구 상암로 77", orderDate: "2024-10-01", orderStatus: "ordr02" },
//     { orderId: "6543219871234", userId: "alice", totalOrderAmount: "75000", deliveryAddress: "서울시 서초구 반포대로 234", orderDate: "2024-09-29", orderStatus: "ordr01" },
//     { orderId: "4321567890987", userId: "bob", totalOrderAmount: "45000", deliveryAddress: "서울시 송파구 오금로 123", orderDate: "2024-10-02", orderStatus: "ordr04" },
//     { orderId: "3216549871230", userId: "charlie", totalOrderAmount: "120000", deliveryAddress: "서울시 용산구 남산로 77", orderDate: "2024-09-28", orderStatus: "ordr03" }
// ];
// // localStorage에 저장
// localStorage.setItem('orders', JSON.stringify(orders));


// // 주문 상태 코드 설정
// const minorCodes = [
//     { majorCode: "ordr", minorCode: "ordr01", description: "주문접수" },
//     { majorCode: "ordr", minorCode: "ordr02", description: "조리중" },
//     { majorCode: "ordr", minorCode: "ordr03", description: "픽업" },
//     { majorCode: "ordr", minorCode: "ordr04", description: "배송중" },
//     { majorCode: "ordr", minorCode: "ordr05", description: "배송완료" }
// ];
// // localStorage에 상태 코드 저장
// localStorage.setItem('minorCodes', JSON.stringify(minorCodes));






// 주문 상태 조회 함수
function checkOrderStatus() {
    event.preventDefault(); 
    const orderId = document.getElementById('orderIdInput').value;
    const order = orders.find(o => o.orderId === orderId);

    const orderStatusDiv = document.getElementById('orderStatus');
    if (order) {
        orderStatusDiv.innerHTML = `
            <h3>${order.userId}님의 주문 현황입니다.</h3>
            <p><span>주문번호</span> : ${order.orderId}</p>
            <p><span>주문현황</span> : ${getStatusDescription(order.orderStatus)}</p>
        `;
    } else {
        orderStatusDiv.innerHTML = '<p>주문번호를 찾을 수 없습니다.</p>';
    }
}

// 주문 상태 설명 가져오기
function getStatusDescription(statusCode) {
    const status = minorCodes.find(code => code.minorCode === statusCode);
    return status ? status.description : '알 수 없는 상태';
}