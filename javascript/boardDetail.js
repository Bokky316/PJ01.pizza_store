$(document).ready(function() {
    // nav 
    $('.navi>li').mouseover(function () {
        $('.submenu').stop().slideDown(500);
        $('#menu_bg').stop().slideDown(500);
    }).mouseout(function () {
        $('.submenu').stop().slideUp(500);
        $('#menu_bg').stop().slideUp(500);
    });
    
    // URL에서 categoryId와 board_id 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = parseInt(urlParams.get('board_id'));

    // 로컬 스토리지에서 게시판 데이터 가져오기
    const boards = JSON.parse(localStorage.getItem('boards')) || [];

    // 해당 board_id에 맞는 게시물 찾기
    const board = boards.find(b => b.board_id === boardId);

    if (board) {
        // #board-title에 카테고리 이름 출력
        const categoryName = board.categoryId === 1 ? '공지사항' : '보도자료';
        $('#board-title').text(categoryName);
        
        // 게시물 상세 정보 출력
        $('#board-detail').append(`
            <div class="board-item-detail">
                <h3>${board.title}</h3>
                <p><strong>작성자:</strong> ${board.userId}</p>
                <p><strong>작성일:</strong> ${new Date(board.reg_date).toLocaleDateString()}</p>
                <p><strong>조회수:</strong> ${board.hitNo}</p>
                <p><strong>내용:</strong></p>
                <p>${board.content}</p>
            </div>
        `);

        // 조회수 증가
        board.hitNo += 1;
        // 로컬 스토리지에 업데이트된 게시물 저장
        localStorage.setItem('boards', JSON.stringify(boards));
    } else {
        $('#board-detail').html("<p>게시물을 찾을 수 없습니다.</p>");
    }
});
