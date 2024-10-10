$(document).ready(function () {
    // URL의 쿼리스트링에서 category_id 가져오기
    // URLSearchParams : URL의 쿼리스트링을 다루는 객체
    // window.location.search : 현재 URL의 쿼리스트링을 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = parseInt(urlParams.get("category_id"), 10); // category_id를 정수로 변환

    // 로컬스토리지에서 상품 데이터 가져오기
    const productData = JSON.parse(localStorage.getItem("products")) || [];

    // 해당 카테고리의 상품 필터링
    const filteredProducts = productData.filter(
      (product) => product.category_id === categoryId
    );

    // 상품 목록을 담을 요소 가져오기
    const productList = $("#productList");

    // 해당 카테고리 상품이 있을 경우 화면에 출력
    if (filteredProducts.length > 0) {
      filteredProducts.forEach((product) => {
        const productCard = `
          <div class="product-card">
            <a href="productDetail.html?product_id=${product.product_id}">
              <img src="${product.image}" alt="${product.name}">
              <p>${product.name}</p>
              <p>가격: ￦${product.price}</p>
              <p>입고일: ${product.stock_date}</p>
            </a>
          </div>
        `;
        productList.append(productCard);
      });
    } else {
      // 해당 카테고리에 상품이 없을 경우 메시지 출력
      productList.append("<p>해당 카테고리에 상품이 없습니다.</p>");
    }

    // 로그인 상태 확인 및 헤더 메뉴 변경
    // localStorage.getItem("currentUser") : 해당 정보가 없으면 결과로 null을 반환
    // JSON.parse(null) : null을 변환하면 null을 반환
    const currentUsers = JSON.parse(localStorage.getItem("currentUsers")) || [];
    if(currentUsers.length > 0) {
      const currentUser = currentUsers[0]; // 첫 번째 사용자를 현재 로그인 사용자로 간주
    
      $("#signupLink, #loginLink").hide(); // 회원가입, 로그인 버튼 감추기
      $("#logoutLink").show(); // 로그아웃 버튼 보이기
      $("#welcomeMessage").html(`${currentUser.userId}님`).show(); // 사용자 아이디 표시

      // roleId가 2 이상인 경우 관리자 메뉴 보이기
      if (currentUser.roleId >= 2) {
        $("#adminLink").show();
      }
    }

    // 로그아웃 버튼 클릭 시 로그아웃 처리
    $("#logoutLink").on("click", function () {
      localStorage.removeItem("currentUsers"); // 로그아웃 시 currentUsers 제거
      alert("로그아웃 되었습니다.");
      location.reload(); // 페이지 새로고침
    });
  });