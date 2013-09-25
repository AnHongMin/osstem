/* 변수 선언 */
var ayu = {};

/**
 * 문자열 관련 유틸리티
 * @classDescription 문자열 관련 유틸리티
 */
ayu.str = new Object();

/**
 * 정규식패턴
 */
ayu.str._regPtn = {

	TRIM : /(^ *)|( *$)/g,
	LTRIM : /(^ *)/g,
	RTRIM : /( *$)/g,
	INNER_TRIM : / */g,
	NUM : /[0-9]/g,
	NOT_NUM : /[^0-9]/g,
	ENG : /[a-zA-Z]/g,
	UENG : /[A-Z]/g,
	NOT_ENG : /[^a-zA-Z]/g,
	KOR : /[가-힣]/g,
	NOT_KOR : /[^가-힣]/g,
	NOT_NUM_OR_ENG : /[^0-9a-zA-Z]/g,
	MONEY : /(-?[0-9]+)([0-9]{3})/,

	HAS_HTML : /<\/?[a-zA-Z][a-zA-Z0-9]*[^<>]*>/,
	IS_NUM : /^[0-9]+$/,
	IS_NOT_NUM : /^[^0-9]+$/,
	IS_ENG : /^[a-zA-Z]+$/,
	IS_UENG : /^[A-Z]+$/,
	IS_LENG : /^[a-z]+$/,
	IS_NUM_UENG : /^[0-9A-Z]+$/,
	IS_NOT_LENG : /^[^a-z]+$/,
	IS_NUM_ENG : /^[0-9a-zA-Z]+$/,
	IS_KOR : /^[가-힣]+$/,
	IS_NUM_KOR : /^[0-9가-힣]+$/,
	IS_RRN : /^(\d{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])(|\D)[1-4](\d{6})$/,
	IS_FGN : /^(\d{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])(|\D)[5-8](\d{6})$/,
	IS_EMAIL : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
	IS_HOME_PHONE : /^(0[2-8][0-5]?)(|\D)([1-9]{1}[0-9]{2,3})(|\D)([0-9]{4})$/,
	IS_CELL_PHONE1 : /^(01[1346-9])(|\D)([1-9]{1}[0-9]{2,3})(|\D)([0-9]{4})$/,
	IS_CELL_PHONE2 : /^(010)(|\D)([1-9]{1}[0-9]{3})(|\D)([0-9]{4})$/,

	HAN_1ST : [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ',
			'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
	HAN_2ND : [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ',
			'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ],
	HAN_3RD : [ '-', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ',
			'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ',
			'ㅌ', 'ㅍ', 'ㅎ' ]
};

/**
 * 임의의 개체에서 문자열을 추출한다.
 * @param {Object} obj 오브젝트
 * @param {Boolean} xss 크로스사이트스크립팅 제거여부
 * @return {String} 문자열
 */
ayu.str.getVal = function(obj, xss) {

	var result = "";

	if (ayu.chk.isNull(obj)) {
		return result;
	} else if (ayu.chk.isObj(obj)) {
		result += $(obj).val();
	} else if (ayu.chk.isStr(obj)) {
		result = obj;
	} else {
		result += obj;
	}

	if (xss == true)
		result = ayu.str.clearXss(result);

	return result;

};

/**
 * 문자열을 치환한다.
 * <pre>
 * alert( ayu.str.replace( "my body is male", "male", "female" ) );
 * --> "my body is female"
 * </pre>
 * @param {String} string   패턴검사를 수행할 문자열
 * @param {String/Object} pattern  찾을 문자열 또는 정규식 패턴
 * @param {String} wannaBeString  치환될 문자열
 * @return {String} 치환된 문자열
 */
ayu.str.replace = function(string, pattern, wannaBeString) {
	if (ayu.chk.isNull(string))
		return "";
	if (ayu.chk.isNull(pattern))
		return string;
	return ayu.str.getVal(string).replace(pattern,
			ayu.str.getVal(wannaBeString));
};

/**
 * 문자열을 없앤다.
 * @param {String} string   패턴검사를 수행할 문자열
 * @param {String/Object} pattern  찾을 문자열 또는 정규식 패턴
 * @return {String} 치환된 문자열
 */
ayu.str.remove = function(string, pattern) {
	return ayu.str.replace(string, pattern, "");
};

/**
 * 앞뒤 공백문자를 제거한다.
 * @param {String} string 치환할 문자열
 * @return {String} 치환된 문자열
 */
ayu.str.trim = function(string) {
	return ayu.str.remove(string, ayu.str._regPtn.TRIM);
};

/**
 * 앞 공백문자를 제거한다.
 * @param {String} string 치환할 문자열
 * @return {String} 치환된 문자열
 */
ayu.str.ltrim = function(string) {
	return ayu.str.remove(string, ayu.str._regPtn.LTRIM);
};

/**
 * 뒤 공백문자를 제거한다.
 * @param {String} string 치환할 문자열
 * @return {String} 치환된 문자열
 */
ayu.str.rtrim = function(string) {
	return ayu.str.remove(string, ayu.str._regPtn.RTRIM);
};

/**
 * 모든 공백문자를 제거한다.
 * @param {String} string 치환할 문자열
 * @return {String} 치환된 문자열
 */
ayu.str.allTrim = function(string) {
	return ayu.str.remove(string, / /g);
};

/**
 * 중복 빈칸을 1개의 빈칸으로 만든다. 
 * @param {String} string 치환할 문자열
 * @return {String} 치환된 문자열
 */
ayu.str.innerTrim = function(string) {
	return ayu.str.replace(string, ayu.str._regPtn.INNER_TRIM, " ");
};

/**
 * LPAD 함수를 구현한다.
 * <pre>
 * alert( ayu.str.lpad("A", 3, '0') ); -> 00A
 * </pre>
 * @param {String} string 원래 문자열
 * @param {Number} length 전체 길이
 * @param {String} fillChar 패딩처리할 문자패턴
 * @return {String} 패딩처리된 문자열
 */
ayu.str.lpad = function(string, length, fillChar) {

	if (ayu.chk.isEmpty(string))
		return "";

	var srcStr = ayu.str.getVal(string).substr(0, length);
	var cnt = 0;

	for ( var inx = srcStr.length; inx < length; inx++) {
		srcStr = fillChar.charAt(cnt) + srcStr;
		cnt++;
		cnt = (cnt == fillChar.length) ? 0 : cnt;
	}

	return srcStr;

};

/**
 * RPAD 함수를 구현한다.
 * <pre>
 *    alert( ayu.str.rpad("A", 3, '0') ); -> A00
 * </pre>
 * @param {String} string 원래 문자열
 * @param {Number} length 전체 길이
 * @param {String} fillChar 패딩처리할 문자패턴
 * @return {String} 패딩처리된 문자열
 */
ayu.str.rpad = function(string, length, fillChar) {

	if (ayu.chk.isEmpty(string))
		return "";

	var srcStr = ayu.str.getVal(string).substr(0, length);
	var cnt = 0;

	for ( var inx = srcStr.length; inx < length; inx++) {
		srcStr = srcStr + fillChar.charAt(cnt);
		cnt++;
		cnt = (cnt == fillChar.length) ? 0 : cnt;
	}

	return srcStr;

};

/**
 * 문자열의 byte 수 얻어오기.
 * @param {String} string 치환할 문자열
 * @param {Boolean} xss 크로스사이트스크립팅 제거여부
 * @return {Number} 문자열의바이트
 */
ayu.str.getByte = function(string, xss) {
	if (ayu.chk.isEmpty(string))
		return 0;
	var _var = ayu.str.getVal(string, xss);
	var _add = ("EUC-KR" == "UTF-8") ? 2 : 1;
	var _len = 0;
	for ( var inx = 0, cnt = _var.length; inx < cnt; inx++, _len++) {
		if (_var.charCodeAt(inx) < 0 || _var.charCodeAt(inx) > 127)
			_len += _add;
	}
	return _len;
};

/**
 * 문자열에서 숫자만 추출한다.
 * @param {String} string 치환할 문자열
 * @return {String} 숫자로만 구성된 문자열
 */
ayu.str.getNum = function(string) {
	return ayu.str.remove(string, ayu.str._regPtn.NOT_NUM);
};

/**
 * 문자열에서 숫자만 제외시켜 추출한다.
 * @param {String} string 치환할 문자열
 * @return {String} 숫자만 제외된 문자열
 */
ayu.str.getNotNum = function(string) {
	return ayu.str.remove(string, ayu.str._regPtn.NUM);
};

/**
 * 문자열에서 숫자를 NUMBER 형태로 추출한다.
 * @param {String} string 치환할 문자열
 * @return {Number} 숫자
 */
ayu.str.parseNum = function(string) {
	if (ayu.chk.isNull(string))
		return 0;
	string = ayu.str.getNum(string);
	if (!isNaN(string))
		return parseInt(string);
	else
		return null;
};

/**
 * 문자열에서 영문자만 추출한다.
 * @param {String} string 치환할 문자열
 * @return {String} 영문자로만 구성된 문자열
 */
ayu.str.getEng = function(string) {
	return ayu.str.remove(string, ayu.str._regPtn.NOT_ENG);
};

/**
 * 문자열에서 영문자만 제외시켜 추출한다.
 * @param {String} string 치환할 문자열
 * @return {String} 영문자만 제외된 문자열
 */
ayu.str.getNotEng = function(string) {
	return ayu.str.remove(string, ayu.str._regPtn.ENG);
};

/**
 * 숫자에 3자리마다 콤마를 찍어서 반환
 * @param {String} string 치환할 문자열
 * @return {String}  3자리마다 콤마가 찍힌 문자열
 */
ayu.str.getMoney = function(string) {
	if (ayu.chk.isEmpty(string))
		return string;
	var num = ayu.str.trim(ayu.str.getVal(string));
	while (ayu.chk.isReg(num, ayu.str._regPtn.MONEY)) {
		num = num.replace(ayu.str._regPtn.MONEY, "$1,$2");
	}
	return num;
};

/**
 * 값이 없다면 지정한 문자로 반환받는다.
 * @param {String} string 검사할 문자열
 * @param {String} wannaBeString 검사할 문자가 null일 경우 반환받을 문자열
 * @return {String}
 */
ayu.str.nvl = function(string, wannaBeString) {
	var _val = ayu.str.getVal(string);
	return (_val == "") ? wannaBeString : _val;
};

/**
 * 문자열에 특정 패턴값을 가지고 있다면 true를 반환한다.
 * @param {String} string   검사할 문자열
 * @param {String} pattern  찾을 패턴값
 * @return {Boolean}
 */
ayu.str.hasValue = function(string, pattern) {
	return (ayu.str.getVal(string).indexOf(ayu.str.getVal(pattern)) >= 0) ? true
			: false;
};

/**
 * XSS 보안처리된 문자열을 다시 원복시킨다.
 * @param {String|Object} string 원복시킬 문자열 또는 개체
 * @return {String} 원복된 문자열
 */
ayu.str.unclearXss = function(string) {

	var str = ayu.str.getVal(string);

	str = str.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
			.replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&#34;/g,
					'"').replace(/&#39;/g, "'").replace(/&#92;/g, "W").replace(
					/&#40;/g, "(").replace(/&#41;/g, ")");

	return str;

};

/**
 * 문자열에 XSS 보안처리를 수행한다.
 * @param {String|Object} string 보안처리할 문자열 또는 개체
 * @return {String} 원복된 문자열
 */
ayu.str.clearXss = function(string) {

	var str = ayu.str.getVal(string);

	str = str.replace(/</g, "&#60;").replace(/>/g, "&#62;").replace(/"/g,
			"&#34;").replace(/'/g, "&#39;").replace(/\\/g, "&#92;").replace(
			/\(/g, "&#40;").replace(/\)/g, "&#41;");

	return str;

};

/**
 * 한글문자의 초성/중성/종성을 나누어 반환한다.
 * <pre>
 * ayu.str.divideHan( "김" );     --> ['ㄱ','ㅣ','ㅁ'] 배열을 반환
 * ayu.str.divideHan( "도" );     --> ['ㄷ','ㅗ','-']   배열을 반환
 * ayu.str.divideHan( "a" );      --> [null,null,null] 배열을 반환
 * </pre>
 * @param  {String} string 1글자 (단어일 경우 마지막 1글자만 처리)
 * @return {Array} 초성/중성/종성이 나누어진 배열 (한글이 아닐 경우 null이 반환됨)
 */
ayu.str.divideHan = function(string) {

	var result = [];
	var word = ayu.str.getVal(string);
	var schar = word.charCodeAt(word.length - 1);

	if (schar < 0xAC00 || schar > 0xD79F)
		return result;

	schar = schar - 0xAC00;

	var jong = schar % 28;
	var jung = ((schar - jong) / 28) % 21;
	var cho = parseInt(((schar - jong) / 28) / 21);

	result.push(ayu.str._regPtn.HAN_1ST[cho]);
	result.push(ayu.str._regPtn.HAN_2ND[jung]);
	result.push(ayu.str._regPtn.HAN_3RD[jong]);

	return result;

};

// [B04] -ayu.CHK =======================================================

/**
 * 정합성 체크 유틸리티
 * @classDescription 정합성 체크 유틸리티
 */
ayu.chk = new Object();

/**
 * 입력값이 null인지 여부를 확인한다.<br>
 * @param  {Object}  obj  입력항목 또는 값
 * @return {Boolean} <b>null, undefined</b> 인 경우 true를 반환
 */
ayu.chk.isNull = function(obj) {
	return (obj == undefined || obj == null) ? true : false;
};

/**
 * 입력항목의 값이 비어있는지 여부를 확인한다.
 * @param {Object|String} obj 입력항목 또는 값
 * @return {Boolean} <b>null, undefined, ""</b> 인 경우 true를 반환
 */
ayu.chk.isEmpty = function(obj) {
	return ayu.str.getVal(obj).length == 0 ? true : false;
};

/**
 * 정규식을 테스트한다.
 * <pre>
 * alert( ayu.chk.isReg( "aaaab a", /.*b/ ) );
 * </pre>
 * @param {Object|String} string   패턴검사를 수행할 문자열 또는 오브젝트
 * @param {Object} pattern  정규식 패턴 개체
 * @return {Boolean} 정규식 검사 성공여부
 */
ayu.chk.isReg = function(string, pattern) {
	if (ayu.chk.isEmpty(string) || ayu.chk.isNull(pattern))
		return false;
	return pattern.test(ayu.str.getVal(string));
};

/**
 * 공백을 인정하며 정규식을 테스트한다.
 * <pre>
 * alert( ayu.chk.isReg( "aaaab a", /.*b/ ) );
 * </pre>
 * @param {Object|String} string   패턴검사를 수행할 문자열 또는 오브젝트
 * @param {Object} pattern  정규식 패턴 개체
 * @return {Boolean} 정규식 검사 성공여부
 */
ayu.chk.isRegEmpty = function(string, pattern) {
	if (ayu.chk.isEmpty(string))
		return true;
	if (ayu.chk.isNull(pattern))
		return false;
	return pattern.test(ayu.str.getVal(string));
};

/**
 * 두개 정규식을 조합하여 테스트한다.
 * <pre>
 * alert( ayu.chk.isReg( "aaaab a", /.*b/, /.*a/ ) );
 * </pre>
 * @param {Object|String} string   패턴검사를 수행할 문자열 또는 오브젝트
 * @param {Object} pattern1  개체1 개체2 이 같이 있는 정규식 개체로 /^[a-z0-9]+$/ 와 같은 형태
 * @param {Object} pattern2  정규식 패턴 개체1 로 /[a-z]/g 와 같은 형태
 * @param {Object} pattern3  정규식 패턴 개체2 로 /[0-9]/g 와 같은 형태
 * @return {Boolean} 정규식 검사 성공여부
 */
ayu.chk.isReg2 = function(string, pattern1, pattern2, pattern3) {
	if (ayu.chk.isEmpty(string) || ayu.chk.isNull(pattern1)
			|| ayu.chk.isNull(pattern2) || ayu.chk.isNull(pattern3))
		return false;
	return pattern1.test(ayu.str.getVal(string))
			&& pattern2.test(ayu.str.getVal(string))
			&& pattern3.test(ayu.str.getVal(string));
};

/**
 * HTML 태그가 포함되어있는지 여부를 확인한다.
 * @param {Object|String} string   패턴검사를 수행할 문자열 또는 오브젝트
 * @return {Boolean} 태그 포함여부
 */
ayu.chk.hasHtml = function(string) {
	return ayu.chk.isReg(string, ayu.str._regPtn.HAS_HTML);
};

/**
 * 개체타입의 문자 여부를 확인한다.
 * @param {Object|String} obj 검사할 개체
 * @return {Boolean} 타입이 문자일 경우 true 반환
 */
ayu.chk.isStr = function(obj) {
	return typeof obj == "string";
};

/**
 * 개체타입의 오브젝트 여부를 확인한다.
 * @param {Object|String} obj 검사할 개체
 * @return {Boolean} 타입이 오브젝트일 경우 true 반환
 */
ayu.chk.isObj = function(obj) {
	return typeof obj == "object";
};

/**
 * 개체타입의 배열 여부를 확인한다.
 * @param {Object|String} obj  검사할 개체
 * @return {Boolean} 타입이 배열일 경우 true 반환
 */
ayu.chk.isArr = function(obj) {
	if (ayu.chk.isNull(obj))
		return false;
	return obj.constructor == Array;
};

/**
 * 숫자로만 구성되어있는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isNum = function(obj) {
	return ayu.chk.isReg(obj, ayu.str._regPtn.IS_NUM);
};

/**
 * 숫자로만 구성되어있는지 여부를 확인한다.(공백 상관없이 숫자만 체크)
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isNumOnly = function(obj) {
	return ayu.chk.isRegEmpty(obj, ayu.str._regPtn.IS_NUM);
};

/**
 * 대문자로만 구성되어있는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isUEng = function(obj) {
	return ayu.chk.isReg(obj, ayu.str._regPtn.IS_UENG);
};

/**
 * 소문자로만 구성되어있는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isLEng = function(obj) {
	return ayu.chk.isReg(obj, ayu.str._regPtn.IS_LENG);
};

/**
 * 소문자가 구성되어있는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isNotLEng = function(obj) {
	return ayu.chk.isReg(obj, ayu.str._regPtn.IS_NOT_LENG);
};

/**
 * 대문자와 숫자 조합으로 구성되어있는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isUEngNum = function(obj) {
	return ayu.chk.isReg2(obj, ayu.str._regPtn.IS_NUM_UENG,
			ayu.str._regPtn.UENG, ayu.str._regPtn.NUM);
};

/**
 * 대문자와 숫자 조합 또는 숫자로만 구성되어있는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isUEngNumOrNum = function(obj) {
	return ayu.chk.isReg2(obj, ayu.str._regPtn.IS_NUM_UENG,
			ayu.str._regPtn.UENG, ayu.str._regPtn.NUM)
			|| ayu.chk.isReg(obj, ayu.str._regPtn.IS_NUM);
};

/**
 * 숫자가 없는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isNotNum = function(obj) {
	return ayu.chk.isReg(obj, ayu.str._regPtn.IS_NOT_NUM);
};

/**
 * 영문자로만 구성되어있는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isEng = function(obj) {
	return ayu.chk.isReg(obj, ayu.str._regPtn.IS_ENG);
};

/**
 * 영문자와 숫자로만 구성되어있는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isNumEng = function(obj) {
	return ayu.chk.isReg(obj, ayu.str._regPtn.IS_NUM_ENG);
};

/**
 * 한글로만 구성되어있는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isKor = function(obj) {
	return ayu.chk.isReg(obj, ayu.str._regPtn.IS_KOR);
};

/**
 * 한글과 숫자로만 구성되어있는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isNumKor = function(obj) {
	return ayu.chk.isReg(obj, ayu.str._regPtn.IS_NUM_KOR);
};

/**
 * 주민등록번호 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isRrn = function(obj) {

	// 형식 체크
	if (!ayu.chk.isReg(obj, ayu.str._regPtn.IS_RRN))
		return false;
	var _rrn = ayu.str.getNum(obj);

	// 날짜정합성 체크
	var _birth = ayu.chk.isReg(_rrn.substr(6, 1), /[1|2]/) ? "19" : "20";
	_birth += _rrn.substr(0, 6);
	_birth = ayu.obj.getDate(_birth);
	if (_birth == null)
		return false;

	// 체크섬
	var _sum = 0;
	var _chk = [ 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5 ];

	for ( var inx = 0; inx < 12; inx++)
		_sum += (Number(_rrn.charAt(inx)) * _chk[inx]);

	return !((11 - (_sum % 11)) % 10 != Number(_rrn.charAt(12)));

};

/**
 * 이메일 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isEmail = function(obj) {
	return ayu.chk.isReg(obj, ayu.str._regPtn.IS_EMAIL);
};

/**
 * 검사항목의 값이 최대 바이트수를 넘지 않는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @param {Number} chkByte 최대 바이트수
 * @param {Boolean} xss XSS 적용여부 (기본값 : false)
 * @return {Boolean} 최대바이트 수 이하일 경우 true를 반환
 */
ayu.chk.isMaxByte = function(obj, chkByte, xss) {
	var _byte = ayu.str.getByte(obj, xss);
	return (_byte <= chkByte);
};

/**
 * 검사항목의 값이 최소 바이트수 이상인지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @param {Number} chkByte 최소 바이트수
 * @param {Boolean} xss XSS 적용여부 (기본값 : false)
 * @return {Boolean} 최소바이트 수 이상일 경우 true를 반환
 */
ayu.chk.isMinByte = function(obj, chkByte, xss) {
	var _byte = ayu.str.getByte(obj, xss);
	return (_byte >= chkByte);
};

/**
 * 검사항목의 값이 최대 길이를 넘지 않는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @param {Number} chkLen 최대 길이
 * @param {Boolean} xss XSS 적용여부 (기본값 : false)
 * @return {Boolean} 최대길이 이하일 경우 true를 반환
 */
ayu.chk.isMaxLen = function(obj, chkLen, xss) {
	var _len = ayu.str.getVal(obj, xss).length;
	return (_len <= chkLen);
};

/**
 * 검사항목의 값이 최소 길이를 넘지 않는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @param {Number} chkLen 최소 길이
 * @param {Boolean} xss XSS 적용여부 (기본값 : false) 
 * @return {Boolean} 최소길이 이하일 경우 true를 반환
 */
ayu.chk.isMinLen = function(obj, chkLen, xss) {
	var _len = ayu.str.getVal(obj, xss).length;
	return (_len >= chkLen);
};

/**
 * 검사항목의 값이 올바른 날짜인지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @param {String} format 날짜포맷 (YYYY:년도, MM:월, DD:일, HH:시, HI:분, SS:초)
 * @return {Boolean} 검사결과
 */
ayu.chk.isDate = function(obj, format) {
	return ayu.obj.getDate(obj, format) == null ? false : true;
};

/**
 * 일반 전화번호 형식 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isHomePhone = function(obj) {
	return ayu.chk.isReg(obj, ayu.str._regPtn.IS_HOME_PHONE);
};

/**
 * 핸드폰 전화번호 형식 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isCellPhone = function(obj) {

	var result = true;
	if (ayu.str.getVal(obj).substr(0, 3) == "010") {
		result = ayu.chk.isReg(obj, ayu.str._regPtn.IS_CELL_PHONE2);
	} else {
		result = ayu.chk.isReg(obj, ayu.str._regPtn.IS_CELL_PHONE1);
	}

	return result;
};

/**
 * 정의한 MASK형식에 맞는지 여부를 확인한다.
 * @param {Object|String} obj obj 문자열 또는 개체
 * @param {String} format 패턴 ( X:문자, 9:숫자, *:문자 또는 숫자 )
 * @return {Boolean} 검사결과
 */
ayu.chk.isMasked = function(obj, format) {

	var ptn = ayu.str.nvl(format, "");

	ptn = ptn.replace(/[x|X]/g, "[a-zA-Z가-힣]");
	ptn = ptn.replace(/[9]/g, "[0-9]");
	ptn = ptn.replace(/\*/g, ".");

	ptn = eval("/" + ptn + "/g");

	return ayu.chk.isReg(obj, ptn);

};

/**
 * 국내거소신고번호(외국인등록번호,재외국민등록번호) 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isFgn = function(obj) {

	// 형식 체크
	if (!ayu.chk.isReg(obj, ayu.str._regPtn.IS_FGN))
		return false;
	var _rrn = ayu.str.getNum(obj);

	if (((_rrn.substr(7, 1) * 10) + _rrn.substr(8, 1)) % 2 != 0)
		return false;

	// 날짜정합성 체크
	var _birth = ayu.chk.isReg(_rrn.substr(6, 1), /[5|6]/) ? "19" : "20";
	_birth += _rrn.substr(0, 6);
	_birth = ayu.obj.getDate(_birth);
	if (_birth == null)
		return false;

	// 등록기관체크(7.외국국적동포, 8.재외국민, 9.외국인)
	if (!ayu.chk.isReg(_rrn.substr(11, 1), /[7|8|9]/))
		return false;

	// 체크섬
	var _sum = 0;
	var _chk = [ 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5 ];

	for ( var inx = 0; inx < 12; inx++)
		_sum += (Number(_rrn.charAt(inx)) * _chk[inx]);

	return !(((11 - (_sum % 11)) + 2) % 10 != Number(_rrn.charAt(12)));

};

/**
 * 조합실명번호(여권) 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isMkRnno = function(obj) {
	// 형식 체크
	if (!ayu.chk.isReg(obj, ayu.str._regPtn.IS_FGN))
		return false;
	var _rrn = ayu.str.getNum(obj);

	// 날짜정합성 체크
	var _birth = _rrn.substr(0, 6);
	_birth = ayu.obj.getDate2(_birth, "YY.MM.DD");
	if (_birth == null)
		return false;

	// 성별체크(7.남자, 8.여자)
	if (!ayu.chk.isReg(_rrn.substr(6, 1), /[7|8]/))
		return false;

	// 국적구분체크(1.미국, 2.일본, 3.중국, 4.기타)
	if (!ayu.chk.isReg(_rrn.substr(7, 1), /[1|2|3|4]/))
		return false;

	// 체크결과
	return true;

};

/**
 * 사업자등록번호 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isBun = function(obj) {

	var _bun = ayu.str.getNum(obj);
	if (!ayu.chk.isReg(_bun, ayu.str._regPtn.IS_NUM)
			|| !ayu.chk.isReg(_bun, /^\d{10}$/))
		return false;

	var ckValue = new Array(10);
	ckValue[0] = (parseFloat(_bun.substring(0, 1)) * 1) % 10;
	ckValue[1] = (parseFloat(_bun.substring(1, 2)) * 3) % 10;
	ckValue[2] = (parseFloat(_bun.substring(2, 3)) * 7) % 10;
	ckValue[3] = (parseFloat(_bun.substring(3, 4)) * 1) % 10;
	ckValue[4] = (parseFloat(_bun.substring(4, 5)) * 3) % 10;
	ckValue[5] = (parseFloat(_bun.substring(5, 6)) * 7) % 10;
	ckValue[6] = (parseFloat(_bun.substring(6, 7)) * 1) % 10;
	ckValue[7] = (parseFloat(_bun.substring(7, 8)) * 3) % 10;
	ckTemp = String((parseFloat(_bun.substring(8, 9)) * 5)) + "0";
	ckValue[8] = parseFloat(ckTemp.substring(0, 1))
			+ parseFloat(ckTemp.substring(1, 2));
	ckValue[9] = parseFloat(_bun.substring(9, 10));
	ckLastid = (10 - ((ckValue[0] + ckValue[1] + ckValue[2] + ckValue[3]
			+ ckValue[4] + ckValue[5] + ckValue[6] + ckValue[7] + ckValue[8]) % 10)) % 10;

	return !(ckValue[9] != ckLastid);
};

/**
 * 법인등록번호 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isBubin = function(obj) {

	// 형식 체크
	var _bin = ayu.str.getNum(obj);
	if (!ayu.chk.isReg(_bin, ayu.str._regPtn.IS_NUM)
			|| !ayu.chk.isReg(_bin, /^\d{13}$/))
		return false;

	var _chk = [ 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2 ];
	var _sum = 0;
	for ( var i = 0; i < _chk.length; i++) {
		_sum += _chk[i] * _bin.substring(i, i + 1);
	}

	return ((10 - _sum % 10) % 10 == _bin.substring(12, 13));

};

/**
 * 영문자와 숫자 두가지혼합으로 구성되어있는지 여부를 확인한다.
 * @param {Object|String} obj 문자열 또는 개체
 * @return {Boolean} 검사결과
 */
ayu.chk.isNumAndEng = function(obj) {

	if (ayu.chk.isReg(obj, ayu.str._regPtn.IS_NUM_ENG))
		return (!ayu.chk.isReg(obj, ayu.str._regPtn.IS_NUM) && !ayu.chk.isReg(
				obj, ayu.str._regPtn.IS_ENG));
	else
		return false;

};