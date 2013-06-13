/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	config.language  				 = 'ko';
	//config.uiColor 				 = '#9ab8f3';
	config.skin      				 = 'office2003';
	config.toolbar   				 = 'User';
	config.enterMode 			     = CKEDITOR.ENTER_BR;
	config.shiftEnterMode 		     = CKEDITOR.ENTER_P;
	config.startupFocus 		 	 = true;
	config.font_defaultlLabel 		 = 'Gulim';
	config.fontSize_defaultlLabel    = '10px';
	config.filebrowserBroeswUrl 	 = '/ckfinder/ckfinder.html';
	config.filebrowserImageUploadUrl = '/ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Images';
	CKEDITOR.config.toolbar_User	 =
		  [
			['Source','-','Save','NewPage','Preview','-','Templates'],
			['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
			['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
			['Link','Unlink','Anchor'],
			//['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
			'/',
			['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
			['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
			['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
			['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
			'/',
			['Styles','Format','Font','FontSize'],
			['TextColor','BGColor'],
			['Maximize', 'ShowBlocks','-','About']
		  ];
};
