$(document).ready(function() {
    // nav 
    $('.navi>li').mouseover(function () {
        $('.submenu').stop().slideDown(500);
        $('#menu_bg').stop().slideDown(500);
    }).mouseout(function () {
        $('.submenu').stop().slideUp(500);
        $('#menu_bg').stop().slideUp(500);
    });
    

    // URL에서 categoryId 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = parseInt(urlParams.get('categoryId'));

    // 로컬 스토리지에서 게시판 데이터 가져오기
    const boards = JSON.parse(localStorage.getItem('boards')) || [];

    // 해당 카테고리의 게시물만 필터링
    const filteredBoards = boards.filter(board => board.categoryId === categoryId);

    // 게시판 제목 설정
    const categoryName = categoryId === 1 ? '공지사항' : '보도자료';
    $('#board-title').text(categoryName);

    // 게시물 목록을 동적으로 테이블에 추가
    filteredBoards.forEach(function(board, index) {
        $('#boardTable tbody').append(`
            <tr>
                <td>${index + 1}</td>
                <td><a href="boardDetail.html?categoryId=${board.categoryId}&board_id=${board.board_id}">${board.title}</a></td>
                <td>${board.userId}</td>
                <td>${board.hitNo}</td>
                <td>${new Date(board.reg_date).toLocaleDateString()}</td>
                <td><a href="boardDetail.html?categoryId=${board.categoryId}&board_id=${board.board_id}">보기</a></td>
            </tr>
        `);
    });
});
