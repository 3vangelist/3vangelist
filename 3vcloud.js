/*
*	3v Cloud Innovations
*	Jonathan Riley, 2015
*/
var Page = {
	mandrilla_template_name:"email-from-3vcloud-uk-1",
	mandrilla_api_key:'GmD13qOjRM46o-EuQhLNjQ',
	contact_email:"jon.r@live.com",
	contact_name:"Jon",
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
});