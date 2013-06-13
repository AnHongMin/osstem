var Sample = {
	// 파일 다운로드 이동	
	Down : function(file_sq){
		SampleService.getDown(file_sq);
	},		
		
	// 수정 프로세스 이동	
	Modify : function(){
		SampleService.doModify();
	},
		
	// 등록 프로세스 이동	
	Regist : function(){
		SampleService.doRegist();
	},
	
	// 작성 페이지 이동
	write : function(){
		SampleService.getWrite();
	},
	
	// 조회 페이지 이동
	view : function(seq){
		jQuery('#seq').val(seq);
		SampleService.getView();
	},
		
	// 페이징
	show_page : function(current_page, total_page, pagenumber) {
		var startpage;
		var endpage;
		var curpage;
		var strList = "";
		var leftList = "";
		var rightList = "";
		var first = "";
		var last = "";

		var prev_img = "<";
		var next_img = ">";
		var first_img = "<<";
		var last_img = ">>";

		startpage = parseInt((current_page - 1) / pagenumber) * pagenumber + 1;
		endpage = parseInt(((startpage - 1) + pagenumber) / pagenumber) * pagenumber;
		
		if (total_page <= endpage)endpage = total_page;
		

		//이전버튼
		if (current_page > pagenumber) {
			curpage = startpage - 1;
			leftList = "\n<a href=\"javascript:void(0)\" onclick=\"Sample.next(" + curpage + ")\">" + prev_img + "</a> ";
		} else
			leftList = "\n<a href=\"javascript:void(0)\">" + prev_img + "</a> ";

		//페이징
		for (curpage = startpage; curpage <= endpage ; curpage++) {
			if (curpage == current_page)
				strList += "\n<span>" + current_page + "</span>";
			else
				strList += "\n<a href=\"javascript:void(0)\" onclick=\"Sample.next(" + curpage + ")\">" + curpage + "</a>";
		}

		//다음버튼
		if (total_page > endpage) {
			curpage = endpage + 1;
			rightList = "\n<a href=\"javascript:void(0)\" onclick=\"Sample.next(" + curpage + ")\">" + next_img + "</a> ";
		} else{
			rightList = "\n<a href=\"javascript:void(0)\">" + next_img + "</a> ";
		}

		//처음버튼
		if (current_page == 1){
			first = "\n<a href=\"javascript:void(0)\">"+first_img+"</a> ";
		}else{
			first = "\n<a href=\"javascript:void(0)\" onclick=\"Sample.next(1)\">"+first_img+"</a> ";
		}

		//마지막버튼
		if (current_page == total_page || total_page == 0){
			last = "\n<a href=\"javascript:void(0)\" class=\"last\">"+last_img+"</a> ";
		}else{
			last = "\n<a href=\"javascript:void(0)\" onclick=\"Sample.next(" + total_page + ")\">" + last_img + "</a>";
		}

		strList = "<div>" + first + leftList + strList + rightList + last+"</div>";
		return strList;
	},
	
	// 다음 페이지 이동
	next : function(pNo){
		jQuery('#pageNo').val(pNo);
		SampleService.getList();
	}	
};