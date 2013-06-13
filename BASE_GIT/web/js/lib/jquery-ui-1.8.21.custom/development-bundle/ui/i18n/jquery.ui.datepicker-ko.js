/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com), Edited by Genie. */
jQuery(function($){
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '년'};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
	
	// 공휴일 포함 캘린더
	$.datepicker.regional['holiday'] = {
		// 월의 줄임이름 표현
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		
		// 주일의 짧은 표현으로 일요일 부터 설정
   		dayNamesMin: ['일','월','화','수','목','금','토'],
		
		// 몇번째 주일인지 표현하는 부분의 상단 컬럼 문구 설정
   		weekHeader: 'Wk',
		
		// 달력에서 날짜 선택 시 해당 날짜의 표현 포맷 설정(2012-03-03)
   		dateFormat: 'yy-mm-dd',
		
		// 지정된 날짜포맷 및 날짜 길이에 맞게 inputBox의 길이 자동 설정
   		autoSize: false,
		
		// 셀렉트 박스로 달 단위 변경
   		changeMonth: true,
		
		// 셀렉트 박스로 년 단위 변경
   		changeYear: true, //년변경가능
		
   		// 년도가 월 앞에 표현되도록 설정
		showMonthAfterYear: true,
   
		// 팝업 버튼의 이미지만 사용하는지 여부를 설정
   		buttonImageOnly: true,
		
		// 팝업 버튼의 Text 설정
   		buttonText: '달력선택',
   
		// 팝업 버튼의 이미지 URL 설정
   		buttonImage: '/js/lib/jquery-ui-1.8.21.custom/development-bundle/demos/datepicker/images/calendar.gif',
   
		// inputBox 또는 달력버튼 중 어느부분 클릭시 달력이 나타나는지 설정(focus, both, button)
   		showOn: "both",
   		
		// 년 단위 이동 셀렉트박스 선택 시 범위 지정(1990년부터 2020년까지)
		yearRange: '1990:2020',
		
		/* Events */
		// 달력에서 날짜를 선택한 후 Event 발생
		onSelect : function (dateText, inst) {
			//alert('onSelect : '+dateText);
		},
		
		// 달력이 사라지기 전 Event 발생
		onClose : function(dateText, inst){
			//alert('onClose');
		},
		
		// 년도, 달 이동시 Event 발생
		onChangeMonthYear : function(year, month, inst){
			//alert('onChangeMonthYear');
		},
		
		// 달력이 그려지기 전 Event 발생
		beforeShow : function(input, inst){
			//alert('beforeShow');
		},

		// 달력의 각 날짜가 그려지기 전 Event 발생
		beforeShowDay : function(date){
			var result;
            // 포맷에 대해선 다음 참조(http://docs.jquery.com/UI/Datepicker/formatDate)
			// 표시날이 휴일인지 체크
			var holiday = holidays[jQuery.datepicker.formatDate("mmdd",date, false)];
            // exist holiday?
            if (holiday) {
				result =  [true, "date-holiday"+holiday.type, holiday.title];
            } else {
				switch (date.getDay()) {
                	case 0: // 일요일?
                  		result = [true, "date-sunday"];
                  	break;
                	case 6: // 토요일?
                  		result = [true, "date-saturday"];
                  	break;
                	default:
                  		result = [true, ""];
                  	break;
				}
			}
            return result;
		} 
	};
});