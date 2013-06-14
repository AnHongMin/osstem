var SampleService = {
	// 목록
	getList: function () {
		var url = "/sample.do";
		var params = {};
		params["method"] = 'list';
		params["pageNo"] = jQuery('#pageNo').val();
		location.href = url + osstem.util.makeParams(params);
	},
	
	getListResult : function(result){
		jQuery('#listbox').html(result);
	},
	
	// 조회
	getView: function () {
		var url = "/sample.do";
		var params = {};
		params["method"] = 'view';
		params["pageNo"] = jQuery('#pageNo').val();
		params["seq"] = jQuery('#seq').val();
		location.href = url + osstem.util.makeParams(params);
	},
	
	getViewResult : function(result){
		jQuery('#listbox').html(result);
	},	

	// 작성
	getWrite: function () {
		var url = "/sample.do";
		var params = {};
		params["method"] = 'write';
		location.href = url + osstem.util.makeParams(params);
	},
	
	getWriteResult : function(result){
		jQuery('#listbox').html(result);
		CKEDITOR.replace('content');
	},	
	
	// 등록 프로세스
	doRegist: function () {
		// submit
		var frmObj = jQuery("#sampleFrm");
		frmObj.submit();
		
//		ajax : 파일첨부가 아닌경우 사용
//		var url = "/sample.do";
//		var params = J$("#sampleFrm").serialize();
	},
	
	// 수정 프로세스
	doModify: function () {
		var url = "/sample.do";
		var params = {};
		params["method"] = 'modify';
		params["seq"] = jQuery('#seq').val();
		params["name"] = jQuery('#name').val();
		//params["content"] = jQuery('#content').val();
		params["content"] = CKEDITOR.instances.content.getData();
		params["pageNo"] = jQuery('#pageNo').val();
		osstem.http.ajax(
			{ 
				url : url,
				target : document.body,
				data   : params,
				success : function(resData, statusText){
					if(resData.code=="200"){
						var url = "/sample.do";
						var params = {};
						params["method"] = 'list';
						params["pageNo"] = resData.dto.pageNo;
						location.href = url + osstem.util.makeParams(params);
					}else{
						alert(resData.msg);	
					}		
				},
				dataType : "json"    
			}
		);
	},
	
	// 파일 다운로드
	getDown: function (file_sq) {
		location.href = "/sample.do?method=down&file_sq="+file_sq;
	},
	
	// 그리드 등록 프로세스
	doRegistGrid: function () {
		var url = "/sample.do";
		var params = jQuery("#sampleFrm").serialize();
		osstem.http.ajax(
			{ 
				url : url,
				target : document.body,
				data   : params,
				success : function(resData, statusText){
					jQuery("#gridList").trigger("reloadGrid");		
				},
				dataType : "json"    
			}
		);
	},
	dummy: null
};