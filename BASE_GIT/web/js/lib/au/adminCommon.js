/**
 * @설명: ayu 공통상수 
 * @auth: 김도익
 * @param 
 */
//var ayu = new Object();
ayu.c = new Object();

// MAP 관련 공통상수
ayu.c.MAP = new Object();
ayu.c.MAP.ID_DATA = "_duData";

// 윈도우 관련 공통상수
ayu.c.WINDOW = new Object();
ayu.c.WINDOW.FORM = "_duWindowForm_";
ayu.c.WINDOW.ID_SEQ = "_duId_";
ayu.c.WINDOW.ID_TIP = "_duTip_";
ayu.c.WINDOW.IS_POPUP = ""; // 팝업창여부
ayu.c.TOKEN = ""; // 토큰값
ayu.c.ROOT_PATH = ""; // CONTEXT ROOT

// Ajax 관련 공통상수
ayu.c.ajax = new Object();
ayu.c.ajax.debug = false;
ayu.c.ajax.method = "POST";
ayu.c.ajax.progressBar = false;
ayu.c.ajax.dataType = "JSON";
ayu.c.ajax.async = false;
ayu.c.ajax.timeout = 14400 * 1000;

// DATA =======================================================
/**
 * @constructor Data 
 */
ayu.data = function() {
	this._data = new Object();
	this._id = ayu.c.MAP.ID_DATA;
};

/**
 * 데이터를 더한다.
 * @param {String} key
 * @param {Object} value
 */
ayu.data.prototype.add = function(key, value) {
	if (ayu.chk.isNull(key))
		return;
	this._data[key] = value;
};

/**
 * 데이터를 삭제한다.
 * @param {String} key
 */
ayu.data.prototype.del = function(key) {
	if (ayu.chk.isNull(key))
		return;
	delete this._data[key];
};

/**
 * 데이터가 해당 키를 가지고 있는지 여부를 확인한다.
 * @param {String} key
 */
ayu.data.prototype.hasKey = function(key) {
	if (ayu.chk.isNull(key))
		return false;
	return (ayu.chk.isNull(this._data[key])) ? false : true;
};

/**
 * 폼데이터를 더한다.<br>
 * 개체의 name 속성이 키, value 속성이 값으로 세팅된다.
 * @param {String} expression jquery 셀렉터
 */
ayu.data.prototype.addForm = function(expression) {

	var self = this;

	$(expression).each(function() {

		var th = $(this);

		if (th.is("[type=button]"))
			return true;
		if (th.attr("name") == "")
			return true;

		if (th.is(":input")) {
			self.add(th.attr("name"), th.val());
		} else {
			self.addForm($(":input", th));
		}

	});

};

/**
 * 키값에 해당하는 데이터를 추출한다.
 * @param {String} key 키
 */
ayu.data.prototype.get = function(key) {
	return this._data[key];
};

/**
 * 데이터를 초기화한다.
 */
ayu.data.prototype.clear = function() {
	this._data = new Object();
};

/**
 * 데이터의 크기를 반환한다.
 * @return {Number} 데이터크기
 */
ayu.data.prototype.size = function() {
	var _max = 0;
	for ( var c in this._data) {
		_max++;
	}
	return _max;
};

/**
 * 입력한 정보의 헤더값을 반환한다.
 * @return {Array} 헤더정보
 */
ayu.data.prototype.getHeader = function() {
	var header = [];
	for ( var c in this._data) {
		header.push(c);
	}
	return header;
};

/**
 * JSON 형식의 raw 데이터를 반환한다.
 * @return {Object} JSON 데이터
 */
ayu.data.prototype.getData = function() {
	return this._data;
};

/**
 * 데이터를 병합한다.
 * @param {du.data} mergeData 병합할 데이터
 */
ayu.data.prototype.merge = function(mergeData) {

	var src = this._data;
	var des = mergeData.getData();

	this._data = $.extend(src, des);

};

/** ========================== AJAX 관련 ========================== **/
/**
 * @설명    : ayu Ajax관련 객체 
 * @History : 2013.02.18 김도익 - 최초작성
 * @param 
 */
