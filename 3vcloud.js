/*
*	3v Cloud Innovations
*	Jonathan Riley, 2015
*/
var Page = {
	mandrilla_template_name:"email-from-3vcloud-uk-1",
	mandrilla_api_key:'GmD13qOjRM46o-EuQhLNjQ',
	contact_email:"jon.r@live.com",
	contact_name:"Jon",
	skills:[{
		title:'PHP',
		image:'images/php.png'
	},{
		title:'HTML5',
		image:'images/html5.png'
	},{
		title:'Microsoft Azure',
		image:'images/azure.png'
	},{
		title:'Google Cloud',
		image:'images/googlecloud.png'
	},{
		title:'CSS3',
		image:'images/css3.png'
	}],
	success:function(message) {
		
	},
	error:function(message)	{
		alert(message);
	}
}
var ContactForm = {
	disable:function()
	{
		this.disabled=true;
		$("#contactForm input,#contactForm button").each(function()
		{
			$(this).addClass('disabled');
		});
	},
	enable:function()
	{
		$("#contactForm .disabled").each(function()
		{
			$(this).removeClass('disabled');
		});
		this.disabled=false;
	},
	reset:function()
	{
		$("#contactForm input,#contactForm button").each(function()
		{
			$(this).addClass('disabled');
		});
	},
	send:function()	{
		if(this.disabled)
			return;
		this.disable();
		
		var userName = $.trim($("#contactFormUserName").val());
		var userEmail = $.trim($("#contactFormUserEmail").val());
		var userWebsite = $.trim($("#contactFormUserWebsite").val());
		var contentMessage = $.trim($("#contactFormMessage").val());
		if(userName.length==0)
		{
			this.enable();
			return Page.error("Please enter your name");
		}
		if(contentMessage.length == 0)
		{
			this.enable();
			return Page.error("Please enter a message");
		}
		$.ajax({
			url:'http://mandrillapp.com/api/1.0/messages/send-template.json',
			dataType:'json',
			contentType:'text/plain',
			processData:false,
			method:'POST',
			data:JSON.stringify({
				key: Page.mandrilla_api_key,
				template_name: Page.mandrilla_template_name,
				template_content:{},
				message:{
				global_merge_vars: [
					{
						"name": "UserName",
						"content": userName
					},{
						"name": "UserEmail",
						"content": userEmail
					},{
						"name": "ContactMessage",
						"content": contentMessage
					}
				],
				"to": [
							{
								"email": Page.contact_email,
								"name": Page.contact_name,
								"type": "to"
							}
						]
				}			
			}),
			success:function(data)
			{
				Page.success("Thanks for getting in touch!");
			},
			error:function()
			{
				Page.error("Looks like there was a problem sending your message");
			},
			complete:function()
			{
				ContactForm.enable();
			}
		});
	}
}

$(function()
{
	$("#contactFormSubmitButton").on('click',function(){ContactForm.send()});
	init();
});

function init()
{
	layoutSkills();

}

var platforms = [],
    platformSize = 20,
    platformWidth = 200,
    platformHeight = 200;

function generatePlatforms(k) {

}

function layoutSkills()
{
	//var css='<style>';
	var skill_divs = '';
	
	$(".skills_container").html("<div id='skill_container_dummy' class='skill_container' style='visibility:hidden'>");
	var platformHeight = parseInt($("#skill_container_dummy").height());
	var platformWidth = parseInt($("#skill_container_dummy").width());
	var container_margin = parseInt($("#skill_container_dummy").css('margin'));
	var placed = 0,
		maxAttempts = Page.skills.length*10;
	var platforms=[];
	var platformSize = 20;
	
	while(placed < Page.skills.length && maxAttempts > 0) {
		var x = Math.floor(Math.random()*platformWidth),
			y = Math.floor(Math.random()*platformHeight),
			available = true;
		for(var point in platforms) {
		  if(Math.abs(point.x-x) < platformSize && Math.abs(point.y-y) < platformSize) {
			available = false;
			break;
		  }
		}
		if(available) {
		  platforms.push({
			x: x,
			y: y
		  });
		  placed += 1;
		}
		maxAttempts -= 1;
	}
	for(var i = 0;i < Page.skills.length; i++)
	{
		skill_divs += "<div class='skill_container' style='left:"+platforms[i].x+";top:"+platforms[i].y+";background-image:url("+Page.skills[i].image+")'>"+Page.skills[i].title+"</div>";
	}
	//css+='</style>';
	//$('head').append(css);
	$(".skills_container").html(skill_divs);

}