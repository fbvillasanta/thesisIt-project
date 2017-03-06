filepicker.setKey("API_KEY");

$(document).ready(function(){
	if (window.location.pathname === '/collection/new') {
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
				alert("Submitted!");
				var form = $(this);
				form.submit();
			}
		}).validate({
			errorPlacement: function errorPlacement(error, element) { element.before(error); },
			rules: {
				thesis : "required",
				description : "required",
				tags : "required",
				member1 : "required",
				member2 : "required",
				adviser1 : "required",
				adviser2 : "required",
				files : {
					required : true,
					extension : "docx|rtf|doc|pdf"
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

		$('.filepicker').on('click', function(event){
		  var _this = $(this);       
		  filepicker.pick(
		    {
		      extension: ['.pdf', '.doc', '.docx', '.ppt', '.txt'],
		      container: 'modal',
		      service: ['COMPUTER'],
		      openTo: 'COMPUTER' 
		    },
		    function(Blob){
		      console.log(JSON.stringify(Blob));
		      _this.data("doc-url", Blob.url);
		      $('[type="filepicker-preview"]').data('fp-ur', Blob.url);
		      $('#fileUploaded').html("<span>"+Blob.filename+"</span>");
		    },
		    function(FPError){
		      console.log(FPError.toString());
		    }
		  );
		});

		$('#example-advanced-form').on('submit', function(e){
		  e.preventDefault();
		  var href = document.getElementById('example-advanced-form').getAttribute('action');
		  var tags = $("#tags").tagsinput('items');
		  var thesis = document.querySelector('[name="thesis"]').value;
			var subtitle = document.querySelector('[name="subtitle"]').value;
			var description = document.querySelector('[name="description"]').value;
			var member1 = document.querySelector('[name="member1"]').value;
			var member2 = document.querySelector('[name="member2"]').value;
			var member3 = document.querySelector('[name="member3"]').value;
			var member4 = document.querySelector('[name="member4"]').value;
			var member5 = document.querySelector('[name="member5"]').value;
			var adviser1 = document.querySelector('[name="adviser1"]').value;
			var adviser2 = document.querySelector('[name="adviser2"]').value;
			var fileURL = $('.filepicker').data('doc-url')
			var image1 = document.querySelector('[name="image1"]').value;
			var image2 = document.querySelector('[name="image2"]').value;
			var image3 = document.querySelector('[name="image3"]').value;
			var youtube = document.querySelector('[name="youtube"]').value;
			var data = {
				"thesis" : thesis,
				"subtitle" : subtitle,
				"description" : description,
				"tags" : tags,
				"member1" : member1,
				"member2" : member2,
				"member3" : member3,
				"member4" : member4,
				"member5" : member5,
				"adviser1" : adviser1,
				"adviser2" : adviser2,
				"fileURL" : fileURL,
				"image1" : image1,
				"image2" : image2,
				"image3" : image3,
				"youtube" : youtube
			}
		  alert('example-advanced-form was submitted');
		  console.log(data);
		});
	}
});