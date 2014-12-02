
var Site = {
    Init: function () {
		
		//set cufon
		 Cufon.replace('.bebas,.int h2, .date strong,.date b', { fontFamily: 'Bebas Neue' });
		 Cufon.replace('.helvetica37,.btScrollDown,.int h3,.date p,.btMoreDetails, footer span ,.overAn', { fontFamily: 'Helvetica37-CondensedThin' });
		 
		 $(window).stellar({
			    horizontalScrolling: false
		 });
		 
		 
		 //set Height to Dynamic
		 $('section').each(function(){
			var wHeight = $(window).height();
			
			//$(this).height(wHeight);
			//$(this).height(976);	
			//$(this).height(723);	
			//$(this).css('float','left');	 
		 });
		 
		 
		  var isRunning = false; // CHANGED
		  var isRunningOver = false; // CHANGED
		 //Nav Function
		 $('nav ul li').click(function(e){
				var elObj = $(this).html();
				
			  var scrollPos = $('#'+elObj).offset().top;
			  var heightPos = $('#'+elObj).height();
			  
			  var porcentagem = ($(window).height()) * 0.2;
			  
			  var conta =  scrollPos - porcentagem;
			  
			  var tamWin = $(window).height();
			  
			  var contaFull = (tamWin - heightPos)/2;
			
				
				$('nav ul li').removeClass('active');
				$(this).addClass('active');
				
				var state = $('#'+elObj).attr('class');
				
			    e.preventDefault(); // CHANGED
				if(isRunning) return; 
				isRunning = true;
					  
   				 $("html, body").delay(500).animate({scrollTop:scrollPos-contaFull}, 1200, "easeOutCirc", function(){ $(this).stop();isRunning = false;/*CHANGED*/}); 
		 });
		 
		 //nav hover animate
		 
		 $('nav ul li').mouseover(function(e){
			 var txtVal = $(this).html();
			 var thisPos = $(this).position().top;
			 
			 $(this).closest('nav').find('.overAn').html(txtVal);
			 Cufon.refresh();
			 
			 $(this).closest('nav').find('.overAn').css('top',thisPos+105);
			 $(this).closest('nav').find('.overAn').css('width','auto');
			 $(this).closest('nav').find('.overAn').css('opacity',0);
			 
			 e.preventDefault(); // CHANGED
			 if(isRunningOver) return; 
			 isRunningOver = true;
			 
			 $(this).closest('nav').find('.overAn').animate({width:66,opacity:100}, 500, "easeInQuint", function(){ $(this).stop();isRunningOver = false;/*CHANGED*/});
		 });
		 
		 
		  $('nav ul li').mouseout(function(i){
			  $(this).closest('nav').find('.overAn').html('');
			  
			  
		  });

		$("html, body").animate({scrollTop:0}, 1200, "easeOutCirc");
		
	

    },
	
	Form: function(){
		
	  //Masking Form Inputs	
	  $('form .campo').focus(function(){
		  $(this).val(' '); 
	  });
	  
	  $('form input, form textarea').blur(function(){
		  var elVal = $(this).val(); 
		  var elTxt = $(this).attr('rel'); 

		  if(elVal==" "){ $(this).val(elTxt); } 
	  });
	  
	  //Validating Form 
	  $('form').submit(function(){
		  var elErro = 0;
		  
		  $('form .inp01 , form textarea').each(function(i){

			 var elTxt = $(this).attr('rel');
			 var elId = $(this).attr('id');
			 var elVal = $('#'+elId).val();
			 
			
			 
			 if(elTxt == elVal || elVal == "" ){
				 $(this).next('.error').remove();
				
				 $(this).after('<div class="error">Preencha o campo corretamente.</div>');
				 elErro = elErro+1;
			 } else{
				 $(this).next('.error').remove();
			 }
		  });
		  // alert('erro em '+elErro+' campos');
		   
		   
		  if(elErro != 0){
			return false;  
		  } else{
			  $('#mensagem').after('<div class="sucess">Seu e-mail foi enviado com sucesso.</div>');
		  }
		
	  });
	  
	  //Validate by hashtag
	  var urlTxt = window.location.href;
	  
	  
	  
	  if(urlTxt.indexOf('#enviado') != -1){
		  $('nav ul li:eq(3)').click();
		  $('#mensagem').after('<div class="sucess">Seu e-mail foi enviado com sucesso.</div>');
	  }
	  
	  
	},
	
	Jobs: function(){
		var isRunningOver = false; // CHANGED
		//show jobs
		$('#jobs').append('<div class="jobContent"></div>');
		

			 
		$('.jobs .case').click(function(e){
			var elOb = $(this).attr('class');
			elOb = elOb.split(' case');
			elOb = elOb[0];


			$('.jobContent').html('<img src="img/loader.gif" class="loader" />');
			
			
			 $.ajax({
                type: "GET",
                url: "gol.xml",

				dataType:"xml",
 
                success: function(data){
				
					
					$(data).find('Case').each(function (){
						var idCase = $(this).attr('id');
						var sProjeto = $(this).find('Projeto').text();
						var sAgencia = $(this).find('Agencia').text();
						var sAtuacao = $(this).find('Atuacao').text();
						var sLink = $(this).find('Link').text();
						 
						if(idCase == elOb){
							$('.jobContent').css('backgroundImage','url(http://localhost/Portfolio2014/img/jobs/'+idCase+'Full.jpg)');
							$('.jobContent').html('<div class="wrap"><div id="close"></div><img src="img/jobs/'+idCase+'.png" class="icon" /><div class="info"><span><strong>Projeto:</strong>'+sProjeto+'</span><span>Agência:'+sAgencia+'</span><span>Atuação:'+sAtuacao+'</span><a href="'+sLink+'" target="_blank">Visitar projeto</div></div>');
							Cufon.replace('.info span, .info a', { fontFamily: 'Helvetica37-CondensedThin' });
							
									var posJobsArea = $('#jobs .jobs').offset().top;
			
									$('#jobs').find('.jobContent').css('top',posJobsArea-20);
									$('#jobs').find('.jobContent').show();
									
									 e.preventDefault(); // CHANGED
									 if(isRunningOver) return; 
									 isRunningOver = true;
									$('#jobs').find('.jobContent').animate({width:'100%'}, 500, "easeInQuint", function(){ $(this).stop();isRunningOver = false;/*CHANGED*/});
									
									$('#close').click(function(){
										$(this).hide();
										$('#jobs').find('.jobContent').animate({width:'0px'}, 500, "easeInQuint", function(){ $(this).stop();isRunningOver = false;/*CHANGED*/});
									});
						}
					});
					
                   /* $(xml).find('Livro').each(function () {
                        var sTitulo = $(this).find('Titulo').text();
                        var sAutor = $(this).find('Autor').text();
                        var sGenero = $(this).find('Genero').text();
                        $("<li></li>").html(sTitulo + ", " + sAutor + ", " + sGenero).appendTo("#contentArea ul");
                    });*/
                },
                error: function () {
                    alert("Ocorreu um erro inesperado durante o processamento.");
                }
            });
			
			
			
			
			
	
			
			
		});
	
	
	}
}