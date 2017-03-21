filepicker.setKey("AQlYJjvnqT3WSQsuaW9l5z");

function viewFile(){
  var link = $('#fileLink').attr('data-doc-handle');
  var url = 'https://www.filestackapi.com/api/file/' + link;
  var src = 'https://www.filestackapi.com/api/preview/' + link;
  $('#myModal #filepicker').attr('data-fp-url', url);
  $('#myModal iframe').attr('src', src);
  $('#myModal').modal('show');
};

$(document).ready(function(){
	$('#deleteItem').on('click', function(e){
	    e.preventDefault();
	    var href = document.getElementById('deleteItem').getAttribute('href');
	    console.log(href);
	    $.ajax({
	      url: href,
	      type:'DELETE'
	    }).done(function(res){
	      alert(res.message);
	    }).fail(function(res){
	      alert(res.message);
	    });
	});

	$('#myModal').on('show.bs.modal', function () {
		var height = $(window).height();
		$(this).find('.modal-body').css('max-height', height);
	});

	// Count for Admin Page
	// if (window.location.pathname === '/admin' || window.location.pathname === '/admin/collections' || window.location.pathname === '/admin/add' || window.location.pathname === '/admin/edit' || window.location.pathname === '/admin/delete'){
	//   fetch('api/v1/Request/count').then(function(res) {
	//     res.json().then(function(count) {
	//       $('#requestContainer').html(count.count);
	//     });
	//   });
	// }

	if (window.location.pathname === '/collection') {
		fetch('api/v1/Thesis?sort=_id').then(function(res) {
      res.json().then(function(entries) {
        console.log('entries', entries);
        var tbody = document.getElementById('thesis-body');
        entries.forEach(function(entries) {
        	var tagString = '';
        	entries.tags.forEach(function(tag){
        		tagString += '<span class="label label-default">'+tag+'</span> ';
        	});
          tbody.insertAdjacentHTML('beforeend', '<div class="col-md-3 col-sm-4 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp"><div class="fh5co-post"><span class="fh5co-date">'+entries.added.substring(0, 10)+'</span><h3><a href="/collection/' + entries._id + '">'+entries.thesis+'</a></h3><p>Tags: '+tagString+'</p><p>'+entries.description+'</p></div></div>' );

        });
      })
    });

    fetch('api/v1/Thesis/count').then(function(res) {
      res.json().then(function(count) {
        $('#collectiontitle').html("Total: <span><u>" + count.count+ "</u></span>  entries");
      });
    });

    $('#searchbox').on('keyup', function(e){
		  e.preventDefault();
		  var inputbox = document.getElementById("searchbox").value;
		  var selectfilter = document.getElementById("searchfilter").value;
		  inputbox = $.trim(inputbox);
		  console.log(inputbox);
		  if(inputbox != ""){
		  	if(selectfilter == "thesis" || selectfilter == "tags"){
			    fetch('api/v1/Thesis?query={"'+selectfilter+'":"~('+inputbox+')"}').then(function (res) {
		        res.json().then(function (entries) {
	            console.log('entries', entries);
	            var tbody = document.getElementById('thesis-body');
	            if(entries.length > 0){
	              $('#thesis-body').html('');
	              entries.forEach(function(entries){
	              	var tagString = '';
	              	entries.tags.forEach(function(tag){
	              		tagString += '<span class="label label-default">'+tag+'</span> ';
	              	});
	                tbody.insertAdjacentHTML('beforeend', '<div class="col-md-4 col-sm-4 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp"><div class="fh5co-post"><span class="fh5co-date">' + entries.added.substring(0, 10) + '</span><h3><a href="/collection/' + entries._id + '">' + entries.thesis + '</a></h3><p>Tags: '+tagString+'</p><p>' + entries.description + '</p></div></div>');
	              });
	            } else {
	              $('#thesis-body').html('<div class="col-md-8 col-md-offset-2" style="text-align:center"><h1>SEARCH SHOWS 0 RESULTS.</h1></div>');
	            }
		        })
			    });
			   }

			  if(selectfilter == "year"){
			  	fetch('api/v1/Thesis?query={"year":'+inputbox+'}').then(function(res){
			  		res.json().then(function (entries) {
			  			console.log('entries', entries);
			  			var tbody = document.getElementById('thesis-body');
			  			if(entries.length > 0){
	              $('#thesis-body').html('');
	              entries.forEach(function(entries){
	                var tagString = '';
	              	entries.tags.forEach(function(tag){
	              		tagString += '<span class="label label-default">'+tag+'</span> ';
	              	});
	                tbody.insertAdjacentHTML('beforeend', '<div class="col-md-4 col-sm-4 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp"><div class="fh5co-post"><span class="fh5co-date">' + entries.added.substring(0, 10) + '</span><h3><a href="/collection/' + entries._id + '">' + entries.thesis + '</a></h3><p>Tags: '+tagString+'</p><p>' + entries.description + '</p></div></div>');
	              });
	            } else {
	              $('#thesis-body').html('<div class="col-md-8 col-md-offset-2" style="text-align:center"><h1>SEARCH SHOWS 0 RESULTS.</h1></div>');
	            }
			  		})
			  	});
			  }

		  } else {
		    fetch('api/v1/Thesis?sort=added').then(function(res) {
	        res.json().then(function(entries) {
            console.log('entries', entries);
            var tbody = document.getElementById('thesis-body');
            $('#thesis-body').html('');
            entries.forEach(function(entries) {
              var tagString = '';
            	entries.tags.forEach(function(tag){
            		tagString += '<span class="label label-default">'+tag+'</span> ';
            	});
              tbody.insertAdjacentHTML('beforeend', '<div class="col-md-3 col-sm-4 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp"><div class="fh5co-post"><span class="fh5co-date">'+entries.added.substring(0, 10)+'</span><h3><a href="/collection/' + entries._id + '">'+entries.thesis+'</a></h3><p>Tags: '+tagString+'</p><p>'+entries.description+'</p></div></div>');
            });
	        })
		    });
		  }
		});
	}

	if (window.location.pathname === '/collection/new') {
		var myDate = new Date();
		var currentyear = myDate.getFullYear();
		var mimeType = '';

		var form = $("#example-advanced-form").show();
		form.steps({
			headerTag: "h3",
			bodyTag: "fieldset",
			transitionEffect: "slideLeft",
			onStepChanging: function (event, currentIndex, newIndex){
				// Allways allow previous action even if the current form is not valid!
				if (currentIndex > newIndex){
					return true;
				}
				// Needed in some cases if the user went back (clean up)
				if (currentIndex < newIndex){
					// To remove error styles
					form.find(".body:eq(" + newIndex + ") label.error").remove();
					form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
				}
				form.validate().settings.ignore = ":disabled,:hidden";
				return form.valid();
			},
			onStepChanged: function (event, currentIndex, priorIndex){
			
			},
			onFinishing: function (event, currentIndex){
				form.validate().settings.ignore = ":disabled";
				return form.valid();
			},
			onFinished: function (event, currentIndex){
				var form = $(this);
				form.submit();
			}
		}).validate({
			errorPlacement: function errorPlacement(error, element) { element.before(error); },
			rules: {
				thesis : "required",
				description : "required",
				year : { range : [currentyear-6, currentyear], date: true },
				tags : "required",
				member1 : "required",
				member2 : "required",
				adviser1 : "required",
				adviser2 : "required",
				files : {
					required : true,
					extension : "docx|doc|pdf"
				},
				image1 : { url : true },
				image2 : { url : true },
				image3 : { url : true },
				youtube : { url : true }
			},
			messages : {
				files : {
					required : "This field is required",
					extension : "Please enter a value with a valid mimetype"
				}
			}
		});

		window.onload = function(){
			for(var i=currentyear; i>currentyear-6; i--){
				document.getElementById('year').insertAdjacentHTML('beforeend','<option value="'+i+'">'+i+'</option>');
			}
		}

		$('.filepicker').on('click', function(event){
		  var _this = $(this);       
		  filepicker.pick(
		    {
		      extension: ['.pdf', '.doc', '.docx'],
		      container: 'modal',
		      service: ['COMPUTER'],
		      openTo: 'COMPUTER' 
		    },
		    function(Blob){
		      console.log(JSON.stringify(Blob));
		      _this.data("doc-url", Blob.url);
		      _this.data("doc-mimetype", Blob.mimetype);
		      //$('[type="filepicker-preview"]').data('fp-ur', Blob.url);
		      // Generate file handle
					var lastIndex = Blob.url.lastIndexOf('/');
					if(lastIndex != -1){
						mimeType = Blob.mimetype;
						var fileHandle = Blob.url.substring(lastIndex+1, Blob.url.length);
						$('#fileUploaded').html("<a id='fileLink' href='https://process.filestackapi.com/output=s:true/"+Blob.url+"' data-doc-mimetype='"+mimeType+"' data-doc-handle='"+fileHandle+"' target='_window'>View File</a>");
					} else {
						mimeType = '';
						var fileHandle = '';
						$('#fileUploaded').html("<span>No file uploaded.</span>");
					}
		      
		    },
		    function(FPError){
		      console.log(FPError.toString());
		    }
		  );
		});

		$('#example-advanced-form').on('submit', function(e){
		  e.preventDefault();
		  var href = document.getElementById('example-advanced-form').getAttribute('action');
		  var type = document.getElementById('example-advanced-form').getAttribute('method');
		  var tags = $("#tags").tagsinput('items');
		  //var tags = $("#tags").val();
		  var thesis = document.querySelector('[name="thesis"]').value;
			var subtitle = document.querySelector('[name="subtitle"]').value;
			var year = document.querySelector('[name="year"]').value;
			var description = document.querySelector('[name="description"]').value;
			var member1 = document.querySelector('[name="member1"]').value;
			var member2 = document.querySelector('[name="member2"]').value;
			var member3 = document.querySelector('[name="member3"]').value;
			var member4 = document.querySelector('[name="member4"]').value;
			var member5 = document.querySelector('[name="member5"]').value;
			var adviser1 = document.querySelector('[name="adviser1"]').value;
			var adviser2 = document.querySelector('[name="adviser2"]').value;
			var fileURL = $('.filepicker').data('doc-url');
			var fileType = $('.filepicker').data('doc-mimetype');
			var image1 = document.querySelector('[name="image1"]').value;
			var image2 = document.querySelector('[name="image2"]').value;
			var image3 = document.querySelector('[name="image3"]').value;
			var youtube = document.querySelector('[name="youtube"]').value;
			
			// fileURL = 'https://cdn.filestackcontent.com/HTSyNrCRRKtkyDxxn2D7';
			if(fileURL === undefined){
				fileURL = '';
			}

			// Generate file handle
			var lastIndex = fileURL.lastIndexOf('/');
			if(lastIndex != -1){
				var fileHandle = fileURL.substring(lastIndex+1, fileURL.length);
			} else {
				var fileHandle = '';
			}

			var data = {
				"thesis" : thesis,
				"subtitle" : subtitle,
				"description" : description,
				"year" : year,
				"tags" : JSON.stringify(tags),
				"member1" : member1,
				"member2" : member2,
				"member3" : member3,
				"member4" : member4,
				"member5" : member5,
				"adviser1" : adviser1,
				"adviser2" : adviser2,
				"fileURL" : fileURL,
				"fileHandle" : fileHandle,
				"fileType" : fileType,
				"image1" : image1,
				"image2" : image2,
				"image3" : image3,
				"youtube" : youtube
			}
		  console.log(data);

		  $.ajax({
	      url: href,
	      type: type,
	      dataType: 'json',
	      data: data
	    }).done(function(res){
	      document.getElementById('example-advanced-form').reset();
			  $("#example-advanced-form").steps('reset');
			  $('#fileUploaded').html("");
			  $('.filepicker').data('doc-url', '');
			  $("#tags").tagsinput('destroy');
			  $("#tags").tagsinput('refresh');
			  $('#addAlertBox').html("<div class='alert alert-success alert-dismissable'><i class='icon-check' style='font-size:15px; text-align:center'></i> <strong>Request for adding entry sent! Waiting for approval.</strong></div>");
	    }).fail(function(res){
	      alert(res.message);
	      $('#addAlertBox').html("<div class='alert alert-danger alert-dismissable'><i class='icon-cross2' style='font-size:15px'></i> <strong>Error sending request to add entry! "+res.message+"</strong></div>");
	    }); 
		});
	}

	if (window.location.pathname === '/admin/add' || window.location.pathname === '/admin/edit') {
		$('.viewFile').on('click', function(e){
      e.preventDefault();
      var link = $(this).attr('href');
      var url = 'https://www.filestackapi.com/api/file/' + link;
      var src = 'https://www.filestackapi.com/api/preview/' + link;
      $('#myModal #filepicker').attr('data-fp-url', url);
      $('#myModal iframe').attr('src', src);
      $('#myModal').modal('show');
    });

    $('#myModal').on('show.bs.modal', function () {
      var height = $(window).height();
      $(this).find('.modal-body').css('max-height', height);
		});
	}
});