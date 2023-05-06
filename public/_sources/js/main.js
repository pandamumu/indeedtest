$(function(){
	

	var utils ={

		init: function(){
			utils.ui.init();
		},
		ui:{
			init: function(){
				utils.ui.getQuery();
			},
			getQuery: function(){
				function ReverseString(val) {
					return val.split(/\s+/).map(w => w.split('').reverse().join('')).join(' ');
				}
				$.ajaxSetup({
			        headers: {
			            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			        }
			    });

			    if(sessionStorage.getItem('url') != null){
			    	$('input#url').val(sessionStorage.getItem('url'));
			    	var formData = {
						url: sessionStorage.getItem('url')
					};

					$.ajax({
						type: 'POST',
						url: '/postQuery',
						data: formData,
						dataType: 'json',
						encode: true,
						success: function(data){
							var reversedArray = JSON.stringify(JSON.parse(data.inverted), undefined, 4)
							var separators = [',', '[', ']', '{', '}', '"'];

							for (var i = 0; i < separators.length; i++) { 
								var rg = new RegExp("\\" + separators[i], "g"); 
								reversedArray = reversedArray.replace(rg, " " + separators[i] + " "); 
							}

							$('textarea#url_respnse').val(JSON.stringify(JSON.parse(data.content), undefined, 4));
							$('textarea#inverted_url_respnse').val(ReverseString(reversedArray));
						},
						error: function(data){
							var errors = $.parseJSON(data.responseText);
					        alert(errors.message);
						}
					}).fail(function(jqXHR){
				        if(jqXHR.status==500 || jqXHR.status==0){
				            alert('No JSON Data to process!'); 
				        }
				    });

			    }

				$('form#queryForm').submit(function(e){
					e.preventDefault();
					var formData = {
						url: $('input#url').val()
					};

					$.ajax({
						type: 'POST',
						url: '/postQuery',
						data: formData,
						dataType: 'json',
						encode: true,
						success: function(data){
							var reversedArray = JSON.stringify(JSON.parse(data.inverted), undefined, 4)
							var separators = [',', '[', ']', '{', '}', '"'];

							for (var i = 0; i < separators.length; i++) { 
								var rg = new RegExp("\\" + separators[i], "g"); 
								reversedArray = reversedArray.replace(rg, " " + separators[i] + " "); 
							}

							var reversedWords = ReverseString(reversedArray);

							for (var i = 0; i < separators.length; i++) { 
								var rg = new RegExp("\\" + separators[i], "g"); 
								reversedWords = reversedWords.replace(rg, "" + separators[i] + ""); 
							}

							$('textarea#url_respnse').val(JSON.stringify(JSON.parse(data.content), undefined, 4));
							$('textarea#inverted_url_respnse').val(JSON.stringify(JSON.parse(reversedWords), undefined, 4));

						},
						error: function(data){
							var errors = $.parseJSON(data.responseText);
					        alert(errors.message);
						}
					}).fail(function(jqXHR){
				        if(jqXHR.status==500 || jqXHR.status==0){
				            alert('No JSON Data to process!'); 
				        }
				    });

					sessionStorage.setItem('url', $('input#url').val());
				});

				$('a#reset').on('click', function(e){
					e.preventDefault();
					sessionStorage.clear();
					$('input').val('');
					$('textarea').val('');
				});
			},	
		}
	};

	utils.init();
	
});