ayu.ajax = new Object();

/**
 * @설명        : 통신결과가 저장되는 장소이다.<br>
 * @History     : 2013.02.18 김도익 - 최초작성
 */
ayu.ajax.res = new Object();

/**
 * @설명        : 통신결과 메타정보가 저장되는 장소이다. (결과메세지, 에러여부 등)
 * @History     : 2013.02.18 김도익 - 최초작성
 */
ayu.ajax.resMeta = new Object();

/**
 * @설명     : 서버에 요청을 날린다.
 * @param    : {String}    url       호출URL
 * @param    : {Json}      param     파라메타
 * @History : 2013.02.18 김도익 - 최초작성
 */
ayu.ajax.send = function(url, param) {

	var op = $.extend({
		domain : "http://enter.anyang.ac.kr/",
		async : false,
		method : "POST",
		encrypt : true
	});

	url = op.domain + url;

	$.ajax({
		url : url,
		type : op.method,
		data : param,
		dataType : ayu.c.ajax.dataType,
		timeout : ayu.c.ajax.timeout,
		async : op.async,
		success : ayu.ajax.onComplete,
		error : ayu.ajax.onError
	});

};

/**
 * 서버와 통신이 성공했을 경우 수행한다.
 * @param {Object} res 결과값이 담겨있는 JSON 오브젝트
 * @History : 2013.02.18 김도익 - 최초작성
 */
ayu.ajax.onComplete = function(res) {

	ayu.ajax.res = res;
	ayu.ajax.resMeta = res.meta;

};

/**
 * @설명    : 서버와 통신 자체를 실패했을 경우 실행된다.
 * @param   : {Object} xhr
 * @History : 2013.02.18 김도익 - 최초작성
 */
ayu.ajax.onError = function(xhr) {

	var errMsg = "";
	var header = xhr.getAllResponseHeaders();
	if (header == null)
		header = "\n";

	errMsg += "통신 중 오류가 발생하였습니다." + "\n";
	errMsg += "----------------------------------------------" + "\n";
	switch (xhr.status) {
	case 403:
		errMsg += "요청하신 주소에 접근할 수 없습니다.\n";
		break;
	case 404:
		errMsg += "요청하신 주소를 찾지 못하였습니다.\n";
		break;
	case 500:
		errMsg += "위의 오류가 반복적으로 발생하는 경우 화면을 새로고침(F5) 하시기 바랍니다. \n새로고침(F5) 시 작성중인 내용은 유실될 수 있습니다.";
		break;
	case 0:
		errMsg += "서버와 연결하지 못하였습니다.\n";
		break;
	}
	errMsg += "----------------------------------------------" + "\n";
	errMsg += ">> Status : " + xhr.status + "\n";
	errMsg += ">> ReadyState : " + xhr.readyState + "\n";
	errMsg += "----------------------------------------------" + "\n";

	alert(errMsg);

};

/** ======================== AJAX 관련 End ======================== **/

/** ======================== Window 관련 ========================== **/

/**
 * 윈도우 창 컨트롤에 관련된 유틸리티 클래스
 * @classDescription 윈도우 창 컨트롤에 관련된 유틸리티 클래스 
 */
ayu.window = new Object();
ayu.window._idSeq = 0; // 오브젝트에 부여하는 ID
ayu.window._data = new ayu.data(); // 화면에 넘겨주는 데이터가 저장되는 공간

