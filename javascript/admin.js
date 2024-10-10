$(document).ready(function() {

    // 직업 및 권한 데이터
    var minorCodes = JSON.parse(localStorage.getItem("minorCodes")) || [];
    var roles = JSON.parse(localStorage.getItem("roles")) || [];

    // 성별 데이터
    var genderCodes = [
        { majorCode: "gndr", minorCode: "M", description: "남성" },
        { majorCode: "gndr", minorCode: "F", description: "여성" }
    ];

    // 직업 목록 필터링 (majorCode가 jbcd인 항목들)
    var jobCodes = minorCodes.filter(code => code.majorCode === 'jbcd');

    // Load user data
    loadUsers();
    // Load order data
    loadOrders();

    // Function to load users
    function loadUsers() {
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // 사용자 목록 테이블에 추가
        users.forEach(function (user, index) {
            var jobOptions = jobCodes.map(function (job) {
                return `<option value="${job.minorCode}" ${job.minorCode === user.job ? 'selected' : ''}>${job.description}</option>`;
            }).join("");

            var roleOptions = roles.map(function (role) {
                return `<option value="${role.roleId}" ${role.roleId == user.roleId ? 'selected' : ''}>${role.roleName}</option>`;
            }).join("");

            var genderOptions = genderCodes.map(function (gender) {
                return `<option value="${gender.minorCode}" ${gender.minorCode === user.gender ? 'selected' : ''}>${gender.description}</option>`;
            }).join("");

            $('#userTable tbody').append(`
                <tr data-index="${index}">
                    <td>${user.userId}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>
                        <select>
                            ${genderOptions}
                        </select>
                    </td>
                    <td>
                        <select>
                            ${jobOptions}
                        </select>
                    </td>
                    <td>
                        <select>
                            ${roleOptions}
                        </select>
                    </td>
                    <td><button class="save-btn" onclick="saveUserChanges(${index})">저장</button></td>
                    <td><button class="delete-btn" onclick="deleteUser(${index})">삭제</button></td>
                </tr>
            `);
        });
    } // end of loadUsers()

    // Function to load orders
    function loadOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.forEach((order, index) => {
            const statusSelect = generateStatusSelect(order.orderStatus);
            $('#orderTable tbody').append(`
                <tr>
                    <td>${order.orderId}</td>
                    <td>${order.userId}</td>
                    <td>${order.totalOrderAmount}</td>
                    <td>${order.deliveryAddress.split(',')[0]}</td>
                    <td>${order.orderDate}</td>
                    <td>
                        <select>
                            ${statusSelect}
                        </select>
                    </td>
                    <td><button class="save-btn" onclick="saveOrderChanges(${index})">저장</button></td>
                </tr>
            `);
        });
    }

    // 주문상태
    function generateStatusSelect(currentStatus) {
        const minorCodes = JSON.parse(localStorage.getItem('minorCodes')) || [];
        const statuses = minorCodes.filter(code => code.majorCode === 'ordr');

        let statusOptions = 
            statuses.map(status => 
                `<option value="${status.minorCode}" ${currentStatus === status.minorCode ? 'selected' : ''}>${status.description}</option>`
            ).join('');
        
        return statusOptions;
    }

    // Save order changes
    window.saveOrderChanges = function(index) {
        var updatedStatus = $(`#orderTable tbody tr:eq(${index}) select`).val();
        var orders = JSON.parse(localStorage.getItem('orders'));
        orders[index].orderStatus = updatedStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        alert('주문 상태가 업데이트되었습니다.');
    };

    // Save user changes
    window.saveUserChanges = function(index) {
        var userRow = $(`#userTable tbody tr:eq(${index})`);
        var updatedUser = {
            userId: userRow.children('td').eq(0).text(),
            name: userRow.children('td').eq(1).text(),
            email: userRow.children('td').eq(2).text(),
            phone: userRow.children('td').eq(3).text(),
            gender: userRow.find('select').eq(0).val(),
            job: userRow.find('select').eq(1).val(),
            roleId: userRow.find('select').eq(2).val()
        };
        
        var users = JSON.parse(localStorage.getItem('users'));
        users[index] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        alert('사용자 정보가 업데이트되었습니다.');
    };

    // User deletion function
    window.deleteUser = function(index) {
        var users = JSON.parse(localStorage.getItem('users'));
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        alert('사용자가 삭제되었습니다.');
        loadUsers(); // Update the user table
        location.reload();
    };

    // 로그인 상태 확인 및 헤더 메뉴 변경
    const currentUsers = JSON.parse(localStorage.getItem("currentUsers")) || [];
    if(currentUsers.length > 0) {
        const currentUser = currentUsers[0];
        $("#signupLink, #loginLink").hide();
        $("#logoutLink").show();
        $("#cartLink").show();
        $("#welcomeMessage").html(`${currentUser.userId}님`).show();

        if (currentUser.roleId >= 2) {
            $("#adminLink").show();
        }
    }

    // 로그아웃 버튼 클릭 시 로그아웃 처리
    $("#logoutLink").on("click", function () {
        localStorage.removeItem("currentUsers");
        alert("로그아웃 되었습니다.");
        location.reload();
    });
});