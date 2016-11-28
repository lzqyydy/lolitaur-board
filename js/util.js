CLC.util = {
	detectCommentBottom:function(handler){
		if($(this).scrollTop() + $(this).height() === $(this).prop("scrollHeight")){
			handler();
		}
	}
}