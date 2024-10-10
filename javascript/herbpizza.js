const cartButton = document.querySelector('.cart-button');
const orderButton = document.querySelector('.order-button');
const basePrice = document.querySelector('#basePrice');
const options = document.querySelectorAll('input[type="radio"]');
const subTotalElement = document.querySelector('#subTotal');
const quantityDisplay = document.getElementById('quantity');

let price = Number(basePrice.value);
let quantity = 1;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 원화 표시 함수
function formatKRW(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 수량 증감
function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        quantityDisplay.innerText = quantity;
        calculateTotalPrice();
    }
}

function increaseQuantity() {
    quantity++;
    quantityDisplay.innerText = quantity;
    calculateTotalPrice();
}

// 총 가격 계산
function calculateTotalPrice(){
    let subTotal = price * quantity;
    options.forEach(function(option){
        if(option.checked){
            subTotal += Number(option.value) * quantity;
        }
    });
    subTotalElement.textContent = formatKRW(subTotal);
}

// 옵션 변경 시 총 가격 계산
options.forEach(function(option){
    option.addEventListener('change', calculateTotalPrice);
});

// 장바구니 버튼 클릭 시 스토리지에 저장
cartButton.addEventListener('click', function() {
    // 선택된 옵션을 배열로 저장
    const selectedOptions = [];
    options.forEach(function(option) {
        if (option.checked) {
            selectedOptions.push({
                name: option.parentElement.textContent.trim(), // 옵션 이름
                price: Number(option.value) // 옵션 가격
            });
        }
    });

    // 새로운 장바구니 아이템 생성
    const newItem = {
        id: 'pizza2', // 아이템 고유 ID (예: 피자 이름 등으로 구분 가능)
        name: '허브 피자', // 상품 이름
        basePrice: Number(basePrice.value), // 기본 가격
        options: selectedOptions, // 선택된 옵션들
        quantity: quantity, // 수량
        subTotal: Number(subTotalElement.textContent.replace(/[^\d.]/g, '')) // 최종 합계 금액
    };

    // 장바구니에 같은 상품이 있는지 확인
    const existingItemIndex = cart.findIndex(cartItem => 
        cartItem.id === newItem.id && 
        JSON.stringify(cartItem.options) === JSON.stringify(newItem.options)
    );

    if (existingItemIndex !== -1) {
        // 이미 같은 상품이 있으면 수량만 증가
        cart[existingItemIndex].quantity += newItem.quantity;
        cart[existingItemIndex].subTotal += newItem.subTotal;
    } else {
        // 새로운 상품이면 장바구니에 추가
        cart.push(newItem);
    }

    // 변경된 장바구니 정보 저장
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('상품이 장바구니에 추가되었습니다.');
});

// 장바구니 버튼 클릭 시 장바구니 페이지로 이동
cartButton.addEventListener('click', function() {
    window.location.href = 'cart.html'; // 장바구니 페이지로 이동
});

// 주문하기 버튼 클릭 시 결제 정보를 저장하고 결제 페이지로 이동
orderButton.addEventListener('click', function() {
    const selectedOptions = []; // 선택된 옵션 배열 초기화

    options.forEach(function(option) {
        if (option.checked) {
            selectedOptions.push({
                name: option.parentElement.textContent.trim(), // 옵션 이름
                price: Number(option.value) // 옵션 가격
            });
        }
    });

    const newItem = {
        id: 'pizza2', // 아이템 고유 ID (예: 피자 이름 등으로 구분 가능)
        name: '허브 피자', // 상품 이름
        basePrice: Number(basePrice.value), // 기본 가격
        options: selectedOptions, // 선택된 옵션들
        quantity: quantity, // 수량
        subTotal: Number(subTotalElement.textContent.replace(/[^\d.]/g, '')) // 최종 합계 금액
    };

    localStorage.setItem('newItem', JSON.stringify(newItem));    
    window.location.href = 'payment.html'; // 결제 페이지로 이동    
});

