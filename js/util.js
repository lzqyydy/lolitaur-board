CLC.util = {
	detectRepoBottom:function(handler,callback){
		return function(){
			if($(this).scrollTop() + $(this).height() === $(this).prop("scrollHeight")){
				if(this.reposPageNum>0){
					handler(this);
					callback(this);
				}
			}
		}
	}
}