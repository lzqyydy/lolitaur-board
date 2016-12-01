var CLC = {};

$(function(){
	CLC.init.topnavInit();
	CLC.init.sidenavInit();
	CLC.init.articleContainerInit();
	CLC.loader.articleDataLoad();
	CLC.loader.pageButtonLoadStatus();
	$(".module-middle-page-button.next").unbind("click").click(function(){
		CLC.init.articleNextPage();
	})
	$(".module-middle-page-button.previous").unbind("click").click(function(){
		CLC.init.articlePrevPage();
	})

	$(".module-reply-toggle").click(function(){
		CLC.init.replyWindowInit();
	});
	$(".module-reply-submit").click(function(){
		if(CLC.states.newpoLID == ""){
			CLC.loader.submitNewAriticle();
		}else{
			CLC.loader.submitNewComment();
		}
	});


	$(".module-middle-commentBox-button").each(function(i){
		$(this).unbind("click").click(function(){
			CLC.states.postID = $(".module-middle-commentBox-commentList")[i]._pageId;
			CLC.states.listForNewRepo = $(".module-middle-articleBox:eq("+i+")").find(".module-middle-commentBox-commentList")[0];
			$(".module-reply-toggle").click();
		})
	})
})

