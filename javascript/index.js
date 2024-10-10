$(document).ready(function () {
    // 로컬 스토리지에 데이터가 없으면 초기 데이터를 저장
    
    // 카테고리 데이터
    const categoryData = [
        { category_id: 1, name: "과일/채소" },
        { category_id: 2, name: "축산" },
        { category_id: 3, name: "수산" },
        { category_id: 4, name: "유제품" },
        { category_id: 5, name: "할인상품" }
    ];

    // 상품 데이터
    const productData = [
        { product_id: 1, name: "사과", description: "맛있는 사과", category_id: 1, price: 1000, unit_cost: 800, stock_date: "2023-06-01", image: "./images/food01.png" },
        { product_id: 2, name: "오렌지", description: "맛있는 오렌지", category_id: 1, price: 2000, unit_cost: 1500, stock_date: "2023-06-02", image: "./images/food02.png" },
        { product_id: 3, name: "딸기", description: "맛있는 딸기", category_id: 1, price: 3000, unit_cost: 2500, stock_date: "2023-06-03", image: "./images/food03.png" },
        { product_id: 4, name: "포도", description: "맛있는 포도", category_id: 1, price: 1500, unit_cost: 1200, stock_date: "2023-06-04", image: "./images/food04.png" },
        { product_id: 5, name: "복숭아", description: "맛있는 복숭아", category_id: 1, price: 1500, unit_cost: 1200, stock_date: "2023-06-04", image: "./images/food05.png" },
        { product_id: 6, name: "자두", description: "맛있는 자두", category_id: 1, price: 1500, unit_cost: 1200, stock_date: "2023-06-04", image: "./images/food06.png" },
        { product_id: 7, name: "소갈비", description: "맛있는 소갈비", category_id: 2, price: 1500, unit_cost: 1200, stock_date: "2023-06-04", image: "./images/food10.png" },
        { product_id: 8, name: "삼겹살", description: "맛있는 삼겹살", category_id: 2, price: 1500, unit_cost: 1200, stock_date: "2023-06-04", image: "./images/food11.png" },
        { product_id: 9, name: "채끝살", description: "맛있는 채끝살", category_id: 2, price: 1500, unit_cost: 1200, stock_date: "2023-06-04", image: "./images/food12.png" },
        { product_id: 10, name: "갈빗살", description: "맛있는 갈빗살", category_id: 2, price: 1500, unit_cost: 1200, stock_date: "2023-06-04", image: "./images/food13.png" },
        { product_id: 11, name: "제육볶음", description: "맛있는 제육볶음", category_id: 2, price: 1500, unit_cost: 1200, stock_date: "2023-06-04", image: "./images/food14.png" },
        { product_id: 12, name: "소불고기", description: "맛있는 소불고기", category_id: 2, price: 1500, unit_cost: 1200, stock_date: "2023-06-04", image: "./images/food15.png" }
    ];

    // 로컬 스토리지에 카테고리 데이터가 없으면 저장
    if (!localStorage.getItem("categories")) {
        localStorage.setItem("categories", JSON.stringify(categoryData));
        console.log("카테고리 데이터가 생성되었습니다.");
    }

    // 로컬 스토리지에 상품 데이터가 없으면 저장
    if (!localStorage.getItem("products")) {
        localStorage.setItem("products", JSON.stringify(productData));
        console.log("상품 데이터가 생성되었습니다.");
    }

     // 권한 데이터
    const roles = [
      { roleId: 1, 
        roleName: "USER" 
      },
      { 
        roleId: 2, 
        roleName: "MANAGER" 
      },
      { 
        roleId: 3, 
        roleName: "ADMIN" 
      }
    ];
    // 로컬 스토리지에 권한 데이터가 없으면 저장
    if (!localStorage.getItem("roles")) {
        localStorage.setItem("roles", JSON.stringify(roles));
        console.log("권한 데이터가 생성되었습니다.");
    }

    // admin 계정 생성
    const users = [
      {
        userId: 'dream',
        password: '1234',
        name: '사용자',
        birthDate: '1980-01-01',
        email: 'dream@example.com',
        phone: '010-3334-5678',
        gender: 'F',
        job: 'jbcd01',
        roleId: 1 // USER
      },
      {
        userId: 'manager',
        password: '1234',
        name: '매니저',
        birthDate: '2000-01-01',
        email: 'manager@example.com',
        phone: '010-1111-1234',
        gender: 'F',
        job: 'jbcd02',
        roleId: 2 // MANAGER
      },
      {
        userId: 'admin',
        password: '1234',
        name: '관리자',
        birthDate: '1990-01-01',
        email: 'admin@example.com',
        phone: '010-1111-1234',
        gender: 'M',
        job: 'jbcd03',
        roleId: 3
      }
    ];

    // 로컬 스토리지에 사용자 데이터가 없으면 저장
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users));
        console.log("사용자 데이터가 생성되었습니다.");
    }

    // 상위코드가 로컬스토리지에 없으면 생성(초기화)
    if (!localStorage.getItem("majorCodes")) {
        localStorage.setItem("majorCodes", JSON.stringify(
            [
            { majorCode: "ordr", description: "주문 상태 코드" },
            { majorCode: "prcd", description: "택배 회사 코드" },
            { majorCode: "jbcd", description: "직업 종류 코드" },
            { majorCode: "gndr", description: "성별 코드" },
            // 결제 방법 
            { majorCode: "paym", description: "결제 방법" },
            // 그 외 시스템에서 필요한 상위코드
            // 주문 진행현황
            ]
        ));
    }
    // 하위코드가 로컬스토리지에 없으면 생성(초기화)
    if (!localStorage.getItem("minorCodes")) {
        localStorage.setItem("minorCodes", JSON.stringify([
            //주문현황
            { majorCode: "ordr", minorCode: "ordr01", description: "주문접수" },
            { majorCode: "ordr", minorCode: "ordr02", description: "조리중" },
            { majorCode: "ordr", minorCode: "ordr03", description: "픽업" },
            { majorCode: "ordr", minorCode: "ordr04", description: "배송중" },
            { majorCode: "ordr", minorCode: "ordr05", description: "배송완료" },
            // 택배 회사 코드
            { majorCode: "prcd", minorCode: "prcd01", description: "CJ대한통운" },
            { majorCode: "prcd", minorCode: "prcd02", description: "한진택배" },
            { majorCode: "prcd", minorCode: "prcd03", description: "우체국택배" },
            { majorCode: "prcd", minorCode: "prcd04", description: "로젠택배" },
            { majorCode: "prcd", minorCode: "prcd05", description: "롯데택배" },
            { majorCode: "prcd", minorCode: "prcd06", description: "경동택배" },
            { majorCode: "prcd", minorCode: "prcd07", description: "대한통운" },
            { majorCode: "prcd", minorCode: "prcd08", description: "일양로지스" },
            // 직업 종류 코드
            { majorCode: "jbcd", minorCode: "jbcd01", description: "개발자" },
            { majorCode: "jbcd", minorCode: "jbcd02", description: "회사원" },
            { majorCode: "jbcd", minorCode: "jbcd03", description: "디자이너" },
            { majorCode: "jbcd", minorCode: "jbcd04", description: "전문직" },
            { majorCode: "jbcd", minorCode: "jbcd05", description: "교사" },
            // 성별 코드
            { majorCode: "gndr", minorCode: "M", description: "남성" },
            { majorCode: "gndr", minorCode: "F", description: "여성" },
            // 결제 방법
            { majorCode: "paym", minorCode: "paym01", description: "카드결제" },
            { majorCode: "paym", minorCode: "paym02", description: "무통장입금" },
            { majorCode: "paym", minorCode: "paym03", description: "휴대폰결제" },
            { majorCode: "paym", minorCode: "paym04", description: "카카오페이" },
            { majorCode: "paym", minorCode: "paym05", description: "네이버페이" },
            { majorCode: "paym", minorCode: "paym06", description: "페이코" },
            { majorCode: "paym", minorCode: "paym07", description: "토스" },
            { majorCode: "paym", minorCode: "paym08", description: "신용카드" },
            { majorCode: "paym", minorCode: "paym09", description: "체크카드" },
            { majorCode: "paym", minorCode: "paym10", description: "현금" },
            { majorCode: "paym", minorCode: "paym11", description: "포인트" },
            { majorCode: "paym", minorCode: "paym12", description: "기타" }
        ]));
    }    

    // 게시판 카테고리 데이터
    const boardCategories = [
      { categoryId: 1, name: "공지사항" },
      { categoryId: 2, name: "보도자료" }
    ];
    // 로컬 스토리지에 공지사항 데이터 저장
    if (!localStorage.getItem("boardCategories")) {
      localStorage.setItem("boardCategories", JSON.stringify(boardCategories));
      console.log("게시물 데이터가 생성되었습니다.");
  }
    // 공지사항 데이터
    const boards = [
      // 공지사항 데이터
      { board_id: 1, title: "BC카드 TOP 포인트, 오포인트 제휴 종료 안내", content: "여기는 첫번째 공지사항의 내용입니다.", userId: "dream", hitNo: 10, reg_date: new Date().toISOString(), categoryId: 1},
      { board_id: 2, title: "개인정보처리방침 개정 안내", content: "여기는 두번째 공지사항의 내용입니다.", userId: "dream", hitNo: 20, reg_date: new Date().toISOString(), categoryId: 1},
      { board_id: 3, title: "홈페이지 계정 도용 주의 안내", content: "여기는 세번째 공지사항의 내용입니다.", userId: "dream", hitNo: 30, reg_date: new Date().toISOString(), categoryId: 1},
      { board_id: 4, title: "배달비 무료 깜짝 이벤트 안내", content: "여기는 네번째 공지사항의 내용입니다.", userId: "dream", hitNo: 40, reg_date: new Date().toISOString(), categoryId: 1},
      { board_id: 5, title: "배달비 변경 안내", content: "여기는 다섯번째 공지사항의 내용입니다.", userId: "dream", hitNo: 50, reg_date: new Date().toISOString(), categoryId: 1 },
      // 보도자료 데이터
      { board_id: 6, title: "도미노피자,국군의 날 맞이 '히어로즈데이'진행", content: "여기는 첫번째 보도자료의 내용입니다.", userId: "dream", hitNo: 10, reg_date: new Date().toISOString(), categoryId: 2, image: "./images/food01.png" },
      { board_id: 7, title: "도미노피자,콩콩챁챁 크림 치즈 엣지 출시 및 프로모션 진행", content: "여기는 두번째 보도자료의 내용입니다.", userId: "dream", hitNo: 20, reg_date: new Date().toISOString(), categoryId: 2, image: "./images/food02.png"  },
      { board_id: 8, title: "도미노피자,'SKT T day'프로모션 내일 단 하루 진행", content: "여기는 세번째 보도자료의 내용입니다.", userId: "dream", hitNo: 30, reg_date: new Date().toISOString(), categoryId: 2, image: "./images/food03.png"  },
      { board_id: 9, title: "도미노피자,'슈스K 콰트로 피자' 오늘 출시", content: "여기는 네번째 보도자료의 내용입니다.", userId: "dream", hitNo: 40, reg_date: new Date().toISOString(), categoryId: 2, image: "./images/food03.png"  },
      { board_id: 10, title: "도미노피자,'Fighting Korea 스페셜 딜'프로모션 진행", content: "여기는 다섯번째 보도자료의 내용입니다.", userId: "dream", hitNo: 50, reg_date: new Date().toISOString(), categoryId: 2, image: "./images/food05.png"  }
    ];

    // 로컬 스토리지에 공지사항 데이터 저장
    if (!localStorage.getItem("boards")) {
        localStorage.setItem("boards", JSON.stringify(boards));
        console.log("게시물 데이터가 생성되었습니다.");
    }

    //임의의 주문 데이터 설정
    const orders = [
        { orderId: "9876543211234", userId: "johnDoe", totalOrderAmount: "30000", deliveryAddress: "서울시 강북구 미아로 456", orderDate: "2024-09-30", orderStatus: "ordr01" },
        { orderId: "1234567894321", userId: "janeDoe", totalOrderAmount: "60000", deliveryAddress: "서울시 마포구 상암로 77", orderDate: "2024-10-01", orderStatus: "ordr02" },
        { orderId: "6543219871234", userId: "alice", totalOrderAmount: "75000", deliveryAddress: "서울시 서초구 반포대로 234", orderDate: "2024-09-29", orderStatus: "ordr01" },
        { orderId: "4321567890987", userId: "bob", totalOrderAmount: "45000", deliveryAddress: "서울시 송파구 오금로 123", orderDate: "2024-10-02", orderStatus: "ordr04" },
        { orderId: "3216549871230", userId: "charlie", totalOrderAmount: "120000", deliveryAddress: "서울시 용산구 남산로 77", orderDate: "2024-09-28", orderStatus: "ordr03" }
    ];         

    // 로컬 스토리지에 임의의 주문 데이터 저장
    if (!localStorage.getItem("orders")) {
        localStorage.setItem("orders", JSON.stringify(orders));
    }
});