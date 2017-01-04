var CLC = {};

$(function(){
	CLC.init.topnavInit();
	CLC.loader.sectionLoad(CLC.init.sidenavInit);
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
		if(CLC.states.postID == ""){
			CLC.loader.submitNewAriticle();
		}else{
			CLC.loader.submitNewComment();
		}
	});

	function handleFileSelect(evt) {
		var files = evt.target.files; // FileList object

		// files is a FileList of File objects. List some properties.

		for (var i = 0, f; f = files[i]; i++) { 
			if(f.size>200000){
				alert("图片大小不要超过200k");
				continue;
			}
			var reader = new FileReader();
   		reader.onload = (function(theFile) {
   		  return function(e) {
   		    // Render thumbnail.
   		    CLC.states.postImage=e.target.result;
   		  };
   		})(f);
      reader.readAsDataURL(f);
      //void readAsArrayBuffer(in Blob blob);
			//void readAsBinaryString(in Blob blob);
			//void readAsDataURL(in Blob blob);
			//void readAsText(in Blob blob, [optional] in DOMString encoding);
		}
	}

	document.getElementById('module-reply-files').addEventListener('change', handleFileSelect, false);

	$(".module-middle-commentBox-button").each(function(i){
		$(this).unbind("click").click(function(){
			CLC.states.postID = $(".module-middle-commentBox-commentList")[i]._pageId;
			CLC.states.listForNewRepo = $(".module-middle-articleBox:eq("+i+")").find(".module-middle-commentBox-commentList")[0];
			$(".module-reply-toggle").click();
		})
	})
})