/**
 * 팝업을 호출한다.<br>
 * <pre>
 * var popup = ayu.window.openPopup( "", 200, 300 );
 * 
 * 1. 팝업창의 입력상자에 접근해 값을 변경
 * $("#inputPopup", popup.document ).val( "merong" ); 
 * $( popup.document ).find("#inputPopup").val("merong");
 *
 * 2. 팝업창의 스크립트를 실행
 * $(popup)[0].fnPopupScript(); 
 * 
 * 3. 팝업창에서 부모창에 접근해 값을 변경
 * $("#inputOpner", opner.document).val("merong");
 * </pre>
 * 
 * @param {String} url    호출할 페이지
 * @param {String} width  창 너비  
 * @param {String} height 창 높이
 * @param {Object} option 옵션
 * <ul>
 * <li>id          : {String}  팝업화면에 부여할 ID  (기본값 : _duPopup_ )</li>
 * <li>scrollbars  : {Boolean} 스크롤바 생성여부 (기본값 : false )</li>
 * <li>status      : {Boolean} 상태바 생성여부 (기본값 : false )</li>
 * <li>toolbar     : {Boolean} 툴바 생성여부 (기본값 : false )</li>
 * <li>copyhistory : {Boolean} ? (기본값 : false )</li>
 * <li>menubar     : {Boolean} 메뉴바 생성여부 (기본값 : false )</li>
 * <li>location    : {Boolean} 주소입력창 생성여부 (기본값 : false )</li>
 * <li>directories : {Boolean} ? (기본값 : false )</li>
 * <li>method      : {String}  팝업화면에 데이터를 보내는 방법 (POST (기본값) / GET)</li>
 * <li>domain      : {String}  URL의 메인도메인 (외부링크를 열고 싶을 경우 해당 항목을 "" 처리한다.)</li>
 * <li>encrypt     : {Boolean} 전송값 암호화여부 (기본값:true)</li>
 * </ul>
 * @return 팝업윈도우
 */
ayu.window.openPopup = function(url, width, height, option) {

	var op = $.extend({
		id : "_duPopup_",
		scrollbars : false,
		status : false,
		resizable : true, // 크기조절을 막는 기능은 IE에서만 된다.
		toolbar : false,
		copyhistory : false,
		menubar : false,
		location : false,
		directories : false,
		method : "post",
		domain : ayu.c.ROOT_PATH,
		encrypt : false
	}, option || {});

	op.width = width;
	op.innerWidth = width + 6;
	op.height = height;
	op.innerHeight = height + 32;

	var param = "";
	var temp = "";
	for ( var c in op) {
		temp = (op[c] == true) ? "yes" : ((op[c] == false) ? "no" : op[c]);
		param += (c + "=" + temp + ",");
	}
	param = param.replace(/,$/, "");

	var _popup = window.open("", op.id, param);

	ayu.window._data.add("_duWindowIsPopup", "true");

	var form = ayu.window.getForm(ayu.window._data);
	form.attr({
		"method" : "post",
		"target" : op.id,
		"action" : op.domain + url
	});

	if (op.encrypt == true) {
		ayu.xecure.submitPopup(form[0]);
	} else {
		form.submit();
	}

	ayu.window._data.del("_duWindowIsPopup");

	return _popup;

};

/**
 * 현재 화면에 페이지를 연다. (페이지를 이동한다.)
 * 
 * @param {String} url  페이지 주소
 * @param {Object} option 옵션
 * <ul>
 * <li>method  : {Number} 1.단순이동, 2.리로딩</li>
 * <li>target  : {String} 페이지가 전송될 타겟윈도우ID</li>
 * <li>domain  : {String} URL의 메인도메인 (외부링크를 열고 싶을 경우 해당 항목을 "" 처리한다.)</li>
 * <li>encrypt : {Boolean} 전송값 암호화여부 (기본값:true)</li>
 * </ul>
 */
ayu.window.openPage = function(url, option) {

	var op = $.extend({
		method : 1,
		target : "_self",
		domain : ayu.c.ROOT_PATH,
		encrypt : false
	}, option || {});

	switch (op.method) {
	case 1: // not permit to record back history
		var form = ayu.window.getForm(ayu.window._data);
		form.attr({
			"method" : "post",
			"target" : op.target,
			"action" : op.domain + url
		});
		if (op.encrypt == true) {
			ayu.xecure.submit(form[0], op.domain + url);
		} else {
			form.submit();
		}
		break;

	case 2: // reload
		document.location.reload();
		break;
	}

};

/**
 * 화면에 넘겨주기 위한 데이터를 저장한다.
 * @param {ayu.data} data
 */
ayu.window.addData = function(data) {
	if ((data._id != ayu.c.MAP.ID_DATA) || data.size() == 0)
		return;
	ayu.window._data = data;
};

