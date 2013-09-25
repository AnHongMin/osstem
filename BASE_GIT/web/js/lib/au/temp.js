
var vParam = new ayu.data();
vParam.add("userId", userId );           // id
vParam.add("userGbncd", userGbncd );     // userGbncd
vParam.add("userStat", userStat );       // userStat
vParam.add("mode", "U" );                // mode
vParam.add("currentPage", currentPage ); // 현재페이지
vParam.add("adminId", jQuery("#txtAdminID").val() );                    // 검색 관리자 ID
vParam.add("useYn", jQuery("select#cmbUseYn option:selected").val() );  // 검색 사용여부
ayu.window.addData(vParam);
ayu.window.openPage(pathJsp+"/ayuA00/AYUA10Run.jsp", { domain:'' }); 