// 추가 스크립트 로드 후 실행되는 함수 
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const cartButton = document.querySelector('button:last-of-type');
    
    form.addEventListener('change', updateTotalPrice); 

    cartButton.addEventListener('click', function(e) {
        e.preventDefault(); 

        const pizzaOrder = { 
            name: '허브 피자',
            size: { 
                type: form.querySelector('select[name="size"]').value,
                price: getOptionPrice(form.querySelector('select[name="size"]'))
            },
            dough: { 
                type: form.querySelector('select[name="dough"]').value,
                price: getOptionPrice(form.querySelector('select[name="dough"]'))
            },
            edge: { 
                type: form.querySelector('select[name="edge"]').value,
                price: getOptionPrice(form.querySelector('select[name="edge"]'))
            },
            topping: { 
                type: form.querySelector('select[name="topping"]').value,
                price: getOptionPrice(form.querySelector('select[name="topping"]'))
            },
            quantity: form.querySelector('input[type="number"]').value,
            sideDish: { 
                type: form.querySelector('select[name="sideDish"]').value,
                price: getOptionPrice(form.querySelector('select[name="sideDish"]'))
            },
            subTotal: parseInt(subTotalElement.textContent)
        };

        localStorage.setItem('currentOrder', JSON.stringify(pizzaOrder));
        window.location.href = 'cart.html'; 
    });

    function updateTotalPrice() { 
        let total = 30000; 
        total += getOptionPrice(form.querySelector('select[name="size"]'));
        total += getOptionPrice(form.querySelector('select[name="dough"]'));
        total += getOptionPrice(form.querySelector('select[name="edge"]'));
        total += getOptionPrice(form.querySelector('select[name="topping"]'));
        total += getOptionPrice(form.querySelector('select[name="sideDish"]'));
        
        total *= parseInt(form.querySelector('input[type="number"]').value);
        
        subTotalElement.textContent = total; 
    }

    function getOptionPrice(selectElement) { 
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        
        const priceText = selectedOption.textContent.match(/\+(\d+)원/);
        
        return priceText ? parseInt(priceText[1]) : 0; 
    }

   updateTotalPrice(); 
});

function addToCart() { 
   const item = { 
       id: Date.now(), 
       name: "허브 피자",
       category: document.querySelector('input[name="dough"]:checked').value,
       size: document.querySelector('input[name="size"]:checked').value,
       edge: document.querySelector('select[name="edge"]').value,
       topping: document.querySelector('select[name="topping"]').value,
       quantity: parseInt(document.querySelector('input[name="quantity"]').value),
       price: calculateTotalPrice() 
   };

   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   cart.push(item);
   localStorage.setItem('cart', JSON.stringify(cart));

   alert('장바구니에 추가되었습니다.'); 
}

document.querySelector('.cart-btn').addEventListener('click', addToCart);

// 주문 처리 함수 
function placeOrder() { 
   const item = createOrderItem(); 
   let cart = JSON.parse(localStorage.getItem('cart')) || []; 
   cart.push(item); 
   localStorage.setItem('cart', JSON.stringify(cart)); 
   alert('주문이 완료되었습니다.'); 
}

function createOrderItem() { 
   return { 
       id: Date.now(), 
       name: "허브 피자", 
       size: document.querySelector('input[name="size"]:checked').value, 
       dough: document.querySelector('input[name="dough"]:checked').value, 
       edge: document.querySelector('select[name="edge"]').value, 
       topping: document.querySelector('select[name="topping"]').value, 
       quantity: parseInt(document.querySelector('input[name="quantity"]').value), 
       side: document.querySelector('select[name="side"]').value, 
       price: parseInt(document.querySelector('.price-box').textContent.replace(/[^0-9]/g, '')) 
   }; 
}

document.querySelector('.order-btn').addEventListener('click', placeOrder);