/**
 * 데이터 전송을 위한 form 객체를 가져온다.
 * @param {du.Map} data  form에 담을 데이터
 * @private
 */
ayu.window.getForm = function(data) {

	// 폼을 가져온다. (없으면 하나 만든다.)
	var form = $("#" + ayu.c.WINDOW.FORM);
	if (form.length == 0) {

		// XecureWeb 전용 form 추가 
		$("<form name='xecure'><input type=hidden name='p'/></form>").appendTo(
				"body");

		form = $("<form>").attr("id", ayu.c.WINDOW.FORM).attr("accept-charset",
				"euc-kr").appendTo("body");
	}

	// 폼 데이터를 초기화시킨다.
	form.children().remove();

	// TOKEN 데이터 추가
	$("<input>").attr({
		type : "hidden",
		name : "_userMetaToken",
		value : ayu.c.TOKEN
	}).appendTo(form);

	// 데이터가 없다면 메서드를 종료한다.
	if (ayu.chk.isNull(data))
		return form;

	// 전송할 데이터셋을 만든다.
	// (IE에서는 input을 clone으로 만들어 append 시킬 수 없다. 주의할 것)
	switch (data._id) {

	case ayu.c.MAP.ID_DATA:

		for ( var c in data._data) {
			$("<input>").attr({
				type : "hidden",
				name : c,
				value : data.get(c)
			}).appendTo(form);
		}

		break;

	}

	return form;

};

/** ======================== 통계 관련 ========================== **/
/**
 * 합을 구한다.
 * @param { x } : 배열
 * @private
 */
function sum(x) {
	var n = x.length;
	var sum = 0;
	for ( var i = 0; i < n; i++) {
		sum += x[i];
	}
	return sum;
}

/**
 * 평균을 구한다.
 * @param { x } : 배열
 * @private
 */
function myMean(x) {
	var n = x.length;
	var sum = 0;
	for ( var i = 0; i < n; i++)
		sum += x[i];
	return sum / n;
}

/**
 * 편차제곱합을 구한다.
 * @param { x } : 배열
 * @private
 */
function mySSum(x) {
	var n = x.length;
	var sum = 0;
	for ( var i = 0; i < n; i++) {
		sum += x[i] * x[i];
	}
	var nbar = n * (myMean(x) * myMean(x));
	return sum - nbar;
}

/**
 * 분산(n-1)을 구한다.
 * @param { x } : 배열
 * @private
 */
function myVar(x) {
	var n = x.length;
	return mySSum(x) / n - 1;
}

/**
 * 표준편차을 구한다.
 * @param { x } : 배열
 * @private
 */
function StDev(x) {
	var n = x.length;
	var StDev = Math.sqrt(myVar(x));
	return StDev;
}
/** ======================== 통계 관련 End ========================== **/

/**
 * @설명    : 로그아웃을 한다
 * @History : 2013.02.18 김도익 - 최초작성
 */
function cfLogout() {

	location.href = pathBizdocs + "/logOut.jsp";
}

/**
 * @설명    : 입력안함 Validation 체크
 * @param   : objId       : object의 Id
 * @History : 2013.02.18 김도익 - 최초작성
 */
function fnValidationEmpty(objId) {

	var objId = jQuery("#" + objId);
	var objIdXss = ayu.str.clearXss(objId.val());
	//var objIdXss = objId.val(); 

	// Validation
	if (ayu.chk.isEmpty(objIdXss)) {
		alert(objId.attr("title") + "는(은) 필수입력입니다. 확인해 주세요.");
		objId.focus();
		return true;
	}

}// end fnValidationEmpty

/**
 * @설명 키 이벤트를 처리한다.
 * @param e event
 * @return boolean
 * @author uk
 */
function checkEvt(e) {

	//FireFox를 위한 별도 이벤트 처리(FireFox:e, 그외 부라우져:event)
	key = (e) ? e.keyCode : event.keyCode;

	if (key == 13 || key == 0X0D) {//엔터 이벤트 발생시
		return true;
	} else {
		return false;
	}
}