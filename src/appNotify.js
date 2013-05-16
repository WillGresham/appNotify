
var appNotify = {
	// Selected Option - Cookie value
	selectedOption : false,
	// Whether to show the banner
	showBanner : true,
	// Links for devices
	iOSLink : '',
	androidLink : '',
	bbLink : '',
	windowsLink : '',
	// Internal link for the app
	useLink : '',
	// App Logo
	image : false,
	// Title Text
	titleText : 'We have a mobile app!',

	init : function() {
		// Yes, this is pretty horrible.
		if(this.isIDevice()) {
			if(this.iOSLink == '') {
				return false;
			}
			this.useLink = this.iOSLink;
		} else if(this.isAndroidDevice()) {
			if(this.androidLink == '') {
				return false;
			}
			this.useLink = this.androidLink;
		} else if(this.isBlackBerryDevice()) {
			if(this.bbLink == '') {
				return false;
			}
			this.useLink = this.bbLink;
		} else if(this.isWindowsPhoneDevice()) {
			if(this.windowsLink == '') {
				return false;
			}
			this.useLink = this.windowsLink;
		} else {
			// Not mobile
			return false;
		}
		// Check the cookie
		this.checkForCookie();

		// If not showBanner, or clicked don't show, then don't show the banner
		if(this.showBanner === false || this.selectedOption === 'h') {
			return false;
		}

		this.drawBanner(this.useLink);
	},

	isIDevice : function() {
		return (/iPhone|iPad|iPod/).test(navigator.userAgent);
	},

	isAndroidDevice : function() {
		return (/Android/).test(navigator.userAgent);
	},

	isBlackBerryDevice : function() {
		return (/BlackBerry/).test(navigator.userAgent);
	},

	isWindowsPhoneDevice : function() {
		return (/Windows Phone/).test(navigator.userAgent);
	},

	checkForCookie : function() {
		if(this.selectedOption === false) {
			if(document.cookie.match(/appNotify-seen=1/)) {
				this.showBanner = false;
			} else if(document.cookie.match(/appNotify-setting=h/)) {
				this.selectedOption = 'h';
			}
		}
	}, 

	alwaysHide : function() {
		this.showBanner = false;
	},

	setImage : function(imageUrl) {
		this.image = imageUrl;
	},

	setTitle : function(string) {
		this.titleText = string;
	},

	setIOSLink : function(link) {
		this.iOSLink = link;
	}, 
	
	setAndroidLink : function(link) {
		this.androidLink = link;
	}, 
	
	setWindowsPhoneLink : function(link) {
		this.windowsLink = link;
	}, 
	
	setBlackberryLink : function(link) {
		this.bbLink = link;
	},

	click : function(what) {
		// 1 = Hide for now
		// 0 = Hide in the future
		if(what == '1') {
			document.cookie = "appNotify-seen=1;";
		} else {
			document.cookie = "appNotify-setting=h;expires=" + (new Date()).toGMTString().replace(/\d{4}/, '2150');
		}
		window.location.reload();
	},

	drawBanner : function(link) {
		var wrapperDiv, wrapperP, imageHolder, titleText, acceptLink, dismissLink, hideLink, br;

		// Make some elements
		wrapperDiv = document.createElement('div');
		wrapperP = document.createElement('p');
		br = document.createElement('br');
		titleText = document.createTextNode(this.titleText);
		acceptLink = document.createElement('a');
		dismissLink = document.createElement('a');
		hideLink = document.createElement('a');

		// Add the link to the app
		acceptLink.setAttribute('href', link);
		// Set to open in new tab
		acceptLink.setAttribute('target', '_blank');
		// Set cookie to prevent popup
		dismissLink.setAttribute('onclick', 'appNotify.click(0)');
		acceptLink.appendChild(document.createTextNode('Install App'));

		dismissLink.setAttribute('href', '#');
		// Set cookie to prevent popup
		dismissLink.setAttribute('onclick', 'appNotify.click(0)');
		dismissLink.appendChild(document.createTextNode('No thanks'));

		hideLink.setAttribute('href', '#');
		// Set cookie to prevent popup for session
		hideLink.setAttribute('onclick', 'appNotify.click(1)');
		hideLink.appendChild(document.createTextNode('Not Right Now'));

		// Add the image to the banner
		if(this.image !== false) {
			imageHolder = document.createElement('img');
			imageHolder.setAttribute('src', this.image);
			imageHolder.setAttribute('alt', 'App Icon');
			imageHolder.setAttribute('style', 'float: left; vertical-align: middle');
			wrapperP.appendChild(imageHolder);
		}

		// Add the banner to the page
		wrapperDiv.setAttribute('style', 'display: block; background-color: #d5e8f3; padding: 0.5em 0');
		wrapperP.setAttribute('style', 'width: 100%; padding: 0; margin: 0; display: inline-block; font-size: 1.2em;');
		// Add the text to the p
		wrapperP.appendChild(titleText);
		wrapperP.appendChild(br);
		// Add links to the banner
		wrapperP.appendChild(acceptLink);
		wrapperP.appendChild(document.createTextNode(' | '));
		
		wrapperP.appendChild(dismissLink);
		wrapperP.appendChild(document.createTextNode(' | '));

		wrapperP.appendChild(hideLink);

		// Add the p to the div
		wrapperDiv.appendChild(wrapperP);
		// Add the banner to the page
		document.body.insertBefore(wrapperDiv, document.body.childNodes[0]);
	}
	
};