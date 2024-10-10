// 원화 표시 함수
function formatKRW(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 장바구니 아이템을 저장할 배열
let cart = [];

// 무료 배송 기준 금액과 배송비 설정
const FREE_SHIPPING_THRESHOLD = 50000;
const SHIPPING_FEE = 3000;

// 현재 수정 중인 아이템의 인덱스 (모달에서 사용)
let currentEditIndex = -1;

// 페이지 로드 시 실행될 함수
window.onload = function() {
    loadCart(); // 저장된 장바구니 정보 불러오기
    displayCartItems(); // 장바구니 아이템 화면에 표시
    setupEventListeners(); // 이벤트 리스너 설정
};

// localStorage에서 장바구니 정보를 불러오는 함수
function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

// 장바구니 정보를 localStorage에 저장하는 함수
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 장바구니 아이템을 화면에 표시하는 함수
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // 기존 내용 초기화

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="item-content">

            <input type="checkbox" id="checkbox-${index}" class="item-checkbox" checked>
            <label for="checkbox-${index}" class="item-checkbox-label"></label>
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-options">${item.options.map((option, index) => 
                        `${option.name}${index < item.options.length - 1 ? ' <br>' : ''}`
                      ).join('')}</p>
                    <p class="item-quantity">${formatKRW(item.quantity)} 개</p>
                    <p class="item-total">총 ${formatKRW(item.subTotal)}원</p>
                </div>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editItem(${index})">수정</button>
                <button class="item-delete-btn" onclick="removeItem(${index})">삭제</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    updateOrderSummary();
}

// 주문 요약 정보 업데이트 함수
function updateOrderSummary() {
    let subTotal = 0;
    const checkboxes = document.querySelectorAll('.item-checkbox');
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            subTotal += cart[index].subTotal;
        }
    });

    const shippingFee = subTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const totalPrice = subTotal + shippingFee;

    document.getElementById('subTotal').textContent = `${formatKRW(subTotal)}원`;
    document.getElementById('shipping-fee').textContent = `${formatKRW(shippingFee)}원`;
    document.getElementById('totalPrice').textContent = `${formatKRW(totalPrice)}원`;
    const orderButton = document.getElementById('order-button');
    orderButton.disabled = subTotal === 0;
}

// 아이템 삭제 함수
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCartItems();
}

// 아이템 수정 함수 (모달 열기)
function editItem(index) {
    currentEditIndex = index;
    const item = cart[index];
    document.getElementById('editCategory').value = item.category;
    document.getElementById('editSize').value = item.size;
    document.getElementById('editQuantity').value = item.quantity;
    document.getElementById('editModal').style.display = 'block';
}

// 모달에서 수정 내용 저장
function saveEdit() {
    const item = cart[currentEditIndex];
    item.category = document.getElementById('editCategory').value;
    item.size = document.getElementById('editSize').value;
    item.quantity = parseInt(document.getElementById('editQuantity').value);
    
    saveCart();
    displayCartItems();
    closeModal();
}

// 모달 닫기
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

// 전체 선택 함수
function selectAllItems() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    const selectAllBtn = document.getElementById('select-all-btn');
    
    const isChecked = selectAllBtn.textContent === '전체 선택';

    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });

    selectAllBtn.textContent = isChecked ? '전체 해제' : '전체 선택';
    
    updateOrderSummary();
}

// 선택 삭제 함수
function deleteSelectedItems() {
    cart = cart.filter((item, index) => {
        const checkbox = document.querySelectorAll('.item-checkbox')[index];
        return !checkbox.checked;
    });
    
    saveCart();
    displayCartItems();
}

// 주문하기 함수
function placeOrder() {
    const selectedItems = cart.filter((item, index) => {
        const checkbox = document.querySelectorAll('.item-checkbox')[index];
        return checkbox.checked;
    });

    if (selectedItems.length > 0) {
        const orderSummary = {
            items: selectedItems,
            subTotal: parseInt(document.getElementById('subTotal').textContent.replace(/[^0-9]/g, '')),
            shippingFee: parseInt(document.getElementById('shipping-fee').textContent.replace(/[^0-9]/g, '')),
            totalPrice: parseInt(document.getElementById('totalPrice').textContent.replace(/[^0-9]/g, ''))
        };
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
        localStorage.removeItem('newItem');
        window.location.href = 'payment.html';
    } else {
        alert("선택된 상품이 없습니다.");
    }
}

// 이벤트 리스너 설정
function setupEventListeners() {
    document.getElementById('select-all-btn').addEventListener('click', selectAllItems);
    document.getElementById('select-delete-btn').addEventListener('click', deleteSelectedItems);
    document.getElementById('order-button').addEventListener('click', placeOrder);
    // 체크박스 변경 이벤트 리스너 추가
    document.getElementById('cart-items').addEventListener('change', function(e) {
        if (e.target.classList.contains('item-checkbox')) {
            updateOrderSummary();
        }
    });
}