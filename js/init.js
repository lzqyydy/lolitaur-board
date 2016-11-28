CLC.init = {
	topnavInit:function (){
		$("li.module-header-nav-li").each(function(){
			$(this).mouseover(function(){
				$(this).stop(true);
				$(this).children("ul").delay(600).slideDown(500);
			});
			$(this).mouseleave(function(){
				$(this).children("ul").stop(true,true);
				$(this).children("ul").slideUp(500);
			});
		});
	},

	//-------------------------------------------------
	sidenavInit:function (){
		//asideMenu show/hide effect
		$(".module-aside-li").each(function(i,li){
			$(li).css("top",i*50+"px");
		});

		$(".module-aside").height($(".module-aside-li").height()*$(".module-aside-li").length);

		$(".module-header-button-menu").click(function(){
			if(CLC.states.sidenavDisplay == 0){
				//show
				$(".module-aside").show(CLC.options.sidenavTransTime*5)
				.animate({left:0},CLC.options.sidenavTransTime);
				$(".module-aside-li").delay(CLC.options.sidenavTransTime*6).each(function(i,li){
					$(li).delay(i*CLC.options.sidenavTransTime).animate({
						left:0,
					},CLC.options.sidenavTransTime*2);
				});

				CLC.states.sidenavDisplay = 1;
			}else if(CLC.states.sidenavDisplay == 1){
				//hide
				$(".module-aside-li").each(function(i,li){
					$(li).delay(i*CLC.options.sidenavTransTime).animate({
						left:"-100%",
					},CLC.options.sidenavTransTime*2);
				});
				$(".module-aside").delay($(".module-aside-li").length*CLC.options.sidenavTransTime)
				.animate({left:-$(".module-aside-li").width()},CLC.options.sidenavTransTime)
				.hide(CLC.options.sidenavTransTime*5);

				CLC.states.sidenavDisplay = 0;
			}else{
				console.log("asideMenuFunction Error!");
			}
		});

		//asideMenu bar effect
		$(".module-aside-li").each(function(i,li){
			$(li).hover(function(){
				$(li).stop(true,true);
				$(li).animate({
					left:20,
				},CLC.options.sidenavTransTime);
			},function(){
				$(li).stop(true,true);
				$(li).animate({
					left:0,
				},CLC.options.sidenavTransTime*5);
			});
		});
	},
	articleContainerInit:function(){
		for(var i=0;i<CLC.options.postsPerPage;i++){
			var box = $("<section/>").addClass("module-middle-articleBox");
			var arti = $("<div/>").addClass("module-middle-article");
			var h1 = $("<h1/>").addClass("module-middle-article-title");
			var h2 = $("<h2/>").addClass("module-middle-article-subTitle");
			var p = $("<p/>").addClass("module-middle-article-text");
			var a = $("<a/>").attr("href","javascript:void(0)")
			.addClass("module-middle-articleBox-button module-middle-articleBox-slide");
	
			arti.append(h1);
			arti.append(h2);
			arti.append(p);
			box.append(arti);
			box.append(a);
			CLC.init.commentContainerInit(box);
			$(".module-middle").children(".module-middle-pageRoll").before(box);
		}
		$(".module-middle-commentBox").slideUp();
	},
	articleBoxHeightInit:function(){
		// console.log("height init");
		$(".module-middle-article").stop(true).animate({height:115},300);
		$(".module-middle-articleBox-slide").html(CLC.options.postsOpenStr);
		$(".module-middle-commentBox").stop(true).slideUp(300);
		
	},
	articleAnimationInit:function(){
		$(".module-middle-articleBox-slide").each(function(i){
			$(this).parent().children(".module-middle-article").outerHeight("auto");
			this.artiHeight = $(this).parent().children(".module-middle-article").outerHeight();
			$(this).parent().children(".module-middle-article").innerHeight("115px");
			$(this).unbind("click").click(function(){
				if($(this).html() == CLC.options.postsOpenStr){
					// console.log("open!");
					CLC.init.articleBoxHeightInit();
					$(this).html(CLC.options.postsOpenedStr);
					$(this).parent().children(".module-middle-article")
					.stop(true).animate({height:this.artiHeight},300);
					CLC.loader.commentDataLoad(this);
				}else{
					// console.log("close");
					CLC.init.articleBoxHeightInit();
				}
			});
		});
		$(".module-middle-loading").fadeOut(250);
		CLC.init.articleSlideIn();
	},
	articleSlideIn:function(){
		$(".module-middle-articleBox").queue(function(){
			$(".module-middle-articleBox").css("left","100%");
			$(".module-middle-articleBox").dequeue();
		})
		$(".module-middle-articleBox").animate({
			left:0,
		},1000);
	},
	articleNextPage:function(){
		CLC.states.postsPageNum++;
		CLC.init.articleChangePageEvent();
	},
	articlePrevPage:function(){
		CLC.states.postsPageNum--;
		CLC.init.articleChangePageEvent();
	},
	articleChangePageEvent:function(){
		CLC.loader.pageButtonLoadStatus();
		CLC.init.articleBoxHeightInit();
		$(".module-middle-loading").fadeIn(250);
		$(".module-middle-articleBox").animate({
			left:"-100%",
		},1000,function(){
			$("body").animate({scrollTop:0},200);
		});
		setTimeout(function(){
			CLC.loader.articleDataLoad();
		},1000);
	},
	replyWindowInit:function(){
		if(CLC.states.newpoLID == ""){
			$("#module-reply-status").html("发送新串");
		}else{
			$("#module-reply-status").html("发送评论");
		}
		$(".module-reply").animate(CLC.states.newpoWindowShow?{right:-700}:{right:"0"},300,function(){
			if(CLC.states.newpoWindowShow){
				$(".module-reply-toggle").html("<");
				CLC.init.replyWindowDataInit();
			}
			else{
				$(".module-reply-toggle").html(">");
			}
			CLC.states.newpoWindowShow = !CLC.states.newpoWindowShow;
		});
	},
	replyWindowDataInit:function(){
		$(".module-reply-object").val("");
		CLC.states.newpoLID = "";
		// console.log("empty");
	},
	commentContainerInit:function(artiBox){
		var box = $("<div/>").addClass("module-middle-commentBox");
		var btn = $("<button/>").addClass("module-middle-commentBox-button").html("发送评论");
		box.append(btn);
		var list = $("<div/>").addClass("module-middle-commentBox-commentList");
		box.append(list);
	
		list.scroll(CLC.util.detectBottom);
	
		for(var i=0;i<CLC.options.reposPerPage;i++){
			var cmt = $("<div/>").addClass("module-middle-comment");
				var title = $("<div/>").addClass("module-middle-comment-title");
					var h1 = $("<h1/>");
					var h2 = $("<h2/>");
				var text = $("<div/>").addClass("module-middle-comment-text");
			title.append(h1,h2);
			cmt.append(title,text);
			list.append(cmt);
		}
		artiBox.append(box);
	},
	commentAnimationInit:function(childStuff){
		$(childStuff).parents(".module-middle-articleBox").find(".module-middle-commentBox").slideDown(200);
	}
}