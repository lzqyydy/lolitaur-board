CLC.loader = {
	sectionLoad:function(callback){
		$.ajax({
			type:"get",
			url:CLC.options.getSectionURL,
			async:true,
			success:function(data){
				callback(data);
			}
		});
	},
	articleDataLoad:function(){
		$.ajax({
			type:"get",
			url:CLC.options.getPostURL+"/"+CLC.states.boardSection+"/"+CLC.states.postsPageNum,
			async:true,
			success:function(data){
				CLC.loader.articleDataFill(data);
			}
		});
	},
	articleDataFill:function(data){
		$(".module-middle-articleBox").each(function(i){
			var box = $(this);
			box.hide();
			if(i<data.length){
				box.find(".module-middle-article-title").html(data[i].title);
				box.find(".module-middle-article-subTitle").html(data[i].author+"&nbsp;"+new Date(data[i].date).toLocaleDateString()+"&nbsp;"+new Date(data[i].date).toLocaleTimeString());
				box.find(".module-middle-article-image").attr("src",data[i].image);
				box.find(".module-middle-article-text").html(data[i].body);
				box.find(".module-middle-articleBox-button").html(CLC.options.postsOpenStr);
				box.find(".module-middle-commentBox-commentList")[0]._pageId = data[i].LID;
				box.show();
			}
		});
		CLC.init.articleAnimationInit();
	},
	pageButtonLoadStatus:function(){
		$.ajax({
			type:"get",
			url: CLC.options.getPostURL+"/"+CLC.states.boardSection+"/"+"pageCount",
			async:true,
			success:function(data){
				CLC.states.postsPageMax = data;
				if(CLC.states.postsPageNum === CLC.states.postsPageMax){
					$(".module-middle-page-button.next").attr("disabled","true");
				}else{
					$(".module-middle-page-button.next").removeAttr("disabled");
				}
			}
		});
		$(".module-middle-pageNumber").html(CLC.states.postsPageNum);
		if(CLC.states.postsPageNum === 1){
			$(".module-middle-page-button.previous").attr("disabled","true");
		}else{
			$(".module-middle-page-button.previous").removeAttr("disabled");
		}
	},
	submitNewAriticle:function(){
		var legalStr = $("#reply-body").val().match(/\S/img);
		if(legalStr == null)
			legalStr = [];
		var legalLength = legalStr.length;
		if(legalLength>0&&legalLength<=CLC.options.replyLegalLengthMax){
			// console.log("legal");
			$.ajax({
				type:"post",
				url:CLC.options.newPostURL+"/"+CLC.states.boardSection,
				async:true,
				data:{"title":$("#reply-title").val(),"body":$("#reply-body").val(),"image":CLC.states.postImage},
				success:function(){
					CLC.init.replyWindowInit();
					CLC.loader.articleDataLoad();
					$("html,body").delay(500).animate({scrollTop:0},200);
				},
			});
		}else if(legalLength<=0){
			$("#module-reply-status").html("应至少有1个非空格字符");
		}else if(legalLength>CLC.options.replyLegalLengthMax){
			$("#module-reply-status").html("非空格字符最多为200个");
		}else{
			alert("发生未知错误 请刷新页面");
		}
		clearTimeout(CLC.states.newpoAlarmTimer);
		CLC.states.newpoAlarmTimer = setTimeout(function(){
			$("#module-reply-status").html("发送新串");
		},1000);
	},
	submitNewComment:function(){
		var legalStr = $("#reply-body").val().match(/\S/img);
		if(legalStr == null)
			legalStr = [];
		var legalLength = legalStr.length;
		if(legalLength>0&&legalLength<=CLC.options.replyLegalLengthMax){
			// console.log("legal");
			$.ajax({
				type:"post",
				url:CLC.options.newRepoURL+"/"+CLC.states.postID,
				async:true,
				data:{"title":$("#reply-title").val(),"body":$("#reply-body").val(),"image":CLC.states.postImage},
				success:function(){
					CLC.init.replyWindowInit();
					CLC.loader.commentDataLoad(CLC.states.listForNewRepo);
				},
			});
		}else if(legalLength<=0){
			$("#module-reply-status").html("应至少有1个非空格字符");
		}else if(legalLength>CLC.options.replyLegalLengthMax){
			$("#module-reply-status").html("非空格字符最多为200个");
		}else{
			alert("发生未知错误 请刷新页面");
		}
		CLC.states.postID = "";
		clearTimeout(CLC.states.newpoAlarmTimer);
		CLC.states.newpoAlarmTimer = setTimeout(function(){
			$("#module-reply-status").html("发送评论");
		},1000);
	},
	commentDataLoad:function(commentList){
		CLC.states.postID = commentList._pageId;
	
		$.ajax({
			type:"get",
			url:CLC.options.getRepoURL+"/"+CLC.states.postID+"/"+commentList.reposPageNum++,
			async:true,
			success:function(data){
				CLC.init.commentItemInit(commentList);
				CLC.loader.commentDataFill(data,$(commentList).children(".module-middle-commentBox-commentPage").last());
				CLC.init.commentAnimationInit(commentList);
			},
			error:function(xhr,status,error){
				commentList.reposPageNum = -1;
			}
		})
		CLC.states.postID = "";
	},
	commentDataFill:function(data,commentPage){
		$(commentPage).find(".module-middle-comment").each(function(i){
			var cmt = $(this);
			// cmt.hide();
			cmt.slideUp(1);
			if(i<data.length){
				cmt.find("h1").html(data[i].title);
				cmt.find("h2").html(new Date(data[i].date).toLocaleDateString()+"&nbsp;"+new Date(data[i].date).toLocaleTimeString());
				cmt.find(".module-middle-comment-text").html(data[i].body);
				cmt.slideDown(500);
			}
		});
	}
}