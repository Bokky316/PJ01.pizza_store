// 전역 변수 선언
let orderItems = [];  // 주문 아이템 목록
let subTotal = 0;   // 상품 금액
let totalPrice = 0; // 총 주문 금액
let registeredInfo = {};  // 등록된 사용자 정보
let newInfo = {};  // 새로 입력한 사용자 정보

const FREE_SHIPPING_THRESHOLD = 50000;
const SHIPPING_FEE = 3000;

// 원화 표시 함수
function formatKRW(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 페이지 로드 시 실행되는 함수
window.onload = function() {
    loadOrderItems();
    //loadUserInfo();
    displayOrderItems();
    setupInfoOptionListeners();
    setupPhoneInputListeners();
    setupInputValidation();
};

// localStorage에서 주문 아이템 로드
function loadOrderItems() {
    // 장바구니 페이지에서 저장한 데이터
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    
    // 주문 페이지에서 저장한 데이터
    const orderItem = JSON.parse(localStorage.getItem('newItem'));
    
    //주문or장바구니
    if (orderItem) {
        orderItems = [orderItem];
    } else {
        orderItems = selectedItems;
    }

    if (orderItems.length === 0) {
        alert('선택된 상품이 없습니다. 장바구니 페이지로 이동합니다.');
        window.location.href = 'cart.html';
    }
}

// 주문 아이템을 화면에 표시
function displayOrderItems() {
    const tbody = document.querySelector('#order-items tbody');
    tbody.innerHTML = '';
    subTotal = 0;
    
    orderItems.forEach(item => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.options.map((option, index) => 
                `${option.name}${index < item.options.length - 1 ? ' / ' : ''}`
            ).join('')}</td>
            <td>${item.quantity} 개</td>
            <td>총 ${formatKRW(item.subTotal)}원</td>
        `;
        subTotal += item.subTotal;
    });

    const shippingFee = subTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    totalPrice = subTotal + shippingFee;
    // 총 주문 금액 표시
    document.getElementById('shipping-fee').textContent = `${formatKRW(shippingFee)}원`;
    document.getElementById('totalPrice').textContent = `${formatKRW(totalPrice)}원`;
}

// 폼 제출 처리
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }
    
    const formData = new FormData(this);
    const orderData = Object.fromEntries(formData.entries());
    
    orderData.items = orderItems;
    orderData.totalPrice = totalPrice;
    
    console.log('주문 데이터:', orderData);
    
    if (!orderData.paymentMethod) {
        alert('결제 수단을 선택해주세요.');
        return;
    }
    
    alert('결제가 완료되었습니다!');
    
    // 두 스토리지 모두 정리
    localStorage.removeItem('selectedItems');
    localStorage.removeItem('newItem');
    
    window.location.href = 'order-confirmation.html';
});

// 폼 유효성 검사 함수
function validateForm() {
    const requiredFields = ['name', 'phone1', 'phone2', 'phone3', 'address', 'detailAddress'];
    let isValid = true;

    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            isValid = false;
            element.classList.add('error');
        } else {
            element.classList.remove('error');
        }
    });

    if (!isValid) {
        alert('모든 필수 정보를 입력해주세요.');
        return false;
    }

    // 전화번호 형식 검증
    const phone1 = document.getElementById('phone1').value;
    const phone2 = document.getElementById('phone2').value;
    const phone3 = document.getElementById('phone3').value;
    if (phone1.length < 2 || phone2.length < 3 || phone3.length < 4) {
        alert('올바른 전화번호 형식을 입력해주세요.');
        return false;
    }

    return true;
}

// 입력 필드 변경 시 유효성 검사
function setupInputValidation() {
    const inputFields = document.querySelectorAll('#checkout-form input, #checkout-form select');
    inputFields.forